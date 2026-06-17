import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ThumbsUp, Share, Download, Bookmark, ChevronDown, Eye, FileText, List, Save,
  ToggleLeft, ToggleRight, MessageSquare, Play, Target, CheckCircle, AlertCircle,
  RotateCcw, Plus, Pencil, Trash2, Clock, X, HelpCircle, BookmarkPlus, FileDown
} from 'lucide-react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import FakeVideoPlayer from '../components/FakeVideoPlayer';
import ToastContainer from '../components/Toast';
import { useToast } from '../hooks/useToast';
import { useNotes } from '../hooks/useNotes';
import { distractingRecommendations, learningVideos, entertainmentVideos, continueLearningVideos, subscribedVideos } from '../data/mockData';
import { ViewGoal, Note, Chapter, AdMarker } from '../types';
import VideoCard from '../components/VideoCard';

const arrayChapters: Chapter[] = [
  { title: 'Giới thiệu', timestamp: '00:00', timestampSeconds: 0 },
  { title: 'Khái niệm Array', timestamp: '04:20', timestampSeconds: 260 },
  { title: 'Truy cập phần tử', timestamp: '12:10', timestampSeconds: 730 },
  { title: 'Duyệt mảng', timestamp: '20:30', timestampSeconds: 1230 },
  { title: 'Bài tập', timestamp: '28:00', timestampSeconds: 1680 },
];

const arrayAdMarkers: AdMarker[] = [
  { timestamp: 0, label: 'Pre-roll ad' },
  { timestamp: 730, label: 'Ad after Chapter 2' },
  { timestamp: 1680, label: 'Ad before final exercise' },
];

const arrayDefaultNotes: Note[] = [
  { id: 'n1', timestamp: '04:20', timestampSeconds: 260, content: 'Array lưu trữ các phần tử cùng kiểu dữ liệu.' },
  { id: 'n2', timestamp: '12:10', timestampSeconds: 730, content: 'Chỉ số của mảng bắt đầu từ 0.' },
  { id: 'n3', timestamp: '20:30', timestampSeconds: 1230, content: 'Có thể duyệt mảng bằng vòng lặp for.' },
  { id: 'n4', timestamp: '28:00', timestampSeconds: 1680, content: 'Bài tập: tìm phần tử lớn nhất trong mảng.' },
];

