// lib/toc.ts
import GithubSlugger from "github-slugger"

export type TocItem = { id: string; text: string; level: number }

export function addHeadingIds(html: string): { html: string; toc: TocItem[] } {
  if (!html || typeof window === "undefined") return { html, toc: [] }

  const doc = new DOMParser().parseFromString(html, "text/html")
  const slugger = new GithubSlugger()
  const toc: TocItem[] = []

  doc.body.querySelectorAll("h2, h3").forEach((el) => {
    const text = el.textContent?.trim() || ""
    if (!text) return
    const id = el.id || slugger.slug(text)
    el.id = id
    toc.push({ id, text, level: el.tagName === "H2" ? 2 : 3 })
  })

  return { html: doc.body.innerHTML, toc }
}
