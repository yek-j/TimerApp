import type { Metadata } from "next";
import './globals.css'
import LayoutWrapper from "@/components/LayoutWrapper";
import { UserProvider } from "@/contexts/UserContext";
import { TimeProvider } from "@/contexts/TimeContext";

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
            <TimeProvider>
              <LayoutWrapper>
                <main className="flex-1">
                  {children}
                </main>
              </LayoutWrapper>
            </TimeProvider>
          </UserProvider>
        </div>
      </body>
    </html>
  );
}
