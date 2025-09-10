import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Auth.js Demo",
  description:
    "Auth.js Demo – featuring MFA, forgot password, RBAC, and more advanced authentication features.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="min-h-screen w-full bg-white relative">
          {/* White Sphere Grid Background */}
          <div
            className="absolute inset-0 z-0"
            style={{
              background: "white",
              backgroundImage: `
          linear-gradient(to right, rgba(71,85,105,0.3) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(71,85,105,0.3) 1px, transparent 1px),
          radial-gradient(circle at 50% 50%, rgba(139,92,246,0.25) 0%, rgba(139,92,246,0.1) 40%, transparent 80%)
        `,
              backgroundSize: "32px 32px, 32px 32px, 100% 100%",
            }}
          />
          <main className="relative flex justify-center items-center w-screen h-svh md:w-screen md:h-screen ">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
