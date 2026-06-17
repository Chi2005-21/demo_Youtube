import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThumbsUp, Share, Download, Bookmark, AlertCircle, Info, Pause, Play, ChevronDown, ExternalLink } from 'lucide-react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import VideoCard from '../components/VideoCard';
import { lessonTichPhan, tichPhanChapters, tichPhanAdMarkers, distractingRecommendations } from '../data/mockData';

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export default function LessAdsPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [selectedChapter, setSelectedChapter] = useState<number>(0);
  const [showAdWarning, setShowAdWarning] = useState(true);
  const [studyMode, setStudyMode] = useState(true);
  const [adToast, setAdToast] = useState<string | null>(null);

  const totalDuration = 26 * 60 + 10;

  const handleSimulateAd = () => {
    setAdToast('Quảng cáo sẽ phát sau khi kết thúc phần hiện tại.');
    setTimeout(() => setAdToast(null), 3000);
  };

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
              {showAdWarning && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-red-900 text-white rounded-lg p-3 mb-4 flex items-center gap-3"
                >
                  <span className="bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded">AD</span>
                  <div className="flex-1">
                    <p className="text-sm">Quảng cáo sẽ bắt đầu sau...</p>
                    <div className="w-48 h-1.5 bg-white/30 rounded mt-2">
                      <motion.div
                        className="h-full bg-yellow-400 rounded"
                        initial={{ width: '100%' }}
                        animate={{ width: '0%' }}
                        transition={{ duration: 5 }}
                      />
                    </div>
                  </div>
                  <button className="text-xs bg-white/20 px-3 py-1 rounded hover:bg-white/30">Bỏ qua</button>
                </motion.div>
              )}

              <div className="aspect-video relative rounded-xl overflow-hidden bg-black">
                <img
                  src={lessonTichPhan.thumbnail}
                  alt={lessonTichPhan.title}
                  className="w-full h-full object-cover opacity-90"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <button className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30">
                    <Play size={32} className="text-white ml-1" />
                  </button>
                </motion.div>

                <div className="absolute top-4 right-4">
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
                    {studyMode ? 'Study Mode Ads' : 'Bình thường'}
                  </motion.button>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                  <div className="relative mb-4">
                    <div className="h-1.5 bg-gray-600 rounded cursor-pointer">
                      {tichPhanAdMarkers.map((marker, idx) => (
                        <motion.div
                          key={idx}
                          className="absolute top-0 bottom-0 w-1.5 bg-yellow-400 shadow-lg cursor-pointer group"
                          style={{ left: `${(marker.timestamp / totalDuration) * 100}%` }}
                          whileHover={{ scaleY: 1.5 }}
                        >
                          <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-yellow-400 text-xs text-black px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity font-medium">
                            {marker.label}
                          </div>
                        </motion.div>
                      ))}

                      {tichPhanChapters.map((chapter, idx) => (
                        idx > 0 && (
                          <div
                            key={idx}
                            className="absolute top-0 bottom-0 w-px bg-gray-400"
                            style={{ left: `${(chapter.timestampSeconds / totalDuration) * 100}%` }}
                          />
                        )
                      ))}

                      <motion.div
                        className="h-full bg-red-600 rounded"
                        style={{ width: `${(currentTime / totalDuration) * 100}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-gray-400 mt-1">
                      <span>{formatTime(currentTime)}</span>
                      <span>{lessonTichPhan.duration}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <h1 className="text-xl font-semibold text-gray-900">{lessonTichPhan.title}</h1>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded">Có chapter</span>
                <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded">Quảng cáo sau điểm nghỉ</span>
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">Study Mode Ads</span>
              </div>

              <div className="flex items-center gap-4 mt-4">
                <div className="flex items-center gap-3">
                  <img
                    src={lessonTichPhan.channelAvatar}
                    alt={lessonTichPhan.channel}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="font-medium text-gray-900">{lessonTichPhan.channel}</p>
                    <p className="text-xs text-gray-600">156K người đăng ký</p>
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
                  <ThumbsUp size={18} /> 892
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

            <motion.section
              className="mt-6 p-5 bg-gray-50 rounded-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <AlertCircle size={20} className="text-orange-500" />
                  <h3 className="font-semibold text-gray-900">Vị trí quảng cáo trong video này</h3>
                </div>
                <motion.button
                  onClick={handleSimulateAd}
                  className="text-sm text-red-600 font-medium hover:underline"
                  whileHover={{ scale: 1.05 }}
                >
                  Mô phỏng quảng cáo sắp xuất hiện
                </motion.button>
              </div>

              <div className="relative mb-4 bg-gray-200 rounded-lg h-8 overflow-hidden">
                <div className="flex h-full">
                  {tichPhanChapters.map((chapter, idx) => {
                    const percentage = idx === 0
                      ? (tichPhanChapters[1].timestampSeconds / totalDuration) * 100
                      : idx === tichPhanChapters.length - 1
                        ? 100 - (tichPhanChapters[idx - 1].timestampSeconds / totalDuration) * 100
                        : ((idx < tichPhanChapters.length - 1 ? tichPhanChapters[idx + 1].timestampSeconds : totalDuration) - chapter.timestampSeconds) / totalDuration * 100;

                    return (
                      <div
                        key={idx}
                        className="h-full bg-gradient-to-r border-r border-gray-400 flex items-center justify-center text-xs text-gray-600 font-medium relative"
                        style={{
                          width: `${percentage}%`,
                          background: idx % 2 === 0 ? 'linear-gradient(to right, #e5e7eb, #d1d5db)' : 'linear-gradient(to right, #d1d5db, #e5e7eb)'
                        }}
                      >
                        <span className="truncate px-1">{chapter.title}</span>
                        {tichPhanAdMarkers.map((marker, mIdx) => {
                          const isAtChapterStart = Math.abs(marker.timestamp - chapter.timestampSeconds) < 5;
                          if (isAtChapterStart) {
                            return (
                              <div
                                key={mIdx}
                                className="absolute right-0 top-0 bottom-0 w-1 bg-yellow-400"
                              />
                            );
                          }
                          return null;
                        })}
                      </div>
                    );
                  })}
                </div>

                <div className="absolute bottom-full mb-1 flex w-full justify-between text-xs text-gray-500">
                  <span>0:00</span>
                  <span>6:30</span>
                  <span>14:20</span>
                  <span>22:00</span>
                  <span>26:10</span>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                <div className="flex items-center gap-2 p-2 bg-white rounded border">
                  <div className="w-3 h-3 bg-yellow-400 rounded" />
                  <span className="text-gray-700">Quảng cáo</span>
                </div>
                <div className="flex items-center gap-2 p-2 bg-white rounded border">
                  <div className="w-3 h-3 bg-gray-400 rounded" />
                  <span className="text-gray-700">Chapter</span>
                </div>
              </div>
            </motion.section>

            <motion.section
              className="mt-4 p-5 bg-green-50 rounded-xl border border-green-200"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Info size={20} className="text-green-600" />
                <h3 className="font-semibold text-gray-900">Quảng cáo ít gián đoạn hơn</h3>
              </div>

              <div className="space-y-3 text-sm text-gray-700">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5" />
                  <span>Báo trước vị trí quảng cáo để bạn không bị bất ngờ</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5" />
                  <span>Quảng cáo ưu tiên xuất hiện ở đầu video</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5" />
                  <span>Đặt quảng cáo sau các chapter break, không cắt giữa giải thích</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5" />
                  <span>Tránh làm gián đoạn các phần nội dung quan trọng</span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-white rounded-lg border border-green-200">
                <p className="text-xs text-gray-500 mb-3">So sánh:</p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-medium text-red-600 mb-1">Trước:</p>
                    <p className="text-sm text-gray-700">"Quảng cáo chen ngang giữa phần giải thích."</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-green-600 mb-1">Sau:</p>
                    <p className="text-sm text-gray-700">"Quảng cáo được báo trước và đặt sau chapter."</p>
                  </div>
                </div>
              </div>
            </motion.section>
          </div>

          <div className="w-[360px] flex-shrink-0 border-l border-gray-200 pl-6">
            <h3 className="font-semibold mb-4">Danh sách chương</h3>

            <div className="space-y-1 mb-6">
              {tichPhanChapters.map((chapter, idx) => (
                <motion.button
                  key={idx}
                  onClick={() => {
                    setSelectedChapter(idx);
                    setCurrentTime(chapter.timestampSeconds);
                  }}
                  className={`w-full flex items-center gap-3 p-2.5 rounded-lg text-left ${
                    selectedChapter === idx ? 'bg-red-50 border-l-2 border-red-600' : 'hover:bg-gray-50'
                  }`}
                  whileHover={{ x: selectedChapter === idx ? 0 : 4 }}
                >
                  <span className="text-xs text-gray-500 w-12">{chapter.timestamp}</span>
                  <span className="text-sm">{chapter.title}</span>
                </motion.button>
              ))}
            </div>

            <AnimatePresence>
              {showAdWarning && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-sm text-yellow-800 mb-4"
                >
                  <div className="flex items-center gap-2 font-medium">
                    <Pause size={16} />
                    Quảng cáo sau 06:30
                  </div>
                  <p className="text-xs mt-1 text-yellow-700">Khi kết thúc Chapter: Ví dụ 1</p>
                </motion.div>
              )}
            </AnimatePresence>

            <h3 className="font-semibold mb-4 mt-6">Video liên quan</h3>
            <div className="space-y-4">
              {distractingRecommendations.slice(0, 3).map((video) => (
                <VideoCard key={video.id} video={video} compact />
              ))}
            </div>
          </div>
        </div>
      </main>

      <AnimatePresence>
        {adToast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-6 py-3 rounded-lg shadow-lg text-sm z-50"
          >
            {adToast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
