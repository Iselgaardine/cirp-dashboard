// src/components/DashboardLayout.tsx
import React, { useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { Menu, X, Activity, Bell, Users, Settings as SettingsIcon, ChevronRight } from 'lucide-react';

const DashboardLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  
  // Funktion zur Ermittlung des aktuellen Seitennamens
  const getPageTitle = () => {
    switch (location.pathname) {
      case '/':
        return 'Dashboard';
      case '/incidents':
        return 'Aktive Vorfälle';
      case '/response':
        return 'Incident Response';
      case '/team':
        return 'Team & Kontakte';
      case '/settings':
        return 'Einstellungen';
      default:
        return 'CIRP Dashboard';
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-0 left-0 z-20 p-4">
        <button
          onClick={() => setSidebarOpen(true)}
          className="p-2 bg-white rounded-md shadow-md"
        >
          <Menu className="h-6 w-6 text-gray-600" />
        </button>
      </div>
      
      {/* Sidebar for mobile */}
      <div className={`lg:hidden fixed inset-0 z-30 bg-black bg-opacity-50 transition-opacity ${sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className={`fixed inset-y-0 left-0 w-64 bg-white shadow-lg transform transition-transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-xl font-bold">CIRP Dashboard</h2>
            <button onClick={() => setSidebarOpen(false)}>
              <X className="h-6 w-6 text-gray-600" />
            </button>
          </div>
          <nav className="p-4">
            <NavMenu />
          </nav>
        </div>
      </div>
      
      {/* Desktop layout */}
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar Navigation - Desktop */}
        <div className="hidden lg:block w-64 bg-white shadow-md">
          <div className="p-4 border-b">
            <h2 className="text-xl font-bold">CIRP Dashboard</h2>
          </div>
          <nav className="p-4">
            <NavMenu />
          </nav>
        </div>
        
        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <header className="bg-white shadow-sm z-10">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center">
                <h1 className="text-xl font-semibold">{getPageTitle()}</h1>
              </div>
              <div className="flex items-center space-x-4">
                <button className="p-2 text-gray-600 hover:text-gray-900">
                  <Bell className="h-5 w-5" />
                </button>
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center">
                  <span className="font-medium text-sm">AM</span>
                </div>
              </div>
            </div>
            
            {/* Breadcrumbs */}
            <div className="px-4 py-2 flex items-center text-sm text-gray-500">
              <span>Dashboard</span>
              {location.pathname !== '/' && (
                <>
                  <ChevronRight className="h-4 w-4 mx-1" />
                  <span>{getPageTitle()}</span>
                </>
              )}
            </div>
          </header>
          
          {/* Page Content */}
          <main className="flex-1 overflow-y-auto bg-gray-100">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

// Navigation Menu Component
const NavMenu: React.FC = () => {
  return (
    <ul className="space-y-2">
      <li>
        <NavLink 
          to="/" 
          end
          className={({ isActive }) => 
            `flex items-center p-2 rounded ${isActive ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`
          }
        >
          <Activity className="h-5 w-5 mr-3" />
          <span>Dashboard</span>
        </NavLink>
      </li>
      <li>
        <NavLink 
          to="/incidents" 
          className={({ isActive }) => 
            `flex items-center p-2 rounded ${isActive ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`
          }
        >
          <Bell className="h-5 w-5 mr-3" />
          <span>Aktive Vorfälle</span>
        </NavLink>
      </li>
      <li>
        <NavLink 
          to="/response" 
          className={({ isActive }) => 
            `flex items-center p-2 rounded ${isActive ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`
          }
        >
          <Activity className="h-5 w-5 mr-3" />
          <span>Incident Response</span>
        </NavLink>
      </li>
      <li>
        <NavLink 
          to="/team" 
          className={({ isActive }) => 
            `flex items-center p-2 rounded ${isActive ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`
          }
        >
          <Users className="h-5 w-5 mr-3" />
          <span>Team & Kontakte</span>
        </NavLink>
      </li>
      <li>
        <NavLink 
          to="/settings" 
          className={({ isActive }) => 
            `flex items-center p-2 rounded ${isActive ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`
          }
        >
          <SettingsIcon className="h-5 w-5 mr-3" />
          <span>Einstellungen</span>
        </NavLink>
      </li>
    </ul>
  );
};

export default DashboardLayout;