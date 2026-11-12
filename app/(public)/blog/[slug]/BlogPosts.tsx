"use client"

import React, { useEffect, useMemo, useRef } from "react"
import BackToBlogBtn from "@/app/components/BackToBlogBtn"
import BackToBlogFooter from "@/app/components/BackToBlogFooter"
import LatestArticles from "@/app/components/LatestArticlesX"
import Tag from "@/app/components/Tag"
import { getPostsBySlug, getRelatedPosts } from "@/utils/getPosts"
import { useQuery } from "@tanstack/react-query"
import Image from "next/image"
import Link from "next/link"
import calculateReadTime from "@/utils/calculateReadTime"
import ShareWidget from "@/app/components/Share"
import SponsorCarousel from "@/app/components/LogoCarousel"

import { addHeadingIds } from "@/lib/toc"
import TableOfContents from "@/app/components/TableOfContents"
import Loader from "@/app/components/Loader"
import NewsletterBanner from "@/app/components/NewsletterBanner"
import LatestArticlesHorizontalCard from "@/app/components/LatestArticlesHorizontalCard"

interface Props {
  params: Promise<{
    slug: string
  }>
}

export type SectionBadgeProps = {
  icon: string
  label: string
}

export const sectionBadge = ({ icon, label }: SectionBadgeProps) => (
  <div className="flex w-fit items-center gap-3 mb-4 default-tag-bg ">
    <div>
      <img src={icon} alt="big-stories-icon" width="18" />
    </div>
    <span className="text-sm uppercase text-white tracking-wider">{label}</span>
  </div>
)

export default function BlogPosts({ params }: Props) {
  const { slug } = React.use(params)

  const relatedPostsQuery = useQuery({
    queryKey: ["relatedPosts"],
    queryFn: getRelatedPosts,
    staleTime: 0,
    gcTime: 0,
    refetchOnMount: "always",
  })

  const relatedPosts = relatedPostsQuery.data?.posts || []

  const articleRef = useRef<HTMLDivElement>(null)

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

  const { html, toc } = useMemo(
    () => addHeadingIds(postsBySlug?.[0]?.Content || ""),
    [postsBySlug],
  )

  useEffect(() => {
    if (!html || !window.location.hash) return
    const id = decodeURIComponent(window.location.hash.slice(1))
    document.getElementById(id)?.scrollIntoView()
  }, [html])

  useEffect(() => {
    if (!articleRef.current) return

    const paragraphs =
      articleRef.current.querySelectorAll<HTMLParagraphElement>("p")

    for (const pElement of paragraphs) {
      const text = pElement.textContent

      if (text && text.trim() !== "") {
        pElement.classList.add("firstP")
        break
      }
    }
  }, [html])

  if (isPending) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    )
  }

  if (isError || !postsBySlug) {
    return <div className="text-white">Failed to load posts.</div>
  }

  if (postsBySlug.length === 0) {
    return <div className="text-white">No posts found.</div>
  }

  const post = postsBySlug[0]

  return (
    <section id="blog-post">
      <div className="mx-auto max-w-screen-xl px-4 pt-0 ">
        <div className="grid grid-cols-1 md:grid-cols-[8fr_4fr] gap-8  ">
          <section className="mt-5" id="blog-post-content">
            <div>
              <Tag text={post?.categories?.[0]?.Title || ""} section="blog" />
              <h1 className="text-black text-base leading-tight my-5 font-bold">
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
                      {post?.authors?.Role || ""}{" "}
                      {"-" +
                        " " +
                        (post?.authors?.Company ||
                          "FUTURE OF SOFTWARE TECHNOLOGIES")}
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

            <div className="relative h-64 w-full overflow-hidden  mt-10 mb-3">
              <div className="flex justify-center">
                <img
                  src={
                    post?.Featured_Image?.url ||
                    `https://dummyimage.com/1920x1080/000/fff&text=FOST`
                  }
                  alt={slug}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
            <div
              ref={articleRef}
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
              <div>
                <div className=" flex flex-col gap-5">
                  <div className="">
                    <Link href="/webinars">
                      <img
                        src="/banners/webinar1.png"
                        alt="Webinar Background"
                        className=""
                      />
                    </Link>
                  </div>
                  <div className="">
                    <Link
                      href="https://www.home.apimasters.io/learn/learning-plans/4/leveraging-apis-strategically-by-marjukka-niinioja"
                      target="_blank"
                    >
                      <img
                        src="/banners/apimasters-ad.png"
                        alt="APIMaster Background"
                        className=""
                      />
                    </Link>
                  </div>
                  <div className="">
                    <Link href="/pulse">
                      <img
                        src="/banners/pulse.png"
                        alt="FOST Pulse Background"
                        className=""
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      <div className="bg-[#FFF4EE]">
        <div className="mx-auto max-w-screen-xl ">
          <div className="pt-10">
            {sectionBadge({
              icon: "/related-icon.svg",
              label: "Related Articles",
            })}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-5 pb-10 bg-[#FFF4EE] ">
            {relatedPosts?.map((post: any) => (
              <LatestArticlesHorizontalCard
                key={post?.id}
                article={{
                  Title: post?.Title || "",
                  Excerpt: post?.Excerpt || "",
                  Featured_Image: { url: post?.Featured_Image?.url || "" },
                  Slug: post?.Slug || "",
                  categories: post?.categories || [{ Title: "category" }],
                }}
              />
            ))}
          </div>
        </div>
      </div>
      <div>
        <NewsletterBanner />
      </div>
    </section>
  )
}
