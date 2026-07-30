import { create } from 'zustand';
import * as expensesService from '@/services/expenses';
import type { Expense, ExpenseInput, ExpenseSortOption } from '@/types';

interface ExpenseState {
  expenses: Expense[];
  loading: boolean;
  sortOption: ExpenseSortOption;
  setExpenses: (expenses: Expense[]) => void;
  setLoading: (loading: boolean) => void;
  setSortOption: (option: ExpenseSortOption) => void;
  addExpense: (userId: string, input: ExpenseInput) => Promise<void>;
  editExpense: (id: string, input: Partial<ExpenseInput>) => Promise<void>;
  removeExpense: (id: string) => Promise<void>;
}

export const useExpenseStore = create<ExpenseState>((set, get) => ({
  expenses: [],
  loading: false,
  sortOption: 'date_desc',
  setExpenses: (expenses) => set({ expenses }),
  setLoading: (loading) => set({ loading }),
  setSortOption: (sortOption) => set({ sortOption }),

  addExpense: async (userId, input) => {
    const created = await expensesService.addExpense(userId, input);
    set({ expenses: [created, ...get().expenses] });
  },

  editExpense: async (id, input) => {
    const updated = await expensesService.updateExpense(id, input);
    set({ expenses: get().expenses.map((e) => (e.id === id ? updated : e)) });
  },

  removeExpense: async (id) => {
    await expensesService.deleteExpense(id);
    set({ expenses: get().expenses.filter((e) => e.id !== id) });
  },
}));

export function sortExpenses(expenses: Expense[], option: ExpenseSortOption): Expense[] {
  const sorted = [...expenses];
  if (option === 'cost_desc') {
    sorted.sort((a, b) => b.amount - a.amount);
  } else {
    sorted.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }
  return sorted;
}
