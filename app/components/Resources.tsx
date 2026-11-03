"use client"

import Link from "next/link"
import { sectionBadge } from "./SectionBadge"
import Tag from "./Tag"
import ResourcesCard from "./ResourcesCard"

export default function Resources() {
  const posts = [
    {
      Slug: "api-economy-in-the-age-of-ai-2026",
      Featured_Image: { url: "/resources/resource1.png" },
      Title: "API Economy in the Age of AI 2026",
      Excerpt: "State of the Market Report",
      authors: { Name: "", Lastname: "" },
      categories: [{ Title: "REPORT" }],
    },
    {
      Slug: "the-ai-enabled-api-lifecycle-2026",
      Featured_Image: { url: "/resources/resource2.png" },
      Title: "The AI-enabled API lifecycle 2026",
      Excerpt: "Humans Steer · Rules Run · AI Assists",
      authors: { Name: "", Lastname: "" },
      categories: [{ Title: "WHITE PAPER" }],
    },
    {
      Slug: "harnessing-api-intelligence-2025",
      Featured_Image: { url: "/resources/resource3.png" },
      Title: "Harnessing API Intelligence 2025",
      Excerpt: "From observability to governance to cultivate a new mindset",
      authors: { Name: "", Lastname: "" },
      categories: [{ Title: "BEST PRACTICES REPORT" }],
    },
    {
      Slug: "the-4-pillars-of-api-security-2025",
      Featured_Image: { url: "/resources/resource4.png" },
      Title: "The 4 Pillars of API Security 2025",
      Excerpt: "Implementing a Strategy for API Security",
      authors: { Name: "", Lastname: "" },
      categories: [{ Title: "BEST PRACTICES REPORT" }],
    },
  ]
  return (
    <section className=" py-10 px-4 md:px-8 ">
      <div className="max-w-screen-xl mx-auto">
        {/* Section Header */}
        {sectionBadge({
          icon: "/resources-icon.svg",
          label: "Resources",
        })}

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 lg:gap-4 ">
          {posts?.map((post: any, index: number) => (
            <ResourcesCard key={index} post={post} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
