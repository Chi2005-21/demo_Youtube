import { useState, useEffect, useCallback } from 'react';
import { Note } from '../types';
import { arrayDefaultNotes } from '../data/mockData';

const STORAGE_KEY = 'youtube-learn-notes';

export function useNotes(videoId: string) {
  const [notes, setNotes] = useState<Note[]>([]);

  // Load notes from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(`${STORAGE_KEY}-${videoId}`);
    if (stored) {
      try {
        setNotes(JSON.parse(stored));
      } catch {
        setNotes(arrayDefaultNotes);
      }
    } else {
      setNotes(arrayDefaultNotes);
    }
  }, [videoId]);

  // Save notes to localStorage whenever they change
  useEffect(() => {
    if (notes.length > 0) {
      localStorage.setItem(`${STORAGE_KEY}-${videoId}`, JSON.stringify(notes));
    }
  }, [notes, videoId]);

  const addNote = useCallback((note: Omit<Note, 'id'>) => {
    const newNote: Note = {
      ...note,
      id: Date.now().toString(),
    };
    setNotes((prev) => [...prev, newNote].sort((a, b) => a.timestampSeconds - b.timestampSeconds));
    return newNote;
  }, []);

  const updateNote = useCallback((id: string, updates: Partial<Note>) => {
    setNotes((prev) =>
      prev.map((note) => (note.id === id ? { ...note, ...updates } : note))
    );
  }, []);

  const deleteNote = useCallback((id: string) => {
    setNotes((prev) => prev.filter((note) => note.id !== id));
  }, []);

  const resetToDefault = useCallback(() => {
    setNotes(arrayDefaultNotes);
    localStorage.removeItem(`${STORAGE_KEY}-${videoId}`);
  }, [videoId]);

  return { notes, addNote, updateNote, deleteNote, resetToDefault };
}
