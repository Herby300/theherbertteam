export type Testimonial = {
  quote: string;
  author: string;
  role: string;
  /** Used by the filter chips on /reviews. */
  category?: 'First-Time Buyer' | 'Self-Employed' | 'Move-Up Buyer' | 'Veteran' | 'Investor' | 'Refinance' | 'Partner';
};

export const testimonials: Testimonial[] = [
  {
    quote: 'Jason made the mortgage process incredibly easy and was always available to answer our questions.',
    author: 'Homebuyer',
    role: 'Austin, TX',
    category: 'First-Time Buyer',
  },
  {
    quote:
      'We thought we could not qualify because we were self-employed. Jason found a solution and got us into our dream home.',
    author: 'Self-Employed Buyer',
    role: 'Business Owner',
    category: 'Self-Employed',
  },
  {
    quote: 'The best mortgage experience we have ever had.',
    author: 'Move-Up Buyer',
    role: 'Georgetown, TX',
    category: 'Move-Up Buyer',
  },
];

/** Categories used for the filter chips on /reviews. */
export const testimonialCategories = [
  'All',
  'First-Time Buyer',
  'Self-Employed',
  'Move-Up Buyer',
  'Veteran',
  'Investor',
  'Refinance',
] as const;

export const testimonialDisclaimer =
  'Testimonials reflect individual experiences. Results vary and are not a guarantee of future outcomes.';
