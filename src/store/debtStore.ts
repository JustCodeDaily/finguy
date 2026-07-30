import { create } from 'zustand';
import * as debtsService from '@/services/debts';
import { originalBalancesByDebt, percentKilled } from '@/utils/calculate';
import type { Debt, DebtHistoryEntry, DebtInput, DebtSortOption } from '@/types';

interface DebtState {
  debts: Debt[];
  history: DebtHistoryEntry[];
  loading: boolean;
  sortOption: DebtSortOption;
  setDebts: (debts: Debt[]) => void;
  setHistory: (history: DebtHistoryEntry[]) => void;
  setLoading: (loading: boolean) => void;
  setSortOption: (option: DebtSortOption) => void;
  addDebt: (userId: string, input: DebtInput) => Promise<void>;
  editDebtDetails: (
    id: string,
    input: Partial<Omit<DebtInput, 'current_balance'>>
  ) => Promise<void>;
  updateBalance: (userId: string, debt: Debt, newBalance: number) => Promise<void>;
  removeDebt: (id: string) => Promise<void>;
}

export const useDebtStore = create<DebtState>((set, get) => ({
  debts: [],
  history: [],
  loading: false,
  sortOption: 'name_asc',
  setDebts: (debts) => set({ debts }),
  setHistory: (history) => set({ history }),
  setLoading: (loading) => set({ loading }),
  setSortOption: (sortOption) => set({ sortOption }),

  addDebt: async (userId, input) => {
    const { debt, history } = await debtsService.addDebt(userId, input);
    set({ debts: [...get().debts, debt], history: [...get().history, history] });
  },

  editDebtDetails: async (id, input) => {
    const updated = await debtsService.updateDebtDetails(id, input);
    set({ debts: get().debts.map((d) => (d.id === id ? updated : d)) });
  },

  updateBalance: async (userId, debt, newBalance) => {
    const { debt: updated, history } = await debtsService.updateDebtBalance(
      userId,
      debt,
      newBalance
    );
    set({
      debts: get().debts.map((d) => (d.id === updated.id ? updated : d)),
      history: [...get().history, history],
    });
  },

  removeDebt: async (id) => {
    await debtsService.deleteDebt(id);
    set({ debts: get().debts.filter((d) => d.id !== id) });
  },
}));

export function sortDebts<T extends Debt>(debts: T[], option: DebtSortOption): T[] {
  const sorted = [...debts];
  if (option === 'rate_desc') {
    sorted.sort((a, b) => b.rate - a.rate);
  } else if (option === 'balance_desc') {
    sorted.sort((a, b) => b.current_balance - a.current_balance);
  } else {
    sorted.sort((a, b) => a.name.localeCompare(b.name));
  }
  return sorted;
}

export function debtsWithPercentKilled(
  debts: Debt[],
  history: DebtHistoryEntry[]
): Array<Debt & { percentKilled: number }> {
  const originals = originalBalancesByDebt(history);
  return debts.map((debt) => ({
    ...debt,
    percentKilled: percentKilled(debt, originals[debt.id]),
  }));
}
