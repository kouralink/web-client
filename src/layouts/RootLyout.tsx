import React from "react";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/services/firebase";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/state/store";
import { setUser } from "@/state/auth/authSlice";
import { Toaster } from "@/components/ui/toaster";

const RootLyout: React.FC = () => {
  
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
        console.log('auth hase changed:',user)
        dispatch(setUser(user))
      }
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);
  return (
    <div className="min-h-[100vh]  overflow-hidden">
      <Toaster />
      <Outlet />
    </div>
  );
};

export default RootLyout;
