const getPosts = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/posts?filters=[slug]=media-posts&populate[0]=Featured_Image&populate[1]=categories`,
  )
  const posts = await response.json()
  return posts?.data
}
const getIndustryPosts = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/industries?filters=[slug]=media-posts&populate[0]=Featured_Image&populate[1]=categories`,
  )
  const posts = await response.json()
  return posts?.data
}

const getPostsBySlug = async (slug: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/posts?filters=[slug]=${slug}&populate[0]=Featured_Image&populate[1]=categories`,
  )
  const posts = await response.json()

  return posts?.data
}

const getIndustryBySlug = async (slug: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/industries?filters=[slug]=${slug}&populate[0]=Featured_Image&populate[1]=categories`,
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
