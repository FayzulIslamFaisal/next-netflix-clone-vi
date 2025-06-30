"use client";

import { useEffect } from "react";
import { IoClose } from "react-icons/io5";

const DetailsModal = ({ id, mediaType, onClose }) => {
  // Optional: Close modal on ESC
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
