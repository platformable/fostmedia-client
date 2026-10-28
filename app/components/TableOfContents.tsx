// components/TableOfContents.tsx
"use client"

import { useEffect, useState } from "react"
import type { TocItem } from "@/lib/toc"

export type SectionBadgeProps = {
  icon: string
  label: string
}

export const sectionBadge = ({ icon, label }: SectionBadgeProps) => (
  <div className="flex w-fit items-center gap-3 mb-4 bg-[#FC6200] px-5 py-2 rounded-full ">
    <div>
      <img src={icon} alt="big-stories-icon" width="18" />
    </div>
    <span className="text-[12px] uppercase text-white tracking-wider">
      {label}
    </span>
  </div>
)

export default function TableOfContents({
  items,
  title,
}: {
  items: TocItem[]
  title: string
}) {
  const [activeId, setActiveId] = useState<string | null>(null)

  useEffect(() => {
    const headings = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => !!el)

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting)
        if (visible.length) setActiveId(visible[0].target.id)
      },
      { rootMargin: "-80px 0px -70% 0px" },
    )

    headings.forEach((h) => observer.observe(h))
    return () => observer.disconnect()
  }, [items])

  const handleClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault()
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" })
    history.replaceState(null, "", `#${id}`) // keeps the URL shareable
    setActiveId(id)
  }

  return (
    <nav aria-label="Table of contents" className="toc">
      {sectionBadge({
        icon: "/explore-article-icon.svg",
        label: "EXPLORE THIS ARTICLE",
      })}
      <ul>
        <li className={activeId === null ? "active" : ""}>
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: "smooth" })
            }}
          >
            {title}
          </a>
        </li>
        {items.map((item) => (
          <li
            key={item.id}
            className={activeId === item.id ? "active" : ""}
            style={{ paddingLeft: (item.level - 2) * 12 }}
          >
            <a href={`#${item.id}`} onClick={(e) => handleClick(e, item.id)}>
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
