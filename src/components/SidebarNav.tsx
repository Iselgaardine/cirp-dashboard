// src/components/SidebarNav.tsx
import React from 'react';
import { JSX } from 'react/jsx-runtime';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  AlertTriangle,
  RefreshCw,
  FileText,
  Users,
  Settings
} from 'lucide-react';

interface NavItem {
  title: string;
  icon: React.ReactNode;
  path: string;
}

const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    icon: <LayoutDashboard size={20} />,
    path: '/'
  },
  {
    title: 'Aktive Vorfälle',
    icon: <AlertTriangle size={20} />,
    path: '/active-incidents'
  },
  {
    title: 'Incident Response',
    icon: <RefreshCw size={20} />,
    path: '/response'
  },
  {
    title: 'Dokumentation',
    icon: <FileText size={20} />,
    path: '/documentation'
  },
  {
    title: 'Team & Kontakte',
    icon: <Users size={20} />,
    path: '/team'
  },
  {
    title: 'Einstellungen',
    icon: <Settings size={20} />,
    path: '/settings'
  }
];

const SidebarNav = (): JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActiveRoute = (path: string): boolean => {
    if (path === '/' && location.pathname === '/') {
      return true;
    }
    return path !== '/' && location.pathname.startsWith(path);
  };

  return (
    <div className="mt-6 bg-blue-900">
      {navItems.map((navItem, idx) => {
        const isActive = isActiveRoute(navItem.path);
        return (
          <div
            key={idx}
            onClick={() => navigate(navItem.path)}
            className={`
              flex items-center px-4 py-3 cursor-pointer
              ${isActive 
                ? 'bg-blue-700 text-white font-bold border-r-4 border-blue-500' 
                : 'text-gray-100 hover:bg-blue-800'
              }
              transition-colors duration-200
            `}
          >
            <span className={`mr-3 flex items-center ${isActive ? 'text-white' : 'text-gray-300'}`}>
              {navItem.icon}
            </span>
            <span>{navItem.title}</span>
          </div>
        );
      })}
    </div>
  );
};

export default SidebarNav;