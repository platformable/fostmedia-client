import { useState, useEffect } from "react"

export function LoadingMessages() {
  const messages = [
    "Searching database",
    "Finding speakers",
    "Collecting quotes",
  ]

  const [messageIndex, setMessageIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)

      setTimeout(() => {
        setMessageIndex((messageIndex + 1) % messages.length)
        setIsVisible(true)
      }, 300)
    }, 2000)

    return () => clearTimeout(timer)
  }, [messageIndex, messages.length])

  return (
    <div
      style={{
        fontSize: "18px",
        minHeight: "1.5em",
        opacity: isVisible ? 1 : 0,
        transition: "opacity 0.3s ease-in-out",
      }}
      className="pulse"
    >
      {messages[messageIndex]}
    </div>
  )
}
