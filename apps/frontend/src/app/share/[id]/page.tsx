"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "@/lib/api";
import {
  ShoppingBasket,
  Loader2,
  Calendar,
  Clock,
  Package,
} from "lucide-react";

export default function SharePage() {
  const { id } = useParams();
  const [list, setList] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get(`/lists/share/${id}`)
      .then((res) => setList(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-green-600" size={48} />
      </div>
    );

  if (!list)
    return (
      <div className="min-h-screen flex items-center justify-center text-center p-6 bg-gray-50">
        <div className="bg-white p-12 rounded-[3rem] shadow-xl border border-gray-100 max-w-md">
          <h1 className="text-6xl font-black text-gray-200 mb-6 font-sans tracking-tighter">
            404
          </h1>
          <p className="text-gray-500 font-medium mb-8">
            This grocery list doesn't exist or the link has expired.
          </p>
          <button
            onClick={() => (window.location.href = "/")}
            className="bg-green-600 text-white px-8 py-3 rounded-2xl font-bold"
          >
            Go Home
          </button>
        </div>
      </div>
    );

  const totalItems = list.items.length;
  const sentDate = new Date(list.createdAt).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const sentTime = new Date(list.createdAt).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="min-h-screen bg-[#f8f9fa] pb-20">
      {/* Premium Header Bar */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 h-20 shadow-sm">
        <div className="max-w-4xl mx-auto px-6 h-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-green-600 p-2 rounded-xl text-white">
              <ShoppingBasket size={24} />
            </div>
            <span className="text-xl font-black text-green-700 tracking-tighter">
              HomeGrocery
            </span>
          </div>
          <div className="bg-gray-100 px-4 py-1.5 rounded-full flex items-center gap-2 border border-gray-200">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs font-bold text-gray-600">LIVE VIEW</span>
          </div>
        </div>
      </nav>

      <main className="pt-32 px-6">
        <div className="max-w-2xl mx-auto">
          {/* Summary Card */}
          <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-gray-100 mb-10 overflow-hidden relative">
            <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
              <ShoppingBasket size={180} />
            </div>

            <h1 className="text-4xl font-black text-gray-900 mb-8 leading-tight">
              Grocery List
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center gap-4 bg-gray-50 p-5 rounded-3xl">
                <div className="bg-white p-3 rounded-2xl shadow-sm text-green-600">
                  <Package size={24} />
                </div>
                <div>
                  <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-0.5">
                    Total Items
                  </p>
                  <p className="text-xl font-black text-gray-900">
                    {totalItems}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-gray-50 p-5 rounded-3xl col-span-1 md:col-span-2">
                <div className="bg-white p-3 rounded-2xl shadow-sm text-green-600">
                  <Calendar size={24} />
                </div>
                <div>
                  <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-0.5">
                    Sent On
                  </p>
                  <p className="text-xl font-black text-gray-900">
                    {sentDate} <span className="text-gray-300 mx-2">|</span>{" "}
                    {sentTime}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Items List */}
          <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100">
            <div className="space-y-4">
              {list.items.map((item: any, index: number) => (
                <div
                  key={index}
                  className="flex items-center gap-6 p-4 rounded-3xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100 group"
                >
                  <div className="w-16 h-16 bg-gray-100 rounded-2xl flex-shrink-0 flex items-center justify-center overflow-hidden border border-gray-100">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                    />
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-lg font-bold text-gray-800">
                      {item.name}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black bg-green-50 text-green-700 px-3 py-1 rounded-full uppercase tracking-tighter">
                        {item.quantity}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <p className="mt-12 text-center text-gray-400 text-sm font-medium tracking-tight">
            This is a secure, read-only list generated by HomeGrocery.
          </p>
        </div>
      </main>
    </div>
  );
}
