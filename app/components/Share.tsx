"use client"
import { useState } from "react"
import { FaLinkedinIn, FaBluesky } from "react-icons/fa6"
import { FiShare2, FiCopy, FiMail, FiCheck } from "react-icons/fi"

interface ShareProps {
  url?: string
  title?: string
  section: "blog" | "industry"
}

export default function ShareWidget({
  url = window.location.href,
  title = document.title,
  section,
}: ShareProps) {
  const [copied, setCopied] = useState(false)

  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)

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
    window.location.href = `mailto:?subject=${encodedTitle}&body=${encodeURIComponent(
      `${title}\n\n${url}`,
    )}`
  }

  return (
    <div className="share">
      <div className={`share__heading main-color-${section}`}>
        <FiShare2 size={20} strokeWidth={2} />
        <span className={`main-color-${section}`}>SHARE</span>
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
