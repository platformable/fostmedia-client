import type { Metadata } from "next"
import { getPostsBySlug } from "@/utils/getPosts"
import createShareMetadata from "@/lib/metadata"
import BlogPosts from "@/app/blog/[slug]/BlogPosts"

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params

  const posts = await getPostsBySlug(slug)
  const post = posts?.[0]

  if (!post) {
    return {}
  }
  console.log(slug, "post dentro [slug]")
  return createShareMetadata({
    title: post.Title,
    description: post.excerpt || "",
    url: `/blog/${slug}`,
    image: post.Featured_Image?.url,
  })
}

export default function Page({ params }: PageProps) {
  return <BlogPosts params={params} />
}
