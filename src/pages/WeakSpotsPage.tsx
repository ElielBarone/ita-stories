import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { PageHeader } from '@/components/PageHeader'
import { PageMain } from '@/components/PageMain'
import { ALL_STORIES_SCOPE, WeakSpotScopeSelect } from '@/components/WeakSpotScopeSelect'
import { WeakSpotList } from '@/components/WeakSpotList'
import { stories } from '@/data/stories'
import { downloadFile } from '@/lib/downloadFile'
import { buildElephantCsv } from '@/lib/weakSpots/csv'
import { getAllEntries, getEntriesForStory, scoreAndRank } from '@/lib/weakSpots/store'
import styles from './WeakSpotsPage.module.css'

export function WeakSpotsPage() {
  const [searchParams] = useSearchParams()
  const initialScope = searchParams.get('story') ?? ALL_STORIES_SCOPE
  const [scope, setScope] = useState(initialScope)

  const scoredEntries = useMemo(() => {
    const entries = scope === ALL_STORIES_SCOPE ? getAllEntries() : getEntriesForStory(scope)
    return scoreAndRank(entries)
  }, [scope])

  function handleDownload(targetLang: 'en' | 'pt') {
    const csv = buildElephantCsv(scoredEntries, targetLang)
    downloadFile(`ita-stories-weak-spots-${targetLang}.csv`, csv)
  }

  return (
    <>
      <PageHeader
        title="Weak Spots"
        subtitle="Your top 20 phrases still worth reviewing — fades out on its own once you stop needing help with it."
      >
        <WeakSpotScopeSelect value={scope} stories={stories} onChange={setScope} />
      </PageHeader>
      <PageMain>
        <WeakSpotList entries={scoredEntries} />
        {scoredEntries.length > 0 && (
          <>
            <div className={styles.actions}>
              <button type="button" onClick={() => handleDownload('en')}>
                Download CSV (→ English)
              </button>
              <button type="button" onClick={() => handleDownload('pt')}>
                Download CSV (→ Portuguese)
              </button>
            </div>
            <p className={styles.hint}>
              Elephant's importer is paste-based: open the downloaded file, copy its contents, and paste them
              into Elephant's "Import Phrases" dialog on a deck with Learning language = Italian.
            </p>
          </>
        )}
      </PageMain>
    </>
  )
}
