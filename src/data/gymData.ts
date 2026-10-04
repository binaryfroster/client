export interface Plan {
  months: number;
  label: string;
  price: number;
  type: 'Regular Training' | 'Personal Training';
}

export interface Goal {
  name: string;
  need: string;
  recommendation: 'Regular Training' | 'Personal Training';
  reason: string;
}

export interface GalleryItem {
  src: string;
  alt: string;
  category: 'All' | 'Training Floor' | 'Strength' | 'Cardio' | 'Gym Environment';
}

export const GYM_METADATA = {
  name: 'Power House Gym & Fitness Center',
  shortName: 'Power House',
  owner: 'Ameer Mullani',
  ownerExperience: '12+ years of experience',
  phone: '+91 9860252720',
  phoneHref: 'tel:+919860252720',
  whatsapp: 'https://wa.me/919860252720?text=Hello%20Power%20House%20Gym%20%26%20Fitness%20Center%2C%20I%E2%80%99m%20interested%20in%20booking%20a%20free%20trial%20session.%20Could%20you%20please%20let%20me%20know%20the%20available%20timings%20and%20how%20I%20can%20get%20started%3F',
  email: 'amirmullani7272@gmail.com',
  instagram: 'https://www.instagram.com/power_house_gym_and_fitness/',
  maps: 'https://maps.app.goo.gl/baXPDWPsxsrzSxm6A',
  mapsEmbed: 'https://www.google.com/maps?q=Power%20House%20Gym%20and%20Fitness%20Center%2C%20Vardhmane%20House%2C%20718%2C%203rd%20Ln%2C%20near%20Nitin%20Medical%2C%20E%20Ward%2C%20Shahupuri%2C%20Kolhapur%2C%20Maharashtra%20416001&z=16&output=embed',
  address: 'Vardhmane House, 718, 3rd Ln, near Nitin Medical, E Ward, Shahupuri, Kolhapur, Maharashtra 416001, India',
  morning: '6:00 AM – 11:30 AM',
  evening: '4:30 PM – 9:00 PM',
  rating: '4.4',
  reviewCount: 48,
  membersServed: '200+'
};

export const MEDIA = {
  logo: '/__l5e/assets-v1/2af281ae-a2d9-4174-95da-3e39cee943d5/power-house-logo.png',
  floor1: '/__l5e/assets-v1/999a7365-6d25-41c6-9039-422f61c11750/gym-floor-1.jpeg',
  floor2: '/__l5e/assets-v1/069c83c9-0c52-4fc3-a585-47e21258efc0/gym-floor-2.jpeg',
  ameer: '/__l5e/assets-v1/b1c39f20-0db3-4049-804f-80a49562f10f/ameer-mullani.jpeg',
  cardio: '/__l5e/assets-v1/4e34613a-5a9f-4229-a167-484b83333d3f/gym-cardio.jpeg',
  equipment: '/__l5e/assets-v1/44e71cbc-eb13-4578-a623-977ff555ca4c/gym-equipment.jpeg',
  introMp4: '/__l5e/assets-v1/16a6db73-973c-4aa6-8333-34654f2ac9e9/power-house-intro.mp4',
  introWebm: '/__l5e/assets-v1/858f4991-caef-42eb-a81a-3a5b1b84b1ed/power-house-intro.webm'
};

export const REGULAR_PLANS: Plan[] = [
  { months: 1, label: '1 Month', price: 1500, type: 'Regular Training' },
  { months: 3, label: '3 Months', price: 4000, type: 'Regular Training' },
  { months: 6, label: '6 Months', price: 6000, type: 'Regular Training' },
  { months: 12, label: '1 Year', price: 9000, type: 'Regular Training' }
];

export const PT_PLANS: Plan[] = [
  { months: 1, label: '1 Month', price: 6000, type: 'Personal Training' },
  { months: 3, label: '3 Months', price: 15000, type: 'Personal Training' },
  { months: 6, label: '6 Months', price: 27500, type: 'Personal Training' },
  { months: 12, label: '1 Year', price: 52500, type: 'Personal Training' }
];

