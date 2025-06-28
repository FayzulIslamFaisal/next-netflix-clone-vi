"use client";

import { AiOutlineSearch } from "react-icons/ai";
import { MdClose } from "react-icons/md";

const Search = ({
  setShowSearchBar,
  setSearchQuery,
  searchQuery,
  router,
  pathname,
  onKeyUp, // Add this prop
}) => {
  const handleSearch = () => {
    if (searchQuery.trim().length >= 1) {
      router.push(`/search/${encodeURIComponent(searchQuery.trim())}`);
      setShowSearchBar(false);
      setSearchQuery(""); // Clear the search query
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="hidden md:flex items-center bg-black/75 border border-white/85 rounded px-2">
      <input
        name="search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Search Movies, TV and Dramas"
        className="bg-transparent text-sm text-white font-medium h-[34px] px-2 py-2 placeholder:text-white outline-none"
        autoFocus
      />
      <button
        className="text-white ml-2 hover:text-yellow-500"
        onClick={handleSearch}
        title="Search"
      >
        <AiOutlineSearch size={20} />
      </button>
      <button
        className="text-white ml-2 hover:text-yellow-500"
        onClick={() => setShowSearchBar(false)}
        title="Close"
      >
        <MdClose size={20} />
      </button>
    </div>
  );
};

export default Search;