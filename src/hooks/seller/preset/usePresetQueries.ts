// Using in preset page, so that we can fetch all the presets at once and then filter them on the client side
// instead of making multiple API calls for each preset type
"use client";
import { useAlarmStore } from "@/store/useAlarmStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

export type PresetData = {
    presetId: string;
    name: string;
    discountPercent: number;
    visitAvailableMinutes: number;
    saleDelayMinutes: number;
    updatedAt: string;
}

export function usePresetQueries() {
    const query = useQuery({
        queryKey: ['presets'],
        queryFn: async () => {
            const response = await axios.get('/api/v1/seller/noshow/preset/default');
            if(response.data && response.data.data) {
                return [response.data.data]; // 배열로 감싸서 반환
            } else {                
                return []; // 데이터가 없으면 빈 배열 반환
            }
        },
        staleTime: 1000 * 60 * 5, // 5분간 캐시 유지
        refetchOnWindowFocus: false, // 윈도우 포커스시 refetch 비활성화
    });

    const presets = (query.data as PresetData[]) || [];
    const { isLoading, error } = query;
    const errorMessage = error instanceof Error ? error.message : null;

    return {
        ...query,
        presets,
        loading: isLoading,
        error: errorMessage,
    }
}


// export PUT Preset API function for later use in form submission
export const usePresetUpdate = (preset: PresetData) => {
    const queryClient = useQueryClient();
    const { showAlarm } = useAlarmStore();

    return useMutation({
        mutationFn: async(preset: PresetData) => {
            const response = await axios.put('/api/v1/seller/noshow/preset/default', preset);
            console.log("Update API Response:", response.data);
            return response.data;
        },
        onSuccess: (data) => {
            showAlarm('프리셋이 성공적으로 저장되었습니다.', 'success', '성공', true);
            queryClient.invalidateQueries({ queryKey: ['presets'] }); // 업데이트 후 캐시 무효화하여 최신 데이터 가져오기
        },
        onError: (error: any) => {
            showAlarm('프리셋 저장에 실패했습니다. 다시 시도해주세요.', 'error', '실패', true);
            console.error("Error updating preset:", error);
            // 에러 처리 로직 추가 (예: 사용자에게 알림 표시)
        }
    })
}