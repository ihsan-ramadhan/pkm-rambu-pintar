"use client";
import { Trophy, Medal, Crown, Loader2, Star } from "lucide-react";

export default function MobileView({ leaderboard, currentUser, userProfile, loading }) {
  const getInitial = (name) => (name ? name.charAt(0).toUpperCase() : "?");

  const renderRankIcon = (index) => {
    if (index === 0) return <Crown size={20} className="text-yellow-400 fill-yellow-400" />;
    if (index === 1) return <Medal size={20} className="text-gray-300 fill-gray-300" />;
    if (index === 2) return <Medal size={20} className="text-orange-400 fill-orange-400" />;
    return <span className="font-bold text-gray-500 w-6 text-center text-xs">{index + 1}</span>;
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-6rem)] bg-white">
        <Loader2 className="animate-spin text-primary mb-2" size={32} />
        <p className="text-gray-500 text-sm">Memuat data...</p>
      </div>
    );
  }

  // Find current user's rank
  const userRankIndex = leaderboard.findIndex(u => u.id === currentUser?.id);
  const userRank = userRankIndex !== -1 ? userRankIndex + 1 : "-";
  const userXP = userProfile?.xp ?? (leaderboard[userRankIndex]?.xp || 0);

  return (
    <div className="w-full bg-white min-h-[calc(100vh-6rem)] relative">
        
        {/* Blue Curved Header */}
        <div className="bg-primary text-white p-6 rounded-b-[2.5rem] shadow-lg pb-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-2xl"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4 opacity-90">
                <Trophy size={18} className="text-yellow-300" />
                <span className="text-sm font-medium tracking-wide">Hall of Fame</span>
            </div>
            
            <h1 className="text-2xl font-bold mb-6">Peringkat Global</h1>
            
            {/* Current User Stats Summary */}
            {currentUser && (
               <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                     <div className="w-10 h-10 rounded-full border-2 border-white/30 overflow-hidden bg-white/10">
                        {currentUser.user_metadata?.avatar_url ? (
                           <img src={currentUser.user_metadata.avatar_url} alt="Me" className="w-full h-full object-cover" />
                        ) : (
                           <div className="w-full h-full flex items-center justify-center text-white font-bold">
                              {getInitial(currentUser.user_metadata?.full_name)}
                           </div>
                        )}
                     </div>
                     <div>
                        <p className="text-xs text-blue-100">Peringkat Kamu</p>
                        <p className="font-bold text-lg">#{userRank}</p>
                     </div>
                  </div>
                  <div className="text-right">
                      <p className="text-xs text-blue-100">Total Poin</p>
                      <div className="flex items-center justify-end gap-1">
                         <Star size={12} className="text-yellow-300 fill-yellow-300" />
                         <p className="font-bold text-lg">{userXP.toLocaleString()}</p>
                      </div>
                  </div>
               </div>
            )}
          </div>
        </div>

        {/* Leaderboard List */}
        <div className="px-5 -mt-6 relative z-20 pb-10">
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden min-h-[300px]">
                <div className="p-4 border-b border-gray-100 bg-gray-50/80">
                   <h3 className="font-bold text-gray-800 text-sm">Top 50 pengguna</h3>
                </div>
                
                <div className="divide-y divide-gray-50">
                   {leaderboard.length > 0 ? (
                      leaderboard.map((u, index) => {
                         const isMe = currentUser?.id === u.id;
                         return (
                            <div key={u.id} className={`flex items-center justify-between p-4 ${isMe ? 'bg-blue-50' : ''}`}>
                               <div className="flex items-center gap-3">
                                  <div className="w-6 flex justify-center flex-shrink-0">
                                     {renderRankIcon(index)}
                                  </div>
                                  
                                  <div className="w-9 h-9 rounded-full bg-gray-100 overflow-hidden flex-shrink-0 border border-gray-100">
                                     {u.avatar_url ? (
                                        <img src={u.avatar_url} alt={u.full_name} className="w-full h-full object-cover" />
                                     ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs font-bold">
                                           {getInitial(u.full_name)}
                                        </div>
                                     )}
                                  </div>
                                  
                                  <div className="flex flex-col">
                                     <span className={`text-sm ${isMe ? 'font-bold text-primary' : 'font-medium text-gray-800'} truncate max-w-[120px]`}>
                                        {u.full_name || "Tanpa Nama"}
                                     </span>
                                     <span className="text-[10px] text-gray-400">{u.level_name || "Pemula"}</span>
                                  </div>
                               </div>
                               
                               <div className="font-bold text-sm text-orange-600">
                                  {u.xp.toLocaleString()}
                               </div>
                            </div>
                         )
                      })
                   ) : (
                      <div className="text-center py-10 px-4">
                         <p className="text-gray-400 text-xs">Belum ada data.</p>
                      </div>
                   )}
                </div>
            </div>
        </div>
    </div>
  );
}
