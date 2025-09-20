import { useState } from 'react'
import { Search, ShoppingCart, Plus, Minus, X, TrendingUp } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useBlueCart } from '../../contexts/BlueCartContext'

const CarbonMarket = () => {
  const { cartItems, addToCart, updateCartQuantity, getCartTotal } = useBlueCart()
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState('village')
  const [showCart, setShowCart] = useState(false)
  const [showQuantityModal, setShowQuantityModal] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [selectedQuantity, setSelectedQuantity] = useState(1)

  const villageProjects = [
    { id: 11, name: '王家村碳汇包', price: 68, carbon: 1000, image: '🏘️', type: '村级' },
    { id: 12, name: '刘家村碳汇包', price: 89, carbon: 1700, image: '🏡', type: '村级' },
    { id: 13, name: '赵家村碳汇包', price: 75, carbon: 1200, image: '🌾', type: '村级' },
    { id: 14, name: '李家村碳汇包', price: 82, carbon: 1500, image: '🌳', type: '村级' },
    { id: 15, name: '陈家村碳汇包', price: 70, carbon: 1100, image: '🏞️', type: '村级' },
    { id: 16, name: '张家村碳汇包', price: 95, carbon: 2000, image: '🌲', type: '村级' }
  ]

  const enterpriseProjects = [
    { id: 21, name: '永兴集团碳汇包', price: 55, carbon: 5000, image: '🏢', type: '企业级' },
    { id: 22, name: '昌地集团碳汇包', price: 78, carbon: 7500, image: '🏭', type: '企业级' },
    { id: 23, name: '绿源科技碳汇包', price: 65, carbon: 6000, image: '🏗️', type: '企业级' },
    { id: 24, name: '环保工业碳汇包', price: 72, carbon: 6800, image: '🏪', type: '企业级' },
    { id: 25, name: '清洁能源碳汇包', price: 80, carbon: 8000, image: '⚡', type: '企业级' },
    { id: 26, name: '生态农业碳汇包', price: 68, carbon: 5500, image: '🌱', type: '企业级' }
  ]

  const chartData = {
    labels: ['9', '10', '11', '12', '1', '2'],
    values: [30, 45, 60, 55, 70, 85]
  }

  const handleAddToCart = (product: any) => {
    setSelectedProduct(product)
    setSelectedQuantity(1)
    setShowQuantityModal(true)
  }

  const confirmAddToCart = () => {
    if (selectedProduct) {
      for (let i = 0; i < selectedQuantity; i++) {
        addToCart({
          id: selectedProduct.id,
          name: selectedProduct.name,
          price: selectedProduct.price,
          carbon: selectedProduct.carbon,
          image: selectedProduct.image
        })
      }
      setShowQuantityModal(false)
      setSelectedProduct(null)
      setSelectedQuantity(1)
    }
  }

  const cartTotal = getCartTotal()

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* 头部 */}
      <div className="bg-gradient-to-r from-blue-400 to-blue-500 text-white p-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold">碳汇商城</h1>
          {/* 购物车图标 */}
          <button
            onClick={() => setShowCart(true)}
            className="relative p-2 bg-white/20 rounded-full"
          >
            <ShoppingCart size={20} />
            {cartItems.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            )}
          </button>
        </div>
        
        {/* 搜索框 */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="搜索碳汇包"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-full text-gray-700 bg-white/95"
          />
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* 标签切换 */}
        <div className="flex gap-4">
          <button
            onClick={() => setActiveTab('village')}
            className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'village' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            村级碳汇包
          </button>
          <button
            onClick={() => setActiveTab('enterprise')}
            className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'enterprise' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            企业级碳汇包
          </button>
        </div>

        {/* 碳汇包列表 */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold">
              {activeTab === 'village' ? '村级碳汇包' : '企业级碳汇包'}
            </h3>
            <span className="text-sm text-gray-500">
              共{activeTab === 'village' ? villageProjects.length : enterpriseProjects.length}个产品
            </span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {(activeTab === 'village' ? villageProjects : enterpriseProjects)
              .filter(project => project.name.includes(searchQuery))
              .map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden"
              >
                <div className="aspect-video bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                  <span className="text-6xl">{project.image}</span>
                </div>
                <div className="p-4">
                  <h4 className="font-semibold text-sm mb-2">{project.name}</h4>
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="text-xs text-gray-500">价格</p>
                      <p className="font-bold text-blue-600">¥{project.price}/吨</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">数量</p>
                      <p className="font-bold">{project.carbon}吨</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleAddToCart(project)}
                    className="w-full bg-blue-500 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors"
                  >
                    购买
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 实时碳汇数据 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl p-4 shadow-lg"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold">实时碳汇数据</h3>
            <TrendingUp className="text-green-500" size={20} />
          </div>
          
          {/* 简化图表 */}
          <div className="h-40 flex items-end justify-around relative">
            {chartData.values.map((value, index) => (
              <div key={index} className="flex-1 mx-1 flex flex-col items-center">
                <span className="text-xs text-blue-600 mb-1 font-medium">{value}%</span>
                <motion.div 
                  className="w-full bg-gradient-to-t from-blue-500 to-blue-300 rounded-t transition-all duration-700"
                  initial={{ height: 0 }}
                  animate={{ height: `${(value / 100) * 100}%` }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  style={{ minHeight: '12px' }}
                />
                <span className="text-xs text-gray-500 mt-2">{chartData.labels[index]}月</span>
              </div>
            ))}
          </div>
          
          <div className="mt-4 grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-xs text-gray-500">今日成交</p>
              <p className="font-bold text-blue-600">1,234吨</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">平均价格</p>
              <p className="font-bold text-green-600">¥72/吨</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">涨跌幅</p>
              <p className="font-bold text-red-600">+3.2%</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* 数量选择弹窗 */}
      <AnimatePresence>
        {showQuantityModal && selectedProduct && (
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
              className="bg-white rounded-2xl p-6 max-w-sm w-full"
            >
              <h3 className="text-lg font-bold mb-4">选择购买数量</h3>
              
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="text-3xl">{selectedProduct.image}</div>
                  <div className="flex-1">
                    <h4 className="font-semibold">{selectedProduct.name}</h4>
                    <p className="text-sm text-gray-500">¥{selectedProduct.price}/吨 · {selectedProduct.carbon}吨</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">购买份数：</span>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setSelectedQuantity(Math.max(1, selectedQuantity - 1))}
                      className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center hover:bg-blue-200"
                    >
                      <Minus size={16} className="text-blue-600" />
                    </button>
                    <span className="font-bold text-lg w-12 text-center">{selectedQuantity}</span>
                    <button
                      onClick={() => setSelectedQuantity(selectedQuantity + 1)}
                      className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center hover:bg-blue-200"
                    >
                      <Plus size={16} className="text-blue-600" />
                    </button>
                  </div>
                </div>
                
                <div className="mt-3 pt-3 border-t">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-600">碳汇量：</span>
                    <span className="font-semibold">{(selectedProduct.carbon * selectedQuantity).toLocaleString()} 吨</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">总价：</span>
                    <span className="font-bold text-lg text-blue-600">
                      ¥{(selectedProduct.price * selectedProduct.carbon * selectedQuantity).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowQuantityModal(false)}
                  className="flex-1 py-2.5 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200"
                >
                  取消
                </button>
                <button
                  onClick={confirmAddToCart}
                  className="flex-1 py-2.5 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600"
                >
                  加入购物车
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 购物车侧边栏 */}
      <AnimatePresence>
        {showCart && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={() => setShowCart(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween' }}
              className="absolute right-0 top-0 h-full w-80 bg-white shadow-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 border-b">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold">购物车</h3>
                  <button
                    onClick={() => setShowCart(false)}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4" style={{ maxHeight: 'calc(100vh - 200px)' }}>
                {cartItems.length === 0 ? (
                  <div className="text-center py-12">
                    <ShoppingCart className="mx-auto mb-4 text-gray-300" size={48} />
                    <p className="text-gray-500">购物车为空</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cartItems.map(item => (
                      <div key={item.id} className="bg-gray-50 rounded-lg p-3">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-2xl">{item.image}</span>
                          <div className="flex-1">
                            <h4 className="font-semibold text-sm">{item.name}</h4>
                            <p className="text-xs text-gray-500">¥{item.price}/吨 · {item.carbon}吨</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                              className="w-7 h-7 bg-white rounded hover:bg-gray-100"
                            >
                              <Minus size={14} className="mx-auto" />
                            </button>
                            <span className="w-8 text-center text-sm">{item.quantity}</span>
                            <button
                              onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                              className="w-7 h-7 bg-white rounded hover:bg-gray-100"
                            >
                              <Plus size={14} className="mx-auto" />
                            </button>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-semibold text-blue-600">
                              ¥{(item.price * item.carbon * item.quantity).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {cartItems.length > 0 && (
                <div className="border-t p-4">
                  <div className="mb-3 space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>总碳汇：</span>
                      <span className="font-semibold">{cartTotal.totalCarbon.toLocaleString()} 吨</span>
                    </div>
                    <div className="flex justify-between">
                      <span>总价：</span>
                      <span className="text-lg font-bold text-blue-600">
                        ¥{cartTotal.totalPrice.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <button
                    className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors"
                  >
                    立即结算
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default CarbonMarket
