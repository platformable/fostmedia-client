"use client"

import React, { useRef } from "react"

// --- MOCK API DATA ---
// In your real application, you would fetch this from your backend.

type EventData = {
  id: number
  dateDays: string
  dateMonths: string
  eventName: string
  eventLocation: string
  skylineImage: string // URL to the skyline image
  link: string // Link to the event page
}

const apiData = [
  {
    id: 1,
    dateDays: "30-1",
    dateMonths: "SEP/OCT",
    eventName: "FOST",
    eventLocation: "London",

    skylineImage: "/apidays-india-bg.png",
    link: "/fost-london",
  },
  {
    id: 2,
    dateDays: "9-10",
    dateMonths: "SEP",
    eventName: "FOST",
    eventLocation: "Toronto",
    skylineImage: "/apidays-india-bg.png",
    link: "/fost-toronto",
  },
  {
    id: 3,
    dateDays: "19-20",
    dateMonths: "AUG",
    eventName: "FOST",
    eventLocation: "India",
    skylineImage: "/apidays-india-bg.png",
    link: "/fost-india",
  },
  {
    id: 4,
    dateDays: "28-29",
    dateMonths: "OCT",
    eventName: "FOST",
    eventLocation: "Australia",
    skylineImage: "/apidays-india-bg.png",
    link: "/fost-australia",
  },
  {
    id: 5,
    dateDays: "30-1",
    dateMonths: "SEP/OCT",
    eventName: "FOST",
    eventLocation: "London",

    skylineImage: "/apidays-india-bg.png",
    link: "/fost-london",
  },
  {
    id: 6,
    dateDays: "9-10",
    dateMonths: "SEP",
    eventName: "FOST",
    eventLocation: "Toronto",
    skylineImage: "/apidays-india-bg.png",
    link: "/fost-toronto",
  },
  {
    id: 7,
    dateDays: "19-20",
    dateMonths: "AUG",
    eventName: "FOST",
    eventLocation: "India",
    skylineImage: "/apidays-india-bg.png",
    link: "/fost-india",
  },
  {
    id: 8,
    dateDays: "28-29",
    dateMonths: "OCT",
    eventName: "FOST",
    eventLocation: "Australia",
    skylineImage: "/apidays-india-bg.png",
    link: "/fost-australia",
  },
]

// --- EVENT CARD COMPONENT ---
const EventCard = ({ event }: { event: EventData }) => {
  return (
    // Width is calculated to show exactly 4 items per view on large screens, accounting for the 16px (gap-4) gap.
    // On medium screens it shows 2 per view, and 1 per view on mobile.
    <div className="relative flex flex-col shrink-0 w-full md:w-[calc(50%-8px)] lg:w-[calc(25%-12px)] h-[320px] rounded-[20px] border border-white/20 bg-[#102942] overflow-hidden snap-start transition-transform hover:scale-[1.02]">
      {/* Background Image */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-bottom bg-no-repeat z-0"
        style={{ backgroundImage: `url(${event.skylineImage})` }}
      />

      {/* Top Section: Date & Title */}
      <div className="relative z-10 flex items-start gap-4 p-6 pointer-events-none">
        <div className="flex flex-col text-[#F4F4F5] font-light tracking-wide">
          <span className="text-xl leading-tight">{event.dateDays}</span>
          <span className="text-sm leading-tight mt-1">{event.dateMonths}</span>
        </div>

        <div className="w-[1px] h-10 bg-white/20 mt-1"></div>

        <div className="flex flex-col main-color font-semibold tracking-wide">
          <span className="text-lg leading-tight">{event.eventName}</span>
          <span className="text-lg leading-tight">{event.eventLocation}</span>
        </div>
      </div>

      {/* Bottom Footer */}
      <a
        href={event.link}
        className="absolute bottom-0 left-0 w-full p-6 flex justify-between items-center text-white/90 z-10 hover:text-white transition-colors"
      >
        <span className="text-sm font-medium tracking-wide">Event Info</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
          />
        </svg>
      </a>
    </div>
  )
}

// --- MAIN CAROUSEL COMPONENT ---
export default function EventCarousel() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  // Scroll function for arrows
  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      // Scroll by the exact width of the visible container
      const { clientWidth } = scrollContainerRef.current
      const scrollAmount = direction === "left" ? -clientWidth : clientWidth

      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      })
    }
  }

  return (
    <section className="bg-black py-12 md:py-20 px-4 md:px-8 lg:px-16">
      <div className="text-center mb-12">
        <h3 className={`main-color text-xs md:text-sm   uppercase mb-4`}>
          Events
        </h3>
        <h2 className="text-white text-3xl md:text-4xl font-medium tracking-wide">
          Which FOST city is on your calendar?
        </h2>
      </div>

      <div className="w-full bg-black py-12 flex justify-center overflow-hidden">
        <div className="relative w-full max-w-[1280px] px-12">
          {" "}
          {/* Increased padding to make room for arrows */}
          {/* Left Arrow */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-10 h-10 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors backdrop-blur-sm"
            aria-label="Scroll left"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </button>
          {/* Scroll Container */}
          <div
            ref={scrollContainerRef}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-4"
          >
            {apiData.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
          {/* Right Arrow */}
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-10 h-10 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors backdrop-blur-sm"
            aria-label="Scroll right"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}
