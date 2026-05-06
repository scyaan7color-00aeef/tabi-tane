export type Spot = {
  id: string;
  name: string;
  category: 'カフェ' | 'ラーメン' | '居酒屋' | '定食' | 'スイーツ' | 'その他';
  rating: number;
  distanceM: number;
  description: string;
  lat: number;
  lng: number;
  cuisine?: string;
  phone?: string;
  openingHours?: string;
};

type OverpassNode = {
  type: string;
  id: number;
  lat: number;
  lon: number;
  tags?: Record<string, string | undefined>;
};

function haversineM(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6_371_000;
  const rad = (d: number) => (d * Math.PI) / 180;
  const dLat = rad(lat2 - lat1);
  const dLng = rad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dLng / 2) ** 2;
  return Math.round(R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
}

function toCategory(amenity: string, cuisine = ''): Spot['category'] {
  const c = cuisine.toLowerCase();
  if (/cake|dessert|ice_cream|sweet|crepe|waffle|pancake/.test(c)) return 'スイーツ';
  if (/ramen|noodle/.test(c)) return 'ラーメン';
  if (amenity === 'cafe' || /coffee|tea/.test(c)) return 'カフェ';
  if (amenity === 'bar' || /izakaya/.test(c)) return '居酒屋';
  if (
    amenity === 'restaurant' &&
    /japanese|soba|udon|tempura|tonkatsu|teishoku|sukiyaki|yakiniku|shabu/.test(c)
  )
    return '定食';
  return 'その他';
}

function buildDescription(tags: Record<string, string | undefined>): string {
  const parts: string[] = [];
  if (tags.cuisine) {
    parts.push(
      tags.cuisine
        .split(';')
        .map((s) => s.trim())
        .join(' / '),
    );
  }
  if (tags.opening_hours) parts.push(tags.opening_hours);
  return parts.join(' · ');
}

export async function fetchSpots(
  lat: number,
  lng: number,
  radiusM = 500,
): Promise<Spot[]> {
  const query = `
    [out:json][timeout:25];
    (
      node["amenity"~"cafe|restaurant|fast_food|bar"](around:${radiusM},${lat},${lng});
    );
    out body;
  `;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 30_000);

  try {
    const res = await fetch('https://overpass-api.de/api/interpreter', {
      method: 'POST',
      body: 'data=' + encodeURIComponent(query),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      signal: controller.signal,
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const data: { elements: OverpassNode[] } = await res.json();

    return data.elements
      .filter((el) => el.tags?.name)
      .map((el): Spot => {
        const tags = el.tags!;
        return {
          id: String(el.id),
          name: tags.name!,
          category: toCategory(tags.amenity ?? '', tags.cuisine),
          rating: 0,
          distanceM: haversineM(lat, lng, el.lat, el.lon),
          description: buildDescription(tags),
          lat: el.lat,
          lng: el.lon,
          cuisine: tags.cuisine,
          phone: tags.phone,
          openingHours: tags.opening_hours,
        };
      })
      .sort((a, b) => a.distanceM - b.distanceM);
  } finally {
    clearTimeout(timer);
  }
}
