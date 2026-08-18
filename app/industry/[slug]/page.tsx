import type { Metadata } from "next"
import { getIndustryBySlug } from "@/utils/getPosts"
import createShareMetadata from "@/lib/metadata"
import IndustryPost from "@/app/industry/[slug]/IndustryPosts"

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params

  const posts = await getIndustryBySlug(slug)
  const post = posts?.[0]

  if (!post) {
    return {}
  }

  return createShareMetadata({
    title: post.Title,
    description: post.excerpt || "",
    url: `/industry/${slug}`,
    image: post.Featured_Image?.url,
  })
}

export default function Page({ params }: PageProps) {
  return <IndustryPost params={params} />
}
