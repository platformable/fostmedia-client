import React from "react"
import type { Metadata } from "next"
import MainPageFeaturedPost from "../../components/MainPageFeaturedPost"
import LatestArticles from "../../components/LatestArticlesX"
import BackToBlogBtn from "../../components/BackToBlogBtn"
import LogoCarousel from "../../components/LogoCarousel"
import createShareMetadata from "@/lib/metadata"
import getPosts from "@/utils/getPosts"

import NewsletterBanner from "@/app/components/NewsletterBanner"

export const metadata: Metadata = createShareMetadata({
  title: "Blog",
  description:
    "Explore the latest articles, insights, and analysis on conference intelligence and industry trends from FOST Media.",
  url: "/blog",
})

export default function page() {
  return (
    <>
      <div className="">
        <LatestArticles section="blog" page="blog" limit={9} />
        <NewsletterBanner />
      </div>
    </>
  )
}
