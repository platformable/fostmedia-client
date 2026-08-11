import React from "react"

type TagProps = {
  text: string
  section: "blog" | "industry" | null
}

export default function Tag({ text, section }: TagProps) {
  return (
    <span
      className={` uppercase bg-[#F5F5F5]/5 px-4 py-2 rounded-full self-start ${
        section === "blog" ? "main-color" : "text-[#40D2FF]"
      }`}
    >
      {text}
    </span>
  )
}
