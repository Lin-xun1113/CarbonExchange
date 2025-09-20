import { useState } from 'react'
import { ArrowLeft, Plus, MessageCircle, ThumbsUp, Eye, Clock, User, Star, Send } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

interface Reply {
  id: number
  authorName: string
  authorType: 'farmer' | 'expert'
  content: string
  timestamp: string
  likes: number
  expertTitle?: string
}

interface Post {
  id: number
  title: string
  content: string
  authorName: string
  timestamp: string
  views: number
  replies: number
  likes: number
  category: string
  status: 'answered' | 'pending' | 'hot'
  repliesList: Reply[]
}

const ExpertForum = () => {
  const navigate = useNavigate()
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  const [showNewPostForm, setShowNewPostForm] = useState(false)
  const [newPostTitle, setNewPostTitle] = useState('')
  const [newPostContent, setNewPostContent] = useState('')
  const [newPostCategory, setNewPostCategory] = useState('种植技术')
  const [replyContent, setReplyContent] = useState('')

  const handleGoBack = () => {
    navigate('/green')
  }

  const categories = ['种植技术', '病虫害防治', '施肥用药', '土壤改良', '碳汇政策', '其他问题']

  // 模拟论坛帖子数据
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      title: '玉米叶子发黄是什么原因？施什么肥比较好？',
      content: '我家的玉米种了快两个月了，最近发现下面的叶子开始发黄，而且有扩散的趋势。请问专家这是什么原因造成的？应该施什么肥料来改善？',
      authorName: '张农户',
      timestamp: '2025-09-18 09:30',
      views: 127,
      replies: 3,
      likes: 8,
      category: '种植技术',
      status: 'answered',
      repliesList: [
        {
          id: 1,
          authorName: '李植保专家',
          authorType: 'expert',
          expertTitle: '植物保护专业',
          content: '根据您的描述，玉米下部叶片发黄可能是缺氮或者根部缺氧导致的。建议：1. 检查土壤湿度，避免积水；2. 适量施用氮肥，可以用尿素15-20kg/亩；3. 注意中耕松土，增加土壤透气性。',
          timestamp: '2025-09-18 10:15',
          likes: 12
        },
        {
          id: 2,
          authorName: '王农户',
          authorType: 'farmer',
          content: '我家也遇到过类似情况，按照专家说的方法，施了尿素后确实好了很多，大概一周就有明显改善。',
          timestamp: '2025-09-18 14:20',
          likes: 5
        },
        {
          id: 3,
          authorName: '张农户',
          authorType: 'farmer',
          content: '谢谢专家和各位农友！我按照建议去试试，有问题再来咨询。',
          timestamp: '2025-09-18 16:45',
          likes: 2
        }
      ]
    },
    {
      id: 2,
      title: '关于有机肥补贴政策的申请流程？',
      content: '看到最新的有机肥使用补贴政策，每亩补贴200元，想了解一下具体的申请流程和需要准备的材料？我家有30亩地，都在使用有机肥。',
      authorName: '赵大哥',
      timestamp: '2025-09-17 16:22',
      views: 89,
      replies: 2,
      likes: 15,
      category: '碳汇政策',
      status: 'answered',
      repliesList: [
        {
          id: 1,
          authorName: '余专家',
          authorType: 'expert',
          expertTitle: '农业资源与环境专业',
          content: '有机肥补贴申请需要以下材料：1. 农户身份证和土地承包证；2. 有机肥购买发票和使用记录；3. 填写《有机肥使用补贴申请表》；4. 提供使用前后土壤检测报告。可以到当地农业部门或通过我们平台在线申请。',
          timestamp: '2025-09-17 17:30',
          likes: 18
        },
        {
          id: 2,
          authorName: '赵大哥',
          authorType: 'farmer',
          content: '明白了，谢谢专家！请问土壤检测报告在哪里可以做？费用大概多少？',
          timestamp: '2025-09-17 18:10',
          likes: 3
        }
      ]
    },
    {
      id: 3,
      title: '小麦赤霉病防治最佳时期是什么时候？',
      content: '今年雨水比较多，担心小麦得赤霉病。请问专家什么时候打药防治效果最好？用什么药比较安全有效？',
      authorName: '刘种植户',
      timestamp: '2025-09-16 08:45',
      views: 156,
      replies: 4,
      likes: 22,
      category: '病虫害防治',
      status: 'hot',
      repliesList: [
        {
          id: 1,
          authorName: '山专家',
          authorType: 'expert',
          expertTitle: '植物保护专业',
          content: '小麦赤霉病防治关键期是扬花期！建议在小麦开花初期（10-20%小花开放）进行第一次防治，间隔7-10天再防治一次。推荐药剂：氰烯菌酯、戊唑醇等。注意避开蜜蜂活动期，选择无风天气施药。',
          timestamp: '2025-09-16 09:20',
          likes: 28
        },
        {
          id: 2,
          authorName: '陈农友',
          authorType: 'farmer',
          content: '去年我就是按这个方法防治的，效果很好，基本没有赤霉病发生。',
          timestamp: '2025-09-16 11:30',
          likes: 8
        },
        {
          id: 3,
          authorName: '专业植保',
          authorType: 'farmer',
          content: '补充一点：防治时一定要保证用水量，建议每亩用水30-40公斤，雾化要好，确保药液能覆盖到花器。',
          timestamp: '2025-09-16 14:15',
          likes: 12
        },
        {
          id: 4,
          authorName: '刘种植户',
          authorType: 'farmer',
          content: '谢谢各位！我现在就去准备药材，小麦刚好要开花了。',
          timestamp: '2025-09-16 15:20',
          likes: 4
        }
      ]
    },
    {
      id: 4,
      title: '土壤板结严重，怎么改良比较好？',
      content: '我家的田地连续种了几年，土壤越来越硬，感觉板结很严重，作物根系发育不好。请问有什么好的改良方法？',
      authorName: '孙农民',
      timestamp: '2025-09-15 19:15',
      views: 93,
      replies: 1,
      likes: 11,
      category: '土壤改良',
      status: 'pending',
      repliesList: [
        {
          id: 1,
          authorName: '卢专家',
          authorType: 'expert',
          expertTitle: '农业信息专业',
          content: '土壤板结改良建议：1. 增施有机肥，每亩2-3吨腐熟农家肥；2. 深耕打破犁底层，耕深25-30cm；3. 种植绿肥作物如紫云英改良土壤；4. 合理轮作，避免连作；5. 使用土壤改良剂如石膏、硅钙肥等。改良是个长期过程，坚持2-3年会有明显效果。',
          timestamp: '2025-09-15 20:30',
          likes: 15
        }
      ]
    },
    {
      id: 5,
      title: '水稻测土配方施肥具体怎么操作？',
      content: '听说测土配方施肥能提高产量还能减少成本，想了解一下具体操作流程和注意事项。',
      authorName: '马种粮大户',
      timestamp: '2025-09-14 14:20',
      views: 76,
      replies: 0,
      likes: 6,
      category: '施肥用药',
      status: 'pending',
      repliesList: []
    }
  ])

  const handlePostClick = (post: Post) => {
    // 更新浏览量
    setPosts(prevPosts => 
      prevPosts.map(p => 
        p.id === post.id ? { ...p, views: p.views + 1 } : p
      )
    )
    setSelectedPost(post)
  }

  const handleNewPost = () => {
    if (newPostTitle.trim() && newPostContent.trim()) {
      const newPost: Post = {
        id: posts.length + 1,
        title: newPostTitle,
        content: newPostContent,
        authorName: '当前用户', // 这里可以替换为实际用户名
        timestamp: new Date().toLocaleString('zh-CN', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit'
        }),
        views: 0,
        replies: 0,
        likes: 0,
        category: newPostCategory,
        status: 'pending',
        repliesList: []
      }
      
      setPosts(prevPosts => [newPost, ...prevPosts])
      setNewPostTitle('')
      setNewPostContent('')
      setShowNewPostForm(false)
    }
  }

  const handleReply = () => {
    if (replyContent.trim() && selectedPost) {
      const newReply: Reply = {
        id: selectedPost.repliesList.length + 1,
        authorName: '当前用户',
        authorType: 'farmer',
        content: replyContent,
        timestamp: new Date().toLocaleString('zh-CN', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit'
        }),
        likes: 0
      }

      const updatedPost = {
        ...selectedPost,
        replies: selectedPost.replies + 1,
        repliesList: [...selectedPost.repliesList, newReply]
      }

      setPosts(prevPosts => 
        prevPosts.map(p => p.id === selectedPost.id ? updatedPost : p)
      )
      setSelectedPost(updatedPost)
      setReplyContent('')
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'answered': return 'bg-green-100 text-green-600'
      case 'hot': return 'bg-red-100 text-red-600'
      default: return 'bg-gray-100 text-gray-600'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'answered': return '已解答'
      case 'hot': return '热门'
      default: return '待解答'
    }
  }

  // 帖子详情页面
  if (selectedPost) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
        <div className="bg-gradient-to-r from-green-400 to-green-500 text-white p-4">
          <div className="flex items-center gap-3">
            <button onClick={() => setSelectedPost(null)} className="p-1 hover:bg-white/20 rounded-full">
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-xl font-bold">帖子详情</h1>
          </div>
        </div>

        <div className="p-4">
          {/* 帖子内容 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl p-6 shadow-sm mb-4"
          >
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <User className="text-green-600" size={20} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-semibold text-gray-800">{selectedPost.authorName}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(selectedPost.status)}`}>
                    {getStatusText(selectedPost.status)}
                  </span>
                </div>
                <p className="text-sm text-gray-500">{selectedPost.timestamp}</p>
              </div>
            </div>
            
            <h2 className="text-xl font-bold text-gray-800 mb-3">{selectedPost.title}</h2>
            <p className="text-gray-700 leading-relaxed mb-4">{selectedPost.content}</p>
            
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Eye size={16} />
                <span>{selectedPost.views}</span>
              </div>
              <div className="flex items-center gap-1">
                <MessageCircle size={16} />
                <span>{selectedPost.replies}</span>
              </div>
              <div className="flex items-center gap-1">
                <ThumbsUp size={16} />
                <span>{selectedPost.likes}</span>
              </div>
            </div>
          </motion.div>

          {/* 回复列表 */}
          <div className="space-y-4 mb-6">
            {selectedPost.repliesList.map((reply, index) => (
              <motion.div
                key={reply.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-4 shadow-sm"
              >
                <div className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    reply.authorType === 'expert' ? 'bg-blue-100' : 'bg-green-100'
                  }`}>
                    {reply.authorType === 'expert' ? (
                      <Star className={`${reply.authorType === 'expert' ? 'text-blue-600' : 'text-green-600'}`} size={16} />
                    ) : (
                      <User className="text-green-600" size={16} />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className={`font-semibold ${
                        reply.authorType === 'expert' ? 'text-blue-600' : 'text-gray-800'
                      }`}>
                        {reply.authorName}
                      </h4>
                      {reply.expertTitle && (
                        <span className="px-2 py-1 bg-blue-100 text-blue-600 text-xs rounded-full">
                          {reply.expertTitle}
                        </span>
                      )}
                      {reply.authorType === 'expert' && (
                        <span className="px-2 py-1 bg-orange-100 text-orange-600 text-xs rounded-full">
                          专家
                        </span>
                      )}
                    </div>
                    <p className="text-gray-700 leading-relaxed mb-2">{reply.content}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>{reply.timestamp}</span>
                      <div className="flex items-center gap-1">
                        <ThumbsUp size={14} />
                        <span>{reply.likes}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* 回复输入框 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl p-4 shadow-sm"
          >
            <h3 className="font-semibold text-gray-800 mb-3">发表回复</h3>
            <textarea
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              placeholder="请输入您的回复内容..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
              rows={4}
            />
            <div className="flex justify-end mt-3">
              <button
                onClick={handleReply}
                disabled={!replyContent.trim()}
                className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={16} />
                发表回复
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* 头部 */}
      <div className="bg-gradient-to-r from-green-400 to-green-500 text-white p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <button onClick={handleGoBack} className="p-1 hover:bg-white/20 rounded-full">
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-xl font-bold">专家答疑</h1>
          </div>
          <button
            onClick={() => setShowNewPostForm(true)}
            className="flex items-center gap-2 px-3 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
          >
            <Plus size={16} />
            发帖
          </button>
        </div>
        
        <p className="text-sm opacity-90">农业问题，专家解答 • 互帮互助，共同成长</p>
      </div>

      <div className="p-4">
        {/* 分类标签 */}
        <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category}
              className="px-3 py-1.5 bg-white text-gray-600 rounded-full text-sm whitespace-nowrap hover:bg-green-50 hover:text-green-600 transition-colors"
            >
              {category}
            </button>
          ))}
        </div>

        {/* 帖子列表 */}
        <div className="space-y-3">
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => handlePostClick(post)}
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="text-green-600" size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-gray-800 truncate">{post.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs flex-shrink-0 ${getStatusColor(post.status)}`}>
                      {getStatusText(post.status)}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm line-clamp-2 mb-2">{post.content}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span>{post.authorName}</span>
                      <span>{post.category}</span>
                      <div className="flex items-center gap-1">
                        <Clock size={12} />
                        <span>{post.timestamp}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Eye size={12} />
                        <span>{post.views}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageCircle size={12} />
                        <span>{post.replies}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <ThumbsUp size={12} />
                        <span>{post.likes}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 发帖弹窗 */}
      <AnimatePresence>
        {showNewPostForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowNewPostForm(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl p-6 w-full max-w-md max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-lg font-bold text-gray-800 mb-4">发布新帖</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">分类</label>
                  <select
                    value={newPostCategory}
                    onChange={(e) => setNewPostCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">标题</label>
                  <input
                    type="text"
                    value={newPostTitle}
                    onChange={(e) => setNewPostTitle(e.target.value)}
                    placeholder="请输入帖子标题"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">内容</label>
                  <textarea
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                    placeholder="请详细描述您的问题..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                    rows={6}
                  />
                </div>
              </div>
              
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowNewPostForm(false)}
                  className="flex-1 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  取消
                </button>
                <button
                  onClick={handleNewPost}
                  disabled={!newPostTitle.trim() || !newPostContent.trim()}
                  className="flex-1 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  发布
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ExpertForum
