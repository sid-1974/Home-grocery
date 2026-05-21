import React from "react";
import { Loader2 } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "ghost" | "dark";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  icon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className = "",
      variant = "primary",
      size = "md",
      isLoading = false,
      icon,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center gap-2 font-black tracking-tight transition-all duration-300 transform active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none";

    const variants = {
      primary:
        "bg-green-600 text-white hover:bg-green-700 shadow-lg shadow-green-100/50 hover:shadow-[0_15px_30px_rgba(34,197,94,0.3)]",
      secondary:
        "bg-gray-50 border border-gray-100 text-gray-600 hover:bg-green-50 hover:text-green-600 shadow-sm",
      dark:
        "bg-black text-white hover:bg-gray-800 shadow-xl shadow-gray-200/50 hover:shadow-gray-300",
      danger: "bg-red-50 text-red-600 border border-red-100 hover:bg-red-100",
      ghost: "text-gray-500 hover:text-gray-700 hover:bg-gray-50",
    };

    const sizes = {
      sm: "px-3 py-1.5 text-xs rounded-xl",
      md: "px-5 py-3 text-sm rounded-2xl",
      lg: "px-6 py-4 sm:py-5 rounded-[1.5rem] sm:rounded-[2rem] text-base",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="animate-spin" size={size === "sm" ? 14 : 18} />
        ) : (
          icon
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
