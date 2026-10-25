"use client"

import { usePathname } from "next/navigation"
import Navbar from "./Navbar"
import WebinarsNavbar from "./Webinars/WebinarsNavbar"
import Footer from "./Footer"

export default function LayoutShell({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isWebinars = pathname.includes("webinars")

  return (
    <>
      {!isWebinars ? <Navbar /> : <WebinarsNavbar />}
      <main className="flex-grow">{children}</main>
      {!isWebinars && <Footer />}
    </>
  )
}
