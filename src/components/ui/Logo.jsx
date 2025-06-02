/**
 * LearnFlow Logo Component
 * Provides consistent logo usage throughout the application
 */

import React from 'react';

/**
 * Logo component with multiple variants
 * @param {Object} props - Component props
 * @param {string} props.variant - Logo variant ('full', 'horizontal', 'icon')
 * @param {string} props.size - Logo size ('sm', 'md', 'lg', 'xl')
 * @param {string} props.className - Additional CSS classes
 * @param {boolean} props.clickable - Whether logo should be clickable
 * @param {Function} props.onClick - Click handler
 */
const Logo = ({ 
  variant = 'horizontal', 
  size = 'md', 
  className = '', 
  clickable = false,
  onClick 
}) => {
  const sizeClasses = {
    sm: 'h-6 w-auto',
    md: 'h-8 w-auto',
    lg: 'h-12 w-auto',
    xl: 'h-16 w-auto',
    xxl: 'h-20 w-auto',
  };

  const logoSources = {
    full: '/assets/logos/learnflow-logo.svg',
    horizontal: '/assets/logos/learnflow-horizontal.svg',
    icon: '/assets/logos/learnflow-icon.svg',
  };

  const logoAlt = {
    full: 'LearnFlow - Learning Management System',
    horizontal: 'LearnFlow',
    icon: 'LearnFlow Icon',
  };

  const logoClass = `${sizeClasses[size]} object-contain ${className} ${clickable ? 'cursor-pointer hover:opacity-80 transition-opacity' : ''}`;

  const logoElement = (
    <img
      src={logoSources[variant]}
      alt={logoAlt[variant]}
      className={logoClass}
      onClick={clickable ? onClick : undefined}
      style={{ maxWidth: 'none' }}
    />
  );

  return logoElement;
};

/**
 * Predefined logo variants for common use cases
 */

// Header logo (horizontal, medium size)
export const HeaderLogo = ({ onClick, className = '' }) => (
  <Logo 
    variant="horizontal" 
    size="md" 
    clickable={!!onClick}
    onClick={onClick}
    className={className}
  />
);

// Auth page logo (full logo, large size)
export const AuthLogo = ({ className = '' }) => (
  <Logo 
    variant="full" 
    size="xl" 
    className={className}
  />
);

// Demo page logo (full logo, extra large size)
export const DemoLogo = ({ className = '' }) => (
  <Logo 
    variant="full" 
    size="xxl" 
    className={className}
  />
);

// Footer logo (horizontal, small size)
export const FooterLogo = ({ className = '' }) => (
  <Logo 
    variant="horizontal" 
    size="sm" 
    className={className}
  />
);

// Icon only (for favicons, small spaces)
export const IconLogo = ({ size = 'md', className = '' }) => (
  <Logo 
    variant="icon" 
    size={size} 
    className={className}
  />
);

/**
 * Logo with text component for custom layouts
 */
export const LogoWithText = ({ 
  showTagline = false, 
  size = 'md', 
  className = '' 
}) => {
  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl',
  };

  const taglineSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
    xl: 'text-lg',
  };

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <IconLogo size={size} />
      <div className="flex flex-col">
        <div className={`font-bold text-gray-900 ${textSizes[size]}`}>
          <span>Learn</span>
          <span className="text-primary-600">Flow</span>
        </div>
        {showTagline && (
          <div className={`text-gray-600 ${taglineSizes[size]}`}>
            Learning Management System
          </div>
        )}
      </div>
    </div>
  );
};

export default Logo;
