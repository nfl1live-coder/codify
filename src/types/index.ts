export interface Expense {
  id: string;
  name: string;
  amount: number;
  category: ExpenseCategory;
}

export type ExpenseCategory =
  | 'Housing'
  | 'Food'
  | 'Transport'
  | 'Utilities'
  | 'Entertainment'
  | 'Healthcare'
  | 'Education'
  | 'Others';

export const EXPENSE_CATEGORIES: ExpenseCategory[] = [
  'Housing',
  'Food',
  'Transport',
  'Utilities',
  'Entertainment',
  'Healthcare',
  'Education',
  'Others',
];

export const CATEGORY_COLORS: Record<ExpenseCategory, string> = {
  Housing: '#6366f1',
  Food: '#f59e0b',
  Transport: '#10b981',
  Utilities: '#3b82f6',
  Entertainment: '#ec4899',
  Healthcare: '#14b8a6',
  Education: '#8b5cf6',
  Others: '#94a3b8',
};

export interface AppState {
  income: number;
  expenses: Expense[];
  savingsGoal: number;
  currency: string;
}
