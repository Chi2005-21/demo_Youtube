import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, Settings, Maximize, Volume2, X, ExternalLink, AlertCircle, Code, Lightbulb, Trophy, BookOpen } from 'lucide-react';
import { useState, useEffect, useCallback, useMemo } from 'react';

interface Chapter {
  title: string;
  timestamp: string;
  timestampSeconds: number;
}

interface AdMarker {
  timestamp: number;
  label: string;
}

type PlayerState = 'learning' | 'pre-ad' | 'ad' | 'returning';

interface FakeVideoPlayerProps {
  duration: number;
  chapters: Chapter[];
  adMarkers: AdMarker[];
  currentTime: number;
  onTimeUpdate: (time: number) => void;
  onAdStart?: () => void;
  onAdEnd?: () => void;
}

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function getCurrentChapterIndex(currentTime: number, chapters: Chapter[]): number {
  for (let i = chapters.length - 1; i >= 0; i--) {
    if (currentTime >= chapters[i].timestampSeconds) {
      return i;
    }
  }
  return 0;
}

// Scene Components
function SceneIntro() {
  return (
    <motion.div
      className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col items-center justify-center p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="absolute top-6 right-6 w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.3 }}
      >
        <BookOpen size={24} className="text-white" />
      </motion.div>

      <motion.div
        className="text-center max-w-3xl"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <motion.div
          className="inline-block px-4 py-1 rounded-full bg-blue-500/20 text-blue-300 text-sm mb-4"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
        >
          Bài 12
        </motion.div>

        <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
          Array trong lập trình
        </h2>
        <p className="text-lg text-gray-400 mb-6">
          Cấu trúc dữ liệu và giải thuật
        </p>

        <motion.div
          className="flex items-center justify-center gap-2 text-gray-500 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          CodeLearn Channel
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-16 left-1/2 -translate-x-1/2 bg-slate-800/80 backdrop-blur-sm px-6 py-3 rounded-lg border border-slate-700"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <p className="text-sm text-gray-300 text-center">
          "Hôm nay chúng ta sẽ tìm hiểu về mảng trong lập trình."
        </p>
      </motion.div>

      <motion.div
        className="absolute bottom-4 right-4 text-gray-500 text-xs"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        00:00 — Giới thiệu
      </motion.div>
    </motion.div>
  );
}

function SceneArrayDefinition() {
  const [visibleBoxes, setVisibleBoxes] = useState<number[]>([]);

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    [0, 1, 2, 3, 4].forEach((i) => {
      timers.push(setTimeout(() => {
        setVisibleBoxes((prev) => [...prev, i]);
      }, 300 + i * 200));
    });
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <motion.div
      className="absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-800 p-6 flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="flex items-center gap-2 mb-4">
        <Lightbulb size={20} className="text-yellow-400" />
        <h3 className="text-lg font-semibold text-white">Khái niệm Array</h3>
      </div>

      <motion.div
        className="bg-slate-800/60 backdrop-blur-sm rounded-xl p-5 border border-slate-700 mb-6"
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
      >
        <p className="text-base text-gray-200 leading-7">
          <span className="text-white font-medium">Array</span> là cấu trúc dữ liệu{' '}
          <span className="text-green-400 font-medium">lưu trữ nhiều phần tử cùng kiểu</span> trong các ô nhớ liên tiếp.
        </p>
      </motion.div>

      <div className="flex-1 flex flex-col items-center justify-center">
        <p className="text-sm text-gray-400 mb-3">Ví dụ mảng số nguyên:</p>
        <div className="flex gap-2 mb-2">
          {['10', '20', '30', '40', '50'].map((val, idx) => (
            <motion.div
              key={idx}
              className={`w-14 h-14 rounded-lg flex items-center justify-center text-lg font-mono font-bold transition-all duration-300 ${
                visibleBoxes.includes(idx)
                  ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30'
                  : 'bg-slate-700 text-transparent'
              }`}
              initial={{ scale: 0, rotateY: 90 }}
              animate={visibleBoxes.includes(idx) ? { scale: 1, rotateY: 0 } : {}}
              transition={{ type: 'spring', stiffness: 200 }}
            >
              {visibleBoxes.includes(idx) ? val : '?'}
            </motion.div>
          ))}
        </div>
        <motion.div
          className="flex gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          {[0, 1, 2, 3, 4].map((idx) => (
            <div key={idx} className="w-14 text-center text-xs text-gray-500">
              [{idx}]
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div
        className="bg-slate-800/50 px-4 py-2 rounded-lg border border-slate-600"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.8 }}
      >
        <p className="text-sm text-gray-300">
          "Mỗi phần tử trong mảng được lưu ở một vị trí liên tiếp trong bộ nhớ."
        </p>
      </motion.div>

      <div className="absolute bottom-2 right-4 text-gray-500 text-xs">04:20 — Khái niệm Array</div>
    </motion.div>
  );
}

