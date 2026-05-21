import { useState, memo } from "react";
import { Plus, Edit2, Trash2, ChevronDown } from "lucide-react";
import { toast } from "react-hot-toast";
import { Product, CartItem, QUANTITY_UNITS } from "../types";
import { Button } from "./Button";


interface ProductCardProps {
  product: Product;
  isAdmin: boolean;
  cartItem?: CartItem;
  onEditProduct: (p: Product) => void;
  onDeleteProduct: (id: string | number) => void;
  onAddToCart: (name: string, quantity: string, imageUrl: string) => void;
}

export const ProductCard = memo(function ProductCard({
  product,
  isAdmin,
  cartItem,
  onEditProduct,
  onDeleteProduct,
  onAddToCart,
}: ProductCardProps) {
  const [amount, setAmount] = useState("0");
  const [unit, setUnit] = useState("kg");

  return (
    <div className="bg-white rounded-2xl sm:rounded-[2.5rem] p-2 sm:p-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/50 hover:shadow-[0_20px_50px_rgba(34,197,94,0.1)] hover:border-green-100/50 hover:-translate-y-1 transition-all duration-500 group relative flex flex-col h-full mt-1 sm:mt-2">
      {/* Image Layer */}
      <div className="aspect-[4/3] bg-gray-50 rounded-xl sm:rounded-[2rem] mb-3 sm:mb-6 overflow-hidden relative group/img shrink-0">
        <img
          src={product.image}
          alt={product.nameEn}
          className="w-full h-full object-cover group-hover/img:scale-110 transition-all duration-1000 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-500" />

        {/* Status Badges */}
        {cartItem && (
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-2xl shadow-xl flex items-center gap-2 animate-in slide-in-from-left-4 duration-500">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[10px] font-black text-gray-900 uppercase tracking-tight">
              {cartItem.quantity} in cart
            </span>
          </div>
        )}

        {/* Admin Controls */}
        {isAdmin && (
          <div className="absolute top-4 right-4 flex flex-col gap-2 translate-x-12 opacity-0 group-hover/img:translate-x-0 group-hover/img:opacity-100 transition-all duration-500">
            <button
              onClick={() => onEditProduct(product)}
              className="p-2.5 bg-white/95 backdrop-blur-md text-gray-600 rounded-2xl hover:bg-white hover:text-green-600 shadow-2xl border border-white/50 transform hover:scale-110 transition-all"
            >
              <Edit2 size={18} />
            </button>
            <button
              onClick={() => onDeleteProduct(product.id)}
              className="p-2.5 bg-white/95 backdrop-blur-md text-red-500 rounded-2xl hover:bg-red-50 shadow-2xl border border-white/50 transform hover:scale-110 transition-all"
            >
              <Trash2 size={18} />
            </button>
          </div>
        )}
      </div>

      {/* Content Layer */}
      <div className="px-0.5 sm:px-2 flex flex-col flex-1">
        <div className="mb-2 sm:mb-4">
          <h3 className="font-black text-sm sm:text-xl leading-tight text-gray-900 group-hover:text-green-600 transition-colors duration-300 truncate">
            {product.nameEn}
          </h3>
          {product.nameKn && (
            <p className="text-gray-400 font-bold text-sm mt-1">
              {product.nameKn}
            </p>
          )}
        </div>

        <div className="mt-auto space-y-2 sm:space-y-4">
          {/* Quantity Selector */}
          <div className="grid grid-cols-1 gap-2 p-1.5 bg-gray-100/30 backdrop-blur-sm rounded-[1.5rem] border border-gray-100 group-hover:bg-white transition-all duration-500">
            {/* Number Input Side */}
            <div className="flex items-center justify-between bg-white rounded-2xl p-1 shadow-sm border border-gray-100/50">
              <button
                onClick={() => {
                  const val = parseFloat(amount || "0");
                  setAmount(String(Math.max(0, val - 1)));
                }}
                className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-xl transition-all font-black"
              >
                -
              </button>
              <input
                type="number"
                min="0"
                className="w-full bg-transparent text-sm font-black text-center outline-none text-gray-900 min-w-0"
                value={amount}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === "" || parseFloat(val) >= 0) {
                    setAmount(val);
                  }
                }}
              />
              <button
                onClick={() => {
                  const val = parseFloat(amount || "0");
                  setAmount(String(val + 1));
                }}
                className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-xl transition-all font-black"
              >
                +
              </button>
            </div>

            {/* Unit Select Side */}
            <div className="relative">
              <select
                className="w-full h-full bg-white rounded-2xl py-3 pl-4 pr-10 text-[11px] font-black uppercase outline-none appearance-none cursor-pointer shadow-sm border border-gray-100/50 focus:border-green-200 transition-all text-gray-900"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
              >
                {QUANTITY_UNITS.map((u) => (
                  <option
                    key={u}
                    value={u}
                    className="text-gray-900 font-bold"
                  >
                    {u}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={14}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
              />
            </div>
          </div>

          {/* Action Button */}
          <Button
            variant="primary"
            onClick={() => {
              if (parseFloat(amount) <= 0) return toast.error("Select quantity");
              onAddToCart(
                product.nameKn
                  ? `${product.nameEn} (${product.nameKn})`
                  : product.nameEn,
                `${amount} ${unit}`,
                product.image,
              );
              setAmount("0");
            }}
            className="w-full py-3 sm:py-4.5 rounded-[1.25rem] sm:rounded-[1.5rem] text-[8px] min-[320px]:text-[9px] sm:text-xs tracking-tight sm:tracking-[0.2em] whitespace-nowrap gap-1 sm:gap-3 mb-1 sm:mb-2 px-1 sm:px-2"
            icon={<Plus size={12} className="sm:w-5 sm:h-5" strokeWidth={4} />}
          >
            ADD TO CART
          </Button>
        </div>
      </div>
    </div>
  );
});

ProductCard.displayName = "ProductCard";
