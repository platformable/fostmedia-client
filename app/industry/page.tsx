import React from "react"
import MainPageFeaturedPost from "../components/MainPageFeaturedPost"
import LatestArticles from "../components/LatestArticles"
import BackToBlogBtn from "../components/BackToBlogBtn"
import LogoCarousel from "../components/LogoCarousel"
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
