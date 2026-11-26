import type { Metadata } from "next"
import { getPostsBySlug } from "@/utils/getPosts"
import createShareMetadata from "@/lib/metadata"
import BlogPosts from "./BlogPosts"

import { draftMode } from "next/headers"

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params
  const { isEnabled: isDraftMode } = await draftMode()
  const status = isDraftMode ? "draft" : "published"

  const posts = await getPostsBySlug(slug, status)
  const post = posts[posts?.length - 1] || posts[0]

  if (!post) {
    return {}
  }

  return createShareMetadata({
    title: post.Title,
    description: post.Excerpt || "",
    url: `/blog/${slug}`,
    image: post.Featured_Image?.url,
  })
}

export default async function Page({ params }: PageProps) {
  const { isEnabled: isDraftMode } = await draftMode()
  const status = isDraftMode ? "draft" : "published"

  return <BlogPosts params={params} status={status} />
}
