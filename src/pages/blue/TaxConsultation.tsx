import { ArrowLeft, MessageCircle, Phone, Clock, Send, User, Bot, FileText, Calculator, HelpCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useState } from 'react'

const TaxConsultation = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('chat')
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: '您好！我是税收咨询助手，专门为企业提供碳汇交易相关的税收优惠政策咨询。请问有什么可以帮助您的？',
      time: '09:30'
    }
  ])

  const taxPolicies = [
    {
      id: 1,
      title: '企业所得税减免',
      description: '企业购买碳汇可享受25%的所得税减免',
      applicableAmount: '年购买额≥100万元',
      maxBenefit: '最高减免50万元',
      validPeriod: '2024-2026年',
      status: 'active'
    },
    {
      id: 2,
      title: '增值税优惠',
      description: '碳汇交易免征增值税',
      applicableAmount: '所有碳汇交易',
      maxBenefit: '完全免税',
      validPeriod: '长期有效',
      status: 'active'
    },
    {
      id: 3,
      title: '环保税减免',
      description: '通过碳汇抵消可减免环保税',
      applicableAmount: '按抵消量计算',
      maxBenefit: '最高减免80%',
      validPeriod: '2024-2025年',
      status: 'active'
    }
  ]

  const faqs = [
    {
      id: 1,
      question: '企业购买碳汇如何申报税收减免？',
      answer: '企业需要在年度所得税汇算清缴时，提供碳汇购买合同、发票、第三方认证报告等材料，填写专项附加扣除申报表。'
    },
    {
      id: 2,
      question: '碳汇交易的税收优惠有额度限制吗？',
      answer: '有的。企业所得税减免最高不超过50万元，环保税减免最高不超过企业应缴环保税的80%。'
    },
    {
      id: 3,
      question: '如何计算碳汇投资的实际税收收益？',
      answer: '实际收益 = 购买金额 × 减免比例 + 环保税减免额 + 其他政策优惠。具体计算建议咨询专业税务师。'
    }
  ]

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        type: 'user',
        content: message,
        time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
      }
      setMessages([...messages, newMessage])
      setMessage('')

      // 模拟AI回复
      setTimeout(() => {
        const botReply = {
          id: messages.length + 2,
          type: 'bot',
          content: generateBotReply(message),
          time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
        }
        setMessages(prev => [...prev, botReply])
      }, 1000)
    }
  }

  const generateBotReply = (userMessage: string) => {
    if (userMessage.includes('减免') || userMessage.includes('优惠')) {
      return '根据最新政策，企业购买碳汇可享受以下税收优惠：\n1. 企业所得税减免25%\n2. 增值税完全免征\n3. 环保税最高减免80%\n\n需要详细计算方案吗？'
    } else if (userMessage.includes('申报') || userMessage.includes('流程')) {
      return '税收减免申报流程：\n1. 收集碳汇购买凭证\n2. 获取第三方认证报告\n3. 填写专项附加扣除申报表\n4. 在汇算清缴时提交\n\n我可以为您提供详细的申报指导。'
    } else if (userMessage.includes('计算') || userMessage.includes('收益')) {
      return '为您计算税收收益需要了解：\n1. 年度碳汇购买金额\n2. 企业所得税税率\n3. 当前环保税缴纳情况\n\n请提供这些信息，我来为您详细计算。'
    } else {
      return '感谢您的咨询！我已收到您的问题，正在为您匹配最合适的税务专家。请稍候，或者您可以先查看常见问题解答。'
    }
  }

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
          <h1 className="text-xl font-bold">税收咨询</h1>
        </div>

        {/* 服务状态 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/20 rounded-xl p-4"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <div>
                <p className="font-semibold">专家在线</p>
                <p className="text-sm text-white/80">服务时间：9:00-17:30</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-white/80">平均响应时间</p>
              <p className="font-bold">2分钟</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* 标签切换 */}
      <div className="bg-white border-b">
        <div className="flex">
          <button
            onClick={() => setActiveTab('chat')}
            className={`flex-1 py-3 px-4 text-sm font-medium ${
              activeTab === 'chat'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500'
            }`}
          >
            <MessageCircle size={16} className="inline mr-2" />
            在线咨询
          </button>
          <button
            onClick={() => setActiveTab('policies')}
            className={`flex-1 py-3 px-4 text-sm font-medium ${
              activeTab === 'policies'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500'
            }`}
          >
            <FileText size={16} className="inline mr-2" />
            优惠政策
          </button>
          <button
            onClick={() => setActiveTab('faq')}
            className={`flex-1 py-3 px-4 text-sm font-medium ${
              activeTab === 'faq'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500'
            }`}
          >
            <HelpCircle size={16} className="inline mr-2" />
            常见问题
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        {/* 在线咨询 */}
        {activeTab === 'chat' && (
          <div className="h-full flex flex-col">
            {/* 聊天记录 */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ maxHeight: 'calc(100vh - 280px)' }}>
              {messages.map((msg, index) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start gap-2 max-w-[80%] ${msg.type === 'user' ? 'flex-row-reverse' : ''}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      msg.type === 'user' ? 'bg-blue-500' : 'bg-gray-200'
                    }`}>
                      {msg.type === 'user' ? (
                        <User className="text-white" size={16} />
                      ) : (
                        <Bot className="text-gray-600" size={16} />
                      )}
                    </div>
                    <div>
                      <div className={`p-3 rounded-lg ${
                        msg.type === 'user' 
                          ? 'bg-blue-500 text-white' 
                          : 'bg-white border'
                      }`}>
                        <p className="text-sm whitespace-pre-line">{msg.content}</p>
                      </div>
                      <p className="text-xs text-gray-500 mt-1 px-1">{msg.time}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* 输入框 */}
            <div className="border-t bg-white p-4">
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="请输入您的问题..."
                  className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-blue-500"
                />
                <button
                  onClick={handleSendMessage}
                  className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 优惠政策 */}
        {activeTab === 'policies' && (
          <div className="p-4 space-y-4">
            {taxPolicies.map((policy, index) => (
              <motion.div
                key={policy.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-4 shadow-sm"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-bold text-gray-800">{policy.title}</h3>
                  <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">
                    生效中
                  </span>
                </div>
                
                <p className="text-sm text-gray-600 mb-4">{policy.description}</p>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">适用条件</p>
                    <p className="font-semibold">{policy.applicableAmount}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">最大优惠</p>
                    <p className="font-semibold text-green-600">{policy.maxBenefit}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">有效期</p>
                    <p className="font-semibold">{policy.validPeriod}</p>
                  </div>
                  <div>
                    <button className="text-blue-600 text-sm font-medium">
                      详细说明 →
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* 税收计算器 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-4"
            >
              <div className="flex items-center gap-3 mb-3">
                <Calculator className="text-blue-600" size={24} />
                <h3 className="font-bold text-gray-800">税收收益计算器</h3>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                输入您的碳汇投资金额，自动计算可享受的税收优惠
              </p>
              <button className="w-full bg-blue-500 text-white py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors">
                开始计算
              </button>
            </motion.div>
          </div>
        )}

        {/* 常见问题 */}
        {activeTab === 'faq' && (
          <div className="p-4 space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-4 shadow-sm"
              >
                <h3 className="font-semibold text-gray-800 mb-2">{faq.question}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{faq.answer}</p>
              </motion.div>
            ))}

            {/* 联系方式 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-4"
            >
              <h3 className="font-bold text-gray-800 mb-3">需要更多帮助？</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <Phone className="text-green-600" size={16} />
                  <span className="text-sm">客服热线：400-888-9999</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="text-green-600" size={16} />
                  <span className="text-sm">服务时间：工作日 9:00-17:30</span>
                </div>
                <div className="flex items-center gap-3">
                  <MessageCircle className="text-green-600" size={16} />
                  <span className="text-sm">微信客服：CarbonTax2024</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  )
}

export default TaxConsultation
