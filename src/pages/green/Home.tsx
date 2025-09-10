import { useState } from 'react'
import { Search, ChevronRight, Leaf, BookOpen } from 'lucide-react'
import { motion } from 'framer-motion'

const GreenHome = () => {
  const [searchQuery, setSearchQuery] = useState('')

  const announcements = [
    { id: 1, title: '绿色农业政策支持', subtitle: '科学施肥享奖励', image: '🌾' },
    { id: 2, title: '碳汇知识培训', subtitle: '免费参加培训课程', image: '📚' },
  ]

  const experts = [
    { id: 1, name: '余专家', title: '农业资源与环境专业', experience: '本年度名碳解答1W+', status: '去咨询' },
    { id: 2, name: '山专家', title: '植物保护专业', experience: '本年度名碳解答1.5W', status: '去咨询' },
    { id: 3, name: '卢专家', title: '农业信息专业', experience: '本年度名碳解答2W+', status: '去咨询' },
  ]

  const knowledgeItems = [
    { id: 1, title: '绿色农业知识问答——第二期', time: '通关可得500积分', status: '去答题' },
    { id: 2, title: '农业基础知识问答——第六期', time: '通关可得300积分', status: '去答题' },
    { id: 3, title: '农业政策问答——第五期', time: '通关可得400积分', status: '去答题' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* 头部 */}
      <div className="bg-gradient-to-r from-green-400 to-green-500 text-white p-4">
        <h1 className="text-xl font-bold text-center mb-4">首页</h1>
        
        {/* 搜索框 */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="搜索相关政策"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-20 py-3 rounded-full text-gray-700 bg-white/95"
          />
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-2">
            <button className="px-3 py-1 bg-green-500 text-white rounded-full text-sm">知识</button>
            <button className="px-3 py-1 bg-gray-200 text-gray-600 rounded-full text-sm">政策</button>
            <button className="px-3 py-1 bg-gray-200 text-gray-600 rounded-full text-sm">找专家</button>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* 公告轮播 */}
        <div>
          <h2 className="text-lg font-bold mb-3">公告</h2>
          <div className="space-y-3">
            {announcements.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-4 shadow-sm flex items-center justify-between"
                style={{
                  backgroundImage: 'linear-gradient(135deg, #e6fffa 0%, #c6f6d5 100%)'
                }}
              >
                <div className="flex items-center gap-4">
                  <div className="text-3xl">{item.image}</div>
                  <div>
                    <h3 className="font-semibold text-green-800">{item.title}</h3>
                    <p className="text-sm text-green-600">{item.subtitle}</p>
                  </div>
                </div>
                <ChevronRight className="text-green-600" size={20} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* 专家答疑 */}
        <div>
          <h2 className="text-lg font-bold mb-3">专家答疑</h2>
          <div className="space-y-3">
            {experts.map((expert, index) => (
              <motion.div
                key={expert.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg p-4 shadow-sm flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Leaf className="text-green-600" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold">{expert.name}</h3>
                    <p className="text-xs text-gray-500">{expert.title}</p>
                    <p className="text-xs text-gray-400 mt-1">{expert.experience}</p>
                  </div>
                </div>
                <button className="px-4 py-1.5 bg-green-500 text-white rounded-full text-sm">
                  {expert.status}
                </button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 知识问答 */}
        <div>
          <h2 className="text-lg font-bold mb-3">知识问答</h2>
          <div className="space-y-3">
            {knowledgeItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-4 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-200 rounded-lg flex items-center justify-center">
                    <BookOpen className="text-green-700" size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium text-sm">{item.title}</h3>
                    <p className="text-xs text-gray-500 mt-1">{item.time}</p>
                  </div>
                </div>
                <button className="px-3 py-1 bg-green-500 text-white rounded-full text-xs">
                  {item.status}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default GreenHome
