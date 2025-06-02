/**
 * Reusable Input Component
 * Provides consistent styling and behavior for form inputs
 */

import React, { forwardRef } from 'react';

/**
 * Input component with label and error handling
 * @param {Object} props - Component props
 * @param {string} props.label - Input label
 * @param {string} props.error - Error message
 * @param {string} props.type - Input type
 * @param {string} props.placeholder - Input placeholder
 * @param {boolean} props.required - Whether input is required
 * @param {string} props.className - Additional CSS classes
 * @param {Object} props.rest - Additional props
 */
const Input = forwardRef(({
  label,
  error,
  type = 'text',
  placeholder,
  required = false,
  className = '',
  ...rest
}, ref) => {
  const inputId = rest.id || rest.name || `input-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className="space-y-2">
      {label && (
        <label htmlFor={inputId} className="label">
          {label}
          {required && <span className="text-error-500 ml-1">*</span>}
        </label>
      )}
      <input
        ref={ref}
        id={inputId}
        type={type}
        placeholder={placeholder}
        className={`input ${error ? 'border-error-500 focus:ring-error-500' : ''} ${className}`}
        {...rest}
      />
      {error && (
        <p className="text-sm text-error-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
