import { useState } from 'react'
import { Phone, Mail, Award, Calendar, Users, Star } from 'lucide-react'

// Mock data - в реальному додатку це буде завантажуватися з API
const mockCoaches = [
  {
    id: '1',
    firstName: 'Олександр',
    lastName: 'Петренко',
    position: 'Головний тренер',
    experience: 15,
    photo: 'https://via.placeholder.com/300x400',
    biography: 'Олександр Петренко - досвідчений тренер з 15-річним стажем. Випускник Національного університету фізичного виховання і спорту України. Під його керівництвом команди неодноразово ставали чемпіонами обласних турнірів. Спеціалізується на розвитку технічних навичок у молодих футболістів.',
    phone: '+380 67 123 45 67',
    email: 'petenko@fc-nika.ua',
    achievements: 'Чемпіон області 2019, 2021, 2022. Кращий тренер року 2020.',
    team: { name: 'U-14', ageGroup: { name: 'U-14' } }
  },
  {
    id: '2',
    firstName: 'Ігор',
    lastName: 'Коваленко',
    position: 'Тренер воротарів',
    experience: 8,
    photo: 'https://via.placeholder.com/300x400',
    biography: 'Ігор Коваленко - колишній професійний воротар, який присвятив свою кар\'єру розвитку молодих талантів. Має ліцензію UEFA B і постійно підвищує свою кваліфікацію. Його вихованці регулярно потрапляють до збірних команд області.',
    phone: '+380 63 987 65 43',
    email: 'kovalenko@fc-nika.ua',
    achievements: 'Колишній гравець збірної України U-21. Тренер року серед воротарських тренерів 2021.',
    team: null
  },
  {
    id: '3',
    firstName: 'Марина',
    lastName: 'Сидорова',
    position: 'Асистент тренера',
    experience: 6,
    photo: 'https://via.placeholder.com/300x400',
    biography: 'Марина Сидорова - молодий та перспективний тренер, яка швидко зарекомендувала себе як фахівець високого рівня. Спеціалізується на фізичній підготовці та психологічній роботі з дітьми. Має освіту спортивного психолога.',
    phone: '+380 95 111 22 33',
    email: 'sidorova@fc-nika.ua',
    achievements: 'Магістр спортивної психології. Сертифікований фітнес-тренер.',
    team: { name: 'U-10', ageGroup: { name: 'U-10' } }
  },
  {
    id: '4',
    firstName: 'Андрій',
    lastName: 'Мельник',
    position: 'Головний тренер',
    experience: 12,
    photo: 'https://via.placeholder.com/300x400',
    biography: 'Андрій Мельник - досвідчений фахівець, який працює з найменшими футболістами клубу. Має особливий підхід до навчання дітей, поєднуючи ігрові методи з професійними тренуваннями. Автор методичних розробок з дитячого футболу.',
    phone: '+380 97 444 55 66',
    email: 'melnyk@fc-nika.ua',
    achievements: 'Автор 3 методичних посібників. Переможець конкурсу "Інноваційний тренер" 2020.',
    team: { name: 'U-8', ageGroup: { name: 'U-8' } }
  }
]

const positions = [
  { id: 'all', name: 'Всі тренери' },
  { id: 'Головний тренер', name: 'Головні тренери' },
  { id: 'Асистент тренера', name: 'Асистенти тренера' },
  { id: 'Тренер воротарів', name: 'Тренери воротарів' }
]

export default function Coaches() {
  const [selectedPosition, setSelectedPosition] = useState('all')

  const filteredCoaches = selectedPosition === 'all' 
    ? mockCoaches 
    : mockCoaches.filter(coach => coach.position === selectedPosition)

  const calculateAge = (dateOfBirth?: string) => {
    if (!dateOfBirth) return null
    const today = new Date()
    const birthDate = new Date(dateOfBirth)
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDifference = today.getMonth() - birthDate.getMonth()
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    return age
  }

  return (
    <div className="container">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-nika-blue mb-4">Наші тренери</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Професійна команда досвідчених тренерів, які присвятили своє життя розвитку молодих футболістів
        </p>
      </div>

      {/* Position Filter */}
      <div className="mb-12">
        <div className="flex flex-wrap gap-3 justify-center">
          {positions.map((position) => (
            <button
              key={position.id}
              onClick={() => setSelectedPosition(position.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedPosition === position.id
                  ? 'bg-nika-blue text-white shadow-lg transform scale-105'
                  : 'bg-white text-nika-blue border-2 border-nika-blue hover:bg-nika-blue hover:text-white hover:shadow-md'
              }`}
            >
              {position.name}
            </button>
          ))}
        </div>
      </div>

      {/* Coaches Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {filteredCoaches.map((coach) => (
          <div key={coach.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100">
            <div className="md:flex">
              {/* Photo */}
              <div className="md:w-1/3">
                <div className="relative">
                  <img
                    src={coach.photo}
                    alt={`${coach.firstName} ${coach.lastName}`}
                    className="w-full h-80 md:h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-nika-gold text-white px-3 py-1 rounded-full text-sm font-medium">
                    {coach.experience} років досвіду
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className="md:w-2/3 p-8">
                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-nika-blue mb-2">
                    {coach.firstName} {coach.lastName}
                  </h3>
                  <div className="flex items-center space-x-2 mb-3">
                    <Star className="w-5 h-5 text-nika-gold" />
                    <span className="text-nika-gold font-semibold text-lg">{coach.position}</span>
                  </div>
                  {coach.team && (
                    <div className="flex items-center space-x-2 mb-4">
                      <Users className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-600">Команда {coach.team.name}</span>
                    </div>
                  )}
                </div>

                <p className="text-gray-700 mb-6 leading-relaxed">
                  {coach.biography}
                </p>

                {/* Achievements */}
                {coach.achievements && (
                  <div className="mb-6">
                    <div className="flex items-center space-x-2 mb-2">
                      <Award className="w-5 h-5 text-nika-gold" />
                      <h4 className="font-semibold text-nika-blue">Досягнення</h4>
                    </div>
                    <p className="text-gray-600 text-sm bg-nika-gold bg-opacity-10 p-3 rounded-lg">
                      {coach.achievements}
                    </p>
                  </div>
                )}

                {/* Contact */}
                <div className="space-y-2">
                  <div className="flex items-center space-x-3 text-gray-600">
                    <Phone className="w-4 h-4 text-nika-blue" />
                    <a href={`tel:${coach.phone}`} className="hover:text-nika-blue transition-colors">
                      {coach.phone}
                    </a>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-600">
                    <Mail className="w-4 h-4 text-nika-blue" />
                    <a href={`mailto:${coach.email}`} className="hover:text-nika-blue transition-colors">
                      {coach.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredCoaches.length === 0 && (
        <div className="text-center py-12">
          <div className="bg-gray-50 rounded-lg p-8">
            <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">Тренерів у цій категорії поки що немає</p>
          </div>
        </div>
      )}

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-nika-blue to-nika-darkBlue rounded-2xl p-8 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">Хочете приєднатися до нашої команди?</h2>
        <p className="text-xl mb-6 opacity-90">
          Ми завжди шукаємо талановитих та досвідчених тренерів для роботи з нашими юними футболістами
        </p>
        <button className="bg-nika-gold hover:bg-nika-lightGold text-nika-blue font-bold py-3 px-8 rounded-full transition-colors duration-300 transform hover:scale-105">
          Зв'язатися з нами
        </button>
      </div>
    </div>
  )
} 