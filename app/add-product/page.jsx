"use client";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function AddProductPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    price: "",
    details: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (status === "loading") {
    return <p className="p-6">Loading...</p>;
  }

  if (!session) {
    router.replace("/login");
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/dashboard/add-product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: session.user.email,
          ...form,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to add product");
      } else {
    
      Swal.fire({
          icon: "success",
          title: "Product Added!",
          text: `Product "${data.product.name}" has been added successfully.`,
          timer: 2000,
          showConfirmButton: false,
        });


        setForm({ name: "", price: "", details: "" });
        router.push("/dashboard"); // or product list page
      }
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="w-full max-w-md p-6 bg-base-100 shadow-lg rounded-box">
        <h1 className="text-2xl font-bold mb-4">Add Product</h1>
        {error && <div className="alert alert-error mb-3">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label">Email</label>
            <input
              type="email"
              value={session.user.email}
              readOnly
              className="input input-bordered w-full bg-gray-100"
            />
          </div>

          <div>
            <label className="label">Product Name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="label">Price</label>
            <input
              type="number"
              step="0.01"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              required
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="label">Details</label>
            <textarea
              value={form.details}
              onChange={(e) => setForm({ ...form, details: e.target.value })}
              className="textarea textarea-bordered w-full"
            ></textarea>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
}
