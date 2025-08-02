export interface Language {
  code: string;
  name: string;
  nativeName: string;
  speechCode: string;
}

export interface WelfareScheme {
  id: string;
  name: string;
  description: string;
  category: string;
  targetGroup: string;
  eligibilityDetails: string[];
  benefits: string;
  documents: { name: string; url: string; template_url?: string }[];
  howToApply: string[];
  contact: { name: string; number?: string; email?: string };
  keywords: string[];
}

export interface ConversationMessage {
  type: 'user' | 'assistant';
  text: string;
  timestamp: Date;
  scheme?: WelfareScheme;
}

export interface AIResponse {
  text: string;
  scheme?: WelfareScheme;
  suggestedActions?: string[];
}