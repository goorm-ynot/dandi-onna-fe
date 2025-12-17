import { Button } from '@/components/ui/button';

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
    <div className={`bg-white min-h-[38px] ${className}`}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`
            px-[30px] py-[10px]
            caption5
            transition-colors duration-150 transition-[color] duration-200
            ${
              activeTab === tab.id
                ? 'text-foreground-primary-emphasis border-b-[3px] border-border-primary-emphasis'
                : 'text-gray-600 transparent'
            }
            hover:bg-system-mauve-light
          `}>
          {tab.label}
        </button>
      ))}
    </div>
  );
}
