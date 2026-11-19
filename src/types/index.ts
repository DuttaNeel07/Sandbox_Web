export interface Track {
  id: string;
  bitIndex: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  binaryCode: string;
}

export interface TimelineEvent {
  phase: string;
  timeframe: string;
  title: string;
  description: string;
  status: 'past' | 'active' | 'upcoming';
  registerTag: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'logistics' | 'technical';
}

export interface PastSponsor {
  name: string;
  tier: string;
  role: string;
}
