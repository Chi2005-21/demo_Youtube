import { motion, AnimatePresence } from 'framer-motion';
import { Video } from '../types';
import { useNavigate } from 'react-router';

interface VideoCardProps {
  video: Video;
  compact?: boolean;
}

export default function VideoCard({ video, compact }: VideoCardProps) {
  const navigate = useNavigate();

  return (
    <motion.div
      onClick={() => navigate('/')}
      className={`cursor-pointer group ${compact ? 'flex gap-2 p-2 hover:bg-gray-50 rounded-lg' : ''}`}
      whileHover={{ scale: compact ? 1 : 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className={`${compact ? 'w-40 h-24 flex-shrink-0' : 'relative'}`}>
        <motion.img
          src={video.thumbnail}
          alt={video.title}
          className={`w-full ${compact ? 'h-24 rounded-lg' : 'aspect-video rounded-xl'} object-cover`}
          loading="lazy"
        />
        <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1.5 py-0.5 rounded font-medium">
          {video.duration}
        </div>
        {video.isPlaylist && (
          <div className="absolute top-1 right-1 bg-black/80 text-white text-xs px-2 py-0.5 rounded flex items-center gap-1">
            <span>{video.playlistCount} video</span>
          </div>
        )}
        {video.progress !== undefined && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-300 rounded-b-xl overflow-hidden">
            <motion.div
              className="h-full bg-red-600"
              initial={{ width: 0 }}
              animate={{ width: `${video.progress}%` }}
              transition={{ duration: 0.5, delay: 0.2 }}
            />
          </div>
        )}
      </div>

      {!compact ? (
        <div className="flex gap-3 mt-3">
          <AnimatePresence>
            {!video.isPlaylist && (
              <motion.img
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                src={video.channelAvatar}
                alt={video.channel}
                className="w-9 h-9 rounded-full object-cover flex-shrink-0"
              />
            )}
          </AnimatePresence>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-medium line-clamp-2 text-gray-900 leading-5 group-hover:text-gray-700 transition-colors">{video.title}</h3>
            <p className="text-xs text-gray-600 mt-1">{video.channel}</p>
            <p className="text-xs text-gray-600">
              {video.views} • {video.uploadedAt}
            </p>
            <div className="flex flex-wrap gap-2 mt-1.5">
              {video.hasTranscript && (
                <span className="text-xs bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded">
                  Có transcript
                </span>
              )}
              {video.hasChapters && (
                <span className="text-xs bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded">
                  Có chapter
                </span>
              )}
              {video.isPlaylist && (
                <span className="text-xs bg-gray-100 text-gray-700 px-1.5 py-0.5 rounded">
                  Playlist
                </span>
              )}
              {video.progress !== undefined && video.progress > 0 && (
                <span className="text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded">
                  Đang học
                </span>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 min-w-0">
          <h3 className="text-xs font-medium line-clamp-2 text-gray-900 leading-4">{video.title}</h3>
          <p className="text-xs text-gray-600 mt-1">{video.channel}</p>
          <p className="text-xs text-gray-500">{video.views}</p>
        </div>
      )}
    </motion.div>
  );
}
