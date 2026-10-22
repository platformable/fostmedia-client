"use server"

const handleSearch = async (
  prevState: { query: string; results: unknown[] },
  formData: FormData,
) => {
  const question = formData.get("question") as string

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/search?question=${encodeURIComponent(question)}`,
      {
        method: "POST",
        cache: "no-store",
        headers: {
          Authorization: `Bearer ${process.env.API_TOKEN}`,
        },
      },
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

const handleReportSearch = async (
  prevState: { query: string; results: unknown[] },
  formData: FormData,
) => {
  const question = formData.get("question") as string

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/ask-reports`,
      {
        method: "POST",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.API_TOKEN}`,
        },
        body: JSON.stringify({ question }),
      },
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
export { handleReportSearch }
