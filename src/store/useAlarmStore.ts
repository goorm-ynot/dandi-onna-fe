import { create } from 'zustand';

export interface AlarmState {
  type: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  message: string;
  isVisible: boolean;
  autoClose?: boolean;
  deepLink?: string; // 🎯 클릭 시 이동할 URL
}

interface AlarmStore {
  alarm: AlarmState;
  showAlarm: (
    message: string,
    type?: 'success' | 'error' | 'warning' | 'info',
    title?: string,
    autoClose?: boolean,
    deepLink?: string // 🎯 파라미터 추가
  ) => void;
  hideAlarm: () => void;
  handleAlarmClick: () => void; // 🎯 Alarm 클릭 핸들러
}

export const useAlarmStore = create<AlarmStore>((set) => ({
  alarm: {
    type: 'info',
    message: '',
    isVisible: false,
    autoClose: true,
    deepLink: undefined,
  },
  showAlarm: (message, type = 'info', title, autoClose = true, deepLink) =>
    set({
      alarm: {
        type,
        title,
        message,
        isVisible: true,
        autoClose,
        deepLink, // 🎯 deepLink 저장
      },
    }),
  hideAlarm: () =>
    set((state) => ({
      alarm: {
        ...state.alarm,
        isVisible: false,
      },
    })),
  // 🎯 Alarm 클릭 핸들러
  handleAlarmClick: () =>
    set((state) => {
      const { deepLink } = state.alarm;
      
      // deepLink가 있으면 네비게이션 수행
      if (deepLink) {
        // 클라이언트 사이드 네비게이션 (useRouter 사용 안 함)
        window.location.href = deepLink;
      }
      
      // Alarm 닫기
      return {
        alarm: {
          ...state.alarm,
          isVisible: false,
        },
      };
    }),
}));
