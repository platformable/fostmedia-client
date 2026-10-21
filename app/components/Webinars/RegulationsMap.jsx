import React from "react"
import { MAP_VIEWBOX, BASE_PATH, HIGHLIGHT_PATH } from "./worldMapPaths"

/**
 * Same palette as the other sections:
 *  navy #0F2C59 (headline, cards), orange #FF6B26 (map highlight, eyebrow, pills),
 *  peach #FEEBE2 (background gradient start), warm gray #EDE7E3 (non-highlighted land)
 *
 * The map geometry lives in ./worldMapPaths.js (generated from Natural Earth data).
 */

/* ---------- Flags (simplified, drawn to fit a circle) ---------- */

const FlagFrame = ({ children }) => (
  <span className="inline-flex h-8 w-8 shrink-0 overflow-hidden rounded-full ring-1 ring-white/20">
    <svg viewBox="0 0 32 32" className="h-full w-full" aria-hidden="true">
      {children}
    </svg>
  </span>
)

const EUFlag = () => (
  <FlagFrame>
    <rect width="32" height="32" fill="#1D3E9A" />
    {Array.from({ length: 12 }).map((_, i) => {
      const a = (i / 12) * Math.PI * 2
      return (
        <circle
          key={i}
          cx={16 + Math.cos(a) * 9}
          cy={16 + Math.sin(a) * 9}
          r="1.3"
          fill="#FFD83A"
        />
      )
    })}
  </FlagFrame>
)

const BrazilFlag = () => (
  <FlagFrame>
    <rect width="32" height="32" fill="#1FA34A" />
    <polygon points="16,5 29,16 16,27 3,16" fill="#FFD83A" />
    <circle cx="16" cy="16" r="6" fill="#1B3A8C" />
  </FlagFrame>
)

const AustraliaFlag = () => (
  <FlagFrame>
    <rect width="32" height="32" fill="#0B2F8A" />
    <rect width="16" height="16" fill="#0B2F8A" />
    <path d="M0 0L16 16M16 0L0 16" stroke="#fff" strokeWidth="3" />
    <path d="M8 0v16M0 8h16" stroke="#fff" strokeWidth="5" />
    <path d="M8 0v16M0 8h16" stroke="#E5252A" strokeWidth="3" />
    <circle cx="8" cy="25" r="3" fill="#fff" />
    <circle cx="24" cy="8" r="1.3" fill="#fff" />
    <circle cx="20" cy="16" r="1.3" fill="#fff" />
    <circle cx="26" cy="18" r="1.3" fill="#fff" />
    <circle cx="23" cy="26" r="1.3" fill="#fff" />
  </FlagFrame>
)

const CanadaFlag = () => (
  <FlagFrame>
    <rect width="32" height="32" fill="#E5252A" />
    <rect x="8" width="16" height="32" fill="#fff" />
    <path
      d="M16 7l1.8 3.6 2.6-1-1 5.2 2.8-1.6-.8 2.4 2 1.6-5 2.4.5 1.8h-1.8V26h-2.2v-3.6h-1.8l.5-1.8-5-2.4 2-1.6-.8-2.4 2.8 1.6-1-5.2 2.6 1z"
      fill="#E5252A"
    />
  </FlagFrame>
)

const SaudiFlag = () => (
  <FlagFrame>
    <rect width="32" height="32" fill="#0E7C3A" />
    <rect x="8" y="12" width="16" height="2" rx="1" fill="#fff" />
    <rect x="10" y="16" width="12" height="1.5" rx=".75" fill="#fff" />
    <rect x="7" y="21" width="18" height="1.5" rx=".75" fill="#fff" />
  </FlagFrame>
)

const USFlag = () => (
  <FlagFrame>
    <rect width="32" height="32" fill="#fff" />
    {Array.from({ length: 7 }).map((_, i) => (
      <rect key={i} y={i * 4.923} width="32" height="2.462" fill="#D22B3A" />
    ))}
    <rect width="16" height="17.2" fill="#2A3F8F" />
    {[0, 1, 2].map((r) =>
      [0, 1, 2].map((c) => (
        <circle
          key={`${r}${c}`}
          cx={3.5 + c * 4.5}
          cy={3.5 + r * 5}
          r=".9"
          fill="#fff"
        />
      )),
    )}
  </FlagFrame>
)

