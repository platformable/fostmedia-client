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
import FostLogoMarquee from "./components/FostLogoMarquee"
import NewsletterBanner from "./components/NewsletterBanner"
import getPosts, { getIndustryPosts } from "@/utils/getPosts"
//import MainPageFeaturedPost from "./components/MainPageFeaturedPost"
import Posts from "./components/Posts"
import { Metadata } from "next"
import EventCarousel from "./components/Blogcarousel"
import EventsCarousel from "./components/EventCarousel"
import NewsletterSection from "./components/NewsletterSection"
import VideoCarousel from "./components/VideoCarousel"
import Resources from "./components/Resources"

export async function generateMetadata(): Promise<Metadata> {
  return createShareMetadata({
    title: "FOSTBeat - Tracking the Future of Software",
    description:
      "FOSTBeat is a clear signal for digital business decision-makers who need to hear from a trusted source on what is happening in the software industry and how to prepare for the future.",
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
    title: "FOSTBeat - Tracking the Future of Software",
    description:
      "FOSTBeat is a clear signal for digital business decision-makers who need to hear from a trusted source on what is happening in the software industry and how to prepare for the future.",
    url: "https://joinfost.io",
    image: "/social.png",
  })

  return (
    <section className="bg-[#FEE0D0]">
      {" "}
      <HydrationBoundary state={dehydrate(queryClient)}>
        {/*  <MainPageFeaturedPost section="blog" page="home" /> */}
        <Marquee />
        <TheBigStories section="blog" page="home" limit={3} />
        <VideoCarousel />

        <div className="mx-auto  max-w-screen-xl  px-4 md:px-0 py-6 lg:py-4  gap-8  ">
          <LatestArticles section="blog" page="home" limit={9} />
        </div>

        {/*    <div className="bg-[#40D2FF]">
          <IndustryTrends />
        </div> */}

        <FostLogoMarquee title="Our Partners" />
        <EventsCarousel />
        <Resources />
        <NewsletterBanner />
      </HydrationBoundary>
    </section>
  )
}
