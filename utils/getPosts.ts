import { cache } from "react"

const getPosts = async (
  page: string,
  limit?: number,
  pageNumber = 1,
  categories: string[] = [],
) => {
  const isPaginated = page === "home" || page === "blog"

  const params = new URLSearchParams()
  params.append("sort", "publishedAt:desc")

  if (isPaginated) {
    params.append("pagination[pageSize]", String(limit ?? 5))
    params.append("pagination[page]", String(pageNumber))
  }

  categories.forEach((title, i) => {
    params.append(`filters[categories][Title][$in][${i}]`, title)
  })

  params.append("populate", "*")

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/posts?${params.toString()}`,
  )
  const posts = await response.json()
  return { posts: posts?.data, meta: posts?.meta }
}

const getIndustryPosts = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/industries?populate=*`,
  )
  const posts = await response.json()
  return posts?.data
}

const getPostsBySlug = async (slug: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/posts?filters[Slug][$eq]=${slug}&populate[Featured_Image]=true&populate[categories]=true&populate[authors][populate]=Avatar`,
    {
      cache: "no-store",
    },
  )
  const posts = await response.json()

  return posts?.data
}

const getIndustryBySlug = async (slug: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/industries?filters[Slug][$eq]=${slug}&populate[Featured_Image]=true&populate[categories]=true&populate[authors][populate]=Avatar`,
    {
      cache: "no-store",
    },
  )
  const posts = await response.json()

  return posts?.data
}

const getVideos = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/videos`)
  const posts = await response.json()

  return posts?.data
}

const getEvents = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/events?populate=*`,
  )
  const posts = await response.json()

  return posts?.data
}

export {
  getPostsBySlug,
  getVideos,
  getEvents,
  getIndustryPosts,
  getPosts,
  getIndustryBySlug,
}

export default getPosts
