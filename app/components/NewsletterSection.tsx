import React from "react"

export default function NewsletterSection() {
  return (
    <section className="bg-[#161A29] py-12 md:py-20 px-4 md:px-8 lg:px-16">
      <div className="text-center mb-12">
        <h3 className={`main-color text-xs md:text-sm   uppercase mb-4`}>
          FOST WEEKLY NEWSLETTER
        </h3>
        <h2 className="text-white text-3xl md:text-4xl font-medium tracking-wide">
          Get a weekly roundup of FOST articles,talks, and events in your inbox.
        </h2>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-center gap-4">
        <input
          type="email"
          placeholder="EMAIL ADDRESS"
          className="w-full md:w-1/3 p-3 rounded-md bg-[#0E1224] text-white border border-[#F36017] focus:outline-none focus:ring-2 focus:ring-[#695BE0]"
        />
        <button className="subscribe-btn text-white px-6 py-3 hover:bg-[#5a4fcf] rounded-md transition-colors inline-flex items-center justify-center px-7 py-3  font-semibold transition-opacity hover:opacity-90 uppercase ">
          Subscribe
        </button>
      </div>
      <span className="text-xs text-[#BCC4D0] text-center flex justify-center mt-4 block">
        FOST does not sell your information or share it with unaffiliated third
        parties.
      </span>
    </section>
  )
}
