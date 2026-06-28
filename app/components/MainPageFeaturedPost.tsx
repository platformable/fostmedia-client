"use client"
import Link from "next/link"
import Image from "next/image"
import getPosts from "@/utils/getPosts"
import { useQuery } from "@tanstack/react-query"

type MainPageFeaturedPostProps = {
  title?: string
  description?: string
  href?: string
  ctaLabel?: string
  imageUrl?: string
}

export default function MainPageFeaturedPost({
  title = "FOST launches a New Era for Conference Intelligence and Knowledge Discovery",
  description = "",
  href = "/",
  ctaLabel = "Read story →",
  imageUrl = "https://dummyimage.com/600x400/000/fff",
}: MainPageFeaturedPostProps) {
  const {
    data: posts,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  })

  console.log(posts, "posts")
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
    <section className="mx-auto max-w-screen-xl py-12 md:py-16 ">
      <div
        className="rounded-3xl p-8 md:p-12"
        style={{
          background:
            "transparent linear-gradient(89deg, #161A29 80%, #FF863F 160%) 0% 0% no-repeat padding-box",
        }}
      >
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:items-center">
          {/* Left side - Image */}
          <div className="relative h-64 w-full overflow-hidden rounded-2xl md:h-80">
            <Image
              src={posts[0]?.Featured_Image?.url || imageUrl}
              alt={posts[0]?.Title || title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          {/* Right side - Content */}
          <div>
            <div
              className="mb-3 inline-block rounded-full px-4 py-1.5 text-sm  uppercase tracking-[0.18em]"
              style={{
                background: "#FFFFFF0D",
                color: "#FF863F",
              }}
            >
              {posts[0]?.categories[0]?.Title || "Innovation"}
            </div>

            <h2 className="mb-4 font-semibold leading-tight text-white md:text-4xl lg:text-3xl">
              {posts[0]?.Title || title}
            </h2>

            <p className="mb-4  text-[#F5F5F5]">
              {new Date(posts[0]?.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              }) ||
                new Date().toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
            </p>

            <Link
              href={`/blog/${posts[0]?.Slug || href}`}
              className="inline-flex items-center justify-center px-7 py-3  font-semibold text-white transition-opacity hover:opacity-90"
              style={{
                background:
                  "linear-gradient(90deg, #DD312A 0%, #F56515 100%) 0% 0% no-repeat padding-box",
                borderRadius: "28px",
              }}
            >
              {ctaLabel}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
