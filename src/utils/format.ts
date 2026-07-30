import { format, parseISO } from 'date-fns';

const CODE_TO_SYMBOL: Record<string, string> = {
  INR: '₹',
  EUR: '€',
};

/** Normalizes a currency code ('INR') or symbol ('₹') to its display symbol. */
export function currencySymbol(currency: string): string {
  return CODE_TO_SYMBOL[currency] ?? currency;
}

/** Formats a number as a currency string, e.g. formatCurrency(1200, '₹') => '₹1,200'. */
export function formatCurrency(amount: number, currency: string): string {
  const symbol = currencySymbol(currency);
  const rounded = Math.round(amount * 100) / 100;
  return `${symbol}${rounded.toLocaleString('en-IN')}`;
}

/** Formats an ISO date string for display, e.g. '10 Jan 2025'. */
export function formatDate(isoDate: string): string {
  return format(parseISO(isoDate), 'd MMM yyyy');
}

/** Formats an ISO date string for display without the year, e.g. '10 Jan'. */
export function formatShortDate(isoDate: string): string {
  return format(parseISO(isoDate), 'd MMM');
}

/** Returns the current month in 'yyyy-MM-01' form, matching monthly_income.month. */
export function currentMonthKey(): string {
  return format(new Date(), 'yyyy-MM-01');
}

/** Returns a display label for the current month, e.g. 'January 2026'. */
export function currentMonthLabel(): string {
  return format(new Date(), 'MMMM yyyy');
}