const goalLabels: Record<ViewGoal, string> = {
  learning: 'Học tập',
  entertainment: 'Giải trí',
  continue: 'Xem tiếp',
  subscribed: 'Kênh đã đăng ký',
};

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export default function IntegratedDemoPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [studyMode, setStudyMode] = useState(true);
  const [activeTab, setActiveTab] = useState<'notes' | 'transcript' | 'chapters' | 'saved'>('notes');
  const [autoPlay, setAutoPlay] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [viewGoal, setViewGoal] = useState<ViewGoal>('learning');
  const [showGoalDropdown, setShowGoalDropdown] = useState(false);
  const [showHelper, setShowHelper] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [selectedNote, setSelectedNote] = useState<string | null>(null);
  const [adToast, setAdToast] = useState<string | null>(null);

  const { toasts, addToast, removeToast } = useToast();
  const videoId = 'array-integrated';

  const [notes, setNotes] = useState<Note[]>(() => {
    const stored = localStorage.getItem(`youtube-learn-notes-${videoId}`);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return arrayDefaultNotes;
      }
    }
    return arrayDefaultNotes;
  });

  useEffect(() => {
    localStorage.setItem(`youtube-learn-notes-${videoId}`, JSON.stringify(notes));
  }, [notes]);

  const handleNoteClick = (note: Note) => {
    setSelectedNote(note.id);
    setCurrentTime(note.timestampSeconds);
    addToast(`Đã tua đến ${note.timestamp}`, 'info');
  };

  const handleAddNote = () => {
    if (!newNoteContent.trim()) {
      addToast('Vui lòng nhập nội dung ghi chú', 'warning');
      return;
    }

    const newNote: Note = {
      id: Date.now().toString(),
      timestamp: formatTime(currentTime),
      timestampSeconds: currentTime,
      content: newNoteContent.trim(),
    };

    setNotes([...notes, newNote].sort((a, b) => a.timestampSeconds - b.timestampSeconds));
    setNewNoteContent('');
    setIsAddingNote(false);
    addToast(`Đã lưu ghi chú tại ${newNote.timestamp}`, 'success');
  };

  const handleSaveEdit = () => {
    if (!editContent.trim() || !editingId) return;
    setNotes(notes.map(n => n.id === editingId ? { ...n, content: editContent } : n));
    setEditingId(null);
    setEditContent('');
    addToast('Đã cập nhật ghi chú', 'success');
  };

  const handleDeleteNote = (id: string) => {
    setNotes(notes.filter(n => n.id !== id));
    setDeleteConfirmId(null);
    if (selectedNote === id) setSelectedNote(null);
    addToast('Đã xóa ghi chú', 'success');
  };

  const handleResetNotes = () => {
    setNotes(arrayDefaultNotes);
    setSelectedNote(null);
    addToast('Đã khôi phục ghi chú mẫu', 'info');
  };

  const handleAdStart = () => {
    setAdToast('Quảng cáo sẽ phát sau khi kết thúc phần hiện tại.');
    addToast('Quảng cáo đang phát...', 'warning');
  };

  const handleAdEnd = () => {
    setAdToast(null);
    addToast('Đã quay lại bài học', 'success');
  };

  const getRecommendedVideos = () => {
    switch (viewGoal) {
      case 'learning': return learningVideos.slice(0, 4);
      case 'entertainment': return entertainmentVideos.slice(0, 4);
      case 'continue': return continueLearningVideos;
      case 'subscribed': return [];
    }
  };

  const transcriptData = [
    { time: '04:20', text: 'Array là một cấu trúc dữ liệu tuyến tính, lưu trữ các phần tử cùng kiểu dữ liệu...' },
    { time: '08:40', 'text': 'Để khai báo một mảng trong C++, ta sử dụng cú pháp: int arr[10];' },
    { time: '12:10', text: 'Mỗi phần tử trong mảng được truy cập thông qua chỉ số, bắt đầu từ 0...' },
    { time: '16:00', text: 'Kích thước của mảng được cố định khi khai báo.' },
    { time: '20:30', text: 'Để duyệt mảng, ta có thể sử dụng vòng lặp for hoặc while...' },
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
            <FakeVideoPlayer
              title="Array trong lập trình"
              subtitle="Bài 12 – Cấu trúc dữ liệu và giải thuật"
              duration={32 * 60 + 45}
              chapters={arrayChapters}
              adMarkers={arrayAdMarkers}
              currentTime={currentTime}
              onTimeUpdate={setCurrentTime}
              onAdStart={handleAdStart}
              onAdEnd={handleAdEnd}
            />

            <div className="mt-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h1 className="text-xl font-semibold text-gray-900">
                    Cấu trúc dữ liệu và giải thuật – Bài 12: Array
                  </h1>
                  <div className="flex items-center gap-2 mt-2 flex-wrap">
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">Có transcript</span>
                    <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded">Có chapter</span>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">Đang học</span>
                    <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded">Quảng cáo ít gián đoạn</span>
                  </div>
                </div>

                <motion.button
                  onClick={() => setStudyMode(!studyMode)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium text-sm transition-all shadow-sm ${
                    studyMode
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {studyMode ? <ToggleRight size={16} /> : <ToggleLeft size={16} />}
                  Study Mode
                </motion.button>
              </div>

              <div className="flex items-center gap-2 mt-3 text-sm">
                <Target size={14} className="text-gray-500" />
                <span className="text-gray-600">Mục tiêu xem:</span>
                <div className="relative">
                  <button
                    onClick={() => setShowGoalDropdown(!showGoalDropdown)}
                    className="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded hover:bg-gray-200 text-gray-800"
                  >
                    <span className="font-medium">{goalLabels[viewGoal]}</span>
                    <ChevronDown size={14} />
                  </button>

                  <AnimatePresence>
                    {showGoalDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="absolute top-full left-0 mt-1 bg-white border rounded-lg shadow-lg z-10 py-1 min-w-[140px]"
                      >
                        {(Object.keys(goalLabels) as ViewGoal[]).map((goal) => (
                          <button
                            key={goal}
                            onClick={() => {
                              setViewGoal(goal);
                              setShowGoalDropdown(false);
                            }}
                            className={`w-full text-left px-3 py-2 text-sm ${
                              viewGoal === goal ? 'bg-red-50 text-red-600' : 'hover:bg-gray-50'
                            }`}
                          >
                            {goalLabels[goal]}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <div className="flex items-center gap-4 mt-4">
                <div className="flex items-center gap-3">
                  <img
                    src="https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=100"
                    alt="CodeLearn"
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="font-medium text-gray-900">CodeLearn</p>
                    <p className="text-xs text-gray-600">238K người đăng ký</p>
                  </div>
                  <motion.button
                    className="px-4 py-2 bg-black text-white text-sm font-medium rounded-full hover:bg-gray-800"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Đăng ký
                  </motion.button>
                </div>
              </div>

              <div className="flex items-center gap-3 mt-4">
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm font-medium">
                  <ThumbsUp size={16} /> 1.2K
                </motion.button>
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm font-medium">
                  <Share size={16} /> Chia sẻ
                </motion.button>
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm font-medium">
                  <Download size={16} /> Tải xuống
                </motion.button>
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm font-medium">
                  <Bookmark size={16} /> Lưu
                </motion.button>
              </div>
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
                      Mở <ChevronDown size={14} />
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

            <motion.section
              className="mt-6 p-4 bg-green-50 rounded-xl border border-green-200"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-xs font-medium text-red-600 mb-2">Trước:</p>
                  <ul className="text-gray-700 space-y-1 text-xs">
                    <li>• Đề xuất dày đặc</li>
                    <li>• Autoplay bật</li>
                    <li>• Ghi chú phải dùng app ngoài</li>
                    <li>• Quảng cáo chen ngang</li>
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-medium text-green-600 mb-2">Sau:</p>
                  <ul className="text-gray-700 space-y-1 text-xs">
                    <li>• Study Mode giảm nhiễu</li>
                    <li>• Mục tiêu xem rõ ràng</li>
                    <li>• Ghi chú theo timestamp</li>
                    <li>• Quảng cáo sau điểm nghỉ nhận thức</li>
                  </ul>
                </div>
              </div>
            </motion.section>

            <motion.div
              className="mt-4 border border-gray-200 rounded-lg overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <button
                onClick={() => setShowHelper(!showHelper)}
                className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 text-sm"
              >
                <span className="flex items-center gap-2 font-medium text-gray-700">
                  <HelpCircle size={16} /> Kịch bản trình bày
                </span>
                <ChevronDown size={16} className={`transform transition-transform ${showHelper ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {showHelper && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                    className="bg-white p-3 text-xs text-gray-600 space-y-2"
                  >
                    <p>1. Bật Study Mode để giảm nhiễu.</p>
                    <p>2. Chọn mục tiêu xem là Học tập.</p>
                    <p>3. Click ghi chú 12:10 để tua đến phần quan trọng.</p>
                    <p>4. Click "Mô phỏng quảng cáo" để thấy quảng cáo xuất hiện sau chapter.</p>
                    <p>5. Tắt Study Mode để so sánh với giao diện YouTube thường.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          <motion.div
            initial={{ width: 360 }}
            animate={{ width: studyMode ? 380 : 360 }}
            className="flex-shrink-0 border-l border-gray-200 pl-6"
          >
            {studyMode ? (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">Công cụ học tập</h3>
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <span>Tự động phát</span>
                    <button onClick={() => setAutoPlay(!autoPlay)}>
                      {autoPlay ? <ToggleRight size={18} className="text-red-600" /> : <ToggleLeft size={18} className="text-gray-400" />}
                    </button>
                  </div>
                </div>

                <div className="flex border-b border-gray-200 mb-4">
                  {[
                    { id: 'notes', icon: FileText, label: 'Ghi chú' },
                    { id: 'transcript', icon: Eye, label: 'Transcript' },
                    { id: 'chapters', icon: List, label: 'Chapters' },
                    { id: 'saved', icon: Save, label: 'Lưu' },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as typeof activeTab)}
                      className={`flex-1 flex items-center justify-center gap-1 py-3 text-xs font-medium relative ${
                        activeTab === tab.id ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      <tab.icon size={14} />
                      {tab.label}
                      {activeTab === tab.id && (
                        <motion.div layoutId="activeTabInt" className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900" />
                      )}
                    </button>
                  ))}
                </div>

                <AnimatePresence mode="wait">
                  {activeTab === 'notes' && (
                    <motion.div
                      key="notes"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="max-h-[400px] overflow-y-auto"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <Clock size={14} />
                          {formatTime(currentTime)} / 32:45
                        </div>
                        <button
                          onClick={handleResetNotes}
                          className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700"
                        >
                          <RotateCcw size={12} /> Reset
                        </button>
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
                                {formatTime(currentTime)}
                              </span>
                            </div>
                            <textarea
                              value={newNoteContent}
                              onChange={(e) => setNewNoteContent(e.target.value)}
                              placeholder="Nhập nội dung ghi chú..."
                              className="w-full text-sm border rounded p-2 resize-none focus:outline-none focus:ring-2 focus:ring-red-500"
                              rows={2}
                            />
                            <div className="flex justify-end gap-2 mt-2">
                              <button onClick={() => setIsAddingNote(false)} className="px-2 py-1 text-xs text-gray-600 hover:bg-gray-100 rounded">Hủy</button>
                              <button onClick={handleAddNote} className="px-2 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700">Lưu</button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <button
                        onClick={() => setIsAddingNote(true)}
                        className="w-full flex items-center justify-center gap-2 py-2 text-red-600 text-xs font-medium border-2 border-dashed border-red-200 rounded-lg hover:bg-red-50 mb-3"
                      >
                        <Plus size={14} /> Thêm ghi chú
                      </button>

                      <div className="space-y-2">
                        {notes.map((note) => (
                          <motion.div
                            key={note.id}
                            onClick={() => handleNoteClick(note)}
                            className={`p-2.5 rounded-lg cursor-pointer border transition-colors ${
                              selectedNote === note.id ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                            }`}
                            whileTap={{ scale: 0.98 }}
                          >
                            {deleteConfirmId === note.id ? (
                              <div className="flex items-center gap-2 text-xs">
                                <AlertCircle size={14} className="text-yellow-500" />
                                <span className="flex-1">Xóa?</span>
                                <button onClick={(e) => { e.stopPropagation(); handleDeleteNote(note.id); }} className="px-2 py-0.5 bg-red-600 text-white rounded">Xóa</button>
                                <button onClick={(e) => { e.stopPropagation(); setDeleteConfirmId(null); }} className="px-2 py-0.5 bg-gray-200 rounded">Hủy</button>
                              </div>
                            ) : editingId === note.id ? (
                              <div>
                                <textarea
                                  value={editContent}
                                  onChange={(e) => setEditContent(e.target.value)}
                                  onClick={(e) => e.stopPropagation()}
                                  className="w-full text-xs border rounded p-1.5 resize-none"
                                  rows={2}
                                />
                                <div className="flex justify-end gap-1 mt-1">
                                  <button onClick={(e) => { e.stopPropagation(); handleSaveEdit(); }} className="px-2 py-0.5 text-xs bg-red-600 text-white rounded">Lưu</button>
                                  <button onClick={(e) => { e.stopPropagation(); setEditingId(null); }} className="px-2 py-0.5 text-xs bg-gray-200 rounded">Hủy</button>
                                </div>
                              </div>
                            ) : (
                              <div className="flex items-start gap-2">
                                <span className="text-xs font-mono bg-gray-100 px-1.5 py-0.5 rounded flex-shrink-0">{note.timestamp}</span>
                                <p className="text-xs text-gray-700 flex-1">{note.content}</p>
                                <div className="flex gap-1 flex-shrink-0">
                                  <button onClick={(e) => { e.stopPropagation(); setEditingId(note.id); setEditContent(note.content); }} className="p-1 hover:bg-gray-100 rounded"><Pencil size={10} className="text-gray-400" /></button>
                                  <button onClick={(e) => { e.stopPropagation(); setDeleteConfirmId(note.id); }} className="p-1 hover:bg-red-50 rounded"><Trash2 size={10} className="text-gray-400" /></button>
                                </div>
                              </div>
                            )}
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'transcript' && (
                    <motion.div
                      key="transcript"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-xs text-gray-700 space-y-2"
                    >
                      {transcriptData.map((item, idx) => (
                        <p key={idx}>
                          <span className="text-gray-400 mr-2">{item.time}</span>
                          {item.text}
                        </p>
                      ))}
                    </motion.div>
                  )}

                  {activeTab === 'chapters' && (
                    <motion.div
                      key="chapters"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-1"
                    >
                      {arrayChapters.map((chapter, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentTime(chapter.timestampSeconds)}
                          className={`w-full flex items-center gap-3 p-2 rounded-lg text-left text-sm ${
                            currentTime >= chapter.timestampSeconds &&
                            (idx === arrayChapters.length - 1 || currentTime < arrayChapters[idx + 1].timestampSeconds)
                              ? 'bg-red-50'
                              : 'hover:bg-gray-50'
                          }`}
                        >
                          <span className="text-xs text-gray-500 w-10">{chapter.timestamp}</span>
                          <span className="text-gray-700">{chapter.title}</span>
                        </button>
                      ))}
                    </motion.div>
                  )}

                  {activeTab === 'saved' && (
                    <motion.div
                      key="saved"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-3"
                    >
                      <button className="w-full flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 text-left text-sm">
                        <BookmarkPlus size={16} className="text-gray-500" />
                        <span>Lưu vào playlist Học thuật toán</span>
                      </button>
                      <button className="w-full flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 text-left text-sm">
                        <CheckCircle size={16} className="text-green-500" />
                        <span>Đánh dấu ôn lại sau</span>
                      </button>
                      <button className="w-full flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 text-left text-sm">
                        <FileDown size={16} className="text-gray-500" />
                        <span>Xuất ghi chú</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-xs text-gray-500">
                    Ghi chú được lưu cục bộ trong bản demo để mô phỏng trải nghiệm học tập. Không cần đăng nhập hoặc backend.
                  </p>
                </div>
              </div>
            ) : (
              <div>
                <h3 className="font-semibold mb-4">Video đề xuất</h3>
                <div className="space-y-4">
                  {getRecommendedVideos().map((video) => (
                    <VideoCard key={video.id} video={video} compact />
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </main>

      <ToastContainer toasts={toasts} removeToast={removeToast} />

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
