import React from "react";
import { X, Trash2, LogOut, AlertCircle, HelpCircle } from "lucide-react";
import { Button } from "./Button";

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "primary" | "danger" | "warning" | "dark";
  isLoading?: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

export function ConfirmDialog({
  isOpen,
  title,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  variant = "primary",
  isLoading = false,
  onConfirm,
  onClose,
}: ConfirmDialogProps) {
  if (!isOpen) return null;

  // Icon select based on variant
  const getIcon = () => {
    switch (variant) {
      case "danger":
        return <Trash2 className="text-red-600" size={28} />;
      case "warning":
        return <AlertCircle className="text-amber-600" size={28} />;
      case "dark":
        return <LogOut className="text-gray-900" size={28} />;
      default:
        return <HelpCircle className="text-green-600" size={28} />;
    }
  };

  // Icon container bg color based on variant
  const getIconBg = () => {
    switch (variant) {
      case "danger":
        return "bg-red-50 border-red-100";
      case "warning":
        return "bg-amber-50 border-amber-100";
      case "dark":
        return "bg-gray-100 border-gray-200";
      default:
        return "bg-green-50 border-green-100";
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 sm:p-6 transition-all duration-300">
      {/* Click outside to close */}
      <div className="absolute inset-0" onClick={onClose}></div>
      
      {/* Modal Card */}
      <div className="relative bg-white rounded-[2.5rem] p-6 sm:p-8 max-w-sm w-full shadow-2xl border border-gray-100/50 animate-in zoom-in-95 duration-200 flex flex-col items-center text-center">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-6 top-6 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        {/* Icon */}
        <div className={`p-4 rounded-3xl border ${getIconBg()} mb-5 shadow-sm`}>
          {getIcon()}
        </div>

        {/* Title */}
        <h3 className="text-xl sm:text-2xl font-black tracking-tight text-gray-900 leading-tight">
          {title}
        </h3>

        {/* Message */}
        <p className="text-gray-500 font-medium text-xs sm:text-sm mt-3 px-2 leading-relaxed">
          {message}
        </p>

        {/* Actions */}
        <div className="flex gap-3 w-full mt-8">
          <Button
            type="button"
            variant="secondary"
            size="md"
            onClick={onClose}
            disabled={isLoading}
            className="flex-1 rounded-2xl py-3.5"
          >
            {cancelLabel}
          </Button>
          <Button
            type="button"
            variant={variant === "warning" ? "primary" : variant}
            size="md"
            onClick={onConfirm}
            isLoading={isLoading}
            className="flex-1 rounded-2xl py-3.5"
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
