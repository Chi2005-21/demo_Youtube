import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Pencil, Trash2, Clock, FileText, ThumbsUp, Share, Download, Bookmark, RotateCcw, X, Check, AlertTriangle, ExternalLink, Play } from 'lucide-react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import VideoPlayer from '../components/VideoPlayer';
import ToastContainer from '../components/Toast';
import { useToast } from '../hooks/useToast';
import { useNotes } from '../hooks/useNotes';
import { lessonArray, arrayChapters } from '../data/mockData';
import { Note } from '../types';

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export default function StudyNotesPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentTimestamp, setCurrentTimestamp] = useState(260);
  const [selectedNote, setSelectedNote] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [newNoteContent, setNewNoteContent] = useState('');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const { toasts, addToast, removeToast } = useToast();
  const { notes, addNote, updateNote, deleteNote, resetToDefault } = useNotes(lessonArray.id);

  const videoDuration = 32 * 60 + 45;

  const handleNoteClick = (note: Note) => {
    setSelectedNote(note.id);
    setCurrentTimestamp(note.timestampSeconds);
    addToast(`Đã tua đến ${note.timestamp}`, 'info');
  };

  const handleTimeSeek = (seconds: number) => {
    setCurrentTimestamp(seconds);
    addToast(`Đã tua đến ${formatTime(seconds)}`, 'info');
  };

  const handleAddNote = () => {
    if (!newNoteContent.trim()) {
      addToast('Vui lòng nhập nội dung ghi chú', 'warning');
      return;
    }

    const newNote = addNote({
      timestamp: formatTime(currentTimestamp),
      timestampSeconds: currentTimestamp,
      content: newNoteContent.trim(),
    });

    setNewNoteContent('');
    setIsAddingNote(false);
    addToast(`Đã lưu ghi chú tại ${newNote.timestamp}`, 'success');
  };

  const handleEditNote = (note: Note) => {
    setEditingId(note.id);
    setEditContent(note.content);
  };

  const handleSaveEdit = () => {
    if (!editContent.trim()) {
      addToast('Nội dung ghi chú không được để trống', 'warning');
      return;
    }

    if (editingId) {
      updateNote(editingId, { content: editContent.trim() });
      addToast('Đã cập nhật ghi chú', 'success');
    }
    setEditingId(null);
    setEditContent('');
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditContent('');
  };

  const handleDeleteNote = (id: string) => {
    if (selectedNote === id) {
      setSelectedNote(null);
    }
    deleteNote(id);
    setDeleteConfirmId(null);
    addToast('Đã xóa ghi chú', 'success');
  };

  const handleResetNotes = () => {
    resetToDefault();
    setSelectedNote(null);
    addToast('Đã khôi phục ghi chú mẫu', 'info');
  };

  const quickSeekTimes = [
    { label: '04:20', seconds: 260 },
    { label: '12:10', seconds: 730 },
    { label: '20:30', seconds: 1230 },
    { label: '28:00', seconds: 1680 },
  ];

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
            <VideoPlayer
              video={lessonArray}
              onTimeClick={setCurrentTimestamp}
              currentTime={currentTimestamp}
            />

            <div className="flex gap-2 mt-3">
              {quickSeekTimes.map((time) => (
                <motion.button
                  key={time.seconds}
                  onClick={() => handleTimeSeek(time.seconds)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-colors ${
                    currentTimestamp === time.seconds
                      ? 'bg-red-600 text-white border-red-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Tua đến {time.label}
                </motion.button>
              ))}
            </div>

            <motion.button
              onClick={() => window.open('https://www.youtube.com', '_blank')}
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mt-2"
              whileHover={{ x: 4 }}
            >
              <ExternalLink size={16} />
              Mở video gốc trên YouTube
            </motion.button>

            <div className="mt-5">
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
            </div>

            <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-xs text-gray-500">
                Đây là bản demo giao diện. Ghi chú được lưu cục bộ trong trình duyệt để mô phỏng trải nghiệm học tập. Không cần đăng nhập hoặc backend.
              </p>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-[380px] flex-shrink-0 border-l border-gray-200 pl-6"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                <FileText size={18} />
                Ghi chú học tập
              </h3>
              <div className="flex gap-2">
                <motion.button
                  onClick={handleResetNotes}
                  className="flex items-center gap-1 text-gray-500 text-xs font-medium hover:text-gray-700"
                  whileHover={{ scale: 1.05 }}
                  title="Khôi phục ghi chú mẫu"
                >
                  <RotateCcw size={14} />
                  Reset
                </motion.button>
              </div>
            </div>

            <div className="mb-3 flex items-center gap-2 text-xs text-gray-500 bg-gray-50 px-3 py-2 rounded-lg">
              <Clock size={14} />
              <span>Thời gian hiện tại: {formatTime(currentTimestamp)} / {lessonArray.duration}</span>
            </div>

            <AnimatePresence>
              {isAddingNote && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-3 p-3 bg-white border-2 border-red-200 rounded-lg"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-mono bg-red-100 text-red-700 px-2 py-1 rounded">
                      {formatTime(currentTimestamp)}
                    </span>
                    <span className="text-xs text-gray-500">Ghi chú mới</span>
                  </div>
                  <textarea
                    value={newNoteContent}
                    onChange={(e) => setNewNoteContent(e.target.value)}
                    placeholder="Nhập nội dung ghi chú..."
                    className="w-full text-sm border border-gray-300 rounded p-2 resize-none focus:outline-none focus:ring-2 focus:ring-red-500"
                    rows={3}
                    autoFocus
                  />
                  <div className="flex justify-end gap-2 mt-2">
                    <button
                      onClick={() => setIsAddingNote(false)}
                      className="px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-100 rounded"
                    >
                      Hủy
                    </button>
                    <button
                      onClick={handleAddNote}
                      className="px-3 py-1.5 text-xs bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      Lưu ghi chú
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              onClick={() => setIsAddingNote(true)}
              className="w-full flex items-center justify-center gap-2 py-2 text-red-600 text-sm font-medium border-2 border-dashed border-red-200 rounded-lg hover:bg-red-50 mb-4"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <Plus size={16} />
              Thêm ghi chú tại {formatTime(currentTimestamp)}
            </motion.button>

            <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
              <AnimatePresence>
                {notes.map((note) => (
                  <motion.div
                    key={note.id}
                    onClick={() => handleNoteClick(note)}
                    className={`relative p-3 rounded-lg cursor-pointer border-2 transition-colors ${
                      selectedNote === note.id
                        ? 'border-red-500 bg-red-50'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                    whileHover={{ scale: selectedNote === note.id ? 1 : 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    layout
                  >
                    {deleteConfirmId === note.id ? (
                      <div className="flex items-center gap-2">
                        <AlertTriangle size={16} className="text-yellow-500" />
                        <span className="text-xs text-gray-700 flex-1">Xóa ghi chú này?</span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteNote(note.id);
                          }}
                          className="px-2 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700"
                        >
                          Xóa
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setDeleteConfirmId(null);
                          }}
                          className="px-2 py-1 text-xs bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                        >
                          Hủy
                        </button>
                      </div>
                    ) : editingId === note.id ? (
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs font-mono bg-gray-100 text-gray-700 px-2 py-1 rounded">
                            {note.timestamp}
                          </span>
                        </div>
                        <textarea
                          value={editContent}
                          onChange={(e) => setEditContent(e.target.value)}
                          onClick={(e) => e.stopPropagation()}
                          className="w-full text-sm border border-gray-300 rounded p-2 resize-none focus:outline-none focus:ring-2 focus:ring-red-500"
                          rows={2}
                          autoFocus
                        />
                        <div className="flex justify-end gap-2 mt-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCancelEdit();
                            }}
                            className="px-2 py-1 text-xs text-gray-600 hover:bg-gray-100 rounded flex items-center gap-1"
                          >
                            <X size={12} /> Hủy
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSaveEdit();
                            }}
                            className="px-2 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700 flex items-center gap-1"
                          >
                            <Check size={12} /> Lưu
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="flex items-start justify-between mb-1">
                          <span className="text-xs font-mono bg-gray-100 text-gray-700 px-2 py-0.5 rounded">
                            {note.timestamp}
                          </span>
                          <div className="flex gap-1">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleEditNote(note);
                              }}
                              className="p-1 hover:bg-gray-100 rounded"
                            >
                              <Pencil size={12} className="text-gray-500" />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setDeleteConfirmId(note.id);
                              }}
                              className="p-1 hover:bg-red-50 rounded"
                            >
                              <Trash2 size={12} className="text-gray-500" />
                            </button>
                          </div>
                        </div>
                        <p className="text-sm text-gray-700 leading-5">{note.content}</p>
                      </>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <motion.button
              className="w-full mt-3 py-2 text-center text-red-600 text-xs font-medium border border-red-200 rounded-lg hover:bg-red-50"
              whileHover={{ scale: 1.01 }}
            >
              Xem tất cả ghi chú
            </motion.button>

            <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-xs text-gray-500">
                Ghi chú được lưu cục bộ trong bản demo để mô phỏng trải nghiệm học tập. Không cần đăng nhập hoặc backend.
              </p>
            </div>
          </motion.div>
        </div>
      </main>

      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
}