function SceneAccessElement({ highlightIndex }: { highlightIndex: number | null }) {
  const values = ['10', '20', '30', '40', '50'];
  const indices = [0, 1, 2, 3, 4];

  return (
    <motion.div
      className="absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-800 p-6 flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="flex items-center gap-2 mb-4">
        <Code size={20} className="text-green-400" />
        <h3 className="text-lg font-semibold text-white">Truy cập phần tử</h3>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center gap-6">
        <div className="text-center">
          <p className="text-sm text-gray-400 mb-4">Mảng arr với các chỉ số:</p>

          <div className="flex gap-2 mb-1">
            {values.map((val, idx) => (
              <motion.div
                key={idx}
                className={`w-14 h-14 rounded-lg flex items-center justify-center text-lg font-mono font-bold transition-all ${
                  highlightIndex === idx
                    ? 'bg-yellow-500 text-black shadow-lg shadow-yellow-500/40 scale-110'
                    : 'bg-slate-700 text-white'
                }`}
                animate={highlightIndex === idx ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 0.3 }}
              >
                {val}
              </motion.div>
            ))}
          </div>

          <div className="flex gap-2 mb-6">
            {indices.map((idx) => (
              <motion.div
                key={idx}
                className={`w-14 text-center text-xs font-mono transition-all ${
                  highlightIndex === idx ? 'text-yellow-400 font-bold' : 'text-gray-500'
                }`}
              >
                index: {idx}
              </motion.div>
            ))}
          </div>

          <motion.div
            className="bg-slate-800 rounded-lg p-4 border border-slate-600 inline-block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-center gap-3">
              <span className="text-gray-400">Lấy phần tử thứ 3:</span>
              <code className="bg-slate-900 px-3 py-1.5 rounded text-green-400 font-mono text-lg">
                arr[2]
              </code>
              <span className="text-gray-400">=</span>
              <motion.span
                className="text-yellow-400 font-bold text-xl"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1, type: 'spring' }}
              >
                30
              </motion.span>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="bg-slate-800/50 px-4 py-2 rounded-lg border border-slate-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <p className="text-sm text-gray-300">
          "Chỉ số của mảng thường bắt đầu từ 0. arr[2] là phần tử thứ 3."
        </p>
      </motion.div>

      <div className="absolute bottom-2 right-4 text-gray-500 text-xs">12:10 — Truy cập phần tử</div>
    </motion.div>
  );
}

