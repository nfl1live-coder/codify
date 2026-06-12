import { useState, useEffect, useCallback, useRef } from 'react';
import { AppState, Expense } from './types';
import { useLocalStorage } from './hooks/useLocalStorage';
import { fetchBudget, saveBudget } from './api/client';
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

function getOrCreateSessionId(): string {
  let id = localStorage.getItem('budget-session-id');
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem('budget-session-id', id);
  }
  return id;
}

type SyncStatus = 'idle' | 'saving' | 'saved' | 'offline';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [state, setState] = useLocalStorage<AppState>('budget-tracker', DEFAULT_STATE);
  const [syncStatus, setSyncStatus] = useState<SyncStatus>('idle');
  const [initialized, setInitialized] = useState(false);
  const sessionId = useRef(getOrCreateSessionId());
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Load from MongoDB on mount
  useEffect(() => {
    fetchBudget(sessionId.current).then((data) => {
      if (data) {
        const hasLocalData = state.income > 0 || state.expenses.length > 0 || state.savingsGoal > 0;
        // Prefer MongoDB data if it has content, else keep local
        if (data.income > 0 || data.expenses.length > 0 || data.savingsGoal > 0) {
          setState(data);
        } else if (hasLocalData) {
          // Push local data to MongoDB
          saveBudget(sessionId.current, state);
        }
      }
      setInitialized(true);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const syncToServer = useCallback((newState: AppState) => {
    if (saveTimer.current) clearTimeout(saveTimer.current);
    setSyncStatus('saving');
    saveTimer.current = setTimeout(async () => {
      const ok = await saveBudget(sessionId.current, newState);
      setSyncStatus(ok ? 'saved' : 'offline');
      setTimeout(() => setSyncStatus('idle'), 2000);
    }, 800);
  }, []);

  const update = useCallback((updater: (prev: AppState) => AppState) => {
    setState((prev) => {
      const next = updater(prev);
      syncToServer(next);
      return next;
    });
  }, [setState, syncToServer]);

  const totalExpenses = state.expenses.reduce((s, e) => s + e.amount, 0);
  const netSavings = state.income - totalExpenses;

  const updateIncome = (income: number, currency: string) =>
    update((prev) => ({ ...prev, income, currency }));

  const addExpense = (expense: Expense) =>
    update((prev) => ({ ...prev, expenses: [...prev.expenses, expense] }));

  const deleteExpense = (id: string) =>
    update((prev) => ({ ...prev, expenses: prev.expenses.filter((e) => e.id !== id) }));

  const updateSavingsGoal = (savingsGoal: number) =>
    update((prev) => ({ ...prev, savingsGoal }));

  if (!initialized) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-gray-500 text-sm">Loading your budget...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-6">
      <Header activeTab={activeTab} onTabChange={setActiveTab} syncStatus={syncStatus} />

      <main className="max-w-2xl mx-auto px-4 py-4 space-y-4">
        {activeTab === 'dashboard' && (
          <>
            <SummaryCards state={state} />
            <ExpensePieChart expenses={state.expenses} currency={state.currency} />
          </>
        )}

        {activeTab === 'expenses' && (
          <>
            <IncomeForm income={state.income} currency={state.currency} onUpdate={updateIncome} />
            <ExpenseForm onAdd={addExpense} />
            <ExpenseList expenses={state.expenses} currency={state.currency} onDelete={deleteExpense} />
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

      {/* Mobile bottom navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex md:hidden z-50 shadow-lg">
        {[
          { id: 'dashboard', label: 'Dashboard', icon: '📊' },
          { id: 'expenses', label: 'Expenses', icon: '💳' },
          { id: 'savings', label: 'Savings', icon: '🎯' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex flex-col items-center justify-center py-3 gap-1 transition-colors ${
              activeTab === tab.id
                ? 'text-indigo-600'
                : 'text-gray-400'
            }`}
          >
            <span className="text-xl">{tab.icon}</span>
            <span className="text-[10px] font-medium">{tab.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
