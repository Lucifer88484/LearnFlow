/**
 * Header Component
 * Main navigation header with user menu and role-based navigation
 */

import React, { useState } from 'react';
import { 
  BookOpen, 
  User, 
  LogOut, 
  Settings, 
  Menu, 
  X,
  GraduationCap,
  Users,
  BarChart3
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../ui/Button';
import { HeaderLogo } from '../ui/Logo';

/**
 * Header component with navigation and user menu
 * @param {Object} props - Component props
 * @param {Function} props.onNavigate - Navigation handler
 * @param {string} props.currentPage - Current active page
 */
const Header = ({ onNavigate, currentPage }) => {
  const { currentUser, userProfile, logout, hasRole, hasAnyRole } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  /**
   * Handle user logout
   */
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  /**
   * Navigation items based on user role
   */
  const getNavigationItems = () => {
    const items = [];

    // Add demo link for all users
    items.push({ id: 'demo', label: 'Demo', icon: BookOpen });

    if (hasRole('student')) {
      items.push(
        { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
        { id: 'courses', label: 'Browse Courses', icon: BookOpen },
        { id: 'my-courses', label: 'My Courses', icon: GraduationCap }
      );
    }

    if (hasRole('instructor')) {
      items.push(
        { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
        { id: 'my-courses', label: 'My Courses', icon: BookOpen },
        { id: 'create-course', label: 'Create Course', icon: GraduationCap },
        { id: 'students', label: 'Students', icon: Users }
      );
    }

    if (hasRole('admin')) {
      items.push(
        { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
        { id: 'courses', label: 'All Courses', icon: BookOpen },
        { id: 'users', label: 'Manage Users', icon: Users },
        { id: 'analytics', label: 'Analytics', icon: BarChart3 }
      );
    }

    return items;
  };

  const navigationItems = getNavigationItems();

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <HeaderLogo onClick={() => onNavigate('dashboard')} />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:ml-8 md:flex md:space-x-8">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => onNavigate(item.id)}
                    className={`inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 transition-colors ${
                      currentPage === item.id
                        ? 'border-primary-500 text-primary-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {item.label}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            {/* User Info Display */}
            <div className="hidden sm:flex sm:items-center sm:space-x-2">
              <div className="text-sm text-gray-500">
                Welcome, <span className="font-medium text-gray-900">{userProfile?.name}</span>
              </div>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                {userProfile?.role}
              </span>
            </div>

            {/* User Menu Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                <div className="h-8 w-8 rounded-full bg-primary-600 flex items-center justify-center">
                  <User className="h-5 w-5 text-white" />
                </div>
              </button>

              {showUserMenu && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    <div className="px-4 py-2 text-sm text-gray-700 border-b">
                      <div className="font-medium">{userProfile?.name}</div>
                      <div className="text-gray-500">{currentUser?.email}</div>
                      <div className="text-xs text-primary-600 mt-1">
                        UID: {currentUser?.uid}
                      </div>
                    </div>
                    
                    <button
                      onClick={() => {
                        onNavigate('profile');
                        setShowUserMenu(false);
                      }}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <Settings className="h-4 w-4 mr-3" />
                      Profile Settings
                    </button>
                    
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <LogOut className="h-4 w-4 mr-3" />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
            >
              {showMobileMenu ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {showMobileMenu && (
          <div className="md:hidden">
            <div className="pt-2 pb-3 space-y-1">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onNavigate(item.id);
                      setShowMobileMenu(false);
                    }}
                    className={`flex items-center w-full px-3 py-2 text-base font-medium rounded-md transition-colors ${
                      currentPage === item.id
                        ? 'bg-primary-50 border-primary-500 text-primary-700'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="h-5 w-5 mr-3" />
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Click outside to close menus */}
      {(showUserMenu || showMobileMenu) && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => {
            setShowUserMenu(false);
            setShowMobileMenu(false);
          }}
        />
      )}
    </header>
  );
};

export default Header;
