"use client"

import { useState, useEffect, useCallback } from "react"
import { usePathname } from "next/navigation"
import { FaLinkedin } from "react-icons/fa"
import { FaXTwitter } from "react-icons/fa6"
import { MdOutlineEmail } from "react-icons/md"
type Platform = "twitter" | "linkedin" | "email"

interface SharePlatform {
  id: Platform
  label: string
  color: string
  hoverColor: string
  icon: React.ReactNode
  getUrl: (url: string, title: string) => string
}

const CheckIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.5}
    className="w-5 h-5"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

const ShareIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    className="w-4 h-4"
  >
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
  </svg>
)

const XIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.258 5.632 5.906-5.632Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)

const EmailIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    className="w-10 h-10"
  >
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
)

const SlackIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z" />
  </svg>
)

const DiscordIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.043.032.054a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
  </svg>
)

const CopyIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    className="w-4 h-4"
  >
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
)

const CloseIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    className="w-5 h-5"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)

const PLATFORMS: SharePlatform[] = [
  {
    id: "email",
    label: "Email",
    color: "bg-slate-600",
    hoverColor: "hover:bg-slate-700",
    icon: <MdOutlineEmail />,
    getUrl: (url, title) =>
      `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    color: "bg-[#0A66C2]",
    hoverColor: "hover:bg-[#0858a8]",
    icon: <FaLinkedin />,
    getUrl: (url) =>
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
  },
  {
    id: "twitter",
    label: "X / Twitter",
    color: "bg-black",
    hoverColor: "hover:bg-zinc-800",
    icon: <FaXTwitter />,
    getUrl: (url, title) =>
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
  },
  /*   {
    id: "slack",
    label: "Slack",
    color: "bg-[#4A154B]",
    hoverColor: "hover:bg-[#3b1040]",
    icon: <SlackIcon />,
    getUrl: (url, title) =>
      `https://slack.com/intl/en-es/share?text=${encodeURIComponent(`${title} ${url}`)}`,
  },
  {
    id: "discord",
    label: "Discord",
    color: "bg-[#5865F2]",
    hoverColor: "hover:bg-[#4752c4]",
    icon: <DiscordIcon />,
    getUrl: (url, title) =>
      `https://discord.com/channels/@me?message=${encodeURIComponent(`${title} ${url}`)}`,
  }, */
]

interface ShareButtonProps {
  /** Override the URL to share. Defaults to window.location.href */
  //url?: string
  /** Override the page title. Defaults to document.title */
  title?: string
  /** Button label */
  label?: string
}

export default function ShareModal({
  title,
  label = "Share",
}: ShareButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const [shareUrl, setShareUrl] = useState("")
  const [shareTitle, setShareTitle] = useState(title ?? "")

  const pathname = usePathname()

  const pageUrl = process.env.NEXT_PUBLIC_SITE_URL + pathname
  console.log("Current page URL:", pageUrl)

  /*   useEffect(() => {
    if (!url) setShareUrl(pageUrl)
    if (!title) setShareTitle(document.title)
  }, [title]) */

  const handleOpen = () => setIsOpen(true)
  const handleClose = useCallback(() => setIsOpen(false), [])

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose()
    },
    [handleClose],
  )

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "hidden"
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = ""
    }
  }, [isOpen, handleKeyDown])

  const handleShare = (platform: SharePlatform) => {
    const shareLink = platform.getUrl(shareUrl, shareTitle)
    window.open(shareLink, "_blank", "noopener,noreferrer,width=600,height=500")
  }

  const handleCopy = async () => {
    console.log("Copying URL:", shareUrl)
    try {
      await navigator.clipboard.writeText(pageUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      const input = document.createElement("input")
      input.value = shareUrl
      document.body.appendChild(input)
      input.select()
      document.execCommand("copy")
      document.body.removeChild(input)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <>
      <button
        onClick={handleOpen}
        className="share-button justify-center items-center gap-2 rounded-3xl text-sm "
      >
        {label}
        <ShareIcon />
      </button>

      <div
        id="default-modal"
        aria-hidden={!isOpen}
        className={`${
          isOpen ? "flex" : "hidden"
        } overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-black/50 `}
      >
        <div className="relative p-4 w-full max-w-2xl max-h-full">
          <div className="relative bg-[#0B0F1C] border-2 border-default border-[#FC6200] rounded-base shadow-sm p-4 md:p-6  rounded-lg w-3/4">
            <div className="flex items-center justify-between cursor-pointer mb-4 ">
              <button
                onClick={handleClose}
                type="button"
                className="text-body cursor-pointer bg-transparent hover:bg-neutral-tertiary hover:text-heading rounded-base text-sm w-9 h-9 ms-auto inline-flex justify-center items-center text-white"
              >
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18 17.94 6M18 18 6.06 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <div>
              <img
                src={"/share_icon.svg"}
                alt="Share Icon"
                className="mx-auto mb-4 w-16 h-16"
              />
              <h3 className="text-lg font-medium text-heading text-center text-white">
                Share this article
              </h3>
            </div>
            <div className="px-5 py-4 grid grid-cols-3 gap-3">
              {PLATFORMS.map((platform) => (
                <button
                  key={platform.id}
                  onClick={() => handleShare(platform)}
                  title={platform.label}
                  className={`flex flex-col items-center gap-1.5 rounded-xl p-4 text-white transition-all duration-150 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 ${platform.color} ${platform.hoverColor} `}
                >
                  {platform.label === "Email" ? (
                    <span className="text-[50px]">
                      <MdOutlineEmail />
                    </span>
                  ) : null}
                  {platform.label === "LinkedIn" ? (
                    <span className="text-[50px]">
                      <FaLinkedin />
                    </span>
                  ) : null}
                  {platform.label === "X / Twitter" ? (
                    <span className="text-[50px]">
                      <FaXTwitter />
                    </span>
                  ) : null}
                </button>
              ))}
            </div>
            <div className="px-5 pb-5">
              <p className="mb-2 text-xs font-medium text-zinc-500 dark:text-zinc-400">
                Or copy the link
              </p>
              <div className="flex items-center gap-2 rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-800">
                <span className="flex-1 truncate text-xs text-zinc-600 dark:text-zinc-300 select-all">
                  {pageUrl || "No URL to share"}
                </span>
                <button
                  onClick={handleCopy}
                  className={`flex-shrink-0 cursor-pointer flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-all duration-150 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-500 ${
                    copied
                      ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400"
                      : "bg-zinc-200 text-zinc-700 hover:bg-zinc-300 dark:bg-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-600"
                  }`}
                >
                  {copied ? (
                    <>
                      <CheckIcon />
                      Copied!
                    </>
                  ) : (
                    <>
                      <CopyIcon />
                      Copy
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
