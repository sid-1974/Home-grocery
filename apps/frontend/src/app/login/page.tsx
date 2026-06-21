"use client";

import { useState, useEffect } from "react";
import api from "@/lib/api";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { toast, Toaster } from "react-hot-toast";
import { Loader2 } from "lucide-react";
import OtpInput from "react-otp-input";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [isResetMode, setIsResetMode] = useState(false);
  const [resetStep, setResetStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const { login, user, loading: authLoading } = useAuth();

  useEffect(() => {
    if (!authLoading && user) {
      window.location.href = "/";
    }
  }, [user, authLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await api.post("/auth/login", { email, password });
      login(res.data.token, res.data.user);
      toast.success("Login successful!");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendResetOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await api.post("/auth/send-reset-otp", { email });
      toast.success("OTP sent to your email!");
      setResetStep(2);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyResetOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) return;
    setIsLoading(true);
    try {
      await api.post("/auth/verify-reset-otp", { email, otp });
      toast.success("OTP verified! Please set a new password.");
      setResetStep(3);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Invalid OTP");
      setOtp("");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    setIsLoading(true);
    try {
      const res = await api.post("/auth/reset-password", { email, newPassword, otp });
      toast.success(res.data.message || "Password reset successful!");
      setIsResetMode(false);
      setResetStep(1);
      setNewPassword("");
      setConfirmPassword("");
      setOtp("");
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || "Password reset failed";
      toast.error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <Toaster />
      <div className="max-w-md w-full bg-white rounded-[2.5rem] p-6 sm:p-12 shadow-2xl shadow-gray-200">
        <div className="flex justify-center mb-6">
          <div className="bg-white/10 rounded-2xl overflow-hidden shadow-sm border border-gray-100">
            <img src="/icon.png" alt="Home Grocery Logo" className="w-16 h-16 object-cover" />
          </div>
        </div>
        
        {isResetMode ? (
          <>
            <h2 className="text-3xl font-bold text-center mb-8">Reset Password</h2>
            <form onSubmit={
              resetStep === 1 ? handleSendResetOtp : 
              resetStep === 2 ? handleVerifyResetOtp : 
              handleResetSubmit
            } className="space-y-6">
              {resetStep === 1 && (
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
              )}
              {resetStep === 2 && (
                <div className="flex flex-col items-center mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-4">
                    Enter 6-digit OTP sent to {email}
                  </label>
                  <OtpInput
                    value={otp}
                    onChange={setOtp}
                    numInputs={6}
                    renderInput={(props) => <input {...props} />}
                    inputStyle={{
                      width: "2.5rem",
                      height: "3rem",
                      margin: "0 0.2rem",
                      fontSize: "1.25rem",
                      borderRadius: "0.5rem",
                      border: "1px solid #e5e7eb",
                      backgroundColor: "#f9fafb",
                      outline: "none",
                    }}
                    containerStyle={{
                      justifyContent: "center",
                    }}
                  />
                </div>
              )}
              {resetStep === 3 && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      New Password
                    </label>
                    <input
                      type="password"
                      required
                      className="w-full px-6 py-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-green-500 outline-none transition-all"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      required
                      className="w-full px-6 py-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-green-500 outline-none transition-all"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                </>
              )}
              <button
                type="submit"
                disabled={isLoading || (resetStep === 2 && otp.length !== 6)}
                className="w-full bg-green-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-green-700 transition-all shadow-lg shadow-green-100 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    <span>
                      {resetStep === 1 ? "SENDING OTP..." : 
                       resetStep === 2 ? "VERIFYING OTP..." : 
                       "RESETTING PASSWORD..."}
                    </span>
                  </>
                ) : (
                  resetStep === 1 ? "Send OTP" : 
                  resetStep === 2 ? "Verify OTP" : 
                  "Change Password"
                )}
              </button>
            </form>
            <p className="text-center mt-8 text-gray-500">
              Remember your password?{" "}
              <button
                type="button"
                onClick={() => {
                  setIsResetMode(false);
                  setResetStep(1);
                }}
                className="text-green-600 font-bold hover:underline focus:outline-none"
              >
                Sign In
              </button>
            </p>
          </>
        ) : (
          <>
            <h2 className="text-3xl font-bold text-center mb-8">Welcome Back</h2>
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
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setIsResetMode(true)}
                    className="text-sm font-bold text-green-600 hover:text-green-700 hover:underline focus:outline-none transition-all"
                  >
                    Forgot Password?
                  </button>
                </div>
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
                disabled={isLoading}
                className="w-full bg-green-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-green-700 transition-all shadow-lg shadow-green-100 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    <span>SIGNING IN...</span>
                  </>
                ) : (
                  "Sign In"
                )}
              </button>
            </form>
            <p className="text-center mt-8 text-gray-500">
              Don't have an account?{" "}
              <Link href="/register" className="text-green-600 font-bold whitespace-nowrap">
                Sign Up
              </Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
