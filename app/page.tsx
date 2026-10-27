import Image from "next/image"
import MainPageFeaturedPost from "./components/MainPageFeaturedPost"
import Link from "next/link"
import LatestArticles from "./components/LatestArticles"
import IndustryTrends from "./components/IndustryTrends"
import createShareMetadata from "@/lib/metadata"
import LogoCarousel from "./components/LogoCarousel"
import TheBigStories from "./components/TheBigStories"
import Marquee from "./components/Marquee"

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query"
import NewsletterBanner from "./components/NewsletterBanner"
import getPosts, { getIndustryPosts } from "@/utils/getPosts"
//import MainPageFeaturedPost from "./components/MainPageFeaturedPost"
import Posts from "./components/Posts"
import { Metadata } from "next"
import EventCarousel from "./components/Blogcarousel"
import EventsCarousel from "./components/EventCarousel"
import NewsletterSection from "./components/NewsletterSection"
import VideoCarousel from "./components/VideoCarousel"

export async function generateMetadata(): Promise<Metadata> {
  return createShareMetadata({
    title: "FOST Media - Your Source for Industry Insights and Trends",
    description:
      "FOST Media is the leading source for conference intelligence and knowledge discovery. We provide insights, analysis, and commentary on the latest trends and developments in the conference industry.",
    url: "/",
    image: "/social.png",
  })
}

export default async function Home() {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ["posts"],
    queryFn: () => getPosts("home"),
  })

  await queryClient.prefetchQuery({
    queryKey: ["industryPosts"],
    queryFn: getIndustryPosts,
  })

  const metadata = createShareMetadata({
    title: "FOST Media - Your Source for Industry Insights and Trends",
    description:
      "FOST Media is the leading source for conference intelligence and knowledge discovery. We provide insights, analysis, and commentary on the latest trends and developments in the conference industry.",
    url: "https://joinfost.io",
    image: "/social.png",
  })

  return (
    <section>
      {" "}
      <HydrationBoundary state={dehydrate(queryClient)}>
        {/*  <MainPageFeaturedPost section="blog" page="home" /> */}
        <Marquee />
        <TheBigStories section="blog" page="home" limit={3} />

        <section>
          <div className="mx-auto  max-w-screen-xl  px-4 md:px-0 py-6 lg:py-4  gap-8  ">
            <LatestArticles section="blog" page="home" limit={8} />
          </div>
        </section>
        <section>
          <div className="bg-[#40D2FF]">
            <IndustryTrends />
          </div>
          <LogoCarousel section="blog" />
          <EventsCarousel />
          {/* <NewsletterSection /> */}
          <NewsletterBanner />
          {/*   <LogoCarousel section="blog" /> */}
          <VideoCarousel />
        </section>
      </HydrationBoundary>
    </section>
  )
}
