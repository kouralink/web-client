import React from "react";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/services/firebase";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/state/store";
import { getUserData, setUser } from "@/state/auth/authSlice";
import { Toaster } from "@/components/ui/toaster";
import 'flowbite';


const RootLyout: React.FC = () => {
  
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log('auth hase changed:',user)
      if (user){
        dispatch(getUserData());

      }else{
        dispatch(setUser(null))
      }
      
    });
    return () => { unsubscribe(); };
  }, [dispatch]);
  return (
    <div className="min-h-[100vh]  overflow-hidden">
      <Toaster />
      <Outlet />
    </div>
  );
};

export default RootLyout;
