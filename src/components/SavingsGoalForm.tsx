import { useState } from 'react';

interface Props {
  savingsGoal: number;
  currency: string;
  netSavings: number;
  onUpdate: (goal: number) => void;
}

const TIPS = [
  'Save at least 20% of your income (50/30/20 rule).',
  'Build an emergency fund for 3–6 months of expenses.',
  'Automate savings — pay yourself first.',
  'Review and cut unused subscriptions.',
  'Small daily savings compound into wealth over time.',
];

export default function SavingsGoalForm({ savingsGoal, currency, netSavings, onUpdate }: Props) {
  const [goal, setGoal] = useState(savingsGoal > 0 ? savingsGoal.toString() : '');

  const fmt = (n: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency, maximumFractionDigits: 0 }).format(n);

  const progress = savingsGoal > 0 ? Math.min((netSavings / savingsGoal) * 100, 100) : 0;
  const monthsToGoal = netSavings > 0 && savingsGoal > 0 ? Math.ceil(savingsGoal / netSavings) : null;

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <span className="text-xl">🎯</span> Savings Goal
        </h3>
        <div className="flex gap-2 mb-4">
          <input
            type="number"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            placeholder="Enter your savings goal"
            inputMode="decimal"
            min="0"
            className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
          />
          <button
            onClick={() => {
              const v = parseFloat(goal);
              if (!isNaN(v) && v >= 0) onUpdate(v);
            }}
            className="bg-indigo-600 text-white px-5 py-3 rounded-xl text-sm font-semibold hover:bg-indigo-700 active:scale-95 transition-all"
          >
            Set
          </button>
        </div>

        {savingsGoal > 0 && (
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600 font-medium">Progress</span>
                <span className="font-bold text-indigo-600">{progress.toFixed(0)}%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-4">
                <div
                  className="bg-gradient-to-r from-indigo-500 to-purple-500 h-4 rounded-full transition-all duration-700"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-indigo-50 rounded-xl p-3">
                <div className="text-xs text-indigo-500 mb-1">Monthly</div>
                <div className="font-bold text-indigo-700 text-sm">{fmt(Math.max(0, netSavings))}</div>
              </div>
              <div className="bg-purple-50 rounded-xl p-3">
                <div className="text-xs text-purple-500 mb-1">Goal</div>
                <div className="font-bold text-purple-700 text-sm">{fmt(savingsGoal)}</div>
              </div>
              <div className="bg-emerald-50 rounded-xl p-3">
                <div className="text-xs text-emerald-500 mb-1">Months</div>
                <div className="font-bold text-emerald-700 text-sm">{monthsToGoal !== null ? monthsToGoal : '—'}</div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="bg-amber-50 rounded-2xl p-5 border border-amber-100">
        <h3 className="font-semibold text-amber-800 mb-3 text-sm flex items-center gap-2">
          <span>💡</span> Smart Savings Tips
        </h3>
        <ul className="space-y-2.5">
          {TIPS.map((tip, i) => (
            <li key={i} className="text-xs text-amber-700 flex gap-2 leading-relaxed">
              <span className="text-amber-400 font-bold flex-shrink-0">{i + 1}.</span>
              {tip}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
