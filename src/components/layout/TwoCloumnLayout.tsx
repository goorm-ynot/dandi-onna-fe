// components/layout/TwoColumnLayout.tsx
import { TwoColumnLayoutProps } from '@/types/boardData';
import DashBoardLayout from './DashboardLayout';
import RightPanelContent from './RightPanelContent';

export function TwoColumnLayout({
  rightTitle,
  leftContent,
  panelType,
  panelMode,
  selectedData,
  onBack,
  onModeChange,
  onDataUpdate,
  onStatusUpdate,
  leftClassName = 'flex-1',
  rightClassName = 'w-96',
  showTitles = true,
}: TwoColumnLayoutProps) {
  return (
    <DashBoardLayout>
      <div className='max-w-[1280px] w-full min-h-[758px] flex gap-6 py-40 mb-8'>
        {/* 왼쪽 패널 */}
        <div className={`${leftClassName} flex flex-col`}>
          <div className='flex-1 overflow-hidden'>{leftContent}</div>
        </div>

        {/* 오른쪽 패널 - 동적 컨텐츠 */}
        <div className={`${rightClassName} flex flex-col`}>
          {showTitles && rightTitle && <h2 className='text-lg font-semibold mb-4'>{rightTitle}</h2>}
          <div className='flex-1 overflow-auto'>
            <RightPanelContent
              type={panelType}
              mode={panelMode}
              data={selectedData}
              onModeChange={onModeChange}
              onDataUpdate={onDataUpdate}
              onStatusUpdate={onStatusUpdate}
              onClose={onBack}
            />
          </div>
        </div>
      </div>
    </DashBoardLayout>
  );
}
