import { TrendingUp, Search, BarChart, Activity, FileText, PieChart, LineChart } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
// import { useNavigate } from 'react-router-dom' // 暂时未使用

const OrangeHome = () => {
  // const navigate = useNavigate() // 暂时未使用
  const [searchQuery, setSearchQuery] = useState('')
  const [showSearchResults, setShowSearchResults] = useState(false)
  const [selectedData, setSelectedData] = useState<any>(null)

  // 搜索数据库，每个项目都包含对应的图表数据
  const searchDatabase = [
    { 
      id: 1, 
      type: '碳汇数据', 
      title: '王家村碳汇项目', 
      value: '1200吨', 
      status: '进行中',
      chartData: {
        type: 'bar',
        title: '王家村月度碳汇量',
        labels: ['1月', '2月', '3月', '4月'],
        bars: [65, 80, 45, 92],
        values: [6500, 8000, 4500, 9200],
        pieData: [
          { label: '森林碳汇', value: 45, color: 'bg-green-500' },
          { label: '农田碳汇', value: 35, color: 'bg-blue-500' },
          { label: '草地碳汇', value: 20, color: 'bg-yellow-500' }
        ]
      }
    },
    { 
      id: 2, 
      type: '交易记录', 
      title: '永兴集团碳汇购买', 
      value: '¥85000', 
      status: '已完成',
      chartData: {
        type: 'transaction',
        title: '交易金额趋势',
        labels: ['周一', '周二', '周三', '周四'],
        bars: [70, 55, 85, 62],
        values: [75000, 58000, 85000, 62000],
        pieData: [
          { label: '大额交易', value: 40, color: 'bg-purple-500' },
          { label: '中等交易', value: 35, color: 'bg-indigo-500' },
          { label: '小额交易', value: 25, color: 'bg-pink-500' }
        ]
      }
    },
    { 
      id: 3, 
      type: '地块信息', 
      title: '刘家湾农田', 
      value: '50亩', 
      status: '可用',
      chartData: {
        type: 'area',
        title: '地块面积分布',
        labels: ['优质地', '良好地', '一般地', '改良地'],
        bars: [50, 75, 40, 88],
        values: [120, 180, 95, 210],
        pieData: [
          { label: '已利用', value: 60, color: 'bg-emerald-500' },
          { label: '待开发', value: 25, color: 'bg-cyan-500' },
          { label: '规划中', value: 15, color: 'bg-teal-500' }
        ]
      }
    },
    { 
      id: 4, 
      type: '收益报告', 
      title: '2024年Q3收益', 
      value: '¥520000', 
      status: '已发布',
      chartData: {
        type: 'revenue',
        title: '季度收益分析',
        labels: ['7月', '8月', '9月', '10月'],
        bars: [85, 70, 95, 78],
        values: [425000, 350000, 475000, 390000],
        pieData: [
          { label: '交易收益', value: 50, color: 'bg-rose-500' },
          { label: '管理费用', value: 30, color: 'bg-violet-500' },
          { label: '其他收入', value: 20, color: 'bg-amber-500' }
        ]
      }
    },
    { 
      id: 5, 
      type: '审核项目', 
      title: '赵家村申请', 
      value: '待审核', 
      status: '紧急',
      chartData: {
        type: 'audit',
        title: '审核进度统计',
        labels: ['待审核', '审核中', '已通过', '已拒绝'],
        bars: [30, 65, 90, 25],
        values: [15, 32, 45, 12],
        pieData: [
          { label: '农户申请', value: 45, color: 'bg-lime-500' },
          { label: '企业申请', value: 35, color: 'bg-sky-500' },
          { label: '机构申请', value: 20, color: 'bg-fuchsia-500' }
        ]
      }
    }
  ]

  const stats = {
    totalFlow: 12500,
    todayFlow: 380,
    yesterdayFlow: 320,
    otherFlow: 280,
    growthRate: 22
  }

  // 默认数据
  const defaultChartData = {
    type: 'default',
    title: '总体数据概览',
    labels: ['1月', '2月', '3月', '4月'],
    bars: [45, 75, 60, 90],
    values: [4500, 7500, 6000, 9000],
    pieData: [
      { label: '今日流入', value: 380, color: 'bg-green-500' },
      { label: '昨日流入', value: 320, color: 'bg-blue-500' },
      { label: '其他流入', value: 280, color: 'bg-purple-500' },
      { label: '环比增长', value: '+22%', color: 'bg-orange-500' }
    ]
  }

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

  const handleSelectSearchResult = (result: any) => {
    setSelectedData(result.chartData)
    setShowSearchResults(false)
    setSearchQuery('')
  }

  const filteredResults = searchDatabase.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.type.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // 当前显示的数据
  const currentData = selectedData || defaultChartData

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
                placeholder="搜索数据、交易记录、地块信息... (点击结果查看对应图表)"
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
                    onClick={() => handleSelectSearchResult(result)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-full">
                          {result.type}
                        </span>
                        <p className="font-medium text-sm mt-1">{result.title}</p>
                        <p className="text-xs text-gray-500 mt-1">点击查看 {result.chartData.title}</p>
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

        {/* 当前选择的数据提示 */}
        {selectedData && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-blue-50 border border-blue-200 rounded-lg p-3 flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-sm font-medium text-blue-800">
                当前显示：{currentData.title}
              </span>
            </div>
            <button
              onClick={() => setSelectedData(null)}
              className="text-blue-600 hover:text-blue-800 text-sm"
            >
              返回总览
            </button>
          </motion.div>
        )}

        {/* 实时碳汇流入 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-orange-400 to-orange-500 text-white p-4 rounded-lg"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">{currentData.title}</h2>
            <div className="flex items-center gap-2">
              {currentData.type === 'bar' && <BarChart size={20} />}
              {currentData.type === 'transaction' && <TrendingUp size={20} />}
              {currentData.type === 'area' && <Activity size={20} />}
              {currentData.type === 'revenue' && <PieChart size={20} />}
              {currentData.type === 'audit' && <FileText size={20} />}
              {currentData.type === 'default' && <TrendingUp size={20} />}
            </div>
          </div>
          
          {!selectedData && (
            <div className="text-3xl font-bold mb-2">{stats.totalFlow.toLocaleString()}吨</div>
          )}
          
          <div className="grid grid-cols-3 gap-2 mb-4">
            {currentData.pieData.slice(0, 3).map((item: any, index: number) => (
              <div key={index} className="text-center">
                <div className={`w-12 h-12 ${item.color} rounded-full mx-auto mb-1 flex items-center justify-center text-xs font-bold`}>
                  {typeof item.value === 'number' ? item.value : item.value}
                </div>
                <p className="text-xs">{item.label}</p>
              </div>
            ))}
          </div>

          {/* 动态柱形图 */}
          <div className="bg-white/20 rounded p-3">
            <div className="flex items-end justify-between h-32">
              {currentData.bars.map((height: number, index: number) => (
                <motion.div
                  key={`${currentData.type}-${index}`}
                  className="flex-1 mx-1"
                  initial={{ height: 0 }}
                  animate={{ height: `${height}%` }}
                  transition={{ delay: index * 0.1, duration: 0.8 }}
                >
                  <div className="bg-white/80 hover:bg-white rounded-t relative h-full transition-colors">
                    <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-bold">
                      {currentData.values[index]}
                    </span>
                  </div>
                  <p className="text-xs text-center mt-2">{currentData.labels[index]}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* 环形图数据展示 */}
        {selectedData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-4 rounded-lg shadow-lg"
          >
            <h3 className="font-semibold mb-4 flex items-center">
              <PieChart className="mr-2 text-orange-500" size={20} />
              数据分布分析
            </h3>
            
            <div className="grid grid-cols-1 gap-3">
              {currentData.pieData.map((item: any, index: number) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 ${item.color} rounded`}></div>
                    <span className="text-sm font-medium">{item.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">{typeof item.value === 'number' ? `${item.value}%` : item.value}</span>
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 ${item.color} rounded-full transition-all duration-1000`}
                        style={{ width: typeof item.value === 'number' ? `${item.value}%` : '50%' }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* 交易对比分析 - 默认显示 */}
        {!selectedData && (
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
        )}

        {/* 新增：数据统计总览 - 默认显示 */}
        {!selectedData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-green-50 to-emerald-100 p-4 rounded-lg border border-green-200"
          >
            <h3 className="font-semibold mb-4 flex items-center text-green-800">
              <Activity className="mr-2" size={20} />
              数据统计总览
            </h3>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-white/60 p-3 rounded-lg text-center">
                <div className="text-2xl font-bold text-green-600">156</div>
                <div className="text-xs text-green-700">活跃地块</div>
              </div>
              <div className="bg-white/60 p-3 rounded-lg text-center">
                <div className="text-2xl font-bold text-blue-600">89</div>
                <div className="text-xs text-blue-700">待审核项目</div>
              </div>
              <div className="bg-white/60 p-3 rounded-lg text-center">
                <div className="text-2xl font-bold text-purple-600">¥2.1M</div>
                <div className="text-xs text-purple-700">月交易额</div>
              </div>
              <div className="bg-white/60 p-3 rounded-lg text-center">
                <div className="text-2xl font-bold text-orange-600">+18%</div>
                <div className="text-xs text-orange-700">环比增长</div>
              </div>
            </div>

            {/* 环形进度图 */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: '完成率', value: 78, color: 'green' },
                { label: '效率指数', value: 92, color: 'blue' },
                { label: '满意度', value: 85, color: 'purple' }
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="relative w-16 h-16 mx-auto mb-2">
                    <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 64 64">
                      <circle
                        cx="32"
                        cy="32"
                        r="28"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                        className="text-gray-300"
                      />
                      <motion.circle
                        cx="32"
                        cy="32"
                        r="28"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                        strokeLinecap="round"
                        className={`text-${item.color}-500`}
                        initial={{ strokeDasharray: `0 ${2 * Math.PI * 28}` }}
                        animate={{ strokeDasharray: `${(item.value / 100) * (2 * Math.PI * 28)} ${2 * Math.PI * 28}` }}
                        transition={{ delay: index * 0.2, duration: 1 }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className={`text-sm font-bold text-${item.color}-600`}>{item.value}%</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600">{item.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* 修复后的趋势线图 - 选择数据时显示 */}
        {selectedData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-br from-blue-50 to-indigo-100 p-4 rounded-lg border border-blue-200"
          >
            <h3 className="font-semibold mb-4 flex items-center text-blue-800">
              <LineChart className="mr-2" size={20} />
              趋势变化分析
            </h3>
            
            <div className="h-40 relative bg-white/50 rounded-lg p-4">
              <svg className="absolute inset-4" style={{ width: 'calc(100% - 2rem)', height: 'calc(100% - 2rem)' }}>
                {/* 网格线 */}
                <defs>
                  <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e5e7eb" strokeWidth="0.5"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
                
                {/* 趋势线 */}
                <motion.polyline
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 0.5, duration: 2 }}
                  points={currentData.values.map((value: number, index: number) => {
                    const maxValue = Math.max(...currentData.values);
                    const minValue = Math.min(...currentData.values);
                    const range = maxValue - minValue || 1;
                    const x = (index / (currentData.values.length - 1)) * 100;
                    const y = 100 - ((value - minValue) / range) * 80 - 10; // 10% padding
                    return `${x}%,${y}%`;
                  }).join(' ')}
                />
                
                {/* 数据点 */}
                {currentData.values.map((value: number, index: number) => {
                  const maxValue = Math.max(...currentData.values);
                  const minValue = Math.min(...currentData.values);
                  const range = maxValue - minValue || 1;
                  const x = (index / (currentData.values.length - 1)) * 100;
                  const y = 100 - ((value - minValue) / range) * 80 - 10;
                  
                  return (
                    <motion.circle
                      key={index}
                      cx={`${x}%`}
                      cy={`${y}%`}
                      r="4"
                      fill="#3b82f6"
                      stroke="white"
                      strokeWidth="2"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.2 + 0.8 }}
                    />
                  );
                })}
                
                {/* 数值标签 */}
                {currentData.values.map((value: number, index: number) => {
                  const maxValue = Math.max(...currentData.values);
                  const minValue = Math.min(...currentData.values);
                  const range = maxValue - minValue || 1;
                  const x = (index / (currentData.values.length - 1)) * 100;
                  const y = 100 - ((value - minValue) / range) * 80 - 10;
                  
                  return (
                    <motion.text
                      key={index}
                      x={`${x}%`}
                      y={`${Math.max(y - 8, 8)}%`}
                      textAnchor="middle"
                      className="text-xs fill-blue-600 font-medium"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.2 + 1 }}
                    >
                      {typeof value === 'number' ? value.toLocaleString() : value}
                    </motion.text>
                  );
                })}
              </svg>
            </div>
            
            <div className="flex justify-between mt-4 text-xs text-blue-600">
              {currentData.labels.map((label: string, i: number) => (
                <span key={i}>{label}</span>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default OrangeHome
