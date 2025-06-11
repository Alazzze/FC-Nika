import { Link } from 'react-router-dom'
import { Users, Trophy, Video, Calendar, UserCheck } from 'lucide-react'
import FootballAnimation from '../components/FootballAnimation'
import MatchCountdown from '../components/MatchCountdown'
import AnimatedScore from '../components/AnimatedScore'

export default function Home() {
  return (
    <div className="relative overflow-hidden">
      {/* Красивий градієнтний фон */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-yellow-50"></div>
      
      {/* Додаткові фонові елементи */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-nika-blue/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-nika-gold/5 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-nika-blue/3 rounded-full blur-2xl"></div>
      
      <div className="container relative z-10">
        {/* Футбольні анімації */}
        <FootballAnimation />
        
        {/* Hero Section */}
        <section className="text-center py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight">
              Дитячий футбольний клуб{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-nika-blue to-nika-darkBlue">
                "Ніка"
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-12 max-w-3xl mx-auto leading-relaxed">
              Розвиваємо молодих талантів, виховуємо чемпіонів та прищеплюємо любов до футболу. 
              Приєднуйтесь до нашої великої футбольної родини! ⚽
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link 
                to="/teams" 
                className="px-8 py-4 bg-gradient-to-r from-nika-blue to-nika-darkBlue text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                🏆 Наші команди
              </Link>
              <Link 
                to="/schedule" 
                className="px-8 py-4 bg-gradient-to-r from-nika-gold to-nika-lightGold text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                📅 Розклад тренувань
              </Link>
            </div>
          </div>
        </section>

        {/* Інтерактивна секція з матчами */}  
        <section className="py-16 px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Лічильник до наступного матчу */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-nika-blue/10 to-nika-darkBlue/10 rounded-2xl blur-xl"></div>
              <div className="relative bg-white/70 backdrop-blur-md rounded-2xl border border-white/30 shadow-xl">
                <MatchCountdown />
              </div>
            </div>
            
            {/* Останній результат */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-nika-gold/10 to-nika-lightGold/10 rounded-2xl blur-xl"></div>
              <div className="relative bg-white/70 backdrop-blur-md rounded-2xl border border-white/30 shadow-xl">
                <AnimatedScore 
                  homeTeam="ФК Ніка U-14"
                  awayTeam="Динамо U-14"
                  homeScore={3}
                  awayScore={1}
                  isLive={false}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Секція можливостей з покращеним дизайном */}
        <section className="py-20 px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Наші можливості
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Все необхідне для розвитку юних футболістів в одному місці
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 max-w-7xl mx-auto">
            <Link to="/teams" className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-nika-blue/20 to-nika-darkBlue/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-white/30 shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-r from-nika-blue to-nika-darkBlue rounded-full flex items-center justify-center mb-6 mx-auto">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-center">Команди</h3>
                <p className="text-gray-600 text-center text-sm leading-relaxed">
                  Перегляньте наші команди різних вікових груп та їх склади
                </p>
              </div>
            </Link>

            <Link to="/coaches" className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-nika-gold/20 to-nika-lightGold/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-white/30 shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-r from-nika-gold to-nika-lightGold rounded-full flex items-center justify-center mb-6 mx-auto">
                  <UserCheck className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-center">Тренери</h3>
                <p className="text-gray-600 text-center text-sm leading-relaxed">
                  Знайомтеся з нашими досвідченими тренерами та їх досягненнями
                </p>
              </div>
            </Link>

            <Link to="/tournaments" className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-nika-gold/20 to-nika-lightGold/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-white/30 shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-r from-nika-gold to-nika-lightGold rounded-full flex items-center justify-center mb-6 mx-auto">
                  <Trophy className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-center">Турнірні таблиці</h3>
                <p className="text-gray-600 text-center text-sm leading-relaxed">
                  Слідкуйте за результатами команд у чемпіонаті області
                </p>
              </div>
            </Link>

            <Link to="/videos" className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-nika-blue/20 to-nika-darkBlue/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-white/30 shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-r from-nika-blue to-nika-darkBlue rounded-full flex items-center justify-center mb-6 mx-auto">
                  <Video className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-center">Відеогалерея</h3>
                <p className="text-gray-600 text-center text-sm leading-relaxed">
                  Дивіться найкращі моменти матчів та тренувань
                </p>
              </div>
            </Link>

            <Link to="/schedule" className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-nika-gold/20 to-nika-lightGold/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-white/30 shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-r from-nika-gold to-nika-lightGold rounded-full flex items-center justify-center mb-6 mx-auto">
                  <Calendar className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-center">Розклад</h3>
                <p className="text-gray-600 text-center text-sm leading-relaxed">
                  Розклад тренувань та майбутніх матчів
                </p>
              </div>
            </Link>
          </div>
        </section>

        {/* Секція новин з покращеним дизайном */}
        <section className="py-20 px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Останні новини
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Будьте в курсі всіх подій клубу та досягнень наших команд
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: "Перемога команди U-12",
                text: "Наша команда U-12 здобула впевнену перемогу у матчі проти суперників зі рахунком 4:1",
                gradient: "from-green-400 to-green-600"
              },
              {
                title: "Новий тренувальний сезон",
                text: "Розпочинається новий тренувальний сезон. Запрошуємо всіх бажаючих приєднатися",
                gradient: "from-nika-blue to-nika-darkBlue"
              },
              {
                title: "Турнір вихідного дня",
                text: "Цих вихідних відбудеться турнір серед команд нашого клубу. Підтримайте наших гравців!",
                gradient: "from-nika-gold to-nika-lightGold"
              }
            ].map((news, index) => (
              <div key={index} className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-gray-100/50 to-gray-200/50 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-300"></div>
                <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl border border-white/30 shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 overflow-hidden">
                  <div className={`w-full h-48 bg-gradient-to-r ${news.gradient} relative`}>
                    <div className="absolute inset-0 bg-black/10"></div>
                    <div className="absolute bottom-4 left-4 text-white font-bold text-lg">
                      📰 НОВИНИ
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3 text-gray-900">{news.title}</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {news.text}
                    </p>
                    <Link 
                      to="/news" 
                      className="inline-flex items-center text-nika-blue hover:text-nika-darkBlue font-semibold transition-colors duration-300"
                    >
                      Читати далі →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link 
              to="/news" 
              className="px-8 py-4 bg-gradient-to-r from-nika-blue to-nika-darkBlue text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              📰 Всі новини
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
} 