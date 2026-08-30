import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "안티그래비티 (Anti-Scam Reply Generator) - 사기꾼 시간 낭비 AI",
  description: "로맨스 스캠 및 투자 사기꾼의 시간을 최대한 낭비하게 만드는 방어형 AI 답변 생성기",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased bg-[#0a0f1d] text-slate-100 min-h-screen selection:bg-purple-500/30 selection:text-purple-200">
        {children}
      </body>
    </html>
  );
}
