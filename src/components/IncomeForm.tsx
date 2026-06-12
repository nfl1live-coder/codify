import { useState } from 'react';

interface Props {
  income: number;
  currency: string;
  onUpdate: (income: number, currency: string) => void;
}

const CURRENCIES = ['USD', 'BDT', 'EUR', 'GBP', 'INR', 'CAD', 'AUD'];

export default function IncomeForm({ income, currency, onUpdate }: Props) {
  const [localIncome, setLocalIncome] = useState(income.toString());
  const [localCurrency, setLocalCurrency] = useState(currency);

  const handleSave = () => {
    const val = parseFloat(localIncome);
    if (!isNaN(val) && val >= 0) {
      onUpdate(val, localCurrency);
    }
  };

  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
      <h3 className="font-semibold text-gray-800 mb-4">Monthly Income</h3>
      <div className="flex gap-3">
        <select
          value={localCurrency}
          onChange={(e) => setLocalCurrency(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-300"
        >
          {CURRENCIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <input
          type="number"
          value={localIncome}
          onChange={(e) => setLocalIncome(e.target.value)}
          placeholder="Enter monthly income"
          className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
          min="0"
        />
        <button
          onClick={handleSave}
          className="bg-indigo-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
        >
          Save
        </button>
      </div>
    </div>
  );
}
