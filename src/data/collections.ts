import { Collection } from '../types';

export const collections: Collection[] = [
  {
    id: 'c-01',
    slug: 'nocturne',
    name: 'Nocturne',
    tagline: 'Jewellery for the hours after light disappears.',
    accent: 'champagne',
    themeClass: 'theme-obsidian',
    description: 'Blackened gold, tension-set diamonds, and razor-sharp geometries designed to catch the singular spotlight of evening.',
    manifesto: [
      'We begin where daylight surrenders.',
      'A sculpture that needs only a sliver of light to declare its presence.',
      'Black velvet surfaces, architectural tension, cold fire.'
    ],
    heroImage: '/images/hero-ring.jpg',
    editorialImage: '/images/editorial-model.jpg',
    year: '2026',
    pieceCount: 18
  },
  {
    id: 'c-02',
    slug: 'verde-notte',
    name: 'Verde Notte',
    tagline: 'Emeralds after midnight.',
    accent: 'emerald',
    themeClass: 'theme-emerald-salon',
    description: 'Untreated Colombian Muzo emeralds set within heavy yellow gold armatures. Green fire emerging from deep botanical shadows.',
    manifesto: [
      'Nature crystallised in absolute stillness.',
      'The green depth of ancestral forests held inside modern razor-cut gold.',
      'Color that lives only when observed up close.'
    ],
    heroImage: '/images/emerald-necklace.jpg',
    editorialImage: '/images/editorial-model.jpg',
    year: '2026',
    pieceCount: 14
  },
  {
    id: 'c-03',
    slug: 'solar',
    name: 'Solar',
    tagline: 'Brushed yellow gold forged under Mediterranean heat.',
    accent: 'champagne',
    themeClass: 'theme-warm-white',
    description: 'Sensual weights, hand-hammered textures, and monolithic gold cuffs that feel like ancient relics excavated yesterday.',
    manifesto: [
      'Gold that warms directly against the pulse.',
      'The memory of sun-drenched limestone and Aegean wind.',
      'Brushed surfaces that reject commercial shine in pursuit of depth.'
    ],
    heroImage: '/images/gold-cuff.jpg',
    editorialImage: '/images/editorial-model.jpg',
    year: '2025',
    pieceCount: 22
  },
  {
    id: 'c-04',
    slug: 'linea',
    name: 'Linea',
    tagline: 'Architectural minimalism descending in singular strokes.',
    accent: 'graphite',
    themeClass: 'theme-graphite-atelier',
    description: 'Purist platinum lines and calibrated baguette pavé diamonds. The absolute elimination of excess ornament.',
    manifesto: [
      'One line is enough when the line is true.',
      'Zero decorative noise. Maximum structural tension.',
      'Modernist engineering elevated to haute joaillerie.'
    ],
    heroImage: '/images/diamond-ring.jpg',
    editorialImage: '/images/atelier-workbench.jpg',
    year: '2025',
    pieceCount: 16
  },
  {
    id: 'c-05',
    slug: 'high-jewellery',
    name: 'High Jewellery',
    tagline: 'One-of-a-kind museum commissions created over hundreds of hours.',
    accent: 'sapphire',
    themeClass: 'theme-obsidian',
    description: 'Unique commissions featuring rare unheated stones, historical provenance, and hand-forged masterworks made once and never replicated.',
    manifesto: [
      'Made without deadlines. Made without compromise.',
      'Each piece exists once in the history of the earth.',
      'Treasures destined for archives, museums, and private sanctuaries.'
    ],
    heroImage: '/images/sapphire-ring.jpg',
    editorialImage: '/images/editorial-model.jpg',
    year: '2026',
    pieceCount: 8
  }
];