export const DIET_PLAN = {
  name: 'Custom Diet Plan Add-On',
  price: 800,
  inclusions: 'Calorie & macro targets, Kolhapur home food integration, pre/post workout fuel, hydration protocols.'
};

export const TRAINING_EXPERIENCE_COMPARISON = {
  headline: 'The Difference Between Simply Sweating and Truly Progressing',
  subheading: 'Most gym members abandon their fitness journey within 90 days...',
  stats: [
    { num: '100%', label: 'Active Guidance', sub: 'Direct hands-on posture, tempo, and rep monitoring on every single set.' },
    { num: 'Zero', label: 'Wasted Effort', sub: 'No guesswork, random machine surfing, or risking preventable injuries.' }
  ],
  soloMembership: {
    title: 'Solo / Generic Gym Membership',
    badge: 'Higher Risk',
    points: [
      'Copying random workout clips without knowing biomechanics',
      'Unchecked form leading to back, shoulder, and knee wear',
      'Easy to skip difficult sets or skip the gym entirely',
      'Stalled weight loss and mystery strength plateaus'
    ]
  },
  coachingPT: {
    title: 'Power House 1-on-1 Coaching',
    badge: 'Maximum Results',
    points: [
      'Certified coach standing right with you through every movement',
      'Micro-corrections on every rep ensuring zero wasted effort',
      'Reliable accountability—your coach awaits your daily arrival',
      'Documented strength jumps and visible body recomposition'
    ]
  }
};

export const GOALS: Goal[] = [
  {
    name: 'Weight Loss',
    need: 'consistent movement and accountability',
    recommendation: 'Personal Training',
    reason: 'Closer structure and accountability can help you stay consistent toward a specific goal.'
  },
  {
    name: 'Muscle Gain',
    need: 'progressive, structured training',
    recommendation: 'Personal Training',
    reason: 'Individual guidance can add focused structure to exercise selection and progression.'
  },
  {
    name: 'Strength',
    need: 'consistent strength practice',
    recommendation: 'Regular Training',
    reason: 'A fully equipped gym environment supports consistent strength work; PT adds closer guidance if preferred.'
  },
  {
    name: 'Stamina / Endurance',
    need: 'regular conditioning',
    recommendation: 'Regular Training',
    reason: 'A consistent gym routine offers a practical foundation for improving endurance.'
  },
  {
    name: 'General Fitness',
    need: 'a sustainable training routine',
    recommendation: 'Regular Training',
    reason: 'A flexible membership gives you a strong environment for a consistent routine.'
  },
  {
    name: 'Energy / Active Lifestyle',
    need: 'regular movement and habit building',
    recommendation: 'Regular Training',
    reason: 'A consistent schedule can help make activity part of everyday life.'
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    src: MEDIA.floor1,
    alt: 'Power House strength training floor with equipment and mirrors',
    category: 'Strength'
  },
  {
    src: MEDIA.floor2,
    alt: 'Power House main gym floor with strength machines',
    category: 'Training Floor'
  },
  {
    src: MEDIA.cardio,
    alt: 'Power House cardio area with treadmills',
    category: 'Cardio'
  },
  {
    src: MEDIA.equipment,
    alt: 'Power House equipment area with cardio and strength stations',
    category: 'Gym Environment'
  }
];

export interface ReviewItem {
  quote: string;
  name: string;
  initials: string;
  rating: number;
  source: string;
}

