import { FaPlus } from "react-icons/fa6";
import { Link } from "react-router";

export const ButtonCreate = ({ to }: { to: string }) => {
  return (
    <Link
      to={to}
      className="border-travel-primary text-travel-primary hover:bg-travel-primary/10 flex items-center gap-2 rounded-sm border bg-white px-6 h-9 text-sm font-medium transition-all duration-300"
    >
      <FaPlus className="size-3.5" />
      <span>Tạo mới</span>
    </Link>
  );
};
