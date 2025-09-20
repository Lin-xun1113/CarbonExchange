import { useState, useRef } from 'react'
import { Camera, Upload, MapPin, Thermometer, Cloud, CheckCircle, Image as ImageIcon, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePoints } from '../../contexts/PointsContext'

const FarmRecord = () => {
  const { addPoints } = usePoints()
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadSuccess, setUploadSuccess] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const todayData = {
    temperature: '27℃',
    weather: '晴',
    humidity: '土壤湿度：适中',
    co2: '二氧化碳含量：适中',
    location: '甘肃省兰州市榆中县夏官营镇吴谢营村',
    image: '🌾'
  }

  // 处理文件选择
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file)
      
      // 创建预览URL
      const reader = new FileReader()
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  // 处理上传
  const handleUpload = async () => {
    if (!selectedFile) return

    setIsUploading(true)
    
    // 模拟上传过程
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // 上传成功，添加积分
    addPoints(2000, '农事记录打卡')
    setIsUploading(false)
    setUploadSuccess(true)
    
    // 3秒后重置状态
    setTimeout(() => {
      setSelectedImage(null)
      setSelectedFile(null)
      setUploadSuccess(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }, 3000)
  }

  // 取消选择
  const handleCancel = () => {
    setSelectedImage(null)
    setSelectedFile(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleCameraClick = () => {
    fileInputRef.current?.click()
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
            
            <div className="text-gray-600">{todayData.humidity}</div>
            <div className="text-gray-600">{todayData.co2}</div>
          </div>
        </motion.div>

        {/* 上传照片区域 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-6"
        >
          <h2 className="text-lg font-bold mb-4">上传照片</h2>
          
          {/* 隐藏的文件输入 */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />

          {/* 图片预览或上传按钮 */}
          {!selectedImage ? (
            <motion.button
              onClick={handleCameraClick}
              className="w-full h-48 bg-green-50 border-2 border-dashed border-green-300 rounded-xl flex flex-col items-center justify-center gap-3 hover:bg-green-100 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Camera className="text-green-500" size={48} />
              <p className="text-green-700 font-medium">点击上传农田照片</p>
              <p className="text-green-600 text-sm">支持 JPG, PNG 格式</p>
            </motion.button>
          ) : (
            <div className="relative">
              {/* 图片预览 */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative rounded-xl overflow-hidden"
              >
                <img
                  src={selectedImage}
                  alt="预览"
                  className="w-full h-64 object-cover rounded-xl"
                />
                
                {/* 取消按钮 */}
                {!uploadSuccess && !isUploading && (
                  <button
                    onClick={handleCancel}
                    className="absolute top-2 right-2 p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
                  >
                    <X className="text-gray-600" size={20} />
                  </button>
                )}

                {/* 上传成功提示 */}
                <AnimatePresence>
                  {uploadSuccess && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center gap-4"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring" }}
                        className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center"
                      >
                        <CheckCircle className="text-white" size={48} />
                      </motion.div>
                      <div className="text-white text-center">
                        <p className="text-xl font-bold mb-2">上传成功！</p>
                        <p className="text-lg">获得积分 +2000</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* 文件信息和上传按钮 */}
              {!uploadSuccess && !isUploading && (
                <div className="mt-4 space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <ImageIcon className="text-gray-500" size={20} />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-700">{selectedFile?.name}</p>
                      <p className="text-xs text-gray-500">
                        {selectedFile && (selectedFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={handleCancel}
                      className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                    >
                      重新选择
                    </button>
                    <button
                      onClick={handleUpload}
                      className="flex-1 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
                    >
                      <Upload size={18} />
                      确认上传
                    </button>
                  </div>
                </div>
              )}

              {/* 上传中状态 */}
              {isUploading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 bg-black/50 flex items-center justify-center"
                >
                  <div className="bg-white rounded-lg p-6 text-center">
                    <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-700 font-medium">正在上传...</p>
                  </div>
                </motion.div>
              )}
            </div>
          )}

          {/* 积分提示 */}
          <div className="mt-4 p-3 bg-green-50 rounded-lg">
            <p className="text-sm text-green-700">
              <span className="font-semibold">💰 每日打卡奖励：</span>上传农田照片可获得 2000 积分
            </p>
          </div>
        </motion.div>

        {/* 位置信息 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg p-6"
        >
          <h2 className="text-lg font-bold mb-4">位置信息</h2>
          
          <div className="flex items-center gap-3">
            <MapPin className="text-green-500" size={20} />
            <span className="text-gray-700">{todayData.location}</span>
          </div>
          
          <div className="mt-4 bg-gradient-to-r from-green-100 to-green-50 rounded-lg p-4">
            <div className="text-center text-6xl mb-2">{todayData.image}</div>
            <p className="text-center text-gray-600">农田状态良好</p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default FarmRecord
