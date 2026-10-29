"use client"
import Link from "next/link"
import React from "react"
import Tag from "./Tag"

import { FontSize, fontSizeMap } from "../fontTypes"

import getPosts, { getIndustryPosts } from "@/utils/getPosts"
import { useInfiniteQuery } from "@tanstack/react-query"
import calculateReadTime from "@/utils/calculateReadTime"
import { sectionBadge } from "./TheBigStories"
import Loader from "./Loader"

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
    return (
      <div className="flex justify-center my-10">
        <Loader />
      </div>
    )
  }
  if (isError || !data) {
    return <div className="text-white">Failed to load posts.</div>
  }
  if (posts.length === 0) {
    return <div className="text-white">No posts found.</div>
  }
  return (
    <div className="my-10">
      <section className=" py-5 px-4 md:px-0 ">
        <div className="max-w-screen-xl mx-auto">
          {/* Section Header */}
          {sectionBadge({
            icon: "/latest-articles-icon.svg",
            label: "Latest Articles",
          })}

          {/* Stories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 ">
            {posts?.map((post: any, index: number) => (
              <article
                key={index}
                className="flex flex-col bg-white rounded-2xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow duration-300 cursor-pointer"
              >
                <Link
                  href={`/${section}/${post?.Slug}`}
                  className="flex h-full flex-col"
                >
                  {/* Card Image */}
                  <div className="h-[220px] w-full overflow-hidden">
                    <img
                      src={
                        post?.Featured_Image?.url
                          ? post?.Featured_Image?.url
                          : "/social.png"
                      }
                      alt={post?.Title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>

                  {/* Card Content */}
                  <div className="p-6 lg:p-8 flex flex-col flex-grow">
                    {/* Category Pill */}
                    <Tag
                      text={post?.categories[0]?.Title || "category"}
                      section={section}
                    />

                    {/* Title */}
                    <h3 className=" font-bold leading-tight mb-4 text-gray-900 ">
                      {post.Title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 mb-4 text-[14px] leading-5">
                      {post.Excerpt.substring(0, 120) + "..."}
                    </p>

                    {/* Footer / Meta */}
                    <div className="mt-auto flex items-center text-gray-500 text-xs font-medium">
                      <span>{post.authors?.Name} </span>
                      <span> &nbsp;{post.authors?.Lastname}</span>
                      <span className="mx-1.5 font-bold">·</span>
                      <span>{calculateReadTime(post.Excerpt)}</span>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
      {hasNextPage && page === "blog" && (
        <div className="flex justify-center">
          <button
            type="button"
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className={`mt-4 flex items-center cursor-pointer justify-center rounded-md bg-[#FE8540] px-5 py-2 font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50 ${
              section === "industry" ? "text-[#40D2FF]" : "main-color"
            }`}
          >
            {isFetchingNextPage ? "Loading..." : "More posts"}
          </button>
        </div>
      )}
    </div>
  )
}
