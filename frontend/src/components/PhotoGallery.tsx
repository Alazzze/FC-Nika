import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, Download, Heart, Share2, ZoomIn } from 'lucide-react'

interface Photo {
  id: number
  title: string
  url: string
  category: string
  description?: string
  createdAt: string
  team?: {
    ageGroup: {
      name: string
    }
  }
}

interface PhotoGalleryProps {
  photos: Photo[]
  selectedCategory?: string
}

const PhotoGallery: React.FC<PhotoGalleryProps> = ({ photos, selectedCategory = 'all' }) => {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLiked, setIsLiked] = useState<Set<number>>(new Set())
  const [hoveredPhoto, setHoveredPhoto] = useState<number | null>(null)

  const filteredPhotos = selectedCategory === 'all' 
    ? photos 
    : photos.filter(photo => photo.category === selectedCategory)

  const openPhoto = (photo: Photo, index: number) => {
    setSelectedPhoto(photo)
    setCurrentIndex(index)
  }

  const closePhoto = () => {
    setSelectedPhoto(null)
  }

  const nextPhoto = () => {
    const nextIndex = (currentIndex + 1) % filteredPhotos.length
    setSelectedPhoto(filteredPhotos[nextIndex])
    setCurrentIndex(nextIndex)
  }

  const prevPhoto = () => {
    const prevIndex = (currentIndex - 1 + filteredPhotos.length) % filteredPhotos.length
    setSelectedPhoto(filteredPhotos[prevIndex])
    setCurrentIndex(prevIndex)
  }

  const toggleLike = (photoId: number) => {
    setIsLiked(prev => {
      const newSet = new Set(prev)
      if (newSet.has(photoId)) {
        newSet.delete(photoId)
      } else {
        newSet.add(photoId)
      }
      return newSet
    })
  }

  const downloadPhoto = (url: string, title: string) => {
    const link = document.createElement('a')
    link.href = url
    link.download = `${title}.jpg`
    link.click()
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!selectedPhoto) return
      
      switch (e.key) {
        case 'Escape':
          closePhoto()
          break
        case 'ArrowLeft':
          prevPhoto()
          break
        case 'ArrowRight':
          nextPhoto()
          break
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [selectedPhoto, currentIndex])

  return (
    <>
      {/* Photo Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredPhotos.map((photo, index) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative group cursor-pointer overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300"
            onMouseEnter={() => setHoveredPhoto(photo.id)}
            onMouseLeave={() => setHoveredPhoto(null)}
            onClick={() => openPhoto(photo, index)}
          >
            {/* Football animated background */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-400/10 via-transparent to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute top-2 left-2 text-2xl football-bounce opacity-50">⚽</div>
              <div className="absolute bottom-2 right-2 text-lg football-spin opacity-30">🏆</div>
            </div>

            {/* Photo */}
            <div className="relative aspect-square overflow-hidden">
              <img
                src={photo.url.startsWith('/uploads/') ? `http://localhost:3001${photo.url}` : photo.url}
                alt={photo.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              
              {/* Hover overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: hoveredPhoto === photo.id ? 1 : 0 }}
                className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end justify-between p-4"
              >
                <div className="text-white">
                  <h3 className="font-bold text-lg mb-1">{photo.title}</h3>
                  <p className="text-sm opacity-90">
                    {photo.team ? photo.team.ageGroup.name : photo.category}
                  </p>
                </div>
                
                <div className="flex space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleLike(photo.id)
                    }}
                    className={`p-2 rounded-full transition-colors ${
                      isLiked.has(photo.id) 
                        ? 'bg-red-500 text-white' 
                        : 'bg-white/20 text-white hover:bg-white/30'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isLiked.has(photo.id) ? 'fill-current' : ''}`} />
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors"
                  >
                    <ZoomIn className="w-4 h-4" />
                  </motion.button>
                </div>
              </motion.div>
            </div>

            {/* Photo info */}
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 line-clamp-1 mb-2">{photo.title}</h3>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span className="bg-nika-blue/10 text-nika-blue px-2 py-1 rounded-full font-medium">
                  {photo.team ? photo.team.ageGroup.name : photo.category}
                </span>
                <span>{new Date(photo.createdAt).toLocaleDateString('uk-UA')}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Fullscreen Photo Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={closePhoto}
          >
            {/* Football field pattern background */}
            <div className="absolute inset-0 opacity-10">
              <div className="w-full h-full bg-gradient-to-br from-green-400 via-green-500 to-green-600"></div>
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZGVmcz4KICAgIDxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPgogICAgICA8cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjEiLz4KICAgIDwvcGF0dGVybj4KICA8L2RlZnM+CiAgPHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPgo8L3N2Zz4=')] opacity-20"></div>
            </div>

            {/* Close button */}
            <motion.button
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={closePhoto}
              className="absolute top-6 right-6 z-10 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
            >
              <X className="w-6 h-6" />
            </motion.button>

            {/* Navigation buttons */}
            <motion.button
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -50, opacity: 0 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation()
                prevPhoto()
              }}
              className="absolute left-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>

            <motion.button
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 50, opacity: 0 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation()
                nextPhoto()
              }}
              className="absolute right-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>

            {/* Photo container */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative max-w-6xl max-h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedPhoto.url.startsWith('/uploads/') 
                  ? `http://localhost:3001${selectedPhoto.url}` 
                  : selectedPhoto.url}
                alt={selectedPhoto.title}
                className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
              />

              {/* Photo info overlay */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg"
              >
                <div className="flex items-start justify-between text-white">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">{selectedPhoto.title}</h2>
                    <p className="text-lg opacity-90 mb-2">
                      {selectedPhoto.team ? selectedPhoto.team.ageGroup.name : selectedPhoto.category}
                    </p>
                    {selectedPhoto.description && (
                      <p className="text-sm opacity-80">{selectedPhoto.description}</p>
                    )}
                    <p className="text-sm opacity-70 mt-2">
                      {new Date(selectedPhoto.createdAt).toLocaleDateString('uk-UA', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>

                  <div className="flex space-x-3">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => toggleLike(selectedPhoto.id)}
                      className={`p-3 rounded-full transition-colors ${
                        isLiked.has(selectedPhoto.id) 
                          ? 'bg-red-500 text-white' 
                          : 'bg-white/20 text-white hover:bg-white/30'
                      }`}
                    >
                      <Heart className={`w-5 h-5 ${isLiked.has(selectedPhoto.id) ? 'fill-current' : ''}`} />
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => downloadPhoto(selectedPhoto.url, selectedPhoto.title)}
                      className="p-3 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors"
                    >
                      <Download className="w-5 h-5" />
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-3 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors"
                    >
                      <Share2 className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Photo counter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium"
            >
              {currentIndex + 1} з {filteredPhotos.length}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default PhotoGallery 