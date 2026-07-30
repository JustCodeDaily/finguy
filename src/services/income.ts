import { supabase } from '@/services/supabase';
import type { MonthlyIncome } from '@/types';

export async function fetchIncomeForMonth(
  userId: string,
  month: string
): Promise<MonthlyIncome | null> {
  const { data, error } = await supabase
    .from('monthly_income')
    .select('*')
    .eq('user_id', userId)
    .eq('month', month)
    .maybeSingle();
  if (error) throw error;
  return data;
}

export async function upsertIncome(
  userId: string,
  month: string,
  incomeInr: number | null,
  incomeEur: number | null
): Promise<MonthlyIncome> {
  const { data, error } = await supabase
    .from('monthly_income')
    .upsert(
      {
        user_id: userId,
        month,
        income_inr: incomeInr,
        income_eur: incomeEur,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'user_id,month' }
    )
    .select()
    .single();
  if (error) throw error;
  return data;
}
