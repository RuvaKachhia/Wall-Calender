"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Note, CalendarDate } from "@/types";
import { SEASON_CONFIG } from "@/lib/constants";

interface NotesPanelProps {
  notes: Note[];
  rangeStart: CalendarDate | null;
  rangeEnd: CalendarDate | null;
  month: number;
  onAddNote: (text: string) => void;
  onDeleteNote: (id: string) => void;
  formatNoteLabel: (note: Note) => string;
}

export default function NotesPanel({
  notes, rangeStart, rangeEnd, month,
  onAddNote, onDeleteNote, formatNoteLabel,
}: NotesPanelProps) {
  const [text, setText] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const season = SEASON_CONFIG[month];

  const handleSave = () => {
    if (!text.trim()) return;
    onAddNote(text);
    setText("");
    textareaRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) handleSave();
  };

  const placeholder = rangeStart
    ? rangeEnd
      ? "Add a note for the selected range..."
      : "Add a note for this date..."
    : "Add a general note for the month...";

  return (
    <div className="bg-white dark:bg-gray-900 p-4 md:p-6" style={{ borderTop: `2px solid ${season.accentLight}` }}>
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <span className="text-base">📝</span>
        <span className="font-sans text-[11px] tracking-widest uppercase font-bold" style={{ color: season.accent }}>
          Notes
        </span>
        {rangeStart && (
          <span
            className="text-[10px] font-sans font-semibold rounded-full px-2 py-0.5"
            style={{ background: season.accentLight, color: season.accent }}
          >
            {rangeEnd ? "for selected range" : "for selected date"}
          </span>
        )}
      </div>

      {/* Input */}
      <div className="flex gap-2 mb-4">
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          rows={2}
          className="flex-1 resize-none rounded-xl border border-cal-border dark:border-gray-700 bg-cal-paper dark:bg-gray-800 px-3 py-2.5 text-sm font-sans text-cal-ink dark:text-gray-200 placeholder:text-cal-muted dark:placeholder:text-gray-500 focus:outline-none focus:border-cal-mid dark:focus:border-blue-500 transition-colors"
        />
        <button
          onClick={handleSave}
          disabled={!text.trim()}
          className="self-end rounded-xl px-4 py-2.5 text-sm font-sans font-medium text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed active:scale-95"
          style={{ background: text.trim() ? season.accent : undefined }}
          title="Save (Ctrl+Enter)"
        >
          Save
        </button>
      </div>

      {/* Notes list */}
      <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
        <AnimatePresence initial={false}>
          {notes.length === 0 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xs italic py-2"
              style={{ color: season.accent + "88" }}
            >
              No notes yet. Select a date or range and add one!
            </motion.p>
          )}
          {notes.map((note) => (
            <motion.div
              key={note.id}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: 20, height: 0 }}
              transition={{ duration: 0.2 }}
              className="relative rounded-xl border-l-[3px] px-3 py-2.5 pr-8 group"
              style={{
                borderLeftColor: season.accent,
                background: season.accentLight,
              }}
            >
              <div className="relative">
                <p className="text-[10px] font-sans font-semibold mb-0.5" style={{ color: season.accent + "99" }}>
                  {formatNoteLabel(note)}
                </p>
                <p className="text-sm font-sans whitespace-pre-wrap leading-snug font-medium" style={{ color: season.accent }}>
                  {note.text}
                </p>
              </div>
              <button
                onClick={() => onDeleteNote(note.id)}
                className="absolute top-2 right-2 w-5 h-5 flex items-center justify-center rounded text-cal-muted dark:text-gray-500 opacity-0 group-hover:opacity-100 hover:text-cal-danger transition-all text-sm"
                aria-label="Delete note"
              >
                ×
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
