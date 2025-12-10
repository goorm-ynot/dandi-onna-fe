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
    <div className={`flex gap-[32px] bg-white ${className}`}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`
            px-[30px] py-[10px]
            body3
            transition-all
            ${
              activeTab === tab.id
                ? 'text-foreground-primary-emphasis border-b-[3px] border-primitives-brandStrong'
                : 'text-gray-600 border-b-[3px] border-transparent'
            }
          `}>
          {tab.label}
        </button>
      ))}
    </div>
  );
}
