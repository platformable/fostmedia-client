import React from "react"
import ShareWidget from "@/app/components/Share"
import LatestArticles from "@/app/components/LatestArticles"

const AuthorProfile = async ({ params }: { params: { creator: string } }) => {
  const { creator } = await params

  return (
    <section>
      <div className="bg-[#141721] border border-[#282d3c] rounded-2xl p-6 md:p-8 flex flex-col md:flex-row gap-6 md:gap-8 mx-auto max-w-screen-xl font-sans my-10">
        {/* Author Image */}
        <div className="flex-shrink-0">
          <img
            src="/avatar.jpg" // Replace with the actual image source
            alt={creator}
            className="w-48 h-48 md:w-84 md:h-84 object-cover rounded-2xl"
          />
        </div>

        {/* Author Details */}
        <div className="flex-1 flex flex-col">
          {/* Header: Name, Title, and Social Icons */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
            <div>
              <h1 className="text-white text-3xl font-bold tracking-tight">
                {creator || "Mark Boyd"}
              </h1>
              <p className="text-[#f97316] text-sm font-medium mt-1.5">
                Contributing Writer · Platformable director
              </p>
            </div>

            {/* Share Widget Integration */}
            <div className="flex-shrink-0 pt-1">
              <ShareWidget section="blog" />
            </div>
          </div>

          {/* Bio Text */}
          <div className="mt-6 text-[#94a3b8] text-sm md:text-base leading-relaxed">
            <p>
              Mark Boyd is a writer and API industry analyst, who contributes
              regularly to a number of key industry journals. He has chaired
              several API conferences and published a number of ebooks on the
              API lifecycle, best practices for API adoption, and API uptake in
              industry verticals. As founder of the API-focused startup,
              Platformable, he regularly conducts industry research, supports
              API providers to grow into platform businesses, and manages
              data-driven projects that draw on open data and proprietary
              sources. With a public health and urban planning background, Mark
              is especially interested in how APIs can help local governments
              transform into a city-as-a-platform model and how to leverage APIs
              to reduce unequal access to the resources needed for healthy
              living and community participation.
            </p>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-screen-xl px-4 pt-5 my-10">
        <LatestArticles section="blog" />
      </div>
    </section>
  )
}

export default AuthorProfile
