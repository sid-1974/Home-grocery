"use client";

import { useState, useEffect, useCallback, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import api from "@/lib/api";
import {
  Plus,
  Send,
  History,
  LogOut,
  Trash2,
  Search,
  Share2,
  Copy,
  Check,
  ShoppingCart,
  Loader2,
  X,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  PackagePlus,
  Image as ImageIcon,
  MessageCircle,
  Instagram,
  ChevronDown,
  Edit2,
  Languages,
  Mic,
  MicOff,
  Lightbulb,
  Layers,
} from "lucide-react";
import { toast, Toaster } from "react-hot-toast";
import Link from "next/link";

import { Product, CartItem, Suggestion, QUANTITY_UNITS } from "@/types";
import { Button } from "@/components/Button";
import { ProductCard } from "@/components/ProductCard";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { VoiceListeningModal } from "@/components/VoiceListeningModal";



function GroceryContent() {
  const { user, logout, loading: authLoading } = useAuth();
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [localSearchQuery, setLocalSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);
  const [showTranslateHint, setShowTranslateHint] = useState(true);

  useEffect(() => {
    // 1. Initial page load: show for 3 seconds, then collapse
    const initialTimeout = setTimeout(() => {
      setShowTranslateHint(false);
    }, 3000);

    // 2. Setup the loop to show the hint for 3 seconds every 10 seconds of off-time (13 seconds total interval)
    const interval = setInterval(() => {
      setShowTranslateHint(true);
      const activeTimeout = setTimeout(() => {
        setShowTranslateHint(false);
      }, 3000);
      return () => clearTimeout(activeTimeout);
    }, 13000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

  // Debounce search keystrokes to prevent rendering lag
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(localSearchQuery);
    }, 300);
    return () => clearTimeout(timer);
  }, [localSearchQuery]);

  // UI states
  const [shareableId, setShareableId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoadingCart, setIsLoadingCart] = useState(true);
  const [editingListId, setEditingListId] = useState<string | null>(null);

  useEffect(() => {
    const editId = searchParams.get("edit");
    if (editId) setEditingListId(editId);
  }, [searchParams]);
  const [copySuccess, setCopySuccess] = useState(false);
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  const [showManualModal, setShowManualModal] = useState(false);

  // Manual Product Form State
  const [newProd, setNewProd] = useState({
    nameEn: "",
    nameKn: "",
    imageUrl: "",
  });
  const [isAddingManual, setIsAddingManual] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Suggestion Form State
  const [showSuggestModal, setShowSuggestModal] = useState(false);
  const [suggestProd, setSuggestProd] = useState({
    nameEn: "",
    nameKn: "",
    comments: "",
  });
  const [isSubmittingSuggest, setIsSubmittingSuggest] = useState(false);
  const [isTranslatingSuggest, setIsTranslatingSuggest] = useState(false);

  // Suggestions List State
  const [showSuggestionsListModal, setShowSuggestionsListModal] = useState(false);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);

  // Custom Confirmation Dialog State
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    confirmLabel?: string;
    variant?: "primary" | "danger" | "warning" | "dark";
    onConfirm: () => void;
  } | null>(null);

  // States for quantity editing
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editAmount, setEditAmount] = useState("");
  const [editUnit, setEditUnit] = useState("kg");



  const searchRef = useRef<HTMLDivElement>(null);
  const cartRef = useRef<HTMLDivElement>(null);

  const [searchLang, setSearchLang] = useState<"en-IN" | "kn-IN">("en-IN");

  const startListening = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      toast.error("Voice search not supported");
      return;
    }

    if (isListening && recognitionRef.current) {
      recognitionRef.current.abort();
      setIsListening(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;
    recognition.lang = searchLang;
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => {
      setIsListening(false);
      recognitionRef.current = null;
    };
    recognition.onerror = () => {
      setIsListening(false);
      recognitionRef.current = null;
      toast.error("Voice search failed");
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setLocalSearchQuery(transcript);
      setSearchQuery(transcript);
      setPage(1);
      toast.success(`Searching for: ${transcript}`);
    };

    recognition.start();
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.abort();
    }
    setIsListening(false);
  };

  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, []);

  const fetchProducts = useCallback(async () => {
    setIsLoadingProducts(true);
    try {
      const res = await api.get("/products", {
        params: {
          page,
          limit: 12,
          search: searchQuery,
        },
      });
      setProducts(res.data.products);
      setTotalPages(res.data.totalPages);


    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setIsLoadingProducts(false);
    }
  }, [page, searchQuery]);

  const getCartItem = useCallback(
    (p: Product) => {
      const fullName = p.nameKn ? `${p.nameEn} (${p.nameKn})` : p.nameEn;
      return cartItems.find((item) => item.name === fullName);
    },
    [cartItems],
  );
  const calculateTotalWeight = () => {
    let grams = 0;
    let ml = 0;
    cartItems.forEach((item) => {
      const match = item.quantity.match(/^([\d.]+)\s*(.*)$/);
      if (!match) return;
      const amount = parseFloat(match[1]);
      const unit = match[2].toLowerCase();
      if (unit === "kg") grams += amount * 1000;
      else if (unit === "gram" || unit === "g") grams += amount;
      else if (unit === "ltr") ml += amount * 1000;
      else if (unit === "ml") ml += amount;
    });

    const parts = [];
    if (grams > 0)
      parts.push(grams >= 1000 ? `${grams / 1000}kg` : `${grams}g`);
    if (ml > 0) parts.push(ml >= 1000 ? `${ml / 1000}ltr` : `${ml}ml`);
    return parts.join(" + ") || "0";
  };

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    if (user) fetchCart();
  }, [user]);

  const fetchCart = async () => {
    setIsLoadingCart(true);
    try {
      const res = await api.get("/cart");
      setCartItems(res.data.items);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoadingCart(false);
    }
  };

  const handleManualAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProd.nameEn || !newProd.imageUrl)
      return toast.error("Please fill Name and Image URL");
    setIsAddingManual(true);
    try {
      if (editingProduct) {
        await api.patch(`/products/manual/${editingProduct.id}`, newProd);
        toast.success("Product updated successfully!");
      } else {
        await api.post("/products/manual", newProd);
        toast.success("Product added successfully!");
      }
      setShowManualModal(false);
      setEditingProduct(null);
      setNewProd({ nameEn: "", nameKn: "", imageUrl: "" });
      fetchProducts();
    } catch (err) {
      toast.error(editingProduct ? "Failed to update" : "Failed to add");
    } finally {
      setIsAddingManual(false);
    }
  };

  const handleTranslate = async () => {
    if (!newProd.nameEn) return toast.error("Enter English name first");
    setIsTranslating(true);
    try {
      const res = await api.get(
        `/products/translate?text=${encodeURIComponent(newProd.nameEn)}`,
      );
      setNewProd({ ...newProd, nameKn: res.data.translatedText });
      toast.success("Translated to Kannada!");
    } catch (err) {
      toast.error("Translation failed");
    } finally {
      setIsTranslating(false);
    }
  };

  const handleSuggestSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!suggestProd.nameEn) return toast.error("Please fill Name (English)");
    setIsSubmittingSuggest(true);
    try {
      await api.post("/suggestions", suggestProd);
      toast.success("Suggestion submitted successfully to Admin! 💡");
      setShowSuggestModal(false);
      setSuggestProd({ nameEn: "", nameKn: "", comments: "" });
    } catch (err) {
      toast.error("Failed to submit suggestion");
    } finally {
      setIsSubmittingSuggest(false);
    }
  };

  const handleSuggestTranslate = async () => {
    if (!suggestProd.nameEn) return toast.error("Enter English name first");
    setIsTranslatingSuggest(true);
    try {
      const res = await api.get(
        `/products/translate?text=${encodeURIComponent(suggestProd.nameEn)}`,
      );
      setSuggestProd({ ...suggestProd, nameKn: res.data.translatedText });
      toast.success("Translated to Kannada!");
    } catch (err) {
      toast.error("Translation failed");
    } finally {
      setIsTranslatingSuggest(false);
    }
  };

  const fetchSuggestions = async () => {
    setIsLoadingSuggestions(true);
    try {
      const res = await api.get("/suggestions");
      setSuggestions(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load suggestions");
    } finally {
      setIsLoadingSuggestions(false);
    }
  };

  useEffect(() => {
    if (showSuggestionsListModal) {
      fetchSuggestions();
    }
  }, [showSuggestionsListModal]);

  const handleDeleteSuggestion = (id: string) => {
    setConfirmDialog({
      isOpen: true,
      title: "Delete Suggestion",
      message: "Are you sure you want to delete this suggestion? This action cannot be undone.",
      confirmLabel: "Delete",
      variant: "danger",
      onConfirm: async () => {
        try {
          await api.delete(`/suggestions/${id}`);
          toast.success("Suggestion deleted successfully!");
          fetchSuggestions();
        } catch (err) {
          console.error(err);
          toast.error("Failed to delete suggestion");
        } finally {
          setConfirmDialog(null);
        }
      },
    });
  };

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      await api.patch(`/suggestions/${id}/status`, { status: newStatus });
      toast.success(`Suggestion status updated to ${newStatus}!`);
      fetchSuggestions();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update status");
    }
  };

  const openEditModal = useCallback((p: Product) => {
    setEditingProduct(p);
    setNewProd({ nameEn: p.nameEn, nameKn: p.nameKn || "", imageUrl: p.image });
    setShowManualModal(true);
  }, []);

  const deleteProduct = useCallback((id: string | number) => {
    setConfirmDialog({
      isOpen: true,
      title: "Delete Product",
      message: "Are you sure you want to delete this product? This will remove it from the catalog.",
      confirmLabel: "Delete",
      variant: "danger",
      onConfirm: async () => {
        try {
          await api.delete(`/products/${id}`);
          toast.success("Deleted");
          fetchProducts();
        } catch (err) {
          toast.error("Failed to delete");
        } finally {
          setConfirmDialog(null);
        }
      },
    });
  }, [fetchProducts, setConfirmDialog]);

  const handleLogoutClick = () => {
    setConfirmDialog({
      isOpen: true,
      title: "Sign Out",
      message: "Are you sure you want to sign out of your account?",
      confirmLabel: "Sign Out",
      variant: "dark",
      onConfirm: () => {
        logout();
        setConfirmDialog(null);
      },
    });
  };

  const addToCart = useCallback(async (
    name: string,
    quantity: string,
    imageUrl: string,
  ) => {
    try {
      const res = await api.post("/cart/item", { name, quantity, imageUrl });
      setCartItems(res.data.items);
      toast.success(`Added ${name}`);
    } catch (err) {
      toast.error("Failed to add item");
    }
  }, []);

  const removeItem = async (itemId: string) => {
    try {
      const res = await api.delete(`/cart/item/${itemId}`);
      setCartItems(res.data.items);
      toast.success("Removed");
    } catch (err) {
      toast.error("Failed to remove");
    }
  };

  const updateQuantity = async (
    itemId: string,
    amount: string,
    unit: string,
  ) => {
    try {
      const quantity = `${amount} ${unit}`;
      const res = await api.patch(`/cart/item/${itemId}`, { quantity });
      setCartItems(res.data.items);
      setEditingId(null);
      toast.success("Updated");
    } catch (err) {
      toast.error("Failed to update");
    }
  };

  const saveAndShare = async () => {
    if (cartItems.length === 0) return toast.error("Cart is empty");
    setIsSaving(true);
    try {
      let res;
      if (editingListId) {
        res = await api.put(`/lists/${editingListId}`, { items: cartItems });
        toast.success("List updated successfully!");
      } else {
        res = await api.post("/lists", { items: cartItems });
        toast.success("Ready to share!");
      }
      setShareableId(res.data.shareableId);
      await api.delete("/cart");
      setCartItems([]);
      setEditingListId(null);
      // Clear URL params without refreshing
      window.history.replaceState({}, "", "/");
    } catch (err) {
      toast.error("Failed to share");
    } finally {
      setIsSaving(false);
    }
  };

  const getShareLink = (id: string) => `${window.location.origin}/share/${id}`;
  const copyToClipboard = (id: string) => {
    navigator.clipboard.writeText(getShareLink(id));
    setCopySuccess(true);
    toast.success("Link copied!");
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const shareWhatsApp = (id: string) => {
    const text = `Grocery list on Home Grocery: ${getShareLink(id)}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
  };

  const shareInstagram = (id: string) => {
    copyToClipboard(id);
    window.open("https://www.instagram.com/direct/inbox/", "_blank");
  };

  if (authLoading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-green-600" size={48} />
      </div>
    );
  if (!user) {
    if (typeof window !== "undefined") window.location.href = "/home";
    return null;
  }

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <Toaster />

      {/* Voice Listening Overlay Modal */}
      <VoiceListeningModal
        isOpen={isListening}
        searchLang={searchLang}
        onCancel={stopListening}
      />

      {/* Suggest Product Modal */}
      {showSuggestModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-md p-4 sm:p-6">
          <div className="bg-white rounded-[2rem] sm:rounded-[3rem] p-6 sm:p-10 max-w-md w-full shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="flex justify-between items-center mb-6 sm:mb-8">
              <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-gray-900 flex items-center gap-2">
                <Lightbulb className="text-green-600 animate-bounce" size={28} />
                <span>Suggest Item</span>
              </h3>
              <button
                onClick={() => {
                  setShowSuggestModal(false);
                  setSuggestProd({ nameEn: "", nameKn: "", comments: "" });
                }}
                className="p-3 hover:bg-gray-100 rounded-full transition-colors text-gray-400"
              >
                <X size={28} />
              </button>
            </div>

            <form onSubmit={handleSuggestSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">
                  Item Name (English)
                </label>
                <div className="relative group">
                  <input
                    autoFocus
                    placeholder="e.g. Fresh Mangoes"
                    className="w-full bg-gray-50 rounded-2xl py-4 px-6 pr-14 outline-none focus:ring-2 focus:ring-green-500 font-bold text-gray-700"
                    value={suggestProd.nameEn}
                    onChange={(e) =>
                      setSuggestProd({ ...suggestProd, nameEn: e.target.value })
                    }
                  />
                  <button
                    type="button"
                    onClick={handleSuggestTranslate}
                    disabled={isTranslatingSuggest}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-white text-green-600 rounded-xl shadow-sm hover:shadow-md transition-all disabled:opacity-50"
                    title="Translate to Kannada"
                  >
                    {isTranslatingSuggest ? (
                      <Loader2 size={18} className="animate-spin" />
                    ) : (
                      <Languages size={18} />
                    )}
                  </button>
                </div>
              </div>

              {suggestProd.nameKn && (
                <div className="space-y-2 animate-in slide-in-from-top-2 duration-300">
                  <label className="text-[10px] font-black text-green-600 uppercase tracking-widest ml-1 bg-green-50 px-2 py-0.5 rounded-md">
                    ಕನ್ನಡ ಹೆಸರು (Kannada Name)
                  </label>
                  <input
                    placeholder="Kannada translation"
                    className="w-full bg-green-50/50 border border-green-100 rounded-2xl py-4 px-6 outline-none focus:ring-2 focus:ring-green-500 font-bold text-gray-700"
                    value={suggestProd.nameKn}
                    onChange={(e) =>
                      setSuggestProd({ ...suggestProd, nameKn: e.target.value })
                    }
                  />
                </div>
              )}

              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">
                  Comments / Reason (Optional)
                </label>
                <textarea
                  placeholder="Why do we need this item? (e.g. for dinner party)"
                  rows={3}
                  className="w-full bg-gray-50 rounded-2xl py-4 px-6 outline-none focus:ring-2 focus:ring-green-500 font-bold text-gray-700 text-sm resize-none"
                  value={suggestProd.comments}
                  onChange={(e) =>
                    setSuggestProd({ ...suggestProd, comments: e.target.value })
                  }
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                isLoading={isSubmittingSuggest}
                icon={<Send size={18} />}
                className="w-full mt-4"
              >
                SUBMIT SUGGESTION
              </Button>
            </form>
          </div>
        </div>
      )}

      {/* Suggestions List Modal */}
      {showSuggestionsListModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-md p-4 sm:p-6">
          <div className="bg-white rounded-[2rem] sm:rounded-[3rem] p-6 sm:p-10 max-w-2xl w-full shadow-2xl animate-in zoom-in-95 duration-300 max-h-[85vh] flex flex-col">
            <div className="flex justify-between items-center mb-6 shrink-0">
              <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-gray-900 flex items-center gap-2">
                <MessageCircle className="text-green-600 animate-pulse" size={28} />
                <span>Suggestions {user?.role === "admin" ? "(Admin View)" : ""}</span>
              </h3>
              <button
                onClick={() => setShowSuggestionsListModal(false)}
                className="p-3 hover:bg-gray-100 rounded-full transition-colors text-gray-400"
              >
                <X size={28} />
              </button>
            </div>

            {isLoadingSuggestions ? (
              <div className="flex flex-col items-center justify-center py-20 flex-1">
                <Loader2 className="animate-spin text-green-600 mb-4" size={40} />
                <span className="text-gray-500 font-bold">Loading suggestions...</span>
              </div>
            ) : suggestions.length === 0 ? (
              <div className="text-center py-20 flex-1">
                <p className="text-gray-400 font-bold text-lg mb-2">No suggestions found.</p>
                <p className="text-gray-500 text-sm">
                  {user?.role === "admin" 
                    ? "Users have not submitted any suggestions yet." 
                    : "You haven't submitted any suggestions yet."}
                </p>
              </div>
            ) : (
              <div className="overflow-y-auto pr-2 space-y-4 flex-1">
                {suggestions.map((sug) => {
                  const suggestionUserId = typeof sug.userId === "object" ? sug.userId?._id : sug.userId;
                  const isOwnerOrAdmin = user?.role === "admin" || (suggestionUserId && suggestionUserId === user?.id);
                  
                  return (
                    <div 
                      key={sug._id} 
                      className="p-5 bg-gray-50/60 rounded-2xl border border-gray-100/50 hover:bg-white hover:shadow-lg transition-all duration-300 relative group/sug"
                    >
                      <div className="flex justify-between items-start gap-4 mb-2">
                        <div>
                          <h4 className="font-black text-gray-900 text-lg leading-tight">
                            {sug.nameEn}
                          </h4>
                          {sug.nameKn && (
                            <p className="text-green-600 font-bold text-sm mt-0.5">
                              {sug.nameKn}
                            </p>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-2 shrink-0">
                          {/* Status Badge */}
                          <span className={`px-3 py-1 rounded-xl text-[10px] font-black uppercase tracking-wider ${
                            sug.status === "approved" 
                              ? "bg-green-100 text-green-700" 
                              : sug.status === "rejected"
                              ? "bg-red-100 text-red-700"
                              : "bg-amber-100 text-amber-700"
                          }`}>
                            {sug.status || "pending"}
                          </span>

                          {/* Admin Status Dropdown */}
                          {user?.role === "admin" && (
                            <select
                              value={sug.status || "pending"}
                              onChange={(e) => handleUpdateStatus(sug._id, e.target.value)}
                              className="px-2 py-1 bg-white border border-gray-200 rounded-xl text-[11px] font-black text-gray-700 outline-none cursor-pointer hover:border-green-300 transition-colors shadow-sm"
                            >
                              <option value="pending">Pending</option>
                              <option value="approved">Approve</option>
                              <option value="rejected">Reject</option>
                            </select>
                          )}

                          {/* Delete Button */}
                          {isOwnerOrAdmin && (
                            <button
                              onClick={() => handleDeleteSuggestion(sug._id)}
                              className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                              title="Delete Suggestion"
                            >
                              <Trash2 size={16} />
                            </button>
                          )}
                        </div>
                      </div>

                      {sug.comments && (
                        <p className="text-gray-500 text-sm font-semibold bg-white p-3 rounded-xl border border-gray-100 mt-2 italic">
                          "{sug.comments}"
                        </p>
                      )}

                      {sug.status === "rejected" && sug.rejectionReason && (
                        <div className="bg-red-50/50 border border-red-100 p-3 rounded-xl mt-2">
                          <p className="text-[9px] font-black text-red-500 uppercase tracking-widest mb-1">Reason for Rejection</p>
                          <p className="text-red-700 text-xs font-bold italic">"{sug.rejectionReason}"</p>
                        </div>
                      )}

                      <div className="flex items-center justify-between text-[10px] font-bold text-gray-400 mt-3 border-t border-gray-100/50 pt-2">
                        <span>
                          {user?.role === "admin" && typeof sug.userId === "object" && sug.userId?.email 
                            ? `Suggested by: ${sug.userId.email}` 
                            : "My Suggestion"}
                        </span>
                        <span>
                          {new Date(sug.createdAt).toLocaleDateString(undefined, {
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Manual Product Modal */}
      {showManualModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-md p-4 sm:p-6">
          <div className="bg-white rounded-[2rem] sm:rounded-[3rem] p-6 sm:p-10 max-w-md w-full shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="flex justify-between items-center mb-6 sm:mb-8">
              <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-gray-900">
                {editingProduct ? "Edit Product" : "Add Product"}
              </h3>
              <button
                onClick={() => {
                  setShowManualModal(false);
                  setEditingProduct(null);
                  setNewProd({ nameEn: "", nameKn: "", imageUrl: "" });
                }}
                className="p-3 hover:bg-gray-100 rounded-full transition-colors text-gray-400"
              >
                <X size={28} />
              </button>
            </div>

            <form onSubmit={handleManualAdd} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">
                  Product Name
                </label>
                <div className="relative group">
                  <input
                    autoFocus
                    placeholder="e.g. Organic Milk"
                    className="w-full bg-gray-50 rounded-2xl py-4 px-6 pr-14 outline-none focus:ring-2 focus:ring-green-500 font-bold text-gray-700"
                    value={newProd.nameEn}
                    onChange={(e) =>
                      setNewProd({ ...newProd, nameEn: e.target.value })
                    }
                  />
                  <button
                    type="button"
                    onClick={handleTranslate}
                    disabled={isTranslating}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-white text-green-600 rounded-xl shadow-sm hover:shadow-md transition-all disabled:opacity-50"
                    title="Translate to Kannada"
                  >
                    {isTranslating ? (
                      <Loader2 size={18} className="animate-spin" />
                    ) : (
                      <Languages size={18} />
                    )}
                  </button>
                </div>
              </div>

              {newProd.nameKn && (
                <div className="space-y-2 animate-in slide-in-from-top-2 duration-300">
                  <label className="text-[10px] font-black text-green-600 uppercase tracking-widest ml-1 bg-green-50 px-2 py-0.5 rounded-md">
                    ಕನ್ನಡ ಹೆಸರು (Kannada Name)
                  </label>
                  <input
                    placeholder="ಹೆಸರನ್ನು ಇಲ್ಲಿ ತೋರಿಸಲಾಗುತ್ತದೆ"
                    className="w-full bg-green-50/50 border border-green-100 rounded-2xl py-4 px-6 outline-none focus:ring-2 focus:ring-green-500 font-bold text-gray-700"
                    value={newProd.nameKn}
                    onChange={(e) =>
                      setNewProd({ ...newProd, nameKn: e.target.value })
                    }
                  />
                </div>
              )}

              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">
                  Image URL
                </label>
                <div className="relative">
                  <ImageIcon
                    className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300"
                    size={20}
                  />
                  <input
                    placeholder="https://images.unsplash.com/..."
                    className="w-full bg-gray-50 rounded-2xl py-4 pl-14 pr-6 outline-none focus:ring-2 focus:ring-green-500 font-bold text-gray-700 text-sm"
                    value={newProd.imageUrl}
                    onChange={(e) =>
                      setNewProd({ ...newProd, imageUrl: e.target.value })
                    }
                  />
                </div>
              </div>

              <Button
                type="submit"
                variant="dark"
                size="lg"
                isLoading={isAddingManual}
                icon={editingProduct ? <Edit2 size={18} /> : <Plus size={18} />}
                className="w-full mt-4"
              >
                {editingProduct ? "UPDATE PRODUCT" : "SAVE PRODUCT"}
              </Button>
            </form>
          </div>
        </div>
      )}

      {/* Share Modal */}
      {shareableId && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-6">
          <div className="bg-white rounded-[3rem] p-10 max-sm:p-8 max-w-sm w-full shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-black tracking-tight">
                List Ready!
              </h3>
              <button
                onClick={() => setShareableId(null)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X />
              </button>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <button
                onClick={() => copyToClipboard(shareableId)}
                className="flex items-center gap-4 p-5 bg-gray-50 rounded-[2rem] hover:bg-green-50 transition-all font-bold"
              >
                <div className="bg-white p-3 rounded-2xl shadow-sm text-green-600">
                  {copySuccess ? <Check /> : <Copy />}
                </div>{" "}
                Copy Link
              </button>
              <button
                onClick={() => shareWhatsApp(shareableId)}
                className="flex items-center gap-4 p-5 bg-gray-50 rounded-[2rem] hover:bg-emerald-50 transition-all font-bold"
              >
                <div className="bg-white p-3 rounded-2xl shadow-sm text-emerald-600">
                  <MessageCircle />
                </div>{" "}
                WhatsApp
              </button>
              <button
                onClick={() => shareInstagram(shareableId)}
                className="flex items-center gap-4 p-5 bg-gray-50 rounded-[2rem] hover:bg-pink-50 group transition-all font-bold"
              >
                <div className="bg-white p-3 rounded-2xl shadow-sm text-pink-600 group-hover:scale-110 transition-transform">
                  <Instagram size={24} />
                </div>{" "}
                Instagram
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <nav className="fixed top-0 w-full z-50 bg-white border-b border-gray-100 h-20 shadow-sm">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 h-full flex items-center gap-2 sm:gap-4">
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="bg-white/10 rounded-xl overflow-hidden shadow-sm">
              <img src="/icon.png" alt="Home Grocery Logo" className="w-8 h-8 sm:w-10 sm:h-10 object-cover" />
            </div>
            <span className="text-xl font-black text-green-700 hidden lg:block">
              Home Grocery
            </span>
            {user?.role === "admin" && (
              <span className="bg-black text-white text-[10px] font-black px-2 py-0.5 rounded-md ml-1 uppercase tracking-tighter hidden sm:block">
                Admin
              </span>
            )}
          </div>

          <div className="flex-1 relative" ref={searchRef}>
            <Search
              className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              placeholder="Search..."
              className={`w-full bg-gray-100 rounded-2xl py-2.5 sm:py-3 pl-10 sm:pl-12 outline-none focus:ring-2 focus:ring-green-500 transition-all duration-500 font-bold text-gray-700 text-sm sm:text-base ${
                showTranslateHint ? "pr-48" : "pr-28"
              }`}
              value={localSearchQuery}
              onFocus={() => setShowSearchSuggestions(true)}
              onChange={(e) => {
                setLocalSearchQuery(e.target.value);
                setPage(1);
              }}
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
              <button
                onClick={() =>
                  setSearchLang(searchLang === "en-IN" ? "kn-IN" : "en-IN")
                }
                className="h-8 flex items-center gap-1 text-[10px] font-black bg-white px-2.5 rounded-lg border border-gray-100 text-gray-600 hover:text-green-600 hover:border-green-200 transition-all duration-500 shadow-sm overflow-hidden"
              >
                <Languages size={12} className="text-green-600 shrink-0" />
                <span className="shrink-0">{searchLang === "en-IN" ? "EN" : "KN"}</span>
                <span
                  className={`transition-all duration-500 ease-in-out overflow-hidden text-[9px] font-bold text-gray-400 shrink-0 ${
                    showTranslateHint ? "max-w-[80px] ml-1 opacity-100" : "max-w-0 opacity-0"
                  }`}
                >
                  {searchLang === "en-IN" ? "Translate here" : "ಇಲ್ಲಿ ಭಾಷಾಂತರಿಸಿ"}
                </span>
              </button>
              <button
                onClick={startListening}
                className={`w-8 h-8 flex items-center justify-center rounded-lg transition-all border ${
                  isListening
                    ? "bg-red-100 text-red-600 border-red-200 animate-pulse"
                    : "bg-white text-gray-400 hover:text-green-600 border-gray-100 shadow-sm"
                }`}
              >
                {isListening ? <MicOff size={16} /> : <Mic size={16} />}
              </button>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-3 flex-shrink-0">
            {/* Desktop Add Button (Admin Only) */}
            {user?.role === "admin" && (
              <>
                <Link href="/admin/suggestions">
                  <button
                    className="hidden sm:flex bg-green-600 text-white px-5 py-3 rounded-2xl font-black text-sm items-center gap-2 hover:bg-green-700 transition-all shadow-lg shadow-green-100/50"
                  >
                    <Layers size={20} />
                    <span className="hidden lg:inline">DASHBOARD</span>
                  </button>
                </Link>
                <button
                  onClick={() => setShowManualModal(true)}
                  className="hidden sm:flex bg-black text-white px-5 py-3 rounded-2xl font-black text-sm items-center gap-2 hover:bg-gray-800 transition-all shadow-lg shadow-gray-200"
                >
                  <PackagePlus size={20} />
                  <span className="hidden lg:inline">ADD PRODUCT</span>
                </button>
              </>
            )}

            {/* Desktop Suggest Button (Standard User Only) */}
            {user?.role !== "admin" && (
              <button
                onClick={() => setShowSuggestModal(true)}
                className="hidden sm:flex bg-green-600 text-white px-5 py-3 rounded-2xl font-black text-sm items-center gap-2 hover:bg-green-700 transition-all shadow-lg shadow-green-100/50"
              >
                <Lightbulb size={20} />
                <span className="hidden lg:inline">SUGGEST ITEM</span>
              </button>
            )}

            {user && user.role !== "admin" && (
              <>
                <div className="hidden sm:block w-[1px] h-8 bg-gray-100 mx-1"></div>
                <button
                  onClick={() => setShowSuggestionsListModal(true)}
                  className="p-2 sm:p-3 bg-gray-50 rounded-full hover:bg-green-50 text-gray-500 hover:text-green-600 transition-all"
                  title="View Suggestions"
                >
                  <MessageCircle size={20} className="sm:w-[22px] sm:h-[22px]" />
                </button>
              </>
            )}
            <Link
              href="/history"
              className="p-2 sm:p-3 bg-gray-50 rounded-full hover:bg-green-50 text-gray-500 hover:text-green-600 transition-all"
            >
              <History size={20} className="sm:w-[22px] sm:h-[22px]" />
            </Link>
            <button
              onClick={handleLogoutClick}
              className="p-2 sm:p-3 bg-gray-50 rounded-full hover:bg-red-50 text-gray-500 hover:text-red-600 transition-all"
            >
              <LogOut size={20} className="sm:w-[22px] sm:h-[22px]" />
            </button>
          </div>
        </div>
      </nav>

      {/* Floating Action Button for Mobile (Admin Only) */}
      {user?.role === "admin" && (
        <button
          onClick={() => setShowManualModal(true)}
          className="sm:hidden fixed bottom-6 right-6 z-[60] bg-black text-white p-5 rounded-full shadow-2xl shadow-gray-400 hover:scale-110 active:scale-95 transition-all flex items-center justify-center"
        >
          <Plus size={28} strokeWidth={3} />
        </button>
      )}

      {/* Floating Action Button for Mobile (Standard User Suggestion) */}
      {user?.role !== "admin" && (
        <button
          onClick={() => setShowSuggestModal(true)}
          className="sm:hidden fixed bottom-6 right-6 z-[60] bg-green-600 text-white p-5 rounded-full shadow-2xl shadow-green-400/50 hover:scale-110 active:scale-95 transition-all flex items-center justify-center"
        >
          <Lightbulb size={28} strokeWidth={2.5} />
        </button>
      )}

      {/* Main Content */}
      <main className="pt-24 sm:pt-28 px-2 sm:px-6 max-w-[1400px] mx-auto pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">
          <div className="lg:col-span-8">
            <div className="flex items-center justify-between mb-4 sm:mb-8 px-1 sm:px-0">
              <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
                Your Groceries
              </h1>
              <div className="flex items-center gap-2">
                {user?.role === "admin" && (
                  <Link href="/admin/suggestions" className="lg:hidden">
                    <button
                      className="p-3 bg-green-50 text-green-600 rounded-2xl border border-green-100 flex items-center justify-center hover:bg-green-100 transition-all"
                      title="Admin Suggestions Dashboard"
                    >
                      <Layers size={24} />
                    </button>
                  </Link>
                )}
                <button
                  onClick={() =>
                    cartRef.current?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="lg:hidden p-3 bg-green-50 text-green-600 rounded-2xl border border-green-100 flex items-center gap-2 relative group"
                >
                  <ShoppingCart size={24} />
                  {cartItems.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-green-600 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-black animate-in zoom-in duration-300">
                      {cartItems.length}
                    </span>
                  )}
                </button>
              </div>
            </div>

            {isLoadingProducts ? (
              <div className="py-20 flex flex-col items-center justify-center">
                <Loader2
                  size={40}
                  className="animate-spin text-green-600 mb-4"
                />
                <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">
                  Loading items...
                </p>
              </div>
            ) : products.length === 0 ? (
              <div className="py-20 text-center bg-white rounded-[3rem] border border-dashed border-gray-100 flex flex-col items-center justify-center p-6">
                <p className="text-gray-300 font-black text-2xl uppercase">
                  No products found
                </p>
                <p className="text-gray-400 font-medium mt-2 mb-6">
                  {searchQuery ? `Can't find "${searchQuery}"?` : "Get started by suggesting an item."}
                </p>
                {user?.role !== "admin" ? (
                  <Button
                    variant="primary"
                    size="md"
                    onClick={() => {
                      setSuggestProd({
                        nameEn: searchQuery,
                        nameKn: "",
                        comments: "",
                      });
                      setShowSuggestModal(true);
                    }}
                    icon={<Lightbulb size={18} />}
                  >
                    SUGGEST THIS ITEM
                  </Button>
                ) : (
                  <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">
                    Use floating button to add product
                  </p>
                )}
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-6">
                  {products.map((p) => (
                    <ProductCard
                      key={p.id}
                      product={p}
                      isAdmin={user?.role === "admin"}
                      cartItem={getCartItem(p)}
                      onEditProduct={openEditModal}
                      onDeleteProduct={deleteProduct}
                      onAddToCart={addToCart}
                    />
                  ))}
                </div>

                <div className="mt-14 flex items-center justify-center gap-4">
                  <button
                    disabled={page === 1}
                    onClick={() => {
                      setPage(page - 1);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="p-4 bg-white rounded-2xl border border-gray-100 shadow-sm disabled:opacity-20 hover:bg-green-50 transition-all"
                  >
                    <ChevronLeft />
                  </button>
                  <div className="bg-white px-8 py-4 rounded-2xl border border-gray-100 font-black text-xs tracking-widest text-gray-400 uppercase">
                    PAGE {page} / {totalPages}
                  </div>
                  <button
                    disabled={page === totalPages}
                    onClick={() => {
                      setPage(page + 1);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="p-4 bg-white rounded-2xl border border-gray-100 shadow-sm disabled:opacity-20 hover:bg-green-50 transition-all"
                  >
                    <ChevronRight />
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Cart Sidebar */}
          <div className="lg:col-span-4 sticky top-28 h-fit" ref={cartRef}>
            <div className="bg-white rounded-[2.5rem] p-8 shadow-2xl shadow-gray-200/50 border border-gray-100">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2 text-gray-900 font-black text-xl">
                  <ShoppingCart className="text-green-600" /> My Cart
                </div>
                <span className="bg-green-600 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                  Total Items: {cartItems.length}
                </span>
              </div>

              <div className="space-y-2 max-h-[400px] overflow-y-auto mb-6 pr-2 custom-scrollbar">
                {cartItems.length === 0 ? (
                  <div className="py-12 text-center opacity-30 grayscale items-center flex flex-col justify-center">
                    <img src="/icon.png" alt="" className="w-16 h-16 object-cover rounded-2xl mb-4" />
                    <p className="text-xs font-black uppercase">
                      Start adding items
                    </p>
                  </div>
                ) : (
                  cartItems.map((item) => (
                    <div
                      key={item._id}
                      className="bg-gray-50/50 p-2.5 rounded-2xl border border-gray-50 flex items-center gap-3 group"
                    >
                      <img
                        src={item.imageUrl}
                        className="w-12 h-12 rounded-xl object-cover"
                        alt=""
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-extrabold text-gray-800 truncate text-sm leading-tight">
                          {item.name}
                        </p>
                        {editingId === item._id ? (
                          <div className="flex gap-1 mt-1">
                            <input
                              type="number"
                              min="0"
                              className="w-12 bg-white rounded-lg px-1 py-1 text-[10px] font-black text-center outline-none border border-gray-100"
                              value={editAmount}
                              onChange={(e) => {
                                const val = e.target.value;
                                if (val === "" || parseFloat(val) >= 0) {
                                  setEditAmount(val);
                                }
                              }}
                            />
                            <select
                              className="flex-1 bg-white rounded-lg px-1 py-1 text-[8px] font-black uppercase outline-none border border-gray-100"
                              value={editUnit}
                              onChange={(e) => setEditUnit(e.target.value)}
                            >
                              {QUANTITY_UNITS.map((u) => (
                                <option key={u} value={u}>
                                  {u}
                                </option>
                              ))}
                            </select>
                            <button
                              onClick={() =>
                                updateQuantity(item._id!, editAmount, editUnit)
                              }
                              className="bg-green-600 text-white p-1 rounded-lg hover:bg-green-700"
                            >
                              <Check size={12} strokeWidth={4} />
                            </button>
                            <button
                              onClick={() => setEditingId(null)}
                              className="bg-gray-200 text-gray-600 p-1 rounded-lg hover:bg-gray-300"
                            >
                              <X size={12} strokeWidth={4} />
                            </button>
                          </div>
                        ) : (
                          <p className="text-[10px] font-black text-green-600 uppercase tracking-widest">
                            {item.quantity}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-1">
                        {editingId !== item._id && (
                          <button
                            onClick={() => {
                              const [amount, unit] = item.quantity.split(" ");
                              setEditingId(item._id!);
                              setEditAmount(amount || "1");
                              setEditUnit(unit || "kg");
                            }}
                            className="text-gray-300 hover:text-green-500 p-2 transition-colors"
                          >
                            <Edit2 size={16} />
                          </button>
                        )}
                        <button
                          onClick={() => removeItem(item._id!)}
                          className="text-gray-300 hover:text-red-500 p-2 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {cartItems.length > 0 && (
                <Button
                  variant="dark"
                  size="md"
                  onClick={saveAndShare}
                  isLoading={isSaving}
                  icon={<Send size={20} />}
                  className="w-full py-5 rounded-3xl"
                >
                  SEND LIST
                </Button>
              )}
            </div>
          </div>
        </div>
      </main>
      <div className="fixed bottom-0 w-full h-8 bg-gradient-to-t from-gray-50 to-transparent pointer-events-none"></div>

      {confirmDialog && (
        <ConfirmDialog
          isOpen={confirmDialog.isOpen}
          title={confirmDialog.title}
          message={confirmDialog.message}
          confirmLabel={confirmDialog.confirmLabel}
          variant={confirmDialog.variant}
          onConfirm={confirmDialog.onConfirm}
          onClose={() => setConfirmDialog(null)}
        />
      )}
    </div>
  );
}

export default function Home() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#f8f9fa]">
          <Loader2 className="animate-spin text-green-600" size={48} />
        </div>
      }
    >
      <GroceryContent />
    </Suspense>
  );
}
