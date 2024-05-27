import Navbar from "@/components/global/Navbar";
import { Outlet } from "react-router-dom";

export default function TournamentLayout() {
  return (
    <>
      <div>
        <Navbar navHeight={2} />
      </div>
      <div className=""><Outlet/></div>
    </>
  );
}
