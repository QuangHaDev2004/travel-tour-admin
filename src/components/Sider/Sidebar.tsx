import { pathAdmin } from "@/config/path";
import { useLocation } from "react-router";
import { FaPowerOff } from "react-icons/fa6";
import { Link, useNavigate } from "react-router";
import { checkActive } from "@/helpers/checkActive";
import { useAuthStore } from "@/stores/useAuthStore";
import { mainMenus, settingMenus } from "@/constants/menus";
import { menuPermissionsMap } from "@/constants/menuPermissionsMap";

export const Sidebar = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { logout, account } = useAuthStore();
  const permissions = account?.permissions;

  const handleLogout = async () => {
    await logout();
    navigate(`/${pathAdmin}/account/login`);
  };

  return (
    <>
      <nav
        className={`border-travel-gray-300 fixed overflow-y-auto border-r bg-white py-4 transition-transform duration-300 ease-in-out ${isOpen ? "top-0 left-0 z-[999] h-full w-[280px]" : "top-[70px] left-0 h-[calc(100vh-70px)] w-60 -translate-x-full lg:translate-x-0"}`}
      >
        <ul>
          {mainMenus.map((item) => {
            const needPermission = menuPermissionsMap[item.to];
            if (needPermission && !permissions?.includes(needPermission)) {
              return null;
            }

            const isActive = checkActive(pathname, item.to);
            return (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className={`nav-item ${isActive ? "active bg-travel-primary text-white" : "text-travel-dark"}`}
                >
                  <item.icon className="text-lg" />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
        <hr className="border-travel-gray-300 my-4 border" />
        <ul>
          {settingMenus.map((item) => {
            const isActive = checkActive(pathname, item.to);
            return (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className={`nav-item ${isActive ? "active bg-travel-primary text-white" : "text-travel-dark"}`}
                >
                  <item.icon className="text-lg" />
                  {item.label}
                </Link>
              </li>
            );
          })}
          <button
            onClick={handleLogout}
            className="nav-item text-travel-pink cursor-pointer"
          >
            <FaPowerOff className="text-lg" /> Đăng xuất
          </button>
        </ul>
      </nav>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[998] bg-[#00000088] lg:hidden"
          onClick={onClose}
        ></div>
      )}
    </>
  );
};
