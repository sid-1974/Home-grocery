"use client";

import { useState, useEffect, useCallback, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import api from "@/lib/api";
import {
  ShoppingBasket,
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
} from "lucide-react";
import { toast, Toaster } from "react-hot-toast";
import Link from "next/link";

interface Product {
  id: string | number;
  nameEn: string;
  image: string;
}

interface CartItem {
  _id?: string;
  name: string;
  quantity: string;
  imageUrl: string;
}

const QUANTITY_UNITS = ["kg", "gram", "ltr", "ml", "packet", "item"];

function GroceryContent() {
  const { user, logout, loading: authLoading } = useAuth();
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);

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
  const [newProd, setNewProd] = useState({ name: "", imageUrl: "" });
  const [isAddingManual, setIsAddingManual] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // States for quantity editing
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editAmount, setEditAmount] = useState("");
  const [editUnit, setEditUnit] = useState("kg");

  // Product specific quantity states
  const [prodAmounts, setProdAmounts] = useState<{ [key: string]: string }>({});
  const [prodUnits, setProdUnits] = useState<{ [key: string]: string }>({});

  const searchRef = useRef<HTMLDivElement>(null);

  const fetchProducts = useCallback(async () => {
    setIsLoadingProducts(true);
    try {
      const res = await api.get(
        `/products?page=${page}&limit=12&search=${searchQuery}`,
      );
      setProducts(res.data.products);
      setTotalPages(res.data.totalPages);

      const amounts: { [key: string]: string } = {};
      const units: { [key: string]: string } = {};
      res.data.products.forEach((p: Product) => {
        amounts[String(p.id)] = "1";
        units[String(p.id)] = "kg";
      });
      setProdAmounts((prev) => ({ ...prev, ...amounts }));
      setProdUnits((prev) => ({ ...prev, ...units }));
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setIsLoadingProducts(false);
    }
  }, [page, searchQuery]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchProducts();
    }, 300);
    return () => clearTimeout(timer);
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
    if (!newProd.name || !newProd.imageUrl)
      return toast.error("Please fill all fields");
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
      setNewProd({ name: "", imageUrl: "" });
      fetchProducts();
    } catch (err) {
      toast.error(editingProduct ? "Failed to update" : "Failed to add");
    } finally {
      setIsAddingManual(false);
    }
  };

  const openEditModal = (p: Product) => {
    setEditingProduct(p);
    setNewProd({ name: p.nameEn, imageUrl: p.image });
    setShowManualModal(true);
  };

  const deleteProduct = async (id: string | number) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      await api.delete(`/products/${id}`);
      toast.success("Deleted");
      fetchProducts();
    } catch (err) {
      toast.error("Failed to delete");
    }
  };

  const addToCart = async (
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
  };

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
    const text = `Grocery list on FreshMarket: ${getShareLink(id)}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
  };

  if (authLoading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-green-600" size={48} />
      </div>
    );
  if (!user) {
    if (typeof window !== "undefined") window.location.href = "/login";
    return null;
  }

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <Toaster />

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
                  setNewProd({ name: "", imageUrl: "" });
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
                <input
                  autoFocus
                  placeholder="e.g. Organic Milk"
                  className="w-full bg-gray-50 rounded-2xl py-4 px-6 outline-none focus:ring-2 focus:ring-green-500 font-bold text-gray-700"
                  value={newProd.name}
                  onChange={(e) =>
                    setNewProd({ ...newProd, name: e.target.value })
                  }
                />
              </div>

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

              <button
                disabled={isAddingManual}
                className="w-full bg-black text-white py-4 sm:py-5 rounded-[1.5rem] sm:rounded-[2rem] font-black text-base sm:text-lg hover:bg-gray-800 transition-all flex items-center justify-center gap-3 shadow-xl shadow-gray-200 mt-4 disabled:opacity-50"
              >
                {isAddingManual ? (
                  <Loader2 className="animate-spin" />
                ) : editingProduct ? (
                  <Edit2 />
                ) : (
                  <Plus />
                )}{" "}
                {editingProduct ? "UPDATE PRODUCT" : "SAVE PRODUCT"}
              </button>
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
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <nav className="fixed top-0 w-full z-50 bg-white border-b border-gray-100 h-20 shadow-sm">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 h-full flex items-center gap-2 sm:gap-4">
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="bg-green-600 p-2 rounded-xl text-white">
              <ShoppingBasket size={22} className="sm:w-6 sm:h-6" />
            </div>
            <span className="text-xl font-black text-green-700 hidden lg:block">
              FreshMarket
            </span>
          </div>

          <div className="flex-1 relative" ref={searchRef}>
            <Search
              className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              placeholder="Search..."
              className="w-full bg-gray-100 rounded-2xl py-2.5 sm:py-3 pl-10 sm:pl-12 pr-4 outline-none focus:ring-2 focus:ring-green-500 transition-all font-bold text-gray-700 text-sm sm:text-base"
              value={searchQuery}
              onFocus={() => setShowSearchSuggestions(true)}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setPage(1);
              }}
            />
          </div>

          <div className="flex items-center gap-1.5 sm:gap-3 flex-shrink-0">
            {/* Desktop Add Button */}
            <button
              onClick={() => setShowManualModal(true)}
              className="hidden sm:flex bg-black text-white px-5 py-3 rounded-2xl font-black text-sm items-center gap-2 hover:bg-gray-800 transition-all shadow-lg shadow-gray-200"
            >
              <PackagePlus size={20} />
              <span className="hidden lg:inline">ADD PRODUCT</span>
            </button>

            <div className="hidden sm:block w-[1px] h-8 bg-gray-100 mx-1"></div>
            <Link
              href="/history"
              className="p-2 sm:p-3 bg-gray-50 rounded-full hover:bg-green-50 text-gray-500 hover:text-green-600 transition-all"
            >
              <History size={20} className="sm:w-[22px] sm:h-[22px]" />
            </Link>
            <button
              onClick={logout}
              className="p-2 sm:p-3 bg-gray-50 rounded-full hover:bg-red-50 text-gray-500 hover:text-red-600 transition-all"
            >
              <LogOut size={20} className="sm:w-[22px] sm:h-[22px]" />
            </button>
          </div>
        </div>
      </nav>

      {/* Floating Action Button for Mobile */}
      <button
        onClick={() => setShowManualModal(true)}
        className="sm:hidden fixed bottom-6 right-6 z-[60] bg-black text-white p-5 rounded-full shadow-2xl shadow-gray-400 hover:scale-110 active:scale-95 transition-all flex items-center justify-center"
      >
        <Plus size={28} strokeWidth={3} />
      </button>

      {/* Main Content */}
      <main className="pt-28 px-6 max-w-[1400px] mx-auto pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8">
            <h2 className="text-3xl font-black text-gray-900 tracking-tight mb-8">
              Your Groceries
            </h2>

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
              <div className="py-20 text-center bg-white rounded-[3rem] border border-dashed border-gray-100">
                <p className="text-gray-300 font-black text-2xl uppercase">
                  No products yet
                </p>
                <p className="text-gray-400 font-medium mt-2">
                  Click "+ ADD PRODUCT" to start your gallery.
                </p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                  {products.map((p) => (
                    <div
                      key={p.id}
                      className="bg-white rounded-[2rem] p-5 shadow-sm border border-transparent hover:border-green-100 hover:shadow-xl transition-all group relative"
                    >
                      <div className="aspect-square bg-gray-50 rounded-2xl mb-4 overflow-hidden relative group/img">
                        <img
                          src={p.image}
                          className="w-full h-full object-cover group-hover/img:scale-110 transition-all duration-700"
                        />
                        <div className="absolute top-3 right-3 flex flex-col gap-2 translate-x-12 group-hover/img:translate-x-0 transition-transform duration-300">
                          <button
                            onClick={() => openEditModal(p)}
                            className="p-2 bg-white/90 backdrop-blur-md text-gray-600 rounded-xl hover:bg-white hover:text-green-600 shadow-xl border border-white/50"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => deleteProduct(p.id)}
                            className="p-2 bg-white/90 backdrop-blur-md text-red-500 rounded-xl hover:bg-red-50 shadow-xl border border-white/50"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                      <h3 className="font-extrabold text-lg leading-tight text-gray-900 group-hover:text-green-600 transition-colors">
                        {p.nameEn}
                      </h3>
                      <div className="flex gap-2 mb-4 bg-gray-50 p-1.5 rounded-2xl mt-4">
                        <input
                          type="number"
                          className="w-14 bg-white rounded-xl px-2 py-2.5 text-sm font-black text-center outline-none shadow-sm focus:ring-2 focus:ring-green-500"
                          value={prodAmounts[String(p.id)] || "1"}
                          onChange={(e) =>
                            setProdAmounts({
                              ...prodAmounts,
                              [String(p.id)]: e.target.value,
                            })
                          }
                        />
                        <select
                          className="flex-1 bg-white rounded-xl px-2 py-2.5 text-[10px] font-black uppercase outline-none appearance-none cursor-pointer shadow-sm focus:ring-2 focus:ring-green-500"
                          value={prodUnits[String(p.id)] || "kg"}
                          onChange={(e) =>
                            setProdUnits({
                              ...prodUnits,
                              [String(p.id)]: e.target.value,
                            })
                          }
                        >
                          {QUANTITY_UNITS.map((u) => (
                            <option key={u} value={u}>
                              {u}
                            </option>
                          ))}
                        </select>
                      </div>
                      <button
                        onClick={() =>
                          addToCart(
                            `${p.nameEn}`,
                            `${prodAmounts[String(p.id)] || "1"} ${prodUnits[String(p.id)] || "kg"}`,
                            p.image,
                          )
                        }
                        className="w-full bg-green-600 text-white py-4 rounded-[1.25rem] font-black text-xs sm:text-sm hover:bg-green-700 shadow-xl shadow-green-100 flex items-center justify-center gap-2 transform active:scale-95 transition-all mt-2"
                      >
                        <Plus size={20} strokeWidth={3} /> ADD TO CART
                      </button>
                    </div>
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
          <div className="lg:col-span-4 sticky top-28 h-fit">
            <div className="bg-white rounded-[2.5rem] p-8 shadow-2xl shadow-gray-200/50 border border-gray-100">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2 text-gray-900 font-black text-xl">
                  <ShoppingCart className="text-green-600" /> My Cart
                </div>
                <span className="bg-green-600 text-white px-3 py-1 rounded-full text-[10px] font-black">
                  {cartItems.length}
                </span>
              </div>
              <div className="space-y-4 max-h-[400px] overflow-y-auto mb-8 pr-2 custom-scrollbar">
                {cartItems.length === 0 ? (
                  <div className="py-12 text-center opacity-30 grayscale">
                    <ShoppingBasket size={48} className="mx-auto mb-4" />
                    <p className="text-xs font-black uppercase">
                      Start adding items
                    </p>
                  </div>
                ) : (
                  cartItems.map((item) => (
                    <div
                      key={item._id}
                      className="bg-gray-50/50 p-4 rounded-3xl border border-gray-50 flex items-center gap-4 group"
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
                              className="w-12 bg-white rounded-lg px-1 py-1 text-[10px] font-black text-center outline-none border border-gray-100"
                              value={editAmount}
                              onChange={(e) => setEditAmount(e.target.value)}
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
                <button
                  onClick={saveAndShare}
                  disabled={isSaving}
                  className="w-full bg-black text-white py-5 rounded-3xl font-black text-sm flex items-center justify-center gap-3 hover:bg-gray-800 transition-all shadow-xl shadow-gray-200"
                >
                  {isSaving ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    <Send size={20} />
                  )}{" "}
                  {isSaving ? "SHARING..." : "SEND LIST"}
                </button>
              )}
            </div>
          </div>
        </div>
      </main>
      <div className="fixed bottom-0 w-full h-8 bg-gradient-to-t from-gray-50 to-transparent pointer-events-none"></div>
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
