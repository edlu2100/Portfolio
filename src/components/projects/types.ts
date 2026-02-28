export type Project = {
  id: number
  title: string
  tags: string[]
  summary: string
  description: string
  images: string[]
  github: string
  live: string
  reportUrl?: string
  darkImageIndex?: number
  blurImage?: boolean
}
