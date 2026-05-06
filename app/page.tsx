import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-32 min-h-[calc(100vh-7rem)]">
      <div className="text-center max-w-sm">
        <h1 className="text-5xl font-bold tracking-tight text-[#1a1a1a]">
          Tabi-Tane
        </h1>
        <p className="mt-3 text-xl text-[#666666]">旅と発見の種</p>
        <p className="mt-6 text-base text-[#666666] leading-relaxed">
          あなたの近くに、まだ知らないお店が眠っている
        </p>
        <Link
          href="/discover"
          className="mt-10 inline-block px-8 py-3 bg-[#2c5f2e] text-white text-sm font-medium rounded hover:bg-[#245026] transition-colors"
        >
          現在地から探す
        </Link>
      </div>
    </div>
  );
}
