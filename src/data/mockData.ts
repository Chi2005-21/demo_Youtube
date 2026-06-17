import { Video, Note, Chapter, AdMarker } from '../types';

// FIXED DEMO LESSONS

// Lesson 1: Array - Main for Study Mode and Study Notes
export const lessonArray: Video = {
  id: 'array-lesson',
  title: 'Cấu trúc dữ liệu và giải thuật – Bài 12: Array',
  thumbnail: 'https://images.pexels.com/photos/1089438/pexels-photo-1089438.jpeg?auto=compress&cs=tinysrgb&w=600',
  channel: 'CodeLearn',
  channelAvatar: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=100',
  views: '128K lượt xem',
  uploadedAt: '3 tuần trước',
  duration: '32:45',
  hasTranscript: true,
  hasChapters: true,
};

export const arrayChapters: Chapter[] = [
  { title: 'Giới thiệu', timestamp: '00:00', timestampSeconds: 0 },
  { title: 'Khái niệm Array', timestamp: '04:20', timestampSeconds: 260 },
  { title: 'Truy cập phần tử', timestamp: '12:10', timestampSeconds: 730 },
  { title: 'Duyệt mảng', timestamp: '20:30', timestampSeconds: 1230 },
  { title: 'Bài tập', timestamp: '28:00', timestampSeconds: 1680 },
];

export const arrayDefaultNotes: Note[] = [
  { id: 'n1', timestamp: '04:20', timestampSeconds: 260, content: 'Array lưu trữ các phần tử cùng kiểu dữ liệu.' },
  { id: 'n2', timestamp: '12:10', timestampSeconds: 730, content: 'Chỉ số của mảng bắt đầu từ 0.' },
  { id: 'n3', timestamp: '20:30', timestampSeconds: 1230, content: 'Có thể duyệt mảng bằng vòng lặp for.' },
  { id: 'n4', timestamp: '28:00', timestampSeconds: 1680, content: 'Bài tập: tìm phần tử lớn nhất trong mảng.' },
];

// Lesson 2: Tich phan - Main for Less Disruptive Ads
export const lessonTichPhan: Video = {
  id: 'tich-phan-lesson',
  title: 'Giải tích 1 – Tích phân từng phần dễ hiểu',
  thumbnail: 'https://images.pexels.com/photos/632598/pexels-photo-632598.jpeg?auto=compress&cs=tinysrgb&w=600',
  channel: 'Math Việt Nam',
  channelAvatar: 'https://images.pexels.com/photos/2184303/pexels-photo-2184303.jpeg?auto=compress&cs=tinysrgb&w=100',
  views: '89.2K lượt xem',
  uploadedAt: '2 tháng trước',
  duration: '26:10',
  hasTranscript: true,
  hasChapters: true,
};

export const tichPhanChapters: Chapter[] = [
  { title: 'Công thức tổng quát', timestamp: '00:00', timestampSeconds: 0 },
  { title: 'Ví dụ 1', timestamp: '06:30', timestampSeconds: 390 },
  { title: 'Ví dụ 2', timestamp: '14:20', timestampSeconds: 860 },
  { title: 'Bài tập tự luyện', timestamp: '22:00', timestampSeconds: 1320 },
];

export const tichPhanAdMarkers: AdMarker[] = [
  { timestamp: 0, label: 'Quảng cáo trước video' },
  { timestamp: 390, label: 'Sau Chapter: Ví dụ 1' },
  { timestamp: 860, label: 'Sau Chapter: Ví dụ 2' },
];

// Lesson 3: Network - For homepage cards
export const lessonNetwork: Video = {
  id: 'network-lesson',
  title: 'Mạng máy tính cơ bản đến nâng cao',
  thumbnail: 'https://images.pexels.com/photos/1148820/pexels-photo-1148820.jpeg?auto=compress&cs=tinysrgb&w=600',
  channel: 'Network Pro',
  channelAvatar: 'https://images.pexels.com/photos/428364/pexels-photo-428364.jpeg?auto=compress&cs=tinysrgb&w=100',
  views: '67.8K lượt xem',
  uploadedAt: '5 tháng trước',
  duration: '41:20',
  hasTranscript: true,
  hasChapters: true,
  progress: 45,
};

export const networkChapters: Chapter[] = [
  { title: 'Tổng quan mạng máy tính', timestamp: '00:00', timestampSeconds: 0 },
  { title: 'Mô hình OSI', timestamp: '09:15', timestampSeconds: 555 },
  { title: 'TCP/IP', timestamp: '18:30', timestampSeconds: 1110 },
  { title: 'Địa chỉ IP và subnet', timestamp: '30:00', timestampSeconds: 1800 },
];

