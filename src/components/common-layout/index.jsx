"use client"

import Image from "next/image";
import Navbar from "../navbar/Navbar"
import Banner from "./Banner";
import { AiFillPlayCircle } from "react-icons/ai";
import { FaCheck, FaChevronDown, FaPlus } from "react-icons/fa6";
import { IoMdInformationCircle } from "react-icons/io";
import { useRouter } from "next/navigation";

const CommonLayout = ({mediaData}) => {
  // console.log("BrowsePage mediaData", mediaData);
  const baseImageUrl = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;
  const router = useRouter();
  return (
    <>
    <Navbar/>
    <Banner medias={mediaData && mediaData.length >0 ? mediaData[0].medias:null}/>
    <div className="relative pl-4 pb-24 lg:space-24 ">
      <section className="md:space-y-16">
        {mediaData.length > 0 ? mediaData.map((item, index) => (
        <div key={index} className="mb-8">
          <h2 className="text-4xl font-bold mb-6">{item.title}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {item.medias.map((media, mediaIndex) => (
              <div
                key={mediaIndex}
                onClick={() => router.push(`/watch/${media.mediaType}/${media.id}`)}
                className="bg-gray-200/10 cursor-pointer p-2 rounded-lg relative transition-all duration-500 ease-in-out hover:shadow-2xl hover:scale-[1.02]"
              >
                <div className="w-full h-[200px] relative group overflow-hidden rounded-lg">
                  {/* Image */}
                  <Image
                    src={`${baseImageUrl}${media?.backdrop_path ? media.backdrop_path : media?.poster_path}`}
                    alt={media.name || media.title}
                    fill
                    className="cursor-pointer object-cover transform transition-transform duration-500 ease-in-out group-hover:scale-110"
                  />

                  {/* Overlay: Centered Title + Button */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center px-2">
                    {/* Title */}
                    <h3 className="text-white text-lg font-semibold mb-2">
                      {media.name || media.title}
                    </h3>

                    {/* Button */}
                    <div className=" flex items-center gap-3">
                        <button className="bg-black/40 text-white border p-2 rounded-full hover:bg-gray-700 transition-colors duration-300">
                          {media.addedToFavorites ? (
                            <FaCheck className="w-5 h-5 text-white" />
                          ) : (
                            <FaPlus className="w-5 h-5 text-white" />
                          )}
                      </button>
                      <button className="bg-black/40 text-white border p-2 rounded-full hover:bg-gray-700 transition-colors duration-300">
                        <FaChevronDown className="w-5 h-5 text-white"/>
                      </button>
                    </div>
                    
                  </div>
                </div>
              </div> 
              ))}
          </div>
        </div>
      )) : <p>No data found</p>}

        </section>
    </div>
    </>
  )
}

export default CommonLayout