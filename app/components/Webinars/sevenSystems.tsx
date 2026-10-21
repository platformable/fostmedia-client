import React from "react"

/**
 * Same palette as ProofInTheMarket:
 *  navy #0F2C59 (section bg), deep navy #011B3D (pill fill),
 *  orange #FF6B26, blue #0070F3, lime #C4F15A, pink #FA3FB5
 */

const pills = [
  { label: "Open banking & open finance", border: "border-[#0070F3]" },
  { label: "Embedded finance", border: "border-[#FF6B26]" },
  { label: "Smart data systems", border: "border-[#0070F3]" },
  { label: "Corporate banking API products", border: "border-[#0070F3]" },
  { label: "AI in banking, finance & insurance", border: "border-[#C4F15A]" },
  { label: "Stablecoins", border: "border-[#0070F3]" },
  { label: "Agentic commerce", border: "border-[#FA3FB5]" },
]

const BankIcon = () => (
  <svg
    viewBox="0 0 32 32"
    className="h-8 w-8"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M4 12L16 4l12 8H4z" />
    <path d="M7 14v9M13 14v9M19 14v9M25 14v9" />
    <path d="M4 26h24M3 29h26" />
  </svg>
)

const EmbeddedIcon = () => (
  <svg
    viewBox="0 0 32 32"
    className="h-8 w-8"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.4"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="3" y="3" width="26" height="26" rx="7" />
    <rect x="11" y="11" width="10" height="10" rx="2.5" fill="currentColor" />
  </svg>
)

const RobotIcon = () => (
  <svg
    viewBox="0 0 32 32"
    className="h-8 w-8"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M16 3v4" />
    <circle cx="16" cy="3" r="1" fill="currentColor" />
    <rect x="4" y="8" width="24" height="19" rx="6" />
    <circle cx="12" cy="17" r="1.8" fill="currentColor" stroke="none" />
    <circle cx="20" cy="17" r="1.8" fill="currentColor" stroke="none" />
    <path d="M2 16v3M30 16v3" />
  </svg>
)

const cards = [
  {
    title: "Corporate banking API products",
    body: "Nordea earns strong revenue from corporate APIs. ABN AMRO and Deutsche Bank aim to offer every corporate product via API.",
    gradient: "from-[#0376FC] to-white",
    Icon: "/corporate-icon.svg",
  },
  {
    title: "Embedded finance",
    body: "Delivery platform Glovo partners with lenders to offer loans, factoring and other services to its merchants.",
    gradient: "from-[#C2EE4D] to-white",
    Icon: "/embeded-icon.svg",
  },
  {
    title: "Agentic commerce",
    body: "Mastercard released MCP and agent toolkits, then built trusted partnerships and open tools like a verifiable intent standard.",
    gradient: "from-[#F43FB0] to-white",
    Icon: "/agentic-icon.svg",
  },
]

export default function SevenSystems() {
  return (
    <section className=" bg-[#0F2C59] px-6 py-12  text-white ">
      <div className="mx-auto max-w-screen-xl">
        {/* Title */}
        <h2 className="text-center text-3xl font-bold tracking-tight md:text-5xl">
          Seven API-enabled systems accelerating in 2026
        </h2>

        {/* Pills */}
        <ul className="mx-auto mt-8 flex flex-wrap justify-center gap-x-4 gap-y-4 mb-8">
          {pills.map((p) => (
            <li
              key={p.label}
              className={`rounded-full border bg-[#011B3D]/60 px-5 py-1 text-lg  ${p.border}`}
            >
              {p.label}
            </li>
          ))}
        </ul>

        {/* Intro */}
        <div className="mx-auto mt-8 max-w-[1050px] text-center text-lg leading-snug text-white md:text-2xl">
          Together they make up what we call{" "}
          <strong className="font-bold">smart finance</strong>: connected
          services available when and where needed, built on composable,
          API-first infrastructure.
        </div>

        {/* Landing cards */}
        <h3 className="mt-14 text-sm font-bold uppercase  text-[#FF6B26]">
          Where APIs and AI are landing
        </h3>

        <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-3">
          {cards.map(({ title, body, gradient, Icon }) => (
            <article
              key={title}
              className={`flex min-h-[310px] flex-col rounded-2xl bg-gradient-to-b ${gradient} p-6 text-[#0F2C59]`}
            >
              <img src={Icon} alt={title} className="h-8 w-8" />
              <h4 className="mt-5 max-w-[220px] text-2xl font-bold leading-tight">
                {title}
              </h4>
              <p className="mt-8 text-base leading-relaxed text-[#011B3D]">
                {body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
