import Navbar from "@/components/global/Navbar";
import SettingsMenuItem from "@/components/global/SettingsMenuItem";
import dynamicIconImports from "lucide-react/dynamicIconImports";
import React from "react";
import { Outlet,NavLink } from "react-router-dom";


const SettingsLayout: React.FC = () => {
  const menuItemsList: {
    [key: string]: { iocn_name: keyof typeof dynamicIconImports; title: string; to: string }[];
  } = {
    'Account': [
      { iocn_name: 'user', title: 'Profile', to: '/settings' },
      { iocn_name: 'shield-alert', title: 'Password & Security', to: '/settings/security' },
      { iocn_name: 'bell', title: 'Notifications', to: '/settings/notifications' },
      { iocn_name: 'lock-keyhole', title: 'Privacy', to: '/settings/privacy' }
    ],
    'Support & About': [
      { iocn_name: 'help-circle', title: 'Help & Support', to: '/settings/support' },
      { iocn_name: 'accessibility', title: 'Terms and Policies', to: '/settings/terms' },
    ],
    'App Settings': [
      { iocn_name: 'leafy-green', title: 'General', to: '/settings/general' },
      { iocn_name: 'paint-bucket', title: 'Themes', to: '/settings/themes' },
      { iocn_name: 'languages', title: 'Language', to: '/settings/language' }
    ]
  };

  return (
    <div className="h-[100vh]">
      <div>
        <Navbar />
      </div>
      <div className="grid grid-cols-7 gird-rows-1 min-w-full bg-red-300 h-full">
        <div className="bg-card col-span-2 flex flex-col gap-6 px-2 py-4">
          {Object.keys(menuItemsList).map((key) => (
            <div key={key} className="flex flex-col gap-4 ">
              <h2 className="text-xl font-normal">{key}</h2>
              <ul className="pl-4 text-sm flex flex-col gap-1">
                {menuItemsList[key].map((item, index) => (
                  
                  <NavLink key={index} to={item.to}  className="hover:text-blue-500">
                    <SettingsMenuItem iocn_name={item.iocn_name} title={item.title} />
                  </NavLink>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="col-span-5">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default SettingsLayout;
