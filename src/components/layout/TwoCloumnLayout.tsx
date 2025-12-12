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
      <div className='max-w-[1280px] w-full h-full flex gap-[40px] px-40 pb-20'>
        {/* 왼쪽 패널 */}
        <div className={`${leftClassName} flex flex-col max-w-[880px]`}>
          {/* <div className='flex-1 overflow-hidden'>{leftContent}</div> */}
          <div className='flex-1 '>{leftContent}</div>
        </div>

        {/* 오른쪽 패널 - 동적 컨텐츠 */}
        <div className={`${rightClassName} flex flex-col w-[380px]`}>
          <div className='pb-40'>
            {showTitles && rightTitle && <PageHeader title={rightTitle} />}
          </div>
          <div className='flex-1 overflow-auto border border-border-normal rounded-sm bg-background-normal max-w-[380px]'>
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
