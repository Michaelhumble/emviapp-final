import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface AccessibleFormFieldProps {
  id: string;
  label: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export const AccessibleFormField: React.FC<AccessibleFormFieldProps> = ({
  id,
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
  error,
  disabled = false,
  className = '',
  children,
}) => {
  const errorId = `${id}-error`;
  const hasError = Boolean(error);

  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-sm font-medium text-foreground">
        {label}
        {required && (
          <span className="text-destructive ml-1" aria-label="required field">
            *
          </span>
        )}
      </Label>
      
      {children ? (
        React.cloneElement(children as React.ReactElement, {
          id,
          'aria-invalid': hasError,
          'aria-describedby': hasError ? errorId : undefined,
        })
      ) : (
        <Input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          aria-invalid={hasError}
          aria-describedby={hasError ? errorId : undefined}
          className={`focus:ring-2 focus:ring-primary focus:ring-offset-2 ${className}`}
        />
      )}
      
      {hasError && (
        <div
          id={errorId}
          role="alert"
          aria-live="polite"
          className="text-sm text-destructive font-medium"
        >
          {error}
        </div>
      )}
    </div>
  );
};