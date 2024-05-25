import Navbar from "@/components/global/Navbar";
import { Outlet } from "react-router-dom";

export default function TeamLayout() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <Navbar navHeight={2} />
      </div>
      <div className="px-2 w-full flex justify-center items-center"><Outlet/></div>
    </div>
  );
}
