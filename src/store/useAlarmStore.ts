import { create } from 'zustand';

export interface AlarmState {
  type: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  message: string;
  isVisible: boolean;
  autoClose?: boolean;
}

interface AlarmStore {
  alarm: AlarmState;
  showAlarm: (
    message: string,
    type?: 'success' | 'error' | 'warning' | 'info',
    title?: string,
    autoClose?: boolean
  ) => void;
  hideAlarm: () => void;
}

export const useAlarmStore = create<AlarmStore>((set) => ({
  alarm: {
    type: 'info',
    message: '',
    isVisible: false,
    autoClose: true,
  },
  showAlarm: (message, type = 'info', title, autoClose = true) =>
    set({
      alarm: {
        type,
        title,
        message,
        isVisible: true,
        autoClose,
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
