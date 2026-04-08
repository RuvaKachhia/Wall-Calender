export default function SpiralBinding() {
  return (
    <div className="flex items-center justify-center gap-2.5 py-2.5 bg-gray-100 dark:bg-gray-800 border-b border-cal-border dark:border-gray-700">
      {Array.from({ length: 14 }).map((_, i) => (
        <div
          key={i}
          className="w-4 h-4 rounded-full border-2 border-gray-400 dark:border-gray-500 bg-white dark:bg-gray-700 shadow-inner flex-shrink-0"
        />
      ))}
    </div>
  );
}
