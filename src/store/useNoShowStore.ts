import { NoShowMenuList, Pagination } from '@/types/noShowPanelType';
import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

interface NoShowStore {
  // ======= State =========
  noShowList: NoShowMenuList[]; // 노쇼 메뉴 목록 전체
  selectNoShowItem: NoShowMenuList | null; // 선택한 노쇼 메뉴 아이템
  pagination: Pagination; // 페이지네이션 데이터
  activeEdit?: boolean; // 수정 상태
  selectItemId?: string; // 선택한 아이템 id

  // ======== Action ==========
  /**
   * API 응답으로부터 메뉴 목록을 스토어에 세팅
   */
  setNoShowList: (noShowList: NoShowMenuList[]) => void;

  /**
   * 전체 페이지 및 현재 페이지 세팅
   * @returns
   */
  setPages: (pagination: Pagination) => void;

  setSelectNoshowItem: (selectItem: NoShowMenuList | null) => void;

  /**
   * 선택한 메뉴의 postId 세팅
   * @param 선택한 부분 구분값 noshowpostid
   */
  setSelectItem: (selectItem: string) => void;

  /**
   * 오른쪽 폼 오픈 여부 boolean 세팅
   */
  setActiveEdit: (activeEdit: boolean) => void;
}

export const useNoShowStore = create<NoShowStore>()(
  subscribeWithSelector<NoShowStore>((set, get) => ({
    noShowList: [],
    pagination: {
      page: 0,
      size: 10,
      totalElements: 0,
      totalPages: 0,
      hasNext: false,
    },
    selectNoShowItem: null,
    activeEdit: false,
    selectItemId: '',

    setNoShowList: (noShowList) =>
      set({
        noShowList,
      }),

    setSelectNoshowItem: (selectItem) =>
      set({
        selectNoShowItem: selectItem,
      }),

    setPages: (pagination) =>
      set({
        pagination,
      }),

    setSelectItem: (selectItem) => set({ selectItemId: selectItem }),

    setActiveEdit: (activeEdit) => set({ activeEdit }),
  }))
);
