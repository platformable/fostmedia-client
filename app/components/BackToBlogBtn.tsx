import Link from "next/link"
import React from "react"

type ButtonProps = {
  section: "blog" | "industry" | null
}

export default function BackToBlogBtn({ section }: ButtonProps) {
  return (
    <div className="mb-10 mt-5">
      <Link
        href={`/${section || "blog"}`}
        className={`${section === "industry" ? "text-[#40D2FF]" : "main-color"}`}
      >
        ← Back to Blog
      </Link>
    </div>
  )
}
