"use client"
import React from "react"

export default function NewsletterBanner() {
  return (
    <div className=" flex items-center justify-center  md:p-10  bg-[#FFF4EE]">
      {/* Banner Container */}
      <div className="w-full max-w-screen-xl bg-gradient-to-r from-[#e33b26] via-[#f06129] to-[#f89036] rounded-[32px] shadow-[0_20px_40px_rgba(240,97,41,0.2)] px-6 py-8 md:py-10 flex flex-col items-center text-center">
        {/* Overline */}
        <span className="text-white/90 text-xs md:text-[11px] font-bold uppercase tracking-[0.2em] mb-4">
          FOST Newsletter
        </span>

        {/* Heading */}
        <h2 className="text-white text-3xl md:text-[36px] font-semibold mb-4 tracking-tight">
          A fresh perspective.
        </h2>

        {/* Subheading */}
        <h3 className="text-white/95 text-lg md:text-[20px] font-light mb-10 ">
          Get a weekly roundup of FOST articles,talks, and events in your inbox.
        </h3>

        {/* Form Container */}
        <form
          className="w-full max-w-[640px] flex flex-col sm:flex-row gap-3 md:gap-4 mb-8"
          onSubmit={(e) => e.preventDefault()}
        >
          {/* Email Input */}
          <input
            type="email"
            placeholder="EMAIL ADDRESS"
            required
            className="flex-1 bg-white rounded-xl px-6 py-4 text-[13px] font-semibold text-gray-800 placeholder:text-gray-700 tracking-wide focus:outline-none focus:ring-2 focus:ring-white/50 shadow-inner"
          />

          {/* Subscribe Button */}
          <button
            type="submit"
            className="bg-[#101423] text-white rounded-full px-10 py-4 text-[13px] font-bold uppercase tracking-[0.1em] hover:bg-black transition-colors duration-200 whitespace-nowrap"
          >
            Subscribe
          </button>
        </form>

        {/* Footer Text */}
        <p className="text-white/70 text-[13px] font-light">
          FOST does not sell your information or share it with unaffiliated
          third parties.
        </p>
      </div>
    </div>
  )
}
