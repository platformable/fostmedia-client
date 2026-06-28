"use client"
import Link from "next/link"
import React from "react"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)

  return (
    <nav className="bg-[#111525]   z-20 top-0 start-0 border-b border-[#393939]">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto py-4 gap-3 md:gap-0">
        <Link
          href="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img
            src="/logo_fost.svg"
            className="h-7 border-r border-[#FC6200] pr-3"
            alt="Media Platform Logo"
          />
          <span className="self-center text-sm md:text-xl text-heading font-semibold whitespace-nowrap text-white">
            <span className="main-color text-sm md:text-xl">Media</span>{" "}
            Platform
          </span>
        </Link>
        <div className="flex items-center md:order-2 space-x-2 rtl:space-x-reverse">
          <Link
            href="https://docs.google.com/presentation/d/1uDo8zgdkozcezAHq_CLHIjulrm9GMHddgt38RXj82h4/edit?slide=id.g329b9af018a_1_0#slide=id.g329b9af018a_1_0"
            target="_blank"
            className="hidden sm:inline-flex text-white bg-[#111525] hover:ring-3 ring-[#fc60004d] focus:ring-3 focus:ring-[#fc60004d]  font-medium leading-5 rounded-lg text-md px-5 py-2 focus:outline-none hover:shadow-md cursor-pointer border border-[#F65B06]"
          >
            Sponsor
          </Link>
          <Link
            href="https://docs.google.com/presentation/d/1uDo8zgdkozcezAHq_CLHIjulrm9GMHddgt38RXj82h4/edit?slide=id.g329b9af018a_1_0#slide=id.g329b9af018a_1_0"
            target="_blank"
            className="hidden sm:inline-flex text-white brand-bg hover:ring-3 ring-[#fc60004d] focus:ring-3 focus:ring-[#fc60004d]  font-medium leading-5 rounded-lg text-md px-5 py-2 focus:outline-none hover:shadow-md cursor-pointer"
          >
            Events
          </Link>
          <button
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-white rounded-lg md:hidden hover:bg-neutral-secondary-soft focus:outline-none focus:ring-2 focus:ring-neutral-tertiary"
            aria-controls="navbar-sticky"
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="2"
                d="M5 7h14M5 12h14M5 17h14"
              />
            </svg>
          </button>
        </div>
        <div
          className={`${isMenuOpen ? "block" : "hidden"} items-center justify-between w-full md:flex md:w-auto md:order-1`}
          id="navbar-sticky"
        >
          <ul className="flex flex-col py-4 px-7 md:p-0 mt-4 font-medium border border-default rounded-base bg-neutral-secondary-soft md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-neutral-primary">
            <li>
              <Link
                href="/blog"
                className="block py-2 px-3 text-heading  text-[#BABABA] rounded hover:bg-neutral-tertiary md:hover:bg-transparent md:border-0 md:hover:text-fg-brand md:p-0 md:dark:hover:bg-transparent"
              >
                Blog
              </Link>
            </li>
            <li>
              <Link
                href="/"
                /* target="_blank" */
                className="block py-2 px-3 text-heading text-[#BABABA]  rounded hover:bg-neutral-tertiary md:hover:bg-transparent md:border-0 md:hover:text-fg-brand md:p-0 md:dark:hover:bg-transparent"
              >
                Industry
              </Link>
            </li>
            <li>
              <Link
                href="https://joinfost.io"
                target="_blank"
                className="block py-2 px-3 text-heading text-[#BABABA] rounded hover:bg-neutral-tertiary md:hover:bg-transparent md:border-0 md:hover:text-fg-brand md:p-0 md:dark:hover:bg-transparent"
              >
                Tech Pulse
              </Link>
            </li>
            <li>
              <Link
                href="https://joinfost.io"
                target="_blank"
                className="block py-2 px-3 text-heading text-[#BABABA] rounded hover:bg-neutral-tertiary md:hover:bg-transparent md:border-0 md:hover:text-fg-brand md:p-0 md:dark:hover:bg-transparent"
              >
                Digital Swag
              </Link>
            </li>
            <li>
              <Link
                href="https://joinfost.io"
                target="_blank"
                className="block py-2 px-3 text-heading text-[#BABABA] rounded hover:bg-neutral-tertiary md:hover:bg-transparent md:border-0 md:hover:text-fg-brand md:p-0 md:dark:hover:bg-transparent"
              >
                Join Fost
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
