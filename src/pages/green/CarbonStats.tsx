import { ArrowLeft, TrendingUp, Leaf, BarChart3, Calendar, Award } from 'lucide-react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'

const CarbonStats = () => {
  const navigate = useNavigate()

  // 模拟碳汇数据
  const monthlyData = [
    { month: '1月', carbon: 120, income: 1200 },
    { month: '2月', carbon: 150, income: 1500 },
    { month: '3月', carbon: 180, income: 1800 },
    { month: '4月', carbon: 165, income: 1650 },
    { month: '5月', carbon: 200, income: 2000 },
    { month: '6月', carbon: 220, income: 2200 },
    { month: '7月', carbon: 195, income: 1950 },
    { month: '8月', carbon: 240, income: 2400 },
    { month: '9月', carbon: 210, income: 2100 }
  ]

  const carbonByType = [
    { type: '土壤固碳', amount: 450, percentage: 35 },
    { type: '植物固碳', amount: 380, percentage: 30 },
    { type: '有机肥施用', amount: 250, percentage: 20 },
    { type: '节水灌溉', amount: 190, percentage: 15 }
  ]

  const totalCarbon = carbonByType.reduce((sum, item) => sum + item.amount, 0)
  const totalIncome = monthlyData.reduce((sum, item) => sum + item.income, 0)

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* 头部 */}
      <div className="bg-gradient-to-r from-green-400 to-green-500 text-white p-4">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => navigate('/green/profile')} className="p-1 hover:bg-white/20 rounded-full">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-xl font-bold">碳汇统计</h1>
        </div>

        {/* 总体统计 */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/20 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Leaf className="text-green-200" size={20} />
              <span className="text-sm opacity-90">总碳汇量</span>
            </div>
            <p className="text-2xl font-bold">{totalCarbon}</p>
            <p className="text-xs opacity-75">吨CO₂当量</p>
          </div>
          <div className="bg-white/20 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Award className="text-yellow-300" size={20} />
              <span className="text-sm opacity-90">总收益</span>
            </div>
            <p className="text-2xl font-bold">¥{totalIncome.toLocaleString()}</p>
            <p className="text-xs opacity-75">累计收入</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* 月度趋势图 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl p-4 shadow-sm"
        >
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="text-green-600" size={20} />
            <h2 className="text-lg font-bold text-gray-800">月度碳汇趋势</h2>
          </div>
          
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="carbon" 
                  stroke="#10b981" 
                  strokeWidth={3}
                  dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* 收益趋势图 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl p-4 shadow-sm"
        >
          <div className="flex items-center gap-3 mb-4">
            <BarChart3 className="text-green-600" size={20} />
            <h2 className="text-lg font-bold text-gray-800">月度收益统计</h2>
          </div>
          
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="income" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* 碳汇类型分布 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl p-4 shadow-sm"
        >
          <div className="flex items-center gap-3 mb-4">
            <Leaf className="text-green-600" size={20} />
            <h2 className="text-lg font-bold text-gray-800">碳汇类型分布</h2>
          </div>
          
          <div className="space-y-4">
            {carbonByType.map((item, index) => (
              <motion.div
                key={item.type}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="flex items-center gap-4"
              >
                <div className="w-16 text-sm font-medium text-gray-600">
                  {item.type}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-500">{item.amount} 吨</span>
                    <span className="text-sm font-semibold text-green-600">{item.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div 
                      className="bg-green-400 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${item.percentage}%` }}
                      transition={{ duration: 0.8, delay: 0.5 + index * 0.1 }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* 本月数据卡片 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-2 gap-4"
        >
          <div className="bg-gradient-to-br from-green-100 to-green-50 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="text-green-600" size={18} />
              <span className="text-sm font-medium text-green-800">本月碳汇</span>
            </div>
            <p className="text-2xl font-bold text-green-700">210</p>
            <p className="text-xs text-green-600">吨CO₂当量</p>
            <div className="mt-2 flex items-center gap-1 text-xs text-green-600">
              <TrendingUp size={12} />
              <span>较上月 +8.7%</span>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Award className="text-blue-600" size={18} />
              <span className="text-sm font-medium text-blue-800">本月收益</span>
            </div>
            <p className="text-2xl font-bold text-blue-700">¥2,100</p>
            <p className="text-xs text-blue-600">碳汇交易收入</p>
            <div className="mt-2 flex items-center gap-1 text-xs text-blue-600">
              <TrendingUp size={12} />
              <span>较上月 +12.3%</span>
            </div>
          </div>
        </motion.div>

        {/* 环保贡献 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-r from-green-100 to-green-50 rounded-xl p-4"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="text-2xl">🌍</div>
            <h3 className="font-bold text-green-800">环保贡献</h3>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-green-600 font-medium">相当于种植</p>
              <p className="text-2xl font-bold text-green-700">{Math.round(totalCarbon * 2.3)}</p>
              <p className="text-green-600">棵成年树木</p>
            </div>
            <div>
              <p className="text-green-600 font-medium">减少排放</p>
              <p className="text-2xl font-bold text-green-700">{Math.round(totalCarbon * 0.8)}</p>
              <p className="text-green-600">辆汽车年排放</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default CarbonStats
