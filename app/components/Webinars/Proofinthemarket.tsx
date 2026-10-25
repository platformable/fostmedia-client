import React from "react"

/**
 * Colors taken from the palette screenshots:
 *  navy      #0F2C59  (cards, headline, number tiles)
 *  orange    #FF6B26  (accent headline, eyebrow, AI tiles)
 *  peach     #FEEBE2  (background gradient start)
 *  blue      #0070F3  (stat "68")
 *  lime      #C4F15A  (stat "$10B")
 *  green     #25DE8A  (stat "5")
 *  magenta   #D42FDB  (stat "1st")
 *
 * Optional: move them into tailwind.config.js -> theme.extend.colors
 * and replace the bracket values (e.g. bg-[#0F2C59] -> bg-navy).
 */

const stats = [
  {
    value: "68",
    color: "text-[#0070F3]",
    label: "countries with open banking regulations",
    source: "Global, 2026",
  },
  {
    value: "$10B",
    color: "text-[#C4F15A]",
    label: "in cross-border transactions on API-composable rails",
    source: "EFICYENT, Sept 2026",
  },
  {
    value: "5",
    color: "text-[#25DE8A]",
    label: "AI products for merchants, from fraud to personalisation",
    source: "Adyen",
  },
  {
    value: "1st",
    color: "text-[#D42FDB]",
    label: "end-to-end AI agent payments in Latin America",
    source: "Santander & Visa, Mar 2026",
  },
]

const phases = [
  { n: 1, label: "Regulatory compliance" },
  { n: 2, label: "APIs as a channel" },
  { n: 3, label: "APIs as the product" },
  { n: 4, label: "APIs as infrastructure" },
  { n: 5, label: "Ecosystem integration" },
  { n: 6, label: "Optimised backend services", ai: true },
  { n: 7, label: "Hyperpersonalised customer interaction", ai: true },
  { n: 8, label: "Agentic commerce", ai: true },
]

const GearIcon = ({ sparkle = false }) => (
  <svg
    viewBox="0 0 24 24"
    className="h-6 w-6 shrink-0"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="3.2" />
    <path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M5.3 18.7l2.1-2.1M16.6 7.4l2.1-2.1" />
    {sparkle && (
      <path
        d="M20 1l.7 1.8L22.5 3.5l-1.8.7L20 6l-.7-1.8-1.8-.7 1.8-.7z"
        fill="currentColor"
        stroke="none"
      />
    )}
  </svg>
)

export default function ProofInTheMarket() {
  return (
    <section className=" webinars-profit-bg px-8 py-12 proof-in-the-market">
      <div className="mx-auto max-w-screen-xl">
        {/* Heading */}
        <p className="text-sm font-bold uppercase  text-[#FF6B26]">
          Proof in the market
        </p>
        <h2 className="mt-5  font-bold  text-[#0F2C59] ">
          Finance runs on APIs.
          <br />
        </h2>
        <h2 className="text-[#FF6B26]  font-bold">Smart finance is next.</h2>

        {/* Stats card */}
        <div className="mt-10 grid grid-cols-1 overflow-hidden rounded-2xl border border-[#2A4A7F] bg-[#0F2C59] shadow-[0_8px_24px_rgba(15,44,89,0.25)] md:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={s.value}
              className={`flex flex-col px-9 pb-6 pt-9 ${
                i > 0
                  ? "border-t border-white/25 md:border-l md:border-t-0"
                  : ""
              }`}
            >
              <span
                className={`text-6xl font-extrabold leading-none ${s.color} mb-5`}
              >
                {s.value}
              </span>
              <p className="mt-6 min-h-[84px] text-lg font-semibold leading-snug text-white">
                {s.label}
              </p>
              <span className="mt-4 text-sm text-slate-300">{s.source}</span>
            </div>
          ))}
        </div>

        {/* Phases header + legend */}
        <div className="mt-14 flex flex-wrap items-center justify-between gap-4">
          <h5 className="text-sm font-bold uppercase  text-[#FF6B26]">
            The shift · Eight phases of banking APIs
          </h5>
          <div className="flex gap-2">
            <span className="inline-flex items-center gap-2 rounded-lg bg-[#0F2C59] px-4 py-3 text-sm font-bold text-white">
              <img src="/APIs-icon.png" alt="API Icon" width="16" height="16" />
              APIs
            </span>
            <span className="inline-flex items-center gap-2 rounded-lg bg-[#FF6B26] px-4 py-3 text-sm font-bold text-white">
              <img
                src="/APis-AI-icon.png"
                alt="API + AI Icon"
                width="20"
                height="20"
              />
              APIs + AI
            </span>
          </div>
        </div>

        {/* Phases grid */}
        <ol className="mt-8 grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          {phases.map((p) => (
            <li key={p.n} className="flex items-center gap-4">
              <span
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg text-lg font-bold text-white ${
                  p.ai ? "bg-[#FF6B26]" : "bg-[#0F2C59]"
                }`}
              >
                {p.n}
              </span>
              <span className="text-lg font-medium leading-snug text-[#0F2C59]">
                {p.label}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
