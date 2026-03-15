import { pathAdmin } from "@/config/path";
import { House } from "lucide-react";
import { Link } from "react-router";

export const NotFound = () => {
  return (
    <div className="px-7.5 py-22.5">
      <img
        className="mx-auto mb-10 h-auto w-[60%] md:w-100"
        src="/assets/images/404.jpg"
      />
      <h1 className="text-travel-secondary mb-7.5 text-center text-2xl font-bold md:text-3xl">
        Trang này không tồn tại...
      </h1>
      <div className="text-center">
        <Link
          to={`/${pathAdmin}/dashboard`}
          className="bg-travel-primary inline-flex items-center gap-3 rounded-sm px-10 py-3.75 text-sm font-bold text-white hover:bg-blue-500 md:px-10 md:text-lg"
        >
          <House />
          Trở về trang tổng quan
        </Link>
      </div>
    </div>
  );
};
