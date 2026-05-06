'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { type Spot } from '@/lib/fetchSpots'
import { findSpot } from '@/lib/spotCache'
import { addFavorite, removeFavorite, isFavorite } from '@/lib/favorites'

function formatDist(m: number): string {
  return m >= 1000 ? `${(m / 1000).toFixed(1)}km` : `${m}m`
}

export default function SpotPage() {
  const { id } = useParams<{ id: string }>()
  const [spot, setSpot] = useState<Spot | null>(null)
  const [notFound, setNotFound] = useState(false)
  const [favorite, setFavorite] = useState(false)

  useEffect(() => {
    const found = findSpot(id)
    if (found) {
      setSpot(found)
      setFavorite(isFavorite(id))
    } else {
      setNotFound(true)
    }
  }, [id])

  function toggleFavorite() {
    if (!spot) return
    if (favorite) {
      removeFavorite(spot.id)
      setFavorite(false)
    } else {
      addFavorite({
        id: spot.id,
        name: spot.name,
        category: spot.category,
        lat: spot.lat,
        lng: spot.lng,
        addedAt: Date.now(),
      })
      setFavorite(true)
    }
  }

  if (notFound) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-16 text-center">
        <p className="text-sm text-[#666666] mb-4">スポット情報が見つかりませんでした</p>
        <Link href="/discover" className="text-sm text-[#2c5f2e] hover:underline">
          ← 発見ページに戻る
        </Link>
      </div>
    )
  }

  if (!spot) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-16 text-center text-sm text-[#666666]">
        読み込み中...
      </div>
    )
  }

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${spot.lat},${spot.lng}`

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      {/* 戻るボタン */}
      <Link
        href="/discover"
        className="inline-flex items-center gap-1 text-sm text-[#666666] hover:text-[#1a1a1a] transition-colors mb-8"
      >
        ← 発見ページに戻る
      </Link>

      {/* スポット名 */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-[#1a1a1a]">{spot.name}</h1>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2 text-sm text-[#666666]">
          <span>{spot.category}</span>
          {spot.rating > 0 && <span>★ {spot.rating.toFixed(1)}</span>}
          <span>{formatDist(spot.distanceM)}</span>
        </div>
      </div>

      {/* 詳細情報 */}
      <div className="border-t border-[#e5e5e5] divide-y divide-[#e5e5e5]">
        {spot.description && (
          <div className="py-4">
            <p className="text-sm text-[#666666] leading-relaxed">{spot.description}</p>
          </div>
        )}
        {spot.openingHours && (
          <div className="py-4 flex gap-4">
            <span className="text-xs text-[#999999] w-16 shrink-0 pt-0.5">営業時間</span>
            <p className="text-sm text-[#1a1a1a] leading-relaxed">{spot.openingHours}</p>
          </div>
        )}
        {spot.phone && (
          <div className="py-4 flex gap-4 items-center">
            <span className="text-xs text-[#999999] w-16 shrink-0">電話番号</span>
            <a href={`tel:${spot.phone}`} className="text-sm text-[#2c5f2e] hover:underline">
              {spot.phone}
            </a>
          </div>
        )}
      </div>

      {/* アクションボタン */}
      <div className="flex flex-col sm:flex-row gap-3 mt-8">
        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 px-4 py-3 text-sm text-center border border-[#e5e5e5] rounded text-[#1a1a1a] hover:bg-[#f5f5f5] transition-colors"
        >
          Google マップで開く
        </a>
        <button
          onClick={toggleFavorite}
          className={`flex-1 px-4 py-3 text-sm rounded border transition-colors ${
            favorite
              ? 'bg-[#2c5f2e] text-white border-[#2c5f2e] hover:bg-[#245026]'
              : 'border-[#e5e5e5] text-[#1a1a1a] hover:bg-[#f5f5f5]'
          }`}
        >
          {favorite ? '★ お気に入り済み' : '☆ お気に入りに追加'}
        </button>
      </div>

      {/* データソース注意書き */}
      <div className="border-t border-[#e5e5e5] mt-8 pt-4">
        <p className="text-xs text-[#666666]">
          ※このスポット情報はOpenStreetMapから取得しています。
          実際の営業状況・最新情報は店舗に直接ご確認ください。
        </p>
      </div>
    </div>
  )
}
