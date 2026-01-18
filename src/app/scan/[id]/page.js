"use client";
import { useEffect, useState, use } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import { ChevronLeft, Share2, AlertTriangle } from "lucide-react";
import dynamic from "next/dynamic";

const DotLottieReact = dynamic(
  () => import("@lottiefiles/dotlottie-react").then((mod) => mod.DotLottieReact),
  { ssr: false }
);

export default function HalamanScan({ params }) {
  const { id } = use(params);
  const [rambu, setRambu] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase
        .from("traffic_signs")
        .select("*")
        .eq("id", id)
        .single();
      
      if (data) setRambu(data);
      setLoading(false);
    }
    fetchData();
  }, [id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-primary text-white">Memuat Data...</div>;

  if (!rambu) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6 text-center">
      <AlertTriangle size={48} className="text-red-500 mb-4" />
      <h2 className="text-xl font-bold text-gray-800">Rambu Tidak Ditemukan</h2>
      <Link href="/" className="mt-4 text-primary font-bold">Kembali ke Home</Link>
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pb-20">
      <div className="w-full max-w-md mx-auto bg-white min-h-screen shadow-2xl relative">
        
        <div className="bg-primary px-6 pt-8 pb-24 rounded-b-[2.5rem] shadow-lg relative z-10">
          <div className="flex justify-between items-center text-white mb-4">
            <Link href="/" className="bg-white/20 p-2 rounded-full backdrop-blur-sm hover:bg-white/30 transition">
              <ChevronLeft size={24} />
            </Link>
            <h1 className="font-bold text-lg tracking-wide">Detail Rambu</h1>
            <button className="bg-white/20 p-2 rounded-full backdrop-blur-sm hover:bg-white/30 transition">
              <Share2 size={20} />
            </button>
          </div>
          <div className="text-center mt-4">
            <h2 className="text-3xl font-bold text-white drop-shadow-md">{rambu.name}</h2>
            <p className="text-blue-100 text-sm mt-1 opacity-90">Kategori: {rambu.category || "Umum"}</p>
          </div>
        </div>

        <div className="px-6 -mt-16 relative z-20">
          <div className="bg-white rounded-3xl shadow-xl p-4 border-4 border-white mx-auto w-full aspect-square flex items-center justify-center overflow-hidden relative group">
            
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-50 to-white opacity-50"></div>
            
            <div className="w-full h-full relative z-10 transform group-hover:scale-105 transition duration-500">
               <DotLottieReact
                  src={rambu.animation_url} 
                  loop
                  autoplay
                  className="w-full h-full"
               />
            </div>

          </div>
        </div>

        <div className="p-6 text-center text-gray-400 text-sm">
          Deskripsi & Gamifikasi (Tahap 3)
        </div>

      </div>
    </div>
  );
}