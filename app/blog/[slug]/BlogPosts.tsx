"use client"

import React from "react"
import BackToBlogBtn from "@/app/components/BackToBlogBtn"
import BackToBlogFooter from "@/app/components/BackToBlogFooter"
import LatestArticles from "@/app/components/LatestArticles"
import Tag from "@/app/components/Tag"
import { getPostsBySlug } from "@/utils/getPosts"
import { useQuery } from "@tanstack/react-query"
import Image from "next/image"
import Link from "next/link"
import calculateReadTime from "@/utils/calculateReadTime"
import ShareWidget from "@/app/components/Share"
import SponsorCarousel from "@/app/components/LogoCarousel"

interface Props {
  params: Promise<{
    slug: string
  }>
}

export default function BlogPosts({ params }: Props) {
  const { slug } = React.use(params)

  const {
    data: postsBySlug,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["postsBySlug", slug],
    queryFn: () => getPostsBySlug(slug),
    staleTime: 0,
    gcTime: 0,
    refetchOnMount: "always",
  })

  if (isPending) {
    return <div>Loading...</div>
  }

  if (isError || !postsBySlug) {
    return <div className="text-white">Failed to load posts.</div>
  }

  if (postsBySlug.length === 0) {
    return <div className="text-white">No posts found.</div>
  }

  const post = postsBySlug[0]

  console.log("POST", post)

  return (
    <section>
      <div className="mx-auto max-w-screen-xl px-4 pt-10 my-10">
        <div className="grid grid-cols-1 md:grid-cols-[8fr_4fr]">
          <div>
            <Tag text={post?.categories?.[0]?.Title || ""} section="blog" />
            <h1 className="text-white text-base leading-10 my-5">
              {post?.Title || "FOST "}
            </h1>
            <span className="text-[#BCBCBC] text-sm">
              {calculateReadTime(post?.Content || "")}
            </span>
          </div>
          <div className="flex items-center justify-end gap-2 ">
            <div className="flex gap-x-2 items-center">
              <img
                src="/avatar.jpg"
                alt=""
                className="w-10 h-10 rounded-full border border-[#40D2FF]"
              />
              <div className="">
                <span className=" text-[#BCBCBC]">
                  {post?.authors?.Name || "Author"}{" "}
                  {post?.authors?.Lastname || "Author"}{" "}
                </span>{" "}
                <br />
                <Link href="/creator/mark-boyd" className="main-color-blog">
                  View profile →
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="relative h-64 w-full overflow-hidden rounded-2xl md:h-80 mt-10 mb-3">
          <Image
            src={
              post?.Featured_Image?.url ||
              `https://dummyimage.com/1920x1080/000/fff&text=FOST`
            }
            alt={slug}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            loading="eager"
          />
        </div>

        <section className="grid grid-cols-1 md:grid-cols-[8fr_4fr] gap-8 mt-5 ">
          <div className="text-[#D6DAE0] border-r border-[#30323B] px-4">
            <BackToBlogBtn section="blog" />

            <div
              dangerouslySetInnerHTML={{ __html: post?.Content || "" }}
              id="post-content"
            />

            <BackToBlogFooter section="blog" />
          </div>
          <aside>
            <div className="flex items-center gap-2 mb-5">
              {/* <img src="/file.svg" width={20} height={20} alt="File Icon" />
            <h6 className="main-color uppercase">On this page</h6> */}
              {/*     <ShareModal /> */}
            </div>

            <ShareWidget section="blog" />

            <LatestArticles
              description={false}
              textSize={"LARGE"}
              text="More from this creator"
              section="blog"
            />
            {/* <ShareModal /> */}
          </aside>
        </section>
      </div>
      <section>
        <SponsorCarousel section="blog" />
      </section>
    </section>
  )
}
