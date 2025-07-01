"use client";

import { GlobalContext } from "@/app/context";
import { getSimilerTvOrMovies, getTvOrMovieDetailsById } from "@/utils";
import { useContext, useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";

const DetailsModal = ({ id, mediaType, onClose }) => {
  const {
    mediaDetails,
    setMediaDetails,
    similarMovies,
    setSimilarMovies,
    currentMediaInfoIdAndType,
    setCurrentMediaInfoIdAndType,
    loggedInAccount,
  } = useContext(GlobalContext);

  const [key, setKey] = useState('');


  useEffect(() => {
    const handleKeyDown = (e) => {
        if (e.key === "Escape" || e.key === "Enter") {
        e.preventDefault();
        onClose();
        }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    if (mediaType !== null && id !== null) {
      async function getMediaDetails() {
        const extrackMediaDetails = await getTvOrMovieDetailsById(mediaType, id);

        const findIndexOfTrailer = extrackMediaDetails?.videos?.results?.findIndex(
          (video) => video?.type === "Trailer"
        );
        console.log("findIndexOfTrailer", findIndexOfTrailer);
        

        // Only returns array of similar items (not an object with videos inside)
        const similarResults = await getSimilerTvOrMovies(mediaType, id);

        setMediaDetails(extrackMediaDetails);

        const trailerKey =
          findIndexOfTrailer !== -1
            ? extrackMediaDetails?.videos?.results?.[findIndexOfTrailer]?.key
            : "XuDwndGaCFo"; // fallback

        setKey(trailerKey);

        setSimilarMovies(
          similarResults?.map((item) => ({
            ...item,
            mediaType: mediaType === "movie" ? "movie" : "tv",
            addedToFavorites: false,
          })) || [] 
        );
      }

      getMediaDetails();
    }
  }, [loggedInAccount, mediaType, id]);



  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
      {/* Modal Container */}
      <div className="relative bg-gray-900 border border-white dark:bg-zinc-900 rounded-xl shadow-xl max-w-2xl w-full p-6 animate-scaleIn">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-white bg-black/40 rounded-full p-1 transition"
        >
          <IoClose className="w-6 h-6 cursor-pointer" />
        </button>

        {/* Modal Content */}
        <h2 className="text-xl font-bold text-white mb-4">Details</h2>

        <p className="text-white mb-2">
          <strong>ID:</strong> {id}
        </p>
        <p className="text-white mb-2">
          <strong>Type:</strong> {mediaType}
        </p>

        {/* You can fetch & display more info here based on id/mediaType */}
        <div className="text-white mt-4">More info coming soon...</div>
      </div>
    </div>
  );
};

export default DetailsModal;
