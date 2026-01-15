import { PanelMode, PanelType } from '@/types/PanleTypes';
import ReservationDetailPanel from '../features/reservation/ReservationDetailPanel';
import NoShowEditPanel from '../features/noshow/NoShowEditPanel';
import NoShowPanel from '../features/noshow';
import NoShowOrderPanel from '../features/order/NoShowOrderPanel';
import EmptyGuide from '../common/EmptyGuide';
import { RightPanelContentProps } from '@/types/boardData';

export default function RightPanelContent({
  type,
  mode,
  data,
  emptyContent,
  emptyTitle,
  emptyDescription,
  onModeChange,
  onDataUpdate,
  onStatusUpdate,
  onClose,
  onEditMode,
}: RightPanelContentProps) {
  // 데이터가 없으면 EmptyGuide 표시
  if (!data) {
    return (
      emptyContent ? (
        <>{emptyContent}</>
      ) : (
        <EmptyGuide
          title={emptyTitle ?? '선택된 항목이 없습니다.'}
          description={emptyDescription ?? '왼쪽에서 항목을 선택해주세요.'}
        />
      )
    );
  }

  switch (type) {
    case 'reservation-detail':
      return (
        <ReservationDetailPanel
          mode={mode}
          reservation={data}
          onModeChange={onModeChange}
          onStatusUpdate={onStatusUpdate}
          onClose={onClose}
          onEditMode={onEditMode}
          onDataUpdate={onDataUpdate ? () => onDataUpdate(data) : undefined}
        />
      );

    case 'noshow-edit':
      return <NoShowPanel mode={mode} noShowData={data} onDataUpdate={onDataUpdate} />;

    case 'noshow-order-view':
      return <NoShowOrderPanel mode={mode} orderData={data} onStatusUpdate={onStatusUpdate} />;

    default:
      return <div>알 수 없는 패널 타입입니다.</div>;
  }
}
