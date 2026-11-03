import React from "react"
import Link from "next/link"

const ROW_ONE = [
  { name: "Google", src: `/logos/google-logo.png` },
  { name: "Boomi", src: `/logos/boomi-logo.png` },
  { name: "Treblle", src: `/logos/treblle-logo.png` },
  { name: "Mirmi", src: `/logos/mirmi-logo.png` },
  { name: "Acquia", src: `/logos/acquia-logo.png` },
]

const ROW_TWO = [
  { name: "Plakar", src: `/logos/plakar-logo.png` },
  { name: "WSO2", src: `/logos/wso2-logo.png` },
  { name: "VMware", src: `/logos/vmware-logo.png` },
  { name: "Axway", src: `/logos/axway-logo.png` },
]

const COPIES = 3

function MarqueeRow({ logos, reverse = false, duration = 40 }) {
  const items = Array.from({ length: COPIES }, (_, copy) =>
    logos.map((logo) => ({
      ...logo,
      key: `${copy}-${logo.name}`,
      hidden: copy > 0,
    })),
  ).flat()

  return (
    <div className="fost-marquee__row mb-7">
      <div
        className={`fost-marquee__track${reverse ? " is-reverse" : ""}`}
        style={{ "--duration": `${duration}s`, "--copies": COPIES }}
      >
        {items.map((logo) => (
          <div className="fost-marquee__item" key={logo.key}>
            <img
              src={logo.src}
              alt={logo.hidden ? "" : logo.name}
              aria-hidden={logo.hidden || undefined}
              loading="lazy"
              draggable={false}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default function FostLogoMarquee({
  rowOne = ROW_ONE,
  rowTwo = ROW_TWO,
  duration = 40, // seconds per full loop; higher = slower
  title,
}) {
  return (
    <section
      className="fost-marquee sponsors-bg py-10"
      aria-label="Companies at FOST"
    >
      <div className="text-center mb-12">
        <span
          className={`buttonGradientOurSponsorsBg inline-block text-xs md:text-sm px-5 py-1  uppercase mb-4`}
        >
          Our Sponsors
        </span>
        <h2 className="text-black text-3xl md:text-4xl font-bold tracking-wide">
          Thanks to our sponsors who make{" "}
          <span className="font-bold main-color">FOST Paris</span> possible
        </h2>
      </div>
      <MarqueeRow logos={rowOne} duration={duration} />
      <MarqueeRow logos={rowTwo} duration={duration * 1.15} reverse />

      <div className="text-center ">
        <Link
          href="https://joinfost.io/events/"
          target="_blank"
          className="ml-4 text-white buttonGradientBg font-medium leading-5 rounded-lg text-md px-8 py-3  hover:shadow-md cursor-pointer "
        >
          EVENT INFO →
        </Link>
      </div>
      <Link
        href="https://joinfost.io/sponsors/"
        target="_blank"
        className="ml-4 text-center main-color  font-medium leading-5 rounded-lg text-md px-5 py-1   cursor-pointer "
      >
        FIND OUT MORE ABOUT BEING A SPONSOR →
      </Link>
    </section>
  )
}
