import { useState } from 'react'
import { Search, Award, FileText, BarChart, Download, TrendingUp, CheckCircle, XCircle, AlertCircle, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const ESGCenter = () => {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [showReportModal, setShowReportModal] = useState(false)
  const [showImproveModal, setShowImproveModal] = useState(false)
  const [generatingReport, setGeneratingReport] = useState(false)
  const [reportGenerated, setReportGenerated] = useState(false)
  
  const esgData = {
    score: 85,
    rank: '10/100',
    level: '行业排名',
    details: [
      { category: 'ESG评估——促能农业可持续发展', description: '定制提高' },
      { category: '环境保护', score: 88, status: '优秀' },
      { category: '社会责任', score: 82, status: '良好' },
      { category: '公司治理', score: 85, status: '优秀' }
    ]
  }

  const reports = [
    { 
      id: 1, 
      title: '2024年第三季度ESG报告', 
      date: '2024.09.30', 
      status: '已发布',
      score: 87,
      improvement: '+2%'
    },
    { 
      id: 2, 
      title: '2024年第二季度ESG报告', 
      date: '2024.06.30', 
      status: '已发布',
      score: 85,
      improvement: '+1.5%'
    },
    { 
      id: 3, 
      title: '2024年第一季度ESG报告', 
      date: '2024.03.31', 
      status: '已发布',
      score: 84,
      improvement: '+1%'
    },
    { 
      id: 4, 
      title: '2023年度ESG综合报告', 
      date: '2024.01.15', 
      status: '已发布',
      score: 82,
      improvement: '基准'
    }
  ]

  // 改进建议数据
  const improvementSuggestions = {
    '环境保护': [
      { title: '碳排放管理', current: '已建立基础监测体系', target: '实现全流程碳足迹追踪', priority: '高' },
      { title: '能源使用', current: '可再生能源占比30%', target: '提升至50%以上', priority: '中' },
      { title: '废物管理', current: '回收率75%', target: '实现零废弃目标', priority: '中' }
    ],
    '社会责任': [
      { title: '员工福利', current: '基础保障完善', target: '建立全面福利体系', priority: '高' },
      { title: '社区参与', current: '定期公益活动', target: '建立长期社区项目', priority: '中' },
      { title: '供应链管理', current: '基础审核机制', target: '全供应链ESG标准', priority: '高' }
    ],
    '公司治理': [
      { title: '信息披露', current: '季度报告', target: '实时ESG数据平台', priority: '中' },
      { title: '风险管理', current: '传统风险管理', target: 'ESG风险整合管理', priority: '高' },
      { title: '董事会多元化', current: '30%独立董事', target: '50%独立董事', priority: '低' }
    ]
  }

  const handleGenerateReport = () => {
    setShowReportModal(true)
    setGeneratingReport(true)
    setReportGenerated(false)

    // 模拟报告生成过程
    setTimeout(() => {
      setGeneratingReport(false)
      setReportGenerated(true)
    }, 3000)
  }

  const handleViewReport = (reportId: number) => {
    navigate(`/blue/esg-report/${reportId}`)
  }

  const handleImproveDetail = (category: string) => {
    setShowImproveModal(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* 头部 */}
      <div className="bg-gradient-to-r from-blue-400 to-blue-500 text-white p-4">
        <h1 className="text-xl font-bold text-center mb-4">ESG评估中心</h1>
        
        {/* 搜索框 */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="查找评估数据"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-full text-gray-700 bg-white/95"
          />
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* ESG评分卡片 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl p-6"
        >
          <div className="text-center mb-4">
            <h2 className="text-lg font-bold text-blue-900 mb-2">你的ESG分：</h2>
            <div className="relative inline-block">
              <div className="text-6xl font-bold text-blue-700">{esgData.score}%</div>
              <TrendingUp className="absolute -right-6 top-0 text-green-500" size={20} />
            </div>
            <p className="text-blue-600 mt-2">{esgData.level}{esgData.rank}</p>
          </div>

          {/* 评分维度 */}
          <div className="space-y-3">
            {esgData.details.slice(1).map((item, index) => (
              <div key={index} className="bg-white/50 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-blue-800">{item.category}</span>
                  <span className="text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded-full">
                    {item.status}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-white/30 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-blue-600 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${item.score}%` }}
                      transition={{ duration: 1, delay: index * 0.2 }}
                    />
                  </div>
                  <span className="text-sm font-bold text-blue-700">{item.score}%</span>
                </div>
              </div>
            ))}
          </div>

          <button 
            onClick={handleGenerateReport}
            className="w-full mt-4 bg-blue-600 text-white py-3 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors"
          >
            <BarChart size={20} />
            生成ESG报告
          </button>
        </motion.div>

        {/* ESG评估详情 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="font-bold mb-3">ESG评估详情</h3>
          <div className="space-y-3">
            {esgData.details.slice(1).map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="bg-white rounded-xl p-4 shadow-sm"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    {item.score >= 85 ? (
                      <CheckCircle className="text-green-500" size={24} />
                    ) : item.score >= 70 ? (
                      <AlertCircle className="text-yellow-500" size={24} />
                    ) : (
                      <XCircle className="text-red-500" size={24} />
                    )}
                    <div>
                      <span className="font-medium">{item.category}</span>
                      <p className="text-xs text-gray-500">当前得分：{item.score}分</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleImproveDetail(item.category)}
                    className="text-blue-600 text-sm font-medium flex items-center gap-1"
                  >
                    定制提高
                    <ChevronRight size={16} />
                  </button>
                </div>
                
                {/* 改进建议预览 */}
                <div className="bg-gray-50 rounded-lg p-3 text-sm text-gray-600">
                  {item.score >= 85 ? (
                    <p>✨ 表现优秀！继续保持并追求更高标准。</p>
                  ) : item.score >= 70 ? (
                    <p>📈 有提升空间，建议重点关注关键指标改进。</p>
                  ) : (
                    <p>⚠️ 需要改进，请查看详细改进方案。</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* 历史报告 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold">历史报告</h3>
            <button 
              onClick={() => navigate('/blue/esg-reports')}
              className="text-sm text-blue-600"
            >
              查看全部
            </button>
          </div>
          <div className="space-y-3">
            {reports.map((report) => (
              <motion.div 
                key={report.id} 
                whileHover={{ scale: 1.02 }}
                onClick={() => handleViewReport(report.id)}
                className="bg-white rounded-lg p-4 shadow-sm flex items-center justify-between cursor-pointer hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FileText className="text-blue-600" size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">{report.title}</h4>
                    <p className="text-xs text-gray-500">{report.date} · 评分：{report.score}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-green-600 font-medium">
                    {report.improvement}
                  </span>
                  <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">
                    {report.status}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* 生成报告弹窗 */}
      <AnimatePresence>
        {showReportModal && (
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
              {generatingReport ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
                  <h3 className="text-lg font-bold mb-2">正在生成ESG报告</h3>
                  <p className="text-sm text-gray-600">
                    系统正在分析您的ESG数据，请稍候...
                  </p>
                </div>
              ) : reportGenerated ? (
                <div className="text-center py-6">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="text-green-600" size={32} />
                  </div>
                  <h3 className="text-lg font-bold mb-2">报告生成成功！</h3>
                  <p className="text-sm text-gray-600 mb-6">
                    您的2024年第四季度ESG报告已生成
                  </p>
                  <div className="flex gap-3">
                    <button 
                      onClick={() => setShowReportModal(false)}
                      className="flex-1 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200"
                    >
                      关闭
                    </button>
                    <button className="flex-1 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 flex items-center justify-center gap-2">
                      <Download size={16} />
                      下载报告
                    </button>
                  </div>
                </div>
              ) : null}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 改进详情弹窗 */}
      <AnimatePresence>
        {showImproveModal && (
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
              <h3 className="text-lg font-bold mb-4">ESG改进方案</h3>
              
              {Object.entries(improvementSuggestions).map(([category, suggestions]) => (
                <div key={category} className="mb-6">
                  <h4 className="font-semibold text-blue-600 mb-3">{category}</h4>
                  <div className="space-y-3">
                    {suggestions.map((suggestion, index) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-3">
                        <div className="flex items-start justify-between mb-2">
                          <h5 className="font-medium text-sm">{suggestion.title}</h5>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            suggestion.priority === '高' ? 'bg-red-100 text-red-600' :
                            suggestion.priority === '中' ? 'bg-yellow-100 text-yellow-600' :
                            'bg-green-100 text-green-600'
                          }`}>
                            {suggestion.priority}优先级
                          </span>
                        </div>
                        <div className="space-y-1 text-xs text-gray-600">
                          <p>当前：{suggestion.current}</p>
                          <p>目标：{suggestion.target}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              <div className="flex gap-3 mt-6">
                <button 
                  onClick={() => setShowImproveModal(false)}
                  className="flex-1 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200"
                >
                  关闭
                </button>
                <button className="flex-1 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600">
                  开始改进计划
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ESGCenter
