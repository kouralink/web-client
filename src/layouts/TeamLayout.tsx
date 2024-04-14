import Navbar from "@/components/global/Navbar";
import { Outlet } from "react-router-dom";

export default function TeamLayout() {
  return (
    <>
      <div>
        <Navbar navHeight={2} />
      </div>
      <div className="px-2"><Outlet/></div>
    </>
  );
}
