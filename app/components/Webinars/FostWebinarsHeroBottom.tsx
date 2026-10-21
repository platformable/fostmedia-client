import React from "react"

const T = {
  geranium: "#DD312A",
  orange: "#F28C1B",
  orangeDeep: "#F26B1F",
  orangeMedium: "#F7B872",
  richBlack: "#020616",
  white: "#FFFFFF",
  onAccent: "#020616",
  gradOrangeRed: "linear-gradient(90deg, #F28C1B 0%, #DD312A 100%)",
  gradPanel: "linear-gradient(180deg, #F28C1B 0%, #F26B1F 100%)",
  gradGround: "linear-gradient(180deg, #020616 0%, #020616 55%, #1a0d08 100%)",
  hairline: "rgba(255,255,255,0.14)",
  tint: "rgba(255,255,255,0.06)",
  font: '"Inter", "Helvetica Neue", Arial, sans-serif',
}

const DEFAULT_SPEAKERS = [
  {
    name: "Mark Boyd",
    role: ["VP Analyst &", "Ecosystem Lead,", "FOST"],
    photo: "/webinars/avatars/Mark.png",
  },
  {
    name: "Doreen Chee",
    role: ["Humancraft AI,", "ex-Citibank, Arab Bank,", "Standard Chartered"],
    photo: "/webinars/avatars/Doreen.png",
  },
  {
    name: "Markus Müller",
    role: ["Global CTO API", "Management,", "Boomi"],
    photo: "/webinars/avatars/Markus.png",
  },
]

const DEFAULT_FACTS = [
  { big: "Thu, Nov 5", small: "5 November 2026" },
  { big: "3 pm CET", small: "2 pm GMT, 9am EST, 6am PST" },
  { big: "Live", small: "Online webinar + Q&A" },
  { big: "FREE", small: "Register to save your seat" },
]

export default function FostWebinarBannerBottom({
  title = "Banking & Finance in the Age of AI",
  subtitle = "from API infrastructure to Intelligent Experience",
  description = "AI is only as good as the API foundation beneath it. In this session, we break down how banking and financial services leaders are layering AI on existing API infrastructure — and what still needs to be built.",
  speakers = DEFAULT_SPEAKERS,
  facts = DEFAULT_FACTS,
  ctaLabel = "Register for FREE",
  ctaHref = "https://streamyard.com/watch/DRB8dqCTGbtt",
  recordingNote = "Can’t make it? Register anyway.",
  recordingNoteRest = " We’ll send you a copy of the recording.",
  fostLogo = null,
  partnerLogo = "/boomi-logo.png",
  partnerName = "boomi",
}) {
  return (
    <div className="mx-auto  max-w-screen-xl  webinars-hero-speakers-bg-bottom  rounded-4xl">
      <h2 className="text-white text-6xl font-bold text-center py-5">
        Save your seat
      </h2>
      <div className="mx-auto  max-w-screen-xl webinars-hero-speakers-bg-over  rounded-4xl">
        <section aria-label="Speakers" className=" rounded-t-4xl p-8 ">
          <div></div>
          <div
            className="fwb-speakers"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              gap: 16,
            }}
          >
            {speakers.map((s) => (
              <figure
                key={s.name}
                style={{ margin: 0, flex: "1 1 0", minWidth: 0 }}
              >
                <div className="grid justify-center">
                  {s.photo ? <img src={s.photo} alt={s.name} /> : ""}
                </div>
                <figcaption style={{ marginTop: 14 }}>
                  <div className="main-color text-3xl font-bold grid justify-center">
                    {s.name}
                  </div>
                  <div className="mt-2 grid justify-center">
                    {s.role.map((line) => (
                      <div
                        key={line}
                        className="text-[#000000] text-lg leading-5 text-center uppercase"
                      >
                        {line}
                      </div>
                    ))}
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section
          aria-label="Event details"
          className="bg-[#001A3A] grid md:grid-cols-4 items-center justify-center px-4 py-10"
        >
          {facts.map((f, i) => (
            <div
              key={f.big}
              className="text-center "
              style={{
                padding: "4px 12px",
                borderLeft: i === 0 ? "none" : `1px solid ${T.hairline}`,
              }}
            >
              <div className="main-color text-3xl font-bold">{f.big}</div>
              <div className="text-white mt-2">{f.small}</div>
            </div>
          ))}
        </section>

        <footer className=" rounded-b-4xl">
          <div className="grid grid-cols-3 items-center justify-center pt-10">
            <div className="flex justify-center">
              <img src={"/fost-logo-black.png"} alt="Fost Logo" />
            </div>

            <a
              href={ctaHref}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center text-2xl justify-center px-7 py-5  font-semibold text-white transition-opacity hover:opacity-90  webinars-button rounded-xl`}
            >
              {ctaLabel}
              <span aria-hidden="true">→</span>
            </a>

            <div className="flex justify-center ">
              <img
                src={"/boomi-logo-black.png"}
                alt={partnerName}
                className=""
              />
            </div>
          </div>

          <p
            className="py-10"
            style={{
              fontSize: 13,
              color: "black",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
            }}
          >
            <svg width="20" height="20" viewBox="0 0 22 22" aria-hidden="true">
              <rect x="1" y="3" width="20" height="16" rx="4" fill={T.orange} />
              <path d="M9 7.5 L15 11 L9 14.5 Z" fill={T.richBlack} />
            </svg>
            <span>
              <strong style={{ fontWeight: 700 }}>{recordingNote}</strong>
              {recordingNoteRest}
            </span>
          </p>
        </footer>
      </div>
    </div>
  )
}
