// src/components/common/FilterTabs.tsx
interface FilterTab {
  id: string;
  label: string;
}

interface FilterTabsProps {
  tabs: FilterTab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  className?: string;
}

export default function FilterTabs({ tabs, activeTab, onTabChange, className = '' }: FilterTabsProps) {
  return (
    <div className={`flex gap-3 bg-white px-20 ${className}`}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`px-24 py-[6px] text-sm font-medium rounded-full ${
            activeTab === tab.id
              ? 'bg-primary text-primary-foreground'
              : 'border text-primary hover:text-popover-foreground'
          }`}>
          {tab.label}
        </button>
      ))}
    </div>
  );
}
