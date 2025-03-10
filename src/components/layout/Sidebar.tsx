
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  ShoppingBag, 
  FolderTree, 
  BarChart4, 
  Settings, 
  ChevronRight,
  LogOut
} from 'lucide-react';

interface SidebarProps {
  collapsed: boolean;
}

const NavItem: React.FC<{
  to: string;
  icon: React.ElementType;
  label: string;
  collapsed: boolean;
}> = ({ to, icon: Icon, label, collapsed }) => {
  const location = useLocation();
  const isActive = location.pathname === to || 
                   (to !== '/' && location.pathname.startsWith(to));

  return (
    <NavLink 
      to={to} 
      className={({ isActive }) => `
        flex items-center px-4 py-3 text-sidebar-foreground hover:bg-sidebar-accent rounded-md
        transition-all duration-200 group
        ${isActive ? 'bg-sidebar-accent font-medium' : 'font-normal'}
        ${collapsed ? 'justify-center' : ''}
      `}
    >
      <Icon className={`w-5 h-5 ${collapsed ? '' : 'mr-3'}`} />
      {!collapsed && <span>{label}</span>}
      {collapsed && (
        <div className="absolute left-full rounded-md px-2 py-1 ml-6 bg-black text-white text-sm
                        invisible opacity-0 -translate-x-3 group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
                        transition-all duration-300 whitespace-nowrap z-50">
          {label}
        </div>
      )}
    </NavLink>
  );
};

export const Sidebar: React.FC<SidebarProps> = ({ collapsed }) => {
  const navItems = [
    { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/vendors', icon: Users, label: 'Vendors' },
    { to: '/products', icon: ShoppingBag, label: 'Products' },
    { to: '/categories', icon: FolderTree, label: 'Categories' },
    { to: '/sales', icon: BarChart4, label: 'Sales' },
    { to: '/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <aside 
      className={`
        fixed left-0 top-0 h-full bg-sidebar z-30
        transition-all duration-300 ease-in-out
        ${collapsed ? 'w-20' : 'w-64'}
      `}
    >
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className={`flex items-center ${collapsed ? 'justify-center' : 'justify-between'} py-6 px-4 border-b border-sidebar-border`}>
          {!collapsed ? (
            <>
              <h1 className="text-lg font-semibold text-white">VendorWatch</h1>
              <ChevronRight className="w-5 h-5 text-sidebar-foreground" />
            </>
          ) : (
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
              <span className="text-sidebar-background text-lg font-bold">V</span>
            </div>
          )}
        </div>

        {/* Nav Links */}
        <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <NavItem 
              key={item.to}
              to={item.to}
              icon={item.icon}
              label={item.label}
              collapsed={collapsed}
            />
          ))}
        </nav>

        {/* Footer */}
        <div className={`py-4 px-3 border-t border-sidebar-border ${collapsed ? 'text-center' : ''}`}>
          <button 
            className={`
              flex items-center text-sidebar-foreground hover:bg-sidebar-accent rounded-md 
              transition-all duration-200 w-full px-4 py-3 group
              ${collapsed ? 'justify-center' : ''}
            `}
          >
            <LogOut className={`w-5 h-5 ${collapsed ? '' : 'mr-3'}`} />
            {!collapsed && <span>Logout</span>}
            {collapsed && (
              <div className="absolute left-full rounded-md px-2 py-1 ml-6 bg-black text-white text-sm
                              invisible opacity-0 -translate-x-3 group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
                              transition-all duration-300 whitespace-nowrap z-50">
                Logout
              </div>
            )}
          </button>
        </div>
      </div>
    </aside>
  );
};
