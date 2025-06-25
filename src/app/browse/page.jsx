"use client";
import ClientAuthGuard from "@/components/auth-provider/ClientAuthGuard";
import { useContext, useEffect, useTransition, useState } from "react";
import { GlobalContext } from "../context";
import ManageAccount from "@/components/manage-account";
import CommonLayout from "@/components/common-layout";
import {
  getPopularMedias,
  getTopratedMedias,
  getTrendingMedias,
} from "@/utils";

const BrowsePage = () => {
  const { loggedInAccount, mediaData, setMediaData } = useContext(GlobalContext);
  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState(true); // Additional flag to help prevent flicker

  useEffect(() => {
    startTransition(() => {
      async function fetchMediaData() {
        const trendingTvShows = await getTrendingMedias("tv");
        const popularTvShows = await getPopularMedias("tv");
        const topRetedTvShows = await getTopratedMedias("tv");

        const trendingMovies = await getTrendingMedias("movie");
        const popularMovies = await getPopularMedias("movie");
        const topRetedMovies = await getTopratedMedias("movie");

        setMediaData([
          ...[
            { title: "Trending TV Shows", medias: trendingTvShows },
            { title: "Popular TV Shows", medias: popularTvShows },
            { title: "Top Rated TV Shows", medias: topRetedTvShows },
          ].map((items) => ({
            ...items,
            medias: items.medias.map((mediaItem) => ({
              ...mediaItem,
              mediaType: "tv",
            })),
          })),
          ...[
            { title: "Trending Movies", medias: trendingMovies },
            { title: "Popular Movies", medias: popularMovies },
            { title: "Top Rated Movies", medias: topRetedMovies },
          ].map((items) => ({
            ...items,
            medias: items.medias.map((mediaItem) => ({
              ...mediaItem,
              mediaType: "movie",
            })),
          })),
        ]);

        setIsLoading(false); // stop loading
      }

      fetchMediaData();
    });
  }, []);

  if (loggedInAccount === null) {
    return <ManageAccount />;
  }

  if (isPending || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg font-medium text-gray-600">Loading Home...</p>
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

export default BrowsePage;
