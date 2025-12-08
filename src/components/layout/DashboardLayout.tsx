// components/layouts/DashboardLayout.tsx
import NoticeSummary from '../features/dashboard/NoticeSummary';

interface DashboardLayout {
  children?: React.ReactNode;
}

export default function DashBoardLayout({ children }: DashboardLayout) {
  return (
    <div className='w-screen flex flex-col justify-center items-center'>
      <div className='w-full flex flex-col justify-center items-center'>
        {/* 간격 추가 */}
        {children}
      </div>
      {/* 공지사항 부분 => 만약 상세부분이나 다른페이지에서 필요 없을 수 있음 */}
      <div className='w-full flex-1'>
      <NoticeSummary />
      </div>
    </div>
  );
}
