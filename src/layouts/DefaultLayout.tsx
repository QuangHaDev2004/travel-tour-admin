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
      <div className="bg-travel-body absolute top-17.5 left-0 flex min-h-[calc(100vh-70px)] w-full flex-col p-3.5 sm:p-7.5 lg:left-60 lg:w-[calc(100%-240px)]">
        <Outlet />
      </div>
    </>
  );
};
