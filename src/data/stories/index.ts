import type { Story } from '@/types/story'
import { marcoTheBaker } from './marco-the-baker'
import { monaLisa } from './mona-lisa'
import { lucaGym } from './luca-gym'

export const stories: Story[] = [marcoTheBaker, monaLisa, lucaGym]

export function getStoryBySlug(slug: string | undefined): Story | undefined {
  return stories.find((story) => story.slug === slug)
}
