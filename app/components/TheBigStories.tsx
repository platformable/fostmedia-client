"use client"
import { useInfiniteQuery } from "@tanstack/react-query"
import { FontSize } from "../fontTypes"
import getPosts, { getIndustryPosts } from "@/utils/getPosts"
import calculateReadTime from "@/utils/calculateReadTime"
import Link from "next/link"

const stories = [
  {
    id: 1,
    category: "DIGITAL RESILIENCE",
    categoryTheme: "bg-emerald-50 text-emerald-600",
    title: "Data center moratorium tracker",
    description:
      "A new generation of tools is changing how we build and connect.",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=500&q=80",
    author: "FOST Editorial",
    readTime: "6 min read",
  },
  {
    id: 2,
    category: "AI AND APIS",
    categoryTheme: "bg-indigo-50 text-indigo-500",
    title: "Data center moratorium tracker",
    description:
      "A new generation of tools is changing how we build and connect.",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500&q=80",
    author: "FOST Editorial",
    readTime: "6 min read",
  },
  {
    id: 3,
    category: "DIGITAL RESILIENCE",
    categoryTheme: "bg-orange-100 text-orange-600",
    title: "Data center moratorium tracker",
    description:
      "A new generation of tools is changing how we build and connect.",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500&q=80",
    author: "FOST Editorial",
    readTime: "6 min read",
  },
]

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
  }
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
  <div className="flex w-fit items-center gap-3 mb-8 default-tag-bg ">
    <div>
      <img src={icon} alt="big-stories-icon" width="18" />
    </div>
    <span className="text-sm uppercase text-white tracking-wider">{label}</span>
  </div>
)

export default function TheBigStories({
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
    <section className=" py-5 px-4 md:px-8 ">
      <div className="max-w-screen-xl mx-auto">
        {/* Section Header */}
        {sectionBadge({
          icon: "/big-stories-icon.svg",
          label: "The Big Stories",
        })}

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 ">
          {posts?.map((post: any, index: number) => (
            <article
              key={index}
              className="flex flex-col bg-white rounded-2xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow duration-300 cursor-pointer"
            >
              <Link
                href={`/posts/${post?.Slug}`}
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
                  <div className="mb-4">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider `}
                    >
                      {post.categories[0]?.Title}
                    </span>
                  </div>

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
  )
}
