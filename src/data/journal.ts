import { JournalArticle } from '../types';

export const journalArticles: JournalArticle[] = [
  {
    id: 'j-01',
    slug: 'when-gold-becomes-architecture',
    issueNumber: 'ISSUE NO. XII',
    title: 'When Gold Becomes Architecture',
    subtitle: 'An inquiry into how structural cantilever techniques redefine European jewellery sculpting.',
    author: 'Hélène Vaneau, Architecture & Fine Art Critic',
    date: 'OCTOBER 2026',
    category: 'Design Philosophy',
    readTime: '6 MIN READ',
    heroImage: '/images/editorial-model.jpg',
    secondaryImage: '/images/hero-ring.jpg',
    pullQuote: 'A ring should behave like a modernist pavilion: balancing weight, tension, and light without begging for attention.',
    paragraphs: [
      'In traditional European fine jewellery, the metal was historically treated as an ornate scaffold whose sole objective was holding gemstones aloft. At Aurenne, this hierarchy is intentionally inverted. The gold is not an accompaniment; it is the spatial enclosure itself.',
      'Studying the tensioned steel spans of Le Corbusier and the quiet mass of Carlo Scarpa’s stone thresholds, the master artisans in our Paris workshop construct gold shanks that curve with mathematical intent. By balancing mass at the underside and sharpening exterior edges to knife-thin crests, the object appears nearly buoyant on the hand.',
      'Light does not simply bounce off these pieces; it travels along calibrated facets, revealing the dialogue between the soft warmth of hand-brushed 18k alloy and the crystalline fire of unheated minerals.'
    ],
    relatedPieceSlug: 'the-arc-ring'
  },
  {
    id: 'j-02',
    slug: 'emerald-after-dark',
    issueNumber: 'ISSUE NO. XI',
    title: 'Emerald After Dark: The Nocturne Studies',
    subtitle: 'Why untreated Colombian emeralds reveal their truest character under dim gallery spotlights.',
    author: 'Dr. Laurent Moreau, Senior Gemmological Scholar',
    date: 'SEPTEMBER 2026',
    category: 'Gemmology',
    readTime: '8 MIN READ',
    heroImage: '/images/emerald-necklace.jpg',
    secondaryImage: '/images/gold-cuff.jpg',
    pullQuote: 'Under full daylight, emeralds show their foliage. In darkness, they pulse with the mysterious luminescence of deep earth.',
    paragraphs: [
      'The Muzo region of Colombia produces beryl with an internal microscopic structure known to French cutters as "le jardin" — a delicate garden of natural inclusions that scatter light internally.',
      'When illuminated in an unlit room by a single directed warm beam, these inclusions act as internal mirrors. Rather than losing vibrancy, the green intensifies into an almost hypnotic oceanic twilight.',
      'For our Verde Notte collection, we chose stones specifically for their nocturnal performance, refusing polymer treatments or aggressive heat, ensuring each jewel carries the unbroken memory of 65 million years.'
    ],
    relatedPieceSlug: 'the-orbit-pendant'
  },
  {
    id: 'j-03',
    slug: 'the-forty-two-hour-curve',
    issueNumber: 'ISSUE NO. X',
    title: 'Inside the Atelier: The Forty-Two Hour Curve',
    subtitle: 'A documentary journey into the silent rhythm of cold-forging an 18-carat gold arch.',
    author: 'Mathieu Delacroix, Maison Archivist',
    date: 'AUGUST 2026',
    category: 'Craftsmanship',
    readTime: '5 MIN READ',
    heroImage: '/images/atelier-workbench.jpg',
    secondaryImage: '/images/bespoke-sketch.jpg',
    pullQuote: 'You cannot hurry the cooling of gold. If you strike it ten seconds too early, the crystalline grid shatters.',
    paragraphs: [
      'Between the first drawing in charcoal and the final hallmark stamp, our bench goldsmiths spend forty-two hours on a single piece of The Arc Ring. There is no automated milling machine capable of recreating the subtle micro-undulation of a hand-planed bevel.',
      'Every stroke with a Swiss needle file removes fractions of a milligram. The craftsman listens as much as he looks — the acoustic pitch of the file against gold changes when the curve transitions from radius to tangent.',
      'This patience is what separates industrial luxury from haute joaillerie. It is the human breath fossilised in precious metal.'
    ],
    relatedPieceSlug: 'the-solis-cuff'
  }
];
