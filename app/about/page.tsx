export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-2xl font-semibold text-[#1a1a1a] mb-10">
        このサービスについて
      </h1>

      <section className="mb-10 pb-10 border-b border-[#e5e5e5]">
        <h2 className="text-base font-medium text-[#1a1a1a] mb-4">
          Tabi-Tane とは
        </h2>
        <p className="text-[#666666] text-sm leading-relaxed">
          Tabi-Tane（旅たね）は、あなたの現在地から近くの飲食店を発見するサービスです。
          まだ知らないお気に入りの一軒を見つける「旅の種」になることを目指しています。
        </p>
        <p className="mt-4 text-[#666666] text-sm leading-relaxed">
          検索で溢れかえった情報ではなく、その場・その瞬間のあなたに合ったお店との出会いを大切にしています。
          シンプルな操作で、ふらりと立ち寄れる一軒を見つけてください。
        </p>
      </section>

      <section className="mb-10 pb-10 border-b border-[#e5e5e5]">
        <h2 className="text-base font-medium text-[#1a1a1a] mb-4">開発者</h2>
        <p className="text-[#666666] text-sm">Justeco</p>
      </section>

      <section>
        <h2 className="text-base font-medium text-[#1a1a1a] mb-4">
          お問い合わせ
        </h2>
        <a
          href="mailto:2026.justeco@gmail.com"
          className="text-sm text-[#2c5f2e] hover:underline"
        >
          2026.justeco@gmail.com
        </a>
      </section>
    </div>
  )
}
