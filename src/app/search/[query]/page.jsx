"use client";

import { use, useContext, useEffect, useState, useTransition } from "react";
import ClientAuthGuard from "@/components/auth-provider/ClientAuthGuard";
import ManageAccount from "@/components/manage-account";
import { GlobalContext } from "@/app/context";
import { getTvOrMovieSearchs } from "@/utils";
import Navbar from "@/components/navbar/Navbar";
import { FaCheck, FaChevronDown, FaPlus } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import DetailsModal from "@/components/DetailsModal";

const SearchPage = ({ params }) => {
  const unwrappedParams = use(params); // ✅ unwrap the Promise
  const { query } = unwrappedParams || {};

  const { 
          loggedInAccount, 
          searchResults, 
          setSearchResults, 
          currentMediaInfoIdAndType, 
          setCurrentMediaInfoIdAndType
       } = useContext(GlobalContext);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState(null);

  const decodedQuery = decodeURIComponent(query || "");
  const router = useRouter();

  useEffect(() => {
    if (!loggedInAccount || !decodedQuery) return;

    const fetchSearchResults = async () => {

      try {
        setError(null);
        startTransition(() => {
          (async () => {
            const tvData = await getTvOrMovieSearchs("tv", decodedQuery);
            const movieData = await getTvOrMovieSearchs("movie", decodedQuery);
            console.log("tvData", tvData?.results);
            console.log("movieData", movieData?.results);
            

            setSearchResults({
              tvShows: tvData?.results.map((item) => ({ ...item, mediaType: "tv" })),
              movies: movieData?.results.map((item) => ({ ...item, mediaType: "movie" })),
            });
          })();
        });
      } catch (err) {
        console.error("Search failed:", err);
        setError("Failed to fetch search results");
      }
    };

    fetchSearchResults();
  }, [loggedInAccount, decodedQuery]);

  if (!loggedInAccount) return <ManageAccount />;

  return (
    <ClientAuthGuard>
      <>
      <div className="bg-black min-h-screen pt-[100px]">
      <Navbar/>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6 text-white">
          Showing Results for: "{decodedQuery}"
        </h1>

        {isPending && <h1 className="text-center py-8 text-white">Searching...</h1>}
        {error && <div className="text-center py-8 text-red-500">{error}</div>}

        {!isPending && (
          <>
            {/* TV Shows */}
            {searchResults?.tvShows?.length > 0 && (
              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4 text-white">TV Shows</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {searchResults.tvShows.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => router.push(`/watch/${item.mediaType}/${item.id}`)}
                      className="relative bg-gray-900 h-[200px] rounded-lg overflow-hidden shadow-md hover:scale-105 transition-transform duration-300"
                    >
                      <img
                        src={
                          item.backdrop_path
                            ? `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${item.backdrop_path}`
                            : item.poster_path
                            ? `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${item.poster_path}`
                            : "/Logo.jpg"
                        }
                        alt={item.original_title || item.title}
                        className="w-full h-full object-cover cursor-pointer"
                      />
                      <div className="p-2 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-sm font-medium text-center truncate">
                        <p>
                          {item.original_title || item.title ||item?.original_name || item?.name}
                        </p>

                        <div className=" flex items-center justify-center gap-3 mt-3">
                            <button className="bg-black/40 text-white border p-2 rounded-full hover:bg-gray-700 transition-colors duration-300 cursor-pointer">
                              {item?.addedToFavorites ? (
                                <FaCheck className="w-5 h-5 text-white" />
                              ) : (
                                <FaPlus className="w-5 h-5 text-white" />
                              )}
                          </button>
                          <button
                             onClick={(e) => {
                              e.stopPropagation(); 
                              setCurrentMediaInfoIdAndType({ id: item.id, mediaType: item.mediaType });
                            }}
                           className="bg-black/40 text-white border p-2 rounded-full hover:bg-gray-700 transition-colors duration-300 cursor-pointer">
                            <FaChevronDown className="w-5 h-5 text-white"/>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Movies */}
            {searchResults?.movies?.length > 0 && (
              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4 text-white">Movies</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {searchResults.movies.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => router.push(`/watch/${item.mediaType}/${item.id}`)}
                      className= "relative bg-gray-900 h-[200px] rounded-lg overflow-hidden shadow-md hover:scale-105 transition-transform duration-300"
                    >
                      <img
                        src={
                            item.backdrop_path
                              ? `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${item.backdrop_path}`
                              : item.poster_path
                              ? `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${item.poster_path}`
                              : "/Logo.jpg"
                          }
                        alt={item.name}
                        className="w-full h-full object-cover cursor-pointer"
                      />
                      <div className="p-2 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-sm font-medium text-center truncate">
                        <p>
                          {item?.original_title || item?.title ||item?.original_name || item?.name}
                        </p>
                        <div className=" flex items-center justify-center gap-3 mt-3">
                            <button className="bg-black/40 cursor-pointer text-white border p-2 rounded-full hover:bg-gray-700 transition-colors duration-300">
                              {item.addedToFavorites ? (
                                <FaCheck className="w-5 h-5 text-white" />
                              ) : (
                                <FaPlus className="w-5 h-5 text-white" />
                              )}
                          </button>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation(); 
                              setCurrentMediaInfoIdAndType({ id: item.id, mediaType: item.mediaType });
                            }}
                            className="bg-black/40 cursor-pointer text-white border p-2 rounded-full hover:bg-gray-700 transition-colors duration-300">
                            <FaChevronDown className="w-5 h-5 text-white"/>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* No Results */}
            {!searchResults?.tvShows?.length &&
              !searchResults?.movies?.length &&
              !error && (
                <div className="text-center py-8 text-white">
                  No results found for "{decodedQuery}"
                </div>
              )}
          </>
        )}
      </div>
      </div>
      {
        currentMediaInfoIdAndType && (
          <DetailsModal
            id={currentMediaInfoIdAndType.id}
            mediaType={currentMediaInfoIdAndType.mediaType}
            onClose={() => setCurrentMediaInfoIdAndType(null)}
          />
        )
      }
      </>
    </ClientAuthGuard>
  );
};

export default SearchPage;