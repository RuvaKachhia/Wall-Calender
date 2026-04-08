"use client";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import { CalendarDate } from "@/types";
import { DAYS_SHORT, MONTHS, SEASON_CONFIG } from "@/lib/constants";
import {
  getDaysInMonth,
  getFirstDayOfWeek,
  isInRange,
  isRangeEdge,
  isToday,
  isWeekend,
  getHoliday,
  formatRangeLabel,
} from "@/lib/utils";

interface CalendarGridProps {
  year: number;
  month: number;
  rangeStart: CalendarDate | null;
  rangeEnd: CalendarDate | null;
  hoveredDay: CalendarDate | null;
  animDir: "next" | "prev" | null;
  onDayClick: (date: CalendarDate) => void;
  onDayHover: (date: CalendarDate | null) => void;
  onPrev: () => void;
  onNext: () => void;
  onClearRange: () => void;
  hasNoteOnDay: (date: CalendarDate) => boolean;
}

export default function CalendarGrid({
  year,
  month,
  rangeStart,
  rangeEnd,
  hoveredDay,
  animDir,
  onDayClick,
  onDayHover,
  onPrev,
  onNext,
  onClearRange,
  hasNoteOnDay,
}: CalendarGridProps) {
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfWeek(year, month);
  const season = SEASON_CONFIG[month];
  const effectiveEnd = rangeEnd ?? hoveredDay;
  const rangeLabel = rangeStart
    ? formatRangeLabel(rangeStart, rangeEnd, MONTHS)
    : null;

  const variants = {
    enter: (dir: string) => ({ x: dir === "next" ? 60 : -60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: string) => ({ x: dir === "next" ? -60 : 60, opacity: 0 }),
  };

  return (
    <div className="flex flex-col p-4 md:p-6 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex-1">
      {/* Nav row */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={onPrev}
          className="w-9 h-9 flex items-center justify-center rounded-xl border text-lg font-bold transition-all active:scale-95"
          style={{
            borderColor: season.accent + "44",
            color: season.accent,
            background: season.accentLight,
          }}
          aria-label="Previous month"
        >
          ‹
        </button>
        <div className="text-center">
          <span
            className="font-display font-bold text-xl"
            style={{ color: season.accent }}
          >
            {MONTHS[month]}
          </span>
          <span className="font-sans text-sm ml-2 font-medium text-gray-400 dark:text-gray-500">
            {year}
          </span>
        </div>
        <button
          onClick={onNext}
          className="w-9 h-9 flex items-center justify-center rounded-xl border text-lg font-bold transition-all active:scale-95"
          style={{
            borderColor: season.accent + "44",
            color: season.accent,
            background: season.accentLight,
          }}
          aria-label="Next month"
        >
          ›
        </button>
      </div>

      {/* Range badge */}
      <AnimatePresence>
        {rangeLabel && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-3 overflow-hidden"
          >
            <div
              className="flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold w-fit border"
              style={{
                background: season.accentLight,
                color: season.accent,
                borderColor: season.accent + "33",
              }}
            >
              <span>📅 {rangeLabel}</span>
              <button
                onClick={onClearRange}
                className="ml-1 hover:opacity-70 text-sm leading-none font-bold"
                aria-label="Clear range"
              >
                ×
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Day headers */}
      <div className="grid grid-cols-7 mb-2">
        {DAYS_SHORT.map((d, i) => (
          <div
            key={d}
            className="text-center text-[10px] font-sans font-bold tracking-widest uppercase py-1"
            style={{
              color: i === 0 || i === 6 ? "#c0392b" : season.accent + "aa",
            }}
          >
            {d}
          </div>
        ))}
      </div>

      {/* Days grid — animated */}
      <AnimatePresence mode="wait" custom={animDir}>
        <motion.div
          key={`${year}-${month}`}
          custom={animDir}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.32, ease: "easeInOut" }}
          className="grid grid-cols-7 gap-y-1 gap-x-0.5 flex-1"
        >
          {/* Empty cells */}
          {Array.from({ length: firstDay }).map((_, i) => (
            <div key={`empty-${i}`} />
          ))}

          {/* Day cells */}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const date: CalendarDate = { year, month, day };
            const dow = new Date(year, month, day).getDay();
            const edge = isRangeEdge(date, rangeStart, effectiveEnd);
            const inRange = isInRange(date, rangeStart, effectiveEnd);
            const today = isToday(date);
            const weekend = isWeekend(dow);
            const holiday = getHoliday(month, day);
            const hasNote = hasNoteOnDay(date);
            const isEdge =
              edge === "start" || edge === "end" || edge === "single";

            return (
              <motion.button
                key={day}
                whileHover={{ scale: isEdge ? 1 : 1.12 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => onDayClick(date)}
                onMouseEnter={() => onDayHover(date)}
                onMouseLeave={() => onDayHover(null)}
                className={clsx(
                  "relative flex flex-col items-center justify-center rounded-lg text-[13px] font-sans h-9 transition-colors select-none cursor-pointer font-medium",
                  inRange && !isEdge && "rounded-none",
                )}
                style={{
                  background: isEdge
                    ? season.accent
                    : inRange
                      ? season.accentLight
                      : today
                        ? season.accentLight + "88"
                        : undefined,

                  color: isEdge
                    ? "#ffffff"
                    : inRange
                      ? season.accent
                      : today
                        ? season.accent
                        : weekend
                          ? "#c0392b"
                          : "inherit",
                  outline:
                    today && !isEdge
                      ? `2px solid ${season.accent}55`
                      : undefined,
                  outlineOffset: today && !isEdge ? "1px" : undefined,
                }}
                aria-label={`${MONTHS[month]} ${day}${holiday ? ", " + holiday.name : ""}`}
              >
                <span className={clsx(today && !isEdge && "font-bold")}>
                  {day}
                </span>

                {/* Holiday emoji */}
                {holiday && (
                  <span
                    className="absolute -top-1.5 -right-0.5 text-[9px] leading-none"
                    title={holiday.name}
                  >
                    {holiday.emoji}
                  </span>
                )}
                {/* Note dot */}
                {hasNote && (
                  <span
                    className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                    style={{
                      background: isEdge
                        ? "rgba(255,255,255,0.9)"
                        : season.accent,
                    }}
                  />
                )}
              </motion.button>
            );
          })}
        </motion.div>
      </AnimatePresence>

      {/* Legend */}
      <div
        className="mt-3 pt-3 border-t flex flex-wrap gap-x-4 gap-y-1"
        style={{ borderColor: season.accent + "22" }}
      >
        {[
          { color: season.accent + "55", label: "Today", shape: "ring" },
          { color: season.accent, label: "Selected" },
          { color: "#c0392b", label: "Weekend", text: true },
          { emoji: "🎉", label: "Holiday" },
        ].map(({ color, label, text, emoji, shape }) => (
          <span
            key={label}
            className="flex items-center gap-1 text-[10px] font-sans font-medium text-gray-500 dark:text-gray-400"
          >
            {emoji ? (
              <span className="text-[11px]">{emoji}</span>
            ) : text ? (
              <span style={{ color, fontSize: 12 }}>●</span>
            ) : (
              <span
                className="w-2.5 h-2.5 rounded-sm inline-block"
                style={{ background: color }}
              />
            )}
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}
