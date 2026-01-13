import { PanelMode, PanelType } from '@/types/PanleTypes';
import ReservationDetailPanel from '../features/reservation/ReservationDetailPanel';
import NoShowEditPanel from '../features/noshow/NoShowEditPanel';
import NoShowPanel from '../features/noshow';
import NoShowOrderPanel from '../features/order/NoShowOrderPanel';
import EmptyGuide from '../common/EmptyGuide';

interface RightPanelContentProps {
  type: PanelType;
  mode: PanelMode;
  data: any;
  emptyTitle?: string | null;
  emptyDescription?: string | null;
  onModeChange?: (mode: PanelMode) => void;
  onDataUpdate?: (data: any) => void;
  onStatusUpdate?: (id: string, status: string) => void;
  onClose?: () => void;
  onEditMode?: (editmode: boolean) => void;
}

export default function RightPanelContent({
  type,
  mode,
  data,
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
      <EmptyGuide
        title={emptyTitle}
        description={emptyDescription}
      />
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
