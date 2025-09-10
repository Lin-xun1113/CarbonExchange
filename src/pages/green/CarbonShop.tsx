import { useState } from 'react'
import { Search, ShoppingCart } from 'lucide-react'
import { motion } from 'framer-motion'

const CarbonShop = () => {
  const [searchQuery, setSearchQuery] = useState('')
  
  const products = [
    { id: 1, name: '食用油', category: '兑换', points: 2600, image: '🛢️' },
    { id: 2, name: '面粉', category: '兑换', points: 2500, image: '🌾' },
    { id: 3, name: '工具套组', category: '兑换', points: 3100, image: '🔧' },
    { id: 4, name: '餐具套组', category: '兑换', points: 3780, image: '🍽️' },
    { id: 5, name: '大米', category: '兑换', points: 2800, image: '🍚' },
    { id: 6, name: '化肥', category: '兑换', points: 1500, image: '🌱' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* 头部 */}
      <div className="bg-gradient-to-r from-green-400 to-green-500 text-white p-4">
        <h1 className="text-xl font-bold text-center mb-4">碳积分商城</h1>
        
        {/* 搜索框 */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="搜索商品"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-full text-gray-700 bg-white/95"
          />
        </div>
      </div>

      {/* 商品网格 */}
      <div className="p-4">
        <div className="grid grid-cols-2 gap-4">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
            >
              {/* 产品图片区域 */}
              <div className="aspect-square bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center relative">
                <span className="text-5xl">{product.image}</span>
                <span className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                  {product.category}
                </span>
              </div>
              
              {/* 产品信息 */}
              <div className="p-3">
                <h3 className="font-semibold text-gray-800 mb-1">{product.name}</h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <span className="text-green-600 text-lg font-bold">{product.points}</span>
                    <span className="text-gray-500 text-sm">积分</span>
                  </div>
                  <button className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <ShoppingCart className="text-white" size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 购物车浮动按钮 */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: "spring" }}
          className="fixed bottom-32 right-4"
        >
          <button className="w-14 h-14 bg-green-500 rounded-full shadow-lg flex items-center justify-center relative">
            <ShoppingCart className="text-white" size={24} />
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
              3
            </span>
          </button>
        </motion.div>
      </div>
    </div>
  )
}

export default CarbonShop
