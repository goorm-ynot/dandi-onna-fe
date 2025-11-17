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
    <div className={`flex gap-3 bg-white px-20 ${className}`}>
      {tabs.map((tab) => (
        <Button
          key={tab.id}
          variant={activeTab === tab.id ? 'filterAct' : 'filterNone'}
          onClick={() => onTabChange(tab.id)}
          className={`px-24 py-[6px] text-sm font-medium rounded-full `}>
          {tab.label}
        </Button>
      ))}
    </div>
  );
}
