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
    <div className={`flex  bg-white min-h-[38px] ${className}`}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`
            px-[30px] py-[10px]
            body3
            transition-colors duration-150
            border-b-[3px] transition-[border-color] duration-200
            ${
              activeTab === tab.id
                ? 'text-foreground-primary-emphasis border-primitives-brandStrong'
                : 'text-gray-600 border-transparent'
            }
            hover:bg-system-mauve-light
          `}>
          {tab.label}
        </button>
      ))}
    </div>
  );
}
