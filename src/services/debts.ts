import { supabase } from '@/services/supabase';
import type { Debt, DebtHistoryEntry, DebtInput } from '@/types';

export async function fetchDebts(userId: string): Promise<Debt[]> {
  const { data, error } = await supabase
    .from('debts')
    .select('*')
    .eq('user_id', userId)
    .order('sort_order', { ascending: true });
  if (error) throw error;
  return data ?? [];
}

export async function fetchDebtHistory(userId: string): Promise<DebtHistoryEntry[]> {
  const { data, error } = await supabase
    .from('debt_history')
    .select('*')
    .eq('user_id', userId)
    .order('recorded_at', { ascending: true });
  if (error) throw error;
  return data ?? [];
}

/** Adds a debt and records a baseline debt_history entry so % killed can be computed later. */
export async function addDebt(
  userId: string,
  input: DebtInput
): Promise<{ debt: Debt; history: DebtHistoryEntry }> {
  const { data: debt, error } = await supabase
    .from('debts')
    .insert({ ...input, user_id: userId })
    .select()
    .single();
  if (error) throw error;

  const { data: history, error: historyError } = await supabase
    .from('debt_history')
    .insert({
      user_id: userId,
      debt_id: debt.id,
      balance_before: debt.current_balance,
      balance_after: debt.current_balance,
    })
    .select()
    .single();
  if (historyError) throw historyError;

  return { debt, history };
}

export async function updateDebtDetails(
  id: string,
  input: Partial<Omit<DebtInput, 'current_balance'>>
): Promise<Debt> {
  const { data, error } = await supabase
    .from('debts')
    .update({ ...input, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

/** Updates a debt's current_balance and logs the change to debt_history. */
export async function updateDebtBalance(
  userId: string,
  debt: Debt,
  newBalance: number
): Promise<{ debt: Debt; history: DebtHistoryEntry }> {
  const { data: history, error: historyError } = await supabase
    .from('debt_history')
    .insert({
      user_id: userId,
      debt_id: debt.id,
      balance_before: debt.current_balance,
      balance_after: newBalance,
    })
    .select()
    .single();
  if (historyError) throw historyError;

  const { data, error } = await supabase
    .from('debts')
    .update({ current_balance: newBalance, updated_at: new Date().toISOString() })
    .eq('id', debt.id)
    .select()
    .single();
  if (error) throw error;
  return { debt: data, history };
}

export async function deleteDebt(id: string): Promise<void> {
  const { error } = await supabase.from('debts').delete().eq('id', id);
  if (error) throw error;
}
