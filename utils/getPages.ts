export const getPages = async (pageName: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${pageName}`)
  const posts = await response.json()

  return posts?.data
}
