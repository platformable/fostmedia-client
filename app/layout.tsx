"use client"

import type { Metadata } from "next"
import { usePathname } from "next/navigation"
import Navbar from "./components/Navbar"
import WebinarsNavbar from "./components/Webinars/WebinarsNavbar"
import Footer from "./components/Footer"
import Providers from "./providers"
import Script from "next/script"
import "./globals.css"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathname = usePathname()
  const isWebinars = pathname.includes("webinars")

  return (
    <html lang="en" className={``}>
      <body className="min-h-screen flex flex-col ">
        <Providers>
          {!isWebinars ? <Navbar /> : <WebinarsNavbar />}
          <main className="flex-grow">{children}</main>
          {!isWebinars && <Footer />}
        </Providers>
        <Script
          src="https://analytics.platformable.com/track.js"
          data-site-id="fost-media-8ca21c6b"
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}
