"use client"

import React, { useEffect, useMemo } from "react"
import BackToBlogBtn from "@/app/components/BackToBlogBtn"
import BackToBlogFooter from "@/app/components/BackToBlogFooter"
import LatestArticles from "@/app/components/LatestArticlesX"
import Tag from "@/app/components/Tag"
import { getPostsBySlug, getIndustryBySlug } from "@/utils/getPosts"
import { useQuery } from "@tanstack/react-query"
import Image from "next/image"
import Link from "next/link"
import calculateReadTime from "@/utils/calculateReadTime"
import ShareWidget from "@/app/components/Share"
import SponsorCarousel from "@/app/components/LogoCarousel"

import { addHeadingIds } from "@/lib/toc"
import TableOfContents from "@/app/components/TableOfContents"
import Loader from "@/app/components/Loader"

interface Props {
  params: Promise<{
    slug: string
  }>
}

export default function IndustryPost({ params }: Props) {
  const { slug } = React.use(params)

  const {
    data: posts,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["IndustryBySlug", slug],
    queryFn: () => getIndustryBySlug(slug),
  })

  const { html, toc } = useMemo(
    () => addHeadingIds(posts?.[0]?.Content || ""),
    [posts],
  )

  useEffect(() => {
    if (!html || !window.location.hash) return
    const id = decodeURIComponent(window.location.hash.slice(1))
    document.getElementById(id)?.scrollIntoView()
  }, [html])

  if (isPending) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    )
  }

  if (isPending) {
    return <div>Loading...</div>
  }

  if (isError || !posts) {
    return <div className="text-white">Failed to load posts.</div>
  }

  if (posts.length === 0) {
    return <div className="text-white">No posts found.</div>
  }

  const post = posts[0]

  return (
    <section id="blog-post">
      <div className="mx-auto max-w-screen-xl px-4 pt-0 ">
        <div className="grid grid-cols-1 md:grid-cols-[8fr_4fr] gap-8  ">
          <section className="mt-5" id="blog-post-content">
            <div>
              <Tag text={post?.categories?.[0]?.Title || ""} section="blog" />
              <h1 className="text-black text-base leading-10 my-5 font-bold">
                {post?.Title || "FOST "}
              </h1>

              <div className="flex gap-x-2 items-center">
                <img
                  src={`${post?.authors?.Avatar?.url || "/avatar.jpg"}`}
                  alt=""
                  className="rounded-full border border-[#40D2FF] h-14 w-14"
                />
                <div className="flex justify-between w-full">
                  <div>
                    <span className=" text-[#000000] text-[23px] font-semibold">
                      {post?.authors?.Name || "Author"}{" "}
                    </span>
                    <span className=" text-[#000000] text-[23px] font-semibold">
                      {" "}
                      {post?.authors?.Lastname || "Author"}{" "}
                    </span>
                    <p className="text-[12px]">
                      FUTURE OF SOFTWARE TECHNOLOGIES
                    </p>
                  </div>
                  <div className="flex items-end justify-end gap-2 ">
                    <span className="text-[12px] uppercase">
                      {calculateReadTime(post?.Content || "")}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative h-64 w-full overflow-hidden rounded-2xl  mt-10 mb-3">
              <img
                src={
                  post?.Featured_Image?.url ||
                  `https://dummyimage.com/1920x1080/000/fff&text=FOST`
                }
                alt={slug}
              />
            </div>
            <div
              dangerouslySetInnerHTML={{ __html: html }}
              id="post-content"
              className="mt-10 article"
            />

            <ShareWidget section="blog" />
          </section>
          <section id="blog-post-sidebar" className="bg-[#0B182F] sticky top-0">
            <div className="sticky  p-8 sticky top-0">
              {toc.length > 1 && (
                <TableOfContents items={toc} title={post?.Title || ""} />
              )}

              <img
                src={`/banners/webinar1.png`}
                alt=""
                className="rounded-2xl w-full"
              />
              <img
                src={`/banners/apimaster.png`}
                alt=""
                className="rounded-2xl w-full"
              />
            </div>
          </section>
        </div>
      </div>
    </section>
  )
}
