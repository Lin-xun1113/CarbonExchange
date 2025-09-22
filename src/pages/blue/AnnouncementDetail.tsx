import { ArrowLeft, Calendar, Building, Trophy, TrendingUp, Award } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'

const BlueAnnouncement = () => {
  const navigate = useNavigate()
  const { id } = useParams()

  // 模拟公告详情数据
  const announcementData = {
    1: {
      title: '永兴集团购买碳汇数量满额公告',
      date: '2024-10-31',
      type: 'achievement',
      company: '永兴集团',
      icon: '🏆',
      content: {
        summary: '永兴集团在2024年10月至次年6月期间，累计购买碳汇数量达到10万吨，超额完成年度碳中和目标，为推动绿色发展做出突出贡献。',
        achievements: [
          { label: '累计购买碳汇', value: '100,000吨', icon: '🌳' },
          { label: '减排贡献', value: '相当于种植230万棵树', icon: '🌲' },
          { label: '投入资金', value: '¥7,500万', icon: '💰' },
          { label: '合作项目', value: '28个', icon: '🤝' }
        ],
        details: [
          {
            title: '碳汇采购明细',
            content: '永兴集团通过多元化的碳汇采购策略，从森林碳汇、农业碳汇、蓝碳等多个领域进行采购，确保碳汇来源的可靠性和可持续性。其中森林碳汇占比45%，农业碳汇占比35%，蓝碳及其他占比20%。'
          },
          {
            title: '社会影响',
            content: '通过大规模碳汇采购，永兴集团不仅实现了自身的碳中和目标，还带动了28个农村合作社参与碳汇项目，直接惠及农户3000余户，人均增收5000元以上。'
          },
          {
            title: '未来规划',
            content: '永兴集团计划在未来三年内，将碳汇采购量提升至30万吨，并建立长期稳定的碳汇供应链，打造企业绿色发展的标杆案例。'
          }
        ],
        recognition: '永兴集团的碳汇采购行动获得了国家发改委的高度认可，将在2024年8月31日CCTV企业社会责任盛典上进行表彰，并获得"碳中和先锋企业"称号。'
      }
    },
    2: {
      title: '昌地集团购买碳汇相关动态',
      date: '2024-10-31',
      type: 'transaction',
      company: '昌地集团',
      icon: '📊',
      content: {
        summary: '昌地集团积极响应国家绿色发展倡议，在过去六个月中累计购买碳汇8.5万吨，为实现双碳目标贡献企业力量。',
        achievements: [
          { label: '累计购买碳汇', value: '85,000吨', icon: '🌿' },
          { label: '碳中和进度', value: '85%', icon: '📈' },
          { label: '投入资金', value: '¥6,200万', icon: '💵' },
          { label: '合作伙伴', value: '35家', icon: '🏢' }
        ],
        details: [
          {
            title: '交易详情',
            content: '昌地集团通过碳交易平台，与35家碳汇供应商建立合作关系，采购范围覆盖12个省份，确保了碳汇供应的稳定性和多样性。'
          },
          {
            title: '减排成效',
            content: '通过系统性的碳汇采购和内部减排措施，昌地集团2024年碳排放强度同比下降15%，提前完成十四五减排目标。'
          },
          {
            title: '创新实践',
            content: '昌地集团创新性地将碳汇采购与供应链管理相结合，要求核心供应商共同参与碳减排行动，形成了产业链协同减碳的良好生态。'
          }
        ],
        recognition: '昌地集团的绿色转型实践入选"2024中国企业碳中和优秀案例"，并获得中国质量认证中心颁发的碳中和认证证书。'
      }
    },
    3: {
      title: '绿色发展基金成立公告',
      date: '2024-09-15',
      type: 'fund',
      company: '绿色发展基金管理委员会',
      icon: '💚',
      content: {
        summary: '为进一步推动碳中和目标实现，支持绿色低碳产业发展，特成立绿色发展基金，首期募集资金10亿元人民币。',
        achievements: [
          { label: '基金规模', value: '¥10亿', icon: '🏦' },
          { label: '投资方向', value: '8大领域', icon: '🎯' },
          { label: '预期项目', value: '100+', icon: '📋' },
          { label: '覆盖地区', value: '全国', icon: '🗺️' }
        ],
        details: [
          {
            title: '基金定位',
            content: '绿色发展基金定位于支持碳汇项目开发、清洁能源投资、绿色技术创新等领域，通过市场化运作方式，引导社会资本参与绿色发展。'
          },
          {
            title: '投资重点',
            content: '重点投资方向包括：森林碳汇开发、农业碳汇项目、可再生能源、储能技术、碳捕获与利用、绿色建筑、循环经济、生态修复等八大领域。'
          },
          {
            title: '申请条件',
            content: '符合国家绿色发展政策导向的企业和项目均可申请，基金将提供股权投资、债权融资、担保增信等多种金融服务。'
          }
        ],
        recognition: '绿色发展基金的成立获得了生态环境部、国家发改委等部门的大力支持，将成为推动我国绿色转型的重要金融工具。'
      }
    }
  }

  const announcement = announcementData[id as '1' | '2' | '3'] || announcementData[1]

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
          <h1 className="text-xl font-bold">公告详情</h1>
        </div>

        {/* 公告基本信息 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/20 rounded-xl p-4"
        >
          <div className="flex items-start gap-4">
            <div className="text-4xl">{announcement.icon}</div>
            <div className="flex-1">
              <h2 className="text-xl font-bold mb-2">{announcement.title}</h2>
              <div className="flex items-center gap-4 text-sm text-white/90">
                <div className="flex items-center gap-1">
                  <Building size={14} />
                  <span>{announcement.company}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar size={14} />
                  <span>{announcement.date}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="p-4">
        {/* 公告摘要 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl p-6 shadow-sm mb-4"
        >
          <h3 className="font-bold text-lg text-gray-800 mb-3">公告摘要</h3>
          <p className="text-gray-700 leading-relaxed">
            {announcement.content.summary}
          </p>
        </motion.div>

        {/* 关键数据 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 gap-3 mb-4"
        >
          {announcement.content.achievements.map((achievement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4"
            >
              <div className="text-2xl mb-2">{achievement.icon}</div>
              <p className="text-xs text-gray-600 mb-1">{achievement.label}</p>
              <p className="font-bold text-blue-600">{achievement.value}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* 详细内容 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl p-6 shadow-sm mb-4"
        >
          <h3 className="font-bold text-lg text-gray-800 mb-4">详细内容</h3>
          {announcement.content.details.map((detail, index) => (
            <div key={index} className="mb-6 last:mb-0">
              <h4 className="font-semibold text-blue-600 mb-2">{detail.title}</h4>
              <p className="text-gray-700 leading-relaxed">{detail.content}</p>
            </div>
          ))}
        </motion.div>

        {/* 认可与表彰 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-xl p-6 mb-4"
        >
          <div className="flex items-center gap-3 mb-3">
            <Trophy className="text-yellow-600" size={24} />
            <h3 className="font-bold text-lg text-gray-800">认可与表彰</h3>
          </div>
          <p className="text-gray-700 leading-relaxed">
            {announcement.content.recognition}
          </p>
        </motion.div>

        {/* 相关链接 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-2 gap-3"
        >
          <button className="bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors flex items-center justify-center gap-2">
            <Award size={18} />
            查看更多成就
          </button>
          <button className="bg-white border-2 border-blue-500 text-blue-500 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors flex items-center justify-center gap-2">
            <TrendingUp size={18} />
            碳汇交易记录
          </button>
        </motion.div>
      </div>
    </div>
  )
}

export default BlueAnnouncement
