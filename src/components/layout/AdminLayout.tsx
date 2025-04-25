
import React, { useState } from 'react';
import { Link, useLocation, Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
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
import { useMenu } from '@/hooks/useMenu';
import { MenuItem } from '@/services/authService';

interface AdminLayoutProps {
  children: React.ReactNode;
}

// A mapping of icon string names to Lucide icon components
const iconMap: Record<string, React.ElementType> = {
  Home: Home,
  BarChart: BarChart,
  Users: Users,
  LineChart: LineChart,
  Activity: Activity,
  PieChart: PieChart,
};

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { user, logout, isLoading: authLoading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});
  const location = useLocation();
  const { menu, isLoading: menuLoading } = useMenu();
  
  const isLoading = authLoading || menuLoading;
  
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
  
  // Render a menu item (or submenu)
  const renderMenuItem = (item: MenuItem) => {
    const IconComponent = iconMap[item.icon] || Home;
    
    if (item.children && item.children.length > 0) {
      return (
        <li key={item.id} className="px-2 py-1">
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
                <IconComponent size={20} className="mr-2" />
                {sidebarOpen && <span>{item.name}</span>}
              </div>
              {sidebarOpen && (
                openMenus[item.name] ? <ChevronDown size={16} /> : <ChevronRight size={16} />
              )}
            </Button>
            
            {sidebarOpen && openMenus[item.name] && (
              <ul className="pl-6 space-y-1">
                {item.children.map(subItem => {
                  const SubIconComponent = iconMap[subItem.icon] || Home;
                  return (
                    <li key={subItem.id}>
                      <Link to={subItem.path}>
                        <Button 
                          variant="ghost" 
                          className={cn(
                            "w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                            isActive(subItem.path) ? "bg-sidebar-accent text-sidebar-primary" : ""
                          )}
                        >
                          <SubIconComponent size={18} className="mr-2" />
                          <span>{subItem.name}</span>
                        </Button>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </li>
      );
    } else {
      return (
        <li key={item.id} className="px-2 py-1">
          <Link to={item.path}>
            <Button 
              variant="ghost" 
              className={cn(
                "w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                isActive(item.path) ? "bg-sidebar-accent text-sidebar-primary" : ""
              )}
            >
              <IconComponent size={20} className="mr-2" />
              {sidebarOpen && <span>{item.name}</span>}
            </Button>
          </Link>
        </li>
      );
    }
  };
  
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
            {menuLoading ? (
              // Show skeleton loaders while menu is loading
              Array(4).fill(0).map((_, index) => (
                <li key={index} className="px-2 py-1">
                  <div className="flex items-center space-x-2 p-2">
                    <Skeleton className="h-5 w-5 rounded-md" />
                    {sidebarOpen && <Skeleton className="h-5 w-24 rounded-md" />}
                  </div>
                </li>
              ))
            ) : (
              menu.map(renderMenuItem)
            )}
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
