import { useState } from 'react'
import { ShoppingCart, Search, Leaf, Star, Plus, Minus, X, CheckCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePoints } from '../../contexts/PointsContext'

interface Product {
  id: number
  name: string
  points: number
  icon: string
  category: string
  description: string
}

const CarbonShop = () => {
  const { points, cartItems, addToCart, removeFromCart, updateCartQuantity, getCartTotal, deductPoints, clearCart } = usePoints()
  const [selectedCategory, setSelectedCategory] = useState('全部')
  const [showCart, setShowCart] = useState(false)
  const [showCheckoutSuccess, setShowCheckoutSuccess] = useState(false)
  const [showQuantityModal, setShowQuantityModal] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [selectedQuantity, setSelectedQuantity] = useState(1)

  const categories = ['全部', '农具', '肥料', '种子', '生活用品']
  
  const products: Product[] = [
    { id: 1, name: '有机肥料', points: 500, icon: '🌱', category: '肥料', description: '优质有机肥，改善土壤' },
    { id: 2, name: '优质种子', points: 300, icon: '🌾', category: '种子', description: '高产优质农作物种子' },
    { id: 3, name: '农用工具套装', points: 1000, icon: '🛠️', category: '农具', description: '耐用农具套装' },
    { id: 4, name: '环保购物袋', points: 200, icon: '🛍️', category: '生活用品', description: '可重复使用购物袋' },
    { id: 5, name: '节水灌溉设备', points: 1500, icon: '💧', category: '农具', description: '智能节水灌溉系统' },
    { id: 6, name: '生物农药', points: 400, icon: '🦟', category: '肥料', description: '环保生物农药' },
    { id: 7, name: '太阳能灯', points: 800, icon: '💡', category: '生活用品', description: '太阳能充电照明灯' },
    { id: 8, name: '土壤检测仪', points: 2000, icon: '📊', category: '农具', description: '智能土壤检测设备' }
  ]

  const filteredProducts = selectedCategory === '全部' 
    ? products 
    : products.filter(p => p.category === selectedCategory)

  const handleAddToCartClick = (product: Product) => {
    setSelectedProduct(product)
    setSelectedQuantity(1)
    setShowQuantityModal(true)
  }

  const handleConfirmAddToCart = () => {
    if (selectedProduct) {
      for (let i = 0; i < selectedQuantity; i++) {
        addToCart({
          id: selectedProduct.id,
          name: selectedProduct.name,
          points: selectedProduct.points,
          icon: selectedProduct.icon
        })
      }
    }
    setShowQuantityModal(false)
    setSelectedProduct(null)
    setSelectedQuantity(1)
  }

  const handleCancelAddToCart = () => {
    setShowQuantityModal(false)
    setSelectedProduct(null)
    setSelectedQuantity(1)
  }

  const handleCheckout = () => {
    const total = getCartTotal()
    if (total <= points) {
      // 扣除积分
      deductPoints(total, `兑换商品：${cartItems.map(item => item.name).join('、')}`)
      // 清空购物车
      clearCart()
      // 显示成功提示
      setShowCheckoutSuccess(true)
      setShowCart(false)
      
      // 3秒后隐藏成功提示
      setTimeout(() => {
        setShowCheckoutSuccess(false)
      }, 3000)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* 头部 */}
      <div className="bg-gradient-to-r from-green-400 to-green-500 text-white p-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold">碳积分商城</h1>
          <button
            onClick={() => setShowCart(true)}
            className="relative p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
          >
            <ShoppingCart size={24} />
            {cartItems.length > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center"
              >
                {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
              </motion.span>
            )}
          </button>
        </div>

        {/* 积分显示 */}
        <div className="bg-white/20 rounded-lg p-3 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Star className="text-yellow-300" size={20} />
              <span className="text-sm">我的积分</span>
            </div>
            <span className="text-xl font-bold">{points}</span>
          </div>
        </div>

        {/* 搜索框 */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70" size={20} />
          <input
            type="text"
            placeholder="搜索商品"
            className="w-full pl-10 pr-4 py-2 bg-white/20 rounded-lg placeholder-white/70 text-white"
          />
        </div>
      </div>

      <div className="p-4">
        {/* 分类标签 */}
        <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                selectedCategory === category
                  ? 'bg-green-500 text-white'
                  : 'bg-white text-gray-600'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* 商品列表 - 更大的正方形容器 */}
        <div className="grid grid-cols-2 gap-4">
          {filteredProducts.map((product, index) => {
            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow aspect-square flex flex-col"
              >
                {/* 商品图标区域 - 调整位置更居中 */}
                <div className="flex-1 flex items-center justify-center pt-4 pb-2">
                  <div className="text-7xl">{product.icon}</div>
                </div>
                
                {/* 商品信息区域 */}
                <div className="p-4 pt-2">
                  <h3 className="font-bold text-gray-800 text-sm mb-1 text-center">{product.name}</h3>
                  <p className="text-xs text-gray-500 mb-3 line-clamp-2 text-center">{product.description}</p>
                  
                  <div className="flex items-center justify-center mb-3">
                    <div className="flex items-center gap-1">
                      <Leaf className="text-green-500" size={14} />
                      <span className="font-bold text-green-600">{product.points}</span>
                      <span className="text-xs text-gray-400">积分</span>
                    </div>
                  </div>

                  {/* 始终显示加入购物车按钮 */}
                  <button
                    onClick={() => handleAddToCartClick(product)}
                    className="w-full bg-green-500 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-green-600 transition-colors flex items-center justify-center gap-1"
                  >
                    <Plus size={16} />
                    加入购物车
                  </button>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* 数量选择弹窗 */}
      <AnimatePresence>
        {showQuantityModal && selectedProduct && (
          <>
            {/* 遮罩层 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-[60]"
              onClick={handleCancelAddToCart}
            />

            {/* 弹窗内容 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed inset-x-4 top-[30%] -translate-y-1/2 bg-white rounded-2xl shadow-xl z-[60] max-w-sm mx-auto"
            >
              <div className="p-6">
                {/* 商品信息 */}
                <div className="text-center mb-6">
                  <div className="text-6xl mb-3">{selectedProduct.icon}</div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">{selectedProduct.name}</h3>
                  <p className="text-sm text-gray-500 mb-3">{selectedProduct.description}</p>
                  <div className="flex items-center justify-center gap-1">
                    <Leaf className="text-green-500" size={16} />
                    <span className="font-bold text-green-600">{selectedProduct.points}</span>
                    <span className="text-sm text-gray-400">积分/件</span>
                  </div>
                </div>

                {/* 数量选择 */}
                <div className="mb-6">
                  <p className="text-sm text-gray-600 mb-3 text-center">选择数量</p>
                  <div className="flex items-center justify-center gap-4">
                    <button
                      onClick={() => setSelectedQuantity(Math.max(1, selectedQuantity - 1))}
                      className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                    >
                      <Minus size={20} className="text-gray-600" />
                    </button>
                    <span className="text-2xl font-bold text-green-600 w-12 text-center">{selectedQuantity}</span>
                    <button
                      onClick={() => setSelectedQuantity(selectedQuantity + 1)}
                      className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                    >
                      <Plus size={20} className="text-gray-600" />
                    </button>
                  </div>
                </div>

                {/* 总计 */}
                <div className="bg-green-50 rounded-lg p-3 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">总计</span>
                    <div className="flex items-center gap-1">
                      <span className="text-xl font-bold text-green-600">{selectedProduct.points * selectedQuantity}</span>
                      <span className="text-sm text-gray-400">积分</span>
                    </div>
                  </div>
                </div>

                {/* 积分不足提示 */}
                {selectedProduct.points * selectedQuantity > points && (
                  <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-4 text-center">
                    积分不足，还差 {selectedProduct.points * selectedQuantity - points} 积分
                  </div>
                )}

                {/* 操作按钮 */}
                <div className="flex gap-3">
                  <button
                    onClick={handleCancelAddToCart}
                    className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                  >
                    返回
                  </button>
                  <button
                    onClick={handleConfirmAddToCart}
                    disabled={selectedProduct.points * selectedQuantity > points}
                    className="flex-1 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    确认兑换
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* 购物车侧边栏 */}
      <AnimatePresence>
        {showCart && (
          <>
            {/* 遮罩层 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-[55]"
              onClick={() => setShowCart(false)}
            />

            {/* 购物车内容 */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween' }}
              className="fixed right-0 top-0 bottom-0 w-80 bg-white shadow-xl z-[60] flex flex-col pb-20"
            >
              {/* 购物车头部 */}
              <div className="bg-green-500 text-white p-4 flex items-center justify-between">
                <h2 className="text-lg font-bold flex items-center gap-2">
                  <ShoppingCart size={20} />
                  购物车
                </h2>
                <button
                  onClick={() => setShowCart(false)}
                  className="p-1 hover:bg-white/20 rounded"
                >
                  <X size={20} />
                </button>
              </div>

              {/* 购物车内容 */}
              <div className="flex-1 overflow-y-auto p-4">
                {cartItems.length === 0 ? (
                  <div className="text-center text-gray-500 mt-8">
                    <ShoppingCart size={48} className="mx-auto mb-4 text-gray-300" />
                    <p>购物车是空的</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {cartItems.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        className="bg-gray-50 rounded-lg p-3"
                      >
                        <div className="flex items-start gap-3">
                          <div className="text-3xl">{item.icon}</div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-800">{item.name}</h4>
                            <div className="flex items-center justify-between mt-2">
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                                  className="p-1 bg-white rounded hover:bg-gray-200 transition-colors"
                                >
                                  <Minus size={14} />
                                </button>
                                <span className="font-semibold w-8 text-center">{item.quantity}</span>
                                <button
                                  onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                                  className="p-1 bg-white rounded hover:bg-gray-200 transition-colors"
                                >
                                  <Plus size={14} />
                                </button>
                              </div>
                              <div className="text-right">
                                <p className="text-sm text-gray-500">{item.points} × {item.quantity}</p>
                                <p className="font-semibold text-green-600">{item.points * item.quantity} 积分</p>
                              </div>
                            </div>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="p-1 hover:bg-gray-200 rounded transition-colors"
                          >
                            <X size={16} className="text-gray-500" />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* 购物车底部 */}
              {cartItems.length > 0 && (
                <div className="border-t p-4 mb-2">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-gray-600">总计</span>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-green-600">{getCartTotal()}</p>
                      <p className="text-xs text-gray-500">积分</p>
                    </div>
                  </div>
                  
                  {getCartTotal() > points ? (
                    <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-3">
                      积分不足，还差 {getCartTotal() - points} 积分
                    </div>
                  ) : null}

                  <button
                    onClick={handleCheckout}
                    disabled={getCartTotal() > points || cartItems.length === 0}
                    className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    确认兑换
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* 兑换成功提示 */}
      <AnimatePresence>
        {showCheckoutSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-24 left-4 right-4 bg-green-500 text-white rounded-lg p-4 shadow-lg z-[60]"
          >
            <div className="flex items-center gap-3">
              <CheckCircle size={24} />
              <div>
                <p className="font-semibold">兑换成功！</p>
                <p className="text-sm opacity-90">商品将尽快为您配送</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default CarbonShop
