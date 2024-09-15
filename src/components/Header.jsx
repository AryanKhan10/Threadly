import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { logOut } from "../redux/slice/authSlice";
import Button from "./Button";

function Header() {
  const users = useSelector((state) => state.auth.users);
  const allow = users.some((user) => user.isAuthenticated === true);
  const dispatch = useDispatch();

  // State for toggling the mobile menu
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-[#a3a3a3] fixed top-0 w-full z-10">
      <div className="flex items-center justify-between px-10 py-4">
        {/* Logo */}
        <div className="text-4xl font-bold font-Akronim">
          <Link to="/feed">Threadly</Link>
        </div>

        {/* Hamburger icon for small screens */}
        <button
          className="md:hidden" // Visible on small screens only
          onClick={() => setIsOpen(!isOpen)} // Toggle the menu
        >
          <div className={` w-9 h-10 cursor-pointer flex flex-col ${isOpen?"":"gap-1"} items-center justify-center`}>
            <div
              className={`font-bold text-xl w-[90%] h-[4px] bg-black rounded-sm transition-all duration-300 origin-left ${
                isOpen ? "rotate-[-45deg] translate-y-[0.45rem]" : "translate-y-0"
              }`}
            ></div>
            <div
              className={`w-[90%] h-[4px] bg-black rounded-md transition-all duration-300 ${
                isOpen ? "hidden" : "block"
              }`}
            ></div>
            <div
              className={`w-[90%] h-[4px] bg-black rounded-md transition-all duration-300 origin-left ${
                isOpen ? "rotate-[45deg] -translate-y-[0.45rem]" : ""
              }`}
            ></div>
          </div>
        </button>

        {/* Nav links for large screens */}
        <div className="hidden md:flex items-center gap-6 font-Allerta">
          {!allow && (
            <NavLink
              to="/"
              className="border-[1.5px] border-[#44403c] hover:border-black bg-[#44403c] hover:bg-black text-white transition-all duration-150 rounded-lg px-4 py-2"
            >
              Home
            </NavLink>
          )}
          {!allow && (
            <NavLink
              to="/login"
              className="border-[1.5px] border-[#44403c] hover:border-black bg-[#44403c] hover:bg-black text-white transition-all duration-150 rounded-lg"
            >
              <Button children="Login" className="" />
            </NavLink>
          )}
          {!allow && (
            <NavLink
              to="/signup"
              className="border-[1.5px] border-[#44403c] hover:border-black bg-[#44403c] hover:bg-black text-white transition-all duration-150 rounded-lg"
            >
              <Button children="Sign Up" className="" />
            </NavLink>
          )}
          {allow && (
            <>
              <NavLink
                to="/feed"
                className="border-[1.5px] border-[#44403c] hover:border-black bg-[#44403c] hover:bg-black text-white transition-all duration-150 rounded-lg"
              >
                <Button children="Feed" />
              </NavLink>
              <NavLink
                to="/profile"
                className="border-[1.5px] border-[#44403c] hover:border-black bg-[#44403c] hover:bg-black text-white transition-all duration-150 rounded-lg"
              >
                <Button children="Profile" />
              </NavLink>
              <NavLink
                to="/"
                className="border-[1.5px] border-[#44403c] hover:border-black bg-[#44403c] hover:bg-black text-white transition-all duration-150 rounded-lg"
              >
                <Button onClick={() => dispatch(logOut())} children="LogOut" />
              </NavLink>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu - toggles based on isOpen state */}
      <div
        className={`mt-16 fixed flex justify-center top-0 right-0 w-full h-full bg-[#a3a3a3de] transition-transform duration-500 delay-75 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } z-20 md:hidden`}
      >
        <div className="flex flex-col items-end justify-center gap-4 p-4 w-32 h-3/5">
          <NavLink
            to="/"
            className="mb-4 border-[1.5px] border-[#44403c] hover:border-black bg-[#44403c] hover:bg-black text-white transition-all duration-150 rounded-lg px-4 py-2 w-full text-right"
            onClick={() => setIsOpen(false)} // Close menu on link click
          >
            Home
          </NavLink>
          {!allow && (
            <>
              <NavLink
                to="/login"
                className="mb-4 border-[1.5px] border-[#44403c] hover:border-black bg-[#44403c] hover:bg-black text-white transition-all duration-150 rounded-lg px-4 py-2 w-full text-right"
                onClick={() => setIsOpen(false)}
              >
                Login
              </NavLink>
              <NavLink
                to="/signup"
                className="mb-4 border-[1.5px] border-[#44403c] hover:border-black bg-[#44403c] hover:bg-black text-white transition-all duration-150 rounded-lg px-4 py-2 w-full text-right"
                onClick={() => setIsOpen(false)}
              >
                Sign Up
              </NavLink>
            </>
          )}
          {allow && (
            <>
              <NavLink
                to="/feed"
                className="mb-4 border-[1.5px] border-[#44403c] hover:border-black bg-[#44403c] hover:bg-black text-white transition-all duration-150 rounded-lg px-4 py-2 w-full text-right"
                onClick={() => setIsOpen(false)}
              >
                Feed
              </NavLink>
              <NavLink
                to="/profile"
                className="mb-4 border-[1.5px] border-[#44403c] hover:border-black bg-[#44403c] hover:bg-black text-white transition-all duration-150 rounded-lg px-4 py-2 w-full text-right"
                onClick={() => setIsOpen(false)}
              >
                Profile
              </NavLink>
              <NavLink
                to="/"
                className="mb-4 border-[1.5px] border-[#44403c] hover:border-black bg-[#44403c] hover:bg-black text-white transition-all duration-150 rounded-lg px-4 py-2 w-full text-right"
                onClick={() => {
                  dispatch(logOut());
                  setIsOpen(false);
                }}
              >
                LogOut
              </NavLink>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
