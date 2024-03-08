import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/global/Navbar";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/services/firebase";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/state/store";
import { setUser } from "@/state/auth/authSlice";
import { Toaster } from "@/components/ui/toaster";

const Root: React.FC = () => {
  // navbar on scroll effect
  const [navStyle, setNavStyle] = useState("mt-2");
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
        console.log('auth hase changed:',user)
        dispatch(setUser(user))
      }
    );
  },[]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const isScrolledDown = prevScrollPos < currentScrollPos;

      setPrevScrollPos(currentScrollPos);

      // Show the navbar if scrolling up or at the top

      if (window.scrollY > 10) {
        if (!isScrolledDown) {
          setNavStyle("mt-0 px-0 bg-white rounded-none");
        } else {
          setNavStyle("display-none  hidden");
        }
      } else {
        setNavStyle("bg-none mt-2");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);
  return (
    <div className="min-h-[100vh]  overflow-hidden">
      <Toaster />
      <div
        className={[
          "fixed z-10 w-full   px-2 rounded-lg duration-300 transition-all",
          navStyle,
        ].join(" ")}
      >
        <Navbar />
      </div>
      <Outlet />
    </div>
  );
};

export default Root;
