// components/layout/RightPanelContent.tsx
// import ReservationDetailPanel from '../features/reservation/ReservationDetailPanel';
// import NoShowEditPanel from '../features/noshow/NoShowEditPanel';
// import NoShowOrderPanel from '../features/noshow/NoShowOrderPanel';
import { PanelMode, PanelType } from '@/types/PanleTypes';

interface RightPanelContentProps {
  type: PanelType;
  mode: PanelMode;
  data: any;
  onModeChange?: (mode: PanelMode) => void;
  onDataUpdate?: (data: any) => void;
  onStatusUpdate?: (id: string, status: string) => void;
  onClose?: () => void;
}

export default function RightPanelContent({
  type,
  mode,
  data,
  onModeChange,
  onDataUpdate,
  onStatusUpdate,
  onClose,
}: RightPanelContentProps) {
  // switch (type) {
  //   case 'reservation-detail':
  //     return (
  //       <ReservationDetailPanel
  //         mode={mode}
  //         reservation={data}
  //         onModeChange={onModeChange}
  //         onStatusUpdate={onStatusUpdate}
  //         onClose={onClose}
  //       />
  //     );

  //   case 'noshow-edit':
  //     return <NoShowEditPanel mode={mode} noShowData={data} onDataUpdate={onDataUpdate} onClose={onClose} />;

  //   case 'noshow-order-view':
  //     return <NoShowOrderPanel orderData={data} onClose={onClose} />;

  //   default:
  //     return <div>알 수 없는 패널 타입입니다.</div>;
  // }
  return <div>패널이 들어올 자리에요!!</div>;
}
