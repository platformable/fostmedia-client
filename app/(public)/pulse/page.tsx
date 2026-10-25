import type { Metadata } from "next"
import createShareMetadata from "@/lib/metadata"
import PulseClient from "./PulseClient"

export const metadata: Metadata = createShareMetadata({
  title: "Pulse",
  description:
    "Ask the conference anything. An AI assistant trained on every talk, transcript and session across all FOST events.",
  url: "/pulse",
})

export default function Page() {
  return <PulseClient />
}
