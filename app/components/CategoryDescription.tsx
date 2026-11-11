"use client"
import React from "react"
import type { CategoryDescription } from "@/utils/getCategories"
export default function CategoryDescriptionData({
  categoryDescription,
  sponsor,
}: {
  categoryDescription: CategoryDescription
  sponsor?: string
}) {
  return (
    <div className="mx-auto max-w-screen-xl">
      <h1 className="text-2xl font-bold mb-4 text-[#FC6200]">
        {categoryDescription ? categoryDescription?.Title?.toUpperCase() : "AI"}
      </h1>
      {categoryDescription?.Heading && (
        <h3 className="text-lg font-bold">{categoryDescription?.Heading}</h3>
      )}
      {categoryDescription?.Description && (
        <h4 className="mb-4">{categoryDescription?.Description}</h4>
      )}
      {/*   {sponsor && <div>Sponsored by: {sponsor}</div>} */}
    </div>
  )
}
