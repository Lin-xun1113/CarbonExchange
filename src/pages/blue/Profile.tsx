import { ChevronRight, Award, Settings, HelpCircle } from 'lucide-react'
import { motion } from 'framer-motion'

const BlueProfile = () => {
  const userInfo = {
    name: '张乔冶',
    company: '永兴集团',
    level: 'VIP',
    transactions: 46
  }

  const transactions = [
    { date: '5月17日', type: '出售碳汇包', amount: 68, status: '+6经验' },
    { date: '5月21日', type: '购买王家村碳汇包', desc: '花费...', status: '+5经验' },
    { date: '5月24日', type: '购买永兴集团碳汇包', desc: '...', status: '+5经验' },
    { date: '5月26日', type: '出售碳汇包', amount: 55, status: '+4经验' }
  ]

  const services = [
    { id: 1, name: '大蒜', supplier: '王家村', image: '🧄', status: '了解详情' },
    { id: 2, name: '马铃薯', supplier: '天祥运营基地', image: '🥔', status: '了解详情' },
    { id: 3, name: '胡萝卜', supplier: '刘家湾', image: '🥕', status: '了解详情' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* 头部 */}
      <div className="bg-gradient-to-r from-blue-400 to-blue-500 text-white p-6">
        <h1 className="text-xl font-bold text-center mb-6">我的</h1>
        
        {/* 用户信息卡片 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/20 backdrop-blur-sm rounded-2xl p-4"
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/30 rounded-full flex items-center justify-center">
              <span className="text-2xl">👨‍💼</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold">{userInfo.name}</h2>
                <span className="bg-yellow-400 text-blue-800 px-2 py-0.5 rounded-full text-xs font-bold">
                  {userInfo.level}
                </span>
              </div>
              <p className="text-white/80 text-sm mt-1">{userInfo.company}</p>
            </div>
            <Settings className="text-white/60" size={20} />
          </div>
        </motion.div>
      </div>

      <div className="p-4 space-y-6">
        {/* 民众监督 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Award className="text-blue-500" size={20} />
              <span className="font-semibold">民众监督</span>
            </div>
            <span className="text-sm text-gray-500">一键处理</span>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 mb-1">民众意见反馈</p>
              <p className="text-sm text-gray-600">农户申请一键处理</p>
            </div>
            <ChevronRight className="text-gray-400" size={20} />
          </div>
        </motion.div>

        {/* 组织申请 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">组织申请</h3>
            <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs">
              待处理申请：{userInfo.transactions}
            </span>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between bg-white/50 rounded-lg p-3">
              <span className="text-sm">农户申请一键处理</span>
              <div className="flex items-center gap-2">
                <button className="text-green-600 text-sm">✓ 处理</button>
                <button className="text-red-600 text-sm">✗ 拒绝</button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 交易记录 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold">交易记录</h3>
            <span className="text-sm text-blue-600">查看全部</span>
          </div>
          <div className="bg-white rounded-xl p-4 space-y-3">
            {transactions.map((transaction, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  <div>
                    <span className="text-sm">{transaction.date}：{transaction.type}</span>
                    {transaction.amount && (
                      <span className="ml-1 font-bold text-blue-600">
                        赚了{transaction.amount}元
                      </span>
                    )}
                    {transaction.desc && (
                      <span className="ml-1 text-sm text-gray-500">{transaction.desc}</span>
                    )}
                  </div>
                </div>
                <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                  {transaction.status}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* 原料专供服务 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="font-semibold mb-3">原料专供服务</h3>
          <div className="flex gap-3 overflow-x-auto">
            {services.map((service) => (
              <div key={service.id} className="bg-white rounded-xl p-4 shadow-sm flex-shrink-0">
                <div className="w-20 h-20 bg-blue-100 rounded-lg flex items-center justify-center mb-2">
                  <span className="text-3xl">{service.image}</span>
                </div>
                <h4 className="font-medium text-sm">{service.name}</h4>
                <p className="text-xs text-gray-500 mb-2">产地：{service.supplier}</p>
                <button className="text-xs text-blue-600">{service.status}</button>
              </div>
            ))}
          </div>
        </motion.div>

        {/* 税收优惠咨询 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-r from-blue-100 to-blue-200 rounded-xl p-4"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <HelpCircle className="text-blue-600" size={24} />
              <div>
                <h4 className="font-semibold">税收优惠咨询</h4>
                <p className="text-sm text-blue-600">人工客服在线时间：9:00-17:30</p>
              </div>
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm">
              去咨询
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default BlueProfile
