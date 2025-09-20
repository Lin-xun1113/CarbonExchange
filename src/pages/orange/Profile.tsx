import { ChevronRight, Award, Shield, LogOut, X, CheckCircle, XCircle, Eye, Bell, Building, Users, FileText, Settings } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const OrangeProfile = () => {
  const navigate = useNavigate()
  const [showSupervisionModal, setShowSupervisionModal] = useState(false)
  const [showApplicationModal, setShowApplicationModal] = useState(false)
  const [showEnterpriseModal, setShowEnterpriseModal] = useState(false)
  const [applications, setApplications] = useState([
    { id: 1, type: '农户碳汇认证申请', applicant: '王大明', date: '2024-09-18', status: 'pending', area: '1700㎡', carbon: '850吨' },
    { id: 2, type: '村级碳汇包申请', applicant: '刘家屯委员会', date: '2024-09-17', status: 'pending', area: '5800㎡', carbon: '5120吨' },
    { id: 3, type: '碳汇项目认证', applicant: '张家湾合作社', date: '2024-09-16', status: 'pending', area: '3200㎡', carbon: '2100吨' }
  ])
  const [enterprises, setEnterprises] = useState([
    { id: 1, name: '永兴环保集团', type: '环保企业', status: 'pending', level: 'A级', certifications: ['ISO14001', '碳中和认证'], contact: '李总' },
    { id: 2, name: '昌地绿色科技', type: '科技企业', status: 'pending', level: 'B级', certifications: ['绿色企业认证'], contact: '张经理' },
    { id: 3, name: '华润碳汇投资', type: '投资企业', status: 'approved', level: 'A+级', certifications: ['ISO14001', '碳中和认证', 'ESG认证'], contact: '王总' }
  ])
  const [policies, setPolicies] = useState([
    { id: 1, name: '认证费用优惠', type: '企业认证', description: '为符合条件的企业提供认证费用减免', enabled: true },
    { id: 2, name: '配套服务优惠', type: '企业认证', description: '提供一站式服务优惠套餐', enabled: true },
    { id: 3, name: '碳汇交易手续费减免', type: '交易优惠', description: '减免碳汇交易平台手续费', enabled: false },
    { id: 4, name: '快速审核通道', type: '流程优化', description: '为优质企业提供快速审核服务', enabled: true }
  ])

  const handleLogout = () => {
    localStorage.removeItem('selectedTheme')
    navigate('/theme')
  }

  const userInfo = {
    name: '王浩',
    role: '碳汇项目总负责人', 
    level: '高级管理员',
    credits: '更多个人信息 >'
  }

  const supervisionData = [
    { id: 1, title: '碳汇数据造假举报', reporter: '匿名用户', date: '2024-09-18', status: 'pending', content: '举报某企业碳汇数据存在造假情况，请相关部门调查核实。' },
    { id: 2, title: '违规交易行为反馈', reporter: '李明', date: '2024-09-17', status: 'resolved', content: '发现平台存在违规交易行为，建议加强监管。' },
    { id: 3, title: '政策执行不到位', reporter: '张华', date: '2024-09-16', status: 'pending', content: '反映当地政策执行不到位，希望相关部门重视。' }
  ]

  const handleApplicationAction = (id: number, action: 'approve' | 'reject') => {
    setApplications(prev => 
      prev.map(app => 
        app.id === id 
          ? { ...app, status: action === 'approve' ? 'approved' : 'rejected' }
          : app
      )
    )
  }

  const handleEnterpriseAction = (id: number, action: 'approve' | 'reject') => {
    setEnterprises(prev =>
      prev.map(ent =>
        ent.id === id
          ? { ...ent, status: action === 'approve' ? 'approved' : 'rejected' }
          : ent
      )
    )
  }

  const togglePolicy = (id: number) => {
    setPolicies(prev =>
      prev.map(policy =>
        policy.id === id
          ? { ...policy, enabled: !policy.enabled }
          : policy
      )
    )
  }

  const pendingCount = applications.filter(app => app.status === 'pending').length

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* 头部 */}
      <div className="bg-gradient-to-r from-orange-400 to-orange-500 text-white p-6">
        <h1 className="text-xl font-bold text-center mb-6">管理中心</h1>
        
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
              <h2 className="text-xl font-bold">{userInfo.name}</h2>
              <p className="text-white/80 text-sm">{userInfo.role}</p>
            </div>
            <div>
              <span className="bg-yellow-400 text-orange-800 px-3 py-1 rounded-full text-xs font-bold">
                {userInfo.level}
              </span>
            </div>
          </div>
          <div className="text-right mt-3">
            <span className="text-sm text-white/70">{userInfo.credits}</span>
          </div>
        </motion.div>
      </div>

      <div className="p-4 space-y-6">
        {/* 民众监督 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg p-6 cursor-pointer"
          onClick={() => setShowSupervisionModal(true)}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Shield className="text-orange-500" size={20} />
              <span className="font-semibold">民众监督</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs">
                待处理: {supervisionData.filter(s => s.status === 'pending').length}
              </span>
              <ChevronRight className="text-gray-400" size={20} />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 mb-1">民众意见反馈</p>
              <p className="text-sm text-gray-600">点击查看详细反馈和处理进度</p>
            </div>
          </div>
        </motion.div>

        {/* 组织申请 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold flex items-center gap-2">
              <Users className="text-orange-500" size={20} />
              组织申请管理
            </h3>
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => setShowApplicationModal(true)}
              className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs flex items-center gap-1"
            >
              <Bell size={12} />
              待处理：{pendingCount}
            </motion.button>
          </div>
          
          <div className="space-y-3">
            {applications.slice(0, 2).map((request) => (
              <div key={request.id} className="flex items-center justify-between bg-white/50 rounded-lg p-3">
                <div>
                  <p className="text-sm font-medium">{request.type}</p>
                  <p className="text-xs text-gray-500">申请人：{request.applicant}</p>
                </div>
                <div className="flex items-center gap-2">
                  {request.status === 'pending' ? (
                    <>
                      <motion.button 
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleApplicationAction(request.id, 'approve')}
                        className="text-green-600 text-sm font-medium flex items-center gap-1"
                      >
                        <CheckCircle size={14} />
                        通过
                      </motion.button>
                      <motion.button 
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleApplicationAction(request.id, 'reject')}
                        className="text-red-600 text-sm font-medium flex items-center gap-1"
                      >
                        <XCircle size={14} />
                        拒绝
                      </motion.button>
                    </>
                  ) : (
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      request.status === 'approved' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                    }`}>
                      {request.status === 'approved' ? '已通过' : '已拒绝'}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* 企业审核 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl shadow-lg p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold flex items-center gap-2">
              <Building className="text-orange-500" size={20} />
              企业审核管理
            </h3>
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => setShowEnterpriseModal(true)}
              className="text-orange-600 text-sm flex items-center gap-1"
            >
              <Eye size={14} />
              查看全部
            </motion.button>
          </div>
          
          <div className="space-y-3">
            {enterprises.filter(ent => ent.status === 'pending').slice(0, 2).map((enterprise) => (
              <div key={enterprise.id} className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className="font-medium text-sm">{enterprise.name}</h4>
                    <p className="text-xs text-gray-500">{enterprise.type} • {enterprise.level} • 联系人：{enterprise.contact}</p>
                  </div>
                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      onClick={() => handleEnterpriseAction(enterprise.id, 'approve')}
                      className="bg-green-500 text-white px-3 py-1 rounded text-xs"
                    >
                      通过
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      onClick={() => handleEnterpriseAction(enterprise.id, 'reject')}
                      className="bg-red-500 text-white px-3 py-1 rounded text-xs"
                    >
                      拒绝
                    </motion.button>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1">
                  {enterprise.certifications.map((cert, idx) => (
                    <span key={idx} className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded">
                      {cert}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* 优惠政策 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl shadow-lg p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold flex items-center gap-2">
              <Settings className="text-orange-500" size={20} />
              优惠政策管理
            </h3>
            <span className="text-sm text-gray-500">
              已启用 {policies.filter(p => p.enabled).length}/{policies.length}
            </span>
          </div>
          
          <div className="space-y-3">
            {policies.map((policy) => (
              <div key={policy.id} className="bg-gray-50 rounded-lg p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Award className="text-orange-500" size={20} />
                  <div>
                    <h4 className="font-medium text-sm">{policy.name}</h4>
                    <p className="text-xs text-gray-500">{policy.description}</p>
                    <span className="text-xs text-orange-600">{policy.type}</span>
                  </div>
                </div>
                <motion.div 
                  className="relative inline-block w-12 h-6 cursor-pointer"
                  onClick={() => togglePolicy(policy.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className={`block ${policy.enabled ? 'bg-orange-500' : 'bg-gray-300'} w-full h-full rounded-full transition-colors duration-300`}></div>
                  <motion.div 
                    className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full shadow-md"
                    animate={{ x: policy.enabled ? 24 : 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                </motion.div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* 退出当前身份按钮 */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          onClick={handleLogout}
          className="w-full bg-red-500 hover:bg-red-600 text-white py-4 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors"
        >
          <LogOut size={20} />
          退出当前身份
        </motion.button>
      </div>

      {/* 民众监督详情弹窗 */}
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
              className="bg-white rounded-2xl p-6 max-w-md w-full max-h-[80vh] overflow-hidden"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold">民众监督详情</h3>
                <button
                  onClick={() => setShowSupervisionModal(false)}
                  className="p-1 hover:bg-gray-100 rounded-full"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="space-y-4 overflow-y-auto max-h-96">
                {supervisionData.map((item) => (
                  <div key={item.id} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-sm">{item.title}</h4>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        item.status === 'pending' ? 'bg-orange-100 text-orange-600' : 'bg-green-100 text-green-600'
                      }`}>
                        {item.status === 'pending' ? '待处理' : '已处理'}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 mb-2">{item.content}</p>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>举报人：{item.reporter}</span>
                      <span>{item.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 组织申请详情弹窗 */}
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
              className="bg-white rounded-2xl p-6 max-w-md w-full max-h-[80vh] overflow-hidden"
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
              
              <div className="space-y-4 overflow-y-auto max-h-96">
                {applications.map((application) => (
                  <div key={application.id} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-sm">{application.type}</h4>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        application.status === 'pending' ? 'bg-orange-100 text-orange-600' :
                        application.status === 'approved' ? 'bg-green-100 text-green-600' :
                        'bg-red-100 text-red-600'
                      }`}>
                        {application.status === 'pending' ? '待审核' :
                         application.status === 'approved' ? '已通过' : '已拒绝'}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
                      <div>
                        <span className="text-gray-500">申请人：</span>
                        <span className="font-medium">{application.applicant}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">申请日期：</span>
                        <span>{application.date}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">地块面积：</span>
                        <span>{application.area}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">碳汇量：</span>
                        <span>{application.carbon}</span>
                      </div>
                    </div>

                    {application.status === 'pending' && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleApplicationAction(application.id, 'approve')}
                          className="flex-1 bg-green-500 text-white py-2 rounded text-xs"
                        >
                          通过申请
                        </button>
                        <button
                          onClick={() => handleApplicationAction(application.id, 'reject')}
                          className="flex-1 bg-red-500 text-white py-2 rounded text-xs"
                        >
                          拒绝申请
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

      {/* 企业审核详情弹窗 */}
      <AnimatePresence>
        {showEnterpriseModal && (
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
                <h3 className="text-lg font-bold">企业审核管理</h3>
                <button
                  onClick={() => setShowEnterpriseModal(false)}
                  className="p-1 hover:bg-gray-100 rounded-full"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="space-y-4 overflow-y-auto max-h-96">
                {enterprises.map((enterprise) => (
                  <div key={enterprise.id} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-sm">{enterprise.name}</h4>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        enterprise.status === 'pending' ? 'bg-orange-100 text-orange-600' :
                        enterprise.status === 'approved' ? 'bg-green-100 text-green-600' :
                        'bg-red-100 text-red-600'
                      }`}>
                        {enterprise.status === 'pending' ? '待审核' :
                         enterprise.status === 'approved' ? '已通过' : '已拒绝'}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
                      <div>
                        <span className="text-gray-500">企业类型：</span>
                        <span className="font-medium">{enterprise.type}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">信用等级：</span>
                        <span>{enterprise.level}</span>
                      </div>
                      <div className="col-span-2">
                        <span className="text-gray-500">联系人：</span>
                        <span>{enterprise.contact}</span>
                      </div>
                    </div>

                    <div className="mb-3">
                      <span className="text-xs text-gray-500">认证资质：</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {enterprise.certifications.map((cert, idx) => (
                          <span key={idx} className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded">
                            {cert}
                          </span>
                        ))}
                      </div>
                    </div>

                    {enterprise.status === 'pending' && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEnterpriseAction(enterprise.id, 'approve')}
                          className="flex-1 bg-green-500 text-white py-2 rounded text-xs"
                        >
                          通过审核
                        </button>
                        <button
                          onClick={() => handleEnterpriseAction(enterprise.id, 'reject')}
                          className="flex-1 bg-red-500 text-white py-2 rounded text-xs"
                        >
                          拒绝审核
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
    </div>
  )
}

export default OrangeProfile
