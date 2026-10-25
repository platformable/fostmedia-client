import React from "react"
import type { Metadata } from "next"
import MainPageFeaturedPost from "../../components/MainPageFeaturedPost"
import LatestArticles from "../../components/LatestArticles"
import BackToBlogBtn from "../../components/BackToBlogBtn"
import LogoCarousel from "../../components/LogoCarousel"
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
      <div className="mx-auto  max-w-screen-xl ">
        <MainPageFeaturedPost section="industry" />
        <LatestArticles section="industry" />
        <BackToBlogBtn section="industry" />
      </div>
      <LogoCarousel section="industry" />
    </>
  )
}
