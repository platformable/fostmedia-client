const calculateReadTime = (text: string): string => {
  const wordsPerMinute = 200 // Average reading speed
  const words = text.trim().split(/\s+/).length // Count words
  const minutes = Math.ceil(words / wordsPerMinute) // Calculate minutes
  return `${minutes} min read`
}

export default calculateReadTime
