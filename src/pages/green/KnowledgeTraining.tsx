import { useState } from 'react'
import { ArrowLeft, Play, Clock, Users, Award, BookOpen, CheckCircle, Lock } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const KnowledgeTraining = () => {
  const navigate = useNavigate()
  const [selectedCourse, setSelectedCourse] = useState<any>(null)
  const [completedLessons, setCompletedLessons] = useState<number[]>([1, 2])

  // 培训课程数据
  const courses = [
    {
      id: 1,
      title: '碳汇基础知识入门',
      description: '了解碳汇的基本概念、类型和作用机制',
      instructor: '张碳汇专家',
      duration: '30分钟',
      students: 1245,
      difficulty: '初级',
      completed: true,
      lessons: [
        { id: 1, title: '什么是碳汇', duration: '8分钟', completed: true },
        { id: 2, title: '碳汇的分类', duration: '10分钟', completed: true },
        { id: 3, title: '农业碳汇概述', duration: '12分钟', completed: false }
      ],
      image: '📚',
      progress: 67
    },
    {
      id: 2,
      title: '农业碳汇项目实施',
      description: '学习农业碳汇项目的申报、实施和管理流程',
      instructor: '李绿化专家',
      duration: '45分钟',
      students: 892,
      difficulty: '中级',
      completed: false,
      lessons: [
        { id: 4, title: '项目规划设计', duration: '15分钟', completed: false },
        { id: 5, title: '申报流程详解', duration: '18分钟', completed: false },
        { id: 6, title: '项目实施管理', duration: '12分钟', completed: false }
      ],
      image: '🌱',
      progress: 0
    },
    {
      id: 3,
      title: '碳汇监测与计量',
      description: '掌握碳汇量的科学测算和监测技术',
      instructor: '王环保专家',
      duration: '50分钟',
      students: 656,
      difficulty: '高级',
      completed: false,
      lessons: [
        { id: 7, title: '监测技术方法', duration: '20分钟', completed: false },
        { id: 8, title: '计量模型应用', duration: '15分钟', completed: false },
        { id: 9, title: '数据分析处理', duration: '15分钟', completed: false }
      ],
      image: '📊',
      progress: 0,
      locked: true
    },
    {
      id: 4,
      title: '碳汇交易实务',
      description: '了解碳汇交易市场规则和实际操作',
      instructor: '赵交易专家',
      duration: '40分钟',
      students: 523,
      difficulty: '中级',
      completed: false,
      lessons: [
        { id: 10, title: '交易市场介绍', duration: '12分钟', completed: false },
        { id: 11, title: '交易流程操作', duration: '18分钟', completed: false },
        { id: 12, title: '价格机制分析', duration: '10分钟', completed: false }
      ],
      image: '💰',
      progress: 0,
      locked: true
    }
  ]

  const handleStartCourse = (course: any) => {
    if (course.locked) return
    setSelectedCourse(course)
  }

  const handleCompleteLesson = (lessonId: number) => {
    if (!completedLessons.includes(lessonId)) {
      setCompletedLessons([...completedLessons, lessonId])
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case '初级': return 'bg-green-100 text-green-600'
      case '中级': return 'bg-yellow-100 text-yellow-600' 
      case '高级': return 'bg-red-100 text-red-600'
      default: return 'bg-gray-100 text-gray-600'
    }
  }

  // 渲染课程详情页面
  const renderCourseDetail = () => {
    if (!selectedCourse) return null

    return (
      <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
        <div className="bg-gradient-to-r from-green-400 to-green-500 text-white p-4">
          <div className="flex items-center gap-3 mb-4">
            <button onClick={() => setSelectedCourse(null)} className="p-1 hover:bg-white/20 rounded-full">
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-xl font-bold">课程学习</h1>
          </div>
        </div>

        <div className="p-4 space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center text-4xl">
                {selectedCourse.image}
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-800 mb-2">{selectedCourse.title}</h2>
                <p className="text-gray-600 mb-3">{selectedCourse.description}</p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>讲师：{selectedCourse.instructor}</span>
                  <span>•</span>
                  <span>{selectedCourse.duration}</span>
                  <span>•</span>
                  <span>{selectedCourse.students}人学习</span>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">学习进度</span>
                <span className="text-sm text-green-600">{selectedCourse.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${selectedCourse.progress}%` }}
                ></div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">课程目录</h3>
              <div className="space-y-3">
                {selectedCourse.lessons.map((lesson: any, index: number) => (
                  <motion.div
                    key={lesson.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`flex items-center justify-between p-4 rounded-lg border cursor-pointer hover:shadow-md transition-shadow ${
                      completedLessons.includes(lesson.id) 
                        ? 'bg-green-50 border-green-200' 
                        : 'bg-gray-50 border-gray-200'
                    }`}
                    onClick={() => handleCompleteLesson(lesson.id)}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        completedLessons.includes(lesson.id)
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-300 text-gray-600'
                      }`}>
                        {completedLessons.includes(lesson.id) ? (
                          <CheckCircle size={16} />
                        ) : (
                          <span className="text-sm font-bold">{index + 1}</span>
                        )}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800">{lesson.title}</h4>
                        <p className="text-sm text-gray-500 flex items-center gap-1">
                          <Clock size={12} />
                          {lesson.duration}
                        </p>
                      </div>
                    </div>
                    <Play className="text-green-500" size={20} />
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button 
                onClick={() => {
                  // 继续学习下一个未完成的课程
                  const nextLesson = selectedCourse.lessons.find((l: any) => !completedLessons.includes(l.id))
                  if (nextLesson) {
                    handleCompleteLesson(nextLesson.id)
                  }
                }}
                className="flex-1 bg-green-500 text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2"
              >
                <Play size={16} />
                {selectedCourse.progress === 0 ? '开始学习' : '继续学习'}
              </button>
              <button className="px-6 bg-gray-200 text-gray-700 py-3 rounded-lg font-medium">
                收藏课程
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* 头部 */}
      <div className="bg-gradient-to-r from-green-400 to-green-500 text-white p-4">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => navigate(-1)} className="p-1 hover:bg-white/20 rounded-full">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-xl font-bold">碳汇知识培训</h1>
        </div>
        
        <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold">4</div>
              <div className="text-xs opacity-90">培训课程</div>
            </div>
            <div>
              <div className="text-2xl font-bold">67%</div>
              <div className="text-xs opacity-90">完成进度</div>
            </div>
            <div>
              <div className="text-2xl font-bold">3</div>
              <div className="text-xs opacity-90">获得证书</div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* 学习统计 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-sm p-6"
        >
          <h3 className="font-bold text-gray-800 mb-4 flex items-center">
            <Award className="mr-2 text-yellow-500" size={20} />
            学习成就
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl text-center">
              <div className="text-3xl mb-2">🏆</div>
              <div className="text-lg font-bold text-green-600">初级认证</div>
              <div className="text-xs text-gray-600">已获得</div>
            </div>
            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-4 rounded-xl text-center">
              <div className="text-3xl mb-2">⭐</div>
              <div className="text-lg font-bold text-yellow-600">中级认证</div>
              <div className="text-xs text-gray-600">进行中</div>
            </div>
          </div>
        </motion.div>

        {/* 推荐课程 */}
        <div>
          <h3 className="font-bold text-gray-800 mb-4">推荐课程</h3>
          <div className="space-y-4">
            {courses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-white rounded-xl shadow-sm overflow-hidden ${
                  course.locked ? 'opacity-60' : 'cursor-pointer hover:shadow-md'
                } transition-shadow`}
                onClick={() => handleStartCourse(course)}
              >
                <div className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="relative">
                      <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-lg flex items-center justify-center text-3xl">
                        {course.image}
                      </div>
                      {course.locked && (
                        <div className="absolute -top-1 -right-1 w-6 h-6 bg-gray-500 rounded-full flex items-center justify-center">
                          <Lock className="text-white" size={12} />
                        </div>
                      )}
                      {course.completed && (
                        <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                          <CheckCircle className="text-white" size={12} />
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-semibold text-gray-800">{course.title}</h4>
                          <p className="text-sm text-gray-600 mt-1">{course.description}</p>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(course.difficulty)}`}>
                          {course.difficulty}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                        <span className="flex items-center gap-1">
                          <Clock size={12} />
                          {course.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users size={12} />
                          {course.students}人学习
                        </span>
                        <span>讲师：{course.instructor}</span>
                      </div>

                      {!course.locked && course.progress > 0 && (
                        <div className="mb-3">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs text-gray-500">学习进度</span>
                            <span className="text-xs text-green-600">{course.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-1.5">
                            <div 
                              className="bg-green-500 h-1.5 rounded-full transition-all duration-500"
                              style={{ width: `${course.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      )}

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          {course.lessons.map((lesson: any) => (
                            <div
                              key={lesson.id}
                              className={`w-2 h-2 rounded-full ${
                                completedLessons.includes(lesson.id) ? 'bg-green-500' : 'bg-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <button className={`text-sm px-4 py-1.5 rounded-full font-medium ${
                          course.locked 
                            ? 'bg-gray-200 text-gray-500'
                            : course.progress > 0 
                              ? 'bg-green-100 text-green-600' 
                              : 'bg-blue-100 text-blue-600'
                        }`}>
                          {course.locked ? '需完成前置课程' : course.progress > 0 ? '继续学习' : '开始学习'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 学习提示 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-4 border border-blue-100"
        >
          <div className="flex items-start gap-3">
            <BookOpen className="text-blue-500 flex-shrink-0" size={20} />
            <div>
              <h4 className="font-semibold text-blue-800 mb-1">学习小贴士</h4>
              <p className="text-sm text-blue-700">
                完成培训课程可获得相应的学习积分和认证证书，建议按顺序学习，循序渐进掌握碳汇知识！
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* 渲染课程详情 */}
      <AnimatePresence>
        {renderCourseDetail()}
      </AnimatePresence>
    </div>
  )
}

export default KnowledgeTraining
