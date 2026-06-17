import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, SkipBack, SkipForward, Settings, Maximize, ExternalLink } from 'lucide-react';
import { useState } from 'react';
import { Video } from '../types';

interface VideoPlayerProps {
  video: Video;
  onTimeClick?: (time: number) => void;
  currentTime?: number;
  adMarkers?: number[];
  chapters?: { timestampSeconds: number; title: string }[];
}

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function parseDuration(duration: string): number {
  if (duration.includes('video')) return 32 * 60 + 45;

  const parts = duration.split(':').map(Number);
  if (parts.length === 3) {
    return parts[0] * 3600 + parts[1] * 60 + parts[2];
  } else if (parts.length === 2) {
    return parts[0] * 60 + parts[1];
  }
  return 32 * 60 + 45;
}

export default function VideoPlayer({ video, onTimeClick, currentTime = 0, adMarkers = [], chapters = [] }: VideoPlayerProps) {
  const [isHovering, setIsHovering] = useState(false);
  const totalDuration = parseDuration(video.duration);
  const progress = (currentTime / totalDuration) * 100;

  return (
    <motion.div
      className="relative bg-black rounded-xl overflow-hidden aspect-video"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <img
        src={video.thumbnail}
        alt={video.title}
        className="w-full h-full object-cover opacity-90"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

      <AnimatePresence>
        {isHovering && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.button
              className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Play size={32} className="text-white ml-1" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
        <div className="relative mb-3">
          <div
            className="h-1.5 bg-gray-600 rounded cursor-pointer group relative"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const percent = x / rect.width;
              const time = Math.floor(percent * totalDuration);
              onTimeClick?.(time);
            }}
          >
            {chapters.map((chapter, idx) => (
              <div
                key={idx}
                className="absolute top-0 bottom-0 w-0.5 bg-gray-400"
                style={{ left: `${(chapter.timestampSeconds / totalDuration) * 100}%` }}
              />
            ))}

            {adMarkers.map((marker, idx) => (
              <motion.div
                key={idx}
                className="absolute top-0 bottom-0 w-1.5 bg-yellow-400 shadow-lg cursor-pointer group/marker"
                style={{ left: `${(marker / totalDuration) * 100}%` }}
                whileHover={{ scaleY: 1.5 }}
              >
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-yellow-400 text-xs text-black px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover/marker:opacity-100 transition-opacity font-medium z-10">
                  Quảng cáo
                </div>
              </motion.div>
            ))}

            <motion.div
              className="h-full bg-red-600 rounded relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-red-600 rounded-full border-2 border-white shadow-md" />
            </motion.div>
          </div>
        </div>

        <div className="flex items-center justify-between text-white">
          <div className="flex items-center gap-3">
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="p-1">
              <Play size={20} />
            </motion.button>
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="p-1">
              <SkipBack size={18} />
            </motion.button>
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="p-1">
              <SkipForward size={18} />
            </motion.button>
            <span className="time-display text-xs font-mono">
              {formatTime(currentTime)} / {video.duration.replace(/video/, '')}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="p-1">
              <Volume2 size={18} />
            </motion.button>
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="p-1">
              <Settings size={18} />
            </motion.button>
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="p-1">
              <Maximize size={18} />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
