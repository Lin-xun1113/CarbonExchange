import { MapPin, Search, Package, TrendingUp, Check, X, BarChart3 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const CarbonManage = () => {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedPlots, setSelectedPlots] = useState<number[]>([])
  const [showPackageModal, setShowPackageModal] = useState(false)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [selectedChartPoint, setSelectedChartPoint] = useState<any>(null)

  // 地块数据
  const allPlots = [
    { id: 1, name: '王家村地块', area: 1700, carbon: 850, owner: '王大明', status: 'available' },
    { id: 2, name: '刘家屯地块', area: 5800, carbon: 5120, owner: '刘建国', status: 'available' },
    { id: 3, name: '郑家村地块', area: 3200, carbon: 2100, owner: '郑小华', status: 'available' },
    { id: 4, name: '尹家村地块', area: 4500, carbon: 3800, owner: '尹志强', status: 'available' },
    { id: 5, name: '赵家坡地块', area: 2800, carbon: 1900, owner: '赵明远', status: 'packaged' },
    { id: 6, name: '李家湾地块', area: 6200, carbon: 5500, owner: '李春生', status: 'available' }
  ]

  const packages = [
    { id: 1, target: '王家村地块', recipient: '永兴集团', amount: 68, status: '已选择', date: '2024-09-18' },
    { id: 2, target: '刘家屯地块', recipient: '永兴集团', amount: 89, status: '已选择', date: '2024-09-17' },
    { id: 3, target: '郑家村地块', recipient: '昌地集团', amount: 71, status: '已选择', date: '2024-09-16' },
    { id: 4, target: '尹家村', recipient: '永兴集团', amount: 55, status: '已选择', date: '2024-09-15' }
  ]

  // 交易统计数据（不同高度）
  const chartData = {
    labels: ['3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月', '1月', '2月'],
    values: [20, 35, 45, 55, 70, 85, 95, 100, 110, 120, 130, 125],
    heights: [15, 27, 35, 43, 55, 67, 75, 79, 87, 95, 100, 98],
    details: [
      { month: '3月', transactions: 20, carbon: 1200, revenue: 68000 },
      { month: '4月', transactions: 35, carbon: 2100, revenue: 119000 },
      { month: '5月', transactions: 45, carbon: 2700, revenue: 153000 },
      { month: '6月', transactions: 55, carbon: 3300, revenue: 187000 },
      { month: '7月', transactions: 70, carbon: 4200, revenue: 238000 },
      { month: '8月', transactions: 85, carbon: 5100, revenue: 289000 },
      { month: '9月', transactions: 95, carbon: 5700, revenue: 323000 },
      { month: '10月', transactions: 100, carbon: 6000, revenue: 340000 },
      { month: '11月', transactions: 110, carbon: 6600, revenue: 374000 },
      { month: '12月', transactions: 120, carbon: 7200, revenue: 408000 },
      { month: '1月', transactions: 130, carbon: 7800, revenue: 442000 },
      { month: '2月', transactions: 125, carbon: 7500, revenue: 425000 }
    ]
  }

  const filteredPlots = allPlots.filter(plot =>
    plot.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    plot.owner.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleSelectPlot = (plotId: number) => {
    setSelectedPlots(prev => {
      if (prev.includes(plotId)) {
        return prev.filter(id => id !== plotId)
      }
      return [...prev, plotId]
    })
  }

  const handlePackage = () => {
    if (selectedPlots.length > 0) {
      setShowPackageModal(true)
    }
  }

  const confirmPackage = () => {
    // 处理打包逻辑
    alert(`成功打包 ${selectedPlots.length} 个地块！`)
    setSelectedPlots([])
    setShowPackageModal(false)
  }

  const handleChartClick = (index: number) => {
    setSelectedChartPoint(chartData.details[index])
    setShowDetailModal(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* 头部 */}
      <div className="bg-gradient-to-r from-orange-400 to-orange-500 text-white p-4">
        <h1 className="text-xl font-bold text-center">积分打包管理</h1>
      </div>

      <div className="p-4 space-y-6">
        {/* 搜索框 */}
        <div className="bg-white rounded-lg p-3 shadow-sm">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="查找地块（按名称或所有者搜索）"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-gray-700 placeholder-gray-400"
            />
          </div>
        </div>

        {/* 地块列表 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-xl p-4 shadow-lg"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold flex items-center">
              <MapPin className="mr-2 text-orange-500" size={20} />
              可用地块
            </h3>
            {selectedPlots.length > 0 && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handlePackage}
                className="bg-orange-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"
              >
                <Package size={16} />
                打包 ({selectedPlots.length})
              </motion.button>
            )}
          </div>

          <div className="grid grid-cols-1 gap-3">
            {filteredPlots.map((plot) => (
              <motion.div
                key={plot.id}
                whileHover={{ scale: 1.02 }}
                className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                  selectedPlots.includes(plot.id)
                    ? 'border-orange-500 bg-orange-50'
                    : 'border-gray-200'
                } ${plot.status === 'packaged' ? 'opacity-50' : ''}`}
                onClick={() => plot.status === 'available' && handleSelectPlot(plot.id)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-gray-800">{plot.name}</h4>
                    <p className="text-sm text-gray-600">所有者：{plot.owner}</p>
                    <div className="flex gap-4 mt-2">
                      <span className="text-xs text-gray-500">面积：{plot.area}㎡</span>
                      <span className="text-xs text-gray-500">年产量：{plot.carbon}吨</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {plot.status === 'packaged' ? (
                      <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full">
                        已打包
                      </span>
                    ) : (
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        selectedPlots.includes(plot.id)
                          ? 'bg-orange-500 border-orange-500'
                          : 'border-gray-300'
                      }`}>
                        {selectedPlots.includes(plot.id) && (
                          <Check className="text-white" size={14} />
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* 打包记录 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl p-4 shadow-lg"
        >
          <h3 className="font-bold mb-4 flex items-center">
            <Package className="mr-2 text-orange-500" size={20} />
            最近打包记录
          </h3>
          
          <div className="space-y-2">
            {packages.map((pkg) => (
              <div key={pkg.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-sm">{pkg.target}</p>
                  <p className="text-xs text-gray-500">接收方：{pkg.recipient}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-orange-600">{pkg.amount}吨</p>
                  <p className="text-xs text-gray-500">{pkg.date}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* 交易统计图 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-r from-orange-400 to-orange-500 text-white rounded-xl p-4"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold flex items-center">
              <BarChart3 className="mr-2" size={20} />
              月度交易统计
            </h3>
            <TrendingUp size={20} />
          </div>
          
          {/* 柱形图 - 可点击查看详情 */}
          <div className="bg-white/20 rounded-lg p-3">
            <div className="flex items-end justify-between h-40">
              {chartData.heights.map((height, index) => (
                <motion.div
                  key={index}
                  className="flex-1 mx-0.5 cursor-pointer"
                  initial={{ height: 0 }}
                  animate={{ height: `${height}%` }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => handleChartClick(index)}
                  whileHover={{ scale: 1.1 }}
                >
                  <div className="bg-white/80 hover:bg-white rounded-t relative h-full">
                    <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-bold">
                      {chartData.values[index]}
                    </span>
                  </div>
                  <p className="text-xs text-center mt-1">{chartData.labels[index]}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="flex justify-between mt-4 text-sm">
            <span>总交易量：935笔</span>
            <span>总碳汇量：56,100吨</span>
            <span>总收益：¥3,366,000</span>
          </div>
        </motion.div>
      </div>

      {/* 打包确认弹窗 */}
      <AnimatePresence>
        {showPackageModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-6 max-w-md w-full"
            >
              <h3 className="text-lg font-bold mb-4">确认打包</h3>
              
              <div className="space-y-3 mb-6">
                <p className="text-gray-600">您选择了以下地块：</p>
                {selectedPlots.map(plotId => {
                  const plot = allPlots.find(p => p.id === plotId)
                  return plot ? (
                    <div key={plotId} className="bg-gray-50 p-3 rounded-lg">
                      <p className="font-medium">{plot.name}</p>
                      <p className="text-sm text-gray-500">碳汇量：{plot.carbon}吨</p>
                    </div>
                  ) : null
                })}
                
                <div className="border-t pt-3">
                  <p className="font-bold text-orange-600">
                    总碳汇量：{selectedPlots.reduce((sum, id) => {
                      const plot = allPlots.find(p => p.id === id)
                      return sum + (plot?.carbon || 0)
                    }, 0)}吨
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowPackageModal(false)}
                  className="flex-1 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium"
                >
                  取消
                </button>
                <button
                  onClick={confirmPackage}
                  className="flex-1 py-2 bg-orange-500 text-white rounded-lg font-medium"
                >
                  确认打包
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 交易详情弹窗 */}
      <AnimatePresence>
        {showDetailModal && selectedChartPoint && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-6 max-w-md w-full"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold">{selectedChartPoint.month}交易详情</h3>
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="p-1 hover:bg-gray-100 rounded-full"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="bg-orange-50 p-4 rounded-lg">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">交易笔数</p>
                      <p className="text-xl font-bold text-orange-600">
                        {selectedChartPoint.transactions}笔
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">碳汇总量</p>
                      <p className="text-xl font-bold text-green-600">
                        {selectedChartPoint.carbon}吨
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t">
                    <p className="text-sm text-gray-600">总收益</p>
                    <p className="text-2xl font-bold text-blue-600">
                      ¥{selectedChartPoint.revenue.toLocaleString()}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => navigate('/orange/analysis')}
                  className="w-full py-2 bg-orange-500 text-white rounded-lg font-medium"
                >
                  查看详细分析
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default CarbonManage
