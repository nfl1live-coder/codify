import { AppState } from '../types';

interface Props { state: AppState }

export default function SummaryCards({ state }: Props) {
  const totalExpenses = state.expenses.reduce((sum, e) => sum + e.amount, 0);
  const netSavings = state.income - totalExpenses;
  const savingsRate = state.income > 0 ? (netSavings / state.income) * 100 : 0;
  const goalProgress = state.savingsGoal > 0 ? Math.min((netSavings / state.savingsGoal) * 100, 100) : 0;

  const fmt = (n: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: state.currency, maximumFractionDigits: 0 }).format(n);

  const cards = [
    { title: 'Income', value: fmt(state.income), color: 'bg-blue-500', icon: '💰' },
    { title: 'Expenses', value: fmt(totalExpenses), color: 'bg-rose-500', icon: '📊' },
    { title: 'Savings', value: fmt(netSavings), color: netSavings >= 0 ? 'bg-emerald-500' : 'bg-orange-500', icon: netSavings >= 0 ? '✅' : '⚠️' },
    { title: 'Rate', value: `${savingsRate.toFixed(1)}%`, color: 'bg-purple-500', icon: '📈' },
  ];

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        {cards.map((card) => (
          <div key={card.title} className={`${card.color} rounded-2xl p-4 text-white shadow-md`}>
            <div className="text-2xl mb-2">{card.icon}</div>
            <div className="text-xs font-medium opacity-80">{card.title}</div>
            <div className="text-lg font-bold mt-0.5 truncate">{card.value}</div>
          </div>
        ))}
      </div>

      {state.savingsGoal > 0 && (
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <div className="flex justify-between text-sm mb-2">
            <span className="font-medium text-gray-700">Goal Progress</span>
            <span className="text-indigo-600 font-bold">{goalProgress.toFixed(0)}%</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-indigo-500 to-purple-500 h-3 rounded-full transition-all duration-700"
              style={{ width: `${goalProgress}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-400 mt-1.5">
            <span>{fmt(Math.max(0, netSavings))} this month</span>
            <span>Goal: {fmt(state.savingsGoal)}</span>
          </div>
        </div>
      )}
    </div>
  );
}
