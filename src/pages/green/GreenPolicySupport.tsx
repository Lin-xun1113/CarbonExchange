import { ArrowLeft, FileText, Gift, CheckCircle, Phone, Mail, MapPin } from 'lucide-react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const GreenPolicySupport = () => {
  const navigate = useNavigate()

  const handleGoBack = () => {
    navigate('/green')
  }

  const policyBenefits = [
    {
      id: 1,
      title: '科学施肥奖励',
      amount: '500-2000元',
      condition: '采用测土配方施肥技术',
      icon: '🌱'
    },
    {
      id: 2,
      title: '有机肥使用补贴',
      amount: '200元/亩',
      condition: '使用有机肥替代化肥',
      icon: '♻️'
    },
    {
      id: 3,
      title: '绿色认证奖励',
      amount: '1000-5000元',
      condition: '获得绿色农产品认证',
      icon: '🏆'
    },
    {
      id: 4,
      title: '节水灌溉补贴',
      amount: '300元/亩',
      condition: '采用滴灌、喷灌等节水技术',
      icon: '💧'
    }
  ]

  const applicationSteps = [
    {
      step: 1,
      title: '在线申请',
      description: '登录农业部门官网，填写申请表格',
      status: 'completed'
    },
    {
      step: 2,
      title: '材料审核',
      description: '提交相关证明材料，等待审核',
      status: 'current'
    },
    {
      step: 3,
      title: '实地验收',
      description: '相关部门进行实地验收检查',
      status: 'pending'
    },
    {
      step: 4,
      title: '资金发放',
      description: '审核通过后，奖励资金直接发放',
      status: 'pending'
    }
  ]

  const requiredDocuments = [
    '农户身份证复印件',
    '土地承包经营权证书',
    '测土配方施肥报告',
    '农资购买发票',
    '农产品质量检测报告',
    '银行账户信息'
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* 头部 */}
      <div className="bg-gradient-to-r from-green-400 to-green-500 text-white p-4">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={handleGoBack} className="p-1 hover:bg-white/20 rounded-full">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-xl font-bold">绿色农业政策支持</h1>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* 政策概述 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl p-6 shadow-sm"
        >
          <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <FileText className="text-green-600" size={24} />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-800 mb-2">绿色农业政策支持</h2>
              <p className="text-sm text-gray-600 mb-2">发布单位：农业农村部 • 生态环境部</p>
              <p className="text-sm text-gray-600">发布时间：2024年3月15日</p>
            </div>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg mb-4">
            <h3 className="font-semibold text-green-800 mb-2">政策目标</h3>
            <p className="text-green-700 text-sm leading-relaxed">
              推进农业绿色发展，鼓励农户采用科学施肥、有机种植、节水灌溉等环保农业技术，
              提高农产品质量，保护生态环境，实现可持续发展。
            </p>
          </div>
        </motion.div>

        {/* 奖励标准 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl p-6 shadow-sm"
        >
          <div className="flex items-center gap-3 mb-4">
            <Gift className="text-green-600" size={24} />
            <h3 className="text-lg font-bold text-gray-800">奖励标准</h3>
          </div>
          
          <div className="grid gap-4">
            {policyBenefits.map((benefit) => (
              <motion.div
                key={benefit.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: benefit.id * 0.1 }}
                className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-4 flex items-center gap-4"
              >
                <div className="text-2xl">{benefit.icon}</div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800">{benefit.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{benefit.condition}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-green-600">{benefit.amount}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* 申请流程 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl p-6 shadow-sm"
        >
          <div className="flex items-center gap-3 mb-4">
            <CheckCircle className="text-green-600" size={24} />
            <h3 className="text-lg font-bold text-gray-800">申请流程</h3>
          </div>
          
          <div className="space-y-4">
            {applicationSteps.map((step) => (
              <div key={step.step} className="flex items-center gap-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  step.status === 'completed' ? 'bg-green-500 text-white' :
                  step.status === 'current' ? 'bg-green-100 text-green-600 border-2 border-green-500' :
                  'bg-gray-200 text-gray-500'
                }`}>
                  {step.step}
                </div>
                <div className="flex-1">
                  <h4 className={`font-semibold ${
                    step.status === 'current' ? 'text-green-600' : 'text-gray-800'
                  }`}>
                    {step.title}
                  </h4>
                  <p className="text-sm text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* 所需材料 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl p-6 shadow-sm"
        >
          <h3 className="text-lg font-bold text-gray-800 mb-4">所需材料</h3>
          <div className="grid grid-cols-1 gap-3">
            {requiredDocuments.map((doc, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
                className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
              >
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-700">{doc}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* 联系方式 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl p-6 shadow-sm"
        >
          <h3 className="text-lg font-bold text-gray-800 mb-4">联系我们</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Phone className="text-green-600" size={20} />
              <div>
                <p className="font-semibold text-gray-800">咨询热线</p>
                <p className="text-gray-600">400-123-4567</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="text-green-600" size={20} />
              <div>
                <p className="font-semibold text-gray-800">邮箱咨询</p>
                <p className="text-gray-600">green@agriculture.gov.cn</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="text-green-600" size={20} />
              <div>
                <p className="font-semibold text-gray-800">办公地址</p>
                <p className="text-gray-600">北京市朝阳区农业大厦8层</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 申请按钮 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="pb-8"
        >
          <button 
            onClick={() => navigate('/green/policy-application')}
            className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-shadow"
          >
            立即申请政策支持
          </button>
        </motion.div>
      </div>
    </div>
  )
}

export default GreenPolicySupport
