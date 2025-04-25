
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from "@/components/ui/use-toast";

export type UserRole = 'admin' | 'manager' | 'analyst' | 'viewer';

export interface Permission {
  id: string;
  name: string;
  description: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: UserRole;
  permissions: string[];
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  hasPermission: (permission: string) => boolean;
  isLoading: boolean;
}

// Mock permissions
export const PERMISSIONS = {
  VIEW_DASHBOARD: 'view_dashboard',
  VIEW_ANALYTICS: 'view_analytics',
  VIEW_USERS: 'view_users',
  MANAGE_USERS: 'manage_users',
  VIEW_REVENUE: 'view_revenue',
  VIEW_PERFORMANCE: 'view_performance',
  VIEW_MARKETING: 'view_marketing',
};

// Mock user data with different roles and permissions
const MOCK_USERS: User[] = [
  {
    id: '1',
    email: 'admin@example.com',
    name: 'Admin User',
    avatar: '',
    role: 'admin',
    permissions: Object.values(PERMISSIONS),
  },
  {
    id: '2',
    email: 'manager@example.com',
    name: 'Manager User',
    avatar: '',
    role: 'manager',
    permissions: [
      PERMISSIONS.VIEW_DASHBOARD,
      PERMISSIONS.VIEW_ANALYTICS,
      PERMISSIONS.VIEW_REVENUE,
      PERMISSIONS.VIEW_PERFORMANCE,
      PERMISSIONS.VIEW_MARKETING,
    ],
  },
  {
    id: '3',
    email: 'analyst@example.com',
    name: 'Analyst User',
    avatar: '',
    role: 'analyst',
    permissions: [
      PERMISSIONS.VIEW_DASHBOARD, 
      PERMISSIONS.VIEW_ANALYTICS,
      PERMISSIONS.VIEW_PERFORMANCE,
      PERMISSIONS.VIEW_MARKETING,
    ],
  },
  {
    id: '4',
    email: 'viewer@example.com',
    name: 'Viewer User',
    avatar: '',
    role: 'viewer',
    permissions: [
      PERMISSIONS.VIEW_DASHBOARD,
    ],
  },
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API request delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      const foundUser = MOCK_USERS.find(u => u.email === email);
      if (!foundUser || password !== 'password') { // All mock users have password 'password'
        throw new Error('Invalid email or password');
      }

      setUser(foundUser);
      localStorage.setItem('currentUser', JSON.stringify(foundUser));
      
      toast({
        title: "Login successful",
        description: `Welcome back, ${foundUser.name}!`,
      });
      
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: error instanceof Error ? error.message : "An unknown error occurred",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    });
  };

  const hasPermission = (permission: string) => {
    return user?.permissions.includes(permission) || false;
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      isAuthenticated: !!user,
      hasPermission,
      isLoading
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
