import { create } from 'zustand';
import { deleteNotification } from '@/services/api.service';

export type Notification = {
  _id: string;
  user: string;
  type: 'transaction' | 'system' | 'alert';
  title: string;
  message: string;
  read: boolean;
  createdAt: Date;
  updatedAt: string;
};

type Store = {
  notifications: Notification[];
  addAllNotifications: (notifications: Notification[]) => void;
  addNotification: (notification: Notification) => void;
  clearNotification: (id: string) => Promise<void>;
};

export const useNotificationStore = create<Store>((set) => ({
  notifications: [],

  addAllNotifications: (notifications) =>
    set(() => ({
      notifications: [...notifications],
    })),

  addNotification: (notification) =>
    set((state) => ({
      notifications: [notification, ...state.notifications],
    })),

  clearNotification: async (id) => {
    await deleteNotification(id);
    set((state) => ({
      notifications: state.notifications.filter((n) => n._id !== id),
    }));
  },
}));
