import React, { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { useDropzone } from 'react-dropzone'
import toast from 'react-hot-toast'
import { Camera, Upload, X, Edit3, Trash2, Users, FileText, Video } from 'lucide-react'

interface Photo {
  id: number
  title: string
  url: string
  description?: string
  category: string
  createdAt: string
}

interface Video {
  id: string
  title: string
  description?: string
  url: string
  type: 'UPLOAD' | 'YOUTUBE' | 'VIMEO' | 'OTHER'
  thumbnail?: string
  category: string
  duration?: number
  published: boolean
  createdAt: string
  team?: {
    id: string
    name: string
    ageGroup: {
      name: string
    }
  }
}



interface NewsItem {
  id: number
  title: string
  content: string
  excerpt?: string
  published: boolean
  createdAt: string
}

interface Team {
  id: number
  name: string
  ageGroup: {
    id: number
    name: string
  }
}

const AdminPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState('news')
  const [loading, setLoading] = useState(true)

  const tabs = [
    { id: 'news', name: 'Новини', icon: FileText },
    { id: 'teams', name: 'Команди', icon: Users },
    { id: 'photos', name: 'Фото', icon: Camera },
    { id: 'videos', name: 'Відео', icon: Video },
  ]

  useEffect(() => {
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Адмін-панель</h1>
          <p className="text-gray-600">Дитячий футбольний клуб "Ніка"</p>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors font-medium ${
                  activeTab === tab.id
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === 'news' && <NewsTab />}
          {activeTab === 'teams' && <TeamsTab />}
          {activeTab === 'photos' && <PhotosTab />}
          {activeTab === 'videos' && <VideosTab />}
        </div>
      </div>
    </div>
  )
}

// News Tab Component
const NewsTab: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editingItem, setEditingItem] = useState<NewsItem | null>(null)
  const [loading, setLoading] = useState(true)

  const loadNews = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/news/admin')
      if (response.ok) {
        const data = await response.json()
        setNews(data)
      }
    } catch (error) {
      toast.error('Помилка завантаження новин')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadNews()
  }, [])

  const handleDelete = async (id: number) => {
    if (!confirm('Ви впевнені що хочете видалити цю новину?')) return
    
    try {
      const response = await fetch(`http://localhost:3001/api/news/${id}`, {
        method: 'DELETE'
      })
      if (response.ok) {
        toast.success('Новину видалено!')
        loadNews()
      }
    } catch (error) {
      toast.error('Помилка видалення')
    }
  }

  if (loading) {
    return <div className="text-center py-8">Завантаження...</div>
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Управління новинами</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center space-x-2"
        >
          <FileText className="w-4 h-4" />
          <span>Додати новину</span>
        </button>
      </div>

      <div className="grid gap-4">
        {news.map((item) => (
          <div key={item.id} className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm mb-3">{item.excerpt}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>{new Date(item.createdAt).toLocaleDateString('uk-UA')}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    item.published ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {item.published ? 'Опубліковано' : 'Чернетка'}
                  </span>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setEditingItem(item)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {(showForm || editingItem) && (
        <NewsForm
          item={editingItem}
          onClose={() => {
            setShowForm(false)
            setEditingItem(null)
          }}
          onSave={loadNews}
        />
      )}
    </div>
  )
}

// Teams Tab Component
const TeamsTab: React.FC = () => {
  return (
    <div className="text-center py-12">
      <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
      <h3 className="text-lg font-medium text-gray-900 mb-2">Управління командами</h3>
      <p className="text-gray-500">В стадії розробки</p>
    </div>
  )
}


// Photos Tab Component
const PhotosTab: React.FC = () => {
  const [photos, setPhotos] = useState<Photo[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editingItem, setEditingItem] = useState<Photo | null>(null)
  const [loading, setLoading] = useState(true)

  const loadPhotos = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/photos')
      if (response.ok) {
        const data = await response.json()
        setPhotos(data)
      }
    } catch (error) {
      toast.error('Помилка завантаження фото')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadPhotos()
  }, [])

  const handleDelete = async (id: number) => {
    if (!confirm('Ви впевнені що хочете видалити це фото?')) return
    
    try {
      const response = await fetch(`http://localhost:3001/api/photos/${id}`, {
        method: 'DELETE'
      })
      if (response.ok) {
        toast.success('Фото видалено!')
        loadPhotos()
      }
    } catch (error) {
      toast.error('Помилка видалення')
    }
  }

  if (loading) {
    return <div className="text-center py-8">Завантаження...</div>
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Управління фото</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center space-x-2"
        >
          <Camera className="w-4 h-4" />
          <span>Додати фото</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {photos.map((photo) => (
          <div key={photo.id} className="bg-white rounded-lg shadow-md overflow-hidden group">
            <div className="relative aspect-square">
              <img
                src={photo.url.startsWith('/uploads/') ? `http://localhost:3001${photo.url}` : photo.url}
                alt={photo.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-3">
                <button
                  onClick={() => setEditingItem(photo)}
                  className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(photo.id)}
                  className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-1">{photo.title}</h3>
              <p className="text-sm text-gray-600">{photo.category}</p>
            </div>
          </div>
        ))}
      </div>

      {(showForm || editingItem) && (
        <PhotoForm
          item={editingItem}
          onClose={() => {
            setShowForm(false)
            setEditingItem(null)
          }}
          onSave={loadPhotos}
        />
      )}
    </div>
  )
}

