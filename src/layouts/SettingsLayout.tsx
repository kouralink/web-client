import Navbar from "@/components/global/Navbar";
import SettingsMenuItem from "@/components/global/SettingsMenuItem";
import dynamicIconImports from "lucide-react/dynamicIconImports";
import React from "react";
import { Outlet, NavLink, Navigate } from "react-router-dom";
import "./styles/SettingsLayout.css";
import ProfileCard from "@/components/global/cards/ProfileCard";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";

const SettingsLayout: React.FC = () => {

  const authUser = useSelector((state: RootState) => state.auth.user);
 
  const menuItemsList: {
    [key: string]: {
      iocn_name: keyof typeof dynamicIconImports;
      title: string;
      to: string;
    }[];
  } = {
    Account: [
      { iocn_name: "user", title: "Profile", to: "/settings/profile" },
      {
        iocn_name: "shield-alert",
        title: "Password & Security",
        to: "/settings/security",
      },
      {
        iocn_name: "bell",
        title: "Notifications",
        to: "/settings/notifications",
      },
      { iocn_name: "lock-keyhole", title: "Privacy", to: "/settings/privacy" },
    ],
    "Support & About": [
      {
        iocn_name: "help-circle",
        title: "Help & Support",
        to: "/settings/support",
      },
      {
        iocn_name: "accessibility",
        title: "Terms and Policies",
        to: "/settings/terms",
      },
    ],
    "App Settings": [
      { iocn_name: "leafy-green", title: "General", to: "/settings/general" },
      { iocn_name: "paint-bucket", title: "Themes", to: "/settings/themes" },
      { iocn_name: "languages", title: "Language", to: "/settings/language" },
    ],
  };

  return !authUser ?  <Navigate to="/auth/login"  />:(
    <div className="min-h-[100vh] ">
      <div>
        <Navbar navHeight={2} />
      </div>
      <div className="flex flex-col px-4">
        <div className="hidden xs:flex  py-2">
          <ProfileCard />
        </div>
      <div className="grid grid-cols-12 sm:grid-cols-12 md:grid-cols-7 lg:grid-cols-12 xl:col-span-12 gird-rows-2 min-w-full h-full">
        
        <div className="bg-card col-span-5 sm:col-span-4 md:col-span-2  lg:col-span-3 xl:col-span-2 flex flex-col gap-6 px-2 py-4
        border-r-2 border-black-600
        ">
          {Object.keys(menuItemsList).map((key) => (
            <div key={key} className="flex flex-col gap-4 ">
              <h2 className="text-xl font-normal">{key}</h2>
              <ul className="pl-4 text-sm flex flex-col gap-1">
                {menuItemsList[key].map((item, index) => (
                  <NavLink
                    key={index}
                    to={item.to}
                    className="hover:text-primary-700"
                  >
                    <SettingsMenuItem
                      iocn_name={item.iocn_name}
                      title={item.title}
                    />
                  </NavLink>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="p-2  col-span-7 sm:col-span-8 md:col-span-5  lg:col-span-9  xl:col-span-10">
          <Outlet />
        </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsLayout;
