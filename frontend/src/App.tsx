import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Teams from './pages/Teams'
import TeamDetail from './pages/TeamDetail'
import Coaches from './pages/Coaches'
import TournamentTables from './pages/TournamentTables'

import PhotoGallery from './pages/PhotoGallery'
import VideoGallery from './pages/VideoGallery'
import News from './pages/News'
import Schedule from './pages/Schedule'
import AdminPanel from './pages/AdminPanel'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/teams/:id" element={<TeamDetail />} />
        <Route path="/coaches" element={<Coaches />} />
        <Route path="/tournaments" element={<TournamentTables />} />

        <Route path="/photos" element={<PhotoGallery />} />
        <Route path="/videos" element={<VideoGallery />} />
        <Route path="/news" element={<News />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </Layout>
  )
}

export default App 