import React from "react"
import categories from "@/utils/categories"

type TagProps = {
  text: string
  section: "blog" | "industry" | null | "blog-page"
}

export default function Tag({ text, section }: TagProps) {
  const category = categories.find((c) => c.title === text)

  return (
    <span
      className={` uppercase  px-4 py-2 rounded-full self-start text-[10px] mb-2 ${category?.bgColor ? `bg-[${category?.bgColor}]` : "bg-orange-300"} ${category?.textColor ? `text-[${category?.textColor}]` : "text-black"}`}
      style={{
        backgroundColor: category?.bgColor || undefined,
        color: category?.textColor || undefined,
      }}
    >
      {text}
    </span>
  )
}
