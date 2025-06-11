import { useState } from 'react'
import { Trophy, Medal, Target } from 'lucide-react'

// Mock data - в реальному додатку це буде завантажуватися з API
const ageGroups = [
  { id: '1', name: 'U-8', minAge: 6, maxAge: 8 },
  { id: '2', name: 'U-10', minAge: 9, maxAge: 10 },
  { id: '3', name: 'U-12', minAge: 11, maxAge: 12 },
  { id: '4', name: 'U-14', minAge: 13, maxAge: 14 },
  { id: '5', name: 'U-16', minAge: 15, maxAge: 16 },
]

const mockTournamentData = {
  '1': [
    { position: 1, team: 'ФК "Ника" U-8', matches: 10, wins: 8, draws: 1, losses: 1, goalsFor: 24, goalsAgainst: 8, points: 25 },
    { position: 2, team: 'Динамо U-8', matches: 10, wins: 7, draws: 2, losses: 1, goalsFor: 22, goalsAgainst: 10, points: 23 },
    { position: 3, team: 'Шахтар U-8', matches: 10, wins: 6, draws: 2, losses: 2, goalsFor: 18, goalsAgainst: 12, points: 20 },
    { position: 4, team: 'Карпати U-8', matches: 10, wins: 4, draws: 3, losses: 3, goalsFor: 15, goalsAgainst: 15, points: 15 },
    { position: 5, team: 'Зоря U-8', matches: 10, wins: 2, draws: 1, losses: 7, goalsFor: 10, goalsAgainst: 20, points: 7 },
  ],
  '2': [
    { position: 1, team: 'Динамо U-10', matches: 12, wins: 10, draws: 1, losses: 1, goalsFor: 32, goalsAgainst: 8, points: 31 },
    { position: 2, team: 'ФК "Ника" U-10', matches: 12, wins: 9, draws: 2, losses: 1, goalsFor: 28, goalsAgainst: 10, points: 29 },
    { position: 3, team: 'Шахтар U-10', matches: 12, wins: 7, draws: 3, losses: 2, goalsFor: 22, goalsAgainst: 14, points: 24 },
    { position: 4, team: 'Карпати U-10', matches: 12, wins: 5, draws: 2, losses: 5, goalsFor: 18, goalsAgainst: 18, points: 17 },
    { position: 5, team: 'Зоря U-10', matches: 12, wins: 3, draws: 1, losses: 8, goalsFor: 12, goalsAgainst: 24, points: 10 },
  ],
  '3': [
    { position: 1, team: 'ФК "Ника" U-12', matches: 14, wins: 12, draws: 1, losses: 1, goalsFor: 38, goalsAgainst: 12, points: 37 },
    { position: 2, team: 'Шахтар U-12', matches: 14, wins: 10, draws: 2, losses: 2, goalsFor: 30, goalsAgainst: 15, points: 32 },
    { position: 3, team: 'Динамо U-12', matches: 14, wins: 8, draws: 3, losses: 3, goalsFor: 26, goalsAgainst: 18, points: 27 },
    { position: 4, team: 'Карпати U-12', matches: 14, wins: 6, draws: 2, losses: 6, goalsFor: 20, goalsAgainst: 22, points: 20 },
    { position: 5, team: 'Зоря U-12', matches: 14, wins: 2, draws: 2, losses: 10, goalsFor: 14, goalsAgainst: 32, points: 8 },
  ]
}

export default function TournamentTables() {
  const [selectedAgeGroup, setSelectedAgeGroup] = useState('1')

  const currentTable = mockTournamentData[selectedAgeGroup as keyof typeof mockTournamentData] || []

  const getPositionIcon = (position: number) => {
    switch (position) {
      case 1:
        return <Trophy className="w-5 h-5 text-yellow-500" />
      case 2:
        return <Medal className="w-5 h-5 text-gray-400" />
      case 3:
        return <Medal className="w-5 h-5 text-amber-600" />
      default:
        return <Target className="w-5 h-5 text-gray-400" />
    }
  }

  const getPositionColor = (position: number) => {
    switch (position) {
      case 1:
        return 'bg-yellow-50 border-yellow-200'
      case 2:
        return 'bg-gray-50 border-gray-200'
      case 3:
        return 'bg-amber-50 border-amber-200'
      default:
        return 'bg-white border-gray-200'
    }
  }

  return (
    <div className="container">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Турнірні таблиці</h1>
        <p className="text-gray-600">Результати команд у чемпіонаті області 2023-2024</p>
      </div>

      {/* Age Group Selector */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2 justify-center">
          {ageGroups.map((group) => (
            <button
              key={group.id}
              onClick={() => setSelectedAgeGroup(group.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedAgeGroup === group.id
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
              }`}
            >
              {group.name}
            </button>
          ))}
        </div>
      </div>

      {/* Tournament Table */}
      <div className="card overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            Чемпіонат області - {ageGroups.find(g => g.id === selectedAgeGroup)?.name}
          </h2>
          <p className="text-sm text-gray-600 mt-1">Сезон 2023-2024</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Позиція
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Команда
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  І
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  В
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Н
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  П
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ГЗ
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ГП
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  РГ
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  О
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentTable.map((team) => (
                <tr
                  key={team.position}
                  className={`${getPositionColor(team.position)} border-l-4`}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      {getPositionIcon(team.position)}
                      <span className="font-medium text-gray-900">{team.position}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{team.team}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900">
                    {team.matches}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-green-600 font-medium">
                    {team.wins}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-yellow-600 font-medium">
                    {team.draws}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-red-600 font-medium">
                    {team.losses}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900">
                    {team.goalsFor}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900">
                    {team.goalsAgainst}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900">
                    {team.goalsFor - team.goalsAgainst > 0 ? '+' : ''}{team.goalsFor - team.goalsAgainst}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-bold text-primary-600">
                    {team.points}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <span className="font-medium">І</span>
              <span>- Ігри</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="font-medium">В</span>
              <span>- Виграші</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="font-medium">Н</span>
              <span>- Нічиї</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="font-medium">П</span>
              <span>- Поразки</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="font-medium">ГЗ</span>
              <span>- Голи забиті</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="font-medium">ГП</span>
              <span>- Голи пропущені</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="font-medium">РГ</span>
              <span>- Різниця голів</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="font-medium">О</span>
              <span>- Очки</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 