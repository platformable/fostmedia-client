import React from "react"
import Link from "next/link"
import Tag from "./Tag"

type Post = {
  Slug: string
  Featured_Image: { url: string }
  Title: string
  Excerpt: string
  authors: { Name: string; Lastname: string }
  categories: { Title: string }[]
}

export default function ResourcesCard({
  post,
  index,
}: {
  post: Post
  index: number
}) {
  return (
    <article
      key={index}
      className="flex flex-col bg-white  overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow duration-300 cursor-pointer"
    >
      <Link href={`/blog/${post?.Slug}`} className="flex h-full flex-col">
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
          <Tag text={post?.categories[0]?.Title || "category"} section="blog" />

          {/* Title */}
          <h4 className=" font-bold leading-tight mb-4 text-gray-900 ">
            {post.Title}
          </h4>

          {/* Description */}
          <p className="text-gray-600 mb-4 text-[14px] leading-5">
            {post.Excerpt.substring(0, 120) + "..."}
          </p>

          {/* Footer / Meta */}
          <div className="mt-auto flex items-center text-gray-500 text-xs font-medium">
            <span>{post.authors?.Name} </span>
            <span> &nbsp;{post.authors?.Lastname}</span>
            <span className="mx-1.5 font-bold">·</span>
          </div>
        </div>
      </Link>
    </article>
  )
}
