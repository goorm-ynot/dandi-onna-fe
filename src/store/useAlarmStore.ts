import { create } from 'zustand';

export interface AlarmState {
  type: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  message: string;
  isVisible: boolean;
}

interface AlarmStore {
  alarm: AlarmState;
  showAlarm: (message: string, type?: 'success' | 'error' | 'warning' | 'info', title?: string) => void;
  hideAlarm: () => void;
}

export const useAlarmStore = create<AlarmStore>((set) => ({
  alarm: {
    type: 'info',
    message: '',
    isVisible: false,
  },
  showAlarm: (message, type = 'info', title) =>
    set({
      alarm: {
        type,
        title,
        message,
        isVisible: true,
      },
    }),
  hideAlarm: () =>
    set((state) => ({
      alarm: {
        ...state.alarm,
        isVisible: false,
      },
    })),
}));
