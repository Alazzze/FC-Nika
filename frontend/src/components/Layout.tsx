import { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Users, Trophy, Camera, Video, Newspaper, Calendar, UserCheck } from 'lucide-react'
import { useState } from 'react'

interface LayoutProps {
  children: ReactNode
}

const navigation = [
  { name: 'Головна', href: '/', icon: null },
  { name: 'Команди', href: '/teams', icon: Users },
  { name: 'Тренери', href: '/coaches', icon: UserCheck },
  { name: 'Турнірні таблиці', href: '/tournaments', icon: Trophy },

  { name: 'Фотогалерея', href: '/photos', icon: Camera },
  { name: 'Відеогалерея', href: '/videos', icon: Video },
  { name: 'Новини', href: '/news', icon: Newspaper },
  { name: 'Розклад', href: '/schedule', icon: Calendar },
  { name: 'Адмін', href: '/admin', className: 'bg-red-600 text-white px-2 py-1 rounded text-sm' }
]

export default function Layout({ children }: LayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-blue-100 via-blue-50 to-yellow-100">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100">
        <div className="container">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <Link to="/" className="flex items-center justify-center space-x-6 mx-auto md:mx-0">
              <div className="w-24 h-30 lg:w-32 lg:h-40">
                <div className="w-full h-full bg-nika-blue rounded-full flex items-center justify-center text-white font-bold text-xl">
                  ⚽
                </div>
              </div>
              <div className="flex flex-col justify-center text-center">
                <h1 className="text-3xl lg:text-4xl font-bold text-nika-blue leading-none mb-1">ФК "Ніка"</h1>
                <p className="text-base lg:text-lg text-gray-600 leading-tight mb-1">Дитячий футбольний клуб</p>
                <p className="text-sm lg:text-base text-nika-gold font-medium">Кропивницький</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {navigation.map((item) => {
                const Icon = item.icon
                const isActive = location.pathname === item.href
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-primary-100 text-primary-700'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    {Icon && <Icon className="w-4 h-4" />}
                    <span>{item.name}</span>
                  </Link>
                )
              })}
            </nav>

            {/* Mobile menu button */}
            <button
              type="button"
              className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200">
              <nav className="space-y-2">
                {navigation.map((item) => {
                  const Icon = item.icon
                  const isActive = location.pathname === item.href
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-primary-100 text-primary-700'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {Icon && <Icon className="w-4 h-4" />}
                      <span>{item.name}</span>
                    </Link>
                  )
                })}
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="container py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">ФК "Ніка"</h3>
              <p className="text-gray-300">
                Дитячий футбольний клуб, що розвиває молодих талантів та прищеплює любов до футболу.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Контакти</h3>
              <div className="text-gray-300 space-y-2">
                <p>Телефон: +380 XX XXX XX XX</p>
                <p>Email: info@fc-nika.ua</p>
                <p>Адреса: м. Київ, вул. Спортивна, 1</p>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Соціальні мережі</h3>
              <div className="text-gray-300 space-y-2">
                <p>Facebook</p>
                <p>Instagram</p>
                <p>Telegram</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 ФК "Ніка". Всі права захищені.</p>
          </div>
        </div>
      </footer>
    </div>
  )
} 