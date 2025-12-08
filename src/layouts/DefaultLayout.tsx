import { Header } from "@/components/header/Header";
import { Sidebar } from "@/components/sider/Sidebar";
import { useState } from "react";
import { Outlet } from "react-router";

export const DefaultLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      {/* Header */}
      <Header onOpenSidebar={() => setIsSidebarOpen(true)} />

      {/* Sider */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Main */}
      <div className="absolute top-[70px] left-0 min-h-[calc(100vh-70px)] w-full bg-travel-gray-200 px-[15px] py-[30px] sm:p-[30px] lg:left-60 lg:w-[calc(100%-240px)]">
        <Outlet />
      </div>
    </>
  );
};
