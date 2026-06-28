const getPosts = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/posts?filters=[slug]=media-posts&populate[0]=Featured_Image&populate[1]=categories`,
  )
  const posts = await response.json()
  return posts?.data
}

const getPostsBySlug = async (slug: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/posts?filters=[slug]=${slug}&populate[0]=Featured_Image&populate[1]=categories`,
  )
  const posts = await response.json()
  console.log(posts, "post")
  return posts?.data
}

export { getPostsBySlug }

export default getPosts
