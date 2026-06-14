import { useEffect, useState } from 'react';

export const useNotifications = () => {
  const [permission, setPermission] = useState('default');

  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission().then(setPermission);
    }
  }, []);

  const showNotification = (title, body) => {
    if (Notification.permission === 'granted') {
      new Notification(title, { body });
    }
  };

  return { showNotification, permission };
};