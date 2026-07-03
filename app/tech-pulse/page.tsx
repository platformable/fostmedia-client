"use client"
import React, { useActionState } from "react"
import LatestArticles from "../components/LatestArticles"
import handleSearch from "@/utils/searchActions"

// import ShareModal from "../components/SharePost"
// import BackToBlogFooter from "../components/BackToBlogFooter"
// import BackToBlogBtn from "../components/BackToBlogBtn"

export default function TechPulsePage() {
  const initialState = {
    query: "",
    results: [],
  }

  const [state, dispatchAction, isPending] = useActionState(
    handleSearch,
    initialState,
  )

  console.log(" state:", state)

  return (
    <div className="mx-auto max-w-screen-xl px-4 pt-10 bg-tech-pulse">
      <h1 className="text-white text-base leading-10 my-5">
        {"Ask the conference anything"}
      </h1>
      <p className=" text-[#BCBCBC]">
        An AI assistant trained on every talk, transcript and session across all
        FOST events. Every answer cites its source.
      </p>
      {/*    <div className="relative h-64 w-full overflow-hidden rounded-2xl md:h-80 mt-10 mb-3"></div> */}

      <form
        action={dispatchAction}
        className="mt-5 grid grid-cols-1 md:grid-cols-[10fr_2fr] gap-8"
      >
        <input
          type="text"
          name="question"
          placeholder="e.g., What did speakers say about agent reliability?"
          className="w-full p-5 rounded-xl bg-[#0B0F1C] text-white border border-[#747271] focus:outline-none focus:ring-2 focus:ring-[#FC6200]"
        />
        <button
          type="submit"
          className="ask-btn py-2 px-4 rounded-full text-white bg-purple-300 cursor-pointer hover:opacity-90 transition-opacity duration-300"
        >
          Ask →{isPending && <span className="ml-2">Loading...</span>}
        </button>
      </form>

      <section className="grid grid-cols-1 md:grid-cols-[8fr_4fr] gap-8 mt-5 ">
        <div className="text-[#D6DAE0] border-r border-[#30323B] px-4">
          {/* {state.results.length > 0 ? (
            state.results.map((result: string, index: number) => (
              <div key={index}>{result}</div>
            ))
          ) : (
            <p>No results found.</p>
          )} */}
          {/*    {state.results.length > 0 ? (
            state.results.map((result: any, index: number) => (
              <div key={index} className="mb-4">
                <p className="text-white">{result.query}</p>{" "}
                <p className="text-[#BCBCBC] text-sm mt-1">{result.answer}</p>
              </div>
            ))
          ) : (
            <p>No results found.</p>
          )} */}

          {state.results.answer ? (
            state.results.answer
          ) : (
            <p>No results found.</p>
          )}
        </div>
        <aside>
          <div className="flex items-center gap-2">
            {/* <img src="/file.svg" width={20} height={20} alt="File Icon" />
            <h6 className="main-color uppercase">On this page</h6> */}
            {/* <ShareModal /> */}
          </div>
          <LatestArticles description={false} textSize={"LARGE"} />
        </aside>
      </section>
    </div>
  )
}
