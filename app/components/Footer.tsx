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
            <p className="mt-4 text-sm text-gray-400 w-3/4">
              Join us in the FOST for the premier API & Gen AI & Platform
              conference.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div></div>
            <div></div>
            {/*  <div>
              <h2 className="mb-6 text-sm font-semibold text-heading uppercase">
                Resources
              </h2>
              <ul className="text-body font-medium">
                <li className="mb-4">
                  <a href="https://joinfost.io/" className="hover:underline">
                    FOST Ecosystem
                  </a>
                </li>
                <li>
                  <a
                    href="https://platformable.io/"
                    className="hover:underline"
                  >
                    Platformable
                  </a>
                </li>
              </ul>
            </div> */}
            {/*   <div>
              <h2 className="mb-6 text-sm font-semibold text-heading uppercase">
                Follow us
              </h2>
              <ul className="text-body font-medium">
                <li className="mb-4">
                  <a
                    href="https://github.com/fost-io"
                    className="hover:underline "
                  >
                    Github
                  </a>
                </li>
                <li>
                  <a href="https://discord.gg/fost" className="hover:underline">
                    Discord
                  </a>
                </li>
              </ul>
            </div> */}
            <div>
              <Link
                href="https://joinfost.io"
                className="mb-6 text-sm font-semibold text-heading uppercase"
                target="_blank"
              >
                Join FOST
              </Link>
              <ul className="text-body font-medium">
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
