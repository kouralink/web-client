import Footer from "@/components/global/Footer";
import Navbar from "@/components/global/Navbar";
import { Outlet } from "react-router-dom";

export default function DefaultNavFooterLayout() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <Navbar navHeight={2} />
      </div>
      <div className="px-2 w-full flex justify-center items-center min-h-screen"><Outlet/></div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
