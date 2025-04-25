
import api from './api';
import { User, UserRole } from '@/contexts/AuthContext';

// Types to match Spring Boot backend responses
interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

interface RefreshTokenResponse {
  accessToken: string;
}

interface MenuResponse {
  items: MenuItem[];
}

export interface MenuItem {
  id: string;
  name: string;
  icon: string;
  path: string;
  permission: string;
  children?: MenuItem[];
}

// Simulate API calls to a Spring Boot backend
const authService = {
  login: async (email: string, password: string): Promise<User> => {
    try {
      // In production, this would be a real API call
      // const response = await api.post<LoginResponse>('/auth/login', { email, password });
      
      // For demo purposes, we're simulating the response
      const mockResponse = await simulateLoginApiCall(email, password);
      
      // Store tokens in localStorage
      localStorage.setItem('access_token', mockResponse.accessToken);
      localStorage.setItem('refresh_token', mockResponse.refreshToken);
      localStorage.setItem('currentUser', JSON.stringify(mockResponse.user));
      
      return mockResponse.user;
    } catch (error) {
      console.error('Login error:', error);
      throw new Error(error instanceof Error ? error.message : 'An unknown error occurred');
    }
  },
  
  logout: async (): Promise<void> => {
    try {
      // In production, notify the server about the logout
      // await api.post('/auth/logout');
      
      // Clear local storage
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('currentUser');
      localStorage.removeItem('userMenu');
    } catch (error) {
      console.error('Logout error:', error);
      // Still clear tokens even if the API call fails
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('currentUser');
      localStorage.removeItem('userMenu');
    }
  },
  
  refreshToken: async (): Promise<string> => {
    const refreshToken = localStorage.getItem('refresh_token');
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }
    
    try {
      // In production, this would be a real API call
      // const response = await api.post<RefreshTokenResponse>('/auth/refresh-token', { refreshToken });
      
      // For demo purposes, we're simulating the response
      const newAccessToken = 'new-simulated-access-token-' + Date.now();
      localStorage.setItem('access_token', newAccessToken);
      
      return newAccessToken;
    } catch (error) {
      console.error('Token refresh error:', error);
      throw new Error('Failed to refresh token');
    }
  },
  
  getUserMenu: async (): Promise<MenuItem[]> => {
    try {
      // Check if we have a cached menu
      const cachedMenu = localStorage.getItem('userMenu');
      if (cachedMenu) {
        return JSON.parse(cachedMenu);
      }
      
      // In production, this would be a real API call
      // const response = await api.get<MenuResponse>('/user/menu');
      
      // For demo purposes, we're simulating the response
      const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
      const mockMenu = await simulateMenuApiCall(user);
      
      // Cache the menu
      localStorage.setItem('userMenu', JSON.stringify(mockMenu));
      
      return mockMenu;
    } catch (error) {
      console.error('Get menu error:', error);
      throw new Error('Failed to load user menu');
    }
  }
};

// Mock functions to simulate Spring Boot API responses
async function simulateLoginApiCall(email: string, password: string): Promise<LoginResponse> {
  // This is where you'd make an actual API call in production
  await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
  
  const foundUser = MOCK_USERS.find(u => u.email === email);
  if (!foundUser || password !== 'password') {
    throw new Error('Invalid email or password');
  }
  
  return {
    accessToken: `simulated-access-token-${Date.now()}`,
    refreshToken: `simulated-refresh-token-${Date.now()}`,
    user: foundUser
  };
}

async function simulateMenuApiCall(user: User): Promise<MenuItem[]> {
  // This is where you'd make an actual API call in production
  await new Promise(resolve => setTimeout(resolve, 800)); // Simulate network delay
  
  // Return different menus based on user role
  switch (user.role) {
    case 'admin':
      return ADMIN_MENU;
    case 'manager':
      return MANAGER_MENU;
    case 'analyst':
      return ANALYST_MENU;
    case 'viewer':
      return VIEWER_MENU;
    default:
      return [];
  }
}

