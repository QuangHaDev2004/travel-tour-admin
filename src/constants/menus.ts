import { ChartSpline } from "lucide-react";
import {
  FaDisplay,
  FaGaugeHigh,
  FaGear,
  FaList,
  FaListCheck,
  FaTable,
  FaUser,
  FaUserGear,
  FaUserGroup,
} from "react-icons/fa6";

export const mainMenus = [
  {
    to: "/admin/dashboard",
    label: "Tổng quan",
    icon: FaGaugeHigh,
  },
  {
    to: "/admin/category/list",
    label: "Quản lý danh mục",
    icon: FaTable,
  },
  {
    to: "/admin/tour/list",
    label: "Quản lý tour",
    icon: FaList,
  },
  {
    to: "/admin/order/list",
    label: "Quản lý đơn hàng",
    icon: FaListCheck,
  },
  {
    to: "/admin/user/list",
    label: "Quản lý người dùng",
    icon: FaUser,
  },
  {
    to: "/admin/contact/list",
    label: "Thông tin liên hệ",
    icon: FaUserGroup,
  },
  {
    to: "/admin/report",
    label: "Báo cáo",
    icon: ChartSpline,
  },
];

export const settingMenus = [
  {
    to: "/admin/setting/list",
    label: "Cài đặt chung",
    icon: FaGear,
  },
  {
    to: "/admin/profile/edit",
    label: "Thông tin cá nhân",
    icon: FaUserGear,
  },
  {
    to: "/admin/template",
    label: "Giao diện",
    icon: FaDisplay,
  },
];
