"use client";

import { useEffect, useState } from "react";

interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
  description: string;
}

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  }, []);

  if (loading)
    return <div className="text-center py-10">Loading products...</div>;
  if (products.length === 0)
    return (
      <div className="text-center py-10 text-gray-400 italic">
        No products found in the database.
      </div>
    );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <div
          key={product._id}
          className="bg-white p-6 rounded-3xl shadow-sm border border-gray-50 hover:shadow-xl transition-shadow"
        >
          <div className="w-full aspect-square bg-gray-100 rounded-2xl mb-4 flex items-center justify-center text-4xl">
            📦
          </div>
          <h4 className="font-bold text-lg mb-1">{product.name}</h4>
          <p className="text-sm text-gray-500 mb-4">{product.category}</p>
          <div className="flex items-center justify-between">
            <span className="text-green-600 font-bold text-xl">
              ${product.price}
            </span>
            <button className="bg-black text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-gray-800">
              Add
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
