export type CategoryDescription = {
  Title: string
  Heading: string
  Description: string
  Image: {
    url: string
  }
}

type CategoriesResponse = {
  data?: CategoryDescription[]
}

export const getCategories = async (
  categoryName: string,
): Promise<CategoryDescription[]> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/categories?filters[Title][$eq]=${encodeURIComponent(categoryName)}&populate=*`,
  )
  if (!response.ok) {
    throw new Error(`Failed to fetch categories: ${response.status}`)
  }

  const result: CategoriesResponse = await response.json()
  return result.data ?? []
}
