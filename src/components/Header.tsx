interface HeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'expenses', label: 'Income & Expenses' },
  { id: 'savings', label: 'Savings Goal' },
];

export default function Header({ activeTab, onTabChange }: HeaderProps) {
  return (
    <header className="bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg">
      <div className="max-w-5xl mx-auto px-4 py-5">
        <h1 className="text-white text-2xl font-bold mb-1">Monthly Budget Tracker</h1>
        <p className="text-indigo-200 text-sm mb-4">Track expenses and grow your savings</p>
        <nav className="flex gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-white text-indigo-600 shadow'
                  : 'text-indigo-100 hover:bg-indigo-500'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
