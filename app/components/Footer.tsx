import Link from "next/link"
import React from "react"

export default function Footer() {
  return (
    <footer className="text-white border-t border-[#747271]  bg-[#111525]">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <Link
              href="/"
              className="flex items-center"
              /*   target="_blank" */
              rel="noopener noreferrer"
            >
              <img
                src="/logo_fost.svg"
                className="h-7 border-r border-[#FC6200] pr-3 mr-3"
                alt="Digital Swag Marketplace Logo"
              />
              <span className="main-color mr-1">Digital Swag </span> Marketplace
            </Link>
            <p className="mt-4 text-sm text-white w-3/4">
              Get a weekly roundup of FOST articles,talks, and events in your
              inbox.
            </p>

            <div className="flex flex-col md:flex-row items-center gap-4">
              <input
                type="email"
                placeholder="EMAIL ADDRESS"
                className="w-full  p-3 rounded-md bg-[#0E1224] text-white border border-[#F36017] focus:outline-none focus:ring-2 focus:ring-[#695BE0]"
              />
              <button className="subscribe-btn text-white px-6 py-3 hover:bg-[#5a4fcf] rounded-md transition-colors inline-flex items-center justify-center px-7 py-3  font-semibold transition-opacity hover:opacity-90 uppercase cursor-pointer ">
                Subscribe
              </button>
            </div>
            <span className="text-xs text-[#BCC4D0] text-center flex justify-center mt-4 block">
              FOST does not sell your information or share it with unaffiliated
              third parties.
            </span>
          </div>
          <div className="grid grid-cols-4 gap-8 sm:gap-6 sm:grid-cols-4 footer-links">
            <div>
              <span className="mb-6 text-sm font-semibold text-heading uppercase main-color">
                FOR READERS
              </span>
              <ul className="text-body font-medium mt-5">
                <Link
                  href="/blog"
                  className="mb-6 text-sm font-semibold text-heading "
                >
                  Blog
                </Link>
                <li className="mb-4 mt-4">
                  <Link href="/industry" className="">
                    Industry Trends
                  </Link>
                </li>
                <li className="mb-4 mt-4">
                  <Link href="/tech-pulse" className="">
                    Tech Pulse
                  </Link>
                </li>
                <li className="mb-4 mt-4">
                  <Link
                    href="https://digitalswag.joinfost.io/"
                    className=""
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Digital Swag
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <span className="mb-6 text-sm font-semibold text-heading uppercase main-color">
                FOR PARTNERS
              </span>
              <ul className="text-body font-medium mt-5">
                <Link
                  href="https://docs.google.com/presentation/d/1uDo8zgdkozcezAHq_CLHIjulrm9GMHddgt38RXj82h4/edit?slide=id.g329b9af018a_1_0#slide=id.g329b9af018a_1_0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mb-6 text-sm font-semibold text-heading "
                >
                  Become a Sponsor
                </Link>
                <li className="mb-4 mt-4">
                  <Link
                    href="https://apidays.typeform.com/speak?typeform-source=joinfost.io"
                    className=""
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Speak at FOST
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <span className="mb-6 text-sm font-semibold text-heading uppercase main-color">
                Legal & Privacy
              </span>
              <ul className="text-body font-medium mt-5">
                <Link
                  href="/terms-conditions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mb-6 text-sm font-semibold text-heading "
                >
                  Terms & Conditions
                </Link>
                <li className="mb-4 mt-4">
                  <Link
                    href="/privacy-policy"
                    className=""
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li className="mb-4 mt-4">
                  <Link
                    href="/cookie-setting"
                    className=""
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Cookie Setting
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <span className="mb-6 text-sm font-semibold text-heading uppercase main-color">
                FOST
              </span>

              <ul className="text-body font-medium mt-5">
                <Link
                  href="https://joinfost.io"
                  className="mb-6 text-sm font-semibold text-heading "
                  target="_blank"
                >
                  Join FOST
                </Link>
                <li className="mb-4 mt-4">
                  <Link
                    href="https://joinfost.io/events"
                    className=""
                    target="_blank"
                  >
                    Events
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://docs.google.com/presentation/d/1uDo8zgdkozcezAHq_CLHIjulrm9GMHddgt38RXj82h4/edit?slide=id.g329b9af018a_1_0#slide=id.g329b9af018a_1_0"
                    target="_blank"
                    className=""
                  >
                    Become a sponsor
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="py-5 text-center border-t border-[#747271] mt-10">
        <span className="text-sm text-center">
          © {new Date().getFullYear()}{" "}
          {/*  <a href="https://joinfost.io/" className="hover:underline">
              FOST
            </a> */}
          FOST - Future of Software Technologies Conference. All rights
          reserved.
        </span>
      </div>
    </footer>
  )
}
