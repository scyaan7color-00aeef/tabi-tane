'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getFavorites, removeFavorite, type FavoriteSpot } from '@/lib/favorites'

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<FavoriteSpot[]>([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setFavorites(getFavorites())
    setLoaded(true)
  }, [])

  function handleRemove(id: string) {
    removeFavorite(id)
    setFavorites((prev) => prev.filter((f) => f.id !== id))
  }

  if (!loaded) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-16 text-center text-sm text-[#666666]">
        読み込み中...
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-semibold text-[#1a1a1a] mb-8">お気に入りのお店</h1>

      {favorites.length === 0 ? (
        <div className="py-16 text-center">
          <p className="text-sm text-[#666666] mb-4">まだお気に入りがありません</p>
          <Link href="/discover" className="text-sm text-[#2c5f2e] hover:underline">
            お店を探してみる →
          </Link>
        </div>
      ) : (
        <ul className="divide-y divide-[#e5e5e5]">
          {favorites.map((fav) => (
            <li key={fav.id} className="flex items-center gap-3 py-5">
              <div className="min-w-0 flex-1">
                <Link
                  href={`/spot/${fav.id}`}
                  className="font-medium text-[#1a1a1a] hover:text-[#2c5f2e] transition-colors"
                >
                  {fav.name}
                </Link>
                <p className="mt-1 text-sm text-[#666666]">{fav.category}</p>
              </div>
              <button
                onClick={() => handleRemove(fav.id)}
                className="shrink-0 px-3 py-1.5 text-xs border border-[#e5e5e5] rounded text-[#666666] hover:border-[#999999] hover:text-[#1a1a1a] transition-colors"
              >
                削除
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