// Homepage video collections
export const learningVideos: Video[] = [
  lessonArray,
  lessonNetwork,
  {
    id: 'python-lesson',
    title: 'Lập trình Python cho người mới bắt đầu',
    thumbnail: 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=600',
    channel: 'Python Việt',
    channelAvatar: 'https://images.pexels.com/photos/1181472/pexels-photo-1181472.jpeg?auto=compress&cs=tinysrgb&w=100',
    views: '312K lượt xem',
    uploadedAt: '8 tháng trước',
    duration: '2:15:30',
    hasTranscript: true,
    progress: 23,
  },
  {
    id: 'ml-lesson',
    title: 'Machine Learning cơ bản',
    thumbnail: 'https://images.pexels.com/photos/1089440/pexels-photo-1089440.jpeg?auto=compress&cs=tinysrgb&w=600',
    channel: 'AI Learning',
    channelAvatar: 'https://images.pexels.com/photos/1194713/pexels-photo-1194713.jpeg?auto=compress&cs=tinysrgb&w=100',
    views: '189K lượt xem',
    uploadedAt: '4 tháng trước',
    duration: '1:45:20',
    hasTranscript: true,
    hasChapters: true,
  },
  {
    id: 'os-lesson',
    title: 'Hệ điều hành từ A đến Z – Playlist đầy đủ',
    thumbnail: 'https://images.pexels.com/photos/97077/pexels-photo-97077.jpeg?auto=compress&cs=tinysrgb&w=600',
    channel: 'Tech University',
    channelAvatar: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=100',
    views: '256K lượt xem',
    uploadedAt: '1 năm trước',
    duration: '24 video',
    isPlaylist: true,
    playlistCount: 24,
  },
  lessonTichPhan,
];

export const continueLearningVideos: Video[] = [
  { ...lessonNetwork, progress: 45 },
  { ...lessonArray, progress: 62 },
  {
    id: 'ml-lesson-cont',
    title: 'Machine Learning cơ bản',
    thumbnail: 'https://images.pexels.com/photos/1089440/pexels-photo-1089440.jpeg?auto=compress&cs=tinysrgb&w=600',
    channel: 'AI Learning',
    channelAvatar: 'https://images.pexels.com/photos/1194713/pexels-photo-1194713.jpeg?auto=compress&cs=tinysrgb&w=100',
    views: '189K lượt xem',
    uploadedAt: '4 tháng trước',
    duration: '1:45:20',
    progress: 28,
  },
];

export const entertainmentVideos: Video[] = [
  {
    id: 'ent1',
    title: 'Vlog: Một ngày trong đời developer',
    thumbnail: 'https://images.pexels.com/photos/7988034/pexels-photo-7988034.jpeg?auto=compress&cs=tinysrgb&w=600',
    channel: 'DevLife',
    channelAvatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100',
    views: '1.2M lượt xem',
    uploadedAt: '1 tuần trước',
    duration: '18:32',
  },
  {
    id: 'ent2',
    title: 'Âm nhạc tập làm việc – Lo-fi beats',
    thumbnail: 'https://images.pexels.com/photos/1677141/pexels-photo-1677141.jpeg?auto=compress&cs=tinysrgb&w=600',
    channel: 'Chill Vibes',
    channelAvatar: 'https://images.pexels.com/photos/1699374/pexels-photo-1699374.jpeg?auto=compress&cs=tinysrgb&w=100',
    views: '5.6M lượt xem',
    uploadedAt: '2 năm trước',
    duration: '2:45:00',
  },
  {
    id: 'ent3',
    title: 'Mukbang: Phở bò Hà Nội cực ngon',
    thumbnail: 'https://images.pexels.com/photos/2323399/pexels-photo-2323399.jpeg?auto=compress&cs=tinysrgb&w=600',
    channel: 'Food Vietnam',
    channelAvatar: 'https://images.pexels.com/photos/1181318/pexels-photo-1181318.jpeg?auto=compress&cs=tinysrgb&w=100',
    views: '890K lượt xem',
    uploadedAt: '3 ngày trước',
    duration: '24:15',
  },
  {
    id: 'ent4',
    title: 'Game streaming – Valorant ranked',
    thumbnail: 'https://images.pexels.com/photos/7915437/pexels-photo-7915437.jpeg?auto=compress&cs=tinysrgb&w=600',
    channel: 'GamerVN',
    channelAvatar: 'https://images.pexels.com/photos/3756063/pexels-photo-3756063.jpeg?auto=compress&cs=tinysrgb&w=100',
    views: '456K lượt xem',
    uploadedAt: '5 giờ trước',
    duration: '2:12:45',
  },
];

