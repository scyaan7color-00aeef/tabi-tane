import type { Spot } from '@/lib/fetchSpots';

export const SPOT_CACHE_KEY = 'tabi-tane-spot-cache';

export function saveSpots(spots: Spot[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(SPOT_CACHE_KEY, JSON.stringify(spots));
  } catch {
    // localStorage 容量超過などは無視
  }
}

export function findSpot(id: string): Spot | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(SPOT_CACHE_KEY);
    if (!raw) return null;
    const spots: Spot[] = JSON.parse(raw);
    return spots.find((s) => s.id === id) ?? null;
  } catch {
    return null;
  }
}
