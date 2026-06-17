import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import VideoCard from '../components/VideoCard';
import { ViewGoal } from '../types';
import { learningVideos, entertainmentVideos, continueLearningVideos, subscribedVideos } from '../data/mockData';

const goalTabs: { id: ViewGoal; label: string }[] = [
  { id: 'learning', label: 'Học tập' },
  { id: 'entertainment', label: 'Giải trí' },
  { id: 'continue', label: 'Xem tiếp' },
  { id: 'subscribed', label: 'Kênh đã đăng ký' },
];

export default function GoalHomepagePage() {
  const [activeGoal, setActiveGoal] = useState<ViewGoal>('learning');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <Header showSidebarToggle onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)} />
      <Sidebar collapsed={sidebarCollapsed} onCollapse={() => setSidebarCollapsed(!sidebarCollapsed)} />

      <main
        className="pt-14 transition-all duration-300"
        style={{ marginLeft: sidebarCollapsed ? 72 : 240 }}
      >
        <div className="p-6">
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-4">
              {goalTabs.map((goal) => (
                <motion.button
                  key={goal.id}
                  onClick={() => setActiveGoal(goal.id)}
                  className={`px-5 py-3 rounded-full font-medium text-sm transition-colors shadow-sm ${
                    activeGoal === goal.id
                      ? 'bg-red-600 text-white'
                      : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {goal.label}
                </motion.button>
              ))}
            </div>

            {activeGoal === 'learning' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800 flex items-start gap-3"
              >
                <span className="text-lg">📚</span>
                <div>
                  <strong>Xin chào!</strong> Hôm nay bạn muốn học gì? Dưới đây là nội dung được đề xuất dựa trên mục tiêu học tập của bạn.
                </div>
              </motion.div>
            )}

            {activeGoal === 'entertainment' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-orange-50 border border-orange-200 rounded-lg p-4 text-sm text-orange-800"
              >
                Thời gian thư giãn! Dưới đây là nội dung giải trí dành cho bạn.
              </motion.div>
            )}
          </div>

          <AnimatePresence mode="wait">
            {activeGoal === 'learning' && (
              <motion.div
                key="learning"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <section className="mb-10">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Đề xuất cho mục tiêu Học tập</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {learningVideos.slice(0, 4).map((video, idx) => (
                      <motion.div
                        key={video.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                      >
                        <VideoCard video={video} />
                      </motion.div>
                    ))}
                  </div>
                </section>

                <section className="mb-10">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Playlist & khóa học dành cho bạn</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {learningVideos.filter(v => v.isPlaylist).map((video, idx) => (
                      <motion.div
                        key={video.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                      >
                        <VideoCard video={video} />
                      </motion.div>
                    ))}
                    {learningVideos.slice(2, 5).map((video, idx) => (
                      <motion.div
                        key={video.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 + 0.2 }}
                      >
                        <VideoCard video={video} />
                      </motion.div>
                    ))}
                  </div>
                </section>

                <section className="mb-10">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Tiếp tục học</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {continueLearningVideos.map((video, idx) => (
                      <motion.div
                        key={video.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                      >
                        <VideoCard video={video} />
                      </motion.div>
                    ))}
                  </div>
                </section>

                <section className="mb-10">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Nội dung có transcript</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {learningVideos.filter(v => v.hasTranscript).slice(0, 4).map((video, idx) => (
                      <motion.div
                        key={video.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                      >
                        <VideoCard video={video} />
                      </motion.div>
                    ))}
                  </div>
                </section>
              </motion.div>
            )}

            {activeGoal === 'entertainment' && (
              <motion.section
                key="entertainment"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Giải trí & Thư giãn</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {entertainmentVideos.map((video, idx) => (
                    <motion.div
                      key={video.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                    >
                      <VideoCard video={video} />
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            )}

            {activeGoal === 'continue' && (
              <motion.section
                key="continue"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Tiếp tục xem</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {continueLearningVideos.map((video, idx) => (
                    <motion.div
                      key={video.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                    >
                      <VideoCard video={video} />
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            )}

            {activeGoal === 'subscribed' && (
              <motion.section
                key="subscribed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Kênh đã đăng ký</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {subscribedVideos.map((video, idx) => (
                    <motion.div
                      key={video.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                    >
                      <VideoCard video={video} />
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
