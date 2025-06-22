"use client"

import Navbar from "../navbar/Navbar"

const CommonLayout = ({mediaData}) => {
  console.log("BrowsePage mediaData", mediaData);
  return (
    <>
    <Navbar/>
    <div className="relative pl-4 pb-24 lg:space-24">
      <section className="md:space-y-16">
        {mediaData.map((item, index) => (
          <div key={index} className="mb-8">
            <h2 className="text-2xl font-bold mb-4">{item.title}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {item.medias.map((media, mediaIndex) => (
                <div key={mediaIndex} className="bg-gray-200 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-black">{media.name || media.title}</h3>
                  <p className="text-black">{media.overview}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
        </section>
    </div>
    </>
  )
}

export default CommonLayout