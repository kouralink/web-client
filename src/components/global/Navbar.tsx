import Logo from "../../assets/logo.png";
import { Button } from "../ui/button";
import NavBarQuickLinksMenu from "./NavBarQuickLinksMenu";

const Navbar: React.FC = () => {
  
    
  return (
    <nav className={"flex  justify-between rounded-lg bg-white px-6 py-1 items-center"}>
      <div className="flex items-center gap-2">
        <img src={Logo} alt="logo" width={30} />
        <h1>Kouralink</h1>
      </div>
      <ul className="flex gap-4 [&>li]:flex [&>li]:items-center">
        <li>About</li>
        <li>blogs</li>
        <li>
          <NavBarQuickLinksMenu />
        </li>
        <li>Contact</li>
        <li>
          <Button className="py-0.5 rounded-lg">SingIn</Button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
