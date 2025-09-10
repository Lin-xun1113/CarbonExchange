import { useState } from 'react'
import { Search, Award, FileText, BarChart } from 'lucide-react'
import { motion } from 'framer-motion'

const ESGCenter = () => {
  const [searchQuery, setSearchQuery] = useState('')
  
  const esgData = {
    score: 85,
    rank: '10/100',
    level: '行业排名',
    details: [
      { category: 'ESG评估——规能农业可持续发展', description: '定制提高' },
      { category: '环境保护', score: 88 },
      { category: '社会责任', score: 82 },
      { category: '公司治理', score: 85 }
    ]
  }

  const reports = [
    { id: 1, title: '2024年第一季度ESG报告', date: '2024.03.31', status: '已发布' },
    { id: 2, title: '2023年度ESG综合报告', date: '2024.01.15', status: '已发布' }
  ]

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
            <div className="text-6xl font-bold text-blue-700">{esgData.score}%</div>
            <p className="text-blue-600 mt-2">{esgData.level}{esgData.rank}</p>
          </div>

          {/* 评分维度 */}
          <div className="space-y-3">
            {esgData.details.slice(1).map((item, index) => (
              <div key={index} className="flex items-center justify-between bg-white/50 rounded-lg p-3">
                <span className="text-sm font-medium text-blue-800">{item.category}</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 bg-white/30 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-600 rounded-full"
                      style={{ width: `${item.score}%` }}
                    />
                  </div>
                  <span className="text-sm font-bold text-blue-700">{item.score}%</span>
                </div>
              </div>
            ))}
          </div>

          <button className="w-full mt-4 bg-blue-600 text-white py-3 rounded-xl font-medium flex items-center justify-center gap-2">
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
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <Award className="text-blue-500" size={24} />
              <span className="font-medium">{esgData.details[0].category}</span>
            </div>
            <p className="text-sm text-gray-600 mb-3">
              通过科学的评估体系，帮助企业全面了解自身在环境、社会和治理方面的表现。
            </p>
            <button className="text-blue-600 text-sm font-medium">
              {esgData.details[0].description} →
            </button>
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
            <span className="text-sm text-blue-600">查看全部</span>
          </div>
          <div className="space-y-3">
            {reports.map((report) => (
              <div key={report.id} className="bg-white rounded-lg p-4 shadow-sm flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FileText className="text-blue-600" size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">{report.title}</h4>
                    <p className="text-xs text-gray-500">{report.date}</p>
                  </div>
                </div>
                <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">
                  {report.status}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default ESGCenter
