"use client"
import Link from "next/link"
import React, { useMemo, useState } from "react"
import Tag from "./Tag"

import { FontSize, fontSizeMap } from "../fontTypes"

import getPosts, { getIndustries } from "@/utils/getPosts"
import { getCategories } from "@/utils/getCategories"
import {
  useInfiniteQuery,
  useQuery,
  keepPreviousData,
} from "@tanstack/react-query"
import calculateReadTime from "@/utils/calculateReadTime"
import { sectionBadge } from "./TheBigStories"
import Loader from "./Loader"

import categories from "@/utils/categories"
import CategoryDescriptionData from "./CategoryDescription"

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
export const CategoryTag = ({
  category,
  active = false,
  onClick,
}: {
  category: string
  active?: boolean
  onClick?: () => void
}) => (
  <button
    type="button"
    onClick={onClick}
    aria-pressed={active}
    className={`category-tag text-[13px] px-5 py-1 rounded-full cursor-pointer transition-colors ${
      active ? "bg-[#FE8540] text-white" : "bg-[#FFE9DC]"
    }`}
  >
    {category || "category"}
  </button>
)

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
  // Single selection: null means "All"
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const selected = useMemo(
    () => (selectedCategory ? [selectedCategory] : []),
    [selectedCategory],
  )

  const {
    data,
    isPending,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: [
      section === "industry" ? "industryPosts" : "posts",
      page,
      limit,
      selected,
    ],
    queryFn: ({ pageParam }) =>
      section === "industry"
        ? getIndustries(limit, pageParam as number, selected)
        : getPosts(page, limit, pageParam as number, selected),
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
    data?.pages.flatMap((pageData) => (pageData as PostsPage).posts) ?? []

  const {
    data: categoryData,
    isError: isCategoryError,
    isPending: isCategoryPending,
  } = useQuery({
    queryKey: ["categoryDescription", selectedCategory],
    queryFn: async () =>
      (await getCategories(selectedCategory as string))[0] ?? null,
    enabled: !!selectedCategory,
  })

  return (
    <section className="">
      {section !== "industry" && (
        <div className="py-5 px-4 md:px-0 bg-white">
          <div className="mx-auto max-w-screen-xl">
            <p className="text-[12px] mb-2">EXPLORE CATEGORIES</p>
            <div className="inline-block mr-2 mb-2">
              <CategoryTag
                category="All"
                active={selectedCategory === null}
                onClick={() => setSelectedCategory(null)}
              />
            </div>
            {categories.map((category) => (
              <div key={category.title} className="inline-block mr-2 mb-2">
                <CategoryTag
                  category={category.title}
                  active={selectedCategory === category.title}
                  onClick={() => setSelectedCategory(category.title)}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {section !== "industry" && selectedCategory && (
        <section className="categories-bg py-10">
          {isCategoryPending ? (
            <p className="mx-auto max-w-screen-xl">
              Loading category description...
            </p>
          ) : isCategoryError ? (
            <p className="mx-auto max-w-screen-xl">
              Failed to load category description.
            </p>
          ) : categoryData ? (
            <CategoryDescriptionData
              categoryDescription={categoryData}
              sponsor="FOST"
            />
          ) : (
            <p className="mx-auto max-w-screen-xl">
              Category description not found.
            </p>
          )}
        </section>
      )}
      <div className="bg-blog-page">
        <div className=" mx-auto  max-w-screen-xl ">
          <section className=" py-5 px-4 md:px-0 ">
            <div className="max-w-screen-xl mx-auto">
              {/* Section Header */}
              {sectionBadge({
                icon: "/latest-articles-icon.svg",
                label: "Latest Articles",
              })}

              {isPending ? (
                <div className="flex justify-center my-10">
                  <Loader />
                </div>
              ) : isError ? (
                <div>Failed to load posts.</div>
              ) : posts.length === 0 ? (
                <div>No posts found.</div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                  {/* your existing posts.map(...) */}
                </div>
              )}

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
                          alt={post?.Title || post?.title}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        />
                      </div>

                      {/* Card Content */}
                      <div className="p-6 lg:p-8 flex flex-col flex-grow">
                        {/* Category Pill */}
                        <div className="flex flex-wrap gap-2">
                          {post?.categories?.map(
                            (
                              category: { ID: string; Title: string },
                              index: number,
                            ) => (
                              <Tag
                                key={category?.ID || index}
                                text={category?.Title || ""}
                                section="industry"
                              />
                            ),
                          )}
                        </div>

                        {/* Title */}
                        <h3 className=" font-bold leading-tight mb-4 text-gray-900 ">
                          {post?.Title || post?.title}
                        </h3>

                        {/* Description */}
                        <p className="text-gray-600 mb-4 text-[14px] leading-5">
                          {post?.Excerpt?.substring(0, 120) + "..." || ""}
                        </p>

                        {/* Footer / Meta */}
                        <div className="mt-auto flex items-center text-gray-500 text-xs font-medium">
                          <span>{post?.authors?.Name} </span>
                          <span> &nbsp;{post?.authors?.Lastname}</span>
                          <span className="mx-1.5 font-bold">·</span>
                          <span>{calculateReadTime(post?.Excerpt)}</span>
                        </div>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          </section>
          {hasNextPage && (page === "blog" || section === "industry") && (
            <div className="flex justify-center pb-10">
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
      </div>
    </section>
  )
}
