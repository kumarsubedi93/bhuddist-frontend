"use client";

import React, { useEffect, useState } from "react";
import Logo from "@/assets/logo.png";
import Image from "next/image";
import Link from "next/link";
import useMobile from "@/hooks/useMobile";
import { useSearchParams } from "next/navigation";

type Props = {};

const Navbar = (props: Props) => {
  const isMobile = useMobile();
  const [menuOpen, setMenuOpen] = useState(false);
  const searchParams = useSearchParams()

  const navItems = [
    { name: "form1", href: "/?artId=1", form: 1 },
    { name: "form2", href: "/?artId=2", form: 2 },
    { name: "form3", href: "/?artId=3", form: 3 },
    { name: "form4", href: "/?artId=4", form: 4 },
    { name: "form5", href: "/?artId=5", form: 5 },
  ];

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && menuOpen) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [menuOpen]);

  return (
    <nav className="bg-white fixed w-full z-[99999] top-0 start-0 border-b border-gray-200">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          href="/"
          className="flex items-center space-x-3 rtl:space-x-reverse w-[120px] h-auto"
        >
          <Image
            src={Logo}
            className="h-full w-full"
            alt="Bhuddist Logo"
            width={1000}
            height={400}
          />
        </Link>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <Link
            href={"/login"}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center"
          >
            Login
          </Link>
          <button
            data-collapse-toggle="navbar-sticky"
            onClick={handleMenuToggle}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-controls="navbar-sticky"
            aria-expanded={menuOpen}
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
          className="items-center justify-between w-full md:flex md:w-auto md:order-1"
          id="navbar-sticky"
        >
          <ul
            className={`flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white ${
              isMobile && !menuOpen ? "hidden" : "flex"
            }`}
          >
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  prefetch={true}
                  className={`"block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 ${item.form == (searchParams.get('artId') || 1 )as any ? '!text-blue-700':''}`}
                  aria-current={item.name === "Home" ? "page" : undefined}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
