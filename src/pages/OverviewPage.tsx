import { motion } from 'framer-motion';
import { Focus, Target, StickyNote, Shield, ArrowRight, Youtube, BookOpen, Play, Layers } from 'lucide-react';
import { useNavigate } from 'react-router';
import Header from '../components/Header';

const iconMap: Record<string, React.ElementType> = {
  Focus,
  Target,
  StickyNote,
  Shield,
  Layers,
};

const features = [
  {
    id: 'integrated',
    title: 'Tổng hợp 4 cải tiến',
    description: 'Xem tất cả 4 cải tiến hoạt động cùng nhau trong một trang',
    icon: 'Layers',
    color: 'bg-red-500',
    path: '/integrated',
    lesson: 'Bản demo đầy đủ',
    highlight: true,
  },
  {
    id: 'study-mode',
    title: 'Study Mode',
    description: 'Bật chế độ tập trung, loại bỏ gợi ý xao nhãng, tắt autoplay, thu gọn bình luận',
    icon: 'Focus',
    color: 'bg-blue-500',
    path: '/study-mode',
    lesson: 'Bài 12: Array',
  },
  {
    id: 'goal-homepage',
    title: 'Trang chủ theo mục tiêu xem',
    description: 'Chọn nội dung dựa trên mục tiêu: Học tập, Giải trí, Tiếp tục xem, Kênh đã đăng ký',
    icon: 'Target',
    color: 'bg-green-500',
    path: '/goal-homepage',
    lesson: 'Xem video học tập',
  },
  {
    id: 'study-notes',
    title: 'Study Notes theo timestamp',
    description: 'Ghi chú trực tiếp vào video, nhảy đến timestamp dễ dàng, lưu cục bộ trong demo',
    icon: 'StickyNote',
    color: 'bg-orange-500',
    path: '/study-notes',
    lesson: 'Bài 12: Array',
  },
  {
    id: 'less-ads',
    title: 'Quảng cáo ít gián đoạn hơn',
    description: 'Báo trước vị trí quảng cáo, ưu tiên ở chapter breaks, không cắt giữa giải thích',
    icon: 'Shield',
    color: 'bg-purple-500',
    path: '/less-ads',
    lesson: 'Tích phân từng phần',
  },
];

export default function OverviewPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="pt-14">
        <section className="bg-gradient-to-br from-red-600 via-red-500 to-red-400 text-white py-16 px-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />

          <div className="max-w-5xl mx-auto text-center relative z-10">
            <motion.div
              className="flex items-center justify-center gap-2 mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Youtube size={48} className="text-white" />
              <span className="text-3xl font-bold">Learn</span>
            </motion.div>

            <motion.h1
              className="text-4xl md:text-5xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              YouTube dành cho việc học
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl text-white/90 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Giảm xao nhãng – Tăng tập trung – Hỗ trợ ghi chú – Hạn chế gián đoạn
            </motion.p>
            <motion.div
              className="flex justify-center gap-4 flex-wrap"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <motion.button
                onClick={() => navigate('/integrated')}
                className="bg-white text-red-600 px-6 py-3 rounded-full font-medium hover:bg-gray-100 flex items-center gap-2 shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Play size={18} />
                Xem demo tổng hợp
              </motion.button>
            </motion.div>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 py-12">
          <motion.h2
            className="text-2xl font-semibold mb-2 text-center text-gray-900"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            5 trang demo cho trình bày
          </motion.h2>
          <motion.p
            className="text-gray-600 text-center mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
          >
            Giao diện vẫn giữ cảm giác YouTube quen thuộc, nhưng thêm công cụ hỗ trợ học tập
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((feature, index) => {
              const Icon = iconMap[feature.icon];
              return (
                <motion.div
                  key={feature.id}
                  onClick={() => navigate(feature.path)}
                  className={`bg-white rounded-xl p-5 cursor-pointer border-2 transition-all ${
                    feature.highlight
                      ? 'border-red-300 shadow-lg hover:border-red-400'
                      : 'border-gray-200 hover:shadow-md hover:border-gray-300'
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.08 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-start gap-4">
                    <div className={`${feature.color} p-3 rounded-xl shadow-md`}>
                      <Icon size={24} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-base font-semibold text-gray-900">{feature.title}</h3>
                        {feature.highlight && (
                          <span className="text-xs bg-red-100 text-red-600 px-1.5 py-0.5 rounded font-medium">Đề xuất</span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 mb-1.5 flex items-center gap-1">
                        <BookOpen size={12} /> {feature.lesson}
                      </p>
                      <p className="text-sm text-gray-600 mb-3 leading-5">{feature.description}</p>
                      <span className="text-red-600 text-sm font-medium flex items-center gap-1">
                        Xem demo
                        <ArrowRight size={14} />
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        <section className="bg-white border-t border-gray-200 py-10">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-lg font-semibold mb-6 text-center text-gray-800">
              Mục tiêu thiết kế
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Tập trung hơn', desc: 'Loại bỏ xao nhãng khi học', icon: Focus },
                { label: 'Ít gián đoạn', desc: 'Quảng cáo thông minh hơn', icon: Shield },
                { label: 'Ghi chú tiện lợi', desc: 'Nhận biết theo timestamp', icon: StickyNote },
                { label: 'Giao diện quen thuộc', desc: 'Vẫn là YouTube', icon: Youtube },
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.label}
                    className="bg-gray-50 px-4 py-4 rounded-lg text-center border border-gray-100"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + idx * 0.1 }}
                  >
                    <Icon size={22} className="mx-auto mb-2 text-gray-500" />
                    <p className="font-medium text-gray-700 text-sm">{item.label}</p>
                    <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-gray-50 py-6 border-t border-gray-200">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <p className="text-sm text-gray-500">
              Đây là bản demo giao diện cho việc trình bày. Không phải ứng dụng hoàn chỉnh. Giao diện dựa trên YouTube nhưng thêm các tính năng hỗ trợ học tập.
            </p>
          </div>
        </section>

        <footer className="bg-gray-100 py-5 text-center text-sm text-gray-500 border-t border-gray-200">
          <p>YouTube Learn Demo – Bản trình bày</p>
        </footer>
      </main>
    </div>
  );
}
