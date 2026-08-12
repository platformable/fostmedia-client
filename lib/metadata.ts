import type { Metadata } from "next"

interface ShareMetadataProps {
  title: string
  description?: string
  image?: string
  url?: string
}

// const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL!;
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://joinfost.io"

export default function ShareMetadata({
  title,
  description = "",
  image = "/social.png",
  url = "",
}: ShareMetadataProps): Metadata {
  const fullUrl = new URL(url, SITE_URL).toString()
  const fullImageUrl = new URL(image, SITE_URL).toString()

  return {
    title,
    description,

    openGraph: {
      title,
      description,
      url: fullUrl,
      type: "website",
      images: [
        {
          url: fullImageUrl,
          width: 1200,
          height: 627,
          alt: title,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [fullImageUrl],
    },
  }
}
