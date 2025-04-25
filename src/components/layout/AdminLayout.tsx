
import React, { useState } from 'react';
import { Link, useLocation, Navigate } from 'react-router-dom';
import { useAuth, PERMISSIONS } from '@/contexts/AuthContext';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  BarChart, 
  Users, 
  Home, 
  MenuIcon, 
  LogOut, 
  ChevronDown, 
  ChevronRight,
  LineChart,
  PieChart,
  Activity
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

interface MenuItem {
  name: string;
  icon: React.ElementType;
  path: string;
  permission: string;
  children?: Omit<MenuItem, 'children'>[];
}

interface AdminLayoutProps {
  children: React.ReactNode;
}

const MENU_ITEMS: MenuItem[] = [
  {
    name: 'Dashboard',
    icon: Home,
    path: '/',
    permission: PERMISSIONS.VIEW_DASHBOARD,
  },
  {
    name: 'Analytics',
    icon: BarChart,
    path: '/analytics',
    permission: PERMISSIONS.VIEW_ANALYTICS,
    children: [
      {
        name: 'Performance',
        icon: LineChart,
        path: '/analytics/performance',
        permission: PERMISSIONS.VIEW_PERFORMANCE,
      },
      {
        name: 'Revenue',
        icon: Activity,
        path: '/analytics/revenue',
        permission: PERMISSIONS.VIEW_REVENUE,
      },
      {
        name: 'Marketing',
        icon: PieChart,
        path: '/analytics/marketing',
        permission: PERMISSIONS.VIEW_MARKETING,
      },
    ],
  },
  {
    name: 'Users',
    icon: Users,
    path: '/users',
    permission: PERMISSIONS.VIEW_USERS,
  },
];

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { user, logout, hasPermission, isLoading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});
  const location = useLocation();
  
  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  const toggleSubmenu = (name: string) => {
    setOpenMenus(prev => ({
      ...prev,
      [name]: !prev[name]
    }));
  };

  const isActive = (path: string) => location.pathname === path;
  
  const filteredMenuItems = MENU_ITEMS.filter(item => hasPermission(item.permission));

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <div 
        className={cn(
          "bg-sidebar text-sidebar-foreground flex flex-col overflow-hidden transition-all duration-300",
          sidebarOpen ? "w-64" : "w-16"
        )}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
          {sidebarOpen && (
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-sidebar-primary flex items-center justify-center text-sidebar-primary-foreground font-bold">
                AP
              </div>
              <h1 className="text-lg font-semibold">Admin Panel</h1>
            </div>
          )}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-sidebar-foreground hover:bg-sidebar-accent"
          >
            <MenuIcon size={20} />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-grow overflow-y-auto">
          <ul className="py-2">
            {filteredMenuItems.map((item) => (
              <li key={item.name} className="px-2 py-1">
                {item.children ? (
                  <div className="space-y-1">
                    <Button 
                      variant="ghost" 
                      className={cn(
                        "w-full justify-between text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                        openMenus[item.name] ? "bg-sidebar-accent/50" : ""
                      )}
                      onClick={() => toggleSubmenu(item.name)}
                    >
                      <div className="flex items-center">
                        <item.icon size={20} className="mr-2" />
                        {sidebarOpen && <span>{item.name}</span>}
                      </div>
                      {sidebarOpen && (
                        openMenus[item.name] ? <ChevronDown size={16} /> : <ChevronRight size={16} />
                      )}
                    </Button>
                    
                    {sidebarOpen && openMenus[item.name] && (
                      <ul className="pl-6 space-y-1">
                        {item.children
                          .filter(subItem => hasPermission(subItem.permission))
                          .map(subItem => (
                            <li key={subItem.name}>
                              <Link to={subItem.path}>
                                <Button 
                                  variant="ghost" 
                                  className={cn(
                                    "w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                                    isActive(subItem.path) ? "bg-sidebar-accent text-sidebar-primary" : ""
                                  )}
                                >
                                  <subItem.icon size={18} className="mr-2" />
                                  <span>{subItem.name}</span>
                                </Button>
                              </Link>
                            </li>
                          ))
                        }
                      </ul>
                    )}
                  </div>
                ) : (
                  <Link to={item.path}>
                    <Button 
                      variant="ghost" 
                      className={cn(
                        "w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                        isActive(item.path) ? "bg-sidebar-accent text-sidebar-primary" : ""
                      )}
                    >
                      <item.icon size={20} className="mr-2" />
                      {sidebarOpen && <span>{item.name}</span>}
                    </Button>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-sidebar-border mt-auto">
          <div className="flex items-center justify-between">
            {sidebarOpen && (
              <div className="flex items-center space-x-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback className="bg-sidebar-primary text-sidebar-primary-foreground">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-sidebar-foreground/70 capitalize">{user.role}</p>
                </div>
              </div>
            )}
            <Button 
              variant="ghost" 
              size="icon"
              onClick={logout}
              className="text-sidebar-foreground hover:bg-sidebar-accent"
            >
              <LogOut size={20} />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-background border-b p-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-foreground">
              {location.pathname === '/' ? 'Dashboard' : 
               location.pathname.split('/').filter(Boolean).map(part => 
                 part.charAt(0).toUpperCase() + part.slice(1)
               ).join(' ')}
            </h1>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">{user.email}</span>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-background">
          {children}
        </main>
      </div>
    </div>
  );
};

const LoadingScreen = () => (
  <div className="h-screen w-full flex flex-col items-center justify-center bg-background">
    <div className="space-y-4 w-[400px]">
      <Skeleton className="h-12 w-full" />
      <Skeleton className="h-4 w-3/4" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </div>
  </div>
);

export default AdminLayout;
