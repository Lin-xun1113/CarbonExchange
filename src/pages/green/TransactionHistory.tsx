import { ArrowLeft, Search, Filter, TrendingUp, TrendingDown, Calendar, Wallet } from 'lucide-react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { usePoints } from '../../contexts/PointsContext'
import { useState } from 'react'

const TransactionHistory = () => {
  const navigate = useNavigate()
  const { pointsHistory } = usePoints()
  const [filterType, setFilterType] = useState<'all' | 'add' | 'deduct'>('all')
  const [searchQuery, setSearchQuery] = useState('')

  // 过滤和搜索
  const filteredHistory = pointsHistory
    .filter(record => filterType === 'all' || record.type === filterType)
    .filter(record => record.reason.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())

  // 统计数据
  const totalEarned = pointsHistory.filter(p => p.type === 'add').reduce((sum, p) => sum + p.amount, 0)
  const totalSpent = pointsHistory.filter(p => p.type === 'deduct').reduce((sum, p) => sum + p.amount, 0)
  const transactionCount = pointsHistory.length

  // 格式化时间
  const formatTime = (date: Date) => {
    return new Date(date).toLocaleString('zh-CN', {
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  // 格式化日期（用于分组）
  const formatDate = (date: Date) => {
    const today = new Date()
    const recordDate = new Date(date)
    
    if (recordDate.toDateString() === today.toDateString()) {
      return '今天'
    }
    
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)
    if (recordDate.toDateString() === yesterday.toDateString()) {
      return '昨天'
    }
    
    return recordDate.toLocaleDateString('zh-CN', {
      month: '2-digit',
      day: '2-digit'
    })
  }

  // 按日期分组
  const groupedHistory = filteredHistory.reduce((groups, record) => {
    const dateKey = formatDate(record.timestamp)
    if (!groups[dateKey]) {
      groups[dateKey] = []
    }
    groups[dateKey].push(record)
    return groups
  }, {} as Record<string, typeof filteredHistory>)

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* 头部 */}
      <div className="bg-gradient-to-r from-green-400 to-green-500 text-white p-4">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => navigate('/green/profile')} className="p-1 hover:bg-white/20 rounded-full">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-xl font-bold">交易记录</h1>
        </div>

        {/* 搜索框 */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70" size={18} />
          <input
            type="text"
            placeholder="搜索交易记录"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white/20 rounded-lg placeholder-white/70 text-white"
          />
        </div>

        {/* 统计卡片 */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white/20 rounded-lg p-3 text-center">
            <p className="text-xs opacity-90 mb-1">总交易</p>
            <p className="text-lg font-bold">{transactionCount}</p>
            <p className="text-xs opacity-75">笔</p>
          </div>
          <div className="bg-white/20 rounded-lg p-3 text-center">
            <p className="text-xs opacity-90 mb-1">总收入</p>
            <p className="text-lg font-bold">+{totalEarned}</p>
            <p className="text-xs opacity-75">积分</p>
          </div>
          <div className="bg-white/20 rounded-lg p-3 text-center">
            <p className="text-xs opacity-90 mb-1">总支出</p>
            <p className="text-lg font-bold">-{totalSpent}</p>
            <p className="text-xs opacity-75">积分</p>
          </div>
        </div>
      </div>

      <div className="p-4">
        {/* 筛选按钮 */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setFilterType('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              filterType === 'all'
                ? 'bg-green-500 text-white'
                : 'bg-white text-gray-600 border border-gray-200'
            }`}
          >
            全部
          </button>
          <button
            onClick={() => setFilterType('add')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              filterType === 'add'
                ? 'bg-green-500 text-white'
                : 'bg-white text-gray-600 border border-gray-200'
            }`}
          >
            收入
          </button>
          <button
            onClick={() => setFilterType('deduct')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              filterType === 'deduct'
                ? 'bg-green-500 text-white'
                : 'bg-white text-gray-600 border border-gray-200'
            }`}
          >
            支出
          </button>
        </div>

        {/* 交易记录列表 */}
        {Object.keys(groupedHistory).length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Wallet className="mx-auto mb-4 text-gray-300" size={48} />
            <p className="text-gray-500">暂无交易记录</p>
          </motion.div>
        ) : (
          <div className="space-y-6">
            {Object.entries(groupedHistory).map(([date, records], groupIndex) => (
              <motion.div
                key={date}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: groupIndex * 0.1 }}
              >
                {/* 日期标题 */}
                <div className="flex items-center gap-3 mb-3">
                  <Calendar className="text-gray-400" size={16} />
                  <span className="text-sm font-medium text-gray-600">{date}</span>
                  <div className="flex-1 h-px bg-gray-200"></div>
                </div>

                {/* 当日记录 */}
                <div className="space-y-3">
                  {records.map((record, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: groupIndex * 0.1 + index * 0.05 }}
                      className="bg-white rounded-lg p-4 shadow-sm"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            record.type === 'add' ? 'bg-green-100' : 'bg-red-100'
                          }`}>
                            {record.type === 'add' ? (
                              <TrendingUp className="text-green-600" size={18} />
                            ) : (
                              <TrendingDown className="text-red-600" size={18} />
                            )}
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-800">{record.reason}</h4>
                            <p className="text-sm text-gray-500">{formatTime(record.timestamp)}</p>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <p className={`text-lg font-bold ${
                            record.type === 'add' ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {record.type === 'add' ? '+' : '-'}{record.amount}
                          </p>
                          <p className="text-xs text-gray-400">积分</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* 底部提示 */}
        {filteredHistory.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 text-center text-sm text-gray-400"
          >
            共显示 {filteredHistory.length} 条记录
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default TransactionHistory
