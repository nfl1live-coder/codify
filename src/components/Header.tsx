type SyncStatus = 'idle' | 'saving' | 'saved' | 'offline';

interface HeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  syncStatus: SyncStatus;
}

const tabs = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'expenses', label: 'Expenses' },
  { id: 'savings', label: 'Savings' },
];

const syncLabels: Record<SyncStatus, { text: string; color: string }> = {
  idle: { text: '', color: '' },
  saving: { text: 'Saving...', color: 'text-indigo-200' },
  saved: { text: 'Saved ✓', color: 'text-green-300' },
  offline: { text: 'Offline', color: 'text-yellow-300' },
};

export default function Header({ activeTab, onTabChange, syncStatus }: HeaderProps) {
  const sync = syncLabels[syncStatus];
  return (
    <header className="bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg">
      <div className="max-w-2xl mx-auto px-4 pt-5 pb-3">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-white text-xl font-bold leading-tight">Budget Tracker</h1>
            <p className="text-indigo-200 text-xs mt-0.5">Monthly cost & savings</p>
          </div>
          {sync.text && (
            <span className={`text-xs font-medium mt-1 ${sync.color}`}>{sync.text}</span>
          )}
        </div>
        {/* Desktop tab nav only */}
        <nav className="hidden md:flex gap-2 mt-4">
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
