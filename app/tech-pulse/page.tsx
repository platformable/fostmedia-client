"use client"
import React, { useActionState } from "react"
import LatestArticles from "../components/LatestArticles"
import handleSearch from "@/utils/searchActions"
import Loader from "../components/Loader"
import ReactPDF from "@react-pdf/renderer"
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFDownloadLink,
  Image,
} from "@react-pdf/renderer"
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
  const styles = StyleSheet.create({
    page: {
      /*       flexDirection: "row", */
      backgroundColor: "#0b0f1c",
      color: "#ffffff",
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1,
    },
    box: {
      backgroundColor: "#161A29",
      padding: 10,
      borderRadius: 5,
      border: "1px solid #A18EFF",
      marginBottom: 10,
    },
    conference: {
      fontSize: 12,
      marginBottom: 10,
    },
  })

  const MyDocument = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Image
            src={`${window.location.origin}/logo_fost.png`}
            style={{
              width: 120,
              height: 40,
            }}
          />
          <Text style={styles.conference}>
            {state.results.sources[0].conference}
          </Text>

          {state?.results?.answer &&
            Array.isArray(state?.results?.answer) &&
            state?.results?.answer.map((answer: string, index: number) => (
              <View key={index} style={styles.box}>
                <Text>{answer}</Text>
              </View>
            ))}
        </View>
      </Page>
    </Document>
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
          className={`ask-btn py-2 px-4 rounded-full text-white bg-purple-300 cursor-pointer hover:opacity-90 transition-opacity duration-300`}
          disabled={isPending}
        >
          {isPending ? "Searching..." : "Ask →"}
        </button>
      </form>

      <section className="grid grid-cols-1 md:grid-cols-[12fr] gap-8 mt-5  ">
        <div className="text-[#D6DAE0]  px-4 pb-20">
          {state.results.length !== 0 ? (
            <div className="flex items-center gap-2 mb-5">
              <img src="/file.svg" width={20} height={20} alt="File Icon" />
              <h6 className="text-[#A18EFF] uppercase">QUOTES</h6>
            </div>
          ) : (
            ""
          )}

          {isPending && (
            <div className="flex justify-center py-5">
              <Loader />
            </div>
          )}
          {state.results.answer &&
            Array.isArray(state.results.answer) &&
            state.results.answer.map((answer: string, index: number) => (
              <div
                key={index}
                className="mb-4 bg-[#161A29] p-4 rounded-lg border border-[#A18EFF]"
              >
                <p className="text-[#BCBCBC] text-sm mt-1">{answer}</p>
              </div>
            ))}
          {/* {Array.isArray(state.results.answer) &&
            state.results.answer.length > 0 && (
              <PDFDownloadLink
                document={<MyDocument />}
                fileName="somename.pdf"
                className="ask-btn py-2 px-4 rounded-full text-white bg-purple-300 cursor-pointer hover:opacity-90 transition-opacity duration-300"
              >
                {({ blob, url, loading, error }) =>
                  loading ? "Loading document..." : "Download .pdf"
                }
              </PDFDownloadLink>
            )} */}
        </div>
        {/*      <aside>
          <div className="flex items-center gap-2">
            <img src="/file.svg" width={20} height={20} alt="File Icon" />
            <h6 className="main-color uppercase">On this page</h6>
            <ShareModal />
          </div>
          <div className="pb-20">
            <LatestArticles description={false} textSize={"LARGE"} />
          </div>
        </aside> */}
      </section>
    </div>
  )
}
