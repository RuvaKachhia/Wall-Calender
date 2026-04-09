# Wall Calendar

A polished, interactive wall calendar built with **Next.js 14**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**.


##  Features

| Feature | Details |

| Wall Calendar Aesthetic with Seasonal panel with gradient that changes every month |
| Day Range Selector | Click start → hover preview → click end. Visual states for start, end, in-between |
| Notes to add notes per date, per range, or monthly|
| Dark and Light Mode which toggle with one click |
| Holiday Markers represents Indian public holidays and global holidays with emoji badges |
| Fully Responsive which is side by side on desktop, stacked on mobile |
| Page flip Animation with smooth slide animation when navigating months |
| Keyboard Shortcut is also added - Ctrl+Enter / Cmd+Enter to save notes |



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

Open http://localhost:3000 in browser.

---



## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with font and metadata
│   ├── page.tsx            # Main page
│   └── globals.css         # Global styles and Google Fonts
├── components/
│   ├── WallCalendar.tsx    # Root component — assembles all panels
│   ├── HeroPanel.tsx       # Seasonal gradient hero with month quote
│   ├── CalendarGrid.tsx    # Date grid with range selection and holidays
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


## How to Use

1. **Navigate months** — use ‹ › arrows
2. **Select a date range** — click a start date, then click an end date. Hover to preview.
3. **Clear selection** — click the × on the range badge
4. **Add a note** — type in the notes box and click Save (or Ctrl+Enter)
5. **Delete a note** — hover a note and click ×
6. **Toggle theme** — click 🌙/☀️ in the top right of the hero panel

