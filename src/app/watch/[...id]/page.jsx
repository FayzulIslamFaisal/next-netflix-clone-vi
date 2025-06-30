"use client";

import { use, useEffect, useState, useTransition } from "react";
import { getTvOrMovieVideoById } from "@/utils";
import ReactPlayer from "react-player";

const WatchPage = ({ params }) => {
  const unwrappedParams = use(params);
  const [mediaType, id] = unwrappedParams?.id || [];

  const [mediaDetails, setMediaDetails] = useState(null);
  const [videoDetails, setVideoDetails] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!mediaType || !id) {
      setError("Invalid media type or ID");
      return;
    }

    startTransition(() => {
      (async () => {
        try {
          const response = await getTvOrMovieVideoById(mediaType, id);
          console.log("API Response:", response);
          
          if (!response) {
            setError("No media details found");
            return;
          }

          setMediaDetails({
            title: response.title || response.name || "Untitled",
            overview: response.overview || "No description available"
          });

          if (response.videos?.results) {
            setVideoDetails(response.videos.results);
            
            const trailer = response.videos.results.find(
              (item) => item.type === "Trailer" && item.site === "YouTube"
            );

            const clip = response.videos.results.find(
              (item) => item.type === "Clip" && item.site === "YouTube"
            );

            setTrailerKey(trailer?.key || clip?.key || null);
          } else {
            setTrailerKey(null);
          }

        } catch (error) {
          console.error("Error fetching media details:", error);
          setError("Failed to load media details");
        }
      })();
    });
  }, [mediaType, id]);

  if (isPending && !mediaDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-black">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 bg-black">
        {error}
      </div>
    );
  }

  if (!mediaDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-black">
        Loading...
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-0px)] bg-black text-white p-6 space-y-4">
      {/* <h1 className="text-3xl font-bold">{mediaDetails.title}</h1>
      <p className="text-gray-300">{mediaDetails.overview}</p> */}

      {trailerKey ? (
        <div className="relative pt-[50.25%]"> {/* 16:9 Aspect Ratio */}
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${trailerKey}`}
            width="100%"
            height="100%"
            style={{ position: "absolute", top: "0", left: "0" }}
            playing
            controls
            config={{
              youtube: {
                playerVars: { showinfo: 1 }
              }
            }}
          />
        </div>
      ) : (
        <p className="text-sm text-yellow-400">
          {videoDetails ? "No YouTube trailer available" : "No video data available"}
        </p>
      )}
    </div>
  );
};

export default WatchPage;