import { useState } from 'react';
import { AppState, Expense } from './types';
import { useLocalStorage } from './hooks/useLocalStorage';
import Header from './components/Header';
import SummaryCards from './components/SummaryCards';
import ExpensePieChart from './components/ExpensePieChart';
import IncomeForm from './components/IncomeForm';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import SavingsGoalForm from './components/SavingsGoalForm';

const DEFAULT_STATE: AppState = {
  income: 0,
  expenses: [],
  savingsGoal: 0,
  currency: 'USD',
};

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [state, setState] = useLocalStorage<AppState>('budget-tracker', DEFAULT_STATE);

  const totalExpenses = state.expenses.reduce((s, e) => s + e.amount, 0);
  const netSavings = state.income - totalExpenses;

  const updateIncome = (income: number, currency: string) => {
    setState((prev) => ({ ...prev, income, currency }));
  };

  const addExpense = (expense: Expense) => {
    setState((prev) => ({ ...prev, expenses: [...prev.expenses, expense] }));
  };

  const deleteExpense = (id: string) => {
    setState((prev) => ({ ...prev, expenses: prev.expenses.filter((e) => e.id !== id) }));
  };

  const updateSavingsGoal = (savingsGoal: number) => {
    setState((prev) => ({ ...prev, savingsGoal }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="max-w-5xl mx-auto px-4 py-6 space-y-5">
        {activeTab === 'dashboard' && (
          <>
            <SummaryCards state={state} />
            <ExpensePieChart expenses={state.expenses} currency={state.currency} />
          </>
        )}

        {activeTab === 'expenses' && (
          <>
            <IncomeForm
              income={state.income}
              currency={state.currency}
              onUpdate={updateIncome}
            />
            <ExpenseForm onAdd={addExpense} />
            <ExpenseList
              expenses={state.expenses}
              currency={state.currency}
              onDelete={deleteExpense}
            />
          </>
        )}

        {activeTab === 'savings' && (
          <SavingsGoalForm
            savingsGoal={state.savingsGoal}
            currency={state.currency}
            netSavings={netSavings}
            onUpdate={updateSavingsGoal}
          />
        )}
      </main>
    </div>
  );
}
