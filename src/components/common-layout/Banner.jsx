import Image from "next/image";
import { AiFillPlayCircle } from "react-icons/ai";
import { IoMdInformationCircle } from "react-icons/io";

const Banner = ({ medias }) => {
  console.log("Banner medias===>", medias);

  const randomMedia =
    medias && medias.length > 0
      ? medias[Math.floor(Math.random() * medias.length)]
      : null;

  return (
    <div className="pt-[90px] h-[calc(100vh-200px)] relative mb-8">
      {randomMedia ? (
        <div className="w-full h-full relative">
            <Image
            src={
                randomMedia.backdrop_path
                ? `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${randomMedia.backdrop_path}`
                : "/images/file.svg.jpg"
            }
            alt={randomMedia.name || randomMedia.title}
            fill
            className="object-cover"
            />

            {/* Centered Title Overlay */}
            {(randomMedia.name || randomMedia.title || randomMedia.original_name) && (
            <div className="absolute inset-0 flex items-center justify-center flex-col bg-black/40 ">
                <div className="container mx-auto text-white text-center p-4">
                    <h2 className="text-white text-4xl font-bold text-center px-4 mb-6">
                        {randomMedia.name || randomMedia.title || randomMedia.original_name}
                    </h2>
                    <p className="text-zinc-200 max-w-[800px] mx-auto">{randomMedia.overview}</p>
                    <div className="flex space-x-4 mt-6 justify-center">
                        <button className="bg-white text-black px-6 py-2 rounded flex items-center gap-2 cursor-pointer ring-2"><AiFillPlayCircle className="mr-2"/><span>Play</span></button>
                         <button className="bg-transparent text-white px-6 py-2 rounded flex items-center gap-2 cursor-pointer ring-2"><IoMdInformationCircle className="mr-2"/><span>More Info</span></button>
                    </div>
                </div>
            </div>
            )}
        </div>
        ) : (
        <p>No medias available</p>
        )}

    </div>
  );
};

export default Banner;
