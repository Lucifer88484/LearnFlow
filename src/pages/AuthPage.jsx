/**
 * Authentication Page
 * Handles user login, signup, and password reset
 */

import React, { useState } from 'react';
import { BookOpen, ArrowLeft } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import LoginForm from '../components/auth/LoginForm';
import SignupForm from '../components/auth/SignupForm';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card from '../components/ui/Card';
import { AuthLogo } from '../components/ui/Logo';

/**
 * Authentication page with multiple modes
 */
const AuthPage = () => {
  const [mode, setMode] = useState('login'); // 'login', 'signup', 'forgot-password'
  const [resetEmail, setResetEmail] = useState('');
  const [resetLoading, setResetLoading] = useState(false);
  const [resetMessage, setResetMessage] = useState('');

  const { resetPassword, error: authError, setError } = useAuth();

  /**
   * Handle forgot password form submission
   * @param {Event} e - Form submit event
   */
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    
    if (!resetEmail) {
      setError('Please enter your email address');
      return;
    }

    setResetLoading(true);
    setResetMessage('');
    
    try {
      await resetPassword(resetEmail);
      setResetMessage('Password reset email sent! Check your inbox.');
      setError(null);
    } catch (error) {
      console.error('Password reset error:', error);
    } finally {
      setResetLoading(false);
    }
  };

  /**
   * Render forgot password form
   */
  const renderForgotPasswordForm = () => (
    <Card className="w-full max-w-md mx-auto">
      <Card.Header className="text-center">
        <Card.Title className="text-2xl font-bold">Reset Password</Card.Title>
        <Card.Description>
          Enter your email address and we'll send you a link to reset your password
        </Card.Description>
      </Card.Header>

      <Card.Content>
        <form onSubmit={handleForgotPassword} className="space-y-4">
          {authError && (
            <div className="p-3 text-sm text-error-600 bg-error-50 border border-error-200 rounded-md">
              {authError}
            </div>
          )}

          {resetMessage && (
            <div className="p-3 text-sm text-success-600 bg-success-50 border border-success-200 rounded-md">
              {resetMessage}
            </div>
          )}

          <Input
            type="email"
            placeholder="Enter your email address"
            value={resetEmail}
            onChange={(e) => setResetEmail(e.target.value)}
            required
          />

          <Button
            type="submit"
            className="w-full"
            loading={resetLoading}
            disabled={resetLoading}
          >
            Send Reset Link
          </Button>
        </form>
      </Card.Content>

      <Card.Footer className="justify-center">
        <button
          type="button"
          onClick={() => {
            setMode('login');
            setResetEmail('');
            setResetMessage('');
            setError(null);
          }}
          className="flex items-center text-sm text-primary-600 hover:text-primary-700"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Sign In
        </button>
      </Card.Footer>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <AuthLogo />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {mode === 'login' && 'Welcome back to LearnFlow'}
          {mode === 'signup' && 'Join the LearnFlow community'}
          {mode === 'forgot-password' && 'Reset your password'}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          {mode === 'login' && 'Sign in to continue your learning journey'}
          {mode === 'signup' && 'Create an account to get started with LearnFlow'}
          {mode === 'forgot-password' && 'We\'ll help you get back to learning'}
        </p>
      </div>

      {/* Form Content */}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        {mode === 'login' && (
          <LoginForm
            onToggleMode={() => setMode('signup')}
            onForgotPassword={() => setMode('forgot-password')}
          />
        )}
        
        {mode === 'signup' && (
          <SignupForm
            onToggleMode={() => setMode('login')}
          />
        )}
        
        {mode === 'forgot-password' && renderForgotPasswordForm()}
      </div>

      {/* Footer */}
      <div className="mt-8 text-center">
        <p className="text-xs text-gray-500">
          By signing up, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>

      {/* Demo Information */}
      <div className="mt-8 max-w-md mx-auto">
        <Card className="bg-blue-50 border-blue-200">
          <Card.Content className="p-4">
            <h3 className="text-sm font-medium text-blue-900 mb-2">Demo Information</h3>
            <div className="text-xs text-blue-700 space-y-1">
              <p><strong>Student Demo:</strong> student@demo.com / password123</p>
              <p><strong>Instructor Demo:</strong> instructor@demo.com / password123</p>
              <p><strong>Admin Demo:</strong> admin@demo.com / password123</p>
            </div>
          </Card.Content>
        </Card>
      </div>
    </div>
  );
};

export default AuthPage;
