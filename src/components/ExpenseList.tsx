import { Expense, CATEGORY_COLORS, ExpenseCategory } from '../types';

interface Props {
  expenses: Expense[];
  currency: string;
  onDelete: (id: string) => void;
}

export default function ExpenseList({ expenses, currency, onDelete }: Props) {
  const fmt = (n: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency, maximumFractionDigits: 0 }).format(n);

  if (expenses.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center">
        <div className="text-4xl mb-3">🧾</div>
        <p className="text-gray-400 text-sm">No expenses yet. Add your first one above.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
        <h3 className="font-semibold text-gray-800 text-sm">Expense List</h3>
        <span className="text-xs text-gray-400">{expenses.length} items</span>
      </div>
      <div className="divide-y divide-gray-50">
        {expenses.map((expense) => (
          <div key={expense.id} className="flex items-center px-5 py-3.5 active:bg-gray-50">
            <div
              className="w-3 h-3 rounded-full mr-3 flex-shrink-0"
              style={{ backgroundColor: CATEGORY_COLORS[expense.category as ExpenseCategory] || '#94a3b8' }}
            />
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-gray-800 truncate">{expense.name}</div>
              <div className="text-xs text-gray-400">{expense.category}</div>
            </div>
            <div className="text-sm font-bold text-gray-700 mr-3">{fmt(expense.amount)}</div>
            <button
              onClick={() => onDelete(expense.id)}
              className="text-red-400 hover:text-red-600 p-2 rounded-lg hover:bg-red-50 transition-colors min-w-[36px] min-h-[36px] flex items-center justify-center"
              aria-label="Remove expense"
            >
              ×
            </button>
          </div>
        ))}
      </div>
      <div className="px-5 py-3.5 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
        <span className="text-sm font-medium text-gray-600">Total</span>
        <span className="text-base font-bold text-gray-800">
          {fmt(expenses.reduce((s, e) => s + e.amount, 0))}
        </span>
      </div>
    </div>
  );
}
