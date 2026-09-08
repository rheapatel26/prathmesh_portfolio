// ============================================================
// CASE STUDIES DATA — dummy/placeholder content, edit freely
// Swap `photo` / `mockup` imports for your own assets in
// src/assets/case-studies/ when ready.
// ============================================================

import photo01 from '@/assets/case-studies/photo-01.svg';
import photo02 from '@/assets/case-studies/photo-02.svg';
import photo03 from '@/assets/case-studies/photo-03.svg';
import mockup01 from '@/assets/case-studies/mockup-01.svg';
import mockup02 from '@/assets/case-studies/mockup-02.svg';
import mockup03 from '@/assets/case-studies/mockup-03.svg';

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
  status: 'complete' | 'in-progress';
  cta?: { label: string; href: string };
};

export const caseStudies: CaseStudy[] = [
  {
    id: 'nexus',
    tab: '_NEXUS_01',
    category: 'Web App',
    categoryNumber: '01',
    title: 'DESIGNING A DASHBOARD THAT SURFACES SIGNAL, NOT NOISE.',
    description: [
      { text: 'Most analytics tools drown users in charts nobody asked for. Nexus was built around a different principle: ' },
      { text: 'less data, better decisions.', bold: true },
      { text: ' How I designed a real-time dashboard that only shows a metric when it changes the next action a merchant takes.' },
    ],
    brief: {
      classification: 'Web App · E-commerce Analytics',
      role: 'Lead Designer & Frontend Engineer',
      year: '2024',
      status: 'Complete · Shipped to production',
      problemHeading: 'PROBLEM STATEMENT',
      problem:
        'Placeholder copy — replace with your own. Store owners were spending hours cross-referencing spreadsheets to spot sales anomalies. Existing dashboards buried the one number that mattered under dozens that didn’t.',
    },
    photo: photo01,
    mockup: mockup01,
    status: 'complete',
    cta: { label: 'View Case Study', href: '#' },
  },
  {
    id: 'forma',
    tab: '_FORMA_02',
    category: 'Design Tool',
    categoryNumber: '02',
    title: 'REAL-TIME COLLABORATION WITHOUT THE LAG.',
    description: [
      { text: 'Design tools promise "real-time" collaboration, then choke the moment two people touch the same frame. ' },
      { text: 'Speed is a feature, not an optimization.', bold: true },
      { text: ' How I rebuilt the sync engine so edits feel instant even on a bad connection.' },
    ],
    brief: {
      classification: 'Design Tool · Collaboration Software',
      role: 'Product Designer',
      year: '2024',
      status: 'Complete · Shipped to production',
      problemHeading: 'PROBLEM STATEMENT',
      problem:
        'Placeholder copy — replace with your own. Teams abandoned the tool mid-project once cursors started lagging past two concurrent editors, pushing them back to screenshots and Slack threads.',
    },
    photo: photo02,
    mockup: mockup02,
    status: 'complete',
    cta: { label: 'View Case Study', href: '#' },
  },
  {
    id: 'pulse',
    tab: '_PULSE_03',
    category: 'Mobile App',
    categoryNumber: '03',
    title: 'TURNING WEARABLE NOISE INTO A HEALTH SIGNAL.',
    description: [
      { text: 'Wearables collect more data than anyone can read. ' },
      { text: 'A trend is only useful if it changes what you do tomorrow.', bold: true },
      { text: ' Ongoing research into a recommendation layer that sits on top of raw sensor data.' },
    ],
    brief: {
      classification: 'Mobile App · Health & Wellness',
      role: 'Lead Researcher & Designer',
      year: '2025',
      status: 'Research in progress · Design exploration',
      problemHeading: 'PROBLEM STATEMENT',
      problem:
        'Placeholder copy — replace with your own. Users check their wearable stats daily but rarely change behavior — the data exists, the decision layer on top of it doesn’t.',
    },
    photo: photo03,
    mockup: mockup03,
    status: 'in-progress',
  },
];
