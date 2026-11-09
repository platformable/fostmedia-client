import Link from "next/link"

export default function Marquee() {
  return (
    <section
      id="marquee"
      className="marquee py-5 flex justify-center items-center"
    >
      <span className="text-white font-bold">
        Welcome to FOSTBeat!
        {/*    <span className="text-[#FF5900]"> 28–29 October 2026</span> • MCEC */}
      </span>
      <Link
        href="/blog/welcome-to-fostbeat"
        //target="_blank"
        className="ml-4 text-white bg-[#FC6200] font-medium leading-5 rounded-lg text-md px-5 py-1  hover:shadow-md cursor-pointer "
      >
        Find out more →
      </Link>
    </section>
  )
}
