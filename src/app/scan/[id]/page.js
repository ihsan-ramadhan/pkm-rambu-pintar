"use client";
import { use } from "react";
import Link from "next/link";
import { ChevronLeft, Share2 } from "lucide-react";

export default function HalamanScan({ params }) {
  const { id } = use(params);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pb-20">
      <div className="w-full max-w-md mx-auto bg-white min-h-screen shadow-2xl relative">
        
        <div className="bg-primary px-6 pt-8 pb-20 rounded-b-[2.5rem] shadow-lg relative z-10">
          <div className="flex justify-between items-center text-white mb-4">
            <Link href="/" className="bg-white/20 p-2 rounded-full backdrop-blur-sm hover:bg-white/30 transition">
              <ChevronLeft size={24} />
            </Link>
            <h1 className="font-bold text-lg tracking-wide">Detail Rambu</h1>
            <button className="bg-white/20 p-2 rounded-full backdrop-blur-sm hover:bg-white/30 transition">
              <Share2 size={20} />
            </button>
          </div>
          
          <div className="text-center mt-2">
            <span className="bg-blue-800/50 text-blue-100 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-blue-400/30">
              Hasil Scan
            </span>
            <h2 className="text-2xl font-bold text-white mt-2 capitalize">
              {id.replace(/-/g, " ")} 🚫
            </h2>
          </div>
        </div>

        <div className="px-6 -mt-12 relative z-20">
          <div className="bg-white rounded-3xl shadow-xl p-8 min-h-[300px] flex items-center justify-center border border-gray-100">
          </div>
        </div>

      </div>
    </div>
  );
}