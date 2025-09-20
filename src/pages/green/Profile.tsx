import { ChevronRight, Wallet, LogOut, Settings, Award, TrendingUp, History, Star, Plus, Minus } from 'lucide-react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { usePoints } from '../../contexts/PointsContext'

const GreenProfile = () => {
  const navigate = useNavigate()
  const { points, pointsHistory } = usePoints()

  const handleLogout = () => {
    localStorage.removeItem('selectedTheme')
    navigate('/theme')
  }

  // 格式化时间
  const formatTime = (date: Date) => {
    return new Date(date).toLocaleString('zh-CN', {
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  // 获取最近的积分历史（最多显示10条）
  const recentHistory = pointsHistory.slice(-10).reverse()

  const userInfo = {
    name: '李秀兰',
    location: '甘肃省兰州市榆中县夏官营镇吴谢营村',
    level: 'V10',
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
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-bold">我的</h1>
          <button className="p-2">
            <Settings size={20} />
          </button>
        </div>

        {/* 用户信息卡片 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/20 backdrop-blur-sm rounded-2xl p-4"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-white/30 rounded-full flex items-center justify-center">
              <span className="text-2xl">👩‍🌾</span>
            </div>
            <div>
              <h2 className="text-lg font-bold">{userInfo.name}</h2>
              <p className="text-sm opacity-90">{userInfo.location}</p>
            </div>
          </div>

          {/* 积分统计 */}
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="bg-white/10 rounded-lg p-3">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Star className="text-yellow-300" size={16} />
                <p className="text-2xl font-bold">{points}</p>
              </div>
              <p className="text-xs opacity-90">总积分</p>
            </div>
            <div className="bg-white/10 rounded-lg p-3">
              <p className="text-2xl font-bold">12</p>
              <p className="text-xs opacity-90">本月打卡</p>
            </div>
            <div className="bg-white/10 rounded-lg p-3">
              <p className="text-2xl font-bold">{userInfo.level}</p>
              <p className="text-xs opacity-90">农户等级</p>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="p-4 space-y-6">
        {/* 功能菜单 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-sm mb-4"
        >
          <div className="p-4">
            <h3 className="font-bold text-gray-800 mb-4">我的功能</h3>
            
            <div className="space-y-3">
              <button 
                onClick={() => navigate('/green/achievements')}
                className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Award className="text-green-600" size={20} />
                  </div>
                  <span className="text-gray-700">成就徽章</span>
                </div>
                <ChevronRight className="text-gray-400" size={20} />
              </button>

              <button 
                onClick={() => navigate('/green/carbon-stats')}
                className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <TrendingUp className="text-green-600" size={20} />
                  </div>
                  <span className="text-gray-700">碳汇统计</span>
                </div>
                <ChevronRight className="text-gray-400" size={20} />
              </button>

              <button 
                onClick={() => navigate('/green/transaction-history')}
                className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <History className="text-green-600" size={20} />
                  </div>
                  <span className="text-gray-700">交易记录</span>
                </div>
                <ChevronRight className="text-gray-400" size={20} />
              </button>
            </div>
          </div>
        </motion.div>

        {/* 积分历史 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-sm"
        >
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-800">积分历史</h3>
              <button className="text-sm text-green-600">查看全部</button>
            </div>
            
            {recentHistory.length === 0 ? (
              <p className="text-center text-gray-400 py-8">暂无积分记录</p>
            ) : (
              <div className="space-y-3">
                {recentHistory.map((record, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full ${
                        record.type === 'add' ? 'bg-green-100' : 'bg-red-100'
                      }`}>
                        {record.type === 'add' ? (
                          <Plus className="text-green-600" size={16} />
                        ) : (
                          <Minus className="text-red-600" size={16} />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-800">{record.reason}</p>
                        <p className="text-xs text-gray-500">{formatTime(record.timestamp)}</p>
                      </div>
                    </div>
                    <span className={`font-bold ${
                      record.type === 'add' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {record.type === 'add' ? '+' : '-'}{record.amount}
                    </span>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </motion.div>

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
            <div className="text-4xl font-bold text-green-600 mb-2">{points}</div>
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

        {/* 成就展示 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-4 bg-gradient-to-r from-green-100 to-green-50 rounded-2xl p-4"
        >
          <h3 className="font-bold text-gray-800 mb-3">我的成就</h3>
          <div className="grid grid-cols-4 gap-3">
            <div className="text-center">
              <div className="text-3xl mb-1">🌱</div>
              <p className="text-xs text-gray-600">新手农户</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-1">📚</div>
              <p className="text-xs text-gray-600">知识达人</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-1">🏆</div>
              <p className="text-xs text-gray-600">打卡先锋</p>
            </div>
            <div className="text-center opacity-50">
              <div className="text-3xl mb-1">🌟</div>
              <p className="text-xs text-gray-600">未解锁</p>
            </div>
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
