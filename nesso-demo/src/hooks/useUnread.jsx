import { useEffect, useState } from 'react';
import api from '../lib/axios';
import { useAuth } from './useAuth';

export const useUnread = () => {
  const { user } = useAuth();
  const [totalUnread, setTotalUnread] = useState(0);
  const [counts, setCounts] = useState({});

  const fetchUnread = async () => {
    if (!user) return;
    try {
      const res = await api.get('/messages/unread');
      setCounts(res.data);
      const total = Object.values(res.data).reduce((acc, c) => acc + c, 0);
      setTotalUnread(total);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUnread();
    const interval = setInterval(fetchUnread, 10000);
    return () => clearInterval(interval);
  }, [user]);

  return { totalUnread, counts, refetch: fetchUnread };
};