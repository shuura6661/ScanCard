export interface BusinessCard {
  name: string;
  jobTitle: string;
  company: string;
  email: string;
  phone: string;
  website: string;
  linkedin: string;
  twitter: string;
  github: string;
  profileImage: string;
  description: string; // Added personal description field
}

export interface Theme {
  id: string;
  name: string;
  bgColor: string;
  textColor: string;
  accentColor: string;
}

export const defaultThemes: Theme[] = [
  {
    id: 'tech',
    name: 'Tech',
    bgColor: '#0F172A',
    textColor: '#E2E8F0',
    accentColor: '#3B82F6'
  },
  {
    id: 'corporate',
    name: 'Corporate',
    bgColor: '#FFFFFF',
    textColor: '#1E293B',
    accentColor: '#475569'
  },
  {
    id: 'creative',
    name: 'Creative',
    bgColor: '#FEFCE8',
    textColor: '#713F12',
    accentColor: '#EAB308'
  },
  {
    id: 'medical',
    name: 'Medical',
    bgColor: '#F0FDF4',
    textColor: '#14532D',
    accentColor: '#22C55E'
  },
  {
    id: 'construction',
    name: 'Construction',
    bgColor: '#292524',
    textColor: '#FAFAF9',
    accentColor: '#F97316'
  },
  {
    id: 'public-service',
    name: 'Public Service',
    bgColor: '#083344',
    textColor: '#ECFEFF',
    accentColor: '#06B6D4'
  },
  {
    id: 'education',
    name: 'Education',
    bgColor: '#4C1D95',
    textColor: '#F5F3FF',
    accentColor: '#A78BFA'
  }
];