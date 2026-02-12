import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { DateRangePicker } from "../analytics/DateRangePicker";
import { Button } from "@/components/ui/button";
import { DownloadIcon } from "lucide-react";

type excelExportPopupProps={
    isOpen: boolean;
    startDate?: Date;
    endDate?: Date;
    onStartDateChange?: (d: Date | undefined) => void;
    onEndDateChange?: (d: Date | undefined) => void;
    onClose: () => void;
    onDownload?: () => void;
}

// 엑셀 내보내기 팝업
export function ExcelExportPopup({isOpen=false, startDate, endDate, onStartDateChange, onEndDateChange, onClose, onDownload}: excelExportPopupProps ) {
  if (!isOpen) return null;
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="bg-white p-12 w-auto rounded-16 shadow-2">
            <DialogHeader className="pt-18 pb-20 flex flex-col gap-8 items-center justify-center">
                <DialogTitle className="pt-10">엑셀 내보내기</DialogTitle>
                <DialogDescription className="text-center">
                    기간을 선택하신 뒤 다운로드 버튼을 눌러주세요.<br/> 
                    기간은 6달까지 선택하실 수 있습니다.
                </DialogDescription>
            </DialogHeader>
            {/* content */}
            <div>
                <DateRangePicker
                    startDate={startDate}
                    endDate={endDate}
                    onStartDateChange={onStartDateChange}
                    onEndDateChange={onEndDateChange}
                />
            </div >
            {/* Footer - button */}
            <DialogFooter className='flex-row gap-3 w-full py-3'>
                <Button 
                    type='button'
                    variant='outline'
                    className='body3 w-1/2 text-foreground-normal px-5 py-2.5 h-[38px]'
                    onClick={onClose}
                >
                    취소
                </Button>
                <Button 
                    type='button' 
                    variant='default'
                    className='w-full body5 rounded-[6px] px-[12px] py-[10px] h-[38px] flex flex-row gap-[3px]'
                    onClick={onDownload}
                >
                    <DownloadIcon style={{width:16, height:16}} />
                    다운로드
                </Button>
            </DialogFooter>
            
        </DialogContent>
    </Dialog>
  )
}