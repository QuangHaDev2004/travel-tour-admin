import { FaPenToSquare } from "react-icons/fa6";
import { Link } from "react-router";

export const ButtonEdit = ({ to }: { to: string }) => {
  return (
    <Link to={to} className="border-travel-four border-r px-4 py-2.5">
      <FaPenToSquare className="text-[15px] text-black/60" />
    </Link>
  );
};
