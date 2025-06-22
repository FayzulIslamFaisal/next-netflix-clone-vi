"use client";
import ClientAuthGuard from "@/components/auth-provider/ClientAuthGuard";

import { useContext, useEffect, useTransition } from "react";
import { GlobalContext } from "../context";
import ManageAccount from "@/components/manage-account";
import CommonLayout from "@/components/common-layout";

const BrowsePage = () => {
  const { loggedInAccount, mediaData, setMediaData } = useContext(GlobalContext);
  const [isPending, startTransition] = useTransition();
  useEffect(() => {
    async function fetchMediaData() {

        const trendingTvShows = await getTrendingMedias("tv");
        const trendingMovies = await getTrendingMedias("movie");
        const topRatedTvShows = await getTopratedMedias("tv");
        const topRatedMovies = await getTopratedMedias("movie");
        const popularTvShows = await getPopularMedias("tv");
        const popularMovies = await getPopularMedias("movie");  
    }
    fetchMediaData();
  }, []);
  
  if (loggedInAccount === null) {
    return <ManageAccount />;
  }
  console.log("Home Page loggedInAccount", loggedInAccount);
  

  return (
    <ClientAuthGuard>
      <main>
        <CommonLayout/>
      </main>
    </ClientAuthGuard>
  );
};

export default BrowsePage;
