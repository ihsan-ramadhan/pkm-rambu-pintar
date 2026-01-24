"use client";
import { supabase } from "@/lib/supabaseClient";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    const redirectTo = typeof window !== 'undefined' 
      ? `${window.location.origin}/auth/callback` 
      : 'http://localhost:3000/auth/callback';

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo },
    });

    if (error) {
      alert(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="h-screen overflow-hidden flex items-center justify-center bg-gray-50 px-6 relative">
      
      <Link 
        href="/" 
        className="absolute top-6 left-6 md:top-8 md:left-8 p-3 bg-white rounded-full text-gray-400 hover:text-primary hover:bg-blue-50 transition shadow-sm border border-gray-100 group z-10"
      >
        <ArrowLeft size={20} className="group-hover:transition-transform" />
      </Link>

      <div className="w-full max-w-sm bg-white p-8 rounded-3xl shadow-xl border border-gray-100 text-center relative z-0">
        
        <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-white font-bold text-3xl mx-auto mb-6 shadow-blue-200 shadow-lg transform rotate-3">
          R
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">Selamat Datang!</h1>
        <p className="text-gray-500 text-sm mb-8 leading-relaxed">
          Masuk untuk mulai mengumpulkan poin dan menjelajah rambu.
        </p>

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-bold py-3.5 px-4 rounded-xl transition duration-200 group active:scale-95 cursor-pointer disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? (
             <span className="text-gray-400 text-sm">Menghubungkan...</span>
          ) : (
            <>
              <div className="w-5 h-5 relative">
                 <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-full h-full" />
              </div>
              <span className="group-hover:text-gray-900 transition-colors">Masuk dengan Google</span>
            </>
          )}
        </button>

        <p className="mt-8 text-[10px] text-gray-400">
          Dengan masuk, kamu menyetujui Aturan PKM & Kebijakan Privasi.
        </p>
      </div>
    </div>
  );
}