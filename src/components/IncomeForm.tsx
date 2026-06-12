import { useState } from 'react';

interface Props {
  income: number;
  currency: string;
  onUpdate: (income: number, currency: string) => void;
}

const CURRENCIES = ['USD', 'BDT', 'EUR', 'GBP', 'INR', 'CAD', 'AUD', 'JPY'];

export default function IncomeForm({ income, currency, onUpdate }: Props) {
  const [localIncome, setLocalIncome] = useState(income > 0 ? income.toString() : '');
  const [localCurrency, setLocalCurrency] = useState(currency);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    const val = parseFloat(localIncome);
    if (!isNaN(val) && val >= 0) {
      onUpdate(val, localCurrency);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
      <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <span className="text-xl">💰</span> Monthly Income
      </h3>
      <div className="space-y-3">
        <div className="flex gap-2">
          <select
            value={localCurrency}
            onChange={(e) => setLocalCurrency(e.target.value)}
            className="border border-gray-200 rounded-xl px-3 py-3 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-300 w-24"
          >
            {CURRENCIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <input
            type="number"
            value={localIncome}
            onChange={(e) => setLocalIncome(e.target.value)}
            placeholder="0"
            inputMode="decimal"
            className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
            min="0"
          />
        </div>
        <button
          onClick={handleSave}
          className={`w-full py-3 rounded-xl text-sm font-semibold transition-all ${
            saved
              ? 'bg-emerald-500 text-white'
              : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:opacity-90 active:scale-95'
          }`}
        >
          {saved ? 'Saved ✓' : 'Save Income'}
        </button>
      </div>
    </div>
  );
}
