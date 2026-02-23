import { Link } from "react-router";
import type { ReactNode } from "react";

interface BaseButtonProps {
  to: string;
  label: string;
  icon: ReactNode;
  variant?: "default" | "primary" | "danger" | "success" | "outline";
  className?: string;
}

export const BaseButton = ({
  to,
  label,
  icon,
  variant = "default",
  className = "",
}: BaseButtonProps) => {
  const variants = {
    default: "border-travel-secondary text-travel-secondary",
    primary: "border-travel-primary text-travel-primary hover:bg-blue-50",
    danger: "border-travel-red text-travel-red hover:bg-red-50",
    success: "border-green-600 text-green-600 hover:bg-green-50",
    outline: "border-travel-gray text-travel-secondary hover:bg-gray-50",
  };

  return (
    <Link
      to={to}
      className={`flex h-9 items-center gap-2 rounded-sm border bg-white px-3 text-sm font-medium transition-all duration-300 ${variants[variant]} ${className}`}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
};
