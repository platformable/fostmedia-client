"use server"

const handleSearch = async (
  prevState: { query: string; results: unknown[] },
  formData: FormData,
) => {
  const question = formData.get("question") as string
  console.log("handleSearch called with question:", question)
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/search?question=${encodeURIComponent(question)}`,
      { method: "POST", cache: "no-store" },
    )
    if (!response.ok) {
      throw new Error("Network response was not ok")
    }

    const data = await response.json()

    return { query: question, results: data }
  } catch (error) {
    console.error("Error fetching search results:", error)
    return { query: question, results: [] }
  }
}

export default handleSearch
