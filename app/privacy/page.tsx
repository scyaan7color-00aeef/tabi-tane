export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-2xl font-semibold text-[#1a1a1a] mb-10">
        プライバシーポリシー
      </h1>

      <div className="space-y-10">
        <section>
          <h2 className="text-base font-medium text-[#1a1a1a] mb-3">1. 運営者情報</h2>
          <div className="text-sm text-[#666666] leading-relaxed space-y-1">
            <p>運営者: Justeco</p>
            <p>
              お問い合わせ:{" "}
              <a
                href="mailto:2026.justeco@gmail.com"
                className="text-[#2c5f2e] hover:underline"
              >
                2026.justeco@gmail.com
              </a>
            </p>
          </div>
        </section>

        <section className="border-t border-[#e5e5e5] pt-8">
          <h2 className="text-base font-medium text-[#1a1a1a] mb-3">2. 取得する情報</h2>
          <div className="text-sm text-[#666666] leading-relaxed space-y-3">
            <p>
              当サイトは、周辺の飲食店を検索する目的でブラウザの
              Geolocation API を使用し、現在地の緯度・経度を取得します。
            </p>
            <p>
              取得した位置情報はサーバーに送信されず、保存もされません。
              検索クエリの生成にのみ使用され、処理後は破棄されます。
            </p>
          </div>
        </section>

        <section className="border-t border-[#e5e5e5] pt-8">
          <h2 className="text-base font-medium text-[#1a1a1a] mb-3">
            3. ローカルストレージの使用について
          </h2>
          <div className="text-sm text-[#666666] leading-relaxed space-y-3">
            <p>
              当サイトは、お気に入り機能の提供のためにブラウザのローカルストレージを使用します。
            </p>
            <ul className="space-y-1 pl-4 list-disc">
              <li>保存される情報: お気に入りに追加したスポットの名前・カテゴリ・座標</li>
              <li>保存場所: ユーザーのブラウザ内のみ（外部サーバーには送信されません）</li>
              <li>削除方法: ブラウザの設定からローカルストレージをクリアすることで削除できます</li>
            </ul>
          </div>
        </section>

        <section className="border-t border-[#e5e5e5] pt-8">
          <h2 className="text-base font-medium text-[#1a1a1a] mb-3">4. 第三者サービスの利用</h2>
          <div className="text-sm text-[#666666] leading-relaxed space-y-4">
            <div>
              <p className="font-medium text-[#1a1a1a] mb-1">OpenStreetMap</p>
              <p>
                地図の表示および店舗データの取得に OpenStreetMap を使用しています。
                利用にあたっては OpenStreetMap のライセンス (ODbL) に従います。
              </p>
              <a
                href="https://www.openstreetmap.org/copyright"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#2c5f2e] hover:underline break-all"
              >
                https://www.openstreetmap.org/copyright
              </a>
            </div>
            <div>
              <p className="font-medium text-[#1a1a1a] mb-1">Vercel</p>
              <p>
                当サイトのホスティングに Vercel を使用しています。
                アクセス時には Vercel により通常のアクセスログ（IPアドレス等）が記録される場合があります。
                詳細は Vercel のプライバシーポリシーをご参照ください。
              </p>
            </div>
          </div>
        </section>

        <section className="border-t border-[#e5e5e5] pt-8">
          <h2 className="text-base font-medium text-[#1a1a1a] mb-3">5. Cookieの使用について</h2>
          <p className="text-sm text-[#666666] leading-relaxed">
            当サイトでは現在 Cookie を使用していません。
            将来的に Cookie を使用する場合は、本ポリシーを更新してお知らせします。
          </p>
        </section>

        <section className="border-t border-[#e5e5e5] pt-8">
          <h2 className="text-base font-medium text-[#1a1a1a] mb-3">6. 外部リンクについて</h2>
          <p className="text-sm text-[#666666] leading-relaxed">
            当サイトには外部サイトへのリンクが含まれる場合があります。
            リンク先のサイトの内容やプライバシー保護については、当サイトは責任を負いません。
          </p>
        </section>

        <section className="border-t border-[#e5e5e5] pt-8">
          <h2 className="text-base font-medium text-[#1a1a1a] mb-3">7. プライバシーポリシーの変更</h2>
          <p className="text-sm text-[#666666] leading-relaxed">
            本ポリシーは予告なく変更されることがあります。
            変更後の内容は当ページに掲載した時点で効力を持ちます。
            重要な変更がある場合は当サイト上でお知らせします。
          </p>
        </section>

        <section className="border-t border-[#e5e5e5] pt-8">
          <h2 className="text-base font-medium text-[#1a1a1a] mb-3">8. 免責事項</h2>
          <div className="text-sm text-[#666666] leading-relaxed space-y-2">
            <p>
              当サイトに掲載されている店舗情報は OpenStreetMap
              から取得したものであり、実際の営業状況・営業時間・所在地等と
              異なる場合があります。
            </p>
            <p>
              掲載情報の正確性・完全性については保証しません。
              最新情報は各店舗に直接ご確認ください。
            </p>
            <p>
              当サイトの利用により生じたいかなる損害についても、
              当サイトは責任を負いません。
            </p>
          </div>
        </section>
      </div>

      <div className="border-t border-[#e5e5e5] mt-12 pt-6 space-y-1">
        <p className="text-sm text-[#666666]">制定日: 2026年5月6日</p>
        <p className="text-sm text-[#666666]">最終更新日: 2026年5月6日</p>
      </div>
    </div>
  )
}
