import DashBoardLayout from "@/components/layout/DashboardLayout";
import { Label } from "@/components/ui/label";
import { formatKRW } from "@/lib/format";
import { SalesTable } from "@/components/features/analytics/SalesTable";


function SalesAnalytics() {
    return ( 
        <DashBoardLayout>
            <div className="max-w-[1400px] w-full h-full flex flex-col gap-40 pt-40 pb-20">
                {/* 타이틀&설명 */}
                <div className="flex flex-col gap-20">
                    <Label className="title7 text-foreground-normal">매출</Label>
                    <Label className="body3 text-foreground-secondary">매출 현황과 주문 이력을 확인하실 수 있습니다.</Label>
                </div>

                {/* 오늘 / 이번 주 / 이번 달 / 노쇼 매출 현황 */}
                <div className="flex flex-row gap-12 justify-between">
                    <div className="w-full px-20 py-24 flex flex-col gap-10 bg-white rounded-md">
                        <Label className="title3 text-foreground-secondary">오늘 매출</Label>
                        <Label className="title7 text-foreground-normal">{formatKRW(387000)}</Label>
                        <Label className='body3 text-foreground-secondary'>주문 12건</Label>
                    </div>
                    <div className="w-full px-20 py-24 flex flex-col gap-10 bg-white rounded-md">
                        <Label className="title3 text-foreground-secondary">이번 주 매출</Label>
                        <Label className="title7 text-foreground-normal">{formatKRW(2145000)}</Label>
                        <Label className='body3 text-foreground-secondary'>주문 68건</Label>
                    </div>
                    <div className="w-full px-20 py-24 flex flex-col gap-10 bg-white rounded-md">
                        <Label className="title3 text-foreground-secondary">이번 달 매출</Label>
                        <Label className="title7 text-foreground-normal">{formatKRW(8920000)}</Label>
                        <Label className='body3 text-foreground-secondary'>주문 287건</Label>
                    </div>
                    <div className="w-full px-20 py-24 flex flex-col gap-10 bg-white rounded-md">
                        <Label className="title3 text-foreground-secondary">노쇼 판매</Label>
                        <Label className="title7 text-primitives-brand3">{formatKRW(445000)}</Label>
                        <Label className='body3 text-foreground-secondary'>주문 15건</Label>
                    </div>
                </div>

                {/* 상세 내역 - 표 */}
                <SalesTable />

            </div>
        </DashBoardLayout>
     );
}

export default SalesAnalytics;