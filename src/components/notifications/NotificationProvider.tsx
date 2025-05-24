import { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { 
  Snackbar, 
  Alert, 
  Slide
} from '@mui/material';
import type { SlideProps } from '@mui/material';
import { NotificationContext } from './NotificationContext';
import type { Notification } from './NotificationContext';

// Slide transition component
const SlideTransition = (props: SlideProps) => {
  return <Slide {...props} direction="up" />;
};

// Provider component
export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [currentNotification, setCurrentNotification] = useState<Notification | null>(null);
  const [open, setOpen] = useState(false);

  // Process notifications queue
  useEffect(() => {
    if (notifications.length > 0 && !currentNotification) {
      // Take the first notification from the queue
      setCurrentNotification(notifications[0]);
      setOpen(true);
      // Remove it from the queue
      setNotifications(prev => prev.slice(1));
    }
  }, [notifications, currentNotification]);

  // Add notification to queue
  const addNotification = (notification: Omit<Notification, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    setNotifications(prev => [...prev, { ...notification, id }]);
  };

  // Remove notification from queue
  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
    if (currentNotification?.id === id) {
      setCurrentNotification(null);
      setOpen(false);
    }
  };

  // Handle close
  const handleClose = (_event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
    setTimeout(() => {
      setCurrentNotification(null);
    }, 300); // Wait for exit animation
  };

  // Handle exited
  const handleExited = () => {
    setCurrentNotification(null);
  };

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, removeNotification }}>
      {children}
      {currentNotification && (
        <Snackbar
          open={open}
          autoHideDuration={currentNotification.autoHideDuration || 5000}
          onClose={handleClose}
          TransitionComponent={SlideTransition}
          TransitionProps={{ onExited: handleExited }}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert 
            onClose={handleClose} 
            severity={currentNotification.type} 
            variant="filled"
            sx={{ width: '100%' }}
          >
            {currentNotification.message}
          </Alert>
        </Snackbar>
      )}
    </NotificationContext.Provider>
  );
};
