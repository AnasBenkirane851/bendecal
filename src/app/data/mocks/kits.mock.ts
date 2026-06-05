import { Kit } from '../../core/models/kit.model';
import { withDefaultKitImages } from './kit-images';

const KITS_RAW: Kit[] = [
  {
    id: 'kit-001',
    slug: 'yzf-r6-race-replica',
    name: 'YZF-R6 Race Replica',
    shortDescription: 'Full fairing graphics for track-inspired look.',
    description:
      'Complete decal kit for Yamaha YZF-R6 including tank, tail, and fairing panels. High-tack cast vinyl with laminate for fuel resistance.',
    images: [
      'kits/yzf-r6-race-replica/hero.webp',
      'kits/yzf-r6-race-replica/on-bike.webp',
    ],
    fitments: [
      { make: 'Yamaha', model: 'YZF-R6', yearFrom: 2017, yearTo: 2020 },
    ],
    variants: [
      {
        id: 'v-001-a',
        label: 'Matte black / red',
        sku: 'YR6-RB-M',
        priceCents: 18900,
        colorHex: '#18181b',
      },
      {
        id: 'v-001-b',
        label: 'Gloss white / blue',
        sku: 'YR6-WB-G',
        priceCents: 19900,
        colorHex: '#f8fafc',
      },
      {
        id: 'v-001-c',
        label: 'Carbon effect',
        sku: 'YR6-CF-M',
        priceCents: 20900,
        colorHex: '#52525b',
      },
    ],
    includes: [
      'Tank panels (2)',
      'Tail unit',
      'Front fairing (L/R)',
      'Windscreen outline',
      'Install guide PDF',
    ],
    featured: true,
  },
  {
    id: 'kit-002',
    slug: 'cbr600rr-legacy-stripe',
    name: 'CBR600RR Legacy Stripe',
    shortDescription: 'Classic Honda stripe layout with modern finish.',
    description:
      'Stripe and number-panel kit designed for CBR600RR fairings. Ideal for street and occasional track use.',
    images: [],
    fitments: [
      { make: 'Honda', model: 'CBR600RR', yearFrom: 2013, yearTo: 2017 },
    ],
    variants: [
      {
        id: 'v-002-a',
        label: 'Pearl white / red',
        sku: 'CBR-PWR-G',
        priceCents: 17500,
        colorHex: '#fef2f2',
      },
      {
        id: 'v-002-b',
        label: 'Matte grey / orange',
        sku: 'CBR-MGO-M',
        priceCents: 17500,
        colorHex: '#a1a1aa',
      },
    ],
    includes: [
      'Upper fairing stripes',
      'Side panels',
      'Tail stripe set',
      'Tank accents',
      'Squeegee kit',
    ],
    featured: true,
  },
  {
    id: 'kit-003',
    slug: 'ninja-650-urban-camo',
    name: 'Ninja 650 Urban Camo',
    shortDescription: 'Subtle camo panels for everyday riders.',
    description:
      'Urban camo pattern scaled for Kawasaki Ninja 650 body lines. Matte laminate included.',
    images: [],
    fitments: [
      { make: 'Kawasaki', model: 'Ninja 650', yearFrom: 2018, yearTo: 2024 },
    ],
    variants: [
      {
        id: 'v-003-a',
        label: 'Grey camo',
        sku: 'N650-GC-M',
        priceCents: 14900,
        colorHex: '#71717a',
      },
      {
        id: 'v-003-b',
        label: 'Green camo',
        sku: 'N650-GR-M',
        priceCents: 14900,
        colorHex: '#166534',
      },
    ],
    includes: [
      'Tank wrap',
      'Tail shroud',
      'Side fairing panels',
      'Install guide PDF',
    ],
    featured: true,
  },
  {
    id: 'kit-004',
    slug: 'mt-07-minimal-outline',
    name: 'MT-07 Minimal Outline',
    shortDescription: 'Clean outline graphics for naked bikes.',
    description:
      'Minimal line-work kit highlighting the MT-07 tank and tail shapes without full coverage.',
    images: [],
    fitments: [
      { make: 'Yamaha', model: 'MT-07', yearFrom: 2018, yearTo: 2024 },
    ],
    variants: [
      {
        id: 'v-004-a',
        label: 'Reflective white',
        sku: 'MT7-RW-G',
        priceCents: 9900,
        colorHex: '#fafafa',
      },
      {
        id: 'v-004-b',
        label: 'Matte yellow',
        sku: 'MT7-MY-M',
        priceCents: 9900,
        colorHex: '#eab308',
      },
    ],
    includes: ['Tank outlines', 'Tail accents', 'Fork guard stripes'],
  },
  {
    id: 'kit-005',
    slug: 'gsx-r750-championship',
    name: 'GSX-R750 Championship',
    shortDescription: 'Bold Suzuki factory-inspired scheme.',
    description:
      'Championship edition graphics for GSX-R750 with deep blue and white contrast panels.',
    images: [],
    fitments: [
      { make: 'Suzuki', model: 'GSX-R750', yearFrom: 2016, yearTo: 2020 },
    ],
    variants: [
      {
        id: 'v-005-a',
        label: 'Blue / white',
        sku: 'GSX-BW-G',
        priceCents: 19500,
        colorHex: '#1d4ed8',
      },
      {
        id: 'v-005-b',
        label: 'Black / gold',
        sku: 'GSX-BG-M',
        priceCents: 20500,
        colorHex: '#18181b',
      },
    ],
    includes: [
      'Full fairing set',
      'Tank',
      'Tail',
      'Windscreen border',
      'Number boards',
    ],
    featured: true,
  },
  {
    id: 'kit-006',
    slug: 'africa-twin-adventure-strip',
    name: 'Africa Twin Adventure Strip',
    shortDescription: 'Adventure bike striping for touring builds.',
    description:
      'Adventure-oriented strip kit for CRF1100L Africa Twin with extra tank protection panels.',
    images: [],
    fitments: [
      {
        make: 'Honda',
        model: 'CRF1100L Africa Twin',
        yearFrom: 2020,
        yearTo: 2024,
      },
    ],
    variants: [
      {
        id: 'v-006-a',
        label: 'Sand / black',
        sku: 'AT-SB-M',
        priceCents: 16500,
        colorHex: '#d6d3d1',
      },
      {
        id: 'v-006-b',
        label: 'Orange / grey',
        sku: 'AT-OG-M',
        priceCents: 16500,
        colorHex: '#ea580c',
      },
    ],
    includes: ['Tank strips', 'Beak accents', 'Pannier outline', 'Tail panel'],
  },
  {
    id: 'kit-007',
    slug: 'z900-street-neon',
    name: 'Z900 Street Neon',
    shortDescription: 'Neon accent kit for urban street builds.',
    description:
      'Neon-inspired accents for Kawasaki Z900 with UV-resistant fluorescent vinyl options.',
    images: [],
    fitments: [
      { make: 'Kawasaki', model: 'Z900', yearFrom: 2017, yearTo: 2023 },
    ],
    variants: [
      {
        id: 'v-007-a',
        label: 'Neon green',
        sku: 'Z9-NG-G',
        priceCents: 12900,
        colorHex: '#22c55e',
      },
      {
        id: 'v-007-b',
        label: 'Neon pink',
        sku: 'Z9-NP-G',
        priceCents: 12900,
        colorHex: '#ec4899',
      },
    ],
    includes: ['Tank sides', 'Tail band', 'Radiator shroud accents'],
  },
  {
    id: 'kit-008',
    slug: 'r125-learner-pack',
    name: 'R125 Learner Pack',
    shortDescription: 'Entry kit sized for A1 machines.',
    description:
      'Budget-friendly partial kit for Yamaha YZF-R125 with easy install sections for new riders.',
    images: [],
    fitments: [
      { make: 'Yamaha', model: 'YZF-R125', yearFrom: 2019, yearTo: 2024 },
    ],
    variants: [
      {
        id: 'v-008-a',
        label: 'Blue fade',
        sku: 'R125-BF-M',
        priceCents: 7900,
        colorHex: '#3b82f6',
      },
      {
        id: 'v-008-b',
        label: 'Red fade',
        sku: 'R125-RF-M',
        priceCents: 7900,
        colorHex: '#dc2626',
      },
    ],
    includes: ['Tank', 'Tail', 'Front number plate'],
  },
  {
    id: 'kit-009',
    slug: 'panigale-v2-italia',
    name: 'Panigale V2 Italia',
    shortDescription: 'Italian flag inspired superbike graphics.',
    description:
      'Premium kit for Ducati Panigale V2 with tricolor elements and clear coat safe adhesive.',
    images: [],
    fitments: [
      { make: 'Ducati', model: 'Panigale V2', yearFrom: 2020, yearTo: 2024 },
    ],
    variants: [
      {
        id: 'v-009-a',
        label: 'Italia gloss',
        sku: 'PAV2-IT-G',
        priceCents: 24900,
        colorHex: '#16a34a',
      },
      {
        id: 'v-009-b',
        label: 'Nero matte',
        sku: 'PAV2-NM-M',
        priceCents: 23900,
        colorHex: '#0a0a0a',
      },
    ],
    includes: [
      'Front fairing',
      'Side fairings',
      'Tail',
      'Tank',
      'Windscreen film',
    ],
  },
  {
    id: 'kit-010',
    slug: 'cb650r-retro-block',
    name: 'CB650R Retro Block',
    shortDescription: 'Retro block color panels for neo-retro styling.',
    description:
      'Block color sections for Honda CB650R emphasizing the neo-retro tank shape.',
    images: [],
    fitments: [
      { make: 'Honda', model: 'CB650R', yearFrom: 2019, yearTo: 2024 },
    ],
    variants: [
      {
        id: 'v-010-a',
        label: 'Cream / brown',
        sku: 'CB65-CB-M',
        priceCents: 11900,
        colorHex: '#fef3c7',
      },
      {
        id: 'v-010-b',
        label: 'Grey / black',
        sku: 'CB65-GB-M',
        priceCents: 11900,
        colorHex: '#6b7280',
      },
    ],
    includes: ['Tank blocks', 'Tail cover', 'Side cover accents'],
  },
  {
    id: 'kit-011',
    slug: 'versys-650-tourer',
    name: 'Versys 650 Tourer',
    shortDescription: 'Touring accents for long-distance setups.',
    description:
      'Touring-focused graphics for Versys 650 including pannier-friendly panel layouts.',
    images: [],
    fitments: [
      { make: 'Kawasaki', model: 'Versys 650', yearFrom: 2015, yearTo: 2021 },
    ],
    variants: [
      {
        id: 'v-011-a',
        label: 'Graphite',
        sku: 'V650-G-M',
        priceCents: 13900,
        colorHex: '#4b5563',
      },
    ],
    includes: ['Tank', 'Beak', 'Side panels', 'Pannier stripes'],
  },
  {
    id: 'kit-012',
    slug: 'yzf-r1-m-pace',
    name: 'YZF-R1 M Pace',
    shortDescription: 'MotoGP pace livery for flagship Yamaha.',
    description:
      'High-coverage kit for YZF-R1 with M-spec accent lines and sponsor-style panels.',
    images: [],
    fitments: [
      { make: 'Yamaha', model: 'YZF-R1', yearFrom: 2015, yearTo: 2018 },
    ],
    variants: [
      {
        id: 'v-012-a',
        label: 'Velocity blue',
        sku: 'R1-VB-G',
        priceCents: 22900,
        colorHex: '#2563eb',
      },
      {
        id: 'v-012-b',
        label: 'Night black',
        sku: 'R1-NB-M',
        priceCents: 22900,
        colorHex: '#09090b',
      },
    ],
    includes: [
      'Full fairing',
      'Tank',
      'Tail',
      'Seat cowl',
      'Install guide PDF',
    ],
  },
  {
    id: 'kit-013',
    slug: 'cbr1000rr-fireblade',
    name: 'CBR1000RR Fireblade',
    shortDescription: 'Fireblade anniversary color scheme.',
    description:
      'Anniversary-inspired graphics for CBR1000RR with heat-resistant tank film.',
    images: [],
    fitments: [
      { make: 'Honda', model: 'CBR1000RR', yearFrom: 2017, yearTo: 2020 },
    ],
    variants: [
      {
        id: 'v-013-a',
        label: 'HRC red',
        sku: 'CB1K-HR-G',
        priceCents: 21500,
        colorHex: '#dc2626',
      },
      {
        id: 'v-013-b',
        label: 'Pearl white',
        sku: 'CB1K-PW-G',
        priceCents: 21500,
        colorHex: '#f1f5f9',
      },
    ],
    includes: ['Fairing kit', 'Tank', 'Tail', 'Lower belly pan'],
  },
  {
    id: 'kit-014',
    slug: 'ninja-h2-carbon-flash',
    name: 'Ninja H2 Carbon Flash',
    shortDescription: 'Carbon-look flashes for forced-induction icon.',
    description:
      'Carbon-effect flash panels for Ninja H2 bodywork with gloss DOM finish.',
    images: [],
    fitments: [
      { make: 'Kawasaki', model: 'Ninja H2', yearFrom: 2019, yearTo: 2023 },
    ],
    variants: [
      {
        id: 'v-014-a',
        label: 'Carbon flash',
        sku: 'H2-CF-G',
        priceCents: 27900,
        colorHex: '#27272a',
      },
    ],
    includes: [
      'Side fairing flashes',
      'Tank spine',
      'Tail accent',
      'Winglet tips',
    ],
  },
  {
    id: 'kit-015',
    slug: 'mt-09-sp-dark',
    name: 'MT-09 SP Dark',
    shortDescription: 'Dark factory SP styling for hyper-naked.',
    description:
      'SP dark edition graphics for MT-09 with subtle metallic flake option.',
    images: [],
    fitments: [
      { make: 'Yamaha', model: 'MT-09', yearFrom: 2017, yearTo: 2020 },
    ],
    variants: [
      {
        id: 'v-015-a',
        label: 'Dark metallic',
        sku: 'MT9-DM-M',
        priceCents: 10900,
        colorHex: '#3f3f46',
      },
      {
        id: 'v-015-b',
        label: 'Ice white',
        sku: 'MT9-IW-G',
        priceCents: 10900,
        colorHex: '#e2e8f0',
      },
    ],
    includes: ['Tank', 'Tail', 'Side radiator shrouds'],
  },
  {
    id: 'kit-016',
    slug: 'gsx-s1000-streetfighter',
    name: 'GSX-S1000 Streetfighter',
    shortDescription: 'Aggressive streetfighter graphics package.',
    description:
      'Streetfighter layout for GSX-S1000 with sharp angular panel breaks.',
    images: [],
    fitments: [
      { make: 'Suzuki', model: 'GSX-S1000', yearFrom: 2015, yearTo: 2020 },
    ],
    variants: [
      {
        id: 'v-016-a',
        label: 'Yellow / black',
        sku: 'GSXS-YB-M',
        priceCents: 12500,
        colorHex: '#facc15',
      },
      {
        id: 'v-016-b',
        label: 'Silver / red',
        sku: 'GSXS-SR-G',
        priceCents: 12500,
        colorHex: '#94a3b8',
      },
    ],
    includes: ['Tank', 'Tail', 'Side panels', 'Headlight surround'],
  },
  {
    id: 'kit-017',
    slug: 'monster-821-stripe',
    name: 'Monster 821 Stripe',
    shortDescription: 'Minimal stripes for Ducati Monster.',
    description:
      'Stripe kit for Monster 821 tank and tail with premium cast vinyl.',
    images: [],
    fitments: [
      { make: 'Ducati', model: 'Monster 821', yearFrom: 2016, yearTo: 2020 },
    ],
    variants: [
      {
        id: 'v-017-a',
        label: 'Racing red',
        sku: 'M821-RR-G',
        priceCents: 8900,
        colorHex: '#b91c1c',
      },
    ],
    includes: ['Tank stripes', 'Tail band', 'Side cover accents'],
  },
];

export const KITS_MOCK: Kit[] = KITS_RAW.map(withDefaultKitImages);
