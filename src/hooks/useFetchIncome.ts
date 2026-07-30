import { useCallback, useEffect, useState } from 'react';
import { fetchIncomeForMonth, upsertIncome } from '@/services/income';
import { currentMonthKey } from '@/utils/format';
import type { MonthlyIncome } from '@/types';

/** Fetches (and lets you upsert) the current month's income for the given user. */
export function useFetchIncome(userId: string | undefined) {
  const [income, setIncome] = useState<MonthlyIncome | null>(null);
  const [loading, setLoading] = useState(false);
  const month = currentMonthKey();

  const refetch = useCallback(async () => {
    if (!userId) return;
    setLoading(true);
    try {
      const data = await fetchIncomeForMonth(userId, month);
      setIncome(data);
    } finally {
      setLoading(false);
    }
  }, [userId, month]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const saveIncome = useCallback(
    async (incomeInr: number | null, incomeEur: number | null) => {
      if (!userId) return;
      const updated = await upsertIncome(userId, month, incomeInr, incomeEur);
      setIncome(updated);
    },
    [userId, month]
  );

  return { income, loading, refetch, saveIncome };
}
