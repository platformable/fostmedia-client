export interface ImageFormat {
  ext: string
  url: string
  etag: string
  hash: string
  mime: string
  name: string
  path: string | null
  size: number
  width: number
  height: number
  sizeInBytes: number
}

export interface ImageFormats {
  large?: ImageFormat
  small?: ImageFormat
  medium?: ImageFormat
  thumbnail?: ImageFormat
}

export interface FeaturedImage {
  id: number
  documentId: string
  name: string
  alternativeText: string | null
  caption: string | null
  focalPoint: string | null
  width: number
  height: number
  formats: ImageFormats
  hash: string
  ext: string
  mime: string
  size: number
  url: string
  previewUrl: string | null
  provider: string
  provider_metadata: unknown | null
  createdAt: string
  updatedAt: string
  publishedAt: string
}

export interface Category {
  id: number
  documentId: string
  Title: string
  createdAt: string
  updatedAt: string
  publishedAt: string
}

export interface Article {
  id: number
  documentId: string
  Title: string
  Slug: string
  Excerpt: string
  Content: string
  Is_Featured: boolean
  createdAt: string
  updatedAt: string
  publishedAt: string
  Featured_Image: FeaturedImage
  categories: Category[]
}

export interface Pagination {
  page: number
  pageSize: number
  pageCount: number
  total: number
}

export interface Meta {
  pagination: Pagination
}

export interface ArticleResponse {
  data: Article[]
  meta: Meta
}
