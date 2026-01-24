import "./globals.css";
import ClientLayout from "@/components/ClientLayout";

export const metadata = {
  title: "Rambu Pintar",
  description: "Aplikasi Edukasi Lalu Lintas PKM-PI",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className="bg-gray-50 text-gray-900 antialiased">
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}