import { cache } from "react"

type Ad = {
  documentId: string
  Priority?: number | null
  Start_date?: string | null
  End_date?: string | null
  [key: string]: unknown
}

const getHomepageAds = async (): Promise<Ad[]> => {
  const params = new URLSearchParams({
    "filters[Display_mode][$eq]": "Homepage",
    "filters[Is_active][$eq]": "true",
    "populate[Image]": "true",
    "pagination[pageSize]": "100",
    status: "published",
  })
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/ads?${params.toString()}`,
  )
  if (!response.ok) return []
  const json = await response.json().catch(() => null)
  const today = new Date().toISOString().slice(0, 10)
  return ((json?.data ?? []) as Ad[])
    .filter((ad) => {
      if (ad.Start_date && ad.Start_date > today) return false
      if (ad.End_date && ad.End_date < today) return false
      return true
    })
    .sort((a, b) => (b.Priority ?? 0) - (a.Priority ?? 0))
}

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

const getPostsBySlug = async (
  slug: string,
  status: "draft" | "published" = "published",
) => {
  const params = new URLSearchParams({
    "filters[Slug][$eq]": slug,
    "populate[Featured_Image]": "true",
    "populate[categories]": "true",
    "populate[authors][populate]": "Avatar",
    "populate[Ads][populate][Image]": "true",
    "populate[Bottom_ad][populate][Image]": "true",
    status,
  })
  const adsParams = new URLSearchParams({
    "filters[Display_mode][$eq]": "All posts",
    "filters[Is_active][$eq]": "true",
    "populate[Image]": "true",
    "pagination[pageSize]": "100",
    status: "published",
  })

  const [postsResponse, adsResponse] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts?${params.toString()}`, {
      cache: "no-store",
    }),
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/ads?${adsParams.toString()}`, {
      cache: "no-store",
    }).catch(() => null),
  ])

  const posts = await postsResponse.json()
  const data = posts?.data
  const post = Array.isArray(data) ? data[0] : null
  if (!post) return data

  const globalAds: Ad[] = adsResponse?.ok
    ? ((await adsResponse.json().catch(() => null))?.data ?? [])
    : []

  const today = new Date().toISOString().slice(0, 10)
  const seen = new Set<string>()
  post.Ads = [...(post.Ads ?? []), ...globalAds]
    .filter((ad: Ad) => {
      if (!ad?.documentId || seen.has(ad.documentId)) return false
      seen.add(ad.documentId)
      if (ad.Start_date && ad.Start_date > today) return false
      if (ad.End_date && ad.End_date < today) return false
      return true
    })
    .sort((a: Ad, b: Ad) => (b.Priority ?? 0) - (a.Priority ?? 0))

  return data
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
  getHomepageAds,
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
