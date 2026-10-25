import type { Metadata } from "next"
import createShareMetadata from "@/lib/metadata"
import ApieconomyClient from "./ApieconomyClient"

export const metadata: Metadata = createShareMetadata({
  title: "API Economy",
  description: "An AI assistant trained on reports from the FOST API Economy research.",
  url: "/apieconomy",
})

export default function Page() {
  return <ApieconomyClient />
}
