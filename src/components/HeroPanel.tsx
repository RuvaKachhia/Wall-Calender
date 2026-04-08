"use client";
import { motion } from "framer-motion";
import { MONTHS, MONTHLY_QUOTES, SEASON_CONFIG } from "@/lib/constants";

interface HeroPanelProps {
  month: number;
  year: number;
}

export default function HeroPanel({ month, year }: HeroPanelProps) {
  const season = SEASON_CONFIG[month];
  const quote = MONTHLY_QUOTES[month];

  return (
    <div
      className="relative flex flex-col justify-end overflow-hidden min-h-[220px] md:min-h-[360px]"
      style={{ background: `linear-gradient(145deg, ${season.heroFrom}, ${season.heroMid}, ${season.heroTo})` }}
    >
      {/* Dark scrim — ensures text always readable */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/10" />

      {/* Decorative geometry */}
      <div
        className="absolute top-[-60px] right-[-60px] w-64 h-64 rounded-full opacity-20"
        style={{ background: season.heroTo }}
      />
      <div
        className="absolute top-[10px] right-[10px] w-32 h-32 rounded-full opacity-15"
        style={{ background: season.heroFrom }}
      />
      <div
        className="absolute top-[30%] left-[-30px] w-40 h-40 rounded-full opacity-10"
        style={{ background: "white" }}
      />
      {/* Bottom accent bar */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1 opacity-60"
        style={{ background: `linear-gradient(90deg, ${season.heroTo}, transparent)` }}
      />

      {/* Season badge — top left */}
      <div className="absolute top-5 left-5 z-10">
        <motion.div
          key={`season-${month}`}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="flex items-center gap-1.5 rounded-full px-3 py-1"
          style={{ background: "rgba(255,255,255,0.22)", backdropFilter: "blur(8px)" }}
        >
          <span className="text-sm leading-none">{season.emoji}</span>
          <span className="text-white text-[10px] font-sans font-semibold tracking-widest uppercase drop-shadow">
            {season.name}
          </span>
        </motion.div>
      </div>

      {/* Main content — always on dark scrim, always white */}
      <div className="relative z-10 p-6 md:p-8">
        <motion.div
          key={`month-${month}-${year}`}
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <p
            className="font-sans text-xs tracking-[0.2em] uppercase mb-1 font-medium"
            style={{ color: "rgba(255,255,255,0.75)", textShadow: "0 1px 4px rgba(0,0,0,0.4)" }}
          >
            {year}
          </p>
          <h2
            className="font-display text-4xl md:text-5xl font-bold leading-none tracking-tight"
            style={{ color: "#ffffff", textShadow: "0 2px 12px rgba(0,0,0,0.35)" }}
          >
            {MONTHS[month]}
          </h2>
        </motion.div>

        {/* Divider */}
        <div className="w-10 h-0.5 my-4 rounded-full" style={{ background: "rgba(255,255,255,0.5)" }} />

        {/* Quote */}
        <motion.p
          key={`quote-${month}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25, duration: 0.5 }}
          className="font-display italic text-sm md:text-base leading-relaxed max-w-[190px]"
          style={{ color: "rgba(255,255,255,0.88)", textShadow: "0 1px 6px rgba(0,0,0,0.3)" }}
        >
          &ldquo;{quote}&rdquo;
        </motion.p>
      </div>
    </div>
  );
}
