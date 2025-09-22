import { ChevronRight, Award, Settings, HelpCircle, LogOut, Eye, Check, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const BlueProfile = () => {
  const navigate = useNavigate()
  const [showSupervisionModal, setShowSupervisionModal] = useState(false)
  const [showApplicationModal, setShowApplicationModal] = useState(false)
  const [showMaterialModal, setShowMaterialModal] = useState(false)
  const [selectedMaterial, setSelectedMaterial] = useState<any>(null)
  
  // 模拟待处理申请
  const [applications, setApplications] = useState([
    { id: 1, type: '农户申请', name: '张三', village: '王家村', date: '2024-09-20', status: 'pending' },
    { id: 2, type: '合作社申请', name: '李四', village: '刘家村', date: '2024-09-19', status: 'pending' },
    { id: 3, type: '企业合作', name: '绿源农业', village: '赵家村', date: '2024-09-18', status: 'pending' }
  ])

  const handleLogout = () => {
    localStorage.removeItem('selectedTheme')
    navigate('/theme')
  }

  const userInfo = {
    name: '张乔冶',
    company: '永兴集团',
    level: 'VIP',
    transactions: applications.filter(a => a.status === 'pending').length
  }

  const transactions = [
    { id: 1, date: '5月17日', type: '出售碳汇包', amount: 68, status: '+6经验', carbon: 1000 },
    { id: 2, date: '5月21日', type: '购买王家村碳汇包', desc: '花费5200元', status: '+5经验', carbon: 800 },
    { id: 3, date: '5月24日', type: '购买永兴集团碳汇包', desc: '花费8500元', status: '+5经验', carbon: 1500 },
    { id: 4, date: '5月26日', type: '出售碳汇包', amount: 55, status: '+4经验', carbon: 500 }
  ]

  const services = [
    { 
      id: 1, 
      name: '大蒜', 
      supplier: '王家村', 
      image: '🧄', 
      price: '¥3.5/斤',
      quality: '优质',
      harvest: '2024年新蒜',
      description: '无公害种植，品质优良'
    },
    { 
      id: 2, 
      name: '马铃薯', 
      supplier: '天祥运营基地', 
      image: '🥔',
      price: '¥2.8/斤',
      quality: '特级',
      harvest: '2024年秋收',
      description: '高山种植，口感细腻'
    },
    { 
      id: 3, 
      name: '胡萝卜', 
      supplier: '刘家湾', 
      image: '🥕',
      price: '¥4.2/斤',
      quality: '有机',
      harvest: '2024年新品',
      description: '有机认证，营养丰富'
    }
  ]

  // 民众监督数据
  const supervisionFeedback = [
    { id: 1, type: '环境建议', content: '建议增加碳汇项目透明度', date: '2024-09-20', status: '待处理' },
    { id: 2, type: '价格反馈', content: '碳汇价格波动较大，建议稳定机制', date: '2024-09-19', status: '已回复' },
    { id: 3, type: '服务评价', content: '平台服务响应及时，体验良好', date: '2024-09-18', status: '已采纳' }
  ]

  const handleApplication = (id: number, action: 'approve' | 'reject') => {
    setApplications(prev => 
      prev.map(app => 
        app.id === id 
          ? { ...app, status: action === 'approve' ? 'approved' : 'rejected' }
          : app
      )
    )
  }

  const handleViewAllTransactions = () => {
    navigate('/blue/transactions')
  }

  const handleTaxConsultation = () => {
    navigate('/blue/tax-consultation')
  }

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
          onClick={() => setShowSupervisionModal(true)}
          className="bg-white rounded-2xl shadow-lg p-6 cursor-pointer hover:shadow-xl transition-shadow"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Award className="text-blue-500" size={20} />
              <span className="font-semibold">民众监督</span>
            </div>
            <span className="text-sm text-blue-600 flex items-center gap-1">
              查看详情 <ChevronRight size={16} />
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 mb-1">民众意见反馈</p>
              <p className="text-sm text-gray-600">共{supervisionFeedback.length}条待处理</p>
            </div>
            <div className="flex items-center gap-2">
              <Eye className="text-gray-400" size={16} />
              <span className="text-xs text-gray-500">今日新增3条</span>
            </div>
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
            {applications.filter(app => app.status === 'pending').slice(0, 2).map(app => (
              <motion.div 
                key={app.id}
                whileHover={{ scale: 1.02 }}
                className="flex items-center justify-between bg-white/50 rounded-lg p-3"
              >
                <div>
                  <span className="text-sm font-medium">{app.type}：{app.name}</span>
                  <p className="text-xs text-gray-500">{app.village} · {app.date}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => handleApplication(app.id, 'approve')}
                    className="p-1.5 bg-green-500 text-white rounded-full hover:bg-green-600"
                  >
                    <Check size={14} />
                  </button>
                  <button 
                    onClick={() => handleApplication(app.id, 'reject')}
                    className="p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600"
                  >
                    <X size={14} />
                  </button>
                </div>
              </motion.div>
            ))}
            {applications.filter(app => app.status === 'pending').length > 2 && (
              <button
                onClick={() => setShowApplicationModal(true)}
                className="w-full text-center text-sm text-blue-600 py-2"
              >
                查看全部{applications.filter(app => app.status === 'pending').length}条申请
              </button>
            )}
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
            <button
              onClick={handleViewAllTransactions}
              className="text-sm text-blue-600"
            >
              查看全部
            </button>
          </div>
          <div className="bg-white rounded-xl p-4 space-y-3">
            {transactions.slice(0, 3).map((transaction) => (
              <motion.div 
                key={transaction.id} 
                whileHover={{ x: 5 }}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0"></div>
                  <div className="flex-1 min-w-0">
                    <span className="text-sm">{transaction.date}：{transaction.type}</span>
                    {transaction.amount && (
                      <span className="ml-1 font-bold text-blue-600">
                        赚了{transaction.amount}元
                      </span>
                    )}
                    {transaction.desc && (
                      <span className="ml-1 text-sm text-gray-500">{transaction.desc}</span>
                    )}
                    <p className="text-xs text-gray-400 mt-1">碳汇量：{transaction.carbon}吨</p>
                  </div>
                </div>
                <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full whitespace-nowrap flex-shrink-0">
                  {transaction.status}
                </span>
              </motion.div>
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
              <motion.div 
                key={service.id} 
                whileHover={{ scale: 1.05 }}
                onClick={() => {
                  setSelectedMaterial(service)
                  setShowMaterialModal(true)
                }}
                className="bg-white rounded-xl p-4 shadow-sm flex-shrink-0 cursor-pointer"
              >
                <div className="w-20 h-20 bg-blue-100 rounded-lg flex items-center justify-center mb-2">
                  <span className="text-3xl">{service.image}</span>
                </div>
                <h4 className="font-medium text-sm">{service.name}</h4>
                <p className="text-xs text-gray-500 mb-1">产地：{service.supplier}</p>
                <p className="text-xs font-semibold text-blue-600">{service.price}</p>
                <button className="text-xs text-blue-600 mt-2">了解详情 →</button>
              </motion.div>
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
            <button 
              onClick={handleTaxConsultation}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700"
            >
              去咨询
            </button>
          </div>
        </motion.div>

        {/* 退出当前身份按钮 */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          onClick={handleLogout}
          className="w-full bg-red-500 hover:bg-red-600 text-white py-4 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors"
        >
          <LogOut size={20} />
          退出当前身份
        </motion.button>
      </div>

      {/* 民众监督弹窗 */}
      <AnimatePresence>
        {showSupervisionModal && (
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
              className="bg-white rounded-2xl p-6 max-w-lg w-full max-h-[80vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold">民众监督反馈</h3>
                <button
                  onClick={() => setShowSupervisionModal(false)}
                  className="p-1 hover:bg-gray-100 rounded-full"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-4">
                {supervisionFeedback.map(feedback => (
                  <div key={feedback.id} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-blue-600">{feedback.type}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        feedback.status === '待处理' ? 'bg-yellow-100 text-yellow-600' :
                        feedback.status === '已回复' ? 'bg-blue-100 text-blue-600' :
                        'bg-green-100 text-green-600'
                      }`}>
                        {feedback.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 mb-2">{feedback.content}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">{feedback.date}</span>
                      {feedback.status === '待处理' && (
                        <button className="text-xs text-blue-600">立即处理 →</button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <button 
                className="w-full mt-4 bg-blue-500 text-white py-2 rounded-lg font-medium hover:bg-blue-600"
              >
                一键处理所有反馈
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 申请处理弹窗 */}
      <AnimatePresence>
        {showApplicationModal && (
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
              className="bg-white rounded-2xl p-6 max-w-lg w-full max-h-[80vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold">组织申请管理</h3>
                <button
                  onClick={() => setShowApplicationModal(false)}
                  className="p-1 hover:bg-gray-100 rounded-full"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-3">
                {applications.map(app => (
                  <div key={app.id} className={`p-4 rounded-lg ${
                    app.status === 'pending' ? 'bg-yellow-50 border border-yellow-200' :
                    app.status === 'approved' ? 'bg-green-50 border border-green-200' :
                    'bg-red-50 border border-red-200'
                  }`}>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{app.type}</h4>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        app.status === 'pending' ? 'bg-yellow-100 text-yellow-600' :
                        app.status === 'approved' ? 'bg-green-100 text-green-600' :
                        'bg-red-100 text-red-600'
                      }`}>
                        {app.status === 'pending' ? '待处理' :
                         app.status === 'approved' ? '已批准' : '已拒绝'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">申请人：{app.name}</p>
                    <p className="text-sm text-gray-600">来自：{app.village}</p>
                    <p className="text-xs text-gray-500 mt-1">申请时间：{app.date}</p>
                    {app.status === 'pending' && (
                      <div className="flex gap-2 mt-3">
                        <button
                          onClick={() => handleApplication(app.id, 'approve')}
                          className="flex-1 bg-green-500 text-white py-1.5 rounded-lg text-sm hover:bg-green-600"
                        >
                          批准
                        </button>
                        <button
                          onClick={() => handleApplication(app.id, 'reject')}
                          className="flex-1 bg-red-500 text-white py-1.5 rounded-lg text-sm hover:bg-red-600"
                        >
                          拒绝
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 原料详情弹窗 */}
      <AnimatePresence>
        {showMaterialModal && selectedMaterial && (
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
                <h3 className="text-lg font-bold">原料详情</h3>
                <button
                  onClick={() => setShowMaterialModal(false)}
                  className="p-1 hover:bg-gray-100 rounded-full"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="text-center mb-4">
                <div className="w-24 h-24 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <span className="text-5xl">{selectedMaterial.image}</span>
                </div>
                <h4 className="text-xl font-bold text-gray-800">{selectedMaterial.name}</h4>
                <p className="text-sm text-gray-500">产地：{selectedMaterial.supplier}</p>
              </div>

              <div className="space-y-3 bg-gray-50 rounded-lg p-4">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">价格</span>
                  <span className="font-semibold text-blue-600">{selectedMaterial.price}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">品质等级</span>
                  <span className="font-semibold">{selectedMaterial.quality}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">收获时间</span>
                  <span className="font-semibold">{selectedMaterial.harvest}</span>
                </div>
                <div>
                  <span className="text-sm text-gray-600">产品描述</span>
                  <p className="text-sm text-gray-800 mt-1">{selectedMaterial.description}</p>
                </div>
              </div>

              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => setShowMaterialModal(false)}
                  className="flex-1 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200"
                >
                  关闭
                </button>
                <button className="flex-1 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600">
                  立即采购
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default BlueProfile
