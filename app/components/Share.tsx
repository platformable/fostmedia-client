"use client"
import { useMemo, useState } from "react"
import { FaLinkedinIn, FaBluesky } from "react-icons/fa6"
import { FiShare2, FiCopy, FiMail, FiCheck } from "react-icons/fi"

interface ShareProps {
  url?: string
  title?: string
  section: "blog" | "industry"
}

type SectionBadgeProps = {
  icon: string
  label: string
}

export const sectionBadge = ({ icon, label }: SectionBadgeProps) => (
  <div className="flex w-fit items-center gap-3  bg-[#FC6200] px-5 py-2 rounded-full">
    <div>
      <img src={icon} alt="big-stories-icon" width="18" />
    </div>
    <span className="text-sm uppercase text-white tracking-wider">{label}</span>
  </div>
)

export default function ShareWidget({
  url = window!.location!.href!,
  title = document.title,
  section,
}: ShareProps) {
  const [copied, setCopied] = useState(false)

  const shareToLinkedIn = () => {
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      url,
    )}`

    window.open(linkedInUrl, "_blank", "noopener,noreferrer")
  }
  const shareToBluesky = () => {
    const text = `${title} ${url}`

    window.open(
      `https://bsky.app/intent/compose?text=${encodeURIComponent(text)}`,
      "_blank",
      "noopener,noreferrer",
    )
  }

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)

      setTimeout(() => {
        setCopied(false)
      }, 2000)
    } catch (error) {
      console.error("Could not copy URL", error)
    }
  }

  const shareByEmail = () => {
    if (typeof window !== "undefined") {
      window.location.href! = `mailto:?subject=${encodedTitle}&body=${encodeURIComponent(
        `${title}\n\n${url}`,
      )}`
    }
  }

  const currentUrl = useMemo(() => {
    if (url) return url

    if (typeof window !== "undefined") {
      return window.location.href
    }

    return ""
  }, [url])

  const currentTitle = useMemo(() => {
    if (title) return title

    if (typeof document !== "undefined") {
      return document.title
    }

    return ""
  }, [title])

  const encodedUrl = encodeURIComponent(currentUrl)
  const encodedTitle = encodeURIComponent(currentTitle)

  return (
    <div className="share my-10">
      <div className={`share__heading main-color-${section} `}>
        {sectionBadge({ icon: "/share-icon.svg", label: "SHARE THIS ARTICLE" })}
      </div>

      <div className="share__buttons">
        <button
          type="button"
          className="share__button"
          onClick={shareToLinkedIn}
          aria-label="Share on LinkedIn"
        >
          <FaLinkedinIn />
        </button>

        <button
          type="button"
          className="share__button"
          onClick={shareToBluesky}
          aria-label="Share on Bluesky"
        >
          <FaBluesky />
        </button>

        <button
          type="button"
          className="share__button"
          onClick={copyLink}
          aria-label={copied ? "Link copied" : "Copy link"}
        >
          {copied ? <FiCheck /> : <FiCopy />}
        </button>

        <button
          type="button"
          className="share__button"
          onClick={shareByEmail}
          aria-label="Share by email"
        >
          <FiMail />
        </button>
      </div>
    </div>
  )
}
