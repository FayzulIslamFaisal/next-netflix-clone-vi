"use client";
import ClientAuthGuard from "@/components/auth-provider/ClientAuthGuard";
import { use, useContext, useEffect, useState, useTransition } from "react";
import { GlobalContext } from "@/app/context";
import ManageAccount from "@/components/manage-account";
import { getTvOrMovieSearchs } from "@/utils";

const SearchPage = ({ params }) => {
  const { loggedInAccount, searchResults, setSearchResults } = useContext(GlobalContext);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState(null);
  
  // Unwrap params promise
  const { query } = use(params);
  const decodedQuery = decodeURIComponent(query);

  useEffect(() => {
    if (!loggedInAccount) return;

    const fetchSearchResults = async () => {
      try {
        setError(null);
        
        // Wrap the state updates in a transition
        startTransition(async () => {
          const [tvShows, movies] = await Promise.all([
            getTvOrMovieSearchs("tv", decodedQuery),
            getTvOrMovieSearchs("movie", decodedQuery)
          ]);

          setSearchResults({
            tvShows,
            movies,
            query: decodedQuery
          });
        });
      } catch (err) {
        console.error("Search failed:", err);
        setError("Failed to fetch search results");
      }
    };

    fetchSearchResults();
  }, [loggedInAccount, decodedQuery, setSearchResults]);

  if (!loggedInAccount) {
    return <ManageAccount />;
  }

  return (
    <ClientAuthGuard>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">
          Search Results for: {decodedQuery}
        </h1>

        {/* Loading state (part of the transition) */}
        {isPending && (
          <div className="text-center py-8">Searching...</div>
        )}

        {/* Error state */}
        {error && (
          <div className="text-center py-8 text-red-500">{error}</div>
        )}

        {/* Results */}
        {!isPending && (
          <>
            {/* TV Shows */}
            {searchResults?.tvShows?.length > 0 && (
              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">TV Shows</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {searchResults.tvShows.map((show) => (
                    <div key={show.id} className="bg-gray-800 rounded overflow-hidden">
                      {/* Render TV show card */}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Movies */}
            {searchResults?.movies?.length > 0 && (
              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Movies</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {searchResults.movies.map((movie) => (
                    <div key={movie.id} className="bg-gray-800 rounded overflow-hidden">
                      {/* Render movie card */}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* No results */}
            {(!searchResults?.tvShows?.length && !searchResults?.movies?.length && !error) && (
              <div className="text-center py-8">
                No results found for "{decodedQuery}"
              </div>
            )}
          </>
        )}
      </div>
    </ClientAuthGuard>
  );
};

export default SearchPage;