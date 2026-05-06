import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const noto = Noto_Sans_JP({
  variable: "--font-noto",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Tabi-Tane | 旅と発見の種",
  description: "あなたの近くに、まだ知らないお店が眠っている",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${noto.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-[#fafafa] text-[#1a1a1a] font-sans antialiased">
        <header className="border-b border-[#e5e5e5]">
          <nav className="max-w-3xl mx-auto px-6 h-14 flex items-center justify-between">
            <Link
              href="/"
              className="text-base font-semibold tracking-tight text-[#1a1a1a]"
            >
              Tabi-Tane
            </Link>
            <div className="flex items-center gap-4 sm:gap-6 text-sm text-[#666666]">
              <Link
                href="/"
                className="hidden sm:block hover:text-[#1a1a1a] transition-colors"
              >
                ホーム
              </Link>
              <Link
                href="/discover"
                className="hover:text-[#1a1a1a] transition-colors"
              >
                発見
              </Link>
              <Link
                href="/favorites"
                className="hover:text-[#1a1a1a] transition-colors"
              >
                お気に入り
              </Link>
              <Link
                href="/about"
                className="hidden md:block hover:text-[#1a1a1a] transition-colors"
              >
                このサービスについて
              </Link>
            </div>
          </nav>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="border-t border-[#e5e5e5]">
          <div className="max-w-3xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-sm text-[#666666]">
            <div>
              <p>© 2026 Tabi-Tane. All rights reserved.</p>
              <p className="text-xs mt-1">
                店舗データ提供:{" "}
                <a
                  href="https://www.openstreetmap.org/copyright"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-[#1a1a1a] transition-colors"
                >
                  OpenStreetMap
                </a>{" "}
                contributors
              </p>
              <p className="text-xs">※情報は実際と異なる場合があります</p>
            </div>
            <Link
              href="/privacy"
              className="text-sm hover:text-[#1a1a1a] transition-colors"
            >
              プライバシーポリシー
            </Link>
          </div>
        </footer>
      </body>
    </html>
  );
}
