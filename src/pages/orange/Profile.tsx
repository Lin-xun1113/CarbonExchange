import { ChevronRight, Award, Shield } from 'lucide-react'
import { motion } from 'framer-motion'

const OrangeProfile = () => {
  const userInfo = {
    name: '王浩',
    role: '碳汇项目总负责人',
    level: '高级管理员',
    credits: '更多个人信息 {'>'}'
  }

  const stats = {
    organizations: 46,
    pending: 46
  }

  const organizationRequests = [
    { type: '农户申请一键处理', action: '处理', reject: '拒绝' }
  ]

  const certifications = [
    { name: '环保领域', status: '选择企业', selected: false },
    { name: '诚信经营', status: '通过申请', selected: true }
  ]

  const preferenceOptions = [
    { id: 1, name: '认证费用优惠', type: '企业认证', status: '优惠企业 {'>'}' },
    { id: 2, name: '配套服务优惠', type: '企业认证', status: true }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* 头部 */}
      <div className="bg-gradient-to-r from-orange-400 to-orange-500 text-white p-6">
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
          className="bg-white rounded-2xl shadow-lg p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Shield className="text-orange-500" size={20} />
              <span className="font-semibold">民众监督</span>
            </div>
            <span className="text-sm text-gray-500">一键处理</span>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 mb-1">民众意见反馈</p>
              <p className="text-sm text-gray-600">查看意见反馈详情</p>
            </div>
            <ChevronRight className="text-gray-400" size={20} />
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
            <h3 className="font-semibold">组织申请</h3>
            <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs">
              待处理申请：{stats.pending}
            </span>
          </div>
          <div className="space-y-3">
            {organizationRequests.map((request, index) => (
              <div key={index} className="flex items-center justify-between bg-white/50 rounded-lg p-3">
                <span className="text-sm">{request.type}</span>
                <div className="flex items-center gap-2">
                  <button className="text-green-600 text-sm font-medium">✓ {request.action}</button>
                  <button className="text-red-600 text-sm font-medium">✗ {request.reject}</button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* 企业申核 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="font-semibold mb-3">企业申核</h3>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <h4 className="text-sm font-medium mb-3">社会责任认证</h4>
            <div className="space-y-3">
              {certifications.map((cert, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full border-2 ${
                      cert.selected ? 'bg-orange-500 border-orange-500' : 'border-gray-300'
                    }`}>
                      {cert.selected && (
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                      )}
                    </div>
                    <span className="text-sm">{cert.name}</span>
                  </div>
                  <button className={`text-sm ${
                    cert.selected ? 'text-orange-600' : 'text-gray-500'
                  }`}>
                    {cert.status}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* 优惠政策 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="font-semibold mb-3">优惠政策</h3>
          <div className="space-y-3">
            {preferenceOptions.map((option) => (
              <div key={option.id} className="bg-white rounded-lg p-4 shadow-sm flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Award className="text-orange-500" size={20} />
                  <div>
                    <h4 className="font-medium text-sm">{option.name}</h4>
                    <p className="text-xs text-gray-500">{option.type}</p>
                  </div>
                </div>
                {typeof option.status === 'string' ? (
                  <span className="text-sm text-orange-600">{option.status}</span>
                ) : (
                  <div className="relative inline-block w-12 h-6">
                    <input type="checkbox" className="sr-only" defaultChecked={option.status} />
                    <div className={`block ${option.status ? 'bg-orange-500' : 'bg-gray-300'} w-full h-full rounded-full transition-colors`}></div>
                    <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${
                      option.status ? 'transform translate-x-6' : ''
                    }`}></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default OrangeProfile
