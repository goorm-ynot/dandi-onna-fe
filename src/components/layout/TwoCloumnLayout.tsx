// components/layout/TwoColumnLayout.tsx
import { TwoColumnLayoutProps } from '@/types/boardData';
import DashBoardLayout from './DashboardLayout';
import RightPanelContent from './RightPanelContent';
import PageHeader from '../features/dashboard/PageHeader';

export function TwoColumnLayout({
  rightTitle,
  leftContent,
  panelType,
  panelMode,
  selectedData,
  onBack, // 이거 안쓰는거긴해
  onModeChange,
  onDataUpdate,
  onStatusUpdate,
  onEditMode,
  leftClassName = 'flex-1',
  rightClassName = 'w-96',
  showTitles = true,
}: TwoColumnLayoutProps) {
  return (
    <DashBoardLayout>
      <div className='max-w-[1280px] w-full h-full flex gap-6 pt-40'>
        {/* 왼쪽 패널 */}
        <div className={`${leftClassName} flex flex-col`}>
          {/* <div className='flex-1 overflow-hidden'>{leftContent}</div> */}
          <div className='flex-1 '>{leftContent}</div>
        </div>

        {/* 오른쪽 패널 - 동적 컨텐츠 */}
        <div className={`${rightClassName} flex flex-col`}>
          {showTitles && rightTitle && <PageHeader title={rightTitle} />}
          <div className='flex-1 overflow-auto border border-border-wrapper rounded-md'>
            <RightPanelContent
              type={panelType}
              mode={panelMode}
              data={selectedData}
              onModeChange={onModeChange}
              onDataUpdate={onDataUpdate}
              onStatusUpdate={onStatusUpdate}
              onClose={onBack}
              onEditMode={onEditMode}
            />
          </div>
        </div>
      </div>
    </DashBoardLayout>
  );
}
