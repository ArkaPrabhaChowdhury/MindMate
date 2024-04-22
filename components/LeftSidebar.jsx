"use client"
import { sidebarLinks } from "@/constants/sidebarIcons";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function LeftSidebar() {
  const pathname = usePathname();

  return (
    <div className="bg-gray-800 text-white w-64 h-screen flex flex-col sm:block hidden lg:block">
      <section className="p-4">
        {sidebarLinks.map((link) => {
          const isActive =
            (pathname.includes(link.path) && link.path.length > 1) ||
            pathname === link.path;

          return (
            <Link
              href={link.path}
              key={link.title}
              className={`flex items-center gap-4 p-2 rounded-lg ${isActive ? "bg-blue-500" : ""} transition-colors duration-300 hover:bg-gray-700 mt-5 p-5`}
              shallow
            >
              <div className="w-8 h-8 flex justify-center items-center">{link.icon}</div>
              <p className="flex font-semibold text-2xl justify-center items-center hidden md:block">{link.title}</p>
            </Link>
          );
        })}
      </section>
    </div>
  );
}