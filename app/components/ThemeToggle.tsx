"use client"

import { useSyncExternalStore } from "react"
import { FiMoon, FiSun } from "react-icons/fi"

type Theme = "light" | "dark"

function getTheme(): Theme {
  return document.documentElement.getAttribute("data-theme") === "dark"
    ? "dark"
    : "light"
}

function subscribe(callback: () => void) {
  const observer = new MutationObserver(callback)
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  })
  return () => observer.disconnect()
}

export default function ThemeToggle({
  variant = "default",
}: {
  /** "onDark" for headers that are dark in both themes (e.g. webinars) */
  variant?: "default" | "onDark"
}) {
  // Server renders "light"; the client reads the value the inline
  // script in layout.tsx already set on <html>.
  const theme = useSyncExternalStore(subscribe, getTheme, () => "light")
  const next: Theme = theme === "dark" ? "light" : "dark"

  const toggle = () => {
    const root = document.documentElement
    root.classList.add("theme-transition")
    root.setAttribute("data-theme", next)
    try {
      localStorage.setItem("theme", next)
    } catch {}
    window.setTimeout(() => root.classList.remove("theme-transition"), 300)
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${next} mode`}
      title={`Switch to ${next} mode`}
      className={`inline-flex items-center justify-center w-10 h-10 rounded-lg border hover:border-[#F65B06] transition-colors cursor-pointer ${
        variant === "onDark"
          ? "border-[#393939] text-white"
          : "border-gray-300 text-[#111525] dark:border-[#2a2f45] dark:text-white"
      }`}
    >
      {theme === "dark" ? <FiSun size={18} /> : <FiMoon size={18} />}
    </button>
  )
}
