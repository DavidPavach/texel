import { useState } from "react";

//Icons
import { Play, ExternalLink, ChevronRight, Star } from "lucide-react";


export default function FeaturedExchange({ name, logo, description, videoId, url, features }: FeaturedExchangeProps) {

  const [showVideo, setShowVideo] = useState(false)

  return (
    <div className="relative shadow-2xl mb-12 rounded-2xl w-full overflow-hidden">
      <div className="z-0 absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent"></div>
      </div>

      <div className="z-10 relative flex md:flex-row flex-col gap-8 md:gap-12 p-8 md:p-12">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <Star size={16} className="text-primary" fill="#FFC107" />
            <span className="font-medium text-[10px] text-primary md:text-xs xl:text-sm">Featured Exchange</span>
          </div>
          <div className="flex items-center gap-2 mb-4">
            <div className="relative bg-white p-2 rounded-full size-8 md:size-12 xl:size-16">
              <img src={logo || "/coin.svg"} alt={`${name} logo`} className="p-1 size-full object-center object-cover" />
            </div>
            <h2 className="font-bold text-white text-xl md:text-2xl xl:text-3xl">{name}</h2>
          </div>

          <p className="mb-6 max-w-2xl text-neutral-300 text-sm md:text-base xl:text-lg">{description}</p>

          <div className="gap-3 grid grid-cols-1 sm:grid-cols-2 mb-8">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2">
                <ChevronRight size={16} className="text-primary" />
                <span className="text-white">{feature}</span>
              </div>
            ))}
          </div>

          <div className="flex sm:flex-row flex-col gap-4">
            <button onClick={() => setShowVideo(!showVideo)} className="flex justify-center items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm px-6 py-3 rounded-lg text-white transition-colors">
              <Play size={18} />
              <span>{showVideo ? "Hide Tutorial" : "Watch Tutorial"}</span>
            </button>
            <a href={url} target="_blank" rel="noopener noreferrer" className="flex justify-center items-center gap-2 bg-primary hover:bg-primary/90 px-6 py-3 rounded-lg font-medium text-black transition-colors">
              <span>Buy on {name}</span>
              <ExternalLink size={18} />
            </a>
          </div>
        </div>

        <div className="flex flex-1 justify-center items-center">
          {showVideo ? (
            <div className="bg-neutral-900 shadow-2xl rounded-lg w-full max-w-md aspect-square md:aspect-video overflow-hidden">
              <iframe
                src={`https://www.youtube.com/embed/${videoId}`}
                title={`How to buy cryptocurrency on ${name}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
          ) : (
            <div className="relative bg-neutral-900 shadow-2xl rounded-lg w-full max-w-md aspect-square md:aspect-video overflow-hidden cursor-pointer" onClick={() => setShowVideo(true)}>
              <div className="absolute inset-0 flex justify-center items-center bg-black/40">
                <div className="flex justify-center items-center bg-primary/90 rounded-full w-16 h-16">
                  <Play size={24} className="ml-1 text-black" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
