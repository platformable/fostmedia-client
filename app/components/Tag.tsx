import React from "react"

type TagProps = {
  text: string
  section: "blog" | "industry" | null | "blog-page"
}

export default function Tag({ text, section }: TagProps) {
  return (
    <span
      className={` uppercase bg-[#DCF1ED] px-4 py-2 rounded-full self-start ${
        section === "blog" ? "main-color" : "text-[#156D61]"
      }`}
    >
      {text}
    </span>
  )
}
