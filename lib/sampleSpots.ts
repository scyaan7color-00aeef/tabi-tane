export type Spot = {
  id: string;
  name: string;
  category: 'カフェ' | 'ラーメン' | '居酒屋' | '定食' | 'スイーツ';
  rating: number;
  distanceM: number;
  description: string;
  lat: number;
  lng: number;
};

// 中心: 相模原駅 (35.5867, 139.3739) 半径500m以内
export const sampleSpots: Spot[] = [
  {
    id: '1',
    name: '珈琲焙煎所 ひだまり',
    category: 'カフェ',
    rating: 4.3,
    distanceM: 120,
    description: '自家焙煎のスペシャルティコーヒーを提供。静かな空間でゆったりと過ごせる一軒。',
    lat: 35.5878,
    lng: 139.3751,
  },
  {
    id: '2',
    name: '麺屋 四季',
    category: 'ラーメン',
    rating: 4.6,
    distanceM: 280,
    description: '鶏白湯スープが絶品。地元客に長年愛されてきた老舗ラーメン店。',
    lat: 35.5852,
    lng: 139.3731,
  },
  {
    id: '3',
    name: '居酒屋 はなみち',
    category: '居酒屋',
    rating: 4.1,
    distanceM: 350,
    description: '旬の食材を使った小鉢料理が充実。日本酒の品揃えも豊富で落ち着いた雰囲気。',
    lat: 35.5887,
    lng: 139.3718,
  },
  {
    id: '4',
    name: '定食の店 みのり',
    category: '定食',
    rating: 4.4,
    distanceM: 420,
    description: '毎日変わる日替わり定食が人気。ご飯のおかわりが無料でボリューム満点。',
    lat: 35.5843,
    lng: 139.3757,
  },
  {
    id: '5',
    name: 'パティスリー ルポ',
    category: 'スイーツ',
    rating: 4.7,
    distanceM: 480,
    description: '本格フランス菓子の専門店。季節のタルトとエクレアが特に人気を集めている。',
    lat: 35.5872,
    lng: 139.3769,
  },
];
