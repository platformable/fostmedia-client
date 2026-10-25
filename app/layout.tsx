import type { Metadata } from "next"
import LayoutShell from "./components/LayoutShell"
import Providers from "./providers"
import Script from "next/script"
import "./globals.css"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://joinfost.io"
const DEFAULT_DESCRIPTION =
  "FOST Media is the leading source for conference intelligence and knowledge discovery. We provide insights, analysis, and commentary on the latest trends and developments in the conference industry."

// Site-wide fallback metadata. Any route without its own `generateMetadata`/
// `metadata` export inherits this, so every shared page always shows a
// social media card (Open Graph + Twitter Card) instead of none.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "FOST Media - Your Source for Industry Insights and Trends",
    template: "%s | FOST Media",
  },
  description: DEFAULT_DESCRIPTION,
  openGraph: {
    title: "FOST Media - Your Source for Industry Insights and Trends",
    description: DEFAULT_DESCRIPTION,
    url: SITE_URL,
    siteName: "FOST Media",
    type: "website",
    images: [
      {
        url: "/social.png",
        width: 1200,
        height: 627,
        alt: "FOST Media",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FOST Media - Your Source for Industry Insights and Trends",
    description: DEFAULT_DESCRIPTION,
    images: ["/social.png"],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={``}>
      <body className="min-h-screen flex flex-col ">
        <Providers>
          <LayoutShell>{children}</LayoutShell>
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
