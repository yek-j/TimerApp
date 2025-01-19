import type { Metadata } from "next";
import './globals.css'
import Sidebar from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "Timer",
  description: "Timer app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen bg-gray-50">
          <Sidebar/>
          <main className="flex-1">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
