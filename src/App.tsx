import { HashRouter, Route, Routes } from 'react-router-dom'
import { StoryIndexPage } from '@/pages/StoryIndexPage'
import { StoryPage } from '@/pages/StoryPage'
import { WeakSpotsPage } from '@/pages/WeakSpotsPage'

export function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<StoryIndexPage />} />
        <Route path="/story/:slug" element={<StoryPage />} />
        <Route path="/weak-spots" element={<WeakSpotsPage />} />
      </Routes>
    </HashRouter>
  )
}
