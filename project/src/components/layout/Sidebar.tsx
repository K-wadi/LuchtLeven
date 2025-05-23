import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, CreditCard, TrendingUp, Wallet, Target, Activity, BarChart3, CloudLightning } from 'lucide-react';

interface SidebarProps {
  isMobile?: boolean;
  closeMobileMenu?: () => void;
}

const Sidebar = ({ isMobile = false, closeMobileMenu }: SidebarProps) => {
  const handleClick = () => {
    if (isMobile && closeMobileMenu) {
      closeMobileMenu();
    }
  };

  const navItems = [
    { path: '/', name: 'Dashboard', icon: <Home size={20} /> },
    { path: '/income', name: 'Inkomsten', icon: <TrendingUp size={20} /> },
    { path: '/expenses', name: 'Uitgaven', icon: <CreditCard size={20} /> },
    { path: '/fixed-costs', name: 'Vaste Lasten', icon: <Wallet size={20} /> },
    { path: '/goals', name: 'Doelen', icon: <Target size={20} /> },
    { path: '/health', name: 'Gezondheid', icon: <Activity size={20} /> },
    { path: '/overview', name: 'Overzicht', icon: <BarChart3 size={20} /> },
  ];

  return (
    <aside className="h-full flex flex-col bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
      {/* Logo and title */}
      <div className="p-5 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center">
          <CloudLightning className="text-blue-500 h-8 w-8" />
          <span className="ml-2 text-xl font-bold text-blue-600 dark:text-blue-400">Luchtleven</span>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Persoonlijke Financiën</p>
      </div>
      
      {/* Navigation items */}
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-3">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                onClick={handleClick}
                className={({ isActive }) => 
                  `flex items-center px-3 py-2.5 rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium' 
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`
                }
              >
                <span className="mr-3">{item.icon}</span>
                <span>{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      
      {/* Footer */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="text-xs text-gray-500 dark:text-gray-400">
          <p>© 2025 Luchtleven</p>
          <p className="mt-1">Versie 1.0</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;