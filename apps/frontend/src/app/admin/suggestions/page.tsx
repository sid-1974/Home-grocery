"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import api from "@/lib/api";
import {
  ChevronLeft,
  Trash2,
  Check,
  X,
  Calendar,
  AlertCircle,
  Clock,
  CheckCircle2,
  XCircle,
  Loader2,
  Layers,
} from "lucide-react";
import Link from "next/link";
import { toast, Toaster } from "react-hot-toast";
import { Button } from "@/components/Button";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { Suggestion } from "@/types";

export default function AdminSuggestionsPage() {
  const { user, loading: authLoading } = useAuth();
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "pending" | "approved" | "rejected">("all");
  
  // Modal / Dialogue States
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    confirmLabel?: string;
    variant?: "primary" | "danger" | "warning" | "dark";
    onConfirm: () => void;
  } | null>(null);

  const [showRejectModal, setShowRejectModal] = useState<string | null>(null); // suggestion ID
  const [rejectReason, setRejectReason] = useState("");
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      window.location.href = "/home";
    }
  }, [user, authLoading]);

  useEffect(() => {
    if (user && user.role === "admin") {
      fetchSuggestions();
    }
  }, [user]);

  const fetchSuggestions = async () => {
    try {
      const res = await api.get("/suggestions");
      setSuggestions(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load suggestions");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = (id: string) => {
    setConfirmDialog({
      isOpen: true,
      title: "Approve Suggestion",
      message: "Are you sure you want to approve this suggestion? This will send an email notification to the user.",
      confirmLabel: "Approve",
      variant: "primary",
      onConfirm: async () => {
        setIsUpdatingStatus(true);
        try {
          await api.patch(`/suggestions/${id}/status`, { status: "approved" });
          toast.success("Suggestion approved successfully!");
          fetchSuggestions();
        } catch (err) {
          console.error(err);
          toast.error("Failed to approve suggestion");
        } finally {
          setIsUpdatingStatus(false);
          setConfirmDialog(null);
        }
      },
    });
  };

  const handleRejectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!showRejectModal) return;
    if (!rejectReason.trim()) {
      toast.error("Please provide a reason for rejection");
      return;
    }

    setIsUpdatingStatus(true);
    try {
      await api.patch(`/suggestions/${showRejectModal}/status`, {
        status: "rejected",
        rejectionReason: rejectReason,
      });
      toast.success("Suggestion rejected and user notified via email!");
      setShowRejectModal(null);
      setRejectReason("");
      fetchSuggestions();
    } catch (err) {
      console.error(err);
      toast.error("Failed to reject suggestion");
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  const handleDelete = (id: string) => {
    setConfirmDialog({
      isOpen: true,
      title: "Delete Suggestion",
      message: "Are you sure you want to delete this suggestion? This action is permanent.",
      confirmLabel: "Delete",
      variant: "danger",
      onConfirm: async () => {
        setIsUpdatingStatus(true);
        try {
          await api.delete(`/suggestions/${id}`);
          toast.success("Suggestion deleted successfully!");
          fetchSuggestions();
        } catch (err) {
          console.error(err);
          toast.error("Failed to delete suggestion");
        } finally {
          setIsUpdatingStatus(false);
          setConfirmDialog(null);
        }
      },
    });
  };

  // Helper counts
  const totalCount = suggestions.length;
  const pendingCount = suggestions.filter((s) => s.status === "pending" || !s.status).length;
  const approvedCount = suggestions.filter((s) => s.status === "approved").length;
  const rejectedCount = suggestions.filter((s) => s.status === "rejected").length;

  const filteredSuggestions = suggestions.filter((s) => {
    if (filter === "all") return true;
    if (filter === "pending") return s.status === "pending" || !s.status;
    return s.status === filter;
  });

  if (authLoading || (loading && user?.role === "admin")) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8f9fa]">
        <Loader2 className="animate-spin text-green-600" size={48} />
      </div>
    );
  }

  if (!user || user.role !== "admin") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#f8f9fa] p-6 text-center">
        <div className="bg-red-50 text-red-600 p-6 rounded-[2rem] border border-red-100 max-w-sm mb-6 shadow-sm">
          <AlertCircle className="mx-auto mb-4" size={48} />
          <h2 className="text-2xl font-black tracking-tight mb-2">Access Denied</h2>
          <p className="font-semibold text-sm">
            Only administrators are authorized to access this dashboard.
          </p>
        </div>
        <Link href="/">
          <Button variant="dark" size="md">
            Go Back Home
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f9fa] pb-20">
      <Toaster />

      {/* Header Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white shadow-sm border-b border-gray-100 h-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-full flex items-center justify-between gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-gray-500 hover:text-green-600 transition-colors font-black text-xs bg-gray-50 px-4 py-2.5 rounded-xl border border-gray-100 shrink-0"
          >
            <ChevronLeft size={18} />
            <span>BACK</span>
          </Link>

          <div className="flex items-center gap-2 min-w-0">
            <div className="bg-white/10 rounded-xl overflow-hidden shadow-sm border border-gray-100 shrink-0">
              <img src="/icon.png" alt="Home Grocery Logo" className="w-8 h-8 sm:w-10 sm:h-10 object-cover" />
            </div>
            <span className="text-sm sm:text-xl font-black text-green-700 tracking-tighter truncate leading-none">
              Suggestions
            </span>
            <span className="bg-black text-white text-[8px] sm:text-[10px] font-black px-2 py-0.5 rounded-md uppercase tracking-tighter shrink-0">
              Admin
            </span>
          </div>
        </div>
      </nav>

      {/* Main Content Container */}
      <main className="pt-32 px-4 sm:px-6 max-w-6xl mx-auto animate-in fade-in duration-300">
        {/* Statistics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-10">
          <div className="bg-white p-5 rounded-[2rem] border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-gray-50 text-gray-700 rounded-2xl border border-gray-100">
              <Layers size={22} />
            </div>
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-wider">Total Suggestions</p>
              <h4 className="text-2xl font-black text-gray-900 leading-none mt-1">{totalCount}</h4>
            </div>
          </div>

          <div className="bg-white p-5 rounded-[2rem] border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl border border-amber-100">
              <Clock size={22} />
            </div>
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-wider">Pending Review</p>
              <h4 className="text-2xl font-black text-gray-900 leading-none mt-1">{pendingCount}</h4>
            </div>
          </div>

          <div className="bg-white p-5 rounded-[2rem] border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-green-50 text-green-600 rounded-2xl border border-green-100">
              <CheckCircle2 size={22} />
            </div>
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-wider">Approved Items</p>
              <h4 className="text-2xl font-black text-gray-900 leading-none mt-1">{approvedCount}</h4>
            </div>
          </div>

          <div className="bg-white p-5 rounded-[2rem] border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-red-50 text-red-600 rounded-2xl border border-red-100">
              <XCircle size={22} />
            </div>
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-wider">Rejected Items</p>
              <h4 className="text-2xl font-black text-gray-900 leading-none mt-1">{rejectedCount}</h4>
            </div>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex bg-white p-1.5 rounded-2xl border border-gray-100 shadow-sm">
            {(["all", "pending", "approved", "rejected"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setFilter(t)}
                className={`px-4 py-2 text-xs font-black uppercase tracking-wider rounded-xl transition-all ${
                  filter === t
                    ? "bg-green-600 text-white shadow-md shadow-green-100"
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Suggestions List */}
        <div className="space-y-4">
          {filteredSuggestions.length === 0 ? (
            <div className="bg-white rounded-[2.5rem] py-24 text-center border border-dashed border-gray-200 font-bold text-gray-300">
              NO SUGGESTIONS FOUND FOR "{filter.toUpperCase()}"
            </div>
          ) : (
            filteredSuggestions.map((sug) => {
              const dateString = new Date(sug.createdAt).toLocaleDateString(undefined, {
                month: "short",
                day: "numeric",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              });
              
              const submitterEmail = typeof sug.userId === "object" && sug.userId?.email 
                ? sug.userId.email 
                : "Unknown user";

              const status = sug.status || "pending";

              return (
                <div
                  key={sug._id}
                  className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-gray-100 hover:shadow-xl hover:shadow-gray-200/40 transition-all group relative overflow-hidden"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    {/* Item details */}
                    <div className="space-y-3 flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                            status === "approved"
                              ? "bg-green-100 text-green-700"
                              : status === "rejected"
                              ? "bg-red-100 text-red-700"
                              : "bg-amber-100 text-amber-700"
                          }`}
                        >
                          {status}
                        </span>
                        
                        <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 bg-gray-50 border border-gray-100/50 px-3 py-1 rounded-full">
                          <Calendar size={12} />
                          <span>{dateString}</span>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <h3 className="text-xl font-black text-gray-900 truncate">
                          {sug.nameEn}
                        </h3>
                        {sug.nameKn && (
                          <p className="text-xs font-black text-green-600 bg-green-50 px-2.5 py-1 rounded-xl w-fit border border-green-100">
                            ಕನ್ನಡ: {sug.nameKn}
                          </p>
                        )}
                      </div>

                      {sug.comments && (
                        <div className="bg-gray-50/50 border border-gray-100 p-3 rounded-2xl max-w-xl">
                          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">User Comment</p>
                          <p className="text-sm font-semibold text-gray-600 italic">"{sug.comments}"</p>
                        </div>
                      )}

                      {status === "rejected" && sug.rejectionReason && (
                        <div className="bg-red-50/50 border border-red-100 p-3 rounded-2xl max-w-xl">
                          <p className="text-[10px] font-black text-red-500 uppercase tracking-widest mb-1">Rejection Reason</p>
                          <p className="text-sm font-semibold text-red-700 italic">"{sug.rejectionReason}"</p>
                        </div>
                      )}

                      <p className="text-[10px] font-black text-gray-400 tracking-wider">
                        Suggested by: <span className="text-gray-700 font-bold">{submitterEmail}</span>
                      </p>
                    </div>

                    {/* Action buttons */}
                    <div className="flex flex-row md:flex-col gap-2 shrink-0 justify-end items-center">
                      {status !== "approved" && (
                        <button
                          onClick={() => handleApprove(sug._id)}
                          className="bg-green-600 text-white px-5 py-3 rounded-2xl font-black text-xs tracking-wider uppercase flex items-center justify-center gap-1.5 hover:bg-green-700 transition-all shadow-md shadow-green-100 hover:shadow-lg w-full md:w-auto"
                        >
                          <Check size={14} strokeWidth={3} /> Approve
                        </button>
                      )}

                      {status !== "rejected" && (
                        <button
                          onClick={() => setShowRejectModal(sug._id)}
                          className="bg-red-50 text-red-600 border border-red-100 px-5 py-3 rounded-2xl font-black text-xs tracking-wider uppercase flex items-center justify-center gap-1.5 hover:bg-red-100 transition-all w-full md:w-auto"
                        >
                          <X size={14} strokeWidth={3} /> Reject
                        </button>
                      )}

                      <button
                        onClick={() => handleDelete(sug._id)}
                        className="bg-gray-50 text-gray-400 border border-gray-200 p-3.5 rounded-2xl hover:text-red-500 hover:bg-red-50 hover:border-red-100 transition-all shrink-0"
                        title="Delete Suggestion"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </main>

      {/* Reject Reason input dialog/modal */}
      {showRejectModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="absolute inset-0" onClick={() => setShowRejectModal(null)}></div>
          
          <div className="relative bg-white rounded-[2.5rem] p-6 sm:p-8 max-w-sm w-full shadow-2xl border border-gray-100/50 animate-in zoom-in-95 duration-200 flex flex-col items-center text-center">
            <button
              onClick={() => setShowRejectModal(null)}
              className="absolute right-6 top-6 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={18} />
            </button>

            <div className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-3xl w-fit mb-5 shadow-sm">
              <XCircle size={28} />
            </div>

            <h3 className="text-xl sm:text-2xl font-black tracking-tight text-gray-900 leading-tight">
              Reject Suggestion
            </h3>
            
            <p className="text-gray-500 font-medium text-xs mt-2 px-2 leading-relaxed">
              Please specify the reason why you are rejecting this item. The user will be notified with this reason via email.
            </p>

            <form onSubmit={handleRejectSubmit} className="w-full mt-5 space-y-4">
              <textarea
                required
                rows={3}
                placeholder="e.g. This item is already in the list or is inappropriate."
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 text-sm font-bold text-gray-700 outline-none focus:ring-2 focus:ring-red-500 placeholder-gray-400 transition-all resize-none"
              />

              <div className="w-full flex gap-3 pt-2">
                <Button
                  type="button"
                  variant="secondary"
                  size="md"
                  onClick={() => {
                    setShowRejectModal(null);
                    setRejectReason("");
                  }}
                  disabled={isUpdatingStatus}
                  className="flex-1 rounded-2xl py-3.5 text-xs"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="danger"
                  size="md"
                  isLoading={isUpdatingStatus}
                  className="flex-1 rounded-2xl py-3.5 text-xs"
                >
                  Reject
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ConfirmDialog Component */}
      {confirmDialog && (
        <ConfirmDialog
          isOpen={confirmDialog.isOpen}
          title={confirmDialog.title}
          message={confirmDialog.message}
          confirmLabel={confirmDialog.confirmLabel}
          variant={confirmDialog.variant}
          isLoading={isUpdatingStatus}
          onConfirm={confirmDialog.onConfirm}
          onClose={() => setConfirmDialog(null)}
        />
      )}
    </div>
  );
}
