"use client";

import { useState } from "react";
import SideBar from "../components/SideBar";
import MessageArea from "../components/MessageArea";
import useGetMessages from "../customHooks/useGetMessages";
import { useSelector } from "react-redux";

const Home = () => {
  useGetMessages();
  const selectedUser = useSelector((state) => state.user.selectedUser);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-gray-100">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed lg:relative inset-y-0 left-0 z-50 
          w-80 lg:w-96 xl:w-80 2xl:w-96
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:block
          ${selectedUser ? "hidden lg:block" : "block"}
        `}
      >
        <SideBar onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full">
        <MessageArea onOpenSidebar={() => setSidebarOpen(true)} />
      </div>
    </div>
  );
};

export default Home;
