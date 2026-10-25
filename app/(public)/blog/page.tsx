import React from "react"
import type { Metadata } from "next"
import MainPageFeaturedPost from "../../components/MainPageFeaturedPost"
import LatestArticles from "../../components/LatestArticles"
import BackToBlogBtn from "../../components/BackToBlogBtn"
import LogoCarousel from "../../components/LogoCarousel"
import createShareMetadata from "@/lib/metadata"

export const metadata: Metadata = createShareMetadata({
  title: "Blog",
  description:
    "Explore the latest articles, insights, and analysis on conference intelligence and industry trends from FOST Media.",
  url: "/blog",
})

export default function page() {
  return (
    <>
      <div className="mx-auto  max-w-screen-xl ">
        <MainPageFeaturedPost section="blog" />
        <LatestArticles section="blog" page="blog" limit={10} />
        <BackToBlogBtn section="blog" />
      </div>
      <LogoCarousel section="blog" />
    </>
  )
}
