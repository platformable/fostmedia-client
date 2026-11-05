import React from "react"
import { getPages } from "@/utils/getPages"

export default async function page() {
  const data = await getPages("privacy-policy")

  return (
    <section className="">
      <div className="mx-auto max-w-screen-xl py-10">
        <div
          dangerouslySetInnerHTML={{ __html: data.Content }}
          id="post-content"
          className="mt-10 article"
        />
      </div>
    </section>
  )
}
