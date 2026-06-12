import { AppState } from '../types';

interface Props {
  state: AppState;
}

export default function SummaryCards({ state }: Props) {
  const totalExpenses = state.expenses.reduce((sum, e) => sum + e.amount, 0);
  const netSavings = state.income - totalExpenses;
  const savingsRate = state.income > 0 ? (netSavings / state.income) * 100 : 0;
  const goalProgress = state.savingsGoal > 0 ? Math.min((netSavings / state.savingsGoal) * 100, 100) : 0;

  const fmt = (n: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: state.currency }).format(n);

  const cards = [
    {
      title: 'Monthly Income',
      value: fmt(state.income),
      color: 'from-blue-500 to-blue-600',
      icon: '💰',
    },
    {
      title: 'Total Expenses',
      value: fmt(totalExpenses),
      color: 'from-red-500 to-rose-600',
      icon: '📊',
    },
    {
      title: 'Net Savings',
      value: fmt(netSavings),
      color: netSavings >= 0 ? 'from-emerald-500 to-green-600' : 'from-orange-500 to-red-500',
      icon: netSavings >= 0 ? '✅' : '⚠️',
    },
    {
      title: 'Savings Rate',
      value: `${savingsRate.toFixed(1)}%`,
      color: 'from-purple-500 to-indigo-600',
      icon: '📈',
    },
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {cards.map((card) => (
          <div
            key={card.title}
            className={`bg-gradient-to-br ${card.color} rounded-xl p-4 text-white shadow-md`}
          >
            <div className="text-2xl mb-1">{card.icon}</div>
            <div className="text-xs font-medium opacity-80 mb-1">{card.title}</div>
            <div className="text-lg font-bold truncate">{card.value}</div>
          </div>
        ))}
      </div>

      {state.savingsGoal > 0 && (
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex justify-between text-sm mb-2">
            <span className="font-medium text-gray-700">Savings Goal Progress</span>
            <span className="text-indigo-600 font-semibold">{goalProgress.toFixed(1)}%</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-indigo-500 to-purple-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${goalProgress}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>{fmt(Math.max(0, netSavings))} saved this month</span>
            <span>Goal: {fmt(state.savingsGoal)}</span>
          </div>
        </div>
      )}
    </div>
  );
}
