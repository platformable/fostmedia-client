import Link from "next/link"
import React from "react"
import FooterSubscribeForm from "./FooterSubscribeForm"

export default function Footer() {
  return (
    <footer className="text-white border-t border-[#747271]  bg-[#111525]">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <Link
              href="/"
              className="flex items-center mb-2"
              /*   target="_blank" */
              rel="noopener noreferrer"
            >
              <img
                src="/fostBeatLogo.svg"
                className="h-7 border-r border-[#FC6200] pr-3 mr-3"
                alt="FOSTBeat Logo"
              />
              <span className="main-color">FOST</span>Beat
            </Link>
            <p className="mt-4 text-sm text-white w-3/4">
              Get a weekly roundup of FOST articles,talks, and events in your
              inbox.
            </p>

            <FooterSubscribeForm />
            <span className="text-xs text-[#BCC4D0]   mt-4 block">
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
                  <Link
                    href="/industry"
                    className="text-sm font-semibold text-heading"
                  >
                    Industry Trends
                  </Link>
                </li>
                <li className="mb-4 mt-4">
                  <Link href="/pulse" className="">
                    Pulse
                  </Link>
                </li>
                <li className="mb-4 mt-4">
                  <Link
                    href="https://digitalswag.joinfost.io/"
                    className="text-sm font-semibold text-heading"
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
                  href="https://datasetstorage.ams3.cdn.digitaloceanspaces.com/fost-media/FOST%20Sponsorship%202027.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mb-6 text-sm font-semibold text-heading "
                >
                  Become a Sponsor
                </Link>
                <li className="mb-4 mt-4">
                  <Link
                    href="https://apidays.typeform.com/speak?typeform-source=joinfost.io"
                    className="text-sm font-semibold text-heading"
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
                  href="/code-of-conduct"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mb-6 text-sm font-semibold text-heading "
                >
                  Code of conduct
                </Link>
                <li className="mb-4 mt-4">
                  <Link
                    href="/privacy-policy"
                    className="text-sm font-semibold text-heading"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Privacy Policy
                  </Link>
                </li>
                {/*      <li className="mb-4 mt-4">
                  <Link
                    href="/cookie-setting"
                    className=""
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Cookie Setting
                  </Link>
                </li> */}
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
                    className="text-sm font-semibold text-heading"
                    target="_blank"
                  >
                    Events
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://datasetstorage.ams3.cdn.digitaloceanspaces.com/fost-media/FOST%20Sponsorship%202027.pdf"
                    target="_blank"
                    className="text-sm font-semibold text-heading"
                  >
                    Become a sponsor
                  </Link>
                </li>
                <li className="mb-4 mt-4">
                  <Link
                    href="mailto:contact@joinfost.io"
                    target="_blank"
                    className="text-sm font-semibold text-heading"
                  >
                    Contact Us
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
