import { RiChat1Line } from "react-icons/ri";
import { MdOutlineContacts } from "react-icons/md";
import { BsPeople } from "react-icons/bs";
import { FaRegUser } from "react-icons/fa";

export const sidebarLinks = [
  {
    icon: <RiChat1Line className="h-full w-full"/>,
    title: "Chat",
    path: "/chat",
  },
  {
    icon: <MdOutlineContacts className="h-full w-full"/>,
    title: "Therapists",
    path: "/therapists",
  },
  {
    icon: <BsPeople className="h-full w-full"/>,
    title: "Community",
    path: "/community",
  },
  {
    icon: <FaRegUser className="h-full w-full"/>,
    title: "Profile",
    path: "/profile",
  },
];