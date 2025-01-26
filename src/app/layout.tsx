import type { Metadata } from "next";
import './globals.css'
import LayoutWrapper from "@/components/LayoutWrapper";
import { UserProvider } from "@/contexts/UserContext";

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
        <div className="">
          <UserProvider>
            <LayoutWrapper>
              <main className="flex-1">
                {children}
              </main>
            </LayoutWrapper>
          </UserProvider>
        </div>
      </body>
    </html>
  );
}
