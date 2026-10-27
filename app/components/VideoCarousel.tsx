"use client"
import React, { useRef, useState } from "react"
import { getVideos } from "@/utils/getPosts"

import { getYouTubeId } from "@/utils/getYTIds"
import sectionBadge, { SectionBadgeProps as type } from "./SectionBadge"
const getThumbnailUrl = (
  videoId: string | null,
  quality: string = "hqdefault",
): string | null => {
  if (!videoId) return null
  return `https://img.youtube.com/vi/${videoId}/${quality}.jpg`
}

const mockVideos = [
  {
    id: 1,
    title: "FOST Munich – HapiDays 2026",
    thumbnail: getThumbnailUrl(
      getYouTubeId("https://www.youtube.com/watch?v=btmnaigNNvA&t=2s"),
    ),
    url: "https://www.youtube.com/watch?v=btmnaigNNvA&t=2s",
  },
  {
    id: 2,
    title: "FOST Amsterdam – Apidays 2026",
    thumbnail: getThumbnailUrl(
      getYouTubeId("https://www.youtube.com/watch?v=pYp5mDzQ3js"),
    ),
    url: "https://www.youtube.com/watch?v=pYp5mDzQ3js",
  },
  {
    id: 3,
    title: "FOST (Future of Software Technologies) 2026",
    thumbnail: getThumbnailUrl(
      getYouTubeId("https://www.youtube.com/watch?v=btmnaigNNvA&t=2s"),
    ),
    url: "https://www.youtube.com/watch?v=btmnaigNNvA&t=2s",
  },
  {
    id: 4,
    title: "FOST New York – AI Collective 2026",
    thumbnail: getThumbnailUrl(
      getYouTubeId("https://www.youtube.com/watch?v=pYp5mDzQ3js"),
    ),
    url: "https://www.youtube.com/watch?v=pYp5mDzQ3js",
  },
  {
    id: 5,
    title: "FOST Global – Future Tech 2027",
    thumbnail: getThumbnailUrl(
      getYouTubeId("https://www.youtube.com/watch?v=pYp5mDzQ3js"),
    ),
    url: "https://www.youtube.com/watch?v=pYp5mDzQ3js",
  },
]

export default function VideoCarousel() {
  const [videos, setVideos] = useState<any[]>([])
  const [activePage, setActivePage] = useState(0)

  React.useEffect(() => {
    const fetchVideos = async () => {
      const videosData = await getVideos()
      setVideos(videosData)
    }
    fetchVideos()
  }, [])

  const scrollRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollPosition = scrollRef.current.scrollLeft
      const cardWidth = (scrollRef.current.children[0] as HTMLDivElement)
        .offsetWidth
      // Gap is 16px (gap-4 in Tailwind)
      const newIndex = Math.round(scrollPosition / (cardWidth + 16))
      setActiveIndex(newIndex)
    }
  }

  const scrollTo = (index: number) => {
    if (scrollRef.current) {
      const cardWidth = (scrollRef.current.children[0] as HTMLDivElement)
        .offsetWidth
      scrollRef.current.scrollTo({
        left: index * (cardWidth + 16),
        behavior: "smooth",
      })
    }
  }

  const scrollPrev = () => {
    if (scrollRef.current) {
      const cardWidth = (scrollRef.current.children[0] as HTMLDivElement)
        .offsetWidth
      scrollRef.current.scrollBy({
        left: -(cardWidth + 16),
        behavior: "smooth",
      })
    }
  }

  const scrollNext = () => {
    if (scrollRef.current) {
      const cardWidth = (scrollRef.current.children[0] as HTMLDivElement)
        .offsetWidth
      scrollRef.current.scrollBy({
        left: cardWidth + 16,
        behavior: "smooth",
      })
    }
  }

  const itemsPerPage = 4
  const totalDots = Math.ceil(videos.length / itemsPerPage)

  const makeThumbnailUrl = (videoUrl: string) => {
    const videoId = getYouTubeId(videoUrl)
    return getThumbnailUrl(videoId)
  }

  return (
    <section className=" py-12 md:py-10 px-4 md:px-8 lg:px-6">
      <div className=" mx-auto max-w-screen-xl font-sans flex flex-col justify-center">
        <div className="  ">
          {/* Header Section */}
          {sectionBadge({
            icon: "/podcasts-icon.svg",
            label: "VIDEOS & PODCASTS",
          })}

          {/* Carousel Wrapper with Relative Positioning for Arrows */}
          <div className="relative group">
            {/* Left Arrow */}
            <button
              onClick={scrollPrev}
              className="absolute left-2 sm:-left-4 top-1/2 -translate-y-1/2 z-10 bg-black/60 hover:bg-black border border-gray-700 text-white w-10 h-10 flex items-center justify-center rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-auto"
              aria-label="Scroll left"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            {/* Right Arrow */}
            <button
              onClick={scrollNext}
              className="absolute right-2 sm:-right-4 top-1/2 -translate-y-1/2 z-10 bg-black/60 hover:bg-black border border-gray-700 text-white w-10 h-10 flex items-center justify-center rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-auto"
              aria-label="Scroll right"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            {/* Carousel Container */}
            <div
              ref={scrollRef}
              onScroll={handleScroll}
              className="flex gap-4 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-4"
            >
              {videos.map((video) => (
                <a
                  key={video.id}
                  href={video.Video_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block snap-start shrink-0 w-[85vw] sm:w-[45vw] md:w-[30vw] lg:w-[calc(25%-12px)] "
                >
                  <div className="relative w-full aspect-[16/9]  overflow-hidden bg-gray-900 mb-4">
                    <img
                      src={makeThumbnailUrl(video.Video_url)!}
                      alt={video.Title}
                      className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-300"
                    />

                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-14 h-14 bg-black/40 border border-white/30 backdrop-blur-sm rounded-full flex items-center justify-center ">
                        <svg
                          className="w-6 h-6 text-white ml-1"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <span className="text-[#111525] font-medium text-[13px] leading-4 px-1 pb-2">
                    {video.Title}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center items-center gap-2 mt-6">
            {Array.from({ length: totalDots }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => scrollTo(idx)}
                className={`rounded-full transition-all duration-300 ${
                  activePage === idx
                    ? "w-2.5 h-2.5 bg-white"
                    : "w-2 h-2 bg-gray-600 hover:bg-gray-400"
                }`}
                aria-label={`Go to page ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
