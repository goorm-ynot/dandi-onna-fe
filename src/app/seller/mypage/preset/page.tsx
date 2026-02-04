import DashBoardLayout from "@/components/layout/DashboardLayout";


/**
 * status = basic, last, picktime, custom? -> 수정될 수 있음
 * 
 */

function PresetPage() {
  return (
  <DashBoardLayout>
        <div className="max-w-[1400px] w-full h-full flex flex-col gap-40 pt-40 pb-20">
            <div className="flex flex-col gap-20">
                <div className="title7 font-foreground-normal">노쇼 프리셋</div>
                <div className="body3 text-foreground-secondary">노쇼 방지를 위한 프리셋을 설정할 수 있습니다</div>
            </div>
        </div>
  </DashBoardLayout>
  );
}

export default PresetPage;