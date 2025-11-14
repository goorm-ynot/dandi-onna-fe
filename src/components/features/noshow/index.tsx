// components/NoShow/index.tsx (진입점)
import { NoShowPanel as ImportedNoShowPanel } from '@/types/noShowPanelType';
import NoShowEditPanel from './NoShowEditPanel';
import NoShowCreatePanel from './NoShowCreatePanel';

export default function NoShowPanel({ mode, noShowData, onDataUpdate }: ImportedNoShowPanel) {
  if (mode === 'noshow-form') {
    return <NoShowCreatePanel noShowData={noShowData} onDataUpdate={onDataUpdate} />;
  }

  if (mode === 'edit') {
    return <NoShowEditPanel noShowData={noShowData} onDataUpdate={onDataUpdate} />;
  }

  return null;
}
