"use client"
import React from "react"
import type { CategoryDescription } from "@/utils/getCategories"
import Link from "next/link"
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
      <div className="grid md:grid-cols-3 grid-cols-1 gap-4 ">
        {categoryDescription?.Ads?.[0]?.LinkURL && (
          <div className="apidays-card rounded-lg p-4 shadow-md">
            <div className="flex items-center gap-2 mb-2">
              <img src="/community.svg" alt="" />
              <p className="text-white">IN-PERSON AT FOST</p>
            </div>

            <div className="flex items-center gap-2 justify-between">
              {categoryDescription?.Ads?.[0]?.Image?.url && (
                <img
                  src={categoryDescription?.Ads?.[0]?.Image?.url}
                  alt={categoryDescription?.Title || ""}
                  className="w-2/4"
                />
              )}
              <Link
                href={categoryDescription?.Ads?.[0]?.LinkURL || "#"}
                target="_blank"
                className="text-white bg-[#FC6200] px-4 py-2 rounded-full text-[10px]"
              >
                EXPLORE ALL EVENTS →
              </Link>
            </div>
          </div>
        )}

        {categoryDescription?.Ads?.[1]?.LinkURL && (
          <div className="bg-white rounded-lg p-4 shadow-md">
            <div className="flex items-center gap-2 mb-2">
              {/*    <img src="/community.svg" alt="" /> */}
              <p className="main-color">SECTION SPONSORED BY</p>
            </div>

            <div className="flex items-center gap-2 justify-between">
              {categoryDescription?.Ads?.[1]?.Image?.url && (
                <img
                  src={categoryDescription?.Ads?.[1]?.Image?.url}
                  alt={categoryDescription?.Title || ""}
                  className="w-2/4"
                />
              )}
              <Link
                href={categoryDescription?.Ads?.[1]?.LinkURL || "#"}
                target="_blank"
                className="text-white bg-[#FC6200] px-4 py-2 rounded-full text-[10px]"
              >
                Visit {categoryDescription?.Ads?.[1]?.Title || "EXPLORE"} →
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
