import { Outlet, NavLink, useLocation } from 'react-router-dom'
import { Home, Package, LineChart, User } from 'lucide-react'
import { motion } from 'framer-motion'

const OrangeLayout = () => {
  const location = useLocation()

  const navItems = [
    { path: '/orange', icon: Home, label: '首页' },
    { path: '/orange/manage', icon: Package, label: '积分打包' },
    { path: '/orange/analysis', icon: LineChart, label: '收益分红' },
    { path: '/orange/profile', icon: User, label: '我的' },
  ]

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* 顶部状态栏 */}
      <div className="bg-gradient-to-r from-orange-400 to-orange-500 text-white px-4 py-2 flex justify-between items-center">
        <span className="text-sm">9:41</span>
        <div className="flex gap-1">
          <span className="text-sm">•••</span>
          <span className="text-sm">📶</span>
          <span className="text-sm">🔋</span>
        </div>
      </div>

      {/* 主内容区域 */}
      <div className="flex-1 overflow-y-auto pb-20">
        <Outlet />
      </div>

      {/* 底部导航 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-50">
        <div className="flex justify-around items-center py-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path
            
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className="flex flex-col items-center gap-1 px-4 py-2 relative"
              >
                {isActive && (
                  <motion.div
                    layoutId="orangeActiveTab"
                    className="absolute inset-0 bg-orange-100 rounded-lg"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
                <Icon 
                  size={20} 
                  className={`relative z-10 ${isActive ? 'text-orange-600' : 'text-gray-500'}`}
                />
                <span 
                  className={`text-xs relative z-10 ${isActive ? 'text-orange-600 font-medium' : 'text-gray-500'}`}
                >
                  {item.label}
                </span>
              </NavLink>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default OrangeLayout
