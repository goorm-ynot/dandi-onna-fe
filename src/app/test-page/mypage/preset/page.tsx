import DashBoardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SectionCard, SectionCardContent, SectionCardHeader } from "@/components/ui/section-card";
import { Info, PlusIcon } from "lucide-react";


/**
 * TODO:
 * UI 제작
 * 기능 구현 
 *   - name 값 설정
 *   - 값 유효성 검사
 *   - 값 저장 (API 연동)
 * status = basic, last, picktime, custom? -> 수정될 수 있음
 * 
 */

function PresetPage() {
  return (
  <DashBoardLayout>
        <div className="max-w-[1400px] w-full h-full flex flex-col gap-40 pt-40 pb-20">
            <div className="flex flex-col gap-20">
                <div className="title7 font-foreground-normal">노쇼 프리셋</div>
                <div className="body3 text-foreground-secondary">시스템이 자동으로 적용할 노쇼 판매 규칙을 설정합니다.</div>
            </div>
            {/* section */}
            <SectionCard className="overflow-hidden shadow-md w-[1000px]">
                <SectionCardHeader className="p-30">
                  <div className="flex flex-col gap-6">
                    <div className="flex flex-row items-center gap-6">
                      <Label className="body9 text-foreground-normal">기본 노쇼 정책</Label>
                      <div className="flex flex-row items-center gap-2 rounded-lg bg-background-quaternary px-8 py-2">
                        <Info className="w-[14px] h-[14px] text-foreground-primary" /> 
                        <Label className="body2 text-foreground-primary">필수</Label>
                      </div>
                    </div>
                    <Label className="body1 text-foreground-secondary">모든 노쇼 처리에 적용되는 기본 설정입니다.</Label>
                  </div>
                </SectionCardHeader>
                {/* content */}
                <SectionCardHeader className="px-30 py-24">
                    <div className="flex flex-col justify-start gap-24">

                      {/* 할인율 */}
                      <div className="flex flex-col gap-6">
                        <Label className="body5 text-foreground-normal">할인율</Label>
                        <Label className="body1 text-foreground-secondary">새 손님에게 제공할 할인율입니다.</Label>
                      </div>
                      <div className="flex flex-row gap-6">
                        <Input 
                          type="number" 
                          placeholder="30~90" 
                          min={30}
                          max={90}
                          className="w-[140px] py-10 px-14 text-center bg-white rounded-md"/>
                        <Label className="body3 text-foreground-normal self-center">%</Label>
                      </div>

                      {/* 방문 가능 시간 */}
                      <div className="flex flex-col gap-6">
                        <Label className="body5 text-foreground-normal">방문 가능시간</Label>
                        <Label className="body1 text-foreground-secondary">노쇼 예약 손님이 도착할 때까지 사장님께 필요한 준비 시간을 선택해 주세요.</Label>
                      </div>
                      <div className="flex flex-row gap-6">
                        <Input 
                          type="number" 
                          placeholder="00" 
                          min={0}
                          max={23}
                          className="w-[55px] py-10 text-center bg-white rounded-md"/>
                        <Label className="body3 text-foreground-normal self-center">시간</Label>
                        <Input 
                          type="number" 
                          placeholder="00" 
                          min={0}
                          max={59}
                          className="w-[55px] py-10 text-center bg-white rounded-md"/>
                        <Label className="body3 text-foreground-normal self-center">분 후 방문 가능</Label>
                      </div>

                      {/* 판매 대기 시간 */}
                      <div className="flex flex-col gap-6">
                        <Label className="body5 text-foreground-normal">판매 대기 시간</Label>
                        <Label className="body1 text-foreground-secondary">기존 예약자와 새 손님이 겹치지 않도록, 판매 시작 전 잠시 대기하는 시간입니다.</Label>
                      </div>
                      <div className="flex flex-row gap-6">
                        <Input 
                          type="number" 
                          placeholder="10~300"
                          min={0} 
                          max={300}
                          className="w-[140px] py-10 px-14 text-center bg-white rounded-md"/>
                        <Label className="body3 text-foreground-normal self-center">분</Label>
                      </div>
                    </div>
                </SectionCardHeader>
                <SectionCardContent className="px-30 py-24 w-full flex flex-row justify-between items-center">
                      <Label className="body1 text-foreground-secondary">설정한 정책에 따라 추후 시스템이 자동으로 적용합니다.</Label>
                      <Button type="button" className="w-[160px] px-12 py-10">저장</Button>
                </SectionCardContent>  
            </SectionCard>
            {/* 선택사항 */}
            <SectionCard className="overflow-hidden w-[1000px] bg-gray-lighter p-24 border border-border-normal">
                <div className="flex flex-col gap-6 justify-center items-center">
                  <Label className="body9 text-foreground-normal">추가 정책 설정 (선택사항)</Label>
                  <Label className="body1 text-foreground-secondary w-[340px] text-center whitespace-pre-line">특정 시간대에 다른 정책을 적용하고 싶은 경우에만 추가하세요 기본 정책만으로도 시스템을 운영할 수 있습니다</Label>
                </div>
                <div className="flex flex-row gap-12 justify-center pt-24">
                    <Button
                     type='button'
                     variant='outline'
                     className="flex flex-row gap-8 justify-center items-center w-[160px]">
                      <PlusIcon className="w-24 h-24 text-foreground-normal" />
                      <Label className="body3 text-foreground-normal">피크타임 정책</Label>
                    </Button>
                    <Button
                     type='button'
                     variant='outline'
                     className="flex flex-row gap-8 justify-center items-center w-[160px]">
                      <PlusIcon className="w-24 h-24 text-foreground-normal" />
                      <Label className="body3 text-foreground-normal">마감 정책</Label>
                    </Button>
                </div>
            </SectionCard>
        </div>
  </DashBoardLayout>
  );
}

export default PresetPage;