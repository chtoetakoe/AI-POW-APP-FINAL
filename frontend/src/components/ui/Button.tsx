// src/components/ui/Button.tsx
import React from "react";

type Props = {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "danger" | "success";
  loading?: boolean;
};

const VARIANTS = {
  primary: "bg-indigo-600 hover:bg-indigo-700 text-white",
  secondary: "bg-gray-100 hover:bg-gray-200 text-gray-800",
  danger: "bg-red-600 hover:bg-red-700 text-white",
  success: "bg-green-600 hover:bg-green-700 text-white",
};

const Button: React.FC<Props> = ({
  children,
  onClick,
  disabled,
  variant = "primary",
  loading = false,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      // CHANGED: Increased padding from px-4 py-2 to px-6 py-3
      className={`px-6 py-3 rounded-lg font-semibold shadow transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2
        ${VARIANTS[variant]} ${disabled ? "opacity-50 cursor-not-allowed" : ""}
      `}
    >
      {loading ? "⏳" : children}
    </button>
  );
};

export default Button;