// 노쇼 메뉴 훅 통합 관리

import { getNowDateHyphenString } from '@/lib/dateParse';
import { useNoShowStore } from '@/store/useNoShowStore';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { SortState } from '@/types/boardData';
import { sortData, handleSortToggle } from '@/lib/sortUtils';

export const useNoShowManage = () => {
  const router = useRouter();
  const {
    noShowList,
    pagination,
    activeEdit,
    selectItemId,
    selectNoShowItem,
    setNoShowList,
    setSelectNoshowItem,
    setPages,
    setSelectItem,
    setActiveEdit,
  } = useNoShowStore();

  // 에러 처리 핸들러
  const handleQueryError = (error: any) => {
    console.error('❌ API Error:', error);
    if (error?.message === 'AUTH_FAILURE' || error?.response?.status === 401 || error?.response?.status === 403) {
      alert('연결이 원활하지 않습니다. 다시 시도해주세요');
      router.replace('/');
    }
  };

  // 정렬 상태
  const [sortState, setSortState] = useState<SortState>({ key: '', order: null });

  const {
    data: noShowLists,
    isLoading,
    refetch,
    error: noShowListError,
  } = useQuery({
    queryKey: ['noshow-menu', pagination?.page || 0],
    queryFn: async () => {
      const response = await axios.get('/api/v1/seller/noshow', {
        params: {
          page: pagination?.page || 0,
          size: pagination?.size || 10,
          date: getNowDateHyphenString(),
          // date: new Date(),
        },
      });
      // console.log('response: ', response.data);
      return response.data;
    },
    staleTime: 1000 * 60 * 1,
    refetchOnWindowFocus: false,
    enabled: !!pagination, // pagination이 있을 때만 쿼리 실행
  });

  // ✅ 선택된 아이템의 상세 정보 조회
  const { data: detailData, error: detailError } = useQuery({
    queryKey: ['noshow-detail', selectItemId],
    queryFn: async () => {
      const response = await axios.get('/api/v1/seller/noshow/detail', {
        params: {
          postId: selectItemId,
        },
      });
      return response.data;
    },
    enabled: !!selectItemId && activeEdit, // selectItemId가 있고 수정 모드일 때만 실행
  });

  // 에러 감지 및 처리
  useEffect(() => {
    if (noShowListError) {
      handleQueryError(noShowListError);
    }
  }, [noShowListError]);

  useEffect(() => {
    if (detailError) {
      handleQueryError(detailError);
    }
  }, [detailError]);

  // 데이터 로드 시 Zustand에 저장
  useEffect(() => {
    if (noShowLists) {
      const posts = noShowLists.data?.posts || noShowLists.posts || [];
      const paginationData = noShowLists.data?.pagination || noShowLists.pagination;

      setNoShowList(posts);
      if (paginationData) {
        setPages(paginationData);
      }
    }
  }, [noShowLists, setNoShowList, setPages]);

  // ✅ 상세 데이터가 로드되면 스토어에 저장
  useEffect(() => {
    if (detailData) {
      const detail = detailData.data || detailData;
      setSelectNoshowItem(detail);
      // console.log('상세 데이터:', detail);
    }
  }, [detailData, setSelectNoshowItem]);

  // 수정하기 버튼 선택
  const onSelected = (item: string) => {
    setSelectItem(item);
    setActiveEdit(true);
  };

  // page 변경 함수
  const handlePageChange = (newPage: number) => {
    if (pagination) {
      setPages({ ...pagination, page: newPage });
    }
  };

  // 정렬 핸들러
  const handleSort = (key: string) => {
    // 정렬 선택 시 기존의 데이터에서 직접 정렬 수행
    // desc, asc 구분 필요
    // console.log('정렬 키 선택됨:', key);
    handleSortToggle(key, setSortState);
  };

  // 정렬된 노쇼 메뉴 데이터
  const sortedNoShowList = useMemo(() => {
    return sortData(noShowList, sortState);
  }, [noShowList, sortState]);

  return {
    // 상태
    noShowList,
    selectNoShowItem,
    cursor: pagination?.page || 0,
    totalPages: pagination?.totalPages || 0,
    activeEdit,
    selectItemId,

    // detail state
    isLoading,

    // error
    noShowListError,
    detailError,

    // actions
    setSelectNoshowItem,
    onSelected,
    handlePageChange,
    setActiveEdit, // 임시로 추가
    
    // sort
    sortState,
    sortedReservations: sortedNoShowList,
    handleSort,
  };
};
