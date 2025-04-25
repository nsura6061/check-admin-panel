
import { useState, useEffect } from 'react';
import { MenuItem } from '@/services/authService';
import authService from '@/services/authService';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export const useMenu = () => {
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchMenu = async () => {
      if (!isAuthenticated) {
        setMenu([]);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const menuItems = await authService.getUserMenu();
        setMenu(menuItems);
      } catch (error) {
        console.error('Failed to load menu:', error);
        toast.error('Failed to load navigation menu');
        setMenu([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMenu();
  }, [user?.id, isAuthenticated]);

  return { menu, isLoading };
};
