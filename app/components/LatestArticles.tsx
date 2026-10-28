"use client"
import { useInfiniteQuery } from "@tanstack/react-query"
import Link from "next/link"
import { FontSize } from "../fontTypes"
import getPosts, { getIndustryPosts } from "@/utils/getPosts"
import calculateReadTime from "@/utils/calculateReadTime"
import Tag from "./Tag"

type Post = {
  Title: string
  Excerpt: string
  Slug: string
  Featured_Image: {
    url: string
  }
  authors: string
  ReadTime: string
  categories: {
    Title: string
  }[]
}

type PostsPage = {
  posts: Post[]
  meta?: { pagination?: { page: number; pageCount: number } }
}

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

const articles = [
  {
    id: 1,
    title: "Data center moratorium tracker",
    excerpt:
      "A new generation of tools is changing how we build and connect. A new generation of tools is changing how we build and connect.",
    meta: "FOST Editorial · 6 min read",
    image:
      "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&q=80", // City skyline
  },
  {
    id: 2,
    title: "Data center moratorium tracker",
    excerpt:
      "A new generation of tools is changing how we build and connect. A new generation of tools is changing how we build and connect.",
    meta: "FOST Editorial · 6 min read",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=80", // Tech abstract / global connections
  },
  {
    id: 3,
    title: "Data center moratorium tracker",
    excerpt:
      "A new generation of tools is changing how we build and connect. A new generation of tools is changing how we build and connect.",
    meta: "FOST Editorial · 6 min read",
    image:
      "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600&q=80", // Abstract fiber optics
  },
]

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
        ? (pageData as Post[])
        : (pageData as PostsPage).posts,
    ) ?? []

  console.log("posts", posts)

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
    <section className=" py-5 px-4 md:px-0 ">
      <div className="max-w-screen-xl mx-auto">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8 ">
          {sectionBadge({
            icon: "/latest-articles-icon.svg",
            label: "Latest Articles",
          })}

          <Link
            href="/blog"
            className="flex items-center gap-2 text-[#FF5900] font-bold md:ml-20 ml-0 text-sm uppercase transition-colors"
          >
            SEE ALL ARTICLES
            <svg
              className="w-4 h-4 text-orange-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </Link>
          <div className=""></div>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-1">
          {/* Left Column: Articles Stack */}
          <div className=" flex flex-col gap-4">
            {posts.map((article, index) => {
              if (index <= 3) return null
              return (
                <article
                  key={index}
                  className="flex flex-col md:flex-row md:h-[220px] bg-white rounded-2xl shadow-[0_2px_15px_rgba(0,0,0,0.03)] hover:shadow-lg transition-shadow duration-300 overflow-hidden cursor-pointer shadow-md"
                >
                  {/* Article Image */}

                  <div className="relative w-full md:w-[35%] h-[200px] md:h-full overflow-hidden bg-gray-100 flex-shrink-0">
                    <Link
                      href={`/blog/${article.Slug}`}
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
                    <Tag
                      text={article?.categories[0]?.Title || "category"}
                      section="blog"
                    />
                    <Link href={`/blog/${article.Slug}`}>
                      <h3 className="text-xl md:text-[22px] font-bold text-gray-900 mb-3 tracking-tight line-clamp-2">
                        {article.Title}
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

          {/* Right Column: Promotional Banners */}
          <div className="">
            {/* Banner 1: FOST Pulse */}
            <div className="">
              {/* Subtle background swoosh effect */}
              <img
                src="/banners/pulse.png"
                alt="FOST Pulse Background"
                className=""
              />
            </div>

            {/* Banner 2: boomi */}
            <div className="">
              <img
                src="/banners/apimaster.png"
                alt="APIMaster Background"
                className=""
              />
            </div>
            {/* Banner 2: boomi */}
            <div className="">
              <img
                src="/banners/webinar1.png"
                alt="Webinar Background"
                className=""
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