function SceneLoop() {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [output, setOutput] = useState<number[]>([]);

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    [0, 1, 2, 3, 4].forEach((i) => {
      timers.push(
        setTimeout(() => {
          setActiveIndex(i);
          setOutput((prev) => [...prev, [10, 20, 30, 40, 50][i]]);
        }, 500 + i * 600)
      );
    });
    timers.push(setTimeout(() => setActiveIndex(-1), 4000));
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <motion.div
      className="absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-800 p-6 flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="flex items-center gap-2 mb-4">
        <Code size={20} className="text-purple-400" />
        <h3 className="text-lg font-semibold text-white">Duyệt mảng</h3>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center gap-8">
        <motion.div
          className="bg-slate-800 rounded-xl p-5 border border-slate-600 font-mono text-sm"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="text-gray-400">{'# Duyệt mảng bằng vòng lặp'}</div>
          <div className="mt-2">
            <span className="text-purple-400">for</span>{' '}
            <span className="text-blue-300">i</span>{' '}
            <span className="text-gray-300">in</span>{' '}
            <span className="text-yellow-300">range</span>
            <span className="text-gray-300">(</span>
            <span className="text-green-300">len</span>
            <span className="text-gray-300">(arr)):</span>
          </div>
          <div className="ml-4 mt-1">
            <span className="text-blue-400">print</span>
            <span className="text-gray-300">(arr[</span>
            <span className="text-blue-300">i</span>
            <span className="text-gray-300">])</span>
          </div>
        </motion.div>

        <div className="text-center">
          <p className="text-xs text-gray-500 mb-2">Trạng thái mảng:</p>
          <div className="flex gap-2">
            {['10', '20', '30', '40', '50'].map((val, idx) => (
              <motion.div
                key={idx}
                className={`w-12 h-12 rounded-lg flex items-center justify-center text-sm font-mono font-bold transition-all ${
                  activeIndex === idx
                    ? 'bg-purple-500 text-white shadow-lg scale-105'
                    : 'bg-slate-700 text-gray-300'
                }`}
              >
                {val}
              </motion.div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <p className="text-xs text-gray-500 mb-2">Output:</p>
          <div className="flex items-center gap-2 text-lg font-mono">
            {output.map((val, idx) => (
              <motion.span
                key={idx}
                className="text-green-400"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {val}
                {idx < output.length - 1 && <span className="text-gray-600 mx-1">→</span>}
              </motion.span>
            ))}
            {output.length === 0 && <span className="text-gray-600 text-sm">...</span>}
          </div>
        </div>
      </div>

      <motion.div
        className="bg-slate-800/50 px-4 py-2 rounded-lg border border-slate-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <p className="text-sm text-gray-300">
          "Vòng lặp giúp duyệt qua từng phần tử trong mảng một cách hiệu quả."
        </p>
      </motion.div>

      <div className="absolute bottom-2 right-4 text-gray-500 text-xs">20:30 — Duyệt mảng</div>
    </motion.div>
  );
}

function SceneExercise() {
  const [showMax, setShowMax] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowMax(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const values = [12, 7, 45, 23, 9];
  const maxValue = 45;
  const maxIndex = 2;

  return (
    <motion.div
      className="absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-800 p-6 flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="flex items-center gap-2 mb-4">
        <Trophy size={20} className="text-yellow-400" />
        <h3 className="text-lg font-semibold text-white">Bài tập</h3>
      </div>

      <motion.div
        className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-xl p-4 border border-yellow-500/30 mb-6"
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
      >
        <p className="text-white font-medium">Tìm phần tử lớn nhất trong mảng</p>
        <p className="text-gray-400 text-sm mt-1">Hãy thử viết chương trình để giải quyết bài toán này.</p>
      </motion.div>

      <div className="flex-1 flex flex-col items-center justify-center gap-6">
        <div className="text-center">
          <p className="text-sm text-gray-400 mb-3">Mảng đầu vào:</p>
          <div className="flex gap-2">
            {values.map((val, idx) => (
              <motion.div
                key={idx}
                className={`w-14 h-14 rounded-lg flex items-center justify-center text-lg font-bold transition-all ${
                  showMax && val === maxValue
                    ? 'bg-yellow-500 text-black shadow-lg shadow-yellow-500/40 scale-110'
                    : 'bg-slate-700 text-gray-200'
                }`}
              >
                {val}
              </motion.div>
            ))}
          </div>
        </div>

        <AnimatePresence>
          {showMax && (
            <motion.div
              className="bg-slate-800 rounded-xl p-5 border border-slate-600"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center gap-4">
                <span className="text-gray-400">Kết quả:</span>
                <code className="bg-slate-900 px-4 py-2 rounded text-xl font-mono">
                  <span className="text-blue-300">max</span>
                  <span className="text-gray-300"> = </span>
                  <motion.span
                    className="text-yellow-400 font-bold"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring' }}
                  >
                    {maxValue}
                  </motion.span>
                </code>
                <span className="text-gray-500 text-sm">
                  (index: {maxIndex})
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <motion.div
        className="bg-slate-800/50 px-4 py-2 rounded-lg border border-slate-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <p className="text-sm text-gray-300">
          "Gợi ý: Dùng vòng lặp để so sánh từng phần tử với giá trị lớn nhất hiện tại."
        </p>
      </motion.div>

      <div className="absolute bottom-2 right-4 text-gray-500 text-xs">28:00 — Bài tập</div>
    </motion.div>
  );
}

export default function FakeVideoPlayer({
  duration,
  chapters,
  adMarkers,
  currentTime,
  onTimeUpdate,
  onAdStart,
  onAdEnd,
}: FakeVideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playerState, setPlayerState] = useState<PlayerState>('learning');
  const [adCountdown, setAdCountdown] = useState(5);
  const [hoveredMarker, setHoveredMarker] = useState<string | null>(null);

  const progress = (currentTime / duration) * 100;
  const currentChapterIndex = getCurrentChapterIndex(currentTime, chapters);

  useEffect(() => {
    if (!isPlaying || playerState !== 'learning') return;

    const interval = setInterval(() => {
      onTimeUpdate(Math.min(currentTime + 1, duration - 1));
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying, currentTime, duration, onTimeUpdate, playerState]);

  useEffect(() => {
    if (playerState !== 'ad') return;

    if (adCountdown <= 0) {
      setPlayerState('returning');
      onAdEnd?.();
      setTimeout(() => {
        setPlayerState('learning');
        const nextChapter = chapters[currentChapterIndex + 1] || chapters[currentChapterIndex];
        if (nextChapter) {
          onTimeUpdate(nextChapter.timestampSeconds);
        }
      }, 1500);
      return;
    }

    const timer = setTimeout(() => {
      setAdCountdown(adCountdown - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [playerState, adCountdown, onAdEnd, chapters, currentChapterIndex, onTimeUpdate]);

  const simulateAd = useCallback(() => {
    setPlayerState('pre-ad');
    setTimeout(() => {
      setPlayerState('ad');
      setAdCountdown(5);
      onAdStart?.();
    }, 2000);
  }, [onAdStart]);

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percent = x / rect.width;
    const time = Math.floor(percent * duration);
    onTimeUpdate(time);
  };

  const renderScene = () => {
    switch (currentChapterIndex) {
      case 0:
        return <SceneIntro />;
      case 1:
        return <SceneArrayDefinition />;
      case 2:
        return <SceneAccessElement highlightIndex={2} />;
      case 3:
        return <SceneLoop />;
      case 4:
        return <SceneExercise />;
      default:
        return <SceneIntro />;
    }
  };

  return (
    <div className="relative">
      <motion.div
        className="relative bg-gray-900 rounded-xl overflow-hidden aspect-video shadow-2xl"
        initial={false}
      >
        <AnimatePresence mode="wait">
          {playerState === 'learning' && (
            <motion.div
              key={`scene-${currentChapterIndex}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
            >
              {renderScene()}

              {/* Play/Pause overlay button */}
              <motion.button
                onClick={() => setIsPlaying(!isPlaying)}
                className="absolute bottom-20 left-4 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {isPlaying ? <Pause size={20} className="text-white" /> : <Play size={20} className="text-white ml-0.5" />}
              </motion.button>

              {/* Timestamp display */}
              <div className="absolute bottom-20 right-4 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-lg">
                <span className="text-white text-sm font-mono">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>
            </motion.div>
          )}

          {playerState === 'pre-ad' && (
            <motion.div
              key="pre-ad"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-gradient-to-br from-amber-900/90 to-slate-900 flex flex-col items-center justify-center p-8"
            >
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring' }}
              >
                <AlertCircle size={56} className="text-amber-400 mb-4" />
              </motion.div>
              <h3 className="text-xl font-bold text-white mb-2">Sắp đến điểm nghỉ nhận thức</h3>
              <p className="text-amber-200 text-center">Quảng cáo sẽ xuất hiện sau chapter này</p>
            </motion.div>
          )}

          {playerState === 'ad' && (
            <motion.div
              key="ad"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-gradient-to-br from-red-900 via-slate-900 to-red-900 flex flex-col items-center justify-center p-8"
            >
              <div className="absolute top-4 right-4 bg-black/40 px-3 py-1.5 rounded-lg">
                <span className="text-white text-sm">Còn {adCountdown} giây</span>
              </div>

              <div className="text-center max-w-lg">
                <span className="bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full mb-4 inline-block">
                  QUẢNG CÁO
                </span>

                <h3 className="text-2xl font-bold text-white mb-3">Khóa học lập trình nền tảng</h3>
                <p className="text-gray-300 mb-4">
                  Học tư duy thuật toán, Python và cấu trúc dữ liệu từ cơ bản
                </p>

                <motion.button
                  className="px-6 py-2.5 bg-white text-gray-900 rounded-full font-medium text-sm mb-6"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Tìm hiểu thêm
                </motion.button>

                <div className="w-48 h-1.5 bg-white/20 rounded mx-auto overflow-hidden">
                  <motion.div
                    className="h-full bg-yellow-400 rounded"
                    initial={{ width: '100%' }}
                    animate={{ width: `${(adCountdown / 5) * 100}%` }}
                  />
                </div>

                <p className="text-gray-500 text-xs mt-6">
                  Quảng cáo được đặt sau chapter để giảm gián đoạn
                </p>
              </div>
            </motion.div>
          )}

          {playerState === 'returning' && (
            <motion.div
              key="returning"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-gradient-to-br from-green-900/80 to-slate-900 flex flex-col items-center justify-center p-8"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring' }}
              >
                <Play size={56} className="text-green-400 mb-4" />
              </motion.div>
              <h3 className="text-xl font-bold text-white mb-2">Đã quay lại bài học</h3>
              <p className="text-green-300">Tiếp tục học tập...</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
          <div className="relative mb-3">
            <div
              className="h-1.5 bg-gray-600 rounded cursor-pointer"
              onClick={handleProgressClick}
            >
              {/* Chapter markers */}
              {chapters.map((chapter, idx) => (
                <div
                  key={idx}
                  className="absolute top-0 bottom-0 w-0.5 bg-gray-400"
                  style={{ left: `${(chapter.timestampSeconds / duration) * 100}%` }}
                />
              ))}

              {/* Ad markers */}
              {adMarkers.map((marker, idx) => (
                <motion.div
                  key={idx}
                  className="absolute top-0 bottom-0 w-2 bg-yellow-400 rounded cursor-pointer"
                  style={{ left: `${(marker.timestamp / duration) * 100}%` }}
                  onMouseEnter={() => setHoveredMarker(marker.label)}
                  onMouseLeave={() => setHoveredMarker(null)}
                  whileHover={{ scaleY: 1.5 }}
                >
                  {hoveredMarker === marker.label && (
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-yellow-400 text-xs text-black px-2 py-1 rounded whitespace-nowrap font-medium z-10">
                      {marker.label}
                    </div>
                  )}
                </motion.div>
              ))}

              {/* Progress */}
              <motion.div
                className="h-full bg-red-600 rounded relative"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-red-600 rounded-full border-2 border-white shadow-md" />
              </motion.div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center gap-3">
              <motion.button
                onClick={() => setIsPlaying(!isPlaying)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {isPlaying ? <Pause size={20} /> : <Play size={20} />}
              </motion.button>
              <motion.button
                onClick={() => onTimeUpdate(Math.max(0, currentTime - 10))}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <SkipBack size={18} />
              </motion.button>
              <motion.button
                onClick={() => onTimeUpdate(Math.min(duration, currentTime + 10))}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <SkipForward size={18} />
              </motion.button>
              <span className="text-xs font-mono">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Volume2 size={18} />
              </motion.button>
              <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Settings size={18} />
              </motion.button>
              <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Maximize size={18} />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Action buttons */}
      <div className="flex gap-2 mt-3">
        <motion.button
          onClick={simulateAd}
          className="px-3 py-1.5 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800 border border-yellow-200 hover:bg-yellow-200"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Mô phỏng quảng cáo
        </motion.button>
        <motion.button
          onClick={() => window.open('https://www.youtube.com', '_blank')}
          className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-full bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200"
          whileHover={{ scale: 1.05 }}
        >
          <ExternalLink size={12} />
          Mở video thật
        </motion.button>
      </div>
    </div>
  );
}
