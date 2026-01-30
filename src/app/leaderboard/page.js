"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import DesktopView from "@/components/leaderboard/DesktopView";
import MobileView from "@/components/leaderboard/MobileView";

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentUserProfile, setCurrentUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      const { data: { session } } = await supabase.auth.getSession();
      const user = session?.user ?? null;
      setCurrentUser(user);

      const { data: topUsers } = await supabase
        .from('profiles')
        .select('id, full_name, avatar_url, xp, level_name')
        .order('xp', { ascending: false })
        .limit(50);

      if (topUsers) setLeaderboard(topUsers);

      if (user) {
         try {
            const { data: profile } = await supabase
            .from('profiles')
            .select('xp, level_name, full_name, avatar_url')
            .eq('id', user.id)
            .single();
            
            if (profile) {
                setCurrentUserProfile(profile);
            }
         } catch (error) {
            console.error("Error fetching profile", error);
         }
      }

      setLoading(false);
    }

    getData();
  }, []);

  return (
    <div>
      <div className="hidden md:block">
        <DesktopView leaderboard={leaderboard} currentUser={currentUser} userProfile={currentUserProfile} loading={loading} />
      </div>
      <div className="md:hidden">
        <MobileView leaderboard={leaderboard} currentUser={currentUser} userProfile={currentUserProfile} loading={loading} />
      </div>
    </div>
  );
}