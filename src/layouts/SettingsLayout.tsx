import Navbar from "@/components/global/Navbar";
import { Toaster } from "@/components/ui/toaster";
import React from "react";
import { Outlet } from "react-router-dom";

const SettingsLayout: React.FC = () => {
  return (
    <div className="min-h-[100vh] overflow-hidden">
      <Toaster />
      <div>
        <Navbar />
      </div>
      <div>
        <div>
          <h1>Settings</h1>
          settings menu
        </div>
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default SettingsLayout;
