import { FaRegTrashCan } from "react-icons/fa6";
import { Link } from "react-router";

export const ButtonTrash = ({ to }: { to: string }) => {
  return (
    <Link
      to={to}
      className="border-travel-red text-travel-red hover:bg-travel-red/10 flex h-9 items-center gap-2 rounded-sm border bg-white px-6 font-medium transition-all duration-300 text-sm"
    >
      <FaRegTrashCan className="text-sm" />
      <span>Thùng rác</span>
    </Link>
  );
};
