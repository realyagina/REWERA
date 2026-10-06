import { Product } from '../types';
import { IMAGES } from '../assets/images';

export const PRODUCTS: Product[] = [
  {
    id: 'rew-001',
    name: 'Aura Draped Linen Maxi Dress',
    slug: 'aura-draped-linen-maxi-dress',
    category: 'Dresses',
    secondaryCategories: ['Resort Wear'],
    price: 589000,
    originalPrice: 650000,
    image: IMAGES.productLinenDress,
    description: 'An ethereal floor-grazing wrap dress designed with an asymmetric draped neckline, adjustable crossover back ties, and a fluid slit. Made to accompany golden hour strolls from Canggu to Seminyak.',
    details: [
      'Asymmetric single-shoulder drape with self-tie closure',
      'High side leg slit for effortless movement',
      'Unlined breathable weave, non-sheer density',
      'Hidden interior waist tie for a customized fit'
    ],
    material: '100% Upcycled Deadstock Linen recovered from boutique atelier cancellations in Denpasar',
    sustainabilityNote: 'Crafted without synthetic dyes. Rescued from landfill waste, saving 1,420 liters of fresh water compared to virgin garment manufacturing.',
    waterSavedLiters: 1420,
    wasteDivertedKg: 0.65,
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Oatmeal Natural', hex: '#E6DFD5', image: IMAGES.productLinenDress },
      { name: 'Terracotta Clay', hex: '#B87A64', image: IMAGES.productLinenDress },
      { name: 'Olive Bark', hex: '#636551', image: IMAGES.productLinenDress }
    ],
    isFeatured: true,
    isBestSeller: true,
    isNew: true,
    careInstructions: 'Hand wash cold with eco-detergent. Line dry in shade. Gentle warm steam only.'
  },
  {
    id: 'rew-002',
    name: 'Selena Upcycled Corset Halter',
    slug: 'selena-upcycled-corset-halter',
    category: 'Tops',
    secondaryCategories: ['Resort Wear'],
    price: 379000,
    originalPrice: 420000,
    image: IMAGES.productCorsetTop,
    description: 'A structured halter corset that juxtaposes classical tailoring with clean Gen Z minimalism. Features subtle flexible boning and an open lace-up rear designed for versatile day-to-night styling.',
    details: [
      'Sculpted curved hemline that sits seamlessly over high-rise bottoms',
      'Reinforced cotton canvas internal boning (non-plastic)',
      'Adjustable criss-cross rear cord ties',
      'Fully lined in certified deadstock unbleached cotton voile'
    ],
    material: 'Surplus tailored suiting fabric remnants (65% Lyocell, 35% Cotton) & organic cotton lining',
    sustainabilityNote: 'Each top is cut from cutting-room offcuts from suiting factories in Bandung, West Java.',
    waterSavedLiters: 890,
    wasteDivertedKg: 0.42,
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Sage Green', hex: '#7A8C74', image: IMAGES.productCorsetTop },
      { name: 'Sand Khaki', hex: '#D1C7B7', image: IMAGES.productCorsetTop },
      { name: 'Charcoal Noir', hex: '#2B2927', image: IMAGES.productCorsetTop }
    ],
    isFeatured: true,
    isBestSeller: true,
    isNew: true,
    careInstructions: 'Cold hand wash or delicate cycle inside a wash bag. Do not wring.'
  },
  {
    id: 'rew-003',
    name: 'Bima Pleated Wide-Leg Palazzos',
    slug: 'bima-pleated-wide-leg-palazzos',
    category: 'Bottoms',
    secondaryCategories: ['Resort Wear'],
    price: 469000,
    image: IMAGES.heroEditorial,
    description: 'Ultra-fluid wide-leg trousers that cascade with every step. Engineered with double forward knife pleats, deep slant pockets, and an elasticated back waistband that combines polish with supreme comfort.',
    details: [
      'Relaxed high-waisted rise with structured flat front waistband',
      'Comfort-stretch back waistband',
      'Deep functional side pockets',
      'Blind-hemmed 31-inch inseam tailored for both sandals and heels'
    ],
    material: '100% Deadstock TENCEL™ Modal & Rayon blend salvaged from excess mill runs',
    sustainabilityNote: 'Silky soft closed-loop modal salvaged from overproduction, preventing thermal waste in landfills.',
    waterSavedLiters: 1150,
    wasteDivertedKg: 0.58,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Raw Cream', hex: '#F0ECE4', image: IMAGES.heroEditorial },
      { name: 'Warm Taupe', hex: '#A89F91', image: IMAGES.heroEditorial },
      { name: 'Mocha Earth', hex: '#5E4C41', image: IMAGES.heroEditorial }
    ],
    isFeatured: true,
    isBestSeller: true,
    careInstructions: 'Machine wash delicate at 30°C. Reshape while damp and air dry.'
  },
  {
    id: 'rew-004',
    name: 'Nusa Asymmetric Linen Vest',
    slug: 'nusa-asymmetric-linen-vest',
    category: 'Tops',
    price: 349000,
    image: IMAGES.fabricsSustainability,
    description: 'A sculptural tailored vest featuring a diagonal button placket and natural hand-carved coconut shell buttons. Can be styled solo as an evening top or unbuttoned over swimwear.',
    details: [
      'Diagonal front overlap with 4 artisanal coconut shell buttons',
      'Pointed asymmetric hemline',
      'Breathable medium-weight slub linen texture',
      'Clean interior French seams throughout'
    ],
    material: 'Upcycled Heavyweight Slub Linen (100% Linen offcuts) with local Balinese coconut husk buttons',
    sustainabilityNote: 'All buttons are hand-carved by local woodcrafters in Tabanan from upcycled coconut husks.',
    waterSavedLiters: 920,
    wasteDivertedKg: 0.38,
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Sand Dune', hex: '#DFD8CC', image: IMAGES.fabricsSustainability },
      { name: 'Muted Moss', hex: '#6D7563', image: IMAGES.fabricsSustainability }
    ],
    isBestSeller: true,
    careInstructions: 'Gentle hand wash. Lay flat to dry away from direct scorching sun.'
  },
  {
    id: 'rew-005',
    name: 'Kala Botanical Slip Sundress',
    slug: 'kala-botanical-slip-sundress',
    category: 'Dresses',
    secondaryCategories: ['Resort Wear'],
    price: 529000,
    originalPrice: 590000,
    image: IMAGES.productLinenDress,
    description: 'An understated bias-cut slip dress infused with serene island grace. Drapes sensually along the silhouette with delicate micro-straps and a gentle cowl neckline.',
    details: [
      'Bias-cut pattern minimizes scrap waste to under 3%',
      'Adjustable back slider straps with brass hardware',
      'Calf-length tea dress length',
      'Dyed naturally with Ketapang leaves and recycled indigo vat baths'
    ],
    material: '100% Deadstock Cupro & Eco-Rayon from garment production surplus',
    sustainabilityNote: 'Naturally plant-dyed by craftswomen in Gianyar without toxic heavy-metal mordants.',
    waterSavedLiters: 1680,
    wasteDivertedKg: 0.52,
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Earthy Clay', hex: '#A86A55', image: IMAGES.productLinenDress },
      { name: 'Pale Sage', hex: '#8F9B88', image: IMAGES.productLinenDress },
      { name: 'Cream Silk', hex: '#EDE8E1', image: IMAGES.productLinenDress }
    ],
    isFeatured: true,
    careInstructions: 'Natural dyes evolve gracefully. Wash separately in cold water with pH-neutral soap.'
  },
  {
    id: 'rew-006',
    name: 'Sari Reconstructed Denim Mini',
    slug: 'sari-reconstructed-denim-mini',
    category: 'Bottoms',
    price: 399000,
    image: IMAGES.productCorsetTop,
    description: 'Every skirt tells a singular story. Assembled from deconstructed pre-loved vintage denim jeans, featuring two-tone contrast paneling and an organic raw hem.',
    details: [
      'Mid-to-high rise waist with vintage metal zipper',
      'Contrasting light and medium indigo panelling',
      'Hand-frayed raw hem with lockstitch prevention',
      'Authentic 5-pocket utility detailing'
    ],
    material: '100% Post-Consumer Upcycled Vintage Denim (100% Cotton)',
    sustainabilityNote: 'Diverted 1.2 pairs of discarded jeans from local secondhand sorting facilities in Bali.',
    waterSavedLiters: 2800,
    wasteDivertedKg: 0.85,
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Contrast Dual Indigo', hex: '#586E82', image: IMAGES.productCorsetTop },
      { name: 'Bleached Sand Denim', hex: '#B5C0C9', image: IMAGES.productCorsetTop }
    ],
    isBestSeller: false,
    isNew: true,
    careInstructions: 'Machine wash cold inside out with like colors. Air dry.'
  },
  {
    id: 'rew-007',
    name: 'Canggu Slouchy Resort Shirt',
    slug: 'canggu-slouchy-resort-shirt',
    category: 'Resort Wear',
    secondaryCategories: ['Tops'],
    price: 429000,
    image: IMAGES.heroEditorial,
    description: 'An effortless boxy resort shirt featuring a relaxed camp collar, dropped shoulders, and side hem vents. The ultimate throw-on layer for beach club lounging or morning coffee.',
    details: [
      'Relaxed gender-neutral boxy cut with dropped shoulder seams',
      'Retro cuban camp collar',
      'Coconut wood buttons with reinforced cross-stitching',
      'Breathable open-weave texture for warm tropical climates'
    ],
    material: '100% Deadstock Textured Linen-Cotton Slub from cancelation inventory',
    sustainabilityNote: 'Saved 950 liters of water; zero synthetic plastic packaging used during transit.',
    waterSavedLiters: 950,
    wasteDivertedKg: 0.44,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Warm Bone', hex: '#ECE7DF', image: IMAGES.heroEditorial },
      { name: 'Toasted Almond', hex: '#B8A896', image: IMAGES.heroEditorial },
      { name: 'Forest Moss', hex: '#4B5543', image: IMAGES.heroEditorial }
    ],
    isFeatured: true,
    careInstructions: 'Machine wash cold on gentle cycle. Hang dry in shade.'
  },
  {
    id: 'rew-008',
    name: 'Raffia & Canvas Upcycled Tote',
    slug: 'raffia-canvas-upcycled-tote',
    category: 'Accessories',
    price: 289000,
    image: IMAGES.fabricsSustainability,
    description: 'A spacious everyday tote woven from renewable pandanus palm fibers and reinforced with deadstock canvas sailcloth. Accommodates a 15-inch laptop, water bottle, and beach essentials.',
    details: [
      'Hand-woven pandanus body with deadstock heavyweight canvas base',
      'Dual sturdy shoulder straps with 26cm drop',
      'Interior zip pocket for phone and keys',
      'Reinforced magnetic snap closure'
    ],
    material: 'Locally harvested natural pandanus grass & 100% deadstock unbleached canvas factory offcuts',
    sustainabilityNote: 'Handmade by women artisan collectives in Karangasem, Bali, supporting fair living wages.',
    waterSavedLiters: 450,
    wasteDivertedKg: 0.48,
    sizes: ['One Size'],
    colors: [
      { name: 'Natural Tan & Canvas', hex: '#D8C6A5', image: IMAGES.fabricsSustainability }
    ],
    isBestSeller: true,
    careInstructions: 'Spot clean canvas with damp cloth. Keep palm fiber dry.'
  },
  {
    id: 'rew-009',
    name: 'Dewi Tiered Resort Sarong Wrap',
    slug: 'dewi-tiered-resort-sarong-wrap',
    category: 'Resort Wear',
    secondaryCategories: ['Bottoms'],
    price: 359000,
    image: IMAGES.productLinenDress,
    description: 'A versatile convertible wrap skirt that transitions effortlessly from poolside cover-up to evening statement piece. Cut with an extended sash tie for endless styling possibilities.',
    details: [
      'Multi-wear design: wear as maxi skirt, halter dress, or beach wrap',
      'Subtle ruffle edge finished with delicate baby hem',
      'Wrinkle-resistant crinkled texture that travels beautifully',
      'Zero-waste pattern engineering'
    ],
    material: '100% Deadstock Crinkle Cotton Voile sourced from garment roll-ends',
    sustainabilityNote: '100% biodegradable natural cotton. Fully compostable at end of product life.',
    waterSavedLiters: 780,
    wasteDivertedKg: 0.35,
    sizes: ['Free Size'],
    colors: [
      { name: 'Sunken Olive', hex: '#58614E', image: IMAGES.productLinenDress },
      { name: 'Pale Shell', hex: '#EDE8E1', image: IMAGES.productLinenDress },
      { name: 'Warm Terracotta', hex: '#A86A55', image: IMAGES.productLinenDress }
    ],
    careInstructions: 'Hand wash cold. Twist and knot lightly while drying for enhanced crinkle effect.'
  },
  {
    id: 'rew-010',
    name: 'Ayu Reversible Silk Scrunchie & Bandana Set',
    slug: 'ayu-reversible-silk-scrunchie-bandana-set',
    category: 'Accessories',
    price: 169000,
    image: IMAGES.fabricsSustainability,
    description: 'A charming duo crafted entirely from micro-remnants of bridal atelier mulberry silk. The square bandana can be tied as a hair scarf, neckerchief, or bag accent, paired with a snag-free silk cloud scrunchie.',
    details: [
      '50cm x 50cm hand-rolled edge bandana scarf',
      'Extra-gentle silk scrunchie with natural latex interior elastic',
      'Zero-damage to hair friction',
      'Delivered in an upcycled linen drawstring keepsake pouch'
    ],
    material: '100% Pure Mulberry Silk remnants (19 momme)',
    sustainabilityNote: 'Constructed from atelier scraps smaller than 60cm that would otherwise be discarded.',
    waterSavedLiters: 320,
    wasteDivertedKg: 0.15,
    sizes: ['One Size'],
    colors: [
      { name: 'Champagne & Sage Duo', hex: '#E2D8C3', image: IMAGES.fabricsSustainability }
    ],
    isNew: true,
    careInstructions: 'Hand wash cold with gentle silk detergent. Dry flat.'
  }
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: 'Clara Santoso',
    age: 22,
    city: 'Jakarta Selatan',
    text: '“REWERA proved that sustainable doesn’t mean boring earthy sacks. The Selena Halter fits like high-end couture, and knowing it was saved from suiting scraps makes wearing it ten times cooler.”',
    purchasedItem: 'Selena Upcycled Corset Halter',
    rating: 5,
    verified: true
  },
  {
    id: 2,
    name: 'Nadia Putri',
    age: 24,
    city: 'Denpasar, Bali',
    text: '“I lived in the Aura Linen Maxi during my entire stay in Uluwatu. The fabric feels so soft and breathing in the tropical humidity is effortless. Truly the Gen Z brand Bali was missing.”',
    purchasedItem: 'Aura Draped Linen Maxi Dress',
    rating: 5,
    verified: true
  },
  {
    id: 3,
    name: 'Maya Kusuma',
    age: 20,
    city: 'Bandung',
    text: '“The transparency regarding water saved and textile origins is so refreshing. Most brands greenwash, but REWERA shows every kilogram diverted and supports fair artisan wages.”',
    purchasedItem: 'Bima Pleated Palazzos',
    rating: 5,
    verified: true
  }
];

export const WHY_REWERA = [
  {
    title: '100% Rescued Textiles',
    subtitle: 'Zero virgin fabrics',
    description: 'We source discarded deadstock rolls, factory roll-ends, and pre-loved garments that would otherwise end up in Indonesian landfills or incinerators.'
  },
  {
    title: 'Zero-Waste Patterning',
    subtitle: 'Under 3% production waste',
    description: 'Our garments are engineered through geometric puzzle cutting. The micro-scraps left over become hair accessories, tote linings, and paper labels.'
  },
  {
    title: 'Bali Artisan Empowerment',
    subtitle: 'Ethical living wages',
    description: 'Every piece is stitched by skilled women artisans in Gianyar and Tabanan, receiving 2.5x regional minimum wage, comprehensive healthcare, and flexible schedules.'
  },
  {
    title: 'The Rewear Loop',
    subtitle: 'Lifetime circular trade-in',
    description: 'Done with your piece? Send it back through our Rewear Loop for 15% store credit. We repair, dye, or re-engineer it for another customer.'
  }
];
