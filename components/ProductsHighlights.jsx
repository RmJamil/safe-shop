"use client";
import React, { useEffect, useState } from 'react';

const ProductsHighlights = () => {
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
    <div className="p-6 bg-base-200 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Products</h1>
      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="card bg-base-100 shadow-lg border border-gray-200"
            >
              <div className="card-body">
                <h2 className="card-title">{product.name}</h2>
                <p className="text-gray-600">{product.details}</p>
                <p className="font-semibold mt-2">Price: ${product.price}</p>
                <div className="card-actions justify-end">
            <button className="btn btn-outline btn-sm">
  <Link href={`/products/${product._id}`}>Details</Link>
</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    );
};

export default ProductsHighlights;