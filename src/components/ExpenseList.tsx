import { Expense, CATEGORY_COLORS, ExpenseCategory } from '../types';

interface Props {
  expenses: Expense[];
  currency: string;
  onDelete: (id: string) => void;
}

export default function ExpenseList({ expenses, currency, onDelete }: Props) {
  const fmt = (n: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(n);

  if (expenses.length === 0) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center">
        <p className="text-gray-400 text-sm">No expenses added yet. Add your first expense above.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="px-5 py-3 border-b border-gray-100">
        <h3 className="font-semibold text-gray-800 text-sm">Expense List</h3>
      </div>
      <div className="divide-y divide-gray-50">
        {expenses.map((expense) => (
          <div key={expense.id} className="flex items-center px-5 py-3 hover:bg-gray-50 transition-colors">
            <div
              className="w-2 h-2 rounded-full mr-3 flex-shrink-0"
              style={{ backgroundColor: CATEGORY_COLORS[expense.category as ExpenseCategory] || '#94a3b8' }}
            />
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-gray-800 truncate">{expense.name}</div>
              <div className="text-xs text-gray-400">{expense.category}</div>
            </div>
            <div className="text-sm font-semibold text-gray-700 mr-3">{fmt(expense.amount)}</div>
            <button
              onClick={() => onDelete(expense.id)}
              className="text-red-400 hover:text-red-600 text-xs px-2 py-1 rounded hover:bg-red-50 transition-colors"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <div className="px-5 py-3 bg-gray-50 border-t border-gray-100 flex justify-between">
        <span className="text-sm font-medium text-gray-600">Total</span>
        <span className="text-sm font-bold text-gray-800">
          {fmt(expenses.reduce((s, e) => s + e.amount, 0))}
        </span>
      </div>
    </div>
  );
}
