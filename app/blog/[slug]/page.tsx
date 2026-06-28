"use client"
import React, { useEffect } from "react"
import BackToBlogBtn from "@/app/components/BackToBlogBtn"
import BackToBlogFooter from "@/app/components/BackToBlogFooter"
import LatestArticles from "@/app/components/LatestArticles"
import Tag from "@/app/components/Tag"
import getPosts, { getPostsBySlug } from "@/utils/getPosts"
import { useQuery } from "@tanstack/react-query"
import Image from "next/image"
import Link from "next/link"
import calculateReadTime from "@/utils/calculateReadTime"
import ShareModal from "@/app/components/ShareModal"

export default function page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = React.use(params)
  const {
    data: posts,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["postsBySlug", slug],
    queryFn: () => getPostsBySlug(slug),
  })

  /*   console.log(posts, "posts") */
  if (isPending) {
    return <div>Loading...</div>
  }
  if (isError || !posts) {
    return <div className="text-white">Failed to load posts.</div>
  }
  if (posts.length === 0) {
    return <div className="text-white">No posts found.</div>
  }

  return (
    <div className="mx-auto max-w-screen-xl px-4 pt-10">
      <Tag text={posts[0]?.categories?.[0]?.Title || ""} />
      <h1 className="text-white text-base leading-10 my-5">
        {posts[0]?.Title ||
          "FOST launches a New Era for Conference Intelligence and Knowledge Discovery"}
      </h1>
      <p className=" text-[#BCBCBC]">
        Mark Boyd - {calculateReadTime(posts[0]?.Content)}
      </p>
      <div className="relative h-64 w-full overflow-hidden rounded-2xl md:h-80 mt-10 mb-3">
        <Image
          src={
            posts[0]?.Featured_Image?.url ||
            "https://dummyimage.com/1920x1080/fff"
          }
          alt={slug}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      <section className="grid grid-cols-1 md:grid-cols-[8fr_4fr] gap-8 mt-5 ">
        <div className="text-[#D6DAE0] border-r border-[#30323B] px-4">
          <BackToBlogBtn />

          <div
            dangerouslySetInnerHTML={{ __html: posts[0]?.Content || "" }}
            id="post-content"
          />

          <BackToBlogFooter />
        </div>
        <aside>
          <div className="flex items-center gap-2">
            {/* <img src="/file.svg" width={20} height={20} alt="File Icon" />
            <h6 className="main-color uppercase">On this page</h6> */}
            <ShareModal />
          </div>
          <LatestArticles description={false} textSize={"LARGE"} />
        </aside>
      </section>
    </div>
  )
}
