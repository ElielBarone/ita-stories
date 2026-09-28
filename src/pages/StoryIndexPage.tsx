import { PageHeader } from '@/components/PageHeader'
import { PageMain } from '@/components/PageMain'
import { StoryGrid } from '@/components/StoryGrid'
import { stories } from '@/data/stories'

export function StoryIndexPage() {
  return (
    <>
      <PageHeader
        title="Italian Stories"
        subtitle="Tap a story to read it. Tap a sentence in the story to see its translation."
      />
      <PageMain>
        <StoryGrid stories={stories} />
      </PageMain>
    </>
  )
}
