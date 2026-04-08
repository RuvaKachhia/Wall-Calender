import { CalendarDate, Holiday } from "@/types";
import { HOLIDAYS } from "./constants";

export function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

export function getFirstDayOfWeek(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

export function toDateKey(d: CalendarDate): string {
  return `${d.year}-${String(d.month).padStart(2, "0")}-${String(d.day).padStart(2, "0")}`;
}

export function dateToObj(date: Date): CalendarDate {
  return { year: date.getFullYear(), month: date.getMonth(), day: date.getDate() };
}

export function compareCalDate(a: CalendarDate, b: CalendarDate): number {
  return new Date(a.year, a.month, a.day).getTime() - new Date(b.year, b.month, b.day).getTime();
}

export function isInRange(date: CalendarDate, start: CalendarDate | null, end: CalendarDate | null): boolean {
  if (!start) return false;
  const t = new Date(date.year, date.month, date.day).getTime();
  const s = new Date(start.year, start.month, start.day).getTime();
  const e = end ? new Date(end.year, end.month, end.day).getTime() : s;
  const lo = Math.min(s, e);
  const hi = Math.max(s, e);
  return t >= lo && t <= hi;
}

export function isRangeEdge(date: CalendarDate, start: CalendarDate | null, end: CalendarDate | null): "start" | "end" | "single" | null {
  if (!start) return null;
  const t = new Date(date.year, date.month, date.day).getTime();
  const s = new Date(start.year, start.month, start.day).getTime();
  if (!end) return t === s ? "single" : null;
  const e = new Date(end.year, end.month, end.day).getTime();
  const lo = Math.min(s, e);
  const hi = Math.max(s, e);
  if (t === lo && t === hi) return "single";
  if (t === lo) return "start";
  if (t === hi) return "end";
  return null;
}

export function isToday(date: CalendarDate): boolean {
  const now = new Date();
  return now.getFullYear() === date.year && now.getMonth() === date.month && now.getDate() === date.day;
}

export function isWeekend(dayOfWeek: number): boolean {
  return dayOfWeek === 0 || dayOfWeek === 6;
}

export function getHoliday(month: number, day: number): Holiday | undefined {
  return HOLIDAYS.find((h) => h.month === month && h.day === day);
}

export function formatRangeLabel(start: CalendarDate, end: CalendarDate | null, months: string[]): string {
  if (!end) return `${months[start.month]} ${start.day}, ${start.year}`;
  const s = new Date(start.year, start.month, start.day);
  const e = new Date(end.year, end.month, end.day);
  const lo = s <= e ? start : end;
  const hi = s <= e ? end : start;
  const diff = Math.round((new Date(hi.year, hi.month, hi.day).getTime() - new Date(lo.year, lo.month, lo.day).getTime()) / 86400000);
  if (lo.month === hi.month && lo.year === hi.year) {
    return `${months[lo.month]} ${lo.day}–${hi.day} (${diff} day${diff !== 1 ? "s" : ""})`;
  }
  return `${months[lo.month]} ${lo.day} → ${months[hi.month]} ${hi.day} (${diff} day${diff !== 1 ? "s" : ""})`;
}

export function generateId(): string {
  return Math.random().toString(36).slice(2, 9);
}
