import { AtelierStage } from '../types';

export const atelierStages: AtelierStage[] = [
  {
    step: '01',
    name: 'Sketch',
    frenchTitle: 'Le Dessin Technique',
    description: 'Every creation originates on 300gsm cold-press rag paper. Graphite lines delineate the load-bearing arches, gemstone seats, and light capture angles with structural precision.',
    specs: {
      temperature: '21.0 °C (Studio Ambient)',
      weight: 'Graphite on Vellum',
      tolerance: '± 0.05 mm scale',
      hours: '14 Hours Draft'
    },
    image: '/images/bespoke-sketch.jpg'
  },
  {
    step: '02',
    name: 'Wax Sculpting',
    frenchTitle: 'La Cire Perdue',
    description: 'Carved directly by hand from dense green jewelers wax under binocular loupes. The wax prototype tests tactile volume, finger clearance, and internal hollows.',
    specs: {
      temperature: 'Melting Point 68.5 °C',
      weight: '1.14 g/cm³ Density',
      tolerance: '± 0.02 mm',
      hours: '22 Hours Sculpt'
    },
    image: '/images/atelier-workbench.jpg'
  },
  {
    step: '03',
    name: 'Lost-Wax Casting',
    frenchTitle: 'La Fonte Sous Vide',
    description: 'Molten 18-karat alloy is poured into gypsum investment flasks inside a high-vacuum induction crucible, preventing porosity and ensuring homogeneous crystalline density.',
    specs: {
      temperature: '1,064 °C (Pouring)',
      weight: '750/1000 Au Purity',
      tolerance: 'Zero Porosity ASTM B562',
      hours: '8 Hours Induction'
    },
    image: '/images/gold-cuff.jpg'
  },
  {
    step: '04',
    name: 'Forging & Filing',
    frenchTitle: 'La Forge & Le Râpage',
    description: 'Using Swiss Vallorbe precision needle files and hardened steel mandrels, the raw casting is cold-forged and true-planed to crisp knife-edges.',
    specs: {
      temperature: 'Cold Formed (Work Hardened)',
      weight: '8.4 g Target',
      tolerance: '± 0.01 mm Edge',
      hours: '18 Hours Hand-Filing'
    },
    image: '/images/atelier-workbench.jpg'
  },
  {
    step: '05',
    name: 'Micro-Setting',
    frenchTitle: 'Le Sertissage de Haute Précision',
    description: 'Under 40x Leica stereo microscopes, hardened gravers displace tiny beads of gold to lock each facet in place without exerting uneven pressure on the gemstone pavilion.',
    specs: {
      temperature: 'Controlled 20.5 °C',
      carat: '0.45 ct to 5.3 ct',
      tolerance: 'Micro-Grain 0.005 mm',
      hours: '28 Hours Micro-Bench'
    },
    image: '/images/diamond-ring.jpg'
  },
  {
    step: '06',
    name: 'Five-Stage Polish',
    frenchTitle: 'Le Polissage Miroir',
    description: 'Using graded cotton wheels, felt laps, and diamond-impregnated pastes from coarse pumice to ultrafine cerium oxide, producing the signature liquid-light finish.',
    specs: {
      temperature: 'Wheel Speed 2,800 RPM',
      weight: 'Loss < 0.2% Metal',
      tolerance: 'Optical Mirror Finish',
      hours: '12 Hours Lapping'
    },
    image: '/images/gold-earrings.jpg'
  },
  {
    step: '07',
    name: 'The Hallmark Stamp',
    frenchTitle: 'Le Poinçon d\'État & Maître',
    description: 'The final certification of pedigree: the French Republic Eagle Head hallmark verifying 18k gold purity, joined by the registered Maison Aurenne lozenge master stamp.',
    specs: {
      temperature: 'Ambient',
      weight: 'Certified 18K / 950 Pt',
      tolerance: 'French Guarantee Standard',
      hours: 'Archived Permanently'
    },
    image: '/images/hero-ring.jpg'
  }
];
