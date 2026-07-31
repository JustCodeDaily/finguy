import { create } from 'zustand';

export const CURRENCIES = [
  { code: 'INR', label: 'India', flag: '🇮🇳' },
  { code: 'EUR', label: 'Europe', flag: '🇪🇺' },
  { code: 'USD', label: 'USA', flag: '🇺🇸' },
  { code: 'SLR', label: 'Sri Lanka', flag: '🇱🇰' },
  { code: 'MYR', label: 'Malaysia', flag: '🇲🇾' },
] as const;

export type CurrencyCode = (typeof CURRENCIES)[number]['code'];

type OnboardingState = {
  firstName: string;
  lastName: string;
  preferredName: string;
  currency: CurrencyCode;
  setField: (field: 'firstName' | 'lastName' | 'preferredName', value: string) => void;
  setCurrency: (currency: CurrencyCode) => void;
};

export const useOnboardingStore = create<OnboardingState>((set) => ({
  firstName: '',
  lastName: '',
  preferredName: '',
  currency: 'USD',
  setField: (field, value) => set({ [field]: value }),
  setCurrency: (currency) => set({ currency }),
}));
