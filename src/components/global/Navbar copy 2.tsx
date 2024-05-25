import { AccountNavDropdownMenu } from "./AccountNavDropdownMenu";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { ModeToggle } from "../mode-toggle";
import { Separator } from "../ui/separator";
import SingInUpButtons from "./SingInUpButtons";
import { CreateTeamPopUp } from "./CreateTeam";
// import "flowbite";

interface NavbarProps {
  navHeight?: number;
}

const Navbar: React.FC<NavbarProps> = ({ navHeight = 4 }) => {
  const authUser = useSelector(
    (state: RootState): RootState["auth"]["user"] => state.auth.user
  );
  return (
    <nav className="bg-card border-gray-200 rounded-lg dark:bg-card">
      {/* <script src="/node_modules/flowbite/dist/flowbite.min.js"></script> */}

      <div
        className={[
          "max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4",
          `py-${navHeight}`,
        ].join(" ")}
      >
        <Link
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img src="/logo.svg" className="h-8" alt="Kouralink Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-card-foreground hidden sm:block">
            Kouralink
          </span>
        </Link>
        <div className="flex md:order-2 space-x-3 md:space-x-0 gap-2 rtl:space-x-reverse items-center">
          <ModeToggle />
          {!authUser ? (
            <div className="hidden md:block">
              <SingInUpButtons />
            </div>
          ) : (
            <div className="flex gap-2">
              <AccountNavDropdownMenu />
            </div>
          )}
          <button
            data-collapse-toggle="navbar-cta"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-card-foreground rounded-lg md:hidden hover:bg-card focus:outline-none focus:ring-2  dark:text-card-foreground dark:hover:bg-card "
            aria-controls="navbar-cta"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-cta"
        >
          <div className="flex flex-col">
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border  rounded-lg bg-card md:space-x-4 lg:space-x-6 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-card dark:bg-card  ">
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 md:p-0 text-card-foreground bg-primary-700 rounded md:bg-transparent md:text-primary-700 md:dark:text-primary-500"
                  aria-current="page"
                >
                  About
                </a>
              </li>
              
              <li>
                <Link
                  to="/teams/60IwF7xDizUnit8ehRFT"
                  className="block py-2 px-3 md:p-0 text-card-foreground rounded hover:bg-secondary md:hover:bg-transparent md:hover:text-primary-700"
                >
                  yourTeam
                </Link>
              </li>
              
              <li>
                <Link
                  to="/teams"
                  className="block py-2 px-3 md:p-0 text-card-foreground rounded hover:bg-secondary md:hover:bg-transparent md:hover:text-primary-700"
                >
                  Teams
                </Link>
              </li>
              <li>
                <button
                  id="dropdownNavbarLink"
                  data-dropdown-toggle="dropdownNavbar"
                  className="flex items-center justify-between w-full py-2 px-3 text-card-foreground rounded hover:bg-card md:hover:bg-transparent md:border-0 md:hover:text-primary-700 md:p-0 md:w-auto "
                >
                  Quick links{" "}
                  <svg
                    className="w-2.5 h-2.5 ms-2.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>
                <div
                  id="dropdownNavbar"
                  className="z-10 hidden font-normal bg-card divide-y rounded-lg shadow w-44 "
                >
                  <ul
                    className="py-2 text-sm text-card-foreground border"
                    aria-labelledby="dropdownLargeButton"
                  >
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-secondary "
                      >
                        <CreateTeamPopUp />
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-secondary "
                      >
                        Join Team
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 md:p-0 text-card-foreground rounded hover:bg-secondary md:hover:bg-transparent md:hover:text-primary-700 "
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 md:p-0 text-card-foreground rounded hover:bg-secondary md:hover:bg-transparent md:hover:text-primary-700 "
                >
                  Contact
                </a>
              </li>
            </ul>
            <div className="md:hidden">
              <Separator className="my-4 md:hidden" />
              {!authUser && <SingInUpButtons />}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;