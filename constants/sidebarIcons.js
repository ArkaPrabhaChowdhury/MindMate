import { RiChat1Line } from "react-icons/ri";
import { MdOutlineContacts } from "react-icons/md";
import { BsPeople } from "react-icons/bs";
import { FaRegUser } from "react-icons/fa";

export const sidebarLinks = [
  {
    icon: <RiChat1Line size={40} />,
    title: "Chat",
    path: "/chat",
  },
  {
    icon: <MdOutlineContacts size={40} />,
    title: "Therapists",
    path: "/therapists",
  },
  {
    icon: <BsPeople size={40} />,
    title: "Community",
    path: "/community",
  },
  {
    icon: <FaRegUser size={40} />,
    title: "Profile",
    path: "/profile",
  },
];
