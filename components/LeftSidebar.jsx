"use client";
import { sidebarLinks } from "@/constants/sidebarIcons";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const LogoutButton = () => {
  const router = useRouter();
  const handleLogout = () => {
    localStorage.removeItem("token");
    clearCookies();
    signOut(auth).then(() => {
      router.push("/login");
    });
  };

  const clearCookies = async () => {
    await fetch("/api/deleteCookie");
  };
  return (
    <button
      className="flex items-center gap-2 p-3 rounded-lg bg-gray-700 hover:bg-gray-600 text-white mt-auto"
      onClick={handleLogout}
    >
      <div className="w-8 h-8 flex justify-center items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
          />
        </svg>
      </div>
      <p className="flex font-semibold text-lg justify-center items-center">
        Logout
      </p>
    </button>
  );
};

export default function LeftSidebar() {
  const pathname = usePathname();

  return (
    <div className="bg-gray-800 text-white w-64 h-screen flex flex-col justify-between">
      <div className="flex flex-col items-center pt-3">
        <div className="p-4">
          <img
            src="/assets/mind-logo.png"
            alt="Logo"
            className="w-16 h-16 rounded-full"
          />
        </div>
        <p className="text-xl font-semibold mb-4">MindMate</p>
      </div>
      <section className="p-3 -mt-12">
        {sidebarLinks.map((link) => {
          const isActive =
            (pathname.includes(link.path) && link.path.length > 1) ||
            pathname === link.path;

          return (
            <Link
              href={link.path}
              key={link.title}
              className={`flex items-center gap-2 p-2 rounded-lg ${
                isActive ? "bg-custom-pink text-black" : ""
              } transition-colors duration-300 hover:bg-gray-700 hover:text-white mt-5`}
              shallow
            >
              <div className="w-12 h-12 flex justify-center items-center">
                {link.icon}
              </div>
              <p className="flex font-semibold text-lg justify-center items-center hidden md:block">
                {link.title}
              </p>
            </Link>
          );
        })}
      </section>
      <div className="pb-5 flex justify-center">
        <LogoutButton />
      </div>
    </div>
  );
}
