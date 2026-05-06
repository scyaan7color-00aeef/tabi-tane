import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');
  const radius = searchParams.get('radius') || '500';

  if (!lat || !lng) {
    return NextResponse.json(
      { error: 'lat と lng が必要です' },
      { status: 400 },
    );
  }

  const query = `[out:json][timeout:25];(node["amenity"~"cafe|restaurant|fast_food|bar"](around:${radius},${lat},${lng}););out body;`;

  try {
    const response = await fetch('https://overpass-api.de/api/interpreter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
        'User-Agent': 'tabi-tane/1.0',
      },
      body: `data=${encodeURIComponent(query)}`,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Overpass API エラー:', response.status, errorText);
      return NextResponse.json(
        { error: `Overpass API エラー: ${response.status}` },
        { status: response.status },
      );
    }

    const data: unknown = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Fetch エラー:', error);
    return NextResponse.json(
      { error: '通信エラーが発生しました' },
      { status: 500 },
    );
  }
}
