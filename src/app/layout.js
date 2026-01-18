import "./globals.css";
import BottomNav from "@/components/BottomNav";
import TopNav from "@/components/TopNav";

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className="bg-gray-50 text-gray-900">
        
        <TopNav />

        <main className="min-h-screen pb-24 md:pb-10">
          {children}
        </main>

        <div className="md:hidden">
            <BottomNav />
        </div>

      </body>
    </html>
  );
}