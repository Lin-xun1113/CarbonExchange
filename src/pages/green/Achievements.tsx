import { ArrowLeft, Star, Trophy, Target, CheckCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { usePoints } from '../../contexts/PointsContext'

const Achievements = () => {
  const navigate = useNavigate()
  const { pointsHistory } = usePoints()

  // 计算各种统计数据
  const totalEarned = pointsHistory.filter(p => p.type === 'add').reduce((sum, p) => sum + p.amount, 0)
  const totalSpent = pointsHistory.filter(p => p.type === 'deduct').reduce((sum, p) => sum + p.amount, 0)
  const knowledgeQuizCount = pointsHistory.filter(p => p.reason.includes('知识问答')).length
  const farmRecordCount = pointsHistory.filter(p => p.reason.includes('农事记录')).length

  const achievements = [
    {
      id: 1,
      title: '新手农户',
      description: '完成首次注册',
      icon: '🌱',
      unlocked: true,
      progress: 1,
      maxProgress: 1,
      points: 100
    },
    {
      id: 2,
      title: '知识达人',
      description: '完成5次知识问答',
      icon: '📚',
      unlocked: knowledgeQuizCount >= 5,
      progress: knowledgeQuizCount,
      maxProgress: 5,
      points: 500
    },
    {
      id: 3,
      title: '打卡先锋',
      description: '农事记录打卡10次',
      icon: '🏆',
      unlocked: farmRecordCount >= 10,
      progress: farmRecordCount,
      maxProgress: 10,
      points: 1000
    },
    {
      id: 4,
      title: '积分富豪',
      description: '累计获得10000积分',
      icon: '💰',
      unlocked: totalEarned >= 10000,
      progress: totalEarned,
      maxProgress: 10000,
      points: 2000
    },
    {
      id: 5,
      title: '消费达人',
      description: '累计消费5000积分',
      icon: '🛍️',
      unlocked: totalSpent >= 5000,
      progress: totalSpent,
      maxProgress: 5000,
      points: 800
    },
    {
      id: 6,
      title: '环保使者',
      description: '完成碳汇交易20次',
      icon: '🌍',
      unlocked: false,
      progress: 8,
      maxProgress: 20,
      points: 1500
    },
    {
      id: 7,
      title: '学习标兵',
      description: '知识问答连续通关10次',
      icon: '🎓',
      unlocked: false,
      progress: 3,
      maxProgress: 10,
      points: 1200
    },
    {
      id: 8,
      title: '碳汇专家',
      description: '完成专家认证',
      icon: '🌟',
      unlocked: false,
      progress: 0,
      maxProgress: 1,
      points: 5000
    }
  ]

  const unlockedCount = achievements.filter(a => a.unlocked).length
  const totalAchievements = achievements.length

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* 头部 */}
      <div className="bg-gradient-to-r from-green-400 to-green-500 text-white p-4">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => navigate('/green/profile')} className="p-1 hover:bg-white/20 rounded-full">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-xl font-bold">成就徽章</h1>
        </div>

        {/* 成就统计 */}
        <div className="bg-white/20 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold">总体进度</h2>
            <div className="flex items-center gap-2">
              <Trophy className="text-yellow-300" size={20} />
              <span className="font-bold">{unlockedCount}/{totalAchievements}</span>
            </div>
          </div>
          
          {/* 进度条 */}
          <div className="w-full bg-white/30 rounded-full h-3 mb-2">
            <motion.div 
              className="bg-yellow-300 h-3 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(unlockedCount / totalAchievements) * 100}%` }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          </div>
          <p className="text-sm opacity-90">已解锁 {unlockedCount} 个成就</p>
        </div>
      </div>

      <div className="p-4">
        {/* 成就列表 */}
        <div className="space-y-4">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-white rounded-xl p-4 shadow-sm ${
                achievement.unlocked 
                  ? 'border-2 border-green-200' 
                  : 'opacity-75'
              }`}
            >
              <div className="flex items-start gap-4">
                {/* 成就图标 */}
                <div className={`text-4xl p-3 rounded-full ${
                  achievement.unlocked 
                    ? 'bg-green-100' 
                    : 'bg-gray-100'
                }`}>
                  {achievement.unlocked ? achievement.icon : '🔒'}
                </div>

                {/* 成就信息 */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className={`font-bold text-lg ${
                        achievement.unlocked ? 'text-gray-800' : 'text-gray-500'
                      }`}>
                        {achievement.title}
                      </h3>
                      <p className={`text-sm ${
                        achievement.unlocked ? 'text-gray-600' : 'text-gray-400'
                      }`}>
                        {achievement.description}
                      </p>
                    </div>
                    
                    {/* 积分奖励 */}
                    <div className="text-right">
                      <div className={`flex items-center gap-1 ${
                        achievement.unlocked ? 'text-green-600' : 'text-gray-400'
                      }`}>
                        <Star size={16} />
                        <span className="font-bold">+{achievement.points}</span>
                      </div>
                      {achievement.unlocked && (
                        <div className="flex items-center gap-1 text-green-500 text-xs mt-1">
                          <CheckCircle size={12} />
                          <span>已获得</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* 进度条 */}
                  {!achievement.unlocked && achievement.maxProgress > 1 && (
                    <div>
                      <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>进度</span>
                        <span>{achievement.progress}/{achievement.maxProgress}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <motion.div 
                          className="bg-green-400 h-2 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${(achievement.progress / achievement.maxProgress) * 100}%` }}
                          transition={{ duration: 0.6, delay: index * 0.1 }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 成就提示 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-6 bg-gradient-to-r from-green-100 to-green-50 rounded-xl p-4"
        >
          <div className="flex items-center gap-3 mb-2">
            <Target className="text-green-600" size={20} />
            <h3 className="font-bold text-green-800">成就攻略</h3>
          </div>
          <ul className="text-sm text-green-700 space-y-1">
            <li>• 每日农事记录打卡可以解锁"打卡先锋"成就</li>
            <li>• 参与知识问答提升您的"知识达人"进度</li>
            <li>• 在商城兑换商品助您成为"消费达人"</li>
            <li>• 完成更多碳汇交易解锁"环保使者"徽章</li>
          </ul>
        </motion.div>
      </div>
    </div>
  )
}

export default Achievements
