import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Filter, X, Calendar, Tag, Clock, Eye } from 'lucide-react'

interface Video {
  id: string
  title: string
  description?: string
  url: string
  type: 'UPLOAD' | 'YOUTUBE' | 'VIMEO' | 'OTHER'
  thumbnail?: string
  category: string
  duration?: number
  createdAt: string
  team?: {
    name: string
    ageGroup: {
      name: string
    }
  }
  match?: {
    homeTeam: { name: string }
    awayTeam: { name: string }
    matchDate: string
  }
}

const VideoGallery: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([])
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [loading, setLoading] = useState(true)

  const categories = [
    { id: 'all', name: 'Всі відео' },
    { id: 'general', name: 'Загальні' },
    { id: 'team', name: 'Команди' },
    { id: 'match', name: 'Матчі' },
    { id: 'training', name: 'Тренування' },
    { id: 'highlights', name: 'Хайлайти' }
  ]

  useEffect(() => {
    loadVideos()
  }, [selectedCategory])

  const loadVideos = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (selectedCategory !== 'all') {
        params.append('category', selectedCategory)
      }
      params.append('published', 'true')
      
      const response = await fetch(`http://localhost:3001/api/videos?${params}`)
      if (response.ok) {
        const data = await response.json()
        if (Array.isArray(data)) {
          setVideos(data)
        } else if (data.videos && Array.isArray(data.videos)) {
          setVideos(data.videos)
        } else {
          setVideos([])
        }
      }
    } catch (error) {
      console.error('Error loading videos:', error)
    } finally {
      setLoading(false)
    }
  }

  const getVideoEmbedUrl = (video: Video) => {
    if (video.type === 'YOUTUBE') {
      const videoId = video.url.includes('youtube.com/watch?v=') 
        ? video.url.split('v=')[1]?.split('&')[0]
        : video.url.split('youtu.be/')[1]?.split('?')[0]
      return `https://www.youtube.com/embed/${videoId}`
    }
    
    if (video.type === 'VIMEO') {
      const videoId = video.url.split('vimeo.com/')[1]?.split('?')[0]
      return `https://player.vimeo.com/video/${videoId}`
    }
    
    return video.url
  }

  const getVideoThumbnail = (video: Video) => {
    if (video.thumbnail) {
      return video.thumbnail
    }
    
    if (video.type === 'YOUTUBE') {
      const videoId = video.url.includes('youtube.com/watch?v=') 
        ? video.url.split('v=')[1]?.split('&')[0]
        : video.url.split('youtu.be/')[1]?.split('?')[0]
      return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
    }
    
    return '/placeholder-video.jpg'
  }

  const formatDuration = (seconds?: number) => {
    if (!seconds) return ''
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('uk-UA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Завантаження відео...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Відеогалерея
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Найкращі моменти з життя футбольного клубу "Ніка"
          </motion.p>
        </div>

        {/* Filters */}
        <motion.div 
          className="mb-8 flex flex-wrap justify-center gap-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category.id
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {category.name}
            </button>
          ))}
        </motion.div>

        {/* Video Grid */}
        {videos.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Play className="w-24 h-24 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Відео не знайдено
            </h3>
            <p className="text-gray-600">
              У цій категорії поки що немає відео
            </p>
          </div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {videos.map((video, index) => (
              <motion.div
                key={video.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                onClick={() => setSelectedVideo(video)}
              >
                <div className="relative">
                  <img
                    src={getVideoThumbnail(video)}
                    alt={video.title}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/placeholder-video.jpg'
                    }}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <Play className="w-12 h-12 text-white" />
                  </div>
                  {video.duration && (
                    <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-sm">
                      {formatDuration(video.duration)}
                    </div>
                  )}
                </div>
                
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                    {video.title}
                  </h3>
                  {video.description && (
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {video.description}
                    </p>
                  )}
                  
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(video.createdAt)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Tag className="w-4 h-4" />
                        <span className="capitalize">{video.category}</span>
                      </div>
                    </div>
                  </div>
                  
                  {video.team && (
                    <div className="mt-2 text-sm text-blue-600">
                      {video.team.name} ({video.team.ageGroup.name})
                    </div>
                  )}
                  
                  {video.match && (
                    <div className="mt-2 text-sm text-green-600">
                      {video.match.homeTeam.name} vs {video.match.awayTeam.name}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedVideo(null)}
          >
            <motion.div
              className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {selectedVideo.title}
                    </h2>
                    {selectedVideo.description && (
                      <p className="text-gray-600 mt-2">
                        {selectedVideo.description}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => setSelectedVideo(null)}
                    className="p-2 hover:bg-gray-100 rounded-full"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                
                <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                  {selectedVideo.type === 'UPLOAD' ? (
                    <video
                      controls
                      className="w-full h-full"
                      src={selectedVideo.url}
                    >
                      Ваш браузер не підтримує відео
                    </video>
                  ) : (
                    <iframe
                      src={getVideoEmbedUrl(selectedVideo)}
                      className="w-full h-full"
                      allowFullScreen
                      title={selectedVideo.title}
                    />
                  )}
                </div>
                
                <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(selectedVideo.createdAt)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Tag className="w-4 h-4" />
                    <span className="capitalize">{selectedVideo.category}</span>
                  </div>
                  {selectedVideo.duration && (
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{formatDuration(selectedVideo.duration)}</span>
                    </div>
                  )}
                </div>
                
                {selectedVideo.team && (
                  <div className="mt-2 text-blue-600">
                    Команда: {selectedVideo.team.name} ({selectedVideo.team.ageGroup.name})
                  </div>
                )}
                
                {selectedVideo.match && (
                  <div className="mt-2 text-green-600">
                    Матч: {selectedVideo.match.homeTeam.name} vs {selectedVideo.match.awayTeam.name}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default VideoGallery 