"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import api from "@/lib/api";
import {
  History,
  ShoppingBasket,
  ExternalLink,
  ChevronLeft,
  Loader2,
  Calendar,
  Package,
  Trash2,
  Share2,
  Copy,
  Check,
  X,
  MessageCircle,
  Instagram,
  ChevronDown,
  ShoppingCart,
} from "lucide-react";
import Link from "next/link";
import { toast, Toaster } from "react-hot-toast";

export default function HistoryPage() {
  const { user, loading: authLoading } = useAuth();
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showShareModal, setShowShareModal] = useState<string | null>(null);
  const [copySuccess, setCopySuccess] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      fetchHistory();
    }
  }, [user]);

  const fetchHistory = async () => {
    try {
      const res = await api.get("/lists/history");
      setHistory(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteList = async (id: string) => {
    if (!confirm("Are you sure you want to delete this shared list?")) return;
    try {
      await api.delete(`/lists/${id}`);
      setHistory(history.filter((p) => p._id !== id));
      toast.success("List deleted from history");
    } catch (err) {
      toast.error("Failed to delete list");
    }
  };

  const getShareLink = (shareableId: string) =>
    `${window.location.origin}/share/${shareableId}`;

  const copyToClipboard = (shareableId: string) => {
    navigator.clipboard.writeText(getShareLink(shareableId));
    setCopySuccess(true);
    toast.success("Link copied!");
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const shareWhatsApp = (shareableId: string) => {
    const text = `Check out my grocery list on HomeGrocery: ${getShareLink(shareableId)}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
  };

  const reorderList = async (listItems: any[], listId: string) => {
    try {
      if (
        !confirm(
          "This will add all items from this list to your current cart. Continue?",
        )
      )
        return;
      await api.post("/cart/batch", { items: listItems, replace: true });
      toast.success("List loaded! Redirecting to editor...");
      setTimeout(() => (window.location.href = `/?edit=${listId}`), 1500);
    } catch (err) {
      toast.error("Failed to add items to cart");
    }
  };

  if (authLoading || loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-green-600" size={48} />
      </div>
    );

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <Toaster />

      {/* Share Options Modal */}
      {showShareModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-6">
          <div className="bg-white rounded-[3rem] p-10 max-w-sm w-full shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-black tracking-tight">Share List</h3>
              <button
                onClick={() => setShowShareModal(null)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <button
                onClick={() => copyToClipboard(showShareModal)}
                className="flex items-center gap-4 p-5 bg-gray-50 rounded-[2rem] hover:bg-green-50 group transition-all"
              >
                <div className="bg-white p-3 rounded-2xl shadow-sm text-green-600 group-hover:scale-110 transition-transform">
                  {copySuccess ? <Check size={24} /> : <Copy size={24} />}
                </div>
                <span className="font-bold text-lg">Copy Link</span>
              </button>

              <button
                onClick={() => shareWhatsApp(showShareModal)}
                className="flex items-center gap-4 p-5 bg-gray-50 rounded-[2rem] hover:bg-emerald-50 group transition-all"
              >
                <div className="bg-white p-3 rounded-2xl shadow-sm text-emerald-600 group-hover:scale-110 transition-transform">
                  <MessageCircle size={24} />
                </div>
                <span className="font-bold text-lg">WhatsApp</span>
              </button>

              <button
                onClick={() => {
                  copyToClipboard(showShareModal);
                  toast(
                    "Link copied! You can now paste it in Instagram Direct.",
                    { icon: "📸" },
                  );
                }}
                className="flex items-center gap-4 p-5 bg-gray-50 rounded-[2rem] hover:bg-pink-50 group transition-all"
              >
                <div className="bg-white p-3 rounded-2xl shadow-sm text-pink-600 group-hover:scale-110 transition-transform">
                  <Instagram size={24} />
                </div>
                <span className="font-bold text-lg">Instagram</span>
              </button>
            </div>

            <p className="text-center text-gray-400 text-xs mt-8 font-medium italic">
              Sharing generated link for public view.
            </p>
          </div>
        </div>
      )}

      <nav className="fixed top-0 w-full z-50 bg-white shadow-sm border-b border-gray-100 h-20">
        <div className="max-w-4xl mx-auto px-6 h-full flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-gray-500 hover:text-green-600 transition-colors font-bold text-sm bg-gray-50 px-4 py-2 rounded-xl border border-gray-100"
          >
            <ChevronLeft size={18} /> BACK TO GROCERY
          </Link>
          <div className="flex items-center gap-2">
            <div className="bg-green-600 p-2 rounded-xl text-white">
              <ShoppingBasket size={24} />
            </div>
            <span className="text-xl font-black text-green-700 tracking-tighter">
              HomeGrocery
            </span>
          </div>
          <div className="w-32"></div>
        </div>
      </nav>

      <main className="pt-32 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col items-center text-center mb-16 px-4">
            <div className="bg-black p-4 rounded-3xl text-white mb-6 shadow-xl shadow-gray-200">
              <History size={40} />
            </div>
            <h1 className="text-4xl font-black text-gray-900 tracking-tight">
              Sharing History
            </h1>
            <p className="text-gray-500 font-medium mt-2">
              Manage and re-share your previous grocery lists.
            </p>
          </div>

          <div className="space-y-4">
            {history.length === 0 ? (
              <div className="bg-white rounded-[3rem] py-24 text-center border-2 border-dashed border-gray-200 font-bold text-gray-300">
                NO SHARED LISTS YET
              </div>
            ) : (
              history.map((list) => {
                const date = new Date(list.createdAt).toLocaleDateString();
                const time = new Date(list.createdAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                });

                return (
                  <div
                    key={list._id}
                    className="bg-white p-5 md:p-6 rounded-[2.5rem] shadow-sm border border-gray-100 hover:shadow-2xl hover:shadow-gray-200/50 transition-all group relative overflow-hidden"
                  >
                    <div className="absolute -top-10 -right-10 opacity-[0.02] pointer-events-none group-hover:scale-110 transition-transform">
                      <ShoppingBasket size={200} />
                    </div>

                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1 rounded-full w-fit">
                          <Calendar size={14} strokeWidth={3} />
                          <span className="text-xs font-black uppercase tracking-widest">
                            {date}{" "}
                            <span className="text-green-300 mx-1">|</span>{" "}
                            {time}
                          </span>
                        </div>
                        <h3 className="text-2xl font-black text-gray-900">
                          Grocery List
                        </h3>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => reorderList(list.items, list._id)}
                          className="bg-green-600 text-white px-6 py-3 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-green-700 transition-all shadow-lg shadow-green-100"
                        >
                          BACK TO CART <ShoppingCart size={18} />
                        </button>
                        <button
                          onClick={() => setShowShareModal(list.shareableId)}
                          className="bg-black text-white px-6 py-3 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-gray-800 transition-all shadow-lg shadow-gray-100"
                        >
                          SHARE <Share2 size={18} />
                        </button>
                        <button
                          onClick={() => deleteList(list._id)}
                          className="p-3 bg-red-50 text-red-500 rounded-2xl hover:bg-red-100 transition-colors border border-red-100"
                          title="Delete List"
                        >
                          <Trash2 size={24} />
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div className="flex flex-wrap gap-3">
                        <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-2xl mr-2">
                          <Package size={16} className="text-gray-500" />
                          <span className="text-sm font-black text-gray-700">
                            {list.items.length} ITEMS
                          </span>
                        </div>
                        <div className="flex -space-x-3 overflow-hidden py-1">
                          {list.items
                            .slice(0, 5)
                            .map((item: any, i: number) => (
                              <img
                                key={i}
                                className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
                                src={item.imageUrl}
                                alt=""
                              />
                            ))}
                          {list.items.length > 5 && (
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-[10px] font-black text-gray-400 ring-2 ring-white">
                              +{list.items.length - 5}
                            </div>
                          )}
                        </div>
                      </div>

                      <button
                        onClick={() =>
                          setExpandedId(
                            expandedId === list._id ? null : list._id,
                          )
                        }
                        className="flex items-center gap-2 text-xs font-black text-green-600 hover:text-green-700 transition-colors uppercase tracking-widest bg-green-50 px-4 py-2 rounded-xl"
                      >
                        {expandedId === list._id ? "Hide Items" : "View Items"}
                        <ChevronDown
                          size={16}
                          className={`transition-transform duration-300 ${expandedId === list._id ? "rotate-180" : ""}`}
                        />
                      </button>
                    </div>

                    {expandedId === list._id && (
                      <div className="mt-4 pt-4 border-t border-gray-50 animate-in slide-in-from-top-4 duration-300">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {list.items.map((item: any, i: number) => (
                            <div
                              key={i}
                              className="flex items-center gap-3 bg-gray-50/50 p-2.5 rounded-2xl border border-gray-50 hover:bg-gray-50 transition-colors"
                            >
                              <div className="h-12 w-12 rounded-xl bg-white p-1 overflow-hidden shadow-sm flex-shrink-0">
                                <img
                                  src={item.imageUrl}
                                  className="h-full w-full object-cover rounded-lg"
                                  alt=""
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-extrabold text-sm text-gray-800 truncate">
                                  {item.name}
                                </p>
                                <p className="text-[10px] font-black text-green-600 uppercase tracking-widest">
                                  {item.quantity}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
