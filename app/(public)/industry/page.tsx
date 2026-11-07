import React from "react"
import type { Metadata } from "next"
import LatestArticles from "../../components/LatestArticlesX"
import createShareMetadata from "@/lib/metadata"

export const metadata: Metadata = createShareMetadata({
  title: "Industry",
  description:
    "Discover industry trends, reports, and analysis curated by FOST Media.",
  url: "/industry",
})

export default function page() {
  return (
    <>
      <div className="">
        <LatestArticles section="industry" page="blog" limit={9} />
      </div>
    </>
  )
}
