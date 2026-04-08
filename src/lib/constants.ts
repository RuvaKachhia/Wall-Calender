import { Holiday } from "@/types";

export const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export const DAYS_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const HOLIDAYS: Holiday[] = [
  { month: 0, day: 1, name: "New Year's Day", emoji: "🎆" },
  { month: 0, day: 26, name: "Republic Day", emoji: "🇮🇳" },
  { month: 1, day: 14, name: "Valentine's Day", emoji: "❤️" },
  { month: 2, day: 8, name: "Women's Day", emoji: "💐" },
  { month: 2, day: 17, name: "Holi", emoji: "🎨" },
  { month: 3, day: 1, name: "April Fools'", emoji: "🤡" },
  { month: 3, day: 14, name: "Ambedkar Jayanti", emoji: "🇮🇳" },
  { month: 4, day: 1, name: "Labour Day", emoji: "⚒️" },
  { month: 7, day: 15, name: "Independence Day", emoji: "🇮🇳" },
  { month: 8, day: 5, name: "Teachers' Day", emoji: "📚" },
  { month: 9, day: 2, name: "Gandhi Jayanti", emoji: "🕊️" },
  { month: 9, day: 20, name: "Dussehra", emoji: "🏹" },
  { month: 10, day: 1, name: "Diwali", emoji: "🪔" },
  { month: 11, day: 25, name: "Christmas", emoji: "🎄" },
  { month: 11, day: 31, name: "New Year's Eve", emoji: "🥂" },
];

export const SEASON_CONFIG = [
  // January — deep winter blue
  { name: "Winter", emoji: "❄️", heroFrom: "#1a3a5c", heroMid: "#1f618d", heroTo: "#2e86c1", accent: "#1a5276", accentLight: "#d6eaf8" },
  // February — indigo dusk
  { name: "Winter", emoji: "💙", heroFrom: "#17202a", heroMid: "#2e4482", heroTo: "#4a6fa5", accent: "#1a3a8c", accentLight: "#dce4f5" },
  // March — fresh spring green
  { name: "Spring", emoji: "🌱", heroFrom: "#1e4d2b", heroMid: "#1e8449", heroTo: "#52be80", accent: "#1e6b45", accentLight: "#d5f5e3" },
  // April — blossom teal
  { name: "Spring", emoji: "🌸", heroFrom: "#0e4d3c", heroMid: "#0e7862", heroTo: "#45b39d", accent: "#0e6655", accentLight: "#d1f2eb" },
  // May — golden green
  { name: "Spring", emoji: "🌼", heroFrom: "#1d4510", heroMid: "#28743a", heroTo: "#82c341", accent: "#27682a", accentLight: "#e9f7ef" },
  // June — warm amber summer
  { name: "Summer", emoji: "☀️", heroFrom: "#6e2f08", heroMid: "#d35400", heroTo: "#f39c12", accent: "#784212", accentLight: "#fdebd0" },
  // July — ocean teal
  { name: "Summer", emoji: "🌊", heroFrom: "#0a3d4f", heroMid: "#117a8b", heroTo: "#3498db", accent: "#0e4f6f", accentLight: "#d6eaf8" },
  // August — terracotta sunset
  { name: "Summer", emoji: "🏖️", heroFrom: "#7d3c0a", heroMid: "#ca6f1e", heroTo: "#f0b27a", accent: "#784212", accentLight: "#fdebd0" },
  // September — harvest amber
  { name: "Autumn", emoji: "🍂", heroFrom: "#5c2a0a", heroMid: "#ba4a00", heroTo: "#e59866", accent: "#6e2f1a", accentLight: "#f9e4d4" },
  // October — deep red autumn
  { name: "Autumn", emoji: "🍁", heroFrom: "#641e16", heroMid: "#a93226", heroTo: "#e74c3c", accent: "#922b21", accentLight: "#fadbd8" },
  // November — slate grey
  { name: "Winter", emoji: "🌨️", heroFrom: "#212f3c", heroMid: "#4d6272", heroTo: "#717d7e", accent: "#2c3e50", accentLight: "#d5d8dc" },
  // December — midnight navy
  { name: "Winter", emoji: "☃️", heroFrom: "#0d1b4b", heroMid: "#1a2980", heroTo: "#26415e", accent: "#1a237e", accentLight: "#e8eaf6" },
];

export const MONTHLY_QUOTES = [
  "New year, new beginnings. Make it count.",
  "February whispers of warmth to come.",
  "Bloom where you are planted.",
  "April showers bring May flowers.",
  "Every day in May is a gift.",
  "June — the longest days, the brightest hopes.",
  "Summer is not a season, it's a feeling.",
  "August is the Sunday of summer.",
  "September: the season of fresh starts.",
  "Autumn shows us how beautiful it is to let things go.",
  "November: the month of gratitude.",
  "End the year with grace and begin anew.",
];
