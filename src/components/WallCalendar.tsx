"use client";
import { useCalendar } from "@/hooks/useCalendar";
import SpiralBinding from "./SpiralBinding";
import HeroPanel from "./HeroPanel";
import CalendarGrid from "./CalendarGrid";
import NotesPanel from "./NotesPanel";
import ThemeToggle from "./ThemeToggle";

export default function WallCalendar() {
  const {
    year, month, rangeStart, rangeEnd, hoveredDay, notes, theme, animDir,
    setHoveredDay, navigateMonth, handleDayClick, clearRange,
    addNote, deleteNote, toggleTheme, getNotesForDate, formatNoteLabel,
  } = useCalendar();

  const hasNoteOnDay = (date: { year: number; month: number; day: number }) =>
    getNotesForDate(date).length > 0;

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Calendar card with drop shadow */}
      <div className="rounded-2xl overflow-hidden shadow-2xl dark:shadow-black/50 border border-cal-border dark:border-gray-700">
        {/* Spiral rings */}
        <SpiralBinding />

        {/* Main body */}
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left — Hero */}
          <div className="relative">
            <ThemeToggle theme={theme} onToggle={toggleTheme} />
            <HeroPanel month={month} year={year} />
          </div>

          {/* Right — Calendar Grid */}
          <CalendarGrid
            year={year}
            month={month}
            rangeStart={rangeStart}
            rangeEnd={rangeEnd}
            hoveredDay={hoveredDay}
            animDir={animDir}
            onDayClick={handleDayClick}
            onDayHover={(d) => setHoveredDay(d)}
            onPrev={() => navigateMonth("prev")}
            onNext={() => navigateMonth("next")}
            onClearRange={clearRange}
            hasNoteOnDay={hasNoteOnDay}
          />
        </div>

        {/* Notes panel — full width below */}
        <NotesPanel
          notes={notes}
          rangeStart={rangeStart}
          rangeEnd={rangeEnd}
          month={month}
          onAddNote={addNote}
          onDeleteNote={deleteNote}
          formatNoteLabel={formatNoteLabel}
        />
      </div>

      {/* Instructions */}
      <p className="text-center text-xs text-cal-muted dark:text-gray-500 mt-4 font-sans">
        Click to select start date · Click again to set end date · Ctrl+Enter to save note
      </p>
    </div>
  );
}
