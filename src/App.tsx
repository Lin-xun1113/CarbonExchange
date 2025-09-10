import { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

// 导入三个主题的布局组件
import GreenLayout from './layouts/GreenLayout'
import BlueLayout from './layouts/BlueLayout'
import OrangeLayout from './layouts/OrangeLayout'

// 导入绿色主题页面
import GreenHome from './pages/green/Home'
import FarmRecord from './pages/green/FarmRecord'
import CarbonShop from './pages/green/CarbonShop'
import GreenProfile from './pages/green/Profile'

// 导入蓝色主题页面
import BlueHome from './pages/blue/Home'
import ESGCenter from './pages/blue/ESGCenter'
import CarbonMarket from './pages/blue/CarbonMarket'
import BlueProfile from './pages/blue/Profile'

// 导入橙色主题页面
import OrangeHome from './pages/orange/Home'
import CarbonManage from './pages/orange/CarbonManage'
import DataAnalysis from './pages/orange/DataAnalysis'
import OrangeProfile from './pages/orange/Profile'

// 主题选择页面
import ThemeSelector from './pages/ThemeSelector'

export type ThemeType = 'green' | 'blue' | 'orange' | null

function App() {
  const [currentTheme, setCurrentTheme] = useState<ThemeType>(null)

  useEffect(() => {
    // 从localStorage读取已选择的主题
    const savedTheme = localStorage.getItem('selectedTheme') as ThemeType
    if (savedTheme) {
      setCurrentTheme(savedTheme)
    }
  }, [])

  const handleThemeSelect = (theme: ThemeType) => {
    setCurrentTheme(theme)
    if (theme) {
      localStorage.setItem('selectedTheme', theme)
    }
  }

  return (
    <AnimatePresence mode="wait">
      <Routes>
        <Route path="/" element={
          currentTheme ? <Navigate to={`/${currentTheme}`} /> : <ThemeSelector onSelectTheme={handleThemeSelect} />
        } />
        
        {/* 绿色主题路由 - 农业碳汇 */}
        <Route path="/green" element={<GreenLayout />}>
          <Route index element={<GreenHome />} />
          <Route path="record" element={<FarmRecord />} />
          <Route path="shop" element={<CarbonShop />} />
          <Route path="profile" element={<GreenProfile />} />
        </Route>

        {/* 蓝色主题路由 - ESG平台 */}
        <Route path="/blue" element={<BlueLayout />}>
          <Route index element={<BlueHome />} />
          <Route path="esg" element={<ESGCenter />} />
          <Route path="market" element={<CarbonMarket />} />
          <Route path="profile" element={<BlueProfile />} />
        </Route>

        {/* 橙色主题路由 - 管理平台 */}
        <Route path="/orange" element={<OrangeLayout />}>
          <Route index element={<OrangeHome />} />
          <Route path="manage" element={<CarbonManage />} />
          <Route path="analysis" element={<DataAnalysis />} />
          <Route path="profile" element={<OrangeProfile />} />
        </Route>

        {/* 主题选择器 */}
        <Route path="/theme" element={<ThemeSelector onSelectTheme={handleThemeSelect} />} />
      </Routes>
    </AnimatePresence>
  )
}

export default App
