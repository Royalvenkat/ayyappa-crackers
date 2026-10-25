export const categories = [
  'Red Bijili',
  'Sparkles',
  'Flower Pots',
  'Ground Chakkar',
  'Sound Crackers',
  "Wala's",
  'Ultra Suttili Bombs',
  'Rockets',
  'Combo Packs',
  'Special Items',
]

export const categorySlugMap = {
  'Red Bijili': 'red-bijili',
  Sparkles: 'sparkles',
  'Flower Pots': 'flower-pots',
  'Ground Chakkar': 'ground-chakkar',
  'Sound Crackers': 'sound-crackers',
  "Wala's": 'walas',
  'Ultra Suttili Bombs': 'ultra-suttili-bombs',
  Rockets: 'rockets',
  'Combo Packs': 'combo-packs',
  'Special Items': 'special-items',
}

export const getCategorySlug = (category) =>
  categorySlugMap[category] ||
  category
    .toLowerCase()
    .replace(/&/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

export const comboPacks = [
  {
    id: 'children-pack',
    name: 'Children Pack',
    price: 4000,
    includes: [
      '2 x 15cm Sparkles',
      '2 x 30cm Sparkles',
      '2 x Bijili types',
      '1 x Pop-up Box',
      '1 x Gun',
      '5 x Ring Caps',
      '3 x Sound Rockets',
      '10 Small Birds',
      '2 Boxes Ground Chakkar',
      '2 Boxes Flower Pots',
    ],
  },
  {
    id: 'family-pack',
    name: 'Family Pack',
    price: 8000,
    includes: [
      'Premium Bijili Mix',
      '4 x 15cm Sparkles',
      '3 x 30cm Sparkles',
      'Family Flower Pot Set',
      'Ground Chakkar Bundle',
      'Sound Crackers Selection',
      'Extra Ring Caps',
      'Gift Box Special',
    ],
  },
  {
    id: 'youthful-pack',
    name: 'Youthful Pack',
    price: 10000,
    includes: [
      'High-power Bijili',
      'Heavy Sparkles Combo',
      'Premium Rocket Set',
      'Sound Crackers Premium',
      'Ultra Bombs Mix',
      'Luxury Flower Pot Bundle',
      'Party Gift Box',
      'Grand Celebration Add-ons',
    ],
  },
]

export const products = [
  { id: 1, name: 'WGT Bijili', category: 'Red Bijili', quantity: '100', price: 50, emoji: '🎆' },
  { id: 2, name: 'Cowboy Bijili', category: 'Red Bijili', quantity: '100', price: 90, emoji: '🎇' },
  { id: 3, name: 'C Bijili', category: 'Red Bijili', quantity: '100', price: 45, emoji: '🎆' },

  { id: 4, name: '15cm Sada', category: 'Sparkles', quantity: '1 box', price: 80, emoji: '✨' },
  { id: 5, name: '15cm Colour', category: 'Sparkles', quantity: '1 box', price: 90, emoji: '✨' },
  { id: 6, name: '30cm Sada', category: 'Sparkles', quantity: '1 box', price: 120, emoji: '✨' },
  { id: 7, name: '30cm Colour', category: 'Sparkles', quantity: '1 box', price: 130, emoji: '✨' },

  { id: 8, name: 'NRG Flower Pot Medium', category: 'Flower Pots', quantity: '10 Piece', price: 250, emoji: '🌼' },
  { id: 9, name: 'VML Flower Pot Big', category: 'Flower Pots', quantity: '10 Piece', price: 650, emoji: '🌼' },
  { id: 10, name: 'WGT Ashoka Small', category: 'Flower Pots', quantity: '10 Piece', price: 180, emoji: '🌼' },
  { id: 11, name: 'QUN Colour Koti', category: 'Flower Pots', quantity: '10 Piece', price: 350, emoji: '🌼' },
  { id: 12, name: 'KVS Colour Koti Small', category: 'Flower Pots', quantity: '10 Piece', price: 150, emoji: '🌼' },
  { id: 13, name: 'Darbar Clr Koti Super Big', category: 'Flower Pots', quantity: '10 piece', price: 1050, emoji: '🌼' },
  { id: 14, name: 'Natu Kunda', category: 'Flower Pots', quantity: '1 piece', price: 120, emoji: '🌼' },

  { id: 15, name: 'SVS GC Big', category: 'Ground Chakkar', quantity: '10 Piece', price: 120, emoji: '🌀' },
  { id: 16, name: 'Kr GC Spcl', category: 'Ground Chakkar', quantity: '10 Piece', price: 200, emoji: '🌀' },
  { id: 17, name: '5 Star GC Spl', category: 'Ground Chakkar', quantity: '25 Piece', price: 220, emoji: '🌀' },
  { id: 18, name: 'DPM Super DLX', category: 'Ground Chakkar', quantity: '10 Piece', price: 600, emoji: '🌀' },
  { id: 19, name: 'VDL GC DLX', category: 'Ground Chakkar', quantity: '10 Piece', price: 400, emoji: '🌀' },
  { id: 20, name: 'VDL Disco Wheel', category: 'Ground Chakkar', quantity: '5 piece', price: 280, emoji: '🌀' },

  { id: 21, name: 'WG 4” Laxmi', category: 'Sound Crackers', quantity: '5*10', price: 550, emoji: '💥' },
  { id: 22, name: 'VDL 4" Gold Lakshmi DLX', category: 'Sound Crackers', quantity: '5*10', price: 1050, emoji: '💥' },
  { id: 23, name: 'Sriavaru 2 Sound', category: 'Sound Crackers', quantity: '1 set', price: 550, emoji: '💥' },
  { id: 24, name: 'Kissann 5” Super Big Laxmi', category: 'Sound Crackers', quantity: '1 set', price: 900, emoji: '💥' },
  { id: 25, name: 'MU 2.75 “ Small', category: 'Sound Crackers', quantity: '1 set', price: 450, emoji: '💥' },
  { id: 26, name: '5Star Lal Mirichi', category: 'Sound Crackers', quantity: '1 set', price: 950, emoji: '💥' },
  { id: 27, name: 'Srinivasa 3” Inch', category: 'Sound Crackers', quantity: '1 set', price: 600, emoji: '💥' },
  { id: 28, name: 'Big Red 100 Wala Bijli', category: 'Sound Crackers', quantity: '1', price: 600, emoji: '💥' },
  { id: 29, name: 'Turkey 28 Wala', category: 'Sound Crackers', quantity: '50 piece', price: 1400, emoji: '💥' },
  { id: 30, name: 'Rajamoney 56 Giant', category: 'Sound Crackers', quantity: '1 unit', price: 160, emoji: '💥' },
  { id: 31, name: 'SVS 4 “ Laxmi', category: 'Sound Crackers', quantity: '1 set', price: 900, emoji: '💥' },
  { id: 32, name: 'WG 4 “ Gold Laxmi', category: 'Sound Crackers', quantity: '1 set', price: 750, emoji: '💥' },
  { id: 33, name: 'Shark 4” Laxmi DLX', category: 'Sound Crackers', quantity: '1 set', price: 700, emoji: '💥' },
  { id: 34, name: 'TMT 50 Mega', category: 'Sound Crackers', quantity: '1', price: 400, emoji: '💥' },
  { id: 35, name: 'ST 100 Wala', category: 'Sound Crackers', quantity: '1', price: 240, emoji: '💥' },

  { id: 36, name: '100 Wala D.G', category: "Wala's", quantity: '1', price: 120, emoji: '🎁' },
  { id: 37, name: '200 Wala M.U', category: "Wala's", quantity: '1', price: 240, emoji: '🎁' },
  { id: 38, name: '1000 Wala', category: "Wala's", quantity: '1', price: 550, emoji: '🎁' },
  { id: 39, name: '2000 Wala', category: "Wala's", quantity: '1', price: 1050, emoji: '🎁' },
  { id: 40, name: '5000 Wala', category: "Wala's", quantity: '1', price: 2150, emoji: '🎁' },
  { id: 41, name: '10k Wala', category: "Wala's", quantity: '1', price: 3900, emoji: '🎁' },
  { id: 42, name: '28 Wala Single', category: "Wala's", quantity: '1', price: 30, emoji: '🎁' },

  { id: 43, name: 'BK Classic Bomb', category: 'Ultra Suttili Bombs', quantity: '1', price: 350, emoji: '💣' },
  { id: 44, name: 'MV Hydro Bomb', category: 'Ultra Suttili Bombs', quantity: '1', price: 250, emoji: '💣' },
  { id: 45, name: 'Vishal Ganga Jamum', category: 'Ultra Suttili Bombs', quantity: '1', price: 210, emoji: '💣' },
  { id: 46, name: 'Sony Emerald', category: 'Ultra Suttili Bombs', quantity: '1', price: 120, emoji: '💣' },
  { id: 47, name: 'RED Bomb Big', category: 'Ultra Suttili Bombs', quantity: '1', price: 650, emoji: '💣' },
  { id: 48, name: 'Cat DLX Bomb', category: 'Ultra Suttili Bombs', quantity: '1', price: 550, emoji: '💣' },

  { id: 49, name: '12 Shot', category: 'Rockets', quantity: '1', price: 500, emoji: '🚀' },
  { id: 50, name: '30 Shot', category: 'Rockets', quantity: '1', price: 1150, emoji: '🚀' },
  { id: 51, name: '60 Shot', category: 'Rockets', quantity: '1', price: 2450, emoji: '🚀' },
  { id: 52, name: '120 Shot', category: 'Rockets', quantity: '1', price: 5500, emoji: '🚀' },
  { id: 53, name: '7 Shot 5 Piece', category: 'Rockets', quantity: '1', price: 600, emoji: '🚀' },
  { id: 54, name: 'DG Rocket', category: 'Rockets', quantity: '1', price: 950, emoji: '🚀' },
  { id: 55, name: '2 Sound Rocket', category: 'Rockets', quantity: '1', price: 700, emoji: '🚀' },

  { id: 56, name: 'Premium Flower Pot Combo', category: 'Special Items', quantity: '1 set', price: 1800, emoji: '🎊' },
  { id: 57, name: 'Comet Deluxe Set', category: 'Special Items', quantity: '1 set', price: 2200, emoji: '🎊' },
  { id: 58, name: 'Festival Special Box', category: 'Special Items', quantity: '1 box', price: 2999, emoji: '🎊' },
  { id: 59, name: 'Luxury Crackers Pack', category: 'Special Items', quantity: '1 box', price: 4200, emoji: '🎊' },
]

export default products
