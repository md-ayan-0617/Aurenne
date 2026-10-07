export type CollectionType = 'Nocturne' | 'Verde Notte' | 'Solar' | 'Linea' | 'High Jewellery' | 'Bridal';

export type CategoryType = 'Rings' | 'Earrings' | 'Necklaces' | 'Bracelets' | 'High Jewellery' | 'Bridal' | 'Objects';

export interface Product {
  id: string;
  slug: string;
  name: string;
  subtitle?: string;
  collection: CollectionType;
  category: CategoryType;
  price: number;
  currency: string;
  availability: 'Available' | 'Made to Order' | 'Private Viewing';
  materials: string[];
  stones: string[];
  sizes: string[];
  description: string;
  craftHours: number;
  goldWeight?: string;
  caratWeight?: string;
  images: string[];
  altAngleImage: string;
  macroImage: string;
  featured?: boolean;
  isNew?: boolean;
  accentColor?: string;
  relatedProductSlugs: string[];
  specs: {
    dimensions: string;
    setting: string;
    origin: string;
    hallmark: string;
    craftsmanship: string;
  };
}

export interface Collection {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  accent: 'emerald' | 'ruby' | 'sapphire' | 'champagne' | 'graphite';
  themeClass: string;
  description: string;
  manifesto: string[];
  heroImage: string;
  editorialImage: string;
  year: string;
  pieceCount: number;
}

export interface JournalArticle {
  id: string;
  slug: string;
  issueNumber: string;
  title: string;
  subtitle: string;
  author: string;
  date: string;
  category: string;
  readTime: string;
  heroImage: string;
  secondaryImage: string;
  pullQuote: string;
  paragraphs: string[];
  relatedPieceSlug?: string;
}

export interface TimelineMilestone {
  year: string;
  title: string;
  location: string;
  description: string;
  artefact: string;
  image: string;
}

export interface AtelierStage {
  step: string;
  name: string;
  frenchTitle: string;
  description: string;
  specs: {
    temperature?: string;
    weight?: string;
    tolerance?: string;
    carat?: string;
    hours?: string;
  };
  image: string;
}

export interface BagItem {
  product: Product;
  quantity: number;
  selectedSize: string;
  selectedMaterial: string;
}

export type CursorState = 'default' | 'view' | 'drag' | 'zoom' | 'play' | 'enter' | 'add' | 'book';
