/**
 * Loading Spinner Component
 * Provides consistent loading indicators throughout the app
 */

import React from 'react';
import { Loader2 } from 'lucide-react';

/**
 * Loading spinner with customizable size and text
 * @param {Object} props - Component props
 * @param {string} props.size - Spinner size ('sm', 'md', 'lg')
 * @param {string} props.text - Loading text to display
 * @param {boolean} props.center - Whether to center the spinner
 * @param {string} props.className - Additional CSS classes
 */
const LoadingSpinner = ({ 
  size = 'md', 
  text = 'Loading...', 
  center = false,
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
  };

  const containerClasses = center 
    ? 'flex flex-col items-center justify-center min-h-[200px]'
    : 'flex items-center space-x-2';

  return (
    <div className={`${containerClasses} ${className}`}>
      <Loader2 className={`animate-spin ${sizeClasses[size]}`} />
      {text && (
        <span className={`text-sm text-muted-foreground ${center ? 'mt-2' : ''}`}>
          {text}
        </span>
      )}
    </div>
  );
};

/**
 * Full page loading spinner
 */
export const FullPageLoader = ({ text = 'Loading...' }) => {
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        <Loader2 className="h-8 w-8 animate-spin" />
        <p className="text-sm text-muted-foreground">{text}</p>
      </div>
    </div>
  );
};

/**
 * Skeleton loader for content placeholders
 */
export const Skeleton = ({ className = '', ...props }) => {
  return (
    <div
      className={`skeleton ${className}`}
      {...props}
    />
  );
};

export default LoadingSpinner;