// News Form Component
const NewsForm: React.FC<{
  item?: NewsItem | null
  onClose: () => void
  onSave: () => void
}> = ({ item, onClose, onSave }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: item || { title: '', content: '', excerpt: '', published: false }
  })
  const [saving, setSaving] = useState(false)

  const onSubmit = async (data: any) => {
    setSaving(true)
    try {
      const url = item 
        ? `http://localhost:3001/api/news/${item.id}`
        : 'http://localhost:3001/api/news'
      
      const response = await fetch(url, {
        method: item ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      if (response.ok) {
        toast.success(item ? 'Новину оновлено!' : 'Новину створено!')
        onSave()
        onClose()
      }
    } catch (error) {
      toast.error('Помилка збереження')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">
              {item ? 'Редагувати новину' : 'Додати новину'}
            </h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded">
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Заголовок *</label>
              <input
                {...register('title', { required: 'Заголовок обов\'язковий' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Заголовок новини"
              />
              {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Короткий опис</label>
              <textarea
                {...register('excerpt')}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Короткий опис новини"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Повний текст *</label>
              <textarea
                {...register('content', { required: 'Текст обов\'язковий' })}
                rows={8}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Повний текст новини"
              />
              {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>}
            </div>

            <div className="flex items-center">
              <input
                {...register('published')}
                type="checkbox"
                className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
              />
              <label className="ml-2 text-sm font-medium text-gray-700">
                Опублікувати одразу
              </label>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                Скасувати
              </button>
              <button
                type="submit"
                disabled={saving}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 flex items-center space-x-2"
              >
                {saving && <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>}
                <span>{saving ? 'Збереження...' : item ? 'Зберегти' : 'Створити'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}



// Photo Form Component  
const PhotoForm: React.FC<{
  item?: Photo | null
  onClose: () => void
  onSave: () => void
}> = ({ item, onClose, onSave }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: item || { title: '', description: '', category: 'Загальні' }
  })
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [uploading, setUploading] = useState(false)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setUploadedFiles(prev => [...prev, ...acceptedFiles])
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp'] },
    multiple: true
  })

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index))
  }

  const onSubmit = async (data: any) => {
    setUploading(true)
    try {
      if (item) {
        const response = await fetch(`http://localhost:3001/api/photos/${item.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        })
        if (response.ok) {
          toast.success('Фото оновлено!')
          onSave()
          onClose()
        }
        return
      }

      for (const file of uploadedFiles) {
        const formData = new FormData()
        formData.append('files', file)
        formData.append('title', data.title || file.name.split('.')[0])
        formData.append('description', data.description || '')
        formData.append('category', data.category)

        const uploadResponse = await fetch('http://localhost:3001/api/upload/photos', {
          method: 'POST',
          body: formData
        })

        if (!uploadResponse.ok) {
          throw new Error('Upload failed')
        }
      }

      toast.success(`Завантажено ${uploadedFiles.length} фото!`)
      onSave()
      onClose()
    } catch (error) {
      toast.error('Помилка завантаження')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">
              {item ? 'Редагувати фото' : 'Додати фото'}
            </h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded">
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {!item && (
              <div>
                <label className="block text-sm font-medium mb-2">Завантажити фото</label>
                <div
                  {...getRootProps()}
                  className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer ${
                    isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                  }`}
                >
                  <input {...getInputProps()} />
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600">
                    {isDragActive ? 'Відпустіть файли тут...' : 'Перетягніть фото або клікніть для вибору'}
                  </p>
                </div>

                {uploadedFiles.length > 0 && (
                  <div className="mt-4 grid grid-cols-3 gap-2">
                    {uploadedFiles.map((file, index) => (
                      <div key={index} className="relative">
                        <img
                          src={URL.createObjectURL(file)}
                          alt={file.name}
                          className="w-full h-20 object-cover rounded"
                        />
                        <button
                          type="button"
                          onClick={() => removeFile(index)}
                          className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-2">Назва</label>
              <input
                {...register('title')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Назва фото"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Опис</label>
              <textarea
                {...register('description')}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Опис фото"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Категорія</label>
              <select
                {...register('category', { required: 'Категорія обов\'язкова' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="Загальні">Загальні</option>
                <option value="Матчі">Матчі</option>
                <option value="Тренування">Тренування</option>
                <option value="Найкращі моменти">Найкращі моменти</option>
              </select>
              {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>}
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                Скасувати
              </button>
              <button
                type="submit"
                disabled={uploading || (!item && uploadedFiles.length === 0)}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 flex items-center space-x-2"
              >
                {uploading && <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>}
                <span>{uploading ? 'Завантаження...' : item ? 'Зберегти' : 'Завантажити'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

// Videos Tab Component
const VideosTab: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editingItem, setEditingItem] = useState<Video | null>(null)
  const [loading, setLoading] = useState(true)

  const loadVideos = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/videos')
      if (response.ok) {
        const data = await response.json()
        // Обробляємо різні формати відповіді від API
        if (Array.isArray(data)) {
          setVideos(data)
        } else if (data.videos && Array.isArray(data.videos)) {
          setVideos(data.videos)
        } else {
          setVideos([])
        }
      }
    } catch (error) {
      toast.error('Помилка завантаження відео')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadVideos()
  }, [])

  const handleDelete = async (id: string) => {
    if (!confirm('Ви впевнені що хочете видалити це відео?')) return
    
    try {
      const response = await fetch(`http://localhost:3001/api/videos/${id}`, {
        method: 'DELETE'
      })
      if (response.ok) {
        toast.success('Відео видалено!')
        loadVideos()
      }
    } catch (error) {
      toast.error('Помилка видалення')
    }
  }

  const getVideoThumbnail = (video: Video) => {
    if (video.thumbnail) {
      return video.thumbnail
    }
    
    if (video.type === 'YOUTUBE') {
      const videoId = video.url.includes('youtube.com/watch?v=') 
        ? video.url.split('v=')[1]?.split('&')[0]
        : video.url.split('youtu.be/')[1]?.split('?')[0]
      return `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`
    }
    
    return '/placeholder-video.jpg'
  }

  if (loading) {
    return <div className="text-center py-8">Завантаження...</div>
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Управління відео</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center space-x-2"
        >
          <Video className="w-4 h-4" />
          <span>Додати відео</span>
        </button>
      </div>

      <div className="grid gap-4">
        {videos.map((video) => (
          <div key={video.id} className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-start space-x-4">
              <img
                src={getVideoThumbnail(video)}
                alt={video.title}
                className="w-32 h-20 object-cover rounded flex-shrink-0"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/placeholder-video.jpg'
                }}
              />
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{video.title}</h3>
                    {video.description && (
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{video.description}</p>
                    )}
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>{new Date(video.createdAt).toLocaleDateString('uk-UA')}</span>
                      <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs">
                        {video.type}
                      </span>
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                        {video.category}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        video.published ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {video.published ? 'Опубліковано' : 'Приховано'}
                      </span>
                    </div>
                    {video.team && (
                      <div className="mt-2 text-sm text-blue-600">
                        {video.team.name} ({video.team.ageGroup.name})
                      </div>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setEditingItem(video)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(video.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {(showForm || editingItem) && (
        <VideoForm
          item={editingItem}
          onClose={() => {
            setShowForm(false)
            setEditingItem(null)
          }}
          onSave={loadVideos}
        />
      )}
    </div>
  )
}

// Video Form Component
const VideoForm: React.FC<{
  item?: Video | null
  onClose: () => void
  onSave: () => void
}> = ({ item, onClose, onSave }) => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: item || { 
      title: '', 
      description: '', 
      url: '',
      type: 'YOUTUBE',
      category: 'general',
      published: true
    }
  })
  const [saving, setSaving] = useState(false)
  const [teams, setTeams] = useState<Team[]>([])
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const watchType = watch('type')

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setUploadedFiles(prev => [...prev, ...acceptedFiles])
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'video/*': ['.mp4', '.avi', '.mov', '.wmv', '.flv', '.webm'] },
    multiple: true
  })

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index))
  }

  useEffect(() => {
    loadTeams()
  }, [])

  const loadTeams = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/teams')
      if (response.ok) {
        const data = await response.json()
        setTeams(data)
      }
    } catch (error) {
      console.error('Error loading teams:', error)
    }
  }

  const onSubmit = async (data: any) => {
    setSaving(true)
    try {
      if (item) {
        // Update existing video
        const payload = {
          ...data,
          teamId: data.teamId || null,
          published: data.published === 'true' || data.published === true
        }

        const response = await fetch(`http://localhost:3001/api/videos/${item.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        })
        if (response.ok) {
          toast.success('Відео оновлено!')
          onSave()
          onClose()
        }
      } else {
        // Create new video
        if (data.type === 'UPLOAD' && uploadedFiles.length > 0) {
          // Upload video files
          for (const file of uploadedFiles) {
            const formData = new FormData()
            formData.append('files', file)
            formData.append('title', data.title || file.name.split('.')[0])
            formData.append('description', data.description || '')
            formData.append('category', data.category)
            formData.append('published', data.published.toString())

            const uploadResponse = await fetch('http://localhost:3001/api/upload/videos', {
              method: 'POST',
              body: formData
            })

            if (!uploadResponse.ok) {
              throw new Error('Upload failed')
            }
          }

          toast.success(`Завантажено ${uploadedFiles.length} відео!`)
        } else {
          // Create video with URL
          const payload = {
            ...data,
            teamId: data.teamId || null,
            published: data.published === 'true' || data.published === true
          }

          const response = await fetch('http://localhost:3001/api/videos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          })
          if (response.ok) {
            toast.success('Відео створено!')
          }
        }
        
        onSave()
        onClose()
      }
    } catch (error) {
      toast.error('Помилка збереження відео')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">
              {item ? 'Редагувати відео' : 'Додати відео'}
            </h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded">
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Назва *</label>
              <input
                {...register('title', { required: 'Назва обов\'язкова' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Назва відео"
              />
              {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Тип відео</label>
              <select
                {...register('type')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="YOUTUBE">YouTube</option>
                <option value="VIMEO">Vimeo</option>
                <option value="UPLOAD">Завантажене відео</option>
                <option value="OTHER">Інше</option>
              </select>
            </div>

            {watchType === 'UPLOAD' && !item && (
              <div>
                <label className="block text-sm font-medium mb-2">Завантажити відео</label>
                <div
                  {...getRootProps()}
                  className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer ${
                    isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                  }`}
                >
                  <input {...getInputProps()} />
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600">
                    {isDragActive ? 'Відпустіть файли тут...' : 'Перетягніть відео або клікніть для вибору'}
                  </p>
                </div>

                {uploadedFiles.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {uploadedFiles.map((file, index) => (
                      <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                        <span className="text-sm">{file.name}</span>
                        <button
                          type="button"
                          onClick={() => removeFile(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {watchType !== 'UPLOAD' && (
              <div>
                <label className="block text-sm font-medium mb-2">
                  {watchType === 'YOUTUBE' ? 'Посилання на YouTube *' : 
                   watchType === 'VIMEO' ? 'Посилання на Vimeo *' : 
                   'URL відео *'}
                </label>
                <input
                  {...register('url', { required: watchType !== 'UPLOAD' ? 'URL обов\'язковий' : false })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={
                    watchType === 'YOUTUBE' ? 'https://www.youtube.com/watch?v=...' : 
                    watchType === 'VIMEO' ? 'https://vimeo.com/...' : 
                    'URL відео'
                  }
                />
                {errors.url && <p className="text-red-500 text-sm mt-1">{errors.url.message}</p>}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-2">Опис</label>
              <textarea
                {...register('description')}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Опис відео"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Категорія</label>
              <select
                {...register('category')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="general">Загальні</option>
                <option value="team">Команди</option>
                <option value="match">Матчі</option>
                <option value="training">Тренування</option>
                <option value="highlights">Хайлайти</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Команда (опціонально)</label>
              <select
                {...register('teamId')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Не вибрано</option>
                {teams.map((team) => (
                  <option key={team.id} value={team.id}>
                    {team.name} ({team.ageGroup.name})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Посилання на мініатюру (опціонально)</label>
              <input
                {...register('thumbnail')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="URL мініатюри відео"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Тривалість (секунди, опціонально)</label>
              <input
                type="number"
                {...register('duration')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Тривалість в секундах"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Статус публікації</label>
              <select
                {...register('published')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="true">Опубліковано</option>
                <option value="false">Приховано</option>
              </select>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                Скасувати
              </button>
              <button
                type="submit"
                disabled={saving || (watchType === 'UPLOAD' && !item && uploadedFiles.length === 0)}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 flex items-center space-x-2"
              >
                {saving && <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>}
                <span>{saving ? 'Збереження...' : item ? 'Зберегти' : 'Створити'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AdminPanel