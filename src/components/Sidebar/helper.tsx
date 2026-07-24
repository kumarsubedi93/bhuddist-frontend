import { MdDashboard } from "react-icons/md";
import { SiArtstation } from "react-icons/si";
import { PiSignOutFill } from "react-icons/pi";
import { deleteCookieByName, serverRedirect } from "@/lib/action";
import { FaPeopleGroup } from "react-icons/fa6";
import { TbReportSearch } from "react-icons/tb";
import { FiSettings } from "react-icons/fi";

export const SideBarItems = [
    {
      label: "Users",
      icon: <FaPeopleGroup size={20} />,
      path: "/admin/users",
    },
    {
      label: "Reports",
      icon: <TbReportSearch size={20} />,
      path: "/admin/reports",
    },
    {
      label: "Settings",
      icon: <FiSettings size={20} />,
      path: "/admin/settings",
    },
    // {
    //   label: "Form 1",
    //   icon: <SiArtstation size={20} />,
    //   path: "/admin/art/1",
    // },
    // {
    //   label: "Form 2",
    //   icon: <SiArtstation size={20} />,
    //   path: "/admin/art/2",
    // },
    // {
    //   label: "Form 3",
    //   icon: <SiArtstation size={20} />,
    //   path: "/admin/art/3",
    // },
    // {
    //   label: "Form 4",
    //   icon: <SiArtstation size={20} />,
    //   path: "/admin/art/4",
    // },
    // {
    //   label: "Form 5",
    //   icon: <SiArtstation size={20} />,
    //   path: "/admin/art/5",
    // },
    {
      label: "SignOut",
      icon: <PiSignOutFill size={20} />,
      onclick: async () => {
        localStorage.removeItem("token");
        await deleteCookieByName("token");
        return serverRedirect("/login");
      },
    },
  ];