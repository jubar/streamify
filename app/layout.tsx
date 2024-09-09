import Sidebar from "@/components/ui/sidebar";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Streamify - Tune in. Vibe out.",
  description:
    "Tune in. Vibe out with the next-generation audio streaming app that brings music, podcasts, and live audio content to your fingertips. Experience high-quality sound, personalized playlists, and seamless streaming across devices. Discover new artists, explore curated genres, and enjoy a vibrant community of music lovers. With intuitive controls, offline playback, and advanced audio recommendations, this app is designed for true music enthusiasts. Whether you’re vibing to the latest hits or diving into indie gems, this platform offers endless listening possibilities.",
  applicationName: "Streamify",
  authors: { name: "Julio Barrios", url: "https://github.com/jubar" },
  generator: "Next.js, React, TypeScript, Tailwind CSS, NextUI, Prisma",
  keywords: [
    "audio streaming",
    "music app",
    "music discovery",
    "personalized playlists",
    "audio recommendations",
    "offline playback",
    "community",
    "react",
    "server components",
    "next.js",
    "tailwindcss",
    "nextui",
    "prismajs",
    "typescript",
  ],
  category: "Music & Audio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`overflow-hidden ${inter.className}`}>
        <main className="flex flex-1 h-screen w-full p-0 overflow-hidden">
          <Sidebar />
          <div className="border-l-[1px] border-l-pink-200 w-full min-h-screen overflow-y-auto bg-gradient-to-tl from-violet-200 to-pink-100 dark:from-zinc-900 dark:to-zinc-800">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
