import { AppState } from '../types';

export async function fetchBudget(sessionId: string): Promise<AppState | null> {
  try {
    const res = await fetch(`/api/budget/${sessionId}`);
    if (!res.ok) return null;
    const data = await res.json();
    return {
      income: data.income ?? 0,
      expenses: data.expenses ?? [],
      savingsGoal: data.savingsGoal ?? 0,
      currency: data.currency ?? 'USD',
    };
  } catch {
    return null;
  }
}

export async function saveBudget(sessionId: string, state: AppState): Promise<boolean> {
  try {
    const res = await fetch(`/api/budget/${sessionId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(state),
    });
    return res.ok;
  } catch {
    return false;
  }
}
