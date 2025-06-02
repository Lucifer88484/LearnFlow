/**
 * Main App Component
 * Root component that handles authentication and routing
 */

import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { FullPageLoader } from './components/ui/LoadingSpinner';
import Header from './components/layout/Header';
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';
import CoursesPage from './pages/CoursesPage';
import ProfilePage from './pages/ProfilePage';
import DemoPage from './pages/DemoPage';

/**
 * Main application component with routing logic
 */
const AppContent = () => {
  const { currentUser, userProfile, loading } = useAuth();
  const [currentPage, setCurrentPage] = useState('dashboard');

  // Show loading spinner while checking authentication
  if (loading) {
    return <FullPageLoader text="Loading application..." />;
  }

  // Show authentication page if user is not logged in
  if (!currentUser) {
    return <AuthPage />;
  }

  /**
   * Handle navigation between pages
   * @param {string} page - Page to navigate to
   */
  const handleNavigate = (page) => {
    setCurrentPage(page);
  };

  /**
   * Render the current page based on navigation state
   */
  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'courses':
      case 'my-courses':
        return <CoursesPage type={currentPage} />;
      case 'profile':
        return <ProfilePage />;
      case 'demo':
        return <DemoPage />;
      case 'create-course':
        return <div className="p-8 text-center">Create Course Page - Coming Soon</div>;
      case 'students':
        return <div className="p-8 text-center">Students Page - Coming Soon</div>;
      case 'users':
        return <div className="p-8 text-center">User Management Page - Coming Soon</div>;
      case 'analytics':
        return <div className="p-8 text-center">Analytics Page - Coming Soon</div>;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onNavigate={handleNavigate} currentPage={currentPage} />

      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {renderCurrentPage()}
      </main>
    </div>
  );
};

/**
 * Root App component with providers
 */
const App = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;
