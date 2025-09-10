import { TrendingUp } from 'lucide-react'
import { motion } from 'framer-motion'

const OrangeHome = () => {
  const stats = {
    totalFlow: 8500,
    todayFlow: 220,
    yesterdayFlow: 180,
    otherFlow: 220,
    growthRate: 18
  }

  const flowData = {
    labels: ['12', '13', '14', '15'],
    bars: [70, 85, 65, 90],
    line: [5500, 6200, 7000, 8500]
  }

  const pieData = [
    { label: '今日流入', value: 220, color: 'bg-green-500' },
    { label: '昨日流入', value: 180, color: 'bg-blue-500' },
    { label: '其他流入', value: 220, color: 'bg-purple-500' },
    { label: '环比增长', value: '+18%', color: 'bg-orange-500' }
  ]

  const transactionData = {
    labels: ['30', '54', '54', '31'],
    green: [30, 54, 54, 31],
    orange: [25, 45, 48, 28]
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* 头部 */}
      <div className="bg-gradient-to-r from-orange-400 to-orange-500 text-white p-4">
        <h1 className="text-xl font-bold text-center">首页</h1>
      </div>

      <div className="p-4 space-y-6">
        {/* 搜索框 */}
        <div className="bg-white rounded-lg p-3 shadow-sm">
          <input
            type="text"
            placeholder="搜索相关数据"
            className="w-full px-3 py-2 text-gray-700 placeholder-gray-400"
          />
        </div>

        {/* 实时碳汇流入 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-orange-400 to-orange-500 rounded-2xl p-6 text-white"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">实时碳汇交易趋势</h2>
            <TrendingUp size={24} />
          </div>
          
          {/* 柱状图和折线图组合 */}
          <div className="flex items-end justify-around h-32 mb-4 relative">
            {flowData.bars.map((height, index) => (
              <div key={index} className="flex-1 mx-1 flex flex-col items-center">
                <span className="text-xs mb-1 font-medium">{flowData.line[index]}元</span>
                <div 
                  className="w-full bg-white/30 rounded-t transition-all duration-500"
                  style={{ height: `${(height / 100) * 100}%`, minHeight: '16px' }}
                />
                <span className="text-xs mt-1 opacity-90">{flowData.labels[index]}日</span>
              </div>
            ))}
          </div>

          <div className="text-3xl font-bold mb-2">{stats.totalFlow}元</div>
          <div className="text-sm opacity-90">累计总流入</div>
        </motion.div>

        {/* 今日累计 饼图 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg p-6"
        >
          <h3 className="font-bold mb-4">今日累计：620吨</h3>
          
          <div className="flex items-center justify-center mb-4">
            <div className="relative w-40 h-40">
              <div className="absolute inset-0 rounded-full border-8 border-gray-100"></div>
              <div className="absolute inset-0 rounded-full border-8 border-green-500 border-t-transparent border-r-transparent transform rotate-45"></div>
              <div className="absolute inset-0 rounded-full border-8 border-blue-500 border-b-transparent border-l-transparent transform rotate-45"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold">620</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {pieData.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                <span className="text-sm text-gray-600">{item.label}</span>
                <span className="text-sm font-bold ml-auto">{item.value}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* 交易情况 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg p-6"
        >
          <h3 className="font-bold mb-4">交易情况</h3>
          
          <div className="h-32 flex items-end justify-around">
            {transactionData.labels.map((label, index) => (
              <div key={index} className="flex-1 mx-2 flex flex-col items-center">
                <div className="w-full flex flex-col">
                  <div 
                    className="bg-orange-400 rounded-t"
                    style={{ height: `${transactionData.orange[index]}px` }}
                  />
                  <div 
                    className="bg-green-400 rounded-b"
                    style={{ height: `${transactionData.green[index]}px` }}
                  />
                </div>
                <span className="text-xs text-gray-500 mt-2">{label}</span>
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-orange-400 rounded"></div>
              <span className="text-sm text-gray-600">买入</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-400 rounded"></div>
              <span className="text-sm text-gray-600">卖出</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default OrangeHome
