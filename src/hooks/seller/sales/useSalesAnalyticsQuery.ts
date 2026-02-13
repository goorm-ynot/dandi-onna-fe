// 매출 api 호출
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import { start } from 'repl';
import { useSalesAnalyticsManage } from './useSalesAnalyticsManage';

type paramsType = {
  startDate: string | undefined;
  endDate: string | undefined;
  orderType?: string;
}

export const useSalesAnalyticsQuery = ({startDate, endDate, orderType='all'}: paramsType) => {
  const [page, setPage] = useState(1);
  const size = 10; // 한 페이지에 보여줄 항목 수(고정)

  const query= useQuery({
    queryKey: ['sales-analytics', startDate, endDate, page-1, size],
    queryFn: async () => {
      const response = await axios.get('/api/v1/seller/order/sales', {
        params: {startDate, endDate, page: page-1, size, orderType},
        });
        return response.data;
    },
    staleTime: 1000 * 60 * 1, // 1분간 캐시 유지
    refetchOnWindowFocus: false, // 윈도우 포커스시 refetch 비활성화
    enabled: !!startDate && !!endDate, // date가 있을 때만 쿼리 실행
  });

  return {
    ...query,
    items: query.data?.data.items ?? [],
    pageInfo: query.data?.data.pageInfo,
    setPage,
  };
}


export const useExportSalesExcel = () => {
  const {setIsExcelPopupOpen, setPopupStartDate, setPopupEndDate} = useSalesAnalyticsManage();
  const [jobId, setJobId] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [currentParams, setCurrentParams] = useState<paramsType | null>(null);

  // 1. 엑셀 파일 만드는 요청
  const exportExcel = useQuery({
    queryKey: ['export-sales-excel', currentParams?.startDate, currentParams?.endDate],
    queryFn: async () => {
      const response = await axios.post('/api/v1/seller/sales/export', {
        params: {
          startDate: currentParams?.startDate, 
          endDate: currentParams?.endDate, 
          includeDetail: true
        },
      });
      // console.log('response', response.data);
      return response.data;
    },
    enabled: false, // 수동으로만 실행
  });

  // 2. 엑셀 파일 다운로드 요청
  const downloadExcel = useQuery({
    queryKey: ['download-sales-excel', jobId],
    queryFn: async () => {
      const response = await axios.get(`/api/v1/seller/sales/export/${jobId}`, {
        responseType: 'json',
      });
      // console.log('download response', response);
      if(response.data.status === 'DONE'){
        setIsExporting(false);
        setDownloadUrl(response.data.downloadUrl);
        // 팝업 닫기 및 상태 초기화
        setIsExcelPopupOpen(false);
        setPopupStartDate(undefined);
        setPopupEndDate(undefined);
        // 완료되면 자동으로 다운로드
        window.open(response.data.downloadUrl, '_blank');
      } else if(response.data.status === 'PROCESSING' || response.data.status === 'QUEUED') {
        setIsExporting(true);
      }
      return response.data;
    },
    refetchInterval: (query) => {
      // 완료되면 refetch 중단
      return query.state.data?.status === 'DONE' ? false : 3000; // 3초마다 상태 체크
    },
    retry(failureCount, error) {
      // 실패 시 최대 5회 재시도
      if (failureCount >= 5) return false;
      return true;
    },
    refetchIntervalInBackground: true,
    enabled: !!jobId && isExporting, // jobId가 있고, 엑셀 생성 중일 때만 쿼리 실행
    notifyOnChangeProps: ['data', 'error'], // data와 error 변경 시에만 리렌더링 (깜빡임 방지)
  });

  // 위의 쿼리를 실행하는 함수 - 동적으로 날짜 전달
  const initiateExport = (startDate: string, endDate: string, orderType: string = 'all') => {
    // 파라미터 업데이트
    setCurrentParams({ startDate, endDate, orderType });
    setIsExporting(true);
    jobId && setJobId(null); // 이전 jobId 초기화
    
    // 유효성 검사
    if(startDate === undefined || endDate === undefined) {
      console.error('Start date and end date are required for export');
      // console.log('startDate:', startDate, 'endDate:', endDate);
      return;
    }
    
    // 엑셀 생성 요청
    exportExcel.refetch().then((res) => {
      const newJobId = res.data?.jobId;
      if (newJobId) {
        setJobId(newJobId);
      } else {
        setIsExporting(false);
        console.error('Failed to get jobId');
      }
    }).catch((error) => {
      setIsExporting(false);
      console.error('Export failed:', error);
    });
  }

  return {
    initiateExport,
    isExporting,
    downloadUrl,
  }
}