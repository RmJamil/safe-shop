"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";   // ✅ import Navbar
import Footer from "@/components/Footer";   // ✅ import Footer

export default function ProductListPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="flex flex-col bg-sky-100 min-h-[100vh]">
      {/* ✅ Navbar at top */}
      <Navbar />

      {/* ✅ Main content */}
      <main className="flex-grow p-6 w-11/12 mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Products</h1>
        {products.length === 0 ? (
          <p>No products found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div key={product._id} className="card shadow-lg border">
                <div className="card-body">
                  <h2 className="card-title">{product.name}</h2>
                  <p className="text-gray-600">{product.details}</p>
                  <p className="font-semibold mt-2">Price: ${product.price}</p>
                  <div className="card-actions justify-end">
                    <Link href={`/products/${product._id}`}>
                      <button className="btn btn-outline btn-sm">
                        Details
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* ✅ Footer at bottom */}
      <Footer />
    </div>
  );
}
