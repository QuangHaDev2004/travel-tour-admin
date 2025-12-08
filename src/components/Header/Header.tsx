import { Link } from "react-router";
import { FaBars } from "react-icons/fa6";
import { pathAdmin } from "@/config/path";
import { useAuthStore } from "@/stores/useAuthStore";
import { imageDefault } from "@/constants/common";

export const Header = ({ onOpenSidebar }: { onOpenSidebar: () => void }) => {
  const account = useAuthStore((s) => s.account); // component chỉ render lại khi account thay đổi

  return (
    <>
      <div className="border-travel-gray-300 fixed top-0 left-0 z-[997] flex h-[70px] w-full items-center border-b bg-white">
        <Link
          to={`${pathAdmin}/dashboard`}
          className="ml-4 flex h-full w-auto items-center justify-center text-2xl font-bold transition-all duration-200 sm:ml-0 sm:w-60"
        >
          <span className="text-travel-primary">36</span>
          <span className="text-travel-dark">Admin</span>
        </Link>
        <div className="mr-4 flex flex-1 items-center justify-end gap-5 sm:mr-[30px] sm:gap-10">
          <div className="relative h-[25px] cursor-pointer">
            <img
              src="/assets/images/icon-bell.svg"
              className="h-[25px] w-auto"
            />
            <span className="bg-travel-pink absolute top-[-5px] right-[-5px] flex h-4 w-4 items-center justify-center rounded-full text-xs font-bold text-white">
              6
            </span>
          </div>
          <div className="flex items-center gap-[10px]">
            <div className="border-travel-secondary/20 h-11 w-11 overflow-hidden rounded-full border">
              <img
                src={account?.avatar || imageDefault}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex flex-1 flex-col gap-[3px]">
              <div className="text-travel-dark text-sm font-semibold">
                {account?.fullName}
              </div>
              <div className="text-travel-dark/60 text-xs font-medium">
                {account?.roleName}
              </div>
            </div>
          </div>
          <button
            className="block cursor-pointer lg:hidden"
            onClick={onOpenSidebar}
          >
            <FaBars className="text-travel-dark size-5" />
          </button>
        </div>
      </div>
    </>
  );
};