/* ---------- Content ---------- */

// Positions are literal classes so Tailwind can pick them up.
const mapLabels = [
  { text: "Canada", pos: "left-[28%] top-[13%]" },
  { text: "European Union", pos: "left-[56%] top-[16%]" },
  { text: "United States", pos: "left-[17%] top-[36%]" },
  { text: "Saudi Arabia", pos: "left-[67%] top-[47%]" },
  { text: "Brazil", pos: "left-[39%] top-[68%]" },
  { text: "Australia", pos: "left-[84%] top-[88%]" },
]

const countries = [
  {
    name: "European Union",
    Flag: EUFlag,
    title: "Consumer-Driven Banking",
    body: "“Compliant APIs” required for open finance across insurance, pensions and investments.",
  },
  {
    name: "Brazil",
    Flag: BrazilFlag,
    title: "Open Banking",
    body: "Mandated, standardised API designs. The Pix instant payments scheme runs on the same rails.",
  },
  {
    name: "Australia",
    Flag: AustraliaFlag,
    title: "Section 1033",
    body: "API-based data sharing now extends to non-bank lenders in 2026.",
  },
  {
    name: "Canada",
    Flag: CanadaFlag,
    title: "Consumer-Driven Banking",
    body: "Read access targeted for 2026; write access and payments for mid-2027.",
  },
  {
    name: "Saudi Arabia",
    Flag: SaudiFlag,
    title: "Open Banking",
    body: "Legislation, regulatory guides and technical standards aligned to international practice.",
  },
  {
    name: "USA",
    Flag: USFlag,
    title: "Section 1033",
    body: "Rule expected to be quashed. FDX is emerging as the market-driven standard.",
  },
]

const standards = [
  "ISO 20022",
  "BIAN",
  "FAPI",
  "NextGenPSD2",
  "UK Open Banking",
  "FDX",
]

export default function RegulationsMap() {
  return (
    <section className=" bg-gradient-to-b from-[#FEEBE2] via-white to-white px-6 py-10 font-sans md:px-[72px]">
      <div className="mx-auto max-w-screen-xl">
        {/* Heading */}
        <p className="text-xs font-bold uppercase  text-[#FF6B26]">
          Regulations mandating APIs
        </p>
        <h2 className="mt-4 text-2xl font-extrabold leading-[1.2] tracking-tight text-[#0F2C59] md:text-[34px]">
          From the EU and Brazil to Australia, Canada and Saudi Arabia,
          regulators are writing APIs into banking law.
        </h2>

        {/* Map */}
        <div className="relative mt-4">
          <svg
            viewBox={MAP_VIEWBOX}
            role="img"
            aria-label="World map highlighting the EU, United States, Canada, Brazil, Saudi Arabia and Australia"
            className="block h-auto w-full"
          >
            <path d={BASE_PATH} className="fill-[#EDE7E3]" />
            <path d={HIGHLIGHT_PATH} className="fill-[#FF6B26]" />
          </svg>

          {mapLabels.map((l) => (
            <span
              key={l.text}
              className={`absolute ${l.pos} -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-[#0F2C59] px-4 py-1 text-[11px] font-bold text-white shadow-sm`}
            >
              {l.text}
            </span>
          ))}
        </div>

        {/* Country cards */}
        <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-3">
          {countries.map(({ name, Flag, title, body }) => (
            <article
              key={name}
              className="flex flex-col rounded-xl bg-[#0F2C59] px-4 pb-5 pt-3 text-white"
            >
              <header className="flex items-center gap-3 border-b border-white/40 pb-3">
                <Flag />
                <span className="text-[11px] font-bold uppercase ">{name}</span>
              </header>
              <h3 className="mt-4 text-base font-bold leading-snug">{title}</h3>
              <p className="mt-2 text-sm leading-snug text-white/85">{body}</p>
            </article>
          ))}
        </div>

        {/* Key standards */}
        <div className="mt-8 flex  flex-wrap items-center  gap-x-2.5 gap-y-3 ">
          <p className="text-xs font-bold uppercase  text-[#FF6B26]">
            Key standards
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-3">
            {standards.map((s) => (
              <span
                key={s}
                className="rounded-full bg-[#FF6B26] px-5 py-1.5 text-xs font-semibold text-white"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
