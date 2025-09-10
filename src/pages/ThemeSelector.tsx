// import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Leaf, Building2, BarChart3 } from 'lucide-react'

interface ThemeSelectorProps {
  onSelectTheme: (theme: 'green' | 'blue' | 'orange') => void
}

const ThemeSelector = ({ onSelectTheme }: ThemeSelectorProps) => {
  const navigate = useNavigate()

  const handleThemeSelect = (theme: 'green' | 'blue' | 'orange') => {
    onSelectTheme(theme)
    navigate(`/${theme}`)
  }

  const themes = [
    {
      id: 'green',
      title: '农业碳汇平台',
      description: '面向农户的碳汇交易与管理',
      icon: Leaf,
      gradient: 'from-green-400 to-green-600',
      buttonColor: 'bg-green-500 hover:bg-green-600',
    },
    {
      id: 'blue',
      title: 'ESG碳交易平台',
      description: '企业级碳汇交易与ESG管理',
      icon: Building2,
      gradient: 'from-blue-400 to-blue-600',
      buttonColor: 'bg-blue-500 hover:bg-blue-600',
    },
    {
      id: 'orange',
      title: '碳汇管理平台',
      description: '碳汇数据分析与综合管理',
      icon: BarChart3,
      gradient: 'from-orange-400 to-orange-600',
      buttonColor: 'bg-orange-500 hover:bg-orange-600',
    },
  ]

  return (
    <div className="theme-selector">
      <div className="px-4 py-8 pb-32">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">碳汇交易平台</h1>
          <p className="text-gray-600">请选择您要访问的平台版本</p>
        </div>

        <div className="space-y-6 max-w-md mx-auto">
          {themes.map((theme) => {
            const Icon = theme.icon
            return (
              <div
                key={theme.id}
                className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow"
              >
                <div className={`h-24 bg-gradient-to-br ${theme.gradient} flex items-center justify-center`}>
                  <Icon size={36} className="text-white" />
                </div>
                <div className="p-4">
                  <h2 className="text-xl font-bold text-gray-800 mb-2">{theme.title}</h2>
                  <p className="text-gray-600 mb-4 text-sm">{theme.description}</p>
                  <button
                    onClick={() => handleThemeSelect(theme.id as 'green' | 'blue' | 'orange')}
                    className={`w-full py-3 px-4 rounded-lg text-white font-medium transition-colors ${theme.buttonColor}`}
                  >
                    进入平台
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default ThemeSelector
