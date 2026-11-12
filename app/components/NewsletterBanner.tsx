"use client"
import React, { useState } from "react"

type Status = "idle" | "loading" | "success" | "error"

export default function NewsletterBanner() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<Status>("idle")
  const [message, setMessage] = useState("")

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (status === "loading") return
    setStatus("loading")
    setMessage("")
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data?.error || "Something went wrong.")
      setStatus("success")
      setMessage(
        data?.alreadySubscribed
          ? "You're already subscribed. Thanks for being part of FOST!"
          : "Thanks for subscribing! Check your inbox to confirm."
      )
      setEmail("")
    } catch (err) {
      setStatus("error")
      setMessage(err instanceof Error ? err.message : "Something went wrong.")
    }
  }

  return (
    <div className=" flex items-center justify-center  md:p-10  bg-[#FFF4EE]">
      {/* Banner Container */}
      <div className="w-full max-w-screen-xl bg-gradient-to-r from-[#e33b26] via-[#f06129] to-[#f89036] rounded-[32px] shadow-[0_20px_40px_rgba(240,97,41,0.2)] px-6 py-8 md:py-10 flex flex-col items-center text-center">
        {/* Overline */}
        <span className="text-white/90 text-xs md:text-[11px] font-bold uppercase tracking-[0.2em] mb-4">
          FOST Newsletter
        </span>

        {/* Heading */}
        <h2 className="text-white text-3xl md:text-[36px] font-semibold mb-4 tracking-tight">
          A fresh perspective.
        </h2>

        {/* Subheading */}
        <h3 className="text-white/95 text-lg md:text-[20px] font-light mb-10 ">
          Get a weekly roundup of FOST articles,talks, and events in your inbox.
        </h3>

        {/* Form Container */}
        <form
          className="w-full max-w-[640px] flex flex-col sm:flex-row gap-3 md:gap-4 mb-8"
          onSubmit={handleSubmit}
        >
          {/* Email Input */}
          <input
            type="email"
            placeholder="EMAIL ADDRESS"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === "loading"}
            aria-label="Email address"
            className="flex-1 bg-white rounded-xl px-6 py-4 text-[13px] font-semibold text-gray-800 placeholder:text-gray-700 tracking-wide focus:outline-none focus:ring-2 focus:ring-white/50 shadow-inner"
          />

          {/* Subscribe Button */}
          <button
            type="submit"
            disabled={status === "loading"}
            className="disabled:opacity-60 bg-[#101423] text-white rounded-full px-10 py-4 text-[13px] font-bold uppercase tracking-[0.1em] hover:bg-black transition-colors duration-200 whitespace-nowrap"
          >
            {status === "loading" ? "Subscribing..." : "Subscribe"}
          </button>
        </form>

        {message && (
          <p
            role="status"
            className={`mb-4 text-sm font-semibold ${
              status === "error" ? "text-[#101423]" : "text-white"
            }`}
          >
            {message}
          </p>
        )}

        {/* Footer Text */}
        <p className="text-white/70 text-[13px] font-light">
          FOST does not sell your information or share it with unaffiliated
          third parties.
        </p>
      </div>
    </div>
  )
}
