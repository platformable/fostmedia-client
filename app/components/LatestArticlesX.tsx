"use client"
import Link from "next/link"
import React from "react"
import Tag from "./Tag"

import { FontSize, fontSizeMap } from "../fontTypes"

import getPosts, { getIndustryPosts } from "@/utils/getPosts"
import { useInfiniteQuery } from "@tanstack/react-query"

type MainPageFeaturedPostProps = {
  title?: string
  description?: string
  href?: string
  ctaLabel?: string
  imageUrl?: string
  section: "blog" | "industry" | null
  page?: "blog" | "home"
  limit?: number
}

type PostsPage = {
  posts: unknown[]
  meta?: { pagination?: { page: number; pageCount: number } }
}

export default function LatestArticles({
  description = true,
  textSize = "MEDIUM",
  text = "",
  section = null,
  page = "",
  limit = 10,
}: {
  description?: boolean
  textSize?: FontSize
  text?: string
  section?: "blog" | "industry" | null
  page?: "blog" | "home" | ""
  limit?: number
}) {
  const {
    data,
    isPending,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: [section === "industry" ? "industryPosts" : "posts", page, limit],
    queryFn: ({ pageParam }) =>
      section === "industry"
        ? getIndustryPosts()
        : getPosts(page, limit, pageParam as number),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const pagination = (lastPage as PostsPage)?.meta?.pagination
      if (!pagination) return undefined
      return pagination.page < pagination.pageCount
        ? pagination.page + 1
        : undefined
    },
  })

  const posts =
    data?.pages.flatMap((pageData) =>
      section === "industry"
        ? (pageData as unknown[])
        : (pageData as PostsPage).posts,
    ) ?? []

  if (isPending) {
    return <div>Loading...</div>
  }
  if (isError || !data) {
    return <div className="text-white">Failed to load posts.</div>
  }
  if (posts.length === 0) {
    return <div className="text-white">No posts found.</div>
  }
  return (
    <div className="my-10">
      <div className="flex items-center gap-2">
        <img src="/file.svg" width={20} height={20} alt="File Icon" />
        <h6
          className={`uppercase ${section === "industry" ? "text-[#40D2FF]" : "main-color"}`}
        >
          {text || "Latest Articles"}
        </h6>
      </div>
      {posts.map((post: any, index: number) => {
        if (index === 0) return null
        return (
          <div
            key={post?.id ?? index}
            className="bg-[#161A29] border border-[#30323B] p-4 rounded-xl mt-4 flex flex-col gap-2"
          >
            <Tag text={post?.categories[0]?.Title || ""} section={section} />
            <div className="grid md:grid-cols-[1fr_3fr] gap-4">
              <img
                src={post?.Featured_Image?.url || "/placeholder.png"}
                alt={post?.Title || "Post Image"}
                className=" h-auto rounded-md"
              />
              <div>
                <h4 className={`${fontSizeMap[textSize]}  text-white`}>
                  {post?.Title ||
                    post?.title ||
                    "APIs as the backbone of modern AI systems"}
                </h4>
                {description && (
                  <p className="text-[#BCC4D0]">
                    {post?.Excerpt.substring(0, 100) + "..." ||
                      "A short overview of how APIs enable AI models to access, share, and process data across platforms. It explains why APIs are essential for scaling AI applications."}
                  </p>
                )}
                <Link
                  href={`/${section}/${post?.Slug || "#"}`}
                  className={`py-2 flex items-center  rounded-md mt-2 ${
                    section === "industry" ? "text-[#40D2FF]" : "main-color"
                  }`}
                >
                  Read story →
                </Link>
              </div>
            </div>
          </div>
        )
      })}
      {hasNextPage && page === "blog" && (
        <button
          type="button"
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
          className={`mt-4 flex items-center justify-center rounded-md border border-[#30323B] px-5 py-2 font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50 ${
            section === "industry" ? "text-[#40D2FF]" : "main-color"
          }`}
        >
          {isFetchingNextPage ? "Loading..." : "More posts"}
        </button>
      )}
    </div>
  )
}
