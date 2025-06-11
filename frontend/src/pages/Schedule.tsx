import { useState, useEffect } from 'react'
import { Calendar, Clock, MapPin } from 'lucide-react'

interface Training {
  id: string
  title: string
  description?: string
  date: string
  startTime: string
  endTime: string
  location: string
  teamId?: string
  ageGroupId?: string
  createdAt: string
}

export default function Schedule() {
  const [trainings, setTrainings] = useState<Training[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadTrainings = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/trainings')
        if (response.ok) {
          const data = await response.json()
          // Сортуємо за датою (найближчі спочатку)
          const sortedTrainings = data.sort((a: Training, b: Training) => 
            new Date(a.date).getTime() - new Date(b.date).getTime()
          )
          setTrainings(sortedTrainings)
        }
      } catch (error) {
        console.error('Помилка завантаження розкладу:', error)
      } finally {
        setLoading(false)
      }
    }

    loadTrainings()
  }, [])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('uk-UA', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const isUpcoming = (dateString: string) => {
    const trainingDate = new Date(dateString)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return trainingDate >= today
  }

  const upcomingTrainings = trainings.filter(t => isUpcoming(t.date))
  const pastTrainings = trainings.filter(t => !isUpcoming(t.date))

  if (loading) {
    return (
      <div className="container">
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Завантаження розкладу...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Розклад тренувань</h1>
        <p className="text-gray-600">Графік тренувань ФК "Ніка"</p>
      </div>

      {/* Найближчі тренування */}
      {upcomingTrainings.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
            <Calendar className="w-6 h-6 mr-2 text-blue-600" />
            Найближчі тренування
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {upcomingTrainings.map((training) => (
              <div
                key={training.id}
                className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow"
              >
                <h3 className="font-semibold text-lg text-gray-900 mb-3">
                  {training.title}
                </h3>
                
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2 text-blue-500" />
                    <span>{formatDate(training.date)}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2 text-green-500" />
                    <span>{training.startTime} - {training.endTime}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2 text-red-500" />
                    <span>{training.location}</span>
                  </div>
                </div>
                
                {training.description && (
                  <p className="mt-3 text-sm text-gray-600 bg-gray-50 p-3 rounded">
                    {training.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Минулі тренування */}
      {pastTrainings.length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
            <Calendar className="w-6 h-6 mr-2 text-gray-500" />
            Минулі тренування
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {pastTrainings.map((training) => (
              <div
                key={training.id}
                className="bg-gray-50 rounded-lg border border-gray-200 p-6 opacity-75"
              >
                <h3 className="font-semibold text-lg text-gray-700 mb-3">
                  {training.title}
                </h3>
                
                <div className="space-y-2 text-sm text-gray-500">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>{formatDate(training.date)}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>{training.startTime} - {training.endTime}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>{training.location}</span>
                  </div>
                </div>
                
                {training.description && (
                  <p className="mt-3 text-sm text-gray-500 bg-gray-100 p-3 rounded">
                    {training.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Якщо немає тренувань */}
      {trainings.length === 0 && (
        <div className="text-center py-12">
          <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Розклад порожній
          </h3>
          <p className="text-gray-600">
            Наразі немає запланованих тренувань
          </p>
        </div>
      )}
    </div>
  )
} 