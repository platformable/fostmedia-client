"use client"
import Link from "next/link"
import React from "react"
import Tag from "./Tag"
import getPosts, { getIndustryPosts } from "@/utils/getPosts"
import { useQuery } from "@tanstack/react-query"

type SectionBadgeProps = {
  icon: string
  label: string
}

type Badge = {
  icon: string
  label: string
  name: string
}

const badges: Badge[] = [
  {
    name: "The_Big_Stories",
    icon: "/big-stories-icon.svg",
    label: "The Big Stories",
  },
  {
    name: "Latest_Articles",
    icon: "/big-stories-icon.svg",
    label: "Latest Articles",
  },
]

export const sectionBadge = ({ icon, label }: SectionBadgeProps) => (
  <div className="flex w-fit items-center gap-3  default-tag-bg ">
    <div>
      <img src={icon} alt="big-stories-icon" width="18" />
    </div>
    <span className="text-sm uppercase text-white tracking-wider">{label}</span>
  </div>
)

export default function IndustryTrends() {
  const {
    data: industryPosts,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["industryPosts"],
    queryFn: getIndustryPosts,
  })

  const posts = industryPosts

  return (
    <div className=" mx-auto  max-w-screen-xl p-4 py-10 lg:py-10 ">
      <div className="flex justify-between items-center mb-8 ">
        {sectionBadge({
          icon: "/industry-trends-icon.svg",
          label: "Industry Trends",
        })}

        <Link
          href="/blog"
          className="flex items-center gap-2 text-[#111525] font-bold md:ml-20 ml-0 text-sm uppercase transition-colors justify-end"
        >
          SEE ALL ARTICLES →
        </Link>
      </div>

      <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
        {posts?.map((article: any, index: number) => {
          return (
            <article
              key={index}
              className="flex flex-col md:flex-row md:h-[220px] bg-white rounded-2xl shadow-[0_2px_15px_rgba(0,0,0,0.03)] hover:shadow-lg transition-shadow duration-300 overflow-hidden cursor-pointer shadow-md"
            >
              {/* Article Image */}

              <div className="relative w-full md:w-[35%] h-[200px] md:h-full overflow-hidden bg-gray-100 flex-shrink-0">
                <Link
                  href={`/industry/${article.Slug}`}
                  className="absolute inset-0 z-10"
                >
                  <img
                    src={
                      article?.Featured_Image?.url
                        ? article.Featured_Image.url
                        : "/social.png"
                    }
                    alt={article.Title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </Link>
              </div>

              {/* Article Content */}
              <div className="w-full md:w-[65%] p-6 md:p-8 flex flex-col justify-center">
                <Tag text="Industry Trend" section="industry" />
                <Link href={`/industry/${article.Slug}`}>
                  <h3 className="text-xl md:text-[22px] font-bold text-gray-900 mb-3 tracking-tight ">
                    {article.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
                    {article.Excerpt.substring(0, 120)}
                  </p>
                </Link>
              </div>
            </article>
          )
        })}
      </div>
    </div>
  )
}
