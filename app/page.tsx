import Image from "next/image"
import MainPageFeaturedPost from "./components/MainPageFeaturedPost"
import Link from "next/link"
import LatestArticles from "./components/LatestArticles"
import IndustryTrends from "./components/IndustryTrends"

export default function Home() {
  return (
    <section>
      <MainPageFeaturedPost />
      <section>
        <div className="mx-auto  max-w-screen-xl p-4 py-6 lg:py-4 grid gap-8 grid-cols-1 md:grid-cols-[8fr_4fr]">
          <LatestArticles />

          <div
            className="p-8 rounded-xl flex flex-col gap-4 border-[1px] border-[#30323B]"
            style={{
              background:
                "transparent linear-gradient(90deg, #111525 0%, #695BE0 100%) 0% 0% no-repeat padding-box",
            }}
          >
            <div className="flex items-center gap-2">
              <img src="/file.svg" width={20} height={20} alt="File Icon" />
              <h6 className="text-[#A18EFF] uppercase">Tech Pulse</h6>
            </div>

            <div>
              <h4 className="text-white text-base leading-10">
                Ask the conference anything
              </h4>
              <p className="text-[#C2C9D6]">
                Our AI assistant, trained on every talk, transcript and session
                from across the FOST events.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-[#A18EFF] uppercase text-sm">
                Try asking
              </span>

              <button className="bg-[#15182B] text-white px-4 py-2 rounded-md mt-2 justify-start flex">
                Summarize the API governance track →
              </button>
              <button className="bg-[#15182B] text-white px-4 py-2 rounded-md mt-2 justify-start flex">
                Summarize the API governance track →
              </button>
              <button className="bg-[#15182B] text-white px-4 py-2 rounded-md mt-2 justify-start flex">
                Summarize the API governance track →
              </button>

              <Link
                href="#"
                className=" py-2  text-white rounded-full mt-2 self-start flex items-center gap-2 px-5"
                style={{
                  background:
                    "transparent linear-gradient(270deg, #624CD8 0%, #BE8EFF 100%) 0% 0% no-repeat padding-box",
                }}
              >
                Open Tech Pulse →
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="mx-auto  max-w-screen-xl p-4 py-6 lg:py-4 mb-7 ">
          <IndustryTrends />
        </div>
      </section>
    </section>
  )
}
