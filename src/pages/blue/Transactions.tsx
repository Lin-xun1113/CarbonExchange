import { ArrowLeft, TrendingUp, TrendingDown, Filter, Calendar, Search } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useState } from 'react'

const Transactions = () => {
  const navigate = useNavigate()
  const [activeFilter, setActiveFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const transactions = [
    { 
      id: 1, 
      date: '2024-09-18', 
      time: '14:30',
      type: 'buy', 
      title: '购买王家村碳汇包', 
      amount: 5200, 
      carbon: 800,
      status: 'completed',
      experience: '+5经验',
      orderNo: 'TXN240918001'
    },
    { 
      id: 2, 
      date: '2024-09-15', 
      time: '10:15',
      type: 'sell', 
      title: '出售碳汇包', 
      amount: 6800, 
      carbon: 1000,
      status: 'completed',
      experience: '+6经验',
      orderNo: 'TXN240915002'
    },
    { 
      id: 3, 
      date: '2024-09-12', 
      time: '16:45',
      type: 'buy', 
      title: '购买永兴集团碳汇包', 
      amount: 8500, 
      carbon: 1500,
      status: 'completed',
      experience: '+5经验',
      orderNo: 'TXN240912003'
    },
    { 
      id: 4, 
      date: '2024-09-10', 
      time: '09:20',
      type: 'sell', 
      title: '出售碳汇包', 
      amount: 3500, 
      carbon: 500,
      status: 'completed',
      experience: '+4经验',
      orderNo: 'TXN240910004'
    },
    {
      id: 5,
      date: '2024-09-08',
      time: '11:30',
      type: 'buy',
      title: '购买绿源科技碳汇包',
      amount: 7200,
      carbon: 1200,
      status: 'completed',
      experience: '+5经验',
      orderNo: 'TXN240908005'
    },
    {
      id: 6,
      date: '2024-09-05',
      time: '15:10',
      type: 'buy',
      title: '购买清洁能源碳汇包',
      amount: 9600,
      carbon: 1800,
      status: 'pending',
      experience: '处理中',
      orderNo: 'TXN240905006'
    }
  ]

  // 筛选交易记录
  const filteredTransactions = transactions.filter(transaction => {
    const matchesFilter = activeFilter === 'all' || 
                         (activeFilter === 'buy' && transaction.type === 'buy') ||
                         (activeFilter === 'sell' && transaction.type === 'sell') ||
                         (activeFilter === 'pending' && transaction.status === 'pending')
    
    const matchesSearch = transaction.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         transaction.orderNo.toLowerCase().includes(searchQuery.toLowerCase())
    
    return matchesFilter && matchesSearch
  })

  // 计算统计数据
  const completedTransactions = transactions.filter(t => t.status === 'completed')
  const totalSpent = completedTransactions.filter(t => t.type === 'buy').reduce((sum, t) => sum + t.amount, 0)
  const totalEarned = completedTransactions.filter(t => t.type === 'sell').reduce((sum, t) => sum + t.amount, 0)
  const totalCarbon = completedTransactions.reduce((sum, t) => sum + t.carbon, 0)

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* 头部 */}
      <div className="bg-gradient-to-r from-blue-400 to-blue-500 text-white p-4">
        <div className="flex items-center gap-3 mb-4">
          <button 
            onClick={() => navigate(-1)}
            className="p-1 hover:bg-white/20 rounded-full"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-xl font-bold">交易记录</h1>
        </div>

        {/* 统计卡片 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-3 gap-3 mb-4"
        >
          <div className="bg-white/20 rounded-lg p-3 text-center">
            <p className="text-xs text-white/80">总支出</p>
            <p className="text-lg font-bold">¥{totalSpent.toLocaleString()}</p>
          </div>
          <div className="bg-white/20 rounded-lg p-3 text-center">
            <p className="text-xs text-white/80">总收入</p>
            <p className="text-lg font-bold">¥{totalEarned.toLocaleString()}</p>
          </div>
          <div className="bg-white/20 rounded-lg p-3 text-center">
            <p className="text-xs text-white/80">总碳汇</p>
            <p className="text-lg font-bold">{totalCarbon.toLocaleString()}吨</p>
          </div>
        </motion.div>

        {/* 搜索框 */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="搜索交易记录或订单号"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-full text-gray-700 bg-white/95"
          />
        </div>
      </div>

      <div className="p-4">
        {/* 筛选按钮 */}
        <div className="flex gap-2 mb-4 overflow-x-auto">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
              activeFilter === 'all' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            全部
          </button>
          <button
            onClick={() => setActiveFilter('buy')}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
              activeFilter === 'buy' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            购买记录
          </button>
          <button
            onClick={() => setActiveFilter('sell')}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
              activeFilter === 'sell' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            出售记录
          </button>
          <button
            onClick={() => setActiveFilter('pending')}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
              activeFilter === 'pending' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            处理中
          </button>
        </div>

        {/* 交易记录列表 */}
        <div className="space-y-3">
          {filteredTransactions.map((transaction, index) => (
            <motion.div
              key={transaction.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl p-4 shadow-sm"
            >
              <div className="flex items-start gap-3">
                {/* 交易类型图标 */}
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  transaction.type === 'buy' 
                    ? 'bg-red-100' 
                    : 'bg-green-100'
                }`}>
                  {transaction.type === 'buy' ? (
                    <TrendingDown className="text-red-600" size={20} />
                  ) : (
                    <TrendingUp className="text-green-600" size={20} />
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-800">{transaction.title}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <Calendar size={12} />
                          {transaction.date} {transaction.time}
                        </span>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          transaction.status === 'completed'
                            ? 'bg-green-100 text-green-600'
                            : 'bg-yellow-100 text-yellow-600'
                        }`}>
                          {transaction.status === 'completed' ? '已完成' : '处理中'}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-bold ${
                        transaction.type === 'buy' ? 'text-red-600' : 'text-green-600'
                      }`}>
                        {transaction.type === 'buy' ? '-' : '+'}¥{transaction.amount.toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-500">{transaction.carbon}吨碳汇</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                      订单号：{transaction.orderNo}
                    </span>
                    <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                      {transaction.experience}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredTransactions.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Filter className="text-gray-400" size={24} />
            </div>
            <p className="text-gray-500">没有找到符合条件的交易记录</p>
          </div>
        )}

        {/* 月度统计 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-4"
        >
          <h3 className="font-bold text-gray-800 mb-3">本月交易统计</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">交易次数</p>
              <p className="text-xl font-bold text-blue-600">{filteredTransactions.length}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">净收益</p>
              <p className={`text-xl font-bold ${
                totalEarned - totalSpent >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                ¥{(totalEarned - totalSpent).toLocaleString()}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Transactions
