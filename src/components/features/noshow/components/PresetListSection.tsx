import { usePresetQueries, PresetData } from "@/hooks/seller/preset/usePresetQueries";
import { Label } from "@radix-ui/react-label";


const presetList = [
    {id: 'discountPercent', name:'할인율', render: (value: number) => `${value}%`},
    {id: 'visitAvailableMinutes', name:'방문 가능시간', render: (value: number) => `${value}분 후`},
    {id: 'saleDelayMinutes', name: '노쇼 판매 대기 시간', render: (value: number) => `${value}분 후`},
];

export function PresetListSection() {
    const { presets } = usePresetQueries();
    const presetData = presets?.[0] as PresetData; // 현재는 기본 프리셋 하나만 불러오므로 첫 번째 요소 사용
    return (
        <div className="px-20 flex flex-col gap-14">
            {presetList.map(preset => {
                const raw = presetData?.[preset.id as keyof PresetData]; // number | undefined
                const value = typeof raw === "number" ? raw : Number(raw); // 혹시 문자열로 올 때 대비
                
                return (
                    <div key={preset.id} className="flex flex-row justify-between items-center">
                        <Label className="body3 text-foreground-normal">{preset.name}</Label>

                        <Label className="body4 text-foreground-normal">
                        {Number.isFinite(value) ? preset.render(value) : "-"}
                        </Label>
                    </div>
            )})}
        </div>
    );
}