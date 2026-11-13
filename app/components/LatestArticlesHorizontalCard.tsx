import React from "react"
import Link from "next/link"
import Tag from "@/app/components/Tag"

interface ArticleProps {
  Title: string
  Excerpt: string
  Featured_Image: { url: string }
  Slug: string
  categories: { Title: string }[]
}

const LatestArticlesHorizontalCard: React.FC<{ article: ArticleProps }> = ({
  article,
}) => {
  return (
    <article className=" flex flex-col md:flex-row md:h-[220px]  bg-white rounded-2xl dark:bg-(--dark-surface) dark:border dark:border-(--dark-border) dark:hover:border-white/20 shadow-[0_2px_15px_rgba(0,0,0,0.03)] hover:shadow-lg transition-shadow duration-300 overflow-hidden cursor-pointer shadow-lg">
      {/* Article Image */}

      <div className="relative w-full md:w-[35%] h-[200px] md:h-full overflow-hidden bg-gray-100 flex-shrink-0">
        <Link href={`/blog/${article.Slug}`} className="absolute inset-0 z-10">
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
}

export default LatestArticlesHorizontalCard
