import { useState } from 'react';

interface Props {
  savingsGoal: number;
  currency: string;
  netSavings: number;
  onUpdate: (goal: number) => void;
}

const TIPS = [
  'Aim to save at least 20% of your income (50/30/20 rule).',
  'Build an emergency fund covering 3–6 months of expenses.',
  'Automate your savings — pay yourself first.',
  'Review and cut subscriptions you no longer use.',
  'Small daily savings compound into large long-term wealth.',
];

export default function SavingsGoalForm({ savingsGoal, currency, netSavings, onUpdate }: Props) {
  const [goal, setGoal] = useState(savingsGoal.toString());

  const fmt = (n: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(n);

  const progress = savingsGoal > 0 ? Math.min((netSavings / savingsGoal) * 100, 100) : 0;
  const monthsToGoal = netSavings > 0 && savingsGoal > 0
    ? Math.ceil(savingsGoal / netSavings)
    : null;

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
        <h3 className="font-semibold text-gray-800 mb-4">Set Savings Goal</h3>
        <div className="flex gap-3 mb-4">
          <input
            type="number"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            placeholder="Enter savings goal"
            min="0"
            className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
          />
          <button
            onClick={() => {
              const v = parseFloat(goal);
              if (!isNaN(v) && v >= 0) onUpdate(v);
            }}
            className="bg-indigo-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
          >
            Set Goal
          </button>
        </div>

        {savingsGoal > 0 && (
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600">Progress toward goal</span>
              <span className="font-semibold text-indigo-600">{progress.toFixed(1)}%</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-4 mb-3">
              <div
                className="bg-gradient-to-r from-indigo-500 to-purple-500 h-4 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="bg-indigo-50 rounded-lg p-3">
                <div className="text-xs text-indigo-500 mb-1">Monthly Savings</div>
                <div className="font-bold text-indigo-700 text-sm">{fmt(Math.max(0, netSavings))}</div>
              </div>
              <div className="bg-purple-50 rounded-lg p-3">
                <div className="text-xs text-purple-500 mb-1">Goal Amount</div>
                <div className="font-bold text-purple-700 text-sm">{fmt(savingsGoal)}</div>
              </div>
              <div className="bg-emerald-50 rounded-lg p-3">
                <div className="text-xs text-emerald-500 mb-1">Months to Goal</div>
                <div className="font-bold text-emerald-700 text-sm">
                  {monthsToGoal !== null ? `${monthsToGoal} mo` : '—'}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-5 border border-amber-100">
        <h3 className="font-semibold text-amber-800 mb-3 text-sm">💡 Savings Tips</h3>
        <ul className="space-y-2">
          {TIPS.map((tip, i) => (
            <li key={i} className="text-xs text-amber-700 flex gap-2">
              <span className="text-amber-400 flex-shrink-0">•</span>
              {tip}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
