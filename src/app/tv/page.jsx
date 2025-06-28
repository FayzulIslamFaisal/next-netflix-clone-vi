"use client";

import { useContext, useEffect, useTransition } from "react";
import ClientAuthGuard from "@/components/auth-provider/ClientAuthGuard";
import ManageAccount from "@/components/manage-account";
import CommonLayout from "@/components/common-layout";
import { GlobalContext } from "../context";
import { getTvOrMovieByGenre } from "@/utils";

const TvPage = () => {
  const { loggedInAccount, mediaData, setMediaData } = useContext(GlobalContext);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (!loggedInAccount) return;

    async function fetchMedias() {
      const [
        actionAndAdventure,
        crime,
        comedy,
        family,
        mystery,
        reality,
        sciFiAndFantasy,
        war,
        western,
        dramaMovies,
      ] = await Promise.all([
        getTvOrMovieByGenre("tv", 10759),
        getTvOrMovieByGenre("tv", 80),
        getTvOrMovieByGenre("tv", 35),
        getTvOrMovieByGenre("tv", 10751),
        getTvOrMovieByGenre("tv", 9648),
        getTvOrMovieByGenre("tv", 10764),
        getTvOrMovieByGenre("tv", 10765),
        getTvOrMovieByGenre("tv", 10768),
        getTvOrMovieByGenre("tv", 37),
        getTvOrMovieByGenre("tv", 18),
      ]);

      startTransition(() => {
        setMediaData(
          [
            { title: "Action & Adventure", medias: actionAndAdventure },
            { title: "Crime", medias: crime },
            { title: "Comedy", medias: comedy },
            { title: "Family", medias: family },
            { title: "Mystery", medias: mystery },
            { title: "Reality", medias: reality },
            { title: "Sci-Fi & Fantasy", medias: sciFiAndFantasy },
            { title: "War & Politics", medias: war },
            { title: "Western", medias: western },
            { title: "Drama Movies", medias: dramaMovies },
          ].map((items) => ({
            ...items,
            medias: items.medias.map((mediaItem) => ({
              ...mediaItem,
              mediaType: "tv",
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

export default TvPage;
