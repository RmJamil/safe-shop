"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer"; // ✅ add your Footer component
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      ...form,
      redirect: false,
    });

    if (res?.ok) {
      setTimeout(() => {
        router.replace("/products");
        router.refresh();
      }, 600);
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* ✅ Navbar on top */}
      <Navbar />

      {/* ✅ Main login area */}
      <main className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-sm p-8 shadow-lg border rounded-box">
          <h1 className="text-3xl font-bold mb-6 text-center">Sign In</h1>
          {error && <div className="alert alert-error mb-4">{error}</div>}

          <form onSubmit={handleLogin} className="form-control space-y-4">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="your email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="input input-bordered w-full"
            />

            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="input input-bordered w-full"
            />

            <button type="submit" className="btn bg-sky-400 w-full mt-4">
              Sign In
            </button>
              <div className="text-right">
           Don't have an account ? <Link href='/register' className="text-blue-600">Sign up</Link>
          </div>
          </form>
        </div>
      </main>

      {/* ✅ Footer at bottom */}
      <Footer />
    </div>
  );
}
