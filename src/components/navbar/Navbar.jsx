"use client";

// import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Search from "./Search";
import { AiOutlineSearch } from "react-icons/ai";
import { GlobalContext } from "@/app/context";
import AccountPopup from "./AccountPopup";
import { useSession, signOut } from "next-auth/react"

const Navbar = () => {
  const { data: session, status } = useSession();
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAccountPopup, setShowAccountPopUp] = useState(false);
  const { loggedInAccount, setAccounts, accounts, setLoggedInAccount } = useContext(GlobalContext);
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
    <>
    <nav
      className={`fixed top-0 w-full z-50 transition-colors duration-300 ${
        isScrolled ? "bg-black shadow-md" : "bg-gray-500"
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
                onClick={() => {
                 setSearchQuery("");
                 setShowSearchBar(false);
                }}

                className={`text-sm font-medium border rounded px-4 py-2 transition bg-amber-500 hover:text-black ${
                  pathname === item.path ? "text-black" : "text-white"
                }`}
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>

        {/* Search Icon or Bar */}
        <div className="text-yellow-400 text-xl cursor-pointer relative">
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

        <div onClick={() => setShowAccountPopUp(!showAccountPopup)} className=" flex items-center gap-2 cursor-pointer">
          <Image
            src={session?.user?.image || "/default-avatar.png"}
            alt="User Avatar"
            width={40}
            height={40}
            className="rounded-full cursor-pointer"
          />
          <span className="text-yellow-500 font-semibold">
            {loggedInAccount?.name || "Account"}
          </span>
        </div>

        
      </div>
    </nav>
    {showAccountPopup && 
      <AccountPopup 
        accounts={accounts} 
        setAccounts={setAccounts} 
        onClose={() => setShowAccountPopUp(false)} 
        setLoggedInAccount={setLoggedInAccount} 
        loggedInAccount={loggedInAccount}
        signOut={signOut} 
      />
    }
    </>
  );
};

export default Navbar;