export const GOOGLE_REVIEWS_DATA: ReviewItem[] = [
  {
    quote: 'Amazing gym with top-notch equipment! The trainers are extremely supportive and knowledgeable. The black and lime green interior is super motivating. Best gym experience in Kolhapur!',
    name: 'Rahul M.',
    initials: 'RM',
    rating: 5,
    source: 'via Google ✓'
  },
  {
    quote: 'Very clean and well-maintained gym. Started personal training 3 months ago and the results are incredible. The owner personally ensures quality.',
    name: 'Priya S.',
    initials: 'PS',
    rating: 5,
    source: 'via Google ✓'
  },
  {
    quote: 'Affordable membership with great facilities. Love the morning batch — peaceful and focused environment. Highly recommend for beginners.',
    name: 'Amit K.',
    initials: 'AK',
    rating: 5,
    source: 'via Google ✓'
  },
  {
    quote: 'Good gym with nice equipment. Could use a few more cardio machines but overall a great place to train. Staff is friendly and helpful.',
    name: 'Sneha D.',
    initials: 'SD',
    rating: 4,
    source: 'via Google ✓'
  },
  {
    quote: 'Best personal training studio in Shahupuri. The transformation results speak for themselves. Genuine guidance without any shortcuts.',
    name: 'Vishal P.',
    initials: 'VP',
    rating: 5,
    source: 'via Google ✓'
  },
  {
    quote: 'Joined for the free trial and never left! The community here is amazing. Everyone knows each other and the vibe is incredible.',
    name: 'Ankita R.',
    initials: 'AR',
    rating: 5,
    source: 'via Google ✓'
  }
];

export const GOOGLE_RATING_SUMMARY = {
  score: 4.4,
  totalReviews: 48,
  distribution: [
    { stars: 5, percent: 60, count: 29 },
    { stars: 4, percent: 20, count: 10 },
    { stars: 3, percent: 10, count: 5 },
    { stars: 2, percent: 5, count: 2 },
    { stars: 1, percent: 5, count: 2 }
  ]
};

export const REVIEWS = GOOGLE_REVIEWS_DATA.map(r => r.quote);

export const PT_STEPS = [
  { step: '01', title: 'Discussion', desc: 'Speak with Ameer about goals, routine and injury history.' },
  { step: '02', title: 'Assessment', desc: 'Review baseline movement and current conditioning.' },
  { step: '03', title: 'Goal', desc: 'Choose a clear direction (weight loss, muscle gain, strength, general fitness).' },
  { step: '04', title: 'Plan', desc: 'Define weekly sessions, progression structure and training expectations.' },
  { step: '05', title: 'Floor Training', desc: 'Guided one-on-one sessions on the training floor with direct attention.' },
  { step: '06', title: 'Monitoring', desc: 'Review progress and accountability where applicable.' },
  { step: '07', title: 'Diet', desc: 'Diet-routine support may be added where applicable; Diet Plan is ₹1,500 separately.' },
  { step: '08', title: 'Progress', desc: 'Follow a longer-term structured approach built around consistency.' }
];

export const AI_MODULES = [
  'Concierge',
  'Goal Assistant',
  'Plan Analyzer',
  'Membership Advisor',
  'First-Visit Assistant',
  'PT Journey Assistant'
] as const;

export const AI_CHIPS: Record<string, string[]> = {
  'Concierge': [
    'What are the gym timings?',
    'Where exactly is the gym?',
    'How do I book a free trial?'
  ],
  'Goal Assistant': [
    'I want to lose weight',
    'I want to gain muscle',
    'I want more stamina'
  ],
  'Plan Analyzer': [
    'I can train 4 evenings a week',
    'I am starting from zero',
    'I trained before but stopped'
  ],
  'Membership Advisor': [
    'Regular or personal training?',
    'What does 6 months cost?',
    'Is there a diet plan?'
  ],
  'First-Visit Assistant': [
    'What happens on my first visit?',
    'What should I bring?',
    'Do I need to book ahead?'
  ],
  'PT Journey Assistant': [
    'How does personal training work?',
    'What are the 8 steps?',
    'What does PT cost?'
  ]
};

export const formatCurrency = (val: number) => `₹${val.toLocaleString('en-IN')}`;
