import { useState } from 'react'
import { Search, Globe, Award } from 'lucide-react'
import { motion } from 'framer-motion'

const BlueHome = () => {
  const [searchQuery, setSearchQuery] = useState('')

  const policies = [
    { 
      id: 1, 
      title: '国家碳减排新规定', 
      type: '政策通知',
      description: '政策编号：国发〔2024〕15号',
      icon: '📋'
    }
  ]

  const carbonProjects = [
    { id: 1, name: '王家村智慧稻田项目', carbon: 1200, price: 69, image: '🌾' },
    { id: 2, name: '张家村循环农业项目', carbon: 1800, price: 80, image: '♻️' }
  ]

  const publicBenefits = [
    { 
      id: 1, 
      title: '永兴集团购买碳汇数量满沟公告', 
      date: '【2024年10月31日至次年6月】',
      description: '永兴集团购买碳汇数量满沟达标，声名远扬，将在2024年8月31日CCTV10000积分活动作出贡献表彰...'
    },
    {
      id: 2,
      title: '昌地集团购买碳汇相关动态',
      date: '【2024年10月31日至次年6月】',
      description: '昌地集团积极响应国家绿色发展倡议,在过去六个月中累计购买碳汇...'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* 头部 */}
      <div className="bg-gradient-to-r from-blue-400 to-blue-500 text-white p-4">
        <h1 className="text-xl font-bold text-center mb-4">首页</h1>
        
        {/* 搜索框 */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="搜索相关政策"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-full text-gray-700 bg-white/95"
          />
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* 政策通知 */}
        <div>
          <h2 className="text-lg font-bold mb-3">政策通知</h2>
          <div className="space-y-3">
            {policies.map((policy, index) => (
              <motion.div
                key={policy.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white relative overflow-hidden"
              >
                <div className="absolute right-4 top-4 text-4xl opacity-20">{policy.icon}</div>
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-2">
                    <Globe className="w-5 h-5" />
                    <span className="text-sm bg-white/20 px-2 py-0.5 rounded-full">{policy.type}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-1">{policy.title}</h3>
                  <p className="text-blue-100 text-sm">{policy.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 村级碳汇产品推荐 */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold">村级碳汇产品推荐</h2>
            <span className="text-sm text-blue-600">右划查看更多 {'>'}</span>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {carbonProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-4 shadow-lg flex-shrink-0 w-48"
              >
                <div className="h-24 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center mb-3">
                  <span className="text-4xl">{project.image}</span>
                </div>
                <h3 className="font-semibold text-sm mb-2">{project.name}</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500">碳汇总量</p>
                    <p className="font-bold text-blue-600">{project.carbon}吨</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">价格</p>
                    <p className="font-bold text-green-600">¥{project.price}/吨</p>
                  </div>
                </div>
                <button className="w-full mt-3 bg-blue-500 text-white py-2 rounded-lg text-sm font-medium">
                  立即购买
                </button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 交易动态公告栏 */}
        <div>
          <h2 className="text-lg font-bold mb-3">交易动态公告栏</h2>
          <div className="space-y-3">
            {publicBenefits.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-4"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-blue-200 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Award className="text-blue-600" size={20} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm mb-1">{item.title}</h3>
                    <p className="text-xs text-blue-600 mb-2">{item.date}</p>
                    <p className="text-xs text-gray-600 line-clamp-2">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlueHome
