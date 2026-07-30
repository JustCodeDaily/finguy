import { useCallback, useEffect } from 'react';
import { fetchExpenses } from '@/services/expenses';
import { useExpenseStore } from '@/store/expenseStore';

/** Fetches expenses for the given user on mount and exposes a refetch function. */
export function useFetchExpenses(userId: string | undefined) {
  const setExpenses = useExpenseStore((s) => s.setExpenses);
  const setLoading = useExpenseStore((s) => s.setLoading);

  const refetch = useCallback(async () => {
    if (!userId) return;
    setLoading(true);
    try {
      const expenses = await fetchExpenses(userId);
      setExpenses(expenses);
    } finally {
      setLoading(false);
    }
  }, [userId, setExpenses, setLoading]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { refetch };
}
