import { ArrowLeft, FileText, Download, TrendingUp, Calendar, BarChart } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const ESGReports = () => {
  const navigate = useNavigate()

  const reports = [
    { 
      id: 1, 
      title: '2024年第三季度ESG报告', 
      date: '2024.09.30', 
      status: '已发布',
      score: 87,
      improvement: '+2%',
      size: '2.3MB',
      type: '季度报告'
    },
    { 
      id: 2, 
      title: '2024年第二季度ESG报告', 
      date: '2024.06.30', 
      status: '已发布',
      score: 85,
      improvement: '+1.5%',
      size: '2.1MB',
      type: '季度报告'
    },
    { 
      id: 3, 
      title: '2024年第一季度ESG报告', 
      date: '2024.03.31', 
      status: '已发布',
      score: 84,
      improvement: '+1%',
      size: '2.0MB',
      type: '季度报告'
    },
    { 
      id: 4, 
      title: '2023年度ESG综合报告', 
      date: '2024.01.15', 
      status: '已发布',
      score: 82,
      improvement: '基准',
      size: '5.2MB',
      type: '年度报告'
    },
    {
      id: 5,
      title: '2023年第四季度ESG报告',
      date: '2023.12.31',
      status: '已发布',
      score: 81,
      improvement: '+0.5%',
      size: '2.2MB',
      type: '季度报告'
    },
    {
      id: 6,
      title: '2023年第三季度ESG报告',
      date: '2023.09.30',
      status: '已发布',
      score: 80,
      improvement: '基准',
      size: '2.0MB',
      type: '季度报告'
    }
  ]

  const handleDownload = () => {
    // 模拟下载
    alert('正在下载报告...')
  }

  const handleViewReport = (reportId: number) => {
    navigate(`/blue/esg-report/${reportId}`)
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
          <h1 className="text-xl font-bold">ESG历史报告</h1>
        </div>

        {/* 统计信息 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/20 rounded-xl p-4"
        >
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-sm text-white/80">总报告数</p>
              <p className="text-2xl font-bold">{reports.length}</p>
            </div>
            <div>
              <p className="text-sm text-white/80">最新评分</p>
              <p className="text-2xl font-bold">87</p>
            </div>
            <div>
              <p className="text-sm text-white/80">评分趋势</p>
              <div className="flex items-center justify-center gap-1">
                <TrendingUp size={16} className="text-green-300" />
                <p className="text-lg font-bold text-green-300">+2%</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="p-4">
        {/* 报告列表 */}
        <div className="space-y-4">
          {reports.map((report, index) => (
            <motion.div
              key={report.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl p-4 shadow-sm"
            >
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FileText className="text-blue-600" size={20} />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-800">{report.title}</h3>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">
                          {report.type}
                        </span>
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <Calendar size={12} />
                          {report.date}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 mb-1">
                        <BarChart size={14} className="text-blue-600" />
                        <span className="font-bold text-blue-600">{report.score}</span>
                      </div>
                      <span className="text-xs text-green-600 font-medium">
                        {report.improvement}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">
                        {report.status}
                      </span>
                      <span className="text-xs text-gray-500">
                        文件大小：{report.size}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleViewReport(report.id)}
                        className="px-3 py-1.5 bg-blue-500 text-white text-xs rounded-lg hover:bg-blue-600 transition-colors"
                      >
                        查看详情
                      </button>
                      <button
                        onClick={() => handleDownload()}
                        className="p-1.5 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        <Download size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 生成新报告按钮 */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          onClick={() => navigate('/blue/esg')}
          className="w-full mt-6 bg-blue-500 text-white py-3 rounded-xl font-medium hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
        >
          <BarChart size={20} />
          生成新的ESG报告
        </motion.button>
      </div>
    </div>
  )
}

export default ESGReports
