import React from "react"

type TagProps = {
  text: string
}

export default function Tag({ text }: TagProps) {
  return (
    <span className="main-color uppercase bg-[#F5F5F5]/5 px-4 py-2 rounded-full self-start">
      {text}
    </span>
  )
}
