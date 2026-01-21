"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, LogIn } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function TopNav() {
  const pathname = usePathname();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getUser() {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setLoading(false);
    }
    getUser();
  }, []);

  const isLoggedIn = !!user;
  const name = isLoggedIn ? user.user_metadata.full_name : "Tamu";
  const avatar = isLoggedIn ? user.user_metadata.avatar_url : null;
  const initial = name.charAt(0).toUpperCase();
  const levelText = isLoggedIn ? "Level 5 Explorer" : "Level 1 Pemula";

  const navLinkClass = (path) =>
    `text-sm font-medium transition-colors hover:text-primary ${
      pathname === path ? "text-primary font-bold" : "text-gray-500"
    }`;

  return (
    <nav className="hidden md:block sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="w-full px-6 md:px-10 h-16 flex justify-between items-center">
        
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
            {loading ? (
                <div className="flex items-center gap-3 opacity-50">
                    <div className="h-3 w-20 bg-gray-200 rounded animate-pulse"></div>
                    <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
                </div>
            ) : isLoggedIn ? (
                <div className="flex items-center gap-3 cursor-pointer">
                    <div className="flex flex-col items-end mr-1">
                        <span className="text-xs font-bold text-gray-700">{name}</span>
                        <span className="text-[10px] text-gray-400">{levelText}</span>
                    </div>
                    <div className="w-10 h-10 rounded-full border border-gray-200 overflow-hidden relative shadow-sm">
                       {avatar ? (
                           <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
                       ) : (
                           <div className="w-full h-full bg-accent flex items-center justify-center text-yellow-900 font-bold">
                               {initial}
                           </div>
                       )}
                    </div>
                </div>
            ) : (
                <Link href="/login" className="flex items-center gap-3 group hover:opacity-80 transition cursor-pointer">
                    <div className="flex flex-col items-end mr-1">
                        <span className="text-xs font-bold text-gray-700">Tamu</span>
                        <span className="text-[10px] text-primary font-bold flex items-center gap-1 bg-blue-50 px-2 py-0.5 rounded-full">
                           Masuk <LogIn size={10} />
                        </span>
                    </div>
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center border border-gray-200 text-gray-400 group-hover:bg-primary group-hover:text-white transition-colors shadow-sm">
                        <User size={20} />
                    </div>
                </Link>
            )}
        </div>

      </div>
    </nav>
  );
}