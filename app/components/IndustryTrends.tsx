import Link from "next/link"
import React from "react"
import Tag from "./Tag"

export default function IndustryTrends() {
  return (
    <div className="">
      <div className="flex items-center gap-2">
        <img src="/file.svg" width={20} height={20} alt="File Icon" />
        <h6 className="text-[#40D2FF] uppercase">Industry Trends</h6>
      </div>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
        <div className="bg-[#161A29] border border-[#30323B] p-4 rounded-xl mt-4 flex flex-col gap-2">
          <Tag text="API" />
          <h4 className="text-white">
            APIs as the backbone of modern AI systems
          </h4>
          <p className="text-[#BCC4D0]">
            A short overview of how APIs enable AI models to access, share, and
            process data across platforms. It explains why APIs are essential
            for scaling AI applications.
          </p>
          <Link
            href="#"
            className=" py-2 flex items-center text-[#40D2FF] rounded-md mt-2"
          >
            Read story →
          </Link>
        </div>
        <div className="bg-[#161A29] border border-[#30323B] p-4 rounded-xl mt-4 flex flex-col gap-2">
          <Tag text="AI" />
          <h4 className="text-white">
            APIs as the backbone of modern AI systems
          </h4>
          <p className="text-[#BCC4D0]">
            A short overview of how APIs enable AI models to access, share, and
            process data across platforms. It explains why APIs are essential
            for scaling AI applications.
          </p>
          <Link
            href="#"
            className=" py-2 flex items-center text-[#40D2FF] rounded-md mt-2"
          >
            Read story →
          </Link>
        </div>
      </div>
    </div>
  )
}
