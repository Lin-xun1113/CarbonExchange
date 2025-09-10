import { useState } from 'react'
import { Search } from 'lucide-react'
import { motion } from 'framer-motion'

const CarbonMarket = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState('village')

  const villageProjects = [
    { id: 1, name: '王家村碳汇包', price: 68, amount: 1000, image: '🏘️' },
    { id: 2, name: '刘家村碳汇包', price: 89, amount: 1700, image: '🏡' }
  ]

  const enterpriseProjects = [
    { id: 1, name: '永兴集团碳汇包', price: 55, amount: 5000, image: '🏢' },
    { id: 2, name: '昌地集团碳汇包', price: 78, amount: 7500, image: '🏭' }
  ]

  const chartData = {
    labels: ['9', '10', '11', '12', '1', '2'],
    values: [30, 45, 60, 55, 70, 85]
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* 头部 */}
      <div className="bg-gradient-to-r from-blue-400 to-blue-500 text-white p-4">
        <h1 className="text-xl font-bold text-center mb-4">碳汇商城</h1>
        
        {/* 搜索框 */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="搜索碳汇包"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-full text-gray-700 bg-white/95"
          />
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* 标签切换 */}
        <div className="flex gap-4">
          <button
            onClick={() => setActiveTab('village')}
            className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'village' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            村级碳汇包
          </button>
          <button
            onClick={() => setActiveTab('enterprise')}
            className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'enterprise' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            企业级碳汇包
          </button>
        </div>

        {/* 碳汇包列表 */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold">
              {activeTab === 'village' ? '村级碳汇包' : '企业级碳汇包'}
            </h3>
            <span className="text-sm text-blue-600">右划查看更多 {'>'}</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {(activeTab === 'village' ? villageProjects : enterpriseProjects).map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden"
              >
                <div className="aspect-video bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                  <span className="text-4xl">{project.image}</span>
                </div>
                <div className="p-4">
                  <h4 className="font-semibold text-sm mb-2">{project.name}</h4>
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="text-xs text-gray-500">价格</p>
                      <p className="font-bold text-blue-600">¥{project.price}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">数量</p>
                      <p className="font-bold">{project.amount}吨</p>
                    </div>
                  </div>
                  <button className="w-full bg-blue-500 text-white py-2 rounded-lg text-sm font-medium">
                    购买
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 实时碳汇数据 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl p-4 shadow-lg"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold">实时碳汇数据</h3>
            <span className="text-sm text-blue-600">查看历史数据 {'>'}</span>
          </div>
          
          {/* 简化图表 */}
          <div className="h-40 flex items-end justify-around relative">
            {chartData.values.map((value, index) => (
              <div key={index} className="flex-1 mx-1 flex flex-col items-center">
                <span className="text-xs text-blue-600 mb-1 font-medium">{value}%</span>
                <div 
                  className="w-full bg-gradient-to-t from-blue-500 to-blue-300 rounded-t transition-all duration-700"
                  style={{ height: `${(value / 130) * 100}%`, minHeight: '12px' }}
                />
                <span className="text-xs text-gray-500 mt-2">{chartData.labels[index]}月</span>
              </div>
            ))}
          </div>
          
          <div className="mt-4 grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-xs text-gray-500">今日成交</p>
              <p className="font-bold text-blue-600">1,234吨</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">平均价格</p>
              <p className="font-bold text-green-600">¥72/吨</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">涨跌幅</p>
              <p className="font-bold text-red-600">+3.2%</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default CarbonMarket