// Mock user data with different roles and permissions
const MOCK_USERS = [
  {
    id: '1',
    email: 'admin@example.com',
    name: 'Admin User',
    avatar: '',
    role: 'admin' as UserRole,
    permissions: [
      'view_dashboard',
      'view_analytics',
      'view_users',
      'manage_users',
      'view_revenue',
      'view_performance',
      'view_marketing',
    ],
  },
  {
    id: '2',
    email: 'manager@example.com',
    name: 'Manager User',
    avatar: '',
    role: 'manager' as UserRole,
    permissions: [
      'view_dashboard',
      'view_analytics',
      'view_revenue',
      'view_performance',
      'view_marketing',
    ],
  },
  {
    id: '3',
    email: 'analyst@example.com',
    name: 'Analyst User',
    avatar: '',
    role: 'analyst' as UserRole,
    permissions: [
      'view_dashboard', 
      'view_analytics',
      'view_performance',
      'view_marketing',
    ],
  },
  {
    id: '4',
    email: 'viewer@example.com',
    name: 'Viewer User',
    avatar: '',
    role: 'viewer' as UserRole,
    permissions: [
      'view_dashboard',
    ],
  },
];

// Mock menu structures based on roles
const ADMIN_MENU: MenuItem[] = [
  {
    id: '1',
    name: 'Dashboard',
    icon: 'Home',
    path: '/',
    permission: 'view_dashboard',
  },
  {
    id: '2',
    name: 'Analytics',
    icon: 'BarChart',
    path: '/analytics',
    permission: 'view_analytics',
    children: [
      {
        id: '2-1',
        name: 'Performance',
        icon: 'LineChart',
        path: '/analytics/performance',
        permission: 'view_performance',
      },
      {
        id: '2-2',
        name: 'Revenue',
        icon: 'Activity',
        path: '/analytics/revenue',
        permission: 'view_revenue',
      },
      {
        id: '2-3',
        name: 'Marketing',
        icon: 'PieChart',
        path: '/analytics/marketing',
        permission: 'view_marketing',
      },
    ],
  },
  {
    id: '3',
    name: 'Users',
    icon: 'Users',
    path: '/users',
    permission: 'view_users',
  },
];

const MANAGER_MENU: MenuItem[] = [
  {
    id: '1',
    name: 'Dashboard',
    icon: 'Home',
    path: '/',
    permission: 'view_dashboard',
  },
  {
    id: '2',
    name: 'Analytics',
    icon: 'BarChart',
    path: '/analytics',
    permission: 'view_analytics',
    children: [
      {
        id: '2-1',
        name: 'Performance',
        icon: 'LineChart',
        path: '/analytics/performance',
        permission: 'view_performance',
      },
      {
        id: '2-2',
        name: 'Revenue',
        icon: 'Activity',
        path: '/analytics/revenue',
        permission: 'view_revenue',
      },
      {
        id: '2-3',
        name: 'Marketing',
        icon: 'PieChart',
        path: '/analytics/marketing',
        permission: 'view_marketing',
      },
    ],
  },
];

const ANALYST_MENU: MenuItem[] = [
  {
    id: '1',
    name: 'Dashboard',
    icon: 'Home',
    path: '/',
    permission: 'view_dashboard',
  },
  {
    id: '2',
    name: 'Analytics',
    icon: 'BarChart',
    path: '/analytics',
    permission: 'view_analytics',
    children: [
      {
        id: '2-1',
        name: 'Performance',
        icon: 'LineChart',
        path: '/analytics/performance',
        permission: 'view_performance',
      },
      {
        id: '2-3',
        name: 'Marketing',
        icon: 'PieChart',
        path: '/analytics/marketing',
        permission: 'view_marketing',
      },
    ],
  },
];

const VIEWER_MENU: MenuItem[] = [
  {
    id: '1',
    name: 'Dashboard',
    icon: 'Home',
    path: '/',
    permission: 'view_dashboard',
  },
];

export default authService;
