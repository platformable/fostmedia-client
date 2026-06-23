import Link from "next/link"
import React from "react"

export default function BackToBlogFooter() {
  return (
    <div className="mb-10 grid grid-cols-1 md:grid-cols-2 justify-between gap-4 flex items-center justify-center">
      <Link
        href="/"
        className="flex items-center space-x-3 rtl:space-x-reverse bg-[#161A29]  p-10 rounded-xl"
      >
        <img
          src="/logo_fost.svg"
          className="h-7 border-r border-[#FC6200] pr-3"
          alt="Media Platform Logo"
        />
        <span className="self-center text-sm md:text-xl text-heading font-semibold whitespace-nowrap text-white">
          <span className="main-color text-sm md:text-xl">Media</span> Platform
        </span>
      </Link>
      <Link href="" className="main-color flex justify-end">
        ← Back to Blog
      </Link>
    </div>
  )
}
