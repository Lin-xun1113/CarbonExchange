import { useState } from 'react'
import { Search, Globe, Award, ShoppingCart, X, Plus, Minus, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useBlueCart } from '../../contexts/BlueCartContext'

const BlueHome = () => {
  const navigate = useNavigate()
  const { cartItems, addToCart, updateCartQuantity, getCartTotal } = useBlueCart()
  const [searchQuery, setSearchQuery] = useState('')
  const [showCart, setShowCart] = useState(false)
  const [showQuantityModal, setShowQuantityModal] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [selectedQuantity, setSelectedQuantity] = useState(1)
  const [showSearchResults, setShowSearchResults] = useState(false)

  // 扩充政策数据
  const allPolicies = [
    { 
      id: 1, 
      title: '国家碳减排新规定', 
      type: '政策通知',
      description: '政策编号：国发〔2024〕15号',
      icon: '📋',
      content: '为深入贯彻落实党中央、国务院关于碳达峰碳中和的重大战略决策...',
      date: '2024-03-15'
    },
    {
      id: 2,
      title: '农村碳汇补贴政策',
      type: '补贴政策',
      description: '政策编号：农发〔2024〕08号',
      icon: '💰',
      content: '关于进一步加强农村碳汇项目补贴的实施意见...',
      date: '2024-02-20'
    },
    {
      id: 3,
      title: 'ESG评级标准更新',
      type: '标准规范',
      description: '政策编号：标准〔2024〕12号',
      icon: '📊',
      content: '根据国际ESG评级体系最新要求，对企业ESG评级标准进行调整...',
      date: '2024-01-10'
    }
  ]

  // 扩充碳汇产品数据
  const carbonProjects = [
    { id: 1, name: '王家村智慧稻田项目', carbon: 1200, price: 69, image: '🌾' },
    { id: 2, name: '张家村循环农业项目', carbon: 1800, price: 80, image: '♻️' },
    { id: 3, name: '李家村生态茶园项目', carbon: 950, price: 75, image: '🍵' },
    { id: 4, name: '赵家村有机果园项目', carbon: 1500, price: 72, image: '🍎' },
    { id: 5, name: '陈家村竹林碳汇项目', carbon: 2200, price: 65, image: '🎋' },
    { id: 6, name: '刘家村湿地保护项目', carbon: 3000, price: 85, image: '🦆' }
  ]

  // 扩充公告数据
  const publicBenefits = [
    { 
      id: 1, 
      title: '永兴集团购买碳汇数量满额公告', 
      date: '【2024年10月31日至次年6月】',
      description: '永兴集团购买碳汇数量满额达标，声名远扬，将在2024年8月31日CCTV10000积分活动作出贡献表彰...',
      type: 'achievement'
    },
    {
      id: 2,
      title: '昌地集团购买碳汇相关动态',
      date: '【2024年10月31日至次年6月】',
      description: '昌地集团积极响应国家绿色发展倡议,在过去六个月中累计购买碳汇...',
      type: 'transaction'
    },
    {
      id: 3,
      title: '绿色发展基金成立公告',
      date: '【2024年09月15日】',
      description: '为进一步推动碳中和目标实现，特成立绿色发展基金，首期募集资金10亿元...',
      type: 'fund'
    }
  ]

  // 搜索政策
  const filteredPolicies = allPolicies.filter(policy => 
    policy.title.includes(searchQuery) || 
    policy.description.includes(searchQuery) ||
    policy.type.includes(searchQuery)
  )

  // 处理产品购买
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

  const handleCheckout = () => {
    // 处理结算
    alert('结算功能开发中...')
  }

  const cartTotal = getCartTotal()

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* 头部 */}
      <div className="bg-gradient-to-r from-blue-400 to-blue-500 text-white p-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold">首页</h1>
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
            placeholder="搜索相关政策"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value)
              setShowSearchResults(e.target.value.length > 0)
            }}
            onFocus={() => setShowSearchResults(searchQuery.length > 0)}
            className="w-full pl-10 pr-4 py-3 rounded-full text-gray-700 bg-white/95"
          />
        </div>

        {/* 搜索结果 */}
        <AnimatePresence>
          {showSearchResults && filteredPolicies.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute left-4 right-4 mt-2 bg-white rounded-lg shadow-lg z-20 max-h-60 overflow-y-auto"
            >
              {filteredPolicies.map(policy => (
                <button
                  key={policy.id}
                  onClick={() => {
                    navigate(`/blue/policy-detail/${policy.id}`)
                    setShowSearchResults(false)
                  }}
                  className="w-full p-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-0"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{policy.icon}</span>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800 text-sm">{policy.title}</h4>
                      <p className="text-xs text-gray-500">{policy.type} - {policy.date}</p>
                    </div>
                  </div>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="p-4 space-y-6 relative">
        {/* 遮罩层 */}
        {showSearchResults && (
          <div
            className="fixed inset-0 z-10"
            onClick={() => setShowSearchResults(false)}
          />
        )}

        {/* 政策通知 */}
        <div>
          <h2 className="text-lg font-bold mb-3">政策通知</h2>
          <div className="space-y-3">
            {allPolicies.slice(0, 2).map((policy, index) => (
              <motion.div
                key={policy.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => navigate(`/blue/policy-detail/${policy.id}`)}
                className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white relative overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
              >
                <div className="absolute right-4 top-4 text-4xl opacity-20">{policy.icon}</div>
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-2">
                    <Globe className="w-5 h-5" />
                    <span className="text-sm bg-white/20 px-2 py-0.5 rounded-full">{policy.type}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-1">{policy.title}</h3>
                  <p className="text-blue-100 text-sm">{policy.description}</p>
                  <div className="mt-3 flex items-center gap-1 text-white/80">
                    <span className="text-sm">查看详情</span>
                    <ChevronRight size={16} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 村级碳汇产品推荐 */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold">村级碳汇产品推荐</h2>
            <button
              onClick={() => navigate('/blue/shop')}
              className="text-sm text-blue-600 flex items-center gap-1"
            >
              查看全部
              <ChevronRight size={16} />
            </button>
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
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-xs text-gray-500">碳汇总量</p>
                    <p className="font-bold text-blue-600">{project.carbon}吨</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">价格</p>
                    <p className="font-bold text-green-600">¥{project.price}/吨</p>
                  </div>
                </div>
                <button
                  onClick={() => handleAddToCart(project)}
                  className="w-full bg-blue-500 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors"
                >
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
                onClick={() => navigate(`/blue/announcement/${item.id}`)}
                className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-4 cursor-pointer hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-blue-200 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Award className="text-blue-600" size={20} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm mb-1">{item.title}</h3>
                    <p className="text-xs text-blue-600 mb-2">{item.date}</p>
                    <p className="text-xs text-gray-600 line-clamp-2">{item.description}</p>
                    <div className="mt-2 flex items-center gap-1 text-blue-600">
                      <span className="text-xs">查看详情</span>
                      <ChevronRight size={12} />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
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
                  <span className="text-sm text-gray-600">购买吨数：</span>
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
                    onClick={handleCheckout}
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

export default BlueHome
