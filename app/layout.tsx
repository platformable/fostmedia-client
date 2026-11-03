import type { Metadata } from "next"
import LayoutShell from "./components/LayoutShell"
import Providers from "./providers"
import Script from "next/script"
import "./globals.css"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://beat.joinfost.io"
const DEFAULT_DESCRIPTION =
  "FOSTBeat is a clear signal for digital business decision-makers who need to hear from a trusted source on what is happening in the software industry and how to prepare for the future."

// Site-wide fallback metadata. Any route without its own `generateMetadata`/
// `metadata` export inherits this, so every shared page always shows a
// social media card (Open Graph + Twitter Card) instead of none.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "FOSTBeat - Tracking the Future of Software",
    template: "%s | FOST Media",
  },
  description: DEFAULT_DESCRIPTION,
  openGraph: {
    title: "FOSTBeat - Tracking the Future of Software",
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
    title: "FOSTBeat - Tracking the Future of Software",
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
        {/* Matomo */}
        <Script id="matomo">
          {`
            var _paq = window._paq = window._paq || [];
            /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
            _paq.push(['trackPageView']);
            _paq.push(['enableLinkTracking']);
            (function() {
              var u="https://joinfost.matomo.cloud/";
              _paq.push(['setTrackerUrl', u+'matomo.php']);
              _paq.push(['setSiteId', '1']);
              var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
              g.async=true; g.src='https://cdn.matomo.cloud/joinfost.matomo.cloud/matomo.js'; s.parentNode.insertBefore(g,s);
            })();
  `}
        </Script>
      </body>
    </html>
  )
}
