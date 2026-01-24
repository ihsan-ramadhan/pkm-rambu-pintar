"use client";
import { usePathname } from "next/navigation";
import TopNav from "./TopNav";
import BottomNav from "./BottomNav";

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  
  const isFullScreenPage = pathname === "/login" || pathname === "/auth/error";

  if (isFullScreenPage) {
    return <>{children}</>;
  }

  return (
    <>
      <TopNav />
      
      <main className="min-h-screen pb-24 md:pb-10">
        {children}
      </main>

      <div className="md:hidden">
        <BottomNav />
      </div>
    </>
  );
}