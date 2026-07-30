import type { Debt, DebtHistoryEntry, Expense } from '@/types';

/** Sums a list of {amount, currency} items, grouped by currency. */
export function sumByCurrency<T>(
  items: T[],
  getCurrency: (item: T) => string,
  getAmount: (item: T) => number
): Record<string, number> {
  const totals: Record<string, number> = {};
  for (const item of items) {
    const currency = getCurrency(item);
    totals[currency] = (totals[currency] ?? 0) + getAmount(item);
  }
  return totals;
}

export function sumExpensesByCurrency(expenses: Expense[]): Record<string, number> {
  return sumByCurrency(expenses, (e) => e.currency, (e) => e.amount);
}

/** Maps each debt_id to the balance recorded in its earliest history entry (the original principal). */
export function originalBalancesByDebt(
  history: DebtHistoryEntry[]
): Record<string, number> {
  const sorted = [...history].sort(
    (a, b) => new Date(a.recorded_at).getTime() - new Date(b.recorded_at).getTime()
  );
  const original: Record<string, number> = {};
  for (const entry of sorted) {
    if (!(entry.debt_id in original)) {
      original[entry.debt_id] = entry.balance_before;
    }
  }
  return original;
}

/** % of principal paid off. Falls back to 0 when there's no history (freshly added debt). */
export function percentKilled(debt: Debt, originalBalance?: number): number {
  const principal = originalBalance ?? debt.current_balance;
  if (principal <= 0) return 0;
  const killed = ((principal - debt.current_balance) / principal) * 100;
  return Math.min(100, Math.max(0, killed));
}

/** Sums (balance_before - balance_after) for history entries recorded within the given month. */
export function debtPaymentsInMonth(
  history: DebtHistoryEntry[],
  monthKey: string,
  currencyByDebtId: Record<string, string>
): Record<string, number> {
  const monthPrefix = monthKey.slice(0, 7);
  const inMonth = history.filter((h) => h.recorded_at.slice(0, 7) === monthPrefix);
  return sumByCurrency(
    inMonth,
    (h) => currencyByDebtId[h.debt_id] ?? '',
    (h) => h.balance_before - h.balance_after
  );
}

/** Returns amount as a percentage of income, or null when income is 0/undefined. */
export function percentOfIncome(amount: number, income: number | null | undefined): number | null {
  if (!income || income <= 0) return null;
  return (amount / income) * 100;
}
