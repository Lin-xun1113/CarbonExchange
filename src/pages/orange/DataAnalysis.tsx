import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { Search, ArrowRight, Eye, TrendingUp, X, Filter, Calendar, DollarSign } from 'lucide-react'

const DataAnalysis = () => {
  // const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [showAllVillages, setShowAllVillages] = useState(false)
  const [showTransactionDetail, setShowTransactionDetail] = useState(false)
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null)
  const [showRevenueModal, setShowRevenueModal] = useState(false)
  const [showBidModal, setShowBidModal] = useState(false)
  const [selectedVillage, setSelectedVillage] = useState<any>(null)
  const [bidAmount, setBidAmount] = useState('')

  // 扩展村级碳汇包数据
  const allVillages = [
    { id: 1, name: '王家村碳汇包', amount: 1000, price: 68, status: '标卖', image: '🏘️', location: '陕西省西安市', quality: '优质' },
    { id: 2, name: '刘家屯碳汇包', amount: 1100, price: 89, status: '标卖', image: '🏡', location: '河南省郑州市', quality: '特优' },
    { id: 3, name: '郑家村碳汇包', amount: 950, price: 71, status: '标卖', image: '🌾', location: '山东省济南市', quality: '优质' },
    { id: 4, name: '张家湾碳汇包', amount: 1200, price: 95, status: '竞拍中', image: '🏞️', location: '湖北省武汉市', quality: '特优' },
    { id: 5, name: '李家岭碳汇包', amount: 800, price: 56, status: '标卖', image: '⛰️', location: '四川省成都市', quality: '良好' },
    { id: 6, name: '赵家庄碳汇包', amount: 1350, price: 108, status: '已售完', image: '🌳', location: '江苏省南京市', quality: '特优' }
  ]

  const filteredVillages = allVillages.filter(village =>
    village.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    village.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    village.quality.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const displayedVillages = showAllVillages ? filteredVillages : filteredVillages.slice(0, 3)

  // 扩展交易记录数据
  const allTransactions = [
    { 
      id: 1, 
      buyer: '王家村碳汇包', 
      seller: '卖给 永兴集团', 
      amount: 68, 
      date: '2024-09-18', 
      carbon: 1000, 
      status: '已完成',
      details: '优质碳汇包，森林覆盖率85%'
    },
    { 
      id: 2, 
      buyer: '刘家屯碳汇包', 
      seller: '卖给 永兴集团', 
      amount: 89, 
      date: '2024-09-17', 
      carbon: 1100, 
      status: '已完成',
      details: '特优碳汇包，生态多样性丰富'
    },
    { 
      id: 3, 
      buyer: '昌地集团碳汇包', 
      seller: '卖给 永兴集团', 
      amount: 71, 
      date: '2024-09-16', 
      carbon: 950, 
      status: '已完成',
      details: '企业级碳汇包，验证完整'
    },
    { 
      id: 4, 
      buyer: '郑家村', 
      seller: '购买 永兴集团碳汇包', 
      amount: 55, 
      date: '2024-09-15', 
      carbon: 800, 
      status: '处理中',
      details: '村级采购，待审核确认'
    }
  ]

  // 扩展收益流水数据
  const allRevenueData = [
    { id: 1, date: '5月20日', action: '收到日昌集团付款71元', type: 'income', amount: 71 },
    { id: 2, date: '5月22日', action: '给客户分红50元', type: 'dividend', amount: 50 },
    { id: 3, date: '5月23日', action: '收到普地集团付款53元', type: 'income', amount: 53 },
    { id: 4, date: '5月23日', action: '收到王家村付款34元', type: 'income', amount: 34 },
    { id: 5, date: '5月26日', action: '给客户分红12元', type: 'dividend', amount: 12 },
    { id: 6, date: '5月27日', action: '收到张家湾付款89元', type: 'income', amount: 89 },
    { id: 7, date: '5月28日', action: '给客户分红25元', type: 'dividend', amount: 25 },
    { id: 8, date: '5月29日', action: '收到李家岭付款67元', type: 'income', amount: 67 }
  ]

  const chartData = {
    labels: Array.from({length: 14}, (_, i) => i + 9),
    values: [35, 42, 48, 55, 52, 60, 65, 70, 68, 75, 72, 80, 78, 85],
    heights: [35, 42, 48, 55, 52, 60, 65, 70, 68, 75, 72, 80, 78, 85].map(v => Math.max((v / 85) * 100, 15))
  }

  const handleViewTransaction = (transaction: any) => {
    setSelectedTransaction(transaction)
    setShowTransactionDetail(true)
  }

  const handleBid = (village: any) => {
    setSelectedVillage(village)
    setBidAmount('')
    setShowBidModal(true)
  }

  const confirmBid = () => {
    if (bidAmount && selectedVillage) {
      alert(`已提交标卖申请：${selectedVillage.name}，金额：￥${bidAmount}`)
      setShowBidModal(false)
      setBidAmount('')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* 头部 */}
      <div className="bg-gradient-to-r from-orange-400 to-orange-500 text-white p-4">
        <h1 className="text-xl font-bold text-center">收益分红管理</h1>
      </div>

      <div className="p-4 space-y-6">
        {/* 搜索框 */}
        <div className="bg-white rounded-lg p-3 shadow-sm">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="搜索商品（按名称、地点、质量搜索）"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-gray-700 placeholder-gray-400"
            />
          </div>
        </div>

        {/* 村级碳汇包 */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold flex items-center">
              <DollarSign className="mr-2 text-orange-500" size={20} />
              村级碳汇包
            </h3>
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => setShowAllVillages(!showAllVillages)}
              className="text-sm text-orange-600 flex items-center gap-1"
            >
              {showAllVillages ? '收起' : '查看更多'}
              <ArrowRight size={14} className={`transform transition-transform ${showAllVillages ? 'rotate-90' : ''}`} />
            </motion.button>
          </div>
          
          <div className={`transition-all duration-300 ${
            showAllVillages ? 'grid grid-cols-1 gap-3' : 'flex overflow-x-auto pb-2 gap-4'
          }`}>
            {displayedVillages.map((village, index) => (
              <motion.div
                key={village.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-white rounded-xl shadow-lg ${
                  showAllVillages 
                    ? 'flex items-center p-4' 
                    : 'flex-shrink-0 w-40'
                }`}
              >
                {showAllVillages ? (
                  // 展开时：横向布局
                  <>
                    <div className="w-20 h-20 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl flex items-center justify-center flex-shrink-0 mr-4">
                      <span className="text-3xl">{village.image}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-medium text-sm mb-1">{village.name}</h4>
                          <div className="text-xs text-gray-600 mb-2">
                            <p className="inline mr-2">{village.amount}吨</p>
                            <span className="inline-block bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full text-xs mr-2">
                              {village.quality}
                            </span>
                            <span className="text-orange-600 font-bold">￥{village.price}/吨</span>
                          </div>
                          <p className="text-xs text-gray-500">{village.location}</p>
                        </div>
                        <div className="flex gap-2 ml-4">
                          {village.status === '已售完' ? (
                            <button className="bg-gray-300 text-gray-600 px-3 py-1 rounded text-xs" disabled>
                              已售完
                            </button>
                          ) : (
                            <>
                              <button 
                                onClick={() => handleBid(village)}
                                className="bg-orange-500 text-white px-3 py-1 rounded text-xs"
                              >
                                {village.status === '竞拍中' ? '竞拍' : '标卖'}
                              </button>
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs"
                              >
                                <Eye size={12} />
                              </motion.button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  // 收起时：卡片布局
                  <>
                    <div className="aspect-square bg-gradient-to-br from-orange-100 to-orange-200 rounded-t-xl flex items-center justify-center">
                      <span className="text-4xl">{village.image}</span>
                    </div>
                    <div className="p-3">
                      <h4 className="font-medium text-xs mb-1">{village.name}</h4>
                      <div className="text-xs text-gray-600 mb-2">
                        <p>{village.amount}吨 • {village.quality}</p>
                        <p className="text-orange-600 font-bold">￥{village.price}/吨</p>
                        <p className="text-gray-500">{village.location}</p>
                      </div>
                      
                      <div className="flex gap-1">
                        {village.status === '已售完' ? (
                          <button className="flex-1 bg-gray-300 text-gray-600 py-1 rounded text-xs" disabled>
                            已售完
                          </button>
                        ) : (
                          <>
                            <button 
                              onClick={() => handleBid(village)}
                              className="flex-1 bg-orange-500 text-white py-1 rounded text-xs"
                            >
                              {village.status === '竞拍中' ? '竞拍' : '标卖'}
                            </button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="px-2 bg-gray-100 text-gray-600 rounded text-xs"
                            >
                              <Eye size={12} />
                            </motion.button>
                          </>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </motion.div>
            ))}
          </div>

          {searchQuery && filteredVillages.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <p>未找到相关商品</p>
            </div>
          )}
        </div>

        {/* 交易记录 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl p-4 shadow-lg"
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold flex items-center">
              <TrendingUp className="mr-2 text-orange-500" size={20} />
              交易记录
            </h3>
            <button className="text-sm text-orange-600 flex items-center gap-1">
              <Filter size={14} />
              筛选
            </button>
          </div>
          
          <div className="space-y-2">
            {allTransactions.map((trans) => (
              <motion.div 
                key={trans.id} 
                whileHover={{ backgroundColor: '#f9fafb' }}
                className="flex items-center justify-between text-sm p-2 rounded-lg cursor-pointer"
                onClick={() => handleViewTransaction(trans)}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${
                    trans.status === '已完成' ? 'bg-green-500' : 'bg-orange-500'
                  }`}></div>
                  <div>
                    <p className="font-medium">{trans.buyer}</p>
                    <p className="text-gray-500 text-xs">{trans.seller} • {trans.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-orange-600">+￥{trans.amount}</p>
                  <p className="text-xs text-gray-500">{trans.carbon}吨</p>
                </div>
              </motion.div>
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
            <h3 className="font-bold text-orange-800 flex items-center">
              <Calendar className="mr-2" size={20} />
              收益流水
            </h3>
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => setShowRevenueModal(true)}
              className="text-sm text-orange-600 flex items-center gap-1"
            >
              查看流水记录
              <ArrowRight size={14} />
            </motion.button>
          </div>
          
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {allRevenueData.slice(0, 5).map((item) => (
              <div key={item.id} className="flex items-center justify-between bg-white/50 rounded-lg p-2">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${
                    item.type === 'income' ? 'bg-green-500' : 'bg-blue-500'
                  }`}></div>
                  <span className="text-sm">{item.date}：{item.action}</span>
                </div>
                <span className={`text-sm font-medium ${
                  item.type === 'income' ? 'text-green-600' : 'text-blue-600'
                }`}>
                  {item.type === 'income' ? '+' : '-'}￥{item.amount}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-3 border-t border-white/30">
            <div className="flex justify-between text-sm text-orange-800">
              <span>本月收入：￥{allRevenueData.filter(r => r.type === 'income').reduce((sum, r) => sum + r.amount, 0)}</span>
              <span>本月分红：￥{allRevenueData.filter(r => r.type === 'dividend').reduce((sum, r) => sum + r.amount, 0)}</span>
            </div>
          </div>
        </motion.div>

        {/* 收益流水统计 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl p-4 shadow-lg"
        >
          <h3 className="font-bold mb-4">收益趋势统计</h3>
          
          <div className="h-40 flex items-end justify-between relative bg-gradient-to-t from-gray-50 to-white rounded-lg p-3">
            {chartData.heights.map((height, index) => (
              <motion.div 
                key={index} 
                className="flex-1 mx-px flex flex-col items-center cursor-pointer"
                initial={{ height: 0 }}
                animate={{ height: `${height}%` }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.1 }}
              >
                <span className="text-xs text-orange-600 mb-1 font-medium">{chartData.values[index]}</span>
                <div 
                  className="w-full bg-gradient-to-t from-orange-500 to-orange-300 rounded-t transition-all duration-300 shadow-sm hover:shadow-md"
                  style={{ height: '100%' }}
                />
              </motion.div>
            ))}
          </div>
          
          <div className="flex justify-between mt-2 text-xs text-gray-500">
            {chartData.labels.map((label, i) => (
              <span key={i}>{label}日</span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* 交易详情弹窗 */}
      <AnimatePresence>
        {showTransactionDetail && selectedTransaction && (
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
                <h3 className="text-lg font-bold">交易详情</h3>
                <button
                  onClick={() => setShowTransactionDetail(false)}
                  className="p-1 hover:bg-gray-100 rounded-full"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">{selectedTransaction.buyer}</h4>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-gray-600">交易金额</span>
                      <p className="font-bold text-orange-600">￥{selectedTransaction.amount}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">碳汇量</span>
                      <p className="font-bold text-green-600">{selectedTransaction.carbon}吨</p>
                    </div>
                    <div>
                      <span className="text-gray-600">交易日期</span>
                      <p className="font-medium">{selectedTransaction.date}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">状态</span>
                      <p className={`font-medium ${selectedTransaction.status === '已完成' ? 'text-green-600' : 'text-orange-600'}`}>
                        {selectedTransaction.status}
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t">
                    <span className="text-gray-600 text-sm">详情</span>
                    <p className="text-sm text-gray-700 mt-1">{selectedTransaction.details}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 标卖/竞拍弹窗 */}
      <AnimatePresence>
        {showBidModal && selectedVillage && (
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
                <h3 className="text-lg font-bold">
                  {selectedVillage.status === '竞拍中' ? '竞拍' : '标卖'}申请
                </h3>
                <button
                  onClick={() => setShowBidModal(false)}
                  className="p-1 hover:bg-gray-100 rounded-full"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="space-y-4 mb-6">
                <div className="bg-orange-50 p-4 rounded-lg">
                  <h4 className="font-medium">{selectedVillage.name}</h4>
                  <div className="grid grid-cols-2 gap-3 mt-2 text-sm">
                    <div>
                      <span className="text-gray-600">碳汇量</span>
                      <p className="font-bold">{selectedVillage.amount}吨</p>
                    </div>
                    <div>
                      <span className="text-gray-600">参考价格</span>
                      <p className="font-bold text-orange-600">￥{selectedVillage.price}/吨</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {selectedVillage.status === '竞拍中' ? '竞拍价格' : '标卖价格'}
                  </label>
                  <input
                    type="number"
                    value={bidAmount}
                    onChange={(e) => setBidAmount(e.target.value)}
                    placeholder="请输入价格"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowBidModal(false)}
                  className="flex-1 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium"
                >
                  取消
                </button>
                <button
                  onClick={confirmBid}
                  disabled={!bidAmount}
                  className="flex-1 py-2 bg-orange-500 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  确认{selectedVillage.status === '竞拍中' ? '竞拍' : '标卖'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 流水记录弹窗 */}
      <AnimatePresence>
        {showRevenueModal && (
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
              className="bg-white rounded-2xl p-6 max-w-md w-full max-h-[80vh] overflow-hidden"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold">完整流水记录</h3>
                <button
                  onClick={() => setShowRevenueModal(false)}
                  className="p-1 hover:bg-gray-100 rounded-full"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="space-y-3 overflow-y-auto max-h-96">
                {allRevenueData.map((item) => (
                  <div key={item.id} className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${
                        item.type === 'income' ? 'bg-green-500' : 'bg-blue-500'
                      }`}></div>
                      <div>
                        <p className="font-medium text-sm">{item.action}</p>
                        <p className="text-xs text-gray-500">{item.date}</p>
                      </div>
                    </div>
                    <span className={`font-bold ${
                      item.type === 'income' ? 'text-green-600' : 'text-blue-600'
                    }`}>
                      {item.type === 'income' ? '+' : '-'}￥{item.amount}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="bg-green-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-600">总收入</p>
                    <p className="text-lg font-bold text-green-600">
                      ￥{allRevenueData.filter(r => r.type === 'income').reduce((sum, r) => sum + r.amount, 0)}
                    </p>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-600">总分红</p>
                    <p className="text-lg font-bold text-blue-600">
                      ￥{allRevenueData.filter(r => r.type === 'dividend').reduce((sum, r) => sum + r.amount, 0)}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default DataAnalysis
