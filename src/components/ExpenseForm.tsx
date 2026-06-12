import { useState } from 'react';
import { Expense, ExpenseCategory, EXPENSE_CATEGORIES } from '../types';

interface Props {
  onAdd: (expense: Expense) => void;
}

export default function ExpenseForm({ onAdd }: Props) {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<ExpenseCategory>('Others');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amt = parseFloat(amount);
    if (!name.trim() || isNaN(amt) || amt <= 0) return;

    onAdd({
      id: crypto.randomUUID(),
      name: name.trim(),
      amount: amt,
      category,
    });

    setName('');
    setAmount('');
  };

  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
      <h3 className="font-semibold text-gray-800 mb-4">Add Expense</h3>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Expense name"
            className="col-span-2 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as ExpenseCategory)}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-300"
          >
            {EXPENSE_CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Amount"
            min="0"
            step="0.01"
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
        >
          + Add Expense
        </button>
      </form>
    </div>
  );
}
