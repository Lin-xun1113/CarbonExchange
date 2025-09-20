import { useState, useEffect } from 'react'
import { ArrowLeft, Trophy, Star, CheckCircle, XCircle, RotateCcw, Award } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate, useParams } from 'react-router-dom'

interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

interface Quiz {
  id: number
  title: string
  description: string
  questions: Question[]
  totalPoints: number
  passScore: number
  difficulty: 'easy' | 'medium' | 'hard'
}

const KnowledgeQuiz = () => {
  const navigate = useNavigate()
  const { quizId } = useParams<{ quizId: string }>()
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({})
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [earnedPoints, setEarnedPoints] = useState(0)
  const [userPoints, setUserPoints] = useState(1250) // 用户当前积分

  const handleGoBack = () => {
    if (selectedQuiz && !showResult) {
      setSelectedQuiz(null)
    } else {
      navigate('/green')
    }
  }

  // 知识问答数据
  const quizzes: Quiz[] = [
    {
      id: 1,
      title: '绿色农业知识问答——第二期',
      description: '测试您对绿色农业技术和可持续发展的了解',
      totalPoints: 500,
      passScore: 70,
      difficulty: 'medium',
      questions: [
        {
          id: 1,
          question: '以下哪种做法最符合绿色农业的理念？',
          options: [
            '大量使用化学农药防治病虫害',
            '采用生物防治和物理防治相结合的方式',
            '只使用有机肥，完全不用化肥',
            '增加化肥使用量提高产量'
          ],
          correctAnswer: 1,
          explanation: '绿色农业强调生态平衡，生物防治和物理防治相结合既能有效控制病虫害，又能减少对环境的影响。'
        },
        {
          id: 2,
          question: '测土配方施肥的主要目的是什么？',
          options: [
            '减少施肥成本',
            '提高肥料利用率，减少环境污染',
            '增加作物产量',
            '简化施肥程序'
          ],
          correctAnswer: 1,
          explanation: '测土配方施肥通过科学检测土壤养分状况，合理配比肥料，既能满足作物需求，又能提高肥料利用率，减少环境污染。'
        },
        {
          id: 3,
          question: '轮作的主要好处不包括以下哪项？',
          options: [
            '改善土壤结构',
            '减少病虫害发生',
            '提高土壤肥力',
            '增加单一作物的连续种植年限'
          ],
          correctAnswer: 3,
          explanation: '轮作的目的是避免连续种植同一作物，通过不同作物的轮换种植来改善土壤结构、减少病虫害和提高土壤肥力。'
        },
        {
          id: 4,
          question: '有机肥相比化肥的优势主要体现在？',
          options: [
            '见效更快',
            '使用更方便',
            '改善土壤结构，肥效持久',
            '成本更低'
          ],
          correctAnswer: 2,
          explanation: '有机肥能够改善土壤结构，增加土壤有机质含量，肥效持久，有利于土壤生态系统的健康发展。'
        },
        {
          id: 5,
          question: '碳汇农业的核心概念是什么？',
          options: [
            '提高农作物产量',
            '通过农业活动吸收和储存大气中的二氧化碳',
            '减少农业生产成本',
            '提高农产品品质'
          ],
          correctAnswer: 1,
          explanation: '碳汇农业是指通过科学的农业管理措施，增加农田土壤和植物中的碳储量，从而吸收大气中的二氧化碳。'
        }
      ]
    },
    {
      id: 2,
      title: '农业基础知识问答——第六期',
      description: '考查农业生产中的基础理论知识',
      totalPoints: 300,
      passScore: 60,
      difficulty: 'easy',
      questions: [
        {
          id: 1,
          question: '植物进行光合作用需要哪些条件？',
          options: [
            '阳光、水分、二氧化碳',
            '阳光、氧气、养分',
            '水分、氧气、温度',
            '二氧化碳、氧气、湿度'
          ],
          correctAnswer: 0,
          explanation: '植物光合作用需要阳光提供能量，水分作为原料，二氧化碳作为碳源，叶绿素作为催化剂。'
        },
        {
          id: 2,
          question: '作物缺氮的主要表现是？',
          options: [
            '叶片发黄，植株矮小',
            '叶片卷曲，根系发达',
            '开花结果提前',
            '抗病能力增强'
          ],
          correctAnswer: 0,
          explanation: '氮是植物蛋白质和叶绿素的重要组成部分，缺氮会导致叶片发黄、植株矮小、生长缓慢。'
        },
        {
          id: 3,
          question: '土壤pH值对作物生长的影响，大多数作物适宜的pH范围是？',
          options: [
            '4.0-5.0（强酸性）',
            '6.0-7.5（微酸到中性）',
            '8.0-9.0（碱性）',
            '9.0-10.0（强碱性）'
          ],
          correctAnswer: 1,
          explanation: '大多数作物在pH6.0-7.5的微酸性到中性土壤中生长最好，这个范围内养分有效性最高。'
        }
      ]
    },
    {
      id: 3,
      title: '农业政策问答——第五期',
      description: '了解最新的农业支持政策和补贴制度',
      totalPoints: 400,
      passScore: 75,
      difficulty: 'hard',
      questions: [
        {
          id: 1,
          question: '农业绿色发展补贴主要支持哪些方面？',
          options: [
            '购买大型农机设备',
            '有机肥使用、测土配方施肥、绿色防控',
            '扩大种植面积',
            '建设农产品加工厂'
          ],
          correctAnswer: 1,
          explanation: '农业绿色发展补贴重点支持有机肥使用、测土配方施肥、病虫害绿色防控等生态友好型农业技术。'
        },
        {
          id: 2,
          question: '申请农业碳汇项目需要满足的基本条件是？',
          options: [
            '种植面积达到1000亩以上',
            '必须是农业合作社',
            '有土地承包权，采用碳汇增汇技术',
            '年产值达到百万以上'
          ],
          correctAnswer: 2,
          explanation: '申请农业碳汇项目需要有合法的土地承包权，并采用能够增加碳汇的农业技术和管理措施。'
        }
      ]
    }
  ]

  useEffect(() => {
    if (quizId) {
      const quiz = quizzes.find(q => q.id === parseInt(quizId))
      if (quiz) {
        setSelectedQuiz(quiz)
      }
    }
  }, [quizId])

  const handleQuizSelect = (quiz: Quiz) => {
    setSelectedQuiz(quiz)
    setCurrentQuestionIndex(0)
    setSelectedAnswers({})
    setShowResult(false)
    setScore(0)
    setEarnedPoints(0)
  }

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestionIndex]: answerIndex
    }))
  }

  const handleNextQuestion = () => {
    if (selectedQuiz && currentQuestionIndex < selectedQuiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      handleSubmitQuiz()
    }
  }

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  const handleSubmitQuiz = () => {
    if (!selectedQuiz) return

    let correctCount = 0
    selectedQuiz.questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        correctCount++
      }
    })

    const finalScore = Math.round((correctCount / selectedQuiz.questions.length) * 100)
    setScore(finalScore)

    // 计算获得的积分
    if (finalScore >= selectedQuiz.passScore) {
      setEarnedPoints(selectedQuiz.totalPoints)
      setUserPoints(prev => prev + selectedQuiz.totalPoints)
    } else {
      const partialPoints = Math.round(selectedQuiz.totalPoints * (finalScore / 100) * 0.5)
      setEarnedPoints(partialPoints)
      setUserPoints(prev => prev + partialPoints)
    }

    setShowResult(true)
  }

  const handleRetakeQuiz = () => {
    setCurrentQuestionIndex(0)
    setSelectedAnswers({})
    setShowResult(false)
    setScore(0)
    setEarnedPoints(0)
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-600'
      case 'medium': return 'bg-yellow-100 text-yellow-600'
      case 'hard': return 'bg-red-100 text-red-600'
      default: return 'bg-gray-100 text-gray-600'
    }
  }

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return '简单'
      case 'medium': return '中等'
      case 'hard': return '困难'
      default: return '未知'
    }
  }

  // 结果页面
  if (showResult && selectedQuiz) {
    const passed = score >= selectedQuiz.passScore
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
        <div className="bg-gradient-to-r from-green-400 to-green-500 text-white p-4">
          <div className="flex items-center gap-3">
            <button onClick={handleGoBack} className="p-1 hover:bg-white/20 rounded-full">
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-xl font-bold">答题结果</h1>
          </div>
        </div>

        <div className="p-4 flex items-center justify-center min-h-[calc(100vh-80px)]">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-8 shadow-lg text-center max-w-md w-full"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 ${
                passed ? 'bg-green-100' : 'bg-red-100'
              }`}
            >
              {passed ? (
                <Trophy className="text-green-500" size={48} />
              ) : (
                <RotateCcw className="text-red-500" size={48} />  
              )}
            </motion.div>
            
            <h2 className={`text-3xl font-bold mb-2 ${
              passed ? 'text-green-600' : 'text-red-600'
            }`}>
              {score}分
            </h2>
            
            <p className={`text-lg mb-4 ${
              passed ? 'text-green-700' : 'text-red-700'
            }`}>
              {passed ? '恭喜通关！' : '继续努力！'}
            </p>
            
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">答对题数：</span>
                <span className="font-semibold">
                  {Object.keys(selectedAnswers).filter(key => 
                    selectedAnswers[parseInt(key)] === selectedQuiz.questions[parseInt(key)].correctAnswer
                  ).length} / {selectedQuiz.questions.length}
                </span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">通关分数：</span>
                <span className="font-semibold">{selectedQuiz.passScore}分</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">获得积分：</span>
                <span className={`font-bold text-lg ${
                  earnedPoints > 0 ? 'text-green-600' : 'text-gray-600'
                }`}>
                  +{earnedPoints}
                </span>
              </div>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg mb-6">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Award className="text-green-600" size={20} />
                <span className="font-semibold text-green-800">当前积分</span>
              </div>
              <p className="text-2xl font-bold text-green-600">{userPoints}</p>
            </div>
            
            <div className="space-y-3">
              <button 
                onClick={handleRetakeQuiz}
                className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors"
              >
                重新答题
              </button>
              <button 
                onClick={() => navigate('/green')}
                className="w-full border border-green-500 text-green-500 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors"
              >
                返回首页
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  // 答题页面
  if (selectedQuiz) {
    const currentQuestion = selectedQuiz.questions[currentQuestionIndex]
    const progress = ((currentQuestionIndex + 1) / selectedQuiz.questions.length) * 100

    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
        <div className="bg-gradient-to-r from-green-400 to-green-500 text-white p-4">
          <div className="flex items-center gap-3 mb-4">
            <button onClick={handleGoBack} className="p-1 hover:bg-white/20 rounded-full">
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-xl font-bold">{selectedQuiz.title}</h1>
          </div>
          
          {/* 进度条 */}
          <div className="mb-2">
            <div className="flex justify-between text-sm opacity-90 mb-1">
              <span>第 {currentQuestionIndex + 1} 题 / 共 {selectedQuiz.questions.length} 题</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-white/30 rounded-full h-2">
              <motion.div 
                className="bg-white h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        </div>

        <div className="p-4">
          <motion.div
            key={currentQuestionIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl p-6 shadow-sm mb-6"
          >
            <h3 className="text-lg font-bold text-gray-800 mb-6 leading-relaxed">
              {currentQuestion.question}
            </h3>
            
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => (
                <motion.button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={`w-full p-4 text-left border-2 rounded-lg transition-colors ${
                    selectedAnswers[currentQuestionIndex] === index
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : 'border-gray-200 hover:border-green-300 hover:bg-green-50'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      selectedAnswers[currentQuestionIndex] === index
                        ? 'border-green-500 bg-green-500'
                        : 'border-gray-300'
                    }`}>
                      {selectedAnswers[currentQuestionIndex] === index && (
                        <CheckCircle className="text-white" size={16} />
                      )}
                    </div>
                    <span className="text-gray-700">{option}</span>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* 导航按钮 */}
          <div className="flex gap-4">
            {currentQuestionIndex > 0 && (
              <button
                onClick={handlePrevQuestion}
                className="flex-1 py-3 border border-green-500 text-green-500 rounded-lg font-semibold hover:bg-green-50 transition-colors"
              >
                上一题
              </button>
            )}
            
            <button
              onClick={handleNextQuestion}
              disabled={selectedAnswers[currentQuestionIndex] === undefined}
              className="flex-1 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {currentQuestionIndex === selectedQuiz.questions.length - 1 ? '提交答案' : '下一题'}
            </button>
          </div>
        </div>
      </div>
    )
  }

  // 问答列表页面
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="bg-gradient-to-r from-green-400 to-green-500 text-white p-4">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={handleGoBack} className="p-1 hover:bg-white/20 rounded-full">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-xl font-bold">知识问答</h1>
        </div>
        
        <div className="flex items-center justify-between">
          <p className="text-sm opacity-90">通过答题获得积分，提升农业知识水平</p>
          <div className="flex items-center gap-2 bg-white/20 px-3 py-1.5 rounded-full">
            <Star className="text-yellow-300" size={16} />
            <span className="text-sm font-semibold">{userPoints}</span>
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="space-y-4">
          {quizzes.map((quiz, index) => (
            <motion.div
              key={quiz.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => handleQuizSelect(quiz)}
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-bold text-gray-800 flex-1">{quiz.title}</h3>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded-full text-xs ${getDifficultyColor(quiz.difficulty)}`}>
                    {getDifficultyText(quiz.difficulty)}
                  </span>
                  <div className="flex items-center gap-1 text-green-600">
                    <Trophy size={16} />
                    <span className="text-sm font-semibold">{quiz.totalPoints}</span>
                  </div>
                </div>
              </div>
              
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">{quiz.description}</p>
              
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>共 {quiz.questions.length} 题</span>
                <span>通关分数：{quiz.passScore}分</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default KnowledgeQuiz
