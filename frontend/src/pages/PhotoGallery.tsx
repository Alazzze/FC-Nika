import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import ModernPhotoGallery from '../components/ModernPhotoGallery'
import { Camera, Filter, Star, Trophy, Users, Calendar } from 'lucide-react'

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

const PhotoGallery: React.FC = () => {
  const [photos, setPhotos] = useState<Photo[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = [
    { id: 'all', name: 'Всі фото', icon: Camera, count: 0 },
    { id: 'Найкращі моменти', name: 'Найкращі моменти', icon: Star, count: 0 },
    { id: 'Матчі', name: 'Матчі', icon: Trophy, count: 0 },
    { id: 'Тренування', name: 'Тренування', icon: Users, count: 0 },
    { id: 'Загальні', name: 'Загальні', icon: Calendar, count: 0 },
  ]

  useEffect(() => {
    loadPhotos()
    
    // Автооновлення кожні 30 секунд
    const interval = setInterval(loadPhotos, 30000)
    
    return () => clearInterval(interval)
  }, [])

  const loadPhotos = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/photos')
      const data = await response.json()
      setPhotos(data)
      
      // Update category counts
      categories.forEach(category => {
        if (category.id === 'all') {
          category.count = data.length
        } else {
          category.count = data.filter((photo: Photo) => photo.category === category.id).length
        }
      })
    } catch (error) {
      console.error('Error loading photos:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredPhotos = selectedCategory === 'all' 
    ? photos 
    : photos.filter(photo => photo.category === selectedCategory)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/80 backdrop-blur-sm shadow-lg border-b sticky top-0 z-40"
      >
        <div className="container py-8">
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-nika-blue to-nika-darkBlue rounded-full mb-6 shadow-xl"
            >
              <Camera className="w-10 h-10 text-white" />
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-6xl font-bold text-gray-900 mb-4"
            >
              📸 Фотогалерея
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            >
              Найяскравіші моменти життя нашого футбольного клубу "Ніка". 
              Від тренувань до перемог - кожне фото розповідає свою історію! ⚽
            </motion.p>
          </div>
        </div>
      </motion.div>

      <div className="container py-12">
        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-12"
        >
          <div className="flex items-center justify-center mb-6">
            <Filter className="w-6 h-6 text-nika-blue mr-3" />
            <h2 className="text-2xl font-bold text-gray-900">Категорії фото</h2>
          </div>
          
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category, index) => (
              <motion.button
                key={category.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 10px 25px rgba(0,0,0,0.15)"
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category.id)}
                className={`group px-6 py-4 rounded-2xl font-semibold transition-all duration-300 flex items-center space-x-3 ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-nika-blue to-nika-darkBlue text-white shadow-xl shadow-nika-blue/30'
                    : 'bg-white/90 backdrop-blur-sm text-gray-700 hover:bg-white border border-gray-200 hover:shadow-lg'
                }`}
              >
                <category.icon className={`w-5 h-5 transition-transform duration-300 ${
                  selectedCategory === category.id ? 'text-white' : 'text-nika-blue group-hover:scale-110'
                }`} />
                <span>{category.name}</span>
                {category.count > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className={`px-2 py-1 rounded-full text-xs font-bold ${
                      selectedCategory === category.id
                        ? 'bg-white/20 text-white'
                        : 'bg-nika-blue/10 text-nika-blue'
                    }`}
                  >
                    {category.count}
                  </motion.span>
                )}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          <motion.div
            whileHover={{ scale: 1.02, y: -5 }}
            className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-2xl shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-3xl font-bold">{photos.length}</h3>
                <p className="text-blue-100">Всього фото</p>
              </div>
              <Camera className="w-12 h-12 text-blue-200" />
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02, y: -5 }}
            className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-2xl shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-3xl font-bold">{categories.length - 1}</h3>
                <p className="text-green-100">Категорій</p>
              </div>
              <Filter className="w-12 h-12 text-green-200" />
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02, y: -5 }}
            className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white p-6 rounded-2xl shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-3xl font-bold">{filteredPhotos.length}</h3>
                <p className="text-yellow-100">У вибраній категорії</p>
              </div>
              <Star className="w-12 h-12 text-yellow-200" />
            </div>
          </motion.div>
        </motion.div>

        {/* Photo Gallery */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          {loading ? (
            <div className="text-center py-16">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="inline-block w-16 h-16 border-4 border-nika-blue/20 border-t-nika-blue rounded-full mb-4"
              ></motion.div>
              <p className="text-gray-600 text-lg">Завантажуємо фото...</p>
            </div>
          ) : (
            <ModernPhotoGallery photos={photos} selectedCategory={selectedCategory} />
          )}
        </motion.div>

        {/* Call to Action */}
        {!loading && photos.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="mt-16 text-center"
          >
            <div className="bg-gradient-to-r from-nika-blue/10 to-nika-darkBlue/10 rounded-3xl p-8">
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
                className="text-6xl mb-4"
              >
                📱
              </motion.div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Поділіться своїми фото!
              </h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Маєте класні фото з тренувань чи матчів? Надішліть їх нам, і вони з'являться в галереї!
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-nika-blue to-nika-darkBlue text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-shadow flex items-center space-x-2 mx-auto"
              >
                <Camera className="w-5 h-5" />
                <span>Надіслати фото</span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default PhotoGallery 