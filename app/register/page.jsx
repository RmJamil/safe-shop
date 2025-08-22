"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react"; // ✅ import signIn
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (res.ok) {
      setSuccess("Registration successful! Logging you in...");

      // ✅ Immediately log the user in
      const loginRes = await signIn("credentials", {
        redirect: false,
        email: form.email,
        password: form.password,
      });

      if (loginRes?.ok) {
        router.push("/dashboard");
      } else {
        setError("Registered but failed to log in. Try logging in manually.");
        router.push("/login");
      }
    } else {
      setError(data.error || "Something went wrong.");
    }
  };

  return (
  <div className="flex flex-col min-h-screen">
    <Navbar/>
      <div className=" flex-grow flex items-center justify-center">
      <div className="w-full max-w-md p-8 shadow border rounded-box">
        <h2 className="text-2xl font-bold mb-4 text-center">Sign up</h2>

        {error && <div className="alert alert-error mb-4">{error}</div>}
        {success && <div className="alert alert-success mb-4">{success}</div>}

        <form onSubmit={handleSubmit} className="form-control space-y-4">
          <input
            type="text"
            placeholder="Name"
            className="input w-full input-bordered"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />

          <input
            type="email"
            placeholder="Email"
            className="input w-full input-bordered"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="input w-full input-bordered"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />

          <button type="submit" className="btn bg-sky-400 w-full">
            Register
          </button>
          <div className="text-right">
            Already have an account ? <Link href='/login' className="text-blue-600">Sign in</Link>
          </div>
        </form>
      </div>
    </div>
    <Footer/>
  </div>
  );
}
