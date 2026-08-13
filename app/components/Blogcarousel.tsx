"use client"

import React, { useState } from "react"
import Image from "next/image"

const events = [
  {
    id: 1,
    title: "AWS re:Invent 2026",
    date: "NOVEMBER 30 - DECEMBER 04, 2026",
    location: "LAS VEGAS, NEVADA",
    image:
      "https://assets.website-files.com/5d7f314ca3db08d3323b31c2/5d7f338017c02c30bee15b52_logo-test-three.png",
  },
  {
    id: 2,
    title: "KubeCon + CloudNativeCon Salt Lake City",
    date: "NOVEMBER 09-12, 2026",
    location: "SALT LAKE CITY, UTAH @ SALT PALACE CONVENTION CENTER",
    image:
      "https://assets.website-files.com/5d7f314ca3db08d3323b31c2/5d7f338da3db08210b3b3991_logo-test-four.png",
  },
  {
    id: 3,
    title: "AGNTCon + MCPCon North America",
    date: "OCTOBER 22-23, 2026",
    location: "SAN JOSE, CA @ SAN JOSE MCENERY CONVENTION CENTER",
    image:
      "/https://assets.website-files.com/5d7f314ca3db08d3323b31c2/5d7f338017c02c30bee15b52_logo-test-three.png",
  },
  {
    id: 4,
    title: "PyTorch Conference North America",
    date: "OCTOBER 20-21, 2026",
    location: "SAN JOSE, CALIFORNIA @ SAN JOSE CONVENTION CENTER",
    image:
      "/https://assets.website-files.com/5d7f314ca3db08d3323b31c2/5d7f338da3db08210b3b3991_logo-test-four.png",
  },
  // Add more events here to test the sliding functionality
]

export default function EventCarousel2() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const itemsPerPage = 4
  const totalPages = Math.ceil(events.length / itemsPerPage)

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : 0))
  }

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev < events.length - itemsPerPage ? prev + 1 : prev,
    )
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[#eb487a] to-[#f47f63] py-16 px-8 md:px-16 lg:px-24 flex flex-col justify-center font-sans">
      {/* Header */}
      <h2 className="text-white text-sm md:text-base font-semibold tracking-widest uppercase mb-8 ml-8">
        Events
      </h2>

      <div className="relative flex items-center group">
        {/* Left Navigation Arrow */}
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className={`absolute -left-12 lg:-left-16 z-10 p-2 rounded-full border-[1.5px] border-white text-white transition-opacity duration-300 hover:bg-white/10 ${
            currentIndex === 0
              ? "opacity-30 cursor-not-allowed"
              : "opacity-75 hover:opacity-100"
          }`}
          aria-label="Previous events"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
            />
          </svg>
        </button>

        {/* Carousel Track */}
        <div className="overflow-hidden w-full">
          <div
            className="flex transition-transform duration-500 ease-in-out gap-6"
            style={{
              transform: `translateX(calc(-${currentIndex * (100 / itemsPerPage)}% - ${
                (currentIndex * 24) / itemsPerPage
              }px))`, // 24px is the gap-6
            }}
          >
            {events.map((event) => (
              <div
                key={event.id}
                className="w-full md:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] flex-shrink-0 flex flex-col"
              >
                {/* Image Container */}
                <div className="relative w-full aspect-square mb-4 overflow-hidden bg-black/20">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>

                {/* Text Content */}
                <div className="text-white">
                  <h3 className="text-lg font-medium leading-tight mb-2">
                    {event.title}
                  </h3>
                  <div className="text-[10px] md:text-xs tracking-wider opacity-80 uppercase leading-snug">
                    <p>{event.date}</p>
                    <p>{event.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Navigation Arrow */}
        <button
          onClick={handleNext}
          disabled={currentIndex >= events.length - itemsPerPage}
          className={`absolute -right-12 lg:-right-16 z-10 p-2 rounded-full border-[1.5px] border-white text-white transition-opacity duration-300 hover:bg-white/10 ${
            currentIndex >= events.length - itemsPerPage
              ? "opacity-30 cursor-not-allowed"
              : "opacity-75 hover:opacity-100"
          }`}
          aria-label="Next events"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
            />
          </svg>
        </button>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center items-center gap-2 mt-12">
        {Array.from({ length: totalPages }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx * itemsPerPage)}
            className={`rounded-full transition-all duration-300 ${
              Math.floor(currentIndex / itemsPerPage) === idx
                ? "w-2 h-2 bg-white"
                : "w-1.5 h-1.5 bg-white/40 hover:bg-white/70"
            }`}
            aria-label={`Go to slide page ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
