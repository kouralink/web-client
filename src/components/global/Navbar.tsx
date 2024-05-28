import { RootState } from "@/state/store";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { ModeToggle } from "../mode-toggle";
import SingInUpButtons from "./SingInUpButtons";
import { AccountNavDropdownMenu } from "./AccountNavDropdownMenu";
// import { CreateTeamPopUp } from "./CreateTeam";
import Notification from "./cards/Notification";

interface NavbarProps {
  navHeight?: number;
}
const Navbar: React.FC<NavbarProps> = ({ navHeight = 4 }) => {
  const [open, setOpen] = useState(false);

  // const [dropdownOpen, setDropdownOpen] = useState(false);
  const authUser = useSelector((state: RootState) => state.auth.user);

  return (
    <div
      className={`bg-card border-gray-200 rounded-lg dark:bg-card py-${navHeight}`}
    >
      <div className="flex flex-col max-w-screen-xl px-4 mx-auto md:items-center md:justify-between md:flex-row md:px-6 lg:px-8">
        <div className="px-4 flex flex-row items-center justify-between">
          <Link
            to="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img src="/logo.svg" className="h-8" alt="Kouralink Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-card-foreground hidden sm:block">
              Kouralink
            </span>
          </Link>
          <button
            className="md:hidden rounded-lg focus:outline-none focus:shadow-outline"
            onClick={() => setOpen(!open)}
          >
            <svg fill="currentColor" viewBox="0 0 20 20" className="w-6 h-6">
              {!open ? (
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              ) : (
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              )}
            </svg>
          </button>
        </div>
        <nav
          className={`flex-col flex-grow gap-2 md:pb-0 md:flex md:justify-end md:flex-row ${
            open ? "flex" : "hidden"
          }`}
        >
          <NavLink
            className="px-4 py-2  text-sm font-semibold bg-transparent rounded-lg dark:bg-transparent dark:hover:bg-gray-600 dark:focus:bg-gray-600 dark:focus:text-white dark:hover:text-white dark:text-gray-200 md:mt-0  hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
            to="/"
          >
            Home
          </NavLink>
          <NavLink
            className="px-4 py-2  text-sm font-semibold text-gray-900 bg-gray-200 rounded-lg dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:bg-gray-600 dark:focus:text-white dark:hover:text-white dark:text-gray-200 md:mt-0 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
            to="/teams"
          >
            Teams
          </NavLink>
          <NavLink
            className="px-4 py-2  text-sm font-semibold bg-transparent rounded-lg dark:bg-transparent dark:hover:bg-gray-600 dark:focus:bg-gray-600 dark:focus:text-white dark:hover:text-white dark:text-gray-200 md:mt-0  hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
            to="/tournament"
          >
            Tournaments
          </NavLink>
          <NavLink
            className="px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark:bg-transparent dark:hover:bg-gray-600 dark:focus:bg-gray-600 dark:focus:text-white dark:hover:text-white dark:text-gray-200 md:mt-0  hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
            to="/about"
          >
            About
          </NavLink>
          <NavLink
            className="px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark:bg-transparent dark:hover:bg-gray-600 dark:focus:bg-gray-600 dark:focus:text-white dark:hover:text-white dark:text-gray-200 md:mt-0  hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
            to="/contact"
          >
            Contact
          </NavLink>

          <Notification/>

          {/* <div className="relative" onMouseLeave={() => setDropdownOpen(false)}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex flex-row items-center w-full px-4 py-2 mt-2 text-sm font-semibold text-left bg-transparent rounded-lg dark:bg-transparent dark:focus:text-white dark:hover:text-white dark:focus:bg-gray-600 dark:hover:bg-gray-600 md:w-auto md:inline md:mt-0  hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
            >
              <span>Quick links</span>
              <svg
                fill="currentColor"
                viewBox="0 0 20 20"
                className={`inline w-4 h-4 mt-1 ml-1 transition-transform duration-200 transform md:-mt-1 ${
                  dropdownOpen ? "rotate-180" : "rotate-0"
                }`}
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 w-full mt-2 origin-top-right rounded-md shadow-lg md:w-48 ">
                <div className="px-2 py-2 bg-white rounded-md shadow dark:bg-gray-800">
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
              </div>
            )}
          </div> */}
          <div className="flex gap-2">
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
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
