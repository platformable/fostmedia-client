import React from "react"

type TagProps = {
  text: string
  type: "blog" | "industry" | null
}

export default function Tag({ text, type }: TagProps) {
  return (
    <span
      className={` uppercase bg-[#F5F5F5]/5 px-4 py-2 rounded-full self-start ${
        type === "blog" ? "main-color" : "text-[#40D2FF]"
      }`}
    >
      {text}
    </span>
  )
}
