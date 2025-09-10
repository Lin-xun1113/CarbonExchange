import { MapPin } from 'lucide-react'
import { motion } from 'framer-motion'

const CarbonManage = () => {
  const packages = [
    { id: 1, target: '王家村地块', recipient: '永兴集团', amount: 68, status: '已选择' },
    { id: 2, target: '刘家屯地块', recipient: '永兴集团', amount: 89, status: '已选择' },
    { id: 3, target: '郑家村地块', recipient: '昌地集团', amount: 71, status: '已选择' },
    { id: 4, target: '尹家村', recipient: '永兴集团', amount: 55, status: '已选择' }
  ]

  const chartData = {
    labels: ['3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '1', '2'],
    values: [20, 35, 45, 55, 70, 85, 95, 100, 110, 120, 130, 125]
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* 头部 */}
      <div className="bg-gradient-to-r from-orange-400 to-orange-500 text-white p-4">
        <h1 className="text-xl font-bold text-center">积分打包</h1>
      </div>

      <div className="p-4 space-y-6">
        {/* 搜索框 */}
        <div className="bg-white rounded-lg p-3 shadow-sm">
          <input
            type="text"
            placeholder="查找地块"
            className="w-full px-3 py-2 text-gray-700 placeholder-gray-400"
          />
        </div>

        {/* 地图区域 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl p-6 relative h-64"
        >
          <div className="absolute top-4 left-4">
            <h3 className="font-bold text-orange-800 mb-2">主家村地块</h3>
            <p className="text-sm text-orange-600">面积：1700㎡</p>
            <p className="text-sm text-orange-600">年季总量：850吨</p>
          </div>
          <div className="absolute bottom-4 right-4">
            <h3 className="font-bold text-orange-800 mb-2">刘家屯地块</h3>
            <p className="text-sm text-orange-600">面积：5800㎡</p>
            <p className="text-sm text-orange-600">年季总量：5120吨</p>
          </div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <MapPin className="text-orange-600" size={32} />
          </div>
        </motion.div>

        {/* 打包按钮 */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="w-full bg-orange-500 text-white py-4 rounded-xl font-bold text-lg"
        >
          {'<'} 打包
        </motion.button>

        {/* 已选择 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="font-bold mb-3">已选择：</h3>
          <div className="space-y-3">
            {packages.map((pkg) => (
              <div key={pkg.id} className="bg-white rounded-lg p-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <div>
                      <span className="text-sm font-medium">{pkg.target}</span>
                      <span className="text-sm text-gray-500 ml-2">卖给 {pkg.recipient}</span>
                      <span className="text-sm font-bold text-orange-600 ml-2">赚了 {pkg.amount}元</span>
                    </div>
                  </div>
                  <button className="text-xs bg-orange-100 text-orange-600 px-3 py-1 rounded-full">
                    取消选择
                  </button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* 全区域实时交易数据统计图 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl p-4 shadow-lg"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold">全区域实时交易数据统计图</h3>
            <span className="text-sm text-orange-600">详细数据 {'>'}</span>
          </div>
          
          <div className="h-32 flex items-end justify-around">
            {chartData.values.map((value, index) => (
              <div key={index} className="flex-1 mx-0.5 flex flex-col items-center">
                <div 
                  className="w-full bg-gradient-to-t from-orange-500 to-orange-300 rounded-t"
                  style={{ height: `${(value / 130) * 100}%` }}
                />
                <span className="text-xs text-gray-500 mt-1">{chartData.labels[index]}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default CarbonManage
