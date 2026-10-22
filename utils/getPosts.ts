import { cache } from "react"

const getPosts = async (page: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/posts?sort=publishedAt:desc${page === "home" ? "&pagination[pageSize]=3" : ""}&populate=*`,
  )
  const posts = await response.json()
  return posts?.data
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
  getIndustryBySlug,
}

export default getPosts
