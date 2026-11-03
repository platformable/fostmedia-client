"use client"

import React, { useState, useEffect } from "react"

// Generamos un array de sponsors de prueba (15 para tener 3 grupos de 5)
const sponsors = Array.from({ length: 15 }, (_, i) => ({
  id: i + 1,
  name: `Sponsor ${i + 1}`,
}))

const sponsorsLogos = [
  {
    id: 1,
    logo: "/logos/broadcom-logo.png",
    name: "Broadcom",
  },
  {
    id: 2,
    logo: "/logos/google-logo.png",
    name: "Google",
  },
  {
    id: 3,
    logo: "/logos/gravitee-logo.svg",
    name: "Gravitee",
  },
  {
    id: 4,
    logo: "/logos/ibm-logo.png",
    name: "IBM",
  },
  {
    id: 5,
    logo: "/logos/postman-logo.png",
    name: "Postman",
  },
  {
    id: 6,
    logo: "/logos/solace-logo.png",
    name: "Solace",
  },
  {
    id: 7,
    logo: "/logos/treblle-logo.png",
    name: "Treblle",
  },
  {
    id: 8,
    logo: "/logos/mulesoft-logo.png",
    name: "Mulesoft",
  },
  {
    id: 9,
    logo: "/logos/radpi-logo.png",
    name: "Radpi",
  },
  {
    id: 10,
    logo: "/logos/solo-logo.png",
    name: "Solo",
  },
  {
    id: 11,
    logo: "/logos/traefik-logo.png",
    name: "Traefik",
  },
]

type SponsorCarouselProps = {
  section: "blog" | "industry" | null
}
export default function SponsorCarousel({ section }: SponsorCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const itemsPerPage = 10

  const maxIndex = Math.max(0, sponsors.length - itemsPerPage)

  const totalPages = Math.ceil(sponsors.length / itemsPerPage)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev + itemsPerPage > maxIndex) {
          return 0
        }

        return prev + itemsPerPage
      })
    }, 4000)

    return () => clearInterval(timer)
  }, [maxIndex, itemsPerPage])

  return (
    <div className="w-full  bg-[#0e1224] py-10 px-8 flex flex-col items-center justify-center ">
      {/* Encabezado */}
      <div className="text-center mb-12">
        <span
          className={`${section === "industry" ? "main-color-industry" : "buttonGradientOurSponsorsBg inline-block"} text-xs md:text-sm px-5 py-1  uppercase mb-4`}
        >
          Our Sponsors
        </span>
        <h2 className="text-white text-3xl md:text-4xl font-medium tracking-wide">
          Thanks to our sponsors who make FOST possible
        </h2>
      </div>

      <div className="relative w-full max-w-6xl overflow-hidden py-4">
        <div
          className="flex transition-transform duration-700 ease-in-out gap-4 md:gap-6"
          style={{
            transform: `translateX(calc(-${currentIndex * (100 / itemsPerPage)}% - ${
              (currentIndex * 20) / itemsPerPage // 24px es el gap (gap-6)
            }px))`,
          }}
        >
          {sponsorsLogos.map((sponsor) => (
            <div
              key={sponsor.id}
              className="w-[calc(50%-8px)] md:w-[calc(33.333%-16px)] lg:w-[calc(16.666%-19.2px)] flex-shrink-0   rounded-xl  flex flex-col items-center justify-center transition-transform hover:scale-105 "
            >
              <img
                src={sponsor.logo}
                alt={sponsor.name}
                className="w-3/4  object-contain"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center gap-3 mt-10">
        {Array.from({ length: totalPages }).map((_, idx) => {
          const pageIndex = idx * itemsPerPage
          const isActive =
            currentIndex === pageIndex ||
            (idx === totalPages - 1 && currentIndex === maxIndex)

          return (
            <button
              key={idx}
              onClick={() => setCurrentIndex(Math.min(pageIndex, maxIndex))}
              className={`rounded-full transition-all duration-500 ${
                isActive
                  ? "w-3 h-3 bg-white"
                  : "w-2.5 h-2.5 bg-white/20 hover:bg-white/50"
              }`}
              aria-label={`Go to sponsor group ${idx + 1}`}
            />
          )
        })}
      </div>

      <div className="mt-12">
        <a
          href="#sponsor-us"
          target="_blank"
          className={`${section === "industry" ? "main-color-industry" : "main-color-blog"} hover:text-[#fb8a5d] text-sm md:text-base transition-colors flex items-center gap-2 group pb-1  hover:border-[#fb8a5d]`}
        >
          Find out more about being a sponsor
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-4 h-4 transform transition-transform group-hover:translate-x-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
            />
          </svg>
        </a>
      </div>
    </div>
  )
}
