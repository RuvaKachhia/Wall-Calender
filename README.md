# Wall Calendar

A polished, interactive wall calendar built with **Next.js 14**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**.

---

## ✨ Features

| Feature | Details |
|---|---|
| Wall Calendar Aesthetic | Seasonal hero panel with gradient that changes every month |
| Day Range Selector | Click start → hover preview → click end. Visual states for start, end, in-between |
| Notes | Add notes per date, per range, or monthly. Persisted via localStorage |
| Dark / Light Mode | Toggle with one click. Persisted across sessions |
| Holiday Markers | Indian public holidays + global holidays with emoji badges |
| Fully Responsive | Side-by-side on desktop, stacked on mobile |
| Page-flip Animation | Smooth slide animation when navigating months (Framer Motion) |
| Keyboard Shortcut | Ctrl+Enter / Cmd+Enter to save notes |

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# 1. Clone the repo
cd wall-calendar

# 2. Install dependencies
npm install

# 3. Run dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---



## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with font + metadata
│   ├── page.tsx            # Main page
│   └── globals.css         # Global styles + Google Fonts
├── components/
│   ├── WallCalendar.tsx    # Root component — assembles all panels
│   ├── HeroPanel.tsx       # Seasonal gradient hero with month/quote
│   ├── CalendarGrid.tsx    # Date grid with range selection + holidays
│   ├── NotesPanel.tsx      # Notes input and list
│   ├── SpiralBinding.tsx   # Decorative rings at top
│   └── ThemeToggle.tsx     # Light/dark toggle button
├── hooks/
│   └── useCalendar.ts      # All state management (range, notes, theme, navigation)
├── lib/
│   ├── constants.ts        # Months, holidays, seasons, quotes
│   └── utils.ts            # Pure date helper functions
└── types/
    └── index.ts            # TypeScript interfaces
```

---

## 🎨 Design Decisions

- **Seasonal gradients**: Each month maps to a seasonal color theme (winter blues, spring greens, summer ambers, autumn reds). The hero panel gradient updates automatically.
- **No external image dependency**: Hero visuals are pure CSS gradients — zero loading time, works offline.
- **Framer Motion for navigation**: Month transitions use a slide animation with `AnimatePresence` — looks polished without being distracting.
- **localStorage persistence**: Notes and theme survive page refresh — no backend needed.
- **Playfair Display + DM Sans**: A serif/sans pairing that gives the calendar a premium, editorial feel matching the physical wall calendar aesthetic.

---

## How to Use

1. **Navigate months** — use ‹ › arrows
2. **Select a date range** — click a start date, then click an end date. Hover to preview.
3. **Clear selection** — click the × on the range badge
4. **Add a note** — type in the notes box and click Save (or Ctrl+Enter)
5. **Delete a note** — hover a note and click ×
6. **Toggle theme** — click 🌙/☀️ in the top-right of the hero panel
