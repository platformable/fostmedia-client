import type { Metadata } from "next"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Providers from "./providers"
import Script from "next/script"
import "./globals.css"

export const metadata: Metadata = {
  title: "FOST Media Platform",
  description:
    "FOST Media is a platform for sharing and discovering tech-related content.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={``}>
      <body className="min-h-screen flex flex-col">
        <Providers>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
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
