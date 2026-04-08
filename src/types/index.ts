export interface CalendarDate {
  year: number;
  month: number;
  day: number;
}

export interface Note {
  id: string;
  text: string;
  createdAt: string;
  rangeStart?: CalendarDate;
  rangeEnd?: CalendarDate;
}

export interface Holiday {
  month: number;
  day: number;
  name: string;
  emoji: string;
}

export type Theme = "light" | "dark";

export type AnimationDirection = "next" | "prev" | null;
