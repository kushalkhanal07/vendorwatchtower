
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Menu, Search, Bell, Sun, Moon, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface HeaderProps {
  toggleSidebar: () => void;
  sidebarCollapsed: boolean;
}

// Mock notifications data
const notifications = [
  { id: 1, title: 'New Order', description: 'You have received a new order #1234', time: '2 minutes ago', read: false },
  { id: 2, title: 'Low Stock Alert', description: 'Smartphone X is running low on stock', time: '1 hour ago', read: false },
  { id: 3, title: 'Payment Received', description: 'Payment from Fashion Forward has been processed', time: '3 hours ago', read: true },
  { id: 4, title: 'New Vendor', description: 'Tech Solutions Inc. has been added as a vendor', time: '1 day ago', read: true },
  { id: 5, title: 'System Update', description: 'VendorWatch has been updated to version 2.1', time: '2 days ago', read: true },
];

export const Header: React.FC<HeaderProps> = ({ toggleSidebar, sidebarCollapsed }) => {
  const location = useLocation();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  
  // Count unread notifications
  const unreadCount = notifications.filter(notif => !notif.read).length;

  // Get page title based on current route
  const getPageTitle = () => {
    const path = location.pathname;
    
    if (path === '/') return 'Dashboard';
    if (path === '/vendors') return 'Vendors';
    if (path === '/vendors/add') return 'Add Vendor';
    if (path.startsWith('/vendors/')) return 'Vendor Details';
    if (path === '/products') return 'Products';
    if (path.startsWith('/products/')) return 'Product Details';
    if (path === '/categories') return 'Categories';
    if (path === '/sales') return 'Sales';
    if (path === '/settings') return 'Settings';
    if (path === '/login') return 'Login';
    if (path === '/forgot-password') return 'Forgot Password';
    
    return 'Not Found';
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
    setIsDarkMode(!isDarkMode);
  };

  return (
    <header className="sticky top-0 z-20 h-16 flex items-center justify-between px-6 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleSidebar} 
          className="text-foreground hover:bg-secondary"
        >
          <Menu className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-semibold text-foreground">{getPageTitle()}</h1>
      </div>
      
      <div className="flex-1 max-w-md mx-10 hidden md:block">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            className="w-full pl-10 py-5 rounded-full bg-secondary/80 border-transparent focus:border-primary"
            placeholder="Search..." 
          />
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={toggleDarkMode} className="text-foreground">
          {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
        
        <Popover open={notificationsOpen} onOpenChange={setNotificationsOpen}>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="text-foreground relative">
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute top-2 right-2 w-2 h-2 bg-destructive rounded-full"></span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0" align="end">
            <div className="px-4 py-3 border-b border-border flex items-center justify-between">
              <h3 className="font-semibold">Notifications</h3>
              {unreadCount > 0 && (
                <span className="text-xs bg-primary text-white px-2 py-1 rounded-full">
                  {unreadCount} new
                </span>
              )}
            </div>
            <div className="max-h-[400px] overflow-auto">
              {notifications.length > 0 ? (
                notifications.map((notification) => (
                  <div 
                    key={notification.id} 
                    className={`px-4 py-3 border-b border-border hover:bg-secondary/50 transition-colors ${
                      !notification.read ? 'bg-primary/5' : ''
                    }`}
                  >
                    <div className="flex justify-between mb-1">
                      <h4 className={`text-sm font-semibold ${!notification.read ? 'text-primary' : ''}`}>
                        {notification.title}
                      </h4>
                      <span className="text-xs text-muted-foreground">{notification.time}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{notification.description}</p>
                  </div>
                ))
              ) : (
                <div className="py-8 text-center">
                  <p className="text-muted-foreground">No notifications yet</p>
                </div>
              )}
            </div>
            <div className="p-2 border-t border-border">
              <Button variant="ghost" className="w-full text-sm">
                Mark all as read
              </Button>
            </div>
          </PopoverContent>
        </Popover>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full overflow-hidden">
              <User className="h-6 w-6 text-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};
