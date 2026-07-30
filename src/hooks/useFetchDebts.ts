import { useCallback, useEffect } from 'react';
import { fetchDebts, fetchDebtHistory } from '@/services/debts';
import { useDebtStore } from '@/store/debtStore';

/** Fetches debts + debt history for the given user on mount and exposes a refetch function. */
export function useFetchDebts(userId: string | undefined) {
  const setDebts = useDebtStore((s) => s.setDebts);
  const setHistory = useDebtStore((s) => s.setHistory);
  const setLoading = useDebtStore((s) => s.setLoading);

  const refetch = useCallback(async () => {
    if (!userId) return;
    setLoading(true);
    try {
      const [debts, history] = await Promise.all([
        fetchDebts(userId),
        fetchDebtHistory(userId),
      ]);
      setDebts(debts);
      setHistory(history);
    } finally {
      setLoading(false);
    }
  }, [userId, setDebts, setHistory, setLoading]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { refetch };
}
