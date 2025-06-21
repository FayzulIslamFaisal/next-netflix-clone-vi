"use client";

import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Search from "./Search";
import { AiOutlineSearch } from "react-icons/ai";

const Navbar = () => {
  const { data: session, status } = useSession();
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  const menuItems = [
    { id: 1, title: "Home", path: "/browse" },
    { id: 2, title: "Movies", path: "/movies" },
    { id: 3, title: "MyList", path: "/my-list" },
    { id: 4, title: "Search", path: "/search" },
    { id: 5, title: "TV", path: "/tv" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-colors duration-300 ${
        isScrolled ? "bg-black shadow-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center gap-4">
        {/* Logo */}
        <div className="text-white font-bold text-xl">
          <Image src="/Logo.jpg" width={120} height={60} alt="netflix" />
        </div>

        {/* Menu */}
        <ul className="flex space-x-6">
          {menuItems.map((item) => (
            <li key={item.id}>
              <Link
                href={item.path}
                className={`text-sm font-medium border rounded px-4 py-2 transition hover:text-red-500 ${
                  pathname === item.path ? "text-red-500" : "text-white"
                }`}
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>

        {/* Search Icon or Bar */}
        <div className="text-white text-xl cursor-pointer relative">
          {showSearchBar ? (
            <Search
              pathname={pathname}
              router={router}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              setShowSearchBar={setShowSearchBar}
            />
          ) : (
            <AiOutlineSearch
              className="hidden sm:inline sm:w-6 sm:h-6 cursor-pointer"
              onClick={() => setShowSearchBar(true)}
            />
          )}
        </div>

        {/* Session Status */}
        {status === "authenticated" ? (
          <div className="text-white text-sm ml-4">
            Hi, {session?.user?.name}
          </div>
        ) : (
          <button
            onClick={() => router.push("/login")}
            className="text-white text-sm border px-3 py-1 rounded hover:bg-white hover:text-black ml-4"
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
