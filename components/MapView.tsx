'use client'

import 'leaflet/dist/leaflet.css'
import { createPortal } from 'react-dom'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import type { Spot } from '@/lib/fetchSpots'

const CATEGORY_COLORS: Record<Spot['category'], string> = {
  'カフェ': '#f5a623',
  'ラーメン': '#d4537e',
  '居酒屋': '#7f77dd',
  '定食': '#639922',
  'スイーツ': '#ec4899',
  'その他': '#888888',
}

function dotIcon(color: string, size = 14) {
  const half = size / 2
  return L.divIcon({
    className: '',
    html: `<div style="width:${size}px;height:${size}px;background:${color};border-radius:50%;border:2px solid #fff;box-shadow:0 1px 4px rgba(0,0,0,.28)"></div>`,
    iconSize: [size, size],
    iconAnchor: [half, half],
    popupAnchor: [0, -half - 4],
  })
}

const userIcon = dotIcon('#2c5f2e', 18)

// MapContainer の子として useMap にアクセスし、ボタンを地図コンテナ内に portal で描画
function RecenterButton({ position }: { position: [number, number] }) {
  const map = useMap()
  return createPortal(
    <button
      onClick={(e) => {
        e.stopPropagation()
        map.flyTo(position, 15)
      }}
      title="現在地に戻る"
      style={{
        position: 'absolute',
        bottom: '32px',
        right: '10px',
        zIndex: 1000,
        width: '34px',
        height: '34px',
        background: '#fff',
        border: '1px solid #e5e5e5',
        borderRadius: '4px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 1px 4px rgba(0,0,0,.12)',
      }}
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="3" fill="#2c5f2e" />
        <circle cx="8" cy="8" r="5.5" stroke="#2c5f2e" strokeWidth="1.4" />
        <line x1="8" y1="1" x2="8" y2="3.5" stroke="#2c5f2e" strokeWidth="1.4" strokeLinecap="round" />
        <line x1="8" y1="12.5" x2="8" y2="15" stroke="#2c5f2e" strokeWidth="1.4" strokeLinecap="round" />
        <line x1="1" y1="8" x2="3.5" y2="8" stroke="#2c5f2e" strokeWidth="1.4" strokeLinecap="round" />
        <line x1="12.5" y1="8" x2="15" y2="8" stroke="#2c5f2e" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    </button>,
    map.getContainer(),
  )
}

type Props = {
  spots: Spot[]
  center: [number, number]
  userPosition?: [number, number] | null
}

export default function MapView({ spots, center, userPosition }: Props) {
  return (
    <MapContainer
      center={center}
      zoom={15}
      scrollWheelZoom={false}
      style={{ height: '400px', width: '100%', borderRadius: '4px' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {spots.map((spot) => (
        <Marker
          key={spot.id}
          position={[spot.lat, spot.lng]}
          icon={dotIcon(CATEGORY_COLORS[spot.category])}
        >
          <Popup>
            <div style={{ minWidth: '110px', fontFamily: 'inherit' }}>
              <p style={{ fontWeight: 600, fontSize: '13px', margin: '0 0 2px' }}>
                {spot.name}
              </p>
              <p style={{ fontSize: '12px', color: '#666', margin: 0 }}>
                {spot.category} · {spot.distanceM}m
              </p>
            </div>
          </Popup>
        </Marker>
      ))}

      {userPosition && (
        <>
          <Marker position={userPosition} icon={userIcon}>
            <Popup>
              <p style={{ fontSize: '13px', margin: 0, fontWeight: 600 }}>現在地</p>
            </Popup>
          </Marker>
          <RecenterButton position={userPosition} />
        </>
      )}
    </MapContainer>
  )
}
