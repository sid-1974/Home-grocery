"use client";

import { useState } from "react";
import api from "@/lib/api";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { toast, Toaster } from "react-hot-toast";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/register", { email, password });
      login(res.data.token, res.data.user);
      toast.success("Registration successful!");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <Toaster />
      <div className="max-w-md w-full bg-white rounded-[2.5rem] p-12 shadow-2xl shadow-gray-200">
        <h2 className="text-3xl font-bold text-center mb-8">
          Join FreshMarket
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              required
              className="w-full px-6 py-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-green-500 outline-none transition-all"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              required
              className="w-full px-6 py-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-green-500 outline-none transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white py-4 rounded-2xl font-bold text-lg hover:bg-gray-800 transition-all shadow-lg shadow-gray-100"
          >
            Create Account
          </button>
        </form>
        <p className="text-center mt-8 text-gray-500">
          Already have an account?{" "}
          <Link href="/login" className="text-green-600 font-bold">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
