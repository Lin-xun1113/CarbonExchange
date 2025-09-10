import { Camera, Upload, MapPin, Thermometer, Cloud } from 'lucide-react'
import { motion } from 'framer-motion'

const FarmRecord = () => {
  const todayData = {
    temperature: '27℃',
    weather: '晴',
    humidity: '土壤湿度：适中',
    co2: '二氧化碳含量：适中',
    location: '甘肃省兰州市榆中县夏官营镇吴谢营村',
    image: '🌾'
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* 头部 */}
      <div className="bg-gradient-to-r from-green-400 to-green-500 text-white p-4">
        <h1 className="text-xl font-bold text-center mb-4">农事记录</h1>
        
        {/* 搜索框 */}
        <div className="bg-white/20 rounded-lg p-2">
          <input
            type="text"
            placeholder="查找历史数据"
            className="w-full px-3 py-2 bg-transparent placeholder-white/70 text-white"
          />
        </div>
      </div>

      <div className="p-4">
        {/* 今日数据卡片 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-6"
        >
          <h2 className="text-lg font-bold mb-4">今日数据</h2>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Thermometer className="text-green-500" size={20} />
              <span className="text-gray-600">室外温度：</span>
              <span className="font-semibold">{todayData.temperature}</span>
            </div>
            
            <div className="flex items-center gap-3">
              <Cloud className="text-green-500" size={20} />
              <span className="text-gray-600">天气：</span>
              <span className="font-semibold">{todayData.weather}</span>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 bg-green-500 rounded-full"></div>
              <span className="text-gray-600">{todayData.humidity}</span>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 bg-green-500 rounded-full"></div>
              <span className="text-gray-600">{todayData.co2}</span>
            </div>
          </div>

          {/* 农田图片 */}
          <div className="mt-6 bg-gradient-to-br from-green-100 to-green-200 rounded-xl h-48 flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-2">{todayData.image}</div>
              <p className="text-green-700 text-sm font-medium">今日农田状况良好</p>
            </div>
          </div>
        </motion.div>

        {/* 上传图片按钮 */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="w-full bg-green-500 text-white rounded-xl py-4 font-medium flex items-center justify-center gap-2 mb-6"
        >
          <Upload size={20} />
          上传图片
        </motion.button>

        {/* 拍照上传区域 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-r from-green-100 to-green-200 rounded-2xl p-8"
        >
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-4 shadow-lg">
              <Camera className="text-green-600" size={40} />
            </div>
            <h3 className="text-green-800 font-bold text-lg mb-2">拍照上传</h3>
            <p className="text-green-600 text-sm text-center">
              记录每日农田状况，AI智能分析作物生长
            </p>
          </div>
        </motion.div>

        {/* 位置信息 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-6 flex items-center gap-2 text-gray-500 text-sm"
        >
          <MapPin size={16} />
          <span>{todayData.location}</span>
        </motion.div>
      </div>
    </div>
  )
}

export default FarmRecord
