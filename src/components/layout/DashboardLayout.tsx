// components/layouts/DashboardLayout.tsx

import { boardData, dashboardState } from '@/types/boardData';

interface DashboardLayout {
  boarddata: boardData;
  state: dashboardState;
  children?: React.ReactNode;
}

export default function DashBoardLayout({ boarddata, state, children }: DashboardLayout) {}
