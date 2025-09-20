import { useState } from 'react'
import { Search, ChevronRight, Leaf, BookOpen, FileText, User, X, ArrowLeft } from 'lucide-react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const GreenHome = () => {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [searchType, setSearchType] = useState<'knowledge' | 'policy' | 'expert'>('knowledge')
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [selectedPolicy, setSelectedPolicy] = useState<any>(null)

  // 搜索类型配置
  const searchTypes = {
    knowledge: { label: '知识', placeholder: '搜索相关知识' },
    policy: { label: '政策', placeholder: '搜索相关政策' },
    expert: { label: '找专家', placeholder: '搜索相关专家' }
  }

  // 政策数据源
  const policyData = [
    {
      id: 1,
      title: '碳汇交易管理办法',
      content: '规范碳汇交易市场，促进绿色发展',
      department: '生态环境部',
      date: '2024-01-15',
      type: 'policy',
      keywords: ['碳汇交易', '碳汇', '交易', '管理办法', '绿色发展']
    },
    {
      id: 2,
      title: '农业碳汇项目实施指南',
      content: '指导农业碳汇项目的申报、实施和监测',
      department: '农业农村部',
      date: '2024-02-20',
      type: 'policy',
      keywords: ['农业碳汇', '碳汇', '项目实施', '申报', '监测']
    },
    {
      id: 3,
      title: '碳汇交易税收优惠政策',
      content: '对参与碳汇交易的企业和个人给予税收优惠',
      department: '财政部',
      date: '2024-03-10',
      type: 'policy',
      keywords: ['碳汇交易', '税收优惠', '企业', '个人']
    }
  ]

  // 知识数据源
  const knowledgeData = [
    {
      id: 1,
      title: '什么是碳汇交易',
      content: '碳汇交易是指通过市场机制实现碳汇资源的有效配置',
      category: '基础知识',
      type: 'knowledge',
      keywords: ['碳汇交易', '碳汇', '市场机制', '资源配置']
    },
    {
      id: 2,
      title: '农业碳汇的计算方法',
      content: '介绍农业活动中碳汇量的科学计算方式',
      category: '技术指导',
      type: 'knowledge',
      keywords: ['农业碳汇', '计算方法', '碳汇量', '科学计算']
    }
  ]

  // 专家数据源
  const expertData = [
    {
      id: 1,
      name: '张碳汇',
      title: '碳汇交易专家',
      institution: '中科院环境研究所',
      expertise: '碳汇交易政策、碳汇计量',
      type: 'expert',
      keywords: ['碳汇交易', '政策', '计量', '专家']
    },
    {
      id: 2,
      name: '李绿化',
      title: '农业碳汇专家',
      institution: '农科院',
      expertise: '农业碳汇项目、土壤碳汇',
      type: 'expert',
      keywords: ['农业碳汇', '土壤碳汇', '项目', '专家']
    }
  ]

  // 搜索函数
  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setSearchResults([])
      setIsSearching(false)
      return
    }

    setIsSearching(true)
    
    let dataSource: any[] = []
    switch (searchType) {
      case 'policy':
        dataSource = policyData
        break
      case 'knowledge':
        dataSource = knowledgeData
        break
      case 'expert':
        dataSource = expertData
        break
    }

    // 模糊搜索逻辑
    const results = dataSource.filter(item => {
      const searchLower = query.toLowerCase()
      return (
        item.title?.toLowerCase().includes(searchLower) ||
        item.content?.toLowerCase().includes(searchLower) ||
        item.name?.toLowerCase().includes(searchLower) ||
        item.expertise?.toLowerCase().includes(searchLower) ||
        item.keywords?.some((keyword: string) => keyword.toLowerCase().includes(searchLower))
      )
    })

    setSearchResults(results)
  }

  // 处理搜索输入
  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchQuery(value)
    handleSearch(value)
  }

  // 清空搜索
  const clearSearch = () => {
    setSearchQuery('')
    setSearchResults([])
    setIsSearching(false)
  }

  // 渲染搜索结果
  const renderSearchResults = () => {
    if (!isSearching) return null

    return (
      <div className="bg-white border-t border-gray-200 max-h-80 overflow-y-auto">
        {searchResults.length > 0 ? (
          <div className="p-4 space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-gray-800">搜索结果 ({searchResults.length})</h3>
              <button onClick={clearSearch} className="text-gray-500 hover:text-gray-700">
                <X size={16} />
              </button>
            </div>
            {searchResults.map((item) => (
              <motion.div
                key={`${item.type}-${item.id}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="border border-gray-100 rounded-lg p-3 hover:bg-gray-50 cursor-pointer"
                onClick={() => {
                  if (searchType === 'policy') {
                    handlePolicyClick(item)
                  }
                  // 可以为其他类型添加相应的处理逻辑
                }}
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    {searchType === 'policy' && <FileText className="text-green-600" size={16} />}
                    {searchType === 'knowledge' && <BookOpen className="text-green-600" size={16} />}
                    {searchType === 'expert' && <User className="text-green-600" size={16} />}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-sm text-gray-800">
                      {item.title || item.name}
                    </h4>
                    <p className="text-xs text-gray-600 mt-1">
                      {item.content || item.expertise}
                    </p>
                    {item.department && (
                      <p className="text-xs text-green-600 mt-1">{item.department} · {item.date}</p>
                    )}
                    {item.institution && (
                      <p className="text-xs text-green-600 mt-1">{item.institution}</p>
                    )}
                  </div>
                  {searchType === 'policy' && (
                    <ChevronRight className="text-gray-400" size={16} />
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="p-4 text-center text-gray-500">
            <p>未找到相关{searchTypes[searchType].label}</p>
          </div>
        )}
      </div>
    )
  }

  // 处理政策点击
  const handlePolicyClick = (policy: any) => {
    setSelectedPolicy(policy)
  }

  // 关闭政策详情
  const closePolicyDetail = () => {
    setSelectedPolicy(null)
  }

  // 渲染政策详情页面
  const renderPolicyDetail = () => {
    if (!selectedPolicy) return null

    return (
      <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
        {/* 头部 */}
        <div className="bg-gradient-to-r from-green-400 to-green-500 text-white p-4">
          <div className="flex items-center gap-3 mb-4">
            <button onClick={closePolicyDetail} className="p-1 hover:bg-white/20 rounded-full">
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-xl font-bold">政策详情</h1>
          </div>
        </div>

        {/* 政策内容 */}
        <div className="p-4 space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <FileText className="text-green-600" size={24} />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-800 mb-2">{selectedPolicy.title}</h2>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span>{selectedPolicy.department}</span>
                  <span>•</span>
                  <span>{selectedPolicy.date}</span>
                </div>
              </div>
            </div>
            
            <div className="prose prose-sm max-w-none">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">政策内容</h3>
              <p className="text-gray-700 leading-relaxed mb-4">{selectedPolicy.content}</p>
              
              <h3 className="text-lg font-semibold text-gray-800 mb-3">适用范围</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                本政策适用于所有参与碳汇交易的农业生产经营主体，包括农民专业合作社、家庭农场、农业企业等。
              </p>
              
              <h3 className="text-lg font-semibold text-gray-800 mb-3">实施细则</h3>
              <ul className="text-gray-700 space-y-2">
                <li>• 申请主体需具备完整的农业生产记录</li>
                <li>• 碳汇项目需通过第三方认证机构验证</li>
                <li>• 交易过程需在指定平台进行</li>
                <li>• 相关税收优惠按规定程序申请</li>
              </ul>
              
              <h3 className="text-lg font-semibold text-gray-800 mb-3 mt-6">联系方式</h3>
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-gray-700">咨询电话：400-123-4567</p>
                <p className="text-gray-700">咨询邮箱：policy@carbon.gov.cn</p>
                <p className="text-gray-700">办公地址：北京市朝阳区环保大厦12层</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // 处理公告点击
  const handleAnnouncementClick = (announcementId: number) => {
    if (announcementId === 1) {
      // 绿色农业政策支持
      navigate('/green/policy-support')
    }
    // 可以为其他公告添加相应的处理逻辑
  }

  const announcements = [
    { id: 1, title: '绿色农业政策支持', subtitle: '科学施肥享奖励', image: '🌾' },
    { id: 2, title: '碳汇知识培训', subtitle: '免费参加培训课程', image: '📚' },
  ]

  const experts = [
    { id: 1, name: '余专家', title: '农业资源与环境专业', experience: '本年度名碳解答1W+', status: '去咨询' },
    { id: 2, name: '山专家', title: '植物保护专业', experience: '本年度名碳解答1.5W', status: '去咨询' },
    { id: 3, name: '卢专家', title: '农业信息专业', experience: '本年度名碳解答2W+', status: '去咨询' },
  ]

  const knowledgeItems = [
    { id: 1, title: '绿色农业知识问答——第二期', time: '通关可得500积分', status: '去答题' },
    { id: 2, title: '农业基础知识问答——第六期', time: '通关可得300积分', status: '去答题' },
    { id: 3, title: '农业政策问答——第五期', time: '通关可得400积分', status: '去答题' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* 头部 */}
      <div className="bg-gradient-to-r from-green-400 to-green-500 text-white p-4">
        <h1 className="text-xl font-bold text-center mb-4">首页</h1>
        
        {/* 搜索框 */}
        <div className="relative">
          {/* 只在没有输入内容且没有搜索时显示搜索图标 */}
          {!searchQuery && !isSearching && (
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          )}
          <input
            type="text"
            placeholder={searchTypes[searchType].placeholder}
            value={searchQuery}
            onChange={handleSearchInput}
            className={`w-full ${!searchQuery && !isSearching ? 'pl-10' : 'pl-4'} pr-20 py-3 rounded-full text-gray-700 bg-white/95`}
          />
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-2">
            <button 
              onClick={() => setSearchType('knowledge')}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                searchType === 'knowledge' 
                  ? 'bg-green-500 text-white' 
                  : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
              }`}
            >
              知识
            </button>
            <button 
              onClick={() => setSearchType('policy')}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                searchType === 'policy' 
                  ? 'bg-green-500 text-white' 
                  : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
              }`}
            >
              政策
            </button>
            <button 
              onClick={() => setSearchType('expert')}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                searchType === 'expert' 
                  ? 'bg-green-500 text-white' 
                  : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
              }`}
            >
              找专家
            </button>
          </div>
          
          {/* 搜索结果下拉框 */}
          {renderSearchResults()}
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* 公告轮播 */}
        <div>
          <h2 className="text-lg font-bold mb-3">公告</h2>
          <div className="space-y-3">
            {announcements.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-4 shadow-sm flex items-center justify-between cursor-pointer hover:shadow-md transition-shadow"
                style={{
                  backgroundImage: 'linear-gradient(135deg, #e6fffa 0%, #c6f6d5 100%)'
                }}
                onClick={() => handleAnnouncementClick(item.id)}
              >
                <div className="flex items-center gap-4">
                  <div className="text-3xl">{item.image}</div>
                  <div>
                    <h3 className="font-semibold text-green-800">{item.title}</h3>
                    <p className="text-sm text-green-600">{item.subtitle}</p>
                  </div>
                </div>
                <ChevronRight className="text-green-600" size={20} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* 专家答疑 */}
        <div>
          <h2 className="text-lg font-bold mb-3">专家答疑</h2>
          <div className="space-y-3">
            {experts.map((expert, index) => (
              <motion.div
                key={expert.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg p-4 shadow-sm flex items-center justify-between cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => navigate('/green/expert-forum')}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Leaf className="text-green-600" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold">{expert.name}</h3>
                    <p className="text-xs text-gray-500">{expert.title}</p>
                    <p className="text-xs text-gray-400 mt-1">{expert.experience}</p>
                  </div>
                </div>
                <button className="px-4 py-1.5 bg-green-500 text-white rounded-full text-sm">
                  {expert.status}
                </button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 知识问答 */}
        <div>
          <h2 className="text-lg font-bold mb-3">知识问答</h2>
          <div className="space-y-3">
            {knowledgeItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-4 flex items-center justify-between cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => navigate('/green/knowledge-quiz')}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-200 rounded-lg flex items-center justify-center">
                    <BookOpen className="text-green-700" size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium text-sm">{item.title}</h3>
                    <p className="text-xs text-gray-500 mt-1">{item.time}</p>
                  </div>
                </div>
                <button className="px-3 py-1 bg-green-500 text-white rounded-full text-xs">
                  {item.status}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* 渲染政策详情页面 */}
      {renderPolicyDetail()}
    </div>
  )
}

export default GreenHome
