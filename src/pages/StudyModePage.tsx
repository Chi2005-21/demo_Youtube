import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThumbsUp, Share, Download, Bookmark, ChevronDown, Eye, FileText, List, Save, ToggleLeft, ToggleRight, MessageSquare, ExternalLink } from 'lucide-react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import VideoPlayer from '../components/VideoPlayer';
import VideoCard from '../components/VideoCard';
import { lessonArray, arrayChapters, distractingRecommendations } from '../data/mockData';

export default function StudyModePage() {
  const [studyMode, setStudyMode] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState<'notes' | 'transcript' | 'chapters' | 'saved'>('chapters');
  const [autoPlay, setAutoPlay] = useState(false);
  const [currentTimestamp, setCurrentTimestamp] = useState(0);

  return (
    <div className="min-h-screen bg-white">
      <Header showSidebarToggle onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)} />
      <Sidebar collapsed={sidebarCollapsed} onCollapse={() => setSidebarCollapsed(!sidebarCollapsed)} />

      <main
        className="pt-14 transition-all duration-300"
        style={{ marginLeft: sidebarCollapsed ? 72 : 240 }}
      >
        <div className="flex gap-6 p-6">
          <div className="flex-1 max-w-4xl">
            <div className="relative">
              <VideoPlayer video={lessonArray} onTimeClick={setCurrentTimestamp} currentTime={currentTimestamp} />

              <motion.div
                className="absolute top-4 right-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <motion.button
                  onClick={() => setStudyMode(!studyMode)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium backdrop-blur-md transition-all ${
                    studyMode
                      ? 'bg-red-600 text-white shadow-lg'
                      : 'bg-white/90 text-gray-700 border border-gray-200'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {studyMode ? <ToggleRight size={18} /> : <ToggleLeft size={18} />}
                  <span className="text-sm font-medium">Study Mode</span>
                </motion.button>
              </motion.div>

              {studyMode && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-4 left-4 bg-green-50 border border-green-200 text-green-800 px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5"
                >
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  Study Mode đang bật
                </motion.div>
              )}
            </div>

            <div className="mt-4">
              <h1 className="text-xl font-semibold text-gray-900">{lessonArray.title}</h1>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">Có transcript</span>
                <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded">Có chapter</span>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">Đang học</span>
              </div>

              <div className="flex items-center gap-4 mt-4">
                <div className="flex items-center gap-3">
                  <img
                    src={lessonArray.channelAvatar}
                    alt={lessonArray.channel}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="font-medium text-gray-900">{lessonArray.channel}</p>
                    <p className="text-xs text-gray-600">238K người đăng ký</p>
                  </div>
                  <motion.button
                    className="px-5 py-2.5 bg-black text-white text-sm font-medium rounded-full hover:bg-gray-800"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Đăng ký
                  </motion.button>
                </div>
              </div>

              <div className="flex items-center gap-3 mt-4">
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex items-center gap-2 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 rounded-full text-sm font-medium">
                  <ThumbsUp size={18} /> 1.2K
                </motion.button>
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex items-center gap-2 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 rounded-full text-sm font-medium">
                  <Share size={18} /> Chia sẻ
                </motion.button>
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex items-center gap-2 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 rounded-full text-sm font-medium">
                  <Download size={18} /> Tải xuống
                </motion.button>
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex items-center gap-2 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 rounded-full text-sm font-medium">
                  <Bookmark size={18} /> Lưu
                </motion.button>
              </div>

              <motion.button
                onClick={() => window.open('https://www.youtube.com', '_blank')}
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mt-2"
                whileHover={{ x: 4 }}
              >
                <ExternalLink size={16} />
                Mở video gốc trên YouTube
              </motion.button>
            </div>

            <AnimatePresence mode="wait">
              {studyMode ? (
                <motion.div
                  key="collapsed-comments"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-6 bg-gray-50 rounded-xl p-4 border border-gray-200"
                >
                  <div className="flex items-center gap-3 text-gray-600">
                    <MessageSquare size={20} className="text-gray-400" />
                    <p className="text-sm">Bình luận đã được thu gọn để giảm xao nhãng</p>
                    <motion.button className="text-sm text-red-600 font-medium ml-auto flex items-center gap-1" whileHover={{ scale: 1.05 }}>
                      Mở
                      <ChevronDown size={16} />
                    </motion.button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="expanded-comments"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-6"
                >
                  <h3 className="font-semibold mb-4">245 Bình luận</h3>
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex gap-3">
                        <div className="w-10 h-10 rounded-full bg-gray-300 flex-shrink-0" />
                        <div className="flex-1">
                          <p className="text-sm text-gray-600">Người xem {i}</p>
                          <p className="text-sm mt-1">Bài giảng rất hay! Cảm ơn giảng viên.</p>
                          <div className="flex gap-4 mt-2 text-xs text-gray-500">
                            <span>2 ngày trước</span>
                            <button className="flex items-center gap-1"><ThumbsUp size={12} /> 34</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <motion.div
            initial={{ width: 360 }}
            animate={{ width: studyMode ? 380 : 360 }}
            className="flex-shrink-0 border-l border-gray-200 pl-6"
          >
            {studyMode ? (
              <div className="bg-white">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">Công cụ học tập</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span>Tự động phát</span>
                    <motion.button onClick={() => setAutoPlay(!autoPlay)} whileTap={{ scale: 0.95 }}>
                      {autoPlay ? <ToggleRight size={20} className="text-red-600" /> : <ToggleLeft size={20} className="text-gray-400" />}
                    </motion.button>
                  </div>
                </div>

                <div className="flex border-b border-gray-200 mb-4">
                  {[
                    { id: 'notes', icon: FileText, label: 'Ghi chú' },
                    { id: 'transcript', icon: Eye, label: 'Transcript' },
                    { id: 'chapters', icon: List, label: 'Chapters' },
                    { id: 'saved', icon: Save, label: 'Lưu' },
                  ].map((tab) => (
                    <motion.button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as typeof activeTab)}
                      className={`flex-1 flex items-center justify-center gap-1.5 py-3 text-sm font-medium transition-colors relative ${
                        activeTab === tab.id ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700'
                      }`}
                      whileHover={{ backgroundColor: 'rgba(0,0,0,0.02)' }}
                    >
                      <tab.icon size={16} />
                      {tab.label}
                      {activeTab === tab.id && (
                        <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900" />
                      )}
                    </motion.button>
                  ))}
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="max-h-[500px] overflow-y-auto"
                  >
                    {activeTab === 'chapters' && (
                      <div className="space-y-1">
                        {arrayChapters.map((chapter, idx) => (
                          <motion.button
                            key={idx}
                            onClick={() => setCurrentTimestamp(chapter.timestampSeconds)}
                            className="w-full flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg text-left"
                            whileHover={{ x: 4 }}
                          >
                            <span className="text-xs text-gray-500 w-12">{chapter.timestamp}</span>
                            <span className="text-sm text-gray-700">{chapter.title}</span>
                          </motion.button>
                        ))}
                      </div>
                    )}
                    {activeTab === 'notes' && (
                      <div className="text-sm text-gray-600 p-4 text-center">
                        <p className="mb-2">Chưa có ghi chú</p>
                        <motion.button whileHover={{ scale: 1.05 }} className="text-red-600 font-medium">+ Thêm ghi chú</motion.button>
                      </div>
                    )}
                    {activeTab === 'transcript' && (
                      <div className="text-sm text-gray-700 space-y-3">
                        <p><span className="text-xs text-gray-500 mr-2">00:00</span>Xin chào các bạn, hôm nay chúng ta sẽ học về Array.</p>
                        <p><span className="text-xs text-gray-500 mr-2">04:20</span>Array là một cấu trúc dữ liệu quan trọng...</p>
                        <p><span className="text-xs text-gray-500 mr-2">08:40</span>Để khai báo một mảng, chúng ta...</p>
                        <p><span className="text-xs text-gray-500 mr-2">12:10</span>Truy cập phần tử qua chỉ số...</p>
                      </div>
                    )}
                    {activeTab === 'saved' && (
                      <div className="text-sm text-gray-600 p-4 text-center">Chưa có gì được lưu</div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            ) : (
              <div>
                <h3 className="font-semibold mb-4 text-gray-900">Video đề xuất</h3>
                <div className="space-y-4">
                  {distractingRecommendations.map((video) => (
                    <VideoCard key={video.id} video={video} compact />
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </main>
    </div>
  );
}
