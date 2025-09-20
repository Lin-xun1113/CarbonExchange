import { useState } from 'react'
import { ArrowLeft, User, MapPin, FileText, CheckCircle, Upload } from 'lucide-react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

interface FormData {
  // 基本信息
  name: string
  phone: string
  idCard: string
  address: string
  
  // 土地信息
  landArea: string
  landLocation: string
  landCertificate: string
  
  // 申请类型
  applicationType: string[]
  
  // 农业实践
  farmingPractice: string
  expectedBenefit: string
  
  // 文件上传（模拟）
  uploadedFiles: string[]
}

const PolicyApplication = () => {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    idCard: '',
    address: '',
    landArea: '',
    landLocation: '',
    landCertificate: '',
    applicationType: [],
    farmingPractice: '',
    expectedBenefit: '',
    uploadedFiles: []
  })

  const handleGoBack = () => {
    if (isSubmitted) {
      navigate('/green')
    } else {
      navigate('/green/policy-support')
    }
  }

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleCheckboxChange = (type: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      applicationType: checked 
        ? [...prev.applicationType, type]
        : prev.applicationType.filter(t => t !== type)
    }))
  }

  const handleFileUpload = (fileName: string) => {
    setFormData(prev => ({
      ...prev,
      uploadedFiles: [...prev.uploadedFiles, fileName]
    }))
  }

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    
    // 模拟提交过程
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  const applicationTypes = [
    { id: 'scientific-fertilizing', label: '科学施肥奖励', amount: '500-2000元' },
    { id: 'organic-fertilizer', label: '有机肥使用补贴', amount: '200元/亩' },
    { id: 'green-certification', label: '绿色认证奖励', amount: '1000-5000元' },
    { id: 'water-saving', label: '节水灌溉补贴', amount: '300元/亩' }
  ]

  const mockFiles = [
    '身份证正反面.pdf',
    '土地承包经营权证书.pdf',
    '测土配方施肥报告.pdf',
    '农资购买发票.pdf'
  ]

  // 提交成功页面
  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
        <div className="bg-gradient-to-r from-green-400 to-green-500 text-white p-4">
          <div className="flex items-center gap-3">
            <button onClick={handleGoBack} className="p-1 hover:bg-white/20 rounded-full">
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-xl font-bold">申请提交成功</h1>
          </div>
        </div>

        <div className="p-4 flex items-center justify-center min-h-[calc(100vh-80px)]">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-8 shadow-lg text-center max-w-md w-full"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <CheckCircle className="text-green-500" size={40} />
            </motion.div>
            
            <h2 className="text-2xl font-bold text-gray-800 mb-4">申请提交成功！</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              您的政策支持申请已成功提交，申请编号：<br />
              <span className="font-mono text-green-600 font-semibold">PS202409200001</span>
            </p>
            
            <div className="bg-green-50 p-4 rounded-lg mb-6 text-left">
              <h3 className="font-semibold text-green-800 mb-2">后续流程：</h3>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• 5个工作日内完成材料审核</li>
                <li>• 审核通过后安排实地验收</li>
                <li>• 验收合格后15个工作日内发放奖励</li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <button 
                onClick={() => navigate('/green')}
                className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors"
              >
                返回首页
              </button>
              <button 
                onClick={() => {/* 模拟查看进度功能 */}}
                className="w-full border border-green-500 text-green-500 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors"
              >
                查看申请进度
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* 头部 */}
      <div className="bg-gradient-to-r from-green-400 to-green-500 text-white p-4">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={handleGoBack} className="p-1 hover:bg-white/20 rounded-full">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-xl font-bold">申请政策支持</h1>
        </div>
        
        {/* 步骤指示器 */}
        <div className="flex items-center justify-between max-w-md mx-auto">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                step <= currentStep ? 'bg-white text-green-500' : 'bg-white/30 text-white/70'
              }`}>
                {step}
              </div>
              {step < 3 && (
                <div className={`w-12 h-1 mx-2 ${
                  step < currentStep ? 'bg-white' : 'bg-white/30'
                }`}></div>
              )}
            </div>
          ))}
        </div>
        
        <div className="text-center mt-2">
          <p className="text-sm opacity-90">
            {currentStep === 1 && '基本信息'}
            {currentStep === 2 && '申请详情'}
            {currentStep === 3 && '确认提交'}
          </p>
        </div>
      </div>

      <div className="p-4">
        {/* 第一步：基本信息 */}
        {currentStep === 1 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <User className="text-green-600" size={24} />
                <h3 className="text-lg font-bold">个人信息</h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">姓名 *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="请输入您的姓名"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">联系电话 *</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="请输入手机号码"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">身份证号 *</label>
                  <input
                    type="text"
                    value={formData.idCard}
                    onChange={(e) => handleInputChange('idCard', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="请输入身份证号码"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">联系地址 *</label>
                  <textarea
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    rows={3}
                    placeholder="请输入详细地址"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="text-green-600" size={24} />
                <h3 className="text-lg font-bold">土地信息</h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">土地面积 *</label>
                  <input
                    type="text"
                    value={formData.landArea}
                    onChange={(e) => handleInputChange('landArea', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="请输入土地面积（亩）"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">土地位置 *</label>
                  <input
                    type="text"
                    value={formData.landLocation}
                    onChange={(e) => handleInputChange('landLocation', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="请输入土地具体位置"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">土地证书编号 *</label>
                  <input
                    type="text"
                    value={formData.landCertificate}
                    onChange={(e) => handleInputChange('landCertificate', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="请输入土地承包经营权证书编号"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* 第二步：申请详情 */}
        {currentStep === 2 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <FileText className="text-green-600" size={24} />
                <h3 className="text-lg font-bold">申请类型</h3>
              </div>
              
              <div className="space-y-3">
                {applicationTypes.map((type) => (
                  <label key={type.id} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.applicationType.includes(type.id)}
                      onChange={(e) => handleCheckboxChange(type.id, e.target.checked)}
                      className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                    />
                    <div className="flex-1">
                      <div className="font-medium text-gray-800">{type.label}</div>
                      <div className="text-sm text-green-600">{type.amount}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-bold mb-4">农业实践情况</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">目前采用的农业技术 *</label>
                  <textarea
                    value={formData.farmingPractice}
                    onChange={(e) => handleInputChange('farmingPractice', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    rows={4}
                    placeholder="请详细描述您目前采用的绿色农业技术和实践方法"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">预期收益情况</label>
                  <textarea
                    value={formData.expectedBenefit}
                    onChange={(e) => handleInputChange('expectedBenefit', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    rows={3}
                    placeholder="请描述采用绿色农业技术后的预期收益和环境改善情况"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <Upload className="text-green-600" size={24} />
                <h3 className="text-lg font-bold">上传材料</h3>
              </div>
              
              <div className="space-y-3">
                {mockFiles.map((fileName, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <span className="text-gray-700">{fileName}</span>
                    <button
                      onClick={() => handleFileUpload(fileName)}
                      className={`px-3 py-1 rounded text-sm ${
                        formData.uploadedFiles.includes(fileName)
                          ? 'bg-green-100 text-green-600'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {formData.uploadedFiles.includes(fileName) ? '已上传' : '选择文件'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* 第三步：确认提交 */}
        {currentStep === 3 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-bold mb-4">申请信息确认</h3>
              
              <div className="space-y-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">申请人：</span>
                  <span className="font-medium">{formData.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">联系电话：</span>
                  <span className="font-medium">{formData.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">土地面积：</span>
                  <span className="font-medium">{formData.landArea}亩</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">申请类型：</span>
                  <span className="font-medium">{formData.applicationType.length}项</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">上传材料：</span>
                  <span className="font-medium">{formData.uploadedFiles.length}个文件</span>
                </div>
              </div>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold text-green-800 mb-2">温馨提示：</h4>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• 请确保所填写信息真实准确</li>
                <li>• 提交后将进入审核流程，请保持电话畅通</li>
                <li>• 如有疑问，请联系客服：400-123-4567</li>
              </ul>
            </div>
          </motion.div>
        )}

        {/* 底部按钮 */}
        <div className="flex gap-4 mt-8 pb-8">
          {currentStep > 1 && (
            <button
              onClick={handlePrevStep}
              className="flex-1 py-3 border border-green-500 text-green-500 rounded-lg font-semibold hover:bg-green-50 transition-colors"
            >
              上一步
            </button>
          )}
          
          {currentStep < 3 ? (
            <button
              onClick={handleNextStep}
              className="flex-1 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-colors"
            >
              下一步
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex-1 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? '提交中...' : '确认提交'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default PolicyApplication
