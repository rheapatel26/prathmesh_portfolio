// ============================================================
// CASE STUDIES DATA — dummy/placeholder content, edit freely
// Swap `photo` / `mockup` imports for your own assets in
// src/assets/case-studies/ when ready.
// ============================================================

import photo01 from '@/assets/case-studies/logo 1.png';
import photo02 from '@/assets/case-studies/logo2.png';
import photo03 from '@/assets/case-studies/logo3.png';
import mockup01 from '@/assets/case-studies/IMG_2828.png';
import mockup02 from '@/assets/case-studies/27.png';
import mockup03 from '@/assets/case-studies/mockup.png';
import sticker01 from '@/assets/case-studies/bully_character_line 11.png';
import sticker02 from '@/assets/case-studies/sticker.png';
import sticker03 from '@/assets/case-studies/tempImagekiBsWJ 1.png';

export type CaseStudy = {
  id: string;
  tab: string; // e.g. "_NEXUS_01"
  category: string;
  categoryNumber: string;
  title: string;
  description: { text: string; bold?: boolean }[];
  brief: {
    classification: string;
    role: string;
    year: string;
    status: string;
    problemHeading: string;
    problem: string;
  };
  photo: string;
  mockup: string;
  sticker: string;
  status: 'complete' | 'in-progress';
  cta?: { label: string; href: string };
};

export const caseStudies: CaseStudy[] = [
  {
    id: 'nexus',
    tab: 'DRAW THE LINE',
    category: 'Workshop',
    categoryNumber: '01',
    title: 'CASE STUDY BRIEF — DRAW THE LINE',
    description: [
      { text: 'Draw the Line is a two-day ' },
      { text: 'anti-bullying workshop for Grades 8–10,', bold: true },
      { text: ' designed to help students recognise bullying, build empathy, and confidently stand up as bystanders. We collaborated with Going to School (GTS) to develop the campaign and workshop.' },
    ],
    brief: {
      classification: 'Social Impact · Education & Awareness',
      role: 'Researcher & Designer',
      year: '2026',
      status: 'Completed · Workshop & Campaign',
      problemHeading: 'PROBLEM STATEMENT',
      problem:
        'Bullying often happens in front of others, but bystanders hesitate to act because they don’t know how. Draw the Line helps students recognise bullying and build the confidence to speak up.',
    },
    photo: photo01,
    mockup: mockup01,
    sticker: sticker01,
    status: 'complete',
    cta: { label: 'View Case Study', href: '/case-studies/draw-the-line/index.html' },
  },
  {
    id: 'forma',
    tab: 'KARACHI BAKERY',
    category: 'Rebranding',
    categoryNumber: '02',
    title: 'KARACHI BAKERY REBRANDING',
    description: [
      { text: 'A rebranding project for the iconic Karachi Bakery, a Hyderabad-born Indian bakery best known for its biscuits, especially its signature fruit biscuits. ', bold: true },
      { text: 'The project reimagines the brand’s heritage through a modern, premium visual identity, while retaining the familiarity and nostalgia associated with the brand.' },
    ],
    brief: {
      classification: 'Brand Identity · Rebranding',
      role: 'Brand Strategist & Designer',
      year: '2026',
      status: 'Completed · Brand Identity Exploration',
      problemHeading: 'PROBLEM STATEMENT',
      problem:
        'Karachi Bakery is an iconic Hyderabad-born bakery known for its signature biscuits and strong heritage. This project explores how the brand can be reimagined for a contemporary audience while retaining its nostalgia, familiarity, and legacy.',
    },
    photo: photo02,
    mockup: mockup02,
    sticker: sticker02,
    status: 'complete',
    cta: { label: 'View Case Study', href: '#' },
  },
  {
    id: 'pulse',
    tab: ' MANAM CHOCOLATE',
    category: 'Packaging Design',
    categoryNumber: '03',
    title: 'MANAM CHOCOLATE FESTIVE DESIGNING',
    description: [
      { text: 'Manam Chocolate Packaging is a festive packaging design for Manam Chocolate’s Rakshabandhan Edition, combining traditional Indian rakhi-inspired elements with a modern, premium aesthetic. The design focuses on bold colours, minimal typography, and a unique gifting experience. ' },
    ],
    brief: {
      classification: 'Packaging Design · Festive Edition',
      role: 'Packaging Designer',
      year: '2026',
      status: 'Completed · Concept Development',
      problemHeading: 'PROBLEM STATEMENT',
      problem:
        'A festive packaging concept for Manam Chocolate’s Rakshabandhan Edition, blending traditional Indian rakhi-inspired motifs with a modern, premium visual language to create a vibrant yet elegant gifting experience.',
    },
    photo: photo03,
    mockup: mockup03,
    sticker: sticker03,
    status: 'in-progress',
  },
];
