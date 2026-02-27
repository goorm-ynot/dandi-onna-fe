"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { SectionCard } from "@/components/ui/section-card";
import { PlusIcon } from "lucide-react";

export function ExtraPolicyPicker({
  onAdd,
  hiddenTypes = [],
}: {
  onAdd: (type: "PEAK" | "CLOSE") => void;
  hiddenTypes?: Array<"PEAK" | "CLOSE">;
}) {
  const showPeak = !hiddenTypes.includes("PEAK");
  const showClose = !hiddenTypes.includes("CLOSE");

  return (
    <SectionCard className="overflow-hidden w-[1000px] bg-gray-lighter p-24 border border-border-normal">
      <div className="flex flex-col gap-6 justify-center items-center">
        <Label className="body9 text-foreground-normal">추가 정책 설정 (선택사항)</Label>
        <Label className="body1 text-foreground-secondary w-[340px] text-center whitespace-pre-line">
          특정 시간대에 다른 정책을 적용하고 싶은 경우에만 추가하세요 기본 정책만으로도 시스템을 운영할 수 있습니다
        </Label>
      </div>
      {(showPeak || showClose) && (
        <div className="flex flex-row gap-12 justify-center pt-24">
          {showPeak && (
            <Button
              type="button"
              variant="outline"
              className="flex flex-row gap-8 justify-center items-center w-[160px]"
              onClick={() => onAdd("PEAK")}
            >
              <PlusIcon className="w-24 h-24 text-foreground-normal" />
              <Label className="body3 text-foreground-normal">피크타임 정책</Label>
            </Button>
          )}
          {showClose && (
            <Button
              type="button"
              variant="outline"
              className="flex flex-row gap-8 justify-center items-center w-[160px]"
              onClick={() => onAdd("CLOSE")}
            >
              <PlusIcon className="w-24 h-24 text-foreground-normal" />
              <Label className="body3 text-foreground-normal">마감 정책</Label>
            </Button>
          )}
        </div>
      )}
    </SectionCard>
  );
}
