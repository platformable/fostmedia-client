"use client"
import Link from "next/link"
import React from "react"
import Tag from "./Tag"

import { FontSize, fontSizeMap } from "../fontTypes"

import getPosts from "@/utils/getPosts"
import { useQuery } from "@tanstack/react-query"

type MainPageFeaturedPostProps = {
  title?: string
  description?: string
  href?: string
  ctaLabel?: string
  imageUrl?: string
  section: "blog" | "industry" | null
}

export default function LatestArticles({
  description = true,
  textSize = "MEDIUM",
  text = "",
  section = null,
}: {
  description?: boolean
  textSize?: FontSize
  text?: string
  section?: "blog" | "industry" | null
}) {
  const {
    data: posts,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
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
    <div className="">
      <div className="flex items-center gap-2">
        <img src="/file.svg" width={20} height={20} alt="File Icon" />
        <h6
          className={`uppercase ${section === "industry" ? "text-[#40D2FF]" : "main-color"}`}
        >
          {text || "Latest Articles"}
        </h6>
      </div>
      <div className="bg-[#161A29] border border-[#30323B] p-4 rounded-xl mt-4 flex flex-col gap-2">
        <Tag text={posts[0]?.categories[0]?.Title || ""} section={section} />
        <h4 className={`${fontSizeMap[textSize]}  text-white`}>
          {posts[0]?.Title || "APIs as the backbone of modern AI systems"}
        </h4>
        {description && (
          <p className="text-[#BCC4D0]">
            {posts[0]?.Description ||
              "A short overview of how APIs enable AI models to access, share, and process data across platforms. It explains why APIs are essential for scaling AI applications."}
          </p>
        )}
        <Link
          href={`/${section}/${posts[0]?.Slug || "#"}`}
          className={`py-2 flex items-center  rounded-md mt-2 ${
            section === "industry" ? "text-[#40D2FF]" : "main-color"
          }`}
        >
          Read story →
        </Link>
      </div>
    </div>
  )
}
