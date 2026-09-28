import type { Story } from '@/types/story'
import { marcoTheBaker } from './marco-the-baker'

export const stories: Story[] = [marcoTheBaker]

export function getStoryBySlug(slug: string | undefined): Story | undefined {
  return stories.find((story) => story.slug === slug)
}
