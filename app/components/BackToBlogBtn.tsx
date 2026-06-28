import Link from "next/link"
import React from "react"

export default function BackToBlogBtn() {
  return (
    <div className="mb-10 mt-5">
      <Link href="/blog" className="main-color">
        ← Back to Blog
      </Link>
    </div>
  )
}
