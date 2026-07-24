"use client";

import Link from "next/link";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { deleteCookieByName } from "@/lib/action";
import OutsideClickTracker from "../OutSideClickTracker";
import Button from "../button";
import { SideBarItems } from "./helper";
import SideBarHeader from "./Header";

const Sidebar = ({ children }: { children: React.ReactNode }) => {
  const pathName = usePathname();
  const [isMobile, setIsMobile] = useState(true); // Adjust the breakpoint as needed
  const [isOpen, setIsOpen] = useState(false);

  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (typeof window != "undefined") {
      const handleResize = () => {
        setIsMobile(window.innerWidth < 768); // Adjust the breakpoint as needed
        if (isMobile && isOpen) {
          setIsOpen(false);
        }
      };

      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, [isOpen, isMobile]);

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        data-drawer-target="sidebar-multi-level-sidebar"
        data-drawer-toggle="sidebar-multi-level-sidebar"
        aria-controls="sidebar-multi-level-sidebar"
        type="button"
        className="inline-flex fixed top-2 left-0 items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none z-[999] "
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>
      <div className="flex">
        <OutsideClickTracker
          onOutsideClick={() => {
            console.log("herreee");
            setIsOpen(false);
          }}
          className="w-[50%] md:w-64 fixed sidebar z-[999]"
        >
          <aside
            id="sidebar-multi-level-sidebar"
            className={`fixed w-[50%] md:w-auto md:block top-0 left-0 z-40 h-screen transition-transform  delay-300 border shadow-md  sidebar md:translate-x-0 ${
              isOpen ? "" : "-translate-x-full"
            }`}
            aria-label="Sidebar"
          >
            <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 ">
              <ul className="space-y-2 font-medium">
                {SideBarItems.map(({ label, icon, path, onclick }) => (
                  <li key={label.toLowerCase()}>
                    {path ? (
                      <Link
                       prefetch={true}
                        href={path || "/"}
                        className={`flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100  group ${
                          pathName === path ? "!bg-gray-100" : ""
                        }`}
                      >
                        {icon}
                        <span className="ms-3">{label}</span>
                      </Link>
                    ) : (
                      <button
                        onClick={() => onclick?.()}
                        className={`flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100  group ${
                          pathName === path ? "!bg-gray-100" : ""
                        }`}
                      >
                        {icon}
                        <span className="ms-3">{label}</span>{" "}
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </OutsideClickTracker>
        <div className="flex-1 h-[98vh] overflow-y-scroll">
          <div className="flex flex-col gap-4">
              {/* {pathName.startsWith("/admin/art") && (
                // if starts with  art/ then means its in nested route 
                // then navigate to create art page if user is in create
                // art  page then gives user option to navigate to previous page
                <SideBarHeader
                  artId={params['artId']}
                  createArtId={searchParams.get('artId')}
                  onClick={() =>
                    pathName.startsWith("/admin/art/")
                      ? router.push(`/admin/art?artId=${params["artId"] || 1}`)
                      : router.back()
                  }
                >
                  {pathName.startsWith("/admin/art/") ? "Create Art" : "Back"}
                </SideBarHeader>
              )} */}
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
