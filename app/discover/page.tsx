'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { fetchSpots, type Spot } from '@/lib/fetchSpots'
import { saveSpots } from '@/lib/spotCache'
import { addFavorite, removeFavorite, getFavorites } from '@/lib/favorites'

type Category = Spot['category'] | '全部'
type ViewMode = 'both' | 'map' | 'list'
type SpotsStatus = 'idle' | 'loading' | 'success' | 'error'
type Radius = 500 | 1000 | 2000

const CATEGORIES: Category[] = ['全部', 'カフェ', 'ラーメン', '居酒屋', '定食', 'スイーツ', 'その他']
const VIEW_LABELS: Record<ViewMode, string> = { both: '両方', map: '地図のみ', list: 'リストのみ' }
const RADIUS_OPTIONS: { value: Radius; label: string }[] = [
  { value: 500, label: '500m' },
  { value: 1000, label: '1km' },
  { value: 2000, label: '2km' },
]
const RADIUS_NEXT: Partial<Record<Radius, Radius>> = { 500: 1000, 1000: 2000 }
const DEFAULT_CENTER: [number, number] = [35.3606, 138.7274]

function formatDist(m: number): string {
  return m >= 1000 ? `${(m / 1000).toFixed(1)}km` : `${m}m`
}

const MapView = dynamic(() => import('@/components/MapView'), {
  ssr: false,
  loading: () => (
    <div className="h-[400px] border border-[#e5e5e5] rounded bg-[#f5f5f5] flex items-center justify-center text-sm text-[#666666]">
      地図を読み込み中...
    </div>
  ),
})

