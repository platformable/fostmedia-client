const WORDS_PER_MINUTE = 200 // Average reading speed

const calculateReadTime = (text?: string | null): string => {
  const plain = (text ?? "")
    .replace(/<(script|style)[\s\S]*?<\/\1>/gi, " ") // drop script/style blocks
    .replace(/<[^>]*>/g, " ") // strip HTML tags
    .replace(/&[a-z]+;|&#\d+;/gi, " ") // strip entities
    .trim()

  const words = plain ? plain.split(/\s+/).length : 0
  const minutes = Math.max(1, Math.ceil(words / WORDS_PER_MINUTE))
  return `${minutes} min read`
}

export default calculateReadTime
