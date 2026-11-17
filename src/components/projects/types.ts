export type Project = {
  id: number
  title: string
  tags: string[]
  summary: string
  description: string
  images: string[]
  github: string
  live: string
  liveLabel?: string
  comingSoonLabel?: string
  features?: { title: string; detail: string }[]
  challenges?: string[]
  featuresHeading?: string
  challengesHeading?: string
  roleHeading?: string
  roleDescription?: string
  architectureHeading?: string
  architectureDescription?: string
  reportUrl?: string
  darkImageIndex?: number
  blurImage?: boolean
}
