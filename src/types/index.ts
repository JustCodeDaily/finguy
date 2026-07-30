export interface Expense {
  id: string;
  user_id: string;
  name: string | null;
  category: string;
  amount: number;
  currency: string;
  date: string;
  created_at: string;
  updated_at: string;
}

export type ExpenseInput = Pick<
  Expense,
  'name' | 'category' | 'amount' | 'currency' | 'date'
>;

export interface Debt {
  id: string;
  user_id: string;
  name: string;
  currency: string;
  current_balance: number;
  rate: number;
  emi_pending: number;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export type DebtInput = Pick<
  Debt,
  'name' | 'currency' | 'current_balance' | 'rate' | 'emi_pending' | 'sort_order'
>;

export interface DebtHistoryEntry {
  id: string;
  user_id: string;
  debt_id: string;
  balance_before: number;
  balance_after: number;
  recorded_at: string;
  created_at: string;
}

export interface MonthlyIncome {
  id: string;
  user_id: string;
  month: string;
  income_inr: number | null;
  income_eur: number | null;
  created_at: string;
  updated_at: string;
}

export type ExpenseSortOption = 'date_desc' | 'cost_desc';
export type DebtSortOption = 'name_asc' | 'rate_desc' | 'balance_desc';