export default function DiscoverPage() {
  const [locationStatus, setLocationStatus] = useState<'loading' | 'ready' | 'error'>('loading')
  const [userPosition, setUserPosition] = useState<[number, number] | null>(null)
  const [spotsStatus, setSpotsStatus] = useState<SpotsStatus>('idle')
  const [spotsError, setSpotsError] = useState<string | null>(null)
  const [spots, setSpots] = useState<Spot[]>([])
  const [radius, setRadius] = useState<Radius>(500)
  const [fetchSeq, setFetchSeq] = useState(0)
  const [activeCategory, setActiveCategory] = useState<Category>('全部')
  const [viewMode, setViewMode] = useState<ViewMode>('both')
  const [searchQuery, setSearchQuery] = useState('')
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set())

  // 現在地取得
  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationStatus('error')
      return
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserPosition([pos.coords.latitude, pos.coords.longitude])
        setLocationStatus('ready')
      },
      () => setLocationStatus('error'),
    )
  }, [])

  // お気に入り初期読み込み
  useEffect(() => {
    setFavoriteIds(new Set(getFavorites().map((f) => f.id)))
  }, [])

  // 飲食店データ取得
  useEffect(() => {
    if (!userPosition) return
    let cancelled = false
    setSpotsStatus('loading')
    setSpotsError(null)
    setSpots([])

    fetchSpots(userPosition[0], userPosition[1], radius)
      .then((data) => {
        if (!cancelled) {
          setSpots(data)
          setSpotsStatus('success')
          saveSpots(data) // 詳細ページ用キャッシュ
        }
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          const isTimeout = err instanceof Error && err.name === 'AbortError'
          setSpotsError(isTimeout ? '応答がタイムアウトしました' : '通信エラーが発生しました')
          setSpotsStatus('error')
        }
      })

    return () => { cancelled = true }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userPosition, radius, fetchSeq])

  function toggleFavorite(spot: Spot) {
    if (favoriteIds.has(spot.id)) {
      removeFavorite(spot.id)
      setFavoriteIds((prev) => {
        const next = new Set(prev)
        next.delete(spot.id)
        return next
      })
    } else {
      addFavorite({
        id: spot.id,
        name: spot.name,
        category: spot.category,
        lat: spot.lat,
        lng: spot.lng,
        addedAt: Date.now(),
      })
      setFavoriteIds((prev) => new Set([...prev, spot.id]))
    }
  }

  const q = searchQuery.trim().toLowerCase()
  const filtered = spots
    .filter((s) => activeCategory === '全部' || s.category === activeCategory)
    .filter((s) => !q || s.name.toLowerCase().includes(q))

  const mapCenter = userPosition ?? DEFAULT_CENTER
  const nextRadius = RADIUS_NEXT[radius] ?? null
  const radiusLabel = radius >= 1000 ? `${radius / 1000}km` : `${radius}m`

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      {/* ヘッダー */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-[#1a1a1a]">近くのお店を発見</h1>
        <p className="mt-2 text-sm text-[#666666]">
          {locationStatus === 'loading' && '現在地を取得中...'}
          {locationStatus === 'ready' && spotsStatus === 'loading' && 'お店情報を取得中...'}
          {locationStatus === 'ready' && spotsStatus === 'success' &&
            `半径${radiusLabel}以内 · ${spots.length}件`}
          {locationStatus === 'ready' && spotsStatus === 'error' && spotsError}
          {locationStatus === 'ready' && spotsStatus === 'idle' && '現在地を確認しました'}
          {locationStatus === 'error' && '現在地を取得できませんでした'}
        </p>
      </div>

      {/* 半径切り替え */}
      {locationStatus === 'ready' && (
        <div className="flex items-center gap-2 mb-5">
          <span className="text-xs text-[#666666]">半径</span>
          {RADIUS_OPTIONS.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => setRadius(value)}
              disabled={spotsStatus === 'loading'}
              className={`px-3 py-1 text-xs rounded border transition-colors disabled:opacity-40 ${
                radius === value
                  ? 'bg-[#1a1a1a] text-white border-[#1a1a1a]'
                  : 'text-[#666666] border-[#e5e5e5] hover:border-[#999999] hover:text-[#1a1a1a]'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      )}

      {/* 検索バー */}
      <div className="mb-5">
        <input
          type="text"
          placeholder="店名で検索..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2.5 text-sm border border-[#e5e5e5] rounded bg-white text-[#1a1a1a] placeholder:text-[#999999] focus:outline-none focus:border-[#2c5f2e] transition-colors"
        />
      </div>

      {/* カテゴリフィルター */}
      <div className="flex flex-wrap gap-2 mb-5">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-1.5 text-sm rounded border transition-colors ${
              activeCategory === cat
                ? 'bg-[#2c5f2e] text-white border-[#2c5f2e]'
                : 'bg-transparent text-[#666666] border-[#e5e5e5] hover:border-[#999999] hover:text-[#1a1a1a]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 表示モード切り替え */}
      <div className="flex gap-1 mb-6">
        {(['both', 'map', 'list'] as ViewMode[]).map((mode) => (
          <button
            key={mode}
            onClick={() => setViewMode(mode)}
            className={`px-3 py-1 text-xs rounded border transition-colors ${
              viewMode === mode
                ? 'bg-[#1a1a1a] text-white border-[#1a1a1a]'
                : 'text-[#666666] border-[#e5e5e5] hover:border-[#999999] hover:text-[#1a1a1a]'
            }`}
          >
            {VIEW_LABELS[mode]}
          </button>
        ))}
      </div>

      {/* 地図 */}
      {(viewMode === 'both' || viewMode === 'map') && (
        <div className="mb-8 border border-[#e5e5e5] rounded overflow-hidden">
          <MapView spots={filtered} center={mapCenter} userPosition={userPosition} />
        </div>
      )}

      {/* リスト領域 */}
      {(viewMode === 'both' || viewMode === 'list') && (
        <>
          {spotsStatus === 'loading' && (
            <div className="py-16 text-center text-sm text-[#666666]">
              お店情報を取得しています...
            </div>
          )}

          {spotsStatus === 'error' && (
            <div className="py-12 text-center">
              <p className="text-sm text-[#666666] mb-4">{spotsError}</p>
              <button
                onClick={() => setFetchSeq((n) => n + 1)}
                className="px-4 py-2 text-sm border border-[#e5e5e5] rounded text-[#666666] hover:border-[#999999] hover:text-[#1a1a1a] transition-colors"
              >
                再試行
              </button>
            </div>
          )}

          {spotsStatus === 'success' && spots.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-sm text-[#666666] mb-6">
                この近辺にはまだお店データがありません
              </p>
              {nextRadius && (
                <button
                  onClick={() => setRadius(nextRadius)}
                  className="px-5 py-2 text-sm bg-[#2c5f2e] text-white rounded hover:bg-[#245026] transition-colors"
                >
                  半径を広げて検索（
                  {nextRadius >= 1000 ? `${nextRadius / 1000}km` : `${nextRadius}m`}）
                </button>
              )}
            </div>
          )}

          {spotsStatus === 'success' && spots.length > 0 && (
            <>
              <ul className="divide-y divide-[#e5e5e5]">
                {filtered.map((spot) => (
                  <li key={spot.id} className="flex items-stretch">
                    <Link
                      href={`/spot/${spot.id}`}
                      className="flex-1 py-5 -ml-3 pl-3 pr-1 rounded-l hover:bg-[#f5f5f5] transition-colors min-w-0"
                    >
                      <p className="font-medium text-[#1a1a1a]">{spot.name}</p>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-sm text-[#666666]">
                        <span>{spot.category}</span>
                        {spot.rating > 0 && <span>★ {spot.rating.toFixed(1)}</span>}
                        <span>{formatDist(spot.distanceM)}</span>
                      </div>
                      {spot.description && (
                        <p className="mt-2 text-sm text-[#666666] leading-relaxed">
                          {spot.description}
                        </p>
                      )}
                    </Link>
                    <button
                      onClick={() => toggleFavorite(spot)}
                      className="shrink-0 px-3 text-lg text-[#cccccc] hover:text-[#f5a623] transition-colors"
                      title={favoriteIds.has(spot.id) ? 'お気に入りを解除' : 'お気に入りに追加'}
                    >
                      {favoriteIds.has(spot.id) ? '★' : '☆'}
                    </button>
                  </li>
                ))}
              </ul>

              {filtered.length === 0 && (
                <p className="py-12 text-center text-sm text-[#666666]">
                  該当するお店がありません
                </p>
              )}
            </>
          )}
        </>
      )}
    </div>
  )
}
