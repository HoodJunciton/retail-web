import { createContext } from 'react';

// Define notification types
export type NotificationType = 'success' | 'error' | 'warning' | 'info';

// Define notification interface
export interface Notification {
  id: string;
  message: string;
  type: NotificationType;
  autoHideDuration?: number;
}

// Define notification context interface
export interface NotificationContextType {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id'>) => void;
  removeNotification: (id: string) => void;
}

// Create notification context
export const NotificationContext = createContext<NotificationContextType | undefined>(undefined);
