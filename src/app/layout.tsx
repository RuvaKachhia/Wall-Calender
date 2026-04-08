import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Wall Calendar",
  description: "Interactive wall calendar with range selection and notes",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-cal-paper dark:bg-gray-950 min-h-screen transition-colors duration-300">
        {children}
      </body>
    </html>
  );
}
