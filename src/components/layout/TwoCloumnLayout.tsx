import DashBoardLayout from './DashboardLayout';

// components/layout/two-column-layout.tsx
interface TwoColumnLayoutProps {
  leftTitle: string;
  rightTitle: string;
  leftContent: React.ReactNode;
  rightContent: React.ReactNode;
  leftClassName?: string;
  rightClassName?: string;
}

export function TwoColumnLayout({
  leftTitle,
  rightTitle,
  leftContent,
  rightContent,
  leftClassName = 'flex-1',
  rightClassName = 'w-96',
}: TwoColumnLayoutProps) {
  return (
    <DashBoardLayout>
      <div className='w-full h-full flex flex-col bg-gray-50'></div>
    </DashBoardLayout>
  );
}
