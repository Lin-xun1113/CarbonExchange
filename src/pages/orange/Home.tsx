import { TrendingUp, Search, BarChart, Activity, Users, FileText } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const OrangeHome = () => {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [showSearchResults, setShowSearchResults] = useState(false)

  // 搜索数据库
  const searchDatabase = [
    { id: 1, type: '碳汇数据', title: '王家村碳汇项目', value: '1200吨', status: '进行中' },
    { id: 2, type: '交易记录', title: '永兴集团碳汇购买', value: '¥85000', status: '已完成' },
    { id: 3, type: '地块信息', title: '刘家湾农田', value: '50亩', status: '可用' },
    { id: 4, type: '收益报告', title: '2024年Q3收益', value: '¥520000', status: '已发布' },
    { id: 5, type: '审核项目', title: '赵家村申请', value: '待审核', status: '紧急' }
  ]

  const stats = {
    totalFlow: 12500,
    todayFlow: 380,
    yesterdayFlow: 320,
    otherFlow: 280,
    growthRate: 22
  }

  // 真实的柱形图数据（不同高度）
  const flowData = {
    labels: ['1月', '2月', '3月', '4月'],
    bars: [45, 75, 60, 90],
    values: [4500, 7500, 6000, 9000]
  }

  const pieData = [
    { label: '今日流入', value: 380, color: 'bg-green-500' },
    { label: '昨日流入', value: 320, color: 'bg-blue-500' },
    { label: '其他流入', value: 280, color: 'bg-purple-500' },
    { label: '环比增长', value: '+22%', color: 'bg-orange-500' }
  ]

  // 交易对比数据（不同高度）
  const transactionData = {
    labels: ['周一', '周二', '周三', '周四'],
    green: [35, 58, 48, 72],
    orange: [28, 45, 52, 65],
    values: [[350, 280], [580, 450], [480, 520], [720, 650]]
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    setShowSearchResults(query.length > 0)
  }

  const filteredResults = searchDatabase.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.type.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* 头部 */}
      <div className="bg-gradient-to-r from-orange-400 to-orange-500 text-white p-4">
        <h1 className="text-xl font-bold text-center">数据管理中心</h1>
      </div>

      <div className="p-4 space-y-6">
        {/* 搜索框 */}
        <div className="relative">
          <div className="bg-white rounded-lg p-3 shadow-sm">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="搜索数据、交易记录、地块信息..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-gray-700 placeholder-gray-400"
              />
            </div>
          </div>

          {/* 搜索结果 */}
          <AnimatePresence>
            {showSearchResults && filteredResults.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto"
              >
                {filteredResults.map((result) => (
                  <motion.div
                    key={result.id}
                    whileHover={{ backgroundColor: '#f3f4f6' }}
                    className="p-3 border-b cursor-pointer"
                    onClick={() => {
                      setShowSearchResults(false)
                      setSearchQuery('')
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-full">
                          {result.type}
                        </span>
                        <p className="font-medium text-sm mt-1">{result.title}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-orange-600">{result.value}</p>
                        <p className="text-xs text-gray-500">{result.status}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 实时碳汇流入 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-orange-400 to-orange-500 text-white p-4 rounded-lg"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">实时碳汇流入</h2>
            <TrendingUp size={20} />
          </div>
          
          <div className="text-3xl font-bold mb-2">{stats.totalFlow.toLocaleString()}吨</div>
          
          <div className="grid grid-cols-4 gap-2 mb-4">
            {pieData.map((item, index) => (
              <div key={index} className="text-center">
                <div className={`w-12 h-12 ${item.color} rounded-full mx-auto mb-1 flex items-center justify-center text-xs font-bold`}>
                  {typeof item.value === 'number' ? item.value : item.value}
                </div>
                <p className="text-xs">{item.label}</p>
              </div>
            ))}
          </div>

          {/* 柱形图 - 显示不同高度 */}
          <div className="bg-white/20 rounded p-3">
            <div className="flex items-end justify-between h-32">
              {flowData.bars.map((height, index) => (
                <motion.div
                  key={index}
                  className="flex-1 mx-1"
                  initial={{ height: 0 }}
                  animate={{ height: `${height}%` }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="bg-white/80 rounded-t relative h-full">
                    <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-bold">
                      {flowData.values[index]}
                    </span>
                  </div>
                  <p className="text-xs text-center mt-2">{flowData.labels[index]}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* 交易对比分析 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-4 rounded-lg shadow-lg"
        >
          <h3 className="font-semibold mb-4 flex items-center">
            <BarChart className="mr-2 text-orange-500" size={20} />
            交易对比分析
          </h3>
          
          <div className="h-48">
            <div className="flex items-end justify-between h-full">
              {transactionData.labels.map((label, index) => (
                <div key={index} className="flex-1 mx-1 flex flex-col items-center">
                  <div className="flex items-end gap-1 h-40 w-full">
                    <motion.div
                      className="flex-1 bg-green-400 rounded-t"
                      initial={{ height: 0 }}
                      animate={{ height: `${transactionData.green[index]}%` }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <span className="text-xs font-bold text-white text-center block pt-1">
                        {transactionData.values[index][0]}
                      </span>
                    </motion.div>
                    <motion.div
                      className="flex-1 bg-orange-400 rounded-t"
                      initial={{ height: 0 }}
                      animate={{ height: `${transactionData.orange[index]}%` }}
                      transition={{ delay: index * 0.1 + 0.05 }}
                    >
                      <span className="text-xs font-bold text-white text-center block pt-1">
                        {transactionData.values[index][1]}
                      </span>
                    </motion.div>
                  </div>
                  <p className="text-xs mt-2">{label}</p>
                </div>
              ))}
            </div>
            <div className="flex justify-center gap-4 mt-4">
              <span className="flex items-center text-xs">
                <span className="w-3 h-3 bg-green-400 rounded mr-1"></span> 农户交易
              </span>
              <span className="flex items-center text-xs">
                <span className="w-3 h-3 bg-orange-400 rounded mr-1"></span> 企业交易
              </span>
            </div>
          </div>
        </motion.div>

        {/* 快捷入口 */}
        <div className="grid grid-cols-3 gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/orange/manage')}
            className="bg-white p-4 rounded-lg shadow-sm text-center"
          >
            <Activity className="text-orange-500 mb-2 mx-auto" size={24} />
            <p className="text-sm">积分打包</p>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/orange/analysis')}
            className="bg-white p-4 rounded-lg shadow-sm text-center"
          >
            <Users className="text-orange-500 mb-2 mx-auto" size={24} />
            <p className="text-sm">收益分红</p>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/orange/profile')}
            className="bg-white p-4 rounded-lg shadow-sm text-center"
          >
            <FileText className="text-orange-500 mb-2 mx-auto" size={24} />
            <p className="text-sm">审核中心</p>
          </motion.button>
        </div>
      </div>
    </div>
  )
}

export default OrangeHome
