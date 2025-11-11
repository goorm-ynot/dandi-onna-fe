// components/layouts/DashboardLayout.tsx
import NoticeSummary from '../features/dashboard/NoticeSummary';

interface DashboardLayout {
  children?: React.ReactNode;
}
// interface DashboardLayout {
//   boarddata?: boardData;
//   state?: dashboardState;
//   children?: React.ReactNode;
// }

export default function DashBoardLayout({ children }: DashboardLayout) {
  return (
    <div className='w-screen h-screen flex-1 flex flex-col justify-center items-center px-[40px] pt-[40px] pb-[20px] '>
      {children}
      {/* 공지사항 부분 => 만약 상세부분이나 다른페이지에서 필요 없을 수 있음 */}
      <div className='w-[1280px] '>
        <NoticeSummary />
      </div>
    </div>
  );
}
