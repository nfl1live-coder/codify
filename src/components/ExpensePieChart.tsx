import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Expense, CATEGORY_COLORS, ExpenseCategory } from '../types';

interface Props {
  expenses: Expense[];
  currency: string;
}

export default function ExpensePieChart({ expenses, currency }: Props) {
  const categoryTotals = expenses.reduce<Record<string, number>>((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + e.amount;
    return acc;
  }, {});

  const data = Object.entries(categoryTotals)
    .filter(([, v]) => v > 0)
    .map(([name, value]) => ({ name, value }));

  const fmt = (n: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(n);

  if (data.length === 0) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex items-center justify-center h-64">
        <p className="text-gray-400 text-sm">No expenses added yet</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
      <h3 className="font-semibold text-gray-700 mb-3 text-sm">Expense Breakdown</h3>
      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={3}
            dataKey="value"
          >
            {data.map((entry) => (
              <Cell
                key={entry.name}
                fill={CATEGORY_COLORS[entry.name as ExpenseCategory] || '#94a3b8'}
              />
            ))}
          </Pie>
          <Tooltip formatter={(v: number) => fmt(v)} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
