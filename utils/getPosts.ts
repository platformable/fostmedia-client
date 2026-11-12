import { cache } from "react"

const getFeaturedPosts = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/posts?filters[Is_Featured]=true&sort=publishedAt:desc&pagination[pageSize]=3&pagination[page]=1&populate=*`,
  )
  const posts = await response.json()

  return { posts: posts?.data, meta: posts?.meta }
}

const getPosts = async (
  page: string,
  limit?: number,
  pageNumber = 1,
  categories: string[] = [],
  excludeFeatured = false,
) => {
  const isPaginated = page === "home" || page === "blog"

  const params = new URLSearchParams()
  params.append("sort", "publishedAt:desc")
  if (excludeFeatured) {
    params.append("filters[Is_Featured][$ne]", "true")
  }

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

const getIndustries = async (
  limit?: number,
  pageNumber = 1,
  categories: string[] = [],
) => {
  const params = new URLSearchParams()
  params.append("sort", "publishedAt:desc")
  params.append("pagination[pageSize]", String(limit ?? 5))
  params.append("pagination[page]", String(pageNumber))

  categories.forEach((title, i) => {
    params.append(`filters[categories][Title][$in][${i}]`, title)
  })

  params.append("populate", "*")

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/industries?${params.toString()}`,
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
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/videos?sort=publishedAt:desc`,
  )
  const posts = await response.json()

  return posts?.data
}

const getEvents = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/events?sort=publishedAt:desc&populate=*`,
  )
  const posts = await response.json()

  return posts?.data
}

const getRelatedPosts = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/posts?sort(() => 0.5 - Math.random()).slice(0, 2)&pagination[pageSize]=2&pagination[page]=1&populate=*`,
  )
  const posts = await response.json()

  return { posts: posts?.data, meta: posts?.meta }
}

export {
  getPostsBySlug,
  getVideos,
  getEvents,
  getIndustryPosts,
  getIndustries,
  getPosts,
  getIndustryBySlug,
  getFeaturedPosts,
  getRelatedPosts,
}

export default getPosts
