import { ChevronRight, Wallet, LogOut } from 'lucide-react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const GreenProfile = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('selectedTheme')
    navigate('/theme')
  }

  const userInfo = {
    name: '李秀兰',
    location: '甘肃省兰州市榆中县夏官营镇吴谢营村',
    level: 'V10',
    points: 5000
  }

  const recentActivities = [
    { date: '5月13日', action: '种地赚了', points: 2000, type: 'earn', status: '+6经验' },
    { date: '5月19日', action: '换化肥花了', points: 2000, type: 'spend', status: '+5经验' },
    { date: '5月20日', action: '种地赚了', points: 2000, type: 'earn', status: '+5经验' },
    { date: '5月25日', action: '换面粉花了', points: 1000, type: 'spend', status: '+4经验' },
  ]

  const chartData = {
    labels: ['12月', '13日', '14日', '15日', '16日', '17日', '18日', '19日', '20日', '21日', '22日'],
    village: [30, 35, 40, 38, 42, 45, 43, 48, 46, 50, 52],
    total: [45, 48, 50, 52, 55, 58, 60, 62, 65, 68, 70]
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* 头部 */}
      <div className="bg-gradient-to-r from-green-400 to-green-500 text-white p-6">
        <h1 className="text-xl font-bold text-center mb-6">我的</h1>
        
        {/* 用户信息卡片 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/20 backdrop-blur-sm rounded-2xl p-4"
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/30 rounded-full flex items-center justify-center">
              <span className="text-2xl">👩‍🌾</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold">{userInfo.name}</h2>
                <span className="bg-yellow-400 text-green-800 px-2 py-0.5 rounded-full text-xs font-bold">
                  {userInfo.level}
                </span>
              </div>
              <p className="text-white/80 text-sm mt-1">{userInfo.location}</p>
            </div>
            <ChevronRight className="text-white/60" size={20} />
          </div>
        </motion.div>
      </div>

      <div className="p-4 space-y-6">
        {/* 积分卡片 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Wallet className="text-green-500" size={20} />
              <span className="font-semibold">我的积分</span>
            </div>
            <span className="text-xs text-gray-500">做任务赚积分</span>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-green-600 mb-2">{userInfo.points}</div>
            <div className="text-sm text-gray-500">总积分</div>
          </div>
        </motion.div>

        {/* 积分明细 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold">积分明细</h3>
            <span className="text-sm text-green-600">历史记录</span>
          </div>
          <div className="bg-white rounded-xl p-4 space-y-3">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.type === 'earn' ? 'bg-green-500' : 'bg-orange-500'
                  }`}></div>
                  <div>
                    <span className="text-sm">{activity.date}：{activity.action}</span>
                    <span className={`ml-1 font-bold ${
                      activity.type === 'earn' ? 'text-green-600' : 'text-orange-600'
                    }`}>
                      {activity.type === 'earn' ? '+' : '-'}{activity.points}
                    </span>
                    <span className="text-sm text-gray-500"> 积分</span>
                  </div>
                </div>
                <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">
                  {activity.status}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* 积分记录图表 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl p-4"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">积分记录</h3>
            <span className="text-sm text-green-600">查看历史趋势</span>
          </div>
          <div className="text-sm text-gray-600 mb-2">村里买碳汇，分你50元</div>
          
          {/* 简化的图表 */}
          <div className="h-32 bg-gradient-to-t from-green-50 to-transparent rounded-lg flex items-end justify-around px-2 relative">
            {chartData.village.map((value, index) => (
              <div key={index} className="flex-1 mx-0.5 flex flex-col items-center">
                <span className="text-xs text-green-600 mb-1">{value}</span>
                <div 
                  className="bg-green-500 rounded-t w-full transition-all duration-500"
                  style={{ height: `${(value / 60) * 100}%`, minHeight: '8px' }}
                ></div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-xs text-gray-500">
            {chartData.labels.slice(0, 7).map((label, i) => (
              <span key={i} className="text-center">{label.replace('日', '')}</span>
            ))}
          </div>
        </motion.div>

        {/* 退出当前身份按钮 */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          onClick={handleLogout}
          className="w-full bg-red-500 hover:bg-red-600 text-white py-4 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors"
        >
          <LogOut size={20} />
          退出当前身份
        </motion.button>
      </div>
    </div>
  )
}

export default GreenProfile
