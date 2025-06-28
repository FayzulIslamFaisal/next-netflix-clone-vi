"use client";

import ClientAuthGuard from "@/components/auth-provider/ClientAuthGuard";
import { useContext, useEffect, useTransition } from "react";
import { GlobalContext } from "../context";
import ManageAccount from "@/components/manage-account";
import CommonLayout from "@/components/common-layout";
import { getTvOrMovieByGenre } from "@/utils"; // Missing import

const MoviesPage = () => {
  const { loggedInAccount, mediaData, setMediaData } = useContext(GlobalContext);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (!loggedInAccount) return;

    async function fetchMedias() {
      const [
        action,
        adventure,
        crime,
        comedy,
        family,
        mystery,
        romance,
        reality,
        sciFiAndFantasy,
        war,
        history,
        western,
        drama,
        horror,
      ] = await Promise.all([
        getTvOrMovieByGenre("movie", 28),     // Action
        getTvOrMovieByGenre("movie", 12),     // Adventure
        getTvOrMovieByGenre("movie", 80),     // Crime
        getTvOrMovieByGenre("movie", 35),     // Comedy
        getTvOrMovieByGenre("movie", 10751),  // Family
        getTvOrMovieByGenre("movie", 9648),   // Mystery
        getTvOrMovieByGenre("movie", 10749),  // Romance
        getTvOrMovieByGenre("movie", 10764),  // Reality
        getTvOrMovieByGenre("movie", 878),    // Sci-Fi & Fantasy
        getTvOrMovieByGenre("movie", 10752),  // War
        getTvOrMovieByGenre("movie", 36),     // History
        getTvOrMovieByGenre("movie", 37),     // Western
        getTvOrMovieByGenre("movie", 18),     // Drama
        getTvOrMovieByGenre("movie", 27),     // Horror
      ]);

      startTransition(() => {
        setMediaData(
          [
            { title: "Action", medias: action },
            { title: "Adventure", medias: adventure },
            { title: "Crime", medias: crime },
            { title: "Comedy", medias: comedy },
            { title: "Family", medias: family },
            { title: "Mystery", medias: mystery },
            { title: "Romance", medias: romance },
            { title: "Reality", medias: reality },
            { title: "Sci-Fi & Fantasy", medias: sciFiAndFantasy },
            { title: "War", medias: war },
            { title: "History", medias: history },
            { title: "Western", medias: western },
            { title: "Drama", medias: drama },
            { title: "Horror", medias: horror },
          ].map((items) => ({
            ...items,
            medias: items.medias.map((mediaItem) => ({
              ...mediaItem,
              mediaType: "movie",
              addedToFavorites: false,
            })),
          }))
        );
      });
    }

    fetchMedias();
  }, [loggedInAccount, setMediaData]);

  if (loggedInAccount === null) {
    return <ManageAccount />;
  }

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg font-medium text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <ClientAuthGuard>
      <main className="bg-black text-white min-h-screen">
        <CommonLayout mediaData={mediaData} />
      </main>
    </ClientAuthGuard>
  );
};

export default MoviesPage;
