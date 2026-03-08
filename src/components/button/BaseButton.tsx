import { Link } from "react-router";
import type { ReactNode } from "react";

interface BaseButtonProps {
  to?: string;
  onClick?: () => void;
  label: string;
  icon: ReactNode;
  variant?: "default" | "primary" | "danger" | "success" | "outline";
  className?: string;
}

export const BaseButton = ({
  to = "#",
  onClick,
  label,
  icon,
  variant = "default",
  className = "",
}: BaseButtonProps) => {
  const variants = {
    default: "border-travel-secondary text-travel-secondary hover:bg-gray-100",
    primary: "border-travel-primary text-travel-primary hover:bg-blue-50",
    danger: "border-travel-red text-travel-red hover:bg-red-50",
    success: "border-green-600 text-green-600 hover:bg-green-50",
    outline: "border-travel-gray text-travel-secondary hover:bg-gray-50",
  };

  const baseClass = `flex h-9 items-center gap-2 rounded-sm border bg-white px-3 text-sm font-medium transition-all duration-300 ${variants[variant]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={baseClass}>
        {icon}
        <span>{label}</span>
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={baseClass}>
      {icon}
      <span>{label}</span>
    </button>
  );
};
