import type { Story } from '@/types/story'
import { marcoTheBaker } from './marco-the-baker'
import { monaLisa } from './mona-lisa'
import { lucaGym } from './luca-gym'
import { walked800Km } from './walked-800-km'

export const stories: Story[] = [marcoTheBaker, monaLisa, lucaGym, walked800Km]

export function getStoryBySlug(slug: string | undefined): Story | undefined {
  return stories.find((story) => story.slug === slug)
}
