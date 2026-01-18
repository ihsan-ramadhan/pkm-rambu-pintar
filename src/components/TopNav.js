"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { User } from "lucide-react";

export default function TopNav() {
  const pathname = usePathname();

  const navLinkClass = (path) =>
    `text-sm font-medium transition-colors hover:text-primary ${
      pathname === path ? "text-primary font-bold" : "text-gray-500"
    }`;

  return (
    <nav className="hidden md:block sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-6 h-16 flex justify-between items-center">
        
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold shadow-blue-200 shadow-md">
            R
          </div>
          <span className="font-bold text-xl text-gray-900 tracking-tight">RambuPintar</span>
        </div>

        <div className="flex items-center gap-8">
          <Link href="/" className={navLinkClass("/")}>Beranda</Link>
          <Link href="/peta" className={navLinkClass("/peta")}>Peta</Link>
          <Link href="/koleksi" className={navLinkClass("/koleksi")}>Koleksi</Link>
          <Link href="/leaderboard" className={navLinkClass("/leaderboard")}>Peringkat</Link>
        </div>

        <div className="flex items-center gap-4">
          <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center border border-gray-200">
             <User size={16} className="text-gray-600" />
          </div>
        </div>

      </div>
    </nav>
  );
}