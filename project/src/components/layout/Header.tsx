import React, { useState } from 'react';
import { Menu, X, Moon, Sun, Bell, User } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import Sidebar from './Sidebar';

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const { currentUser, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen);
  };

  return (
    <header className="sticky top-0 z-30 bg-white dark:bg-gray-800 shadow-sm">
      <div className="px-4 py-3 flex items-center justify-between">
        {/* Mobile menu button */}
        <button 
          className="md:hidden text-gray-500 hover:text-blue-500 focus:outline-none" 
          onClick={toggleMobileMenu}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        
        {/* Logo - visible on mobile only */}
        <div className="md:hidden font-bold text-xl text-blue-600 dark:text-blue-400">
          Luchtleven
        </div>
        
        {/* Right side header items */}
        <div className="flex items-center space-x-4">
          {/* Theme toggle */}
          <button 
            className="text-gray-500 hover:text-blue-500 focus:outline-none" 
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Schakel naar licht thema' : 'Schakel naar donker thema'}
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          
          {/* Notifications */}
          <button className="text-gray-500 hover:text-blue-500 focus:outline-none relative">
            <Bell size={20} />
            <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
          </button>
          
          {/* User menu */}
          <div className="relative">
            <button 
              className="flex items-center text-gray-500 hover:text-blue-500 focus:outline-none"
              onClick={toggleUserMenu}
            >
              <User size={20} className="mr-1" />
              <span className="hidden sm:inline text-sm font-medium">
                {currentUser?.name || currentUser?.email}
              </span>
            </button>
            
            {userMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 py-2 bg-white dark:bg-gray-800 rounded-md shadow-lg z-50 border border-gray-200 dark:border-gray-700">
                <a href="#profile" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                  Profiel
                </a>
                <a href="#settings" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                  Instellingen
                </a>
                <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>
                <button 
                  className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => logout()}
                >
                  Uitloggen
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-gray-800 bg-opacity-50">
          <div className="fixed inset-y-0 left-0 w-3/4 max-w-sm bg-white dark:bg-gray-800 shadow-xl z-50 overflow-y-auto">
            <div className="flex justify-end p-4">
              <button onClick={toggleMobileMenu} className="text-gray-500 hover:text-blue-500">
                <X size={24} />
              </button>
            </div>
            <Sidebar isMobile={true} closeMobileMenu={() => setMobileMenuOpen(false)} />
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;