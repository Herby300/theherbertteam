export type Resource = {
  title: string;
  description: string;
  image: string;
  fileName: string;
  slug: string;
  icon: string;
};

export const resources: Resource[] = [
  {
    slug: 'homebuyer-guide',
    title: 'Free Homebuyer Guide',
    description:
      'The full playbook: how much house you can actually afford, what lenders look at, how to prepare your credit and cash, and what happens between offer and closing.',
    image: '/images/resources/homebuyer-guide.jpg',
    fileName: 'herbert-team-homebuyer-guide.pdf',
    icon: 'book',
  },
  {
    slug: 'first-time-checklist',
    title: 'First-Time Homebuyer Checklist',
    description:
      'A printable step-by-step checklist so nothing gets missed — from pulling your credit to scheduling the final walkthrough.',
    image: '/images/resources/first-time-checklist.jpg',
    fileName: 'first-time-homebuyer-checklist.pdf',
    icon: 'check-square',
  },
  {
    slug: 'mortgage-process-guide',
    title: 'Mortgage Process Guide',
    description:
      'What actually happens after you apply: processing, underwriting, appraisal, conditions, clear-to-close. Written in plain English with realistic timelines.',
    image: '/images/resources/mortgage-process-guide.jpg',
    fileName: 'mortgage-process-guide.pdf',
    icon: 'file-text',
  },
  {
    slug: 'moving-checklist',
    title: 'Moving Checklist',
    description:
      'The 8-week countdown — utilities, address changes, movers, school records, and the day-of essentials box you will be glad you packed.',
    image: '/images/resources/moving-checklist.jpg',
    fileName: 'moving-checklist.pdf',
    icon: 'truck',
  },
  {
    slug: 'closing-cost-guide',
    title: 'Closing Cost Guide',
    description:
      'Every line item explained: lender fees, title, escrow, prepaids, and Texas-specific costs — plus which ones are negotiable and which are not.',
    image: '/images/resources/closing-cost-guide.jpg',
    fileName: 'closing-cost-guide.pdf',
    icon: 'banknote',
  },
  {
    slug: 'buying-timeline',
    title: 'Home Buying Timeline',
    description:
      'A week-by-week map from first conversation to keys in hand, so you always know what is happening now and what comes next.',
    image: '/images/resources/buying-timeline.jpg',
    fileName: 'home-buying-timeline.pdf',
    icon: 'calendar',
  },
  {
    slug: 'mortgage-calculator',
    title: 'Mortgage Payment Calculator',
    description:
      'Run principal, interest, taxes, insurance, HOA, and PMI in one place — then see the amortization schedule behind the number.',
    image: '/images/resources/homebuyer-guide.jpg',
    fileName: '',
    icon: 'calculator',
  },
];
