import React from "react"
import type { Metadata } from "next"
import BackToBlogBtn from "../../components/BackToBlogBtn"
import createShareMetadata from "@/lib/metadata"

export const metadata: Metadata = createShareMetadata({
  title: "Creators",
  description: "Meet the contributing writers and analysts behind FOST Media.",
  url: "/creator",
})

export default function page() {
  return (
    <div>
      <BackToBlogBtn section="blog" />
    </div>
  )
}
