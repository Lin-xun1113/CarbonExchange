import { motion } from 'framer-motion'

const DataAnalysis = () => {
  const villages = [
    { id: 1, name: '王家村碳汇包', amount: 1000, price: 68, status: '标卖', image: '🏘️' },
    { id: 2, name: '刘家屯碳汇包', amount: 1100, price: 89, status: '标卖', image: '🏡' },
    { id: 3, name: '郑家村碳汇包', amount: 950, price: 71, status: '标卖', image: '🌾' }
  ]

  const transactions = [
    { buyer: '王家村碳汇包', seller: '卖给 永兴集团', amount: 68 },
    { buyer: '刘家屯碳汇包', seller: '卖给 永兴集团', amount: 89 },
    { buyer: '昌地集团碳汇包', seller: '卖给 永兴集团', amount: 71 },
    { buyer: '郑家村 购买 永兴集团碳汇包', seller: '花费', amount: 55 }
  ]

  const revenueData = [
    { date: '5月20日', action: '收到日昌集团付款71元' },
    { date: '5月22日', action: '给客户分红50元' },
    { date: '5月23日', action: '收到普地集团付款53元' },
    { date: '5月23日', action: '收到王家村付款34元' },
    { date: '5月26日', action: '给客户分红12元' }
  ]

  const chartData = {
    labels: Array.from({length: 14}, (_, i) => i + 1),
    values: [35, 42, 48, 55, 52, 60, 65, 70, 68, 75, 72, 80, 78, 85]
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* 头部 */}
      <div className="bg-gradient-to-r from-orange-400 to-orange-500 text-white p-4">
        <h1 className="text-xl font-bold text-center">收益分红</h1>
      </div>

      <div className="p-4 space-y-6">
        {/* 搜索框 */}
        <div className="bg-white rounded-lg p-3 shadow-sm">
          <input
            type="text"
            placeholder="搜索商品"
            className="w-full px-3 py-2 text-gray-700 placeholder-gray-400"
          />
        </div>

        {/* 村级碳汇包 */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold">村级碳汇包</h3>
            <span className="text-sm text-orange-600">右划查看更多 {'>'}</span>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {villages.map((village, index) => (
              <motion.div
                key={village.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg flex-shrink-0 w-40"
              >
                <div className="aspect-square bg-gradient-to-br from-orange-100 to-orange-200 rounded-t-xl flex items-center justify-center">
                  <span className="text-4xl">{village.image}</span>
                </div>
                <div className="p-3">
                  <h4 className="font-medium text-xs mb-1">{village.name}</h4>
                  <div className="text-xs text-gray-600">
                    <p>{village.amount}吨</p>
                    <p>价格：{village.price}元</p>
                  </div>
                  <button className="w-full mt-2 bg-orange-500 text-white py-1 rounded text-xs">
                    {village.status}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 交易记录 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl p-4 shadow-lg"
        >
          <h3 className="font-bold mb-3">交易记录</h3>
          <div className="space-y-2">
            {transactions.map((trans, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span>{trans.buyer}</span>
                  <span className="text-gray-500">{trans.seller}</span>
                </div>
                <span className="font-bold text-orange-600">赚了 {trans.amount}元</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* 收益流水 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-r from-orange-100 to-orange-200 rounded-xl p-4"
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-orange-800">收益流水</h3>
            <span className="text-sm text-orange-600">查看流水记录 {'>'}</span>
          </div>
          <div className="space-y-2">
            {revenueData.map((item, index) => (
              <div key={index} className="flex items-center justify-between bg-white/50 rounded-lg p-2">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-orange-600 rounded-full"></div>
                  <span className="text-sm">{item.date}：{item.action}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* 收益流水统计 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl p-4 shadow-lg"
        >
          <h3 className="font-bold mb-4">收益流水统计：</h3>
          
          <div className="h-32 flex items-end justify-between">
            {chartData.values.map((value, index) => (
              <div key={index} className="flex-1 mx-px">
                <div 
                  className="w-full bg-gradient-to-t from-orange-500 to-orange-300 rounded-t"
                  style={{ height: `${(value / 85) * 100}%` }}
                />
              </div>
            ))}
          </div>
          
          <div className="flex justify-between mt-2 text-xs text-gray-500">
            {['9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22'].map((label, i) => (
              <span key={i}>{label}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default DataAnalysis
