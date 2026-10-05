import type { Story } from '@/types/story'
import { marcoTheBaker } from './marco-the-baker'
import { monaLisa } from './mona-lisa'

export const stories: Story[] = [marcoTheBaker, monaLisa]

export function getStoryBySlug(slug: string | undefined): Story | undefined {
  return stories.find((story) => story.slug === slug)
}
