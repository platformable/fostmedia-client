"use client"
import React, { useState } from "react"

type Status = "idle" | "loading" | "success" | "error"

export default function FooterSubscribeForm() {
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
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col md:flex-row items-center gap-4 mt-2"
      >
        <input
          type="email"
          placeholder="EMAIL ADDRESS"
          aria-label="Email address"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === "loading"}
          className="w-full  p-3 rounded-md bg-[#0E1224] text-white border border-[#F36017] focus:outline-none focus:ring-2 focus:ring-[#695BE0]"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="subscribe-btn text-white px-6 py-3 hover:bg-[#5a4fcf] rounded-md transition-colors inline-flex items-center justify-center px-7 py-3  font-semibold transition-opacity hover:opacity-90 uppercase cursor-pointer disabled:opacity-60"
        >
          {status === "loading" ? "Subscribing..." : "Subscribe"}
        </button>
      </form>
      {message && (
        <p
          role="status"
          className={`mt-3 text-sm font-semibold ${
            status === "error" ? "text-red-400" : "text-green-400"
          }`}
        >
          {message}
        </p>
      )}
    </>
  )
}
