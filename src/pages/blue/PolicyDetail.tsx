import { ArrowLeft, Calendar, FileText, Download, Share2, BookOpen } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'

const BluePolicyDetail = () => {
  const navigate = useNavigate()
  const { id } = useParams()

  // 模拟政策详情数据
  const policyData = {
    1: {
      title: '国家碳减排新规定',
      type: '政策通知',
      number: '国发〔2024〕15号',
      date: '2024-03-15',
      department: '国务院',
      icon: '📋',
      content: {
        introduction: '为深入贯彻落实党中央、国务院关于碳达峰碳中和的重大战略决策，加快推进绿色低碳转型发展，现就进一步加强碳减排工作通知如下：',
        sections: [
          {
            title: '一、总体要求',
            content: '坚持以习近平新时代中国特色社会主义思想为指导，全面贯彻党的二十大精神，深入践行绿水青山就是金山银山理念，统筹推进经济发展和生态环境保护，确保如期实现碳达峰碳中和目标。'
          },
          {
            title: '二、主要目标',
            content: '到2025年，单位国内生产总值能源消耗比2020年下降13.5%，单位国内生产总值二氧化碳排放比2020年下降18%，为实现碳达峰奠定坚实基础。'
          },
          {
            title: '三、重点任务',
            content: '1. 优化产业结构，推动传统产业绿色转型升级；\n2. 发展清洁能源，提高可再生能源占比；\n3. 推进碳汇建设，增强生态系统固碳能力；\n4. 完善碳市场机制，充分发挥市场配置资源作用。'
          },
          {
            title: '四、保障措施',
            content: '1. 加强组织领导，建立健全工作机制；\n2. 加大资金投入，完善财税金融支持政策；\n3. 强化科技支撑，推进低碳技术创新；\n4. 加强宣传引导，营造全社会参与氛围。'
          }
        ],
        attachments: [
          '附件1：重点行业碳减排技术指南.pdf',
          '附件2：碳排放核算方法与报告指南.pdf'
        ]
      }
    },
    2: {
      title: '农村碳汇补贴政策',
      type: '补贴政策',
      number: '农发〔2024〕08号',
      date: '2024-02-20',
      department: '农业农村部',
      icon: '💰',
      content: {
        introduction: '为鼓励农村地区开展碳汇项目建设，促进农业农村绿色低碳发展，现就农村碳汇补贴政策通知如下：',
        sections: [
          {
            title: '一、补贴对象',
            content: '在农村地区开展植树造林、土壤固碳、农田管理等碳汇项目的农户、合作社、企业等主体。'
          },
          {
            title: '二、补贴标准',
            content: '1. 植树造林项目：每亩补贴500-1000元；\n2. 土壤固碳项目：每吨CO₂补贴50-80元；\n3. 农田管理项目：每亩补贴200-500元。'
          },
          {
            title: '三、申请流程',
            content: '1. 项目申报：向当地农业农村部门提交申请；\n2. 审核验收：组织专家进行现场验收；\n3. 资金拨付：验收合格后拨付补贴资金。'
          }
        ],
        attachments: [
          '附件1：农村碳汇项目申报表.doc',
          '附件2：碳汇量计算方法.pdf'
        ]
      }
    },
    3: {
      title: 'ESG评级标准更新',
      type: '标准规范',
      number: '标准〔2024〕12号',
      date: '2024-01-10',
      department: '生态环境部',
      icon: '📊',
      content: {
        introduction: '根据国际ESG评级体系最新要求，结合我国实际情况，对企业ESG评级标准进行更新：',
        sections: [
          {
            title: '一、评级维度',
            content: '环境(E)：碳排放、能源消耗、污染防治、生物多样性保护等；\n社会(S)：员工权益、社区关系、产品安全、供应链管理等；\n治理(G)：公司治理、商业道德、风险管理、信息披露等。'
          },
          {
            title: '二、评级方法',
            content: '采用定量与定性相结合的方式，各维度权重为E(40%)、S(30%)、G(30%)，根据企业实际表现进行综合评分。'
          },
          {
            title: '三、评级等级',
            content: 'AAA级：90分以上，ESG表现卓越；\nAA级：80-89分，ESG表现优秀；\nA级：70-79分，ESG表现良好；\nBBB级：60-69分，ESG表现合格；\nBB级及以下：60分以下，需要改进。'
          }
        ],
        attachments: [
          '附件1：ESG评级指标体系.xlsx',
          '附件2：ESG信息披露模板.doc'
        ]
      }
    }
  }

  const policy = policyData[id as keyof typeof policyData] || policyData[1]

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
          <h1 className="text-xl font-bold">政策详情</h1>
        </div>

        {/* 政策基本信息 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/20 rounded-xl p-4"
        >
          <div className="flex items-start gap-4">
            <div className="text-4xl">{policy.icon}</div>
            <div className="flex-1">
              <h2 className="text-xl font-bold mb-2">{policy.title}</h2>
              <div className="space-y-1 text-sm text-white/90">
                <div className="flex items-center gap-2">
                  <FileText size={14} />
                  <span>文号：{policy.number}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={14} />
                  <span>发布日期：{policy.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen size={14} />
                  <span>发布部门：{policy.department}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="p-4">
        {/* 政策内容 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl p-6 shadow-sm mb-4"
        >
          <p className="text-gray-700 leading-relaxed mb-6">
            {policy.content.introduction}
          </p>

          {policy.content.sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="mb-6 last:mb-0"
            >
              <h3 className="font-bold text-lg text-blue-600 mb-3">
                {section.title}
              </h3>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {section.content}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* 附件下载 */}
        {policy.content.attachments && policy.content.attachments.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-xl p-4 shadow-sm mb-4"
          >
            <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
              <Download size={18} />
              相关附件
            </h3>
            <div className="space-y-2">
              {policy.content.attachments.map((attachment, index) => (
                <button
                  key={index}
                  className="w-full text-left p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors flex items-center justify-between group"
                >
                  <span className="text-sm text-gray-700">{attachment}</span>
                  <Download size={16} className="text-blue-600 group-hover:translate-y-0.5 transition-transform" />
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* 操作按钮 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex gap-3"
        >
          <button className="flex-1 bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors flex items-center justify-center gap-2">
            <Download size={18} />
            下载政策文件
          </button>
          <button className="flex-1 bg-white border-2 border-blue-500 text-blue-500 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors flex items-center justify-center gap-2">
            <Share2 size={18} />
            分享政策
          </button>
        </motion.div>
      </div>
    </div>
  )
}

export default BluePolicyDetail
