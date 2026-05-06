export type FavoriteSpot = {
  id: string;
  name: string;
  category: string;
  lat: number;
  lng: number;
  addedAt: number;
};

export const FAVORITES_KEY = 'tabi-tane-favorites';

export function getFavorites(): FavoriteSpot[] {
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem(FAVORITES_KEY);
    return data ? (JSON.parse(data) as FavoriteSpot[]) : [];
  } catch {
    return [];
  }
}

export function addFavorite(spot: FavoriteSpot): void {
  const favorites = getFavorites();
  if (!favorites.find((f) => f.id === spot.id)) {
    favorites.push(spot);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }
}

export function removeFavorite(id: string): void {
  const favorites = getFavorites().filter((f) => f.id !== id);
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

export function isFavorite(id: string): boolean {
  return getFavorites().some((f) => f.id === id);
}