export const subscribedVideos: Video[] = [
  {
    id: 'sub1',
    title: 'Tin công nghệ tuần này – AI thay đổi thế giới',
    thumbnail: 'https://images.pexels.com/photos/8386441/pexels-photo-8386441.jpeg?auto=compress&cs=tinysrgb&w=600',
    channel: 'Tech News Việt',
    channelAvatar: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=100',
    views: '234K lượt xem',
    uploadedAt: '2 ngày trước',
    duration: '28:45',
  },
  {
    id: 'sub2',
    title: 'Giải thuật mới – Dijkstra chi tiết',
    thumbnail: 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=600',
    channel: 'CodeLearn',
    channelAvatar: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=100',
    views: '56K lượt xem',
    uploadedAt: '1 tuần trước',
    duration: '45:30',
    hasTranscript: true,
    hasChapters: true,
  },
  {
    id: 'sub3',
    title: 'Lập trình Java – OOP nâng cao',
    thumbnail: 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=600',
    channel: 'Java Master',
    channelAvatar: 'https://images.pexels.com/photos/7988034/pexels-photo-7988034.jpeg?auto=compress&cs=tinysrgb&w=100',
    views: '89K lượt xem',
    uploadedAt: '4 ngày trước',
    duration: '1:12:20',
    hasTranscript: true,
  },
];

// Distracting recommendations for Study Mode OFF state
export const distractingRecommendations: Video[] = [
  {
    id: 'dist1',
    title: 'Top 10 mẹo học lập trình nhanh',
    thumbnail: 'https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=600',
    channel: 'Quick Tips',
    channelAvatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100',
    views: '892K lượt xem',
    uploadedAt: '2 tuần trước',
    duration: '12:45',
  },
  {
    id: 'dist2',
    title: 'Shorts: Code trong 30 giây',
    thumbnail: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=600',
    channel: 'Code Shorts',
    channelAvatar: 'https://images.pexels.com/photos/1181316/pexels-photo-1181316.jpeg?auto=compress&cs=tinysrgb&w=100',
    views: '2.1M lượt xem',
    uploadedAt: '5 ngày trước',
    duration: '0:30',
  },
  {
    id: 'dist3',
    title: 'Game thư giãn sau giờ học',
    thumbnail: 'https://images.pexels.com/photos/7915437/pexels-photo-7915437.jpeg?auto=compress&cs=tinysrgb&w=600',
    channel: 'GamerVN',
    channelAvatar: 'https://images.pexels.com/photos/3756063/pexels-photo-3756063.jpeg?auto=compress&cs=tinysrgb&w=100',
    views: '456K lượt xem',
    uploadedAt: '1 ngày trước',
    duration: '1:45:30',
  },
  {
    id: 'dist4',
    title: 'Livestream hỏi đáp công nghệ',
    thumbnail: 'https://images.pexels.com/photos/3945683/pexels-photo-3945683.jpeg?auto=compress&cs=tinysrgb&w=600',
    channel: 'Tech Live',
    channelAvatar: 'https://images.pexels.com/photos/2184303/pexels-photo-2184303.jpeg?auto=compress&cs=tinysrgb&w=100',
    views: 'Đang trực tiếp',
    uploadedAt: 'Bây giờ',
    duration: 'LIVE',
  },
];

// Legacy exports for backward compatibility
export const mockVideos = learningVideos;
export const currentVideo = lessonArray;
export const mockChapters = arrayChapters;
export const mockNotes = arrayDefaultNotes;
export const mockAdMarkers = tichPhanAdMarkers;

export const features = [
  { id: 'study-mode', title: 'Study Mode', description: 'Bật chế độ tập trung, loại bỏ gợi ý xao nhãng, tắt autoplay', icon: 'Focus' },
  { id: 'goal-homepage', title: 'Trang chủ theo mục tiêu xem', description: 'Chọn nội dung dựa trên mục tiêu: Học tập, Giải trí, Tiếp tục xem...', icon: 'Target' },
  { id: 'study-notes', title: 'Study Notes theo timestamp', description: 'Ghi chú trực tiếp vào video, nhảy đến timestamp dễ dàng', icon: 'StickyNote' },
  { id: 'less-ads', title: 'Quảng cáo ít gián đoạn hơn', description: 'Báo trước vị trí quảng cáo, ưu tiên ở chapter breaks', icon: 'Shield' },
];
