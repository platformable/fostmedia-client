import React from "react"
import MainPageFeaturedPost from "../components/MainPageFeaturedPost"
import LatestArticles from "../components/LatestArticles"
import BackToBlogBtn from "../components/BackToBlogBtn"

export default function page() {
  return (
    <div className="mx-auto  max-w-screen-xl ">
      <MainPageFeaturedPost />
      <LatestArticles />
      <BackToBlogBtn />
    </div>
  )
}
