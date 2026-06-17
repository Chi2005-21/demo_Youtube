export interface Video {
  id: string;
  title: string;
  thumbnail: string;
  channel: string;
  channelAvatar: string;
  views: string;
  uploadedAt: string;
  duration: string;
  hasTranscript?: boolean;
  hasChapters?: boolean;
  isPlaylist?: boolean;
  playlistCount?: number;
  progress?: number;
}

export interface Note {
  id: string;
  timestamp: string;
  timestampSeconds: number;
  content: string;
}

export interface Chapter {
  title: string;
  timestamp: string;
  timestampSeconds: number;
}

export interface AdMarker {
  timestamp: number;
  label: string;
}

export type PageType = 'overview' | 'study-mode' | 'goal-homepage' | 'study-notes' | 'less-ads';

export type ViewGoal = 'learning' | 'entertainment' | 'continue' | 'subscribed';
