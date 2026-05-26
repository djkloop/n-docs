import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CyberTruck AI Docs",
  description: "CyberTruck AI 接入教程与客户端配置文档。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="scroll-smooth">
      <body className="min-h-screen bg-white text-slate-950 antialiased">{children}</body>
    </html>
  );
}
