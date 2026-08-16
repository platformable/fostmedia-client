import type { Metadata } from "next"
import { getIndustryBySlug } from "@/utils/getPosts"
import createShareMetadata from "@/lib/metadata"
import BlogPosts from "@/app/industry/[slug]/IndustryPosts"

interface PageProps {
  params: Promise<{
    Slug: string
  }>
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { Slug } = await params

  const posts = await getIndustryBySlug(Slug)
  const post = posts?.[0]

  if (!post) {
    return {}
  }

  return createShareMetadata({
    title: post.Title,
    description: post.excerpt || "",
    url: `/industry/${Slug}`,
    image: post.Featured_Image?.url,
  })
}

export default function Page({ params }: PageProps) {
  return <BlogPosts params={params} />
}
