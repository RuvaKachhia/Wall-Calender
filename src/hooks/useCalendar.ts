"use client";
import { useState, useCallback, useEffect } from "react";
import { CalendarDate, Note, Theme, AnimationDirection } from "@/types";
import { compareCalDate, generateId, toDateKey } from "@/lib/utils";
import { MONTHS } from "@/lib/constants";

const STORAGE_KEY = "wall-calendar-notes";
const THEME_KEY = "wall-calendar-theme";

export function useCalendar() {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [rangeStart, setRangeStart] = useState<CalendarDate | null>(null);
  const [rangeEnd, setRangeEnd] = useState<CalendarDate | null>(null);
  const [hoveredDay, setHoveredDay] = useState<CalendarDate | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const [theme, setTheme] = useState<Theme>("light");
  const [animDir, setAnimDir] = useState<AnimationDirection>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setNotes(JSON.parse(saved));
      const savedTheme = localStorage.getItem(THEME_KEY) as Theme;
      if (savedTheme) setTheme(savedTheme);
    } catch {}
  }, []);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(notes)); } catch {}
  }, [notes]);

  useEffect(() => {
    try { localStorage.setItem(THEME_KEY, theme); } catch {}
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const navigateMonth = useCallback((dir: "next" | "prev") => {
    if (isAnimating) return;
    setAnimDir(dir);
    setIsAnimating(true);
    setTimeout(() => {
      if (dir === "next") {
        if (month === 11) {
          setYear(y => y + 1);
          setMonth(0);
        } else {
          setMonth(m => m + 1);
        }
      } else {
        if (month === 0) {
          setYear(y => y - 1);
          setMonth(11);
        } else {
          setMonth(m => m - 1);
        }
      }
      setIsAnimating(false);
      setAnimDir(null);
    }, 380);
  }, [isAnimating, month]);

  const handleDayClick = useCallback((date: CalendarDate) => {
    if (!rangeStart || rangeEnd) {
      setRangeStart(date);
      setRangeEnd(null);
    } else {
      if (compareCalDate(date, rangeStart) === 0) {
        setRangeStart(null);
      } else {
        setRangeEnd(date);
      }
    }
  }, [rangeStart, rangeEnd]);

  const clearRange = useCallback(() => {
    setRangeStart(null);
    setRangeEnd(null);
    setHoveredDay(null);
  }, []);

  const addNote = useCallback((text: string) => {
    if (!text.trim()) return;
    const note: Note = {
      id: generateId(),
      text: text.trim(),
      createdAt: new Date().toISOString(),
      rangeStart: rangeStart ?? undefined,
      rangeEnd: rangeEnd ?? undefined,
    };
    setNotes((prev) => [note, ...prev]);
  }, [rangeStart, rangeEnd]);

  const deleteNote = useCallback((id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((t) => (t === "light" ? "dark" : "light"));
  }, []);

  const getNotesForDate = useCallback((date: CalendarDate): Note[] => {
    return notes.filter((n) => {
      if (!n.rangeStart) return false;
      const s = new Date(n.rangeStart.year, n.rangeStart.month, n.rangeStart.day);
      const e = n.rangeEnd ? new Date(n.rangeEnd.year, n.rangeEnd.month, n.rangeEnd.day) : s;
      const t = new Date(date.year, date.month, date.day);
      return t >= Math.min(s.getTime(), e.getTime()) && t <= Math.max(s.getTime(), e.getTime());
    });
  }, [notes]);

  const formatNoteLabel = useCallback((note: Note): string => {
    if (!note.rangeStart) return "General note";
    const s = note.rangeStart;
    if (!note.rangeEnd || (compareCalDate(s, note.rangeEnd) === 0)) {
      return `${MONTHS[s.month]} ${s.day}, ${s.year}`;
    }
    const e = note.rangeEnd;
    const lo = compareCalDate(s, e) <= 0 ? s : e;
    const hi = compareCalDate(s, e) <= 0 ? e : s;
    return `${MONTHS[lo.month]} ${lo.day} → ${MONTHS[hi.month]} ${hi.day}`;
  }, []);

  return {
    year, month, rangeStart, rangeEnd, hoveredDay, notes, theme, animDir, isAnimating,
    setHoveredDay, navigateMonth, handleDayClick, clearRange, addNote, deleteNote,
    toggleTheme, getNotesForDate, formatNoteLabel,
  };
}
