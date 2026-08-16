"use client"
import Link from "next/link"
import React from "react"
import Tag from "./Tag"
import getPosts, { getIndustryPosts } from "@/utils/getPosts"
import { useQuery } from "@tanstack/react-query"

export default function IndustryTrends() {
  const {
    data: industryPosts,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["industryPosts"],
    queryFn: getIndustryPosts,
  })

  return (
    <div className="">
      <div className="flex items-center gap-2">
        <img src="/file.svg" width={20} height={20} alt="File Icon" />
        <h6 className="text-[#40D2FF] uppercase">Industry Trends</h6>
      </div>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
        <div className="bg-[#161A29] border border-[#30323B] p-4 rounded-xl mt-4 flex flex-col gap-2">
          <Tag
            text={industryPosts?.[0]?.categories[0].Title}
            section="industry"
          />
          <h4 className="text-white">{industryPosts?.[0]?.title}</h4>
          <p className="text-[#BCC4D0]">{industryPosts?.[0]?.Excerpt}</p>
          <Link
            href={`/industry/${industryPosts?.[0]?.Slug}`}
            className=" py-2 flex items-center text-[#40D2FF] rounded-md mt-2"
          >
            Read story →
          </Link>
        </div>
      </div>
    </div>
  )
}
