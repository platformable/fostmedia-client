"use client"
import getPosts from "@/utils/getPosts"
import { useQuery } from "@tanstack/react-query"

export default function Posts() {
  const {
    data: posts,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  })
  /*   console.log(posts, "posts") */
  if (isPending) {
    return <div>Loading...</div>
  }
  if (isError || !posts) {
    return <div className="text-white">Failed to load posts.</div>
  }
  if (posts.length === 0) {
    return <div className="text-white">No posts found.</div>
  }
  return (
    <div>
      {posts.map((post: any) => {
        return (
          <div key={post.id}>
            <p className="text-white text-6xl">{post.Title}</p>
          </div>
        )
      })}
    </div>
  )
}
