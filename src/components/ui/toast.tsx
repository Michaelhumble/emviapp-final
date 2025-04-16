
import React from 'react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ToastProps {
  title?: string;
  description?: string;
  variant?: 'default' | 'success' | 'error' | 'warning' | 'info';
  onClose?: () => void;
}

export const Toast: React.FC<ToastProps> = ({
  title,
  description,
  variant = 'default',
  onClose,
}) => {
  const variantClassMap = {
    default: 'bg-white border-gray-200',
    success: 'bg-green-50 border-green-200',
    error: 'bg-red-50 border-red-200',
    warning: 'bg-yellow-50 border-yellow-200',
    info: 'bg-blue-50 border-blue-200',
  };
  
  const variantIconMap = {
    default: null,
    success: <CheckCircle className="h-5 w-5 text-green-500" />,
    error: <AlertCircle className="h-5 w-5 text-red-500" />,
    warning: <AlertTriangle className="h-5 w-5 text-yellow-500" />,
    info: <Info className="h-5 w-5 text-blue-500" />,
  };

  return (
    <div
      className={cn(
        'p-4 rounded-lg shadow-md border w-full max-w-sm pointer-events-auto animate-in slide-in-from-right-5',
        variantClassMap[variant]
      )}
    >
      <div className="flex items-start">
        {variantIconMap[variant] && (
          <div className="flex-shrink-0 mr-3">{variantIconMap[variant]}</div>
        )}
        <div className="flex-1">
          {title && <h4 className="font-medium text-gray-900">{title}</h4>}
          {description && <p className="mt-1 text-sm text-gray-600">{description}</p>}
        </div>
        <button
          onClick={onClose}
          className="flex-shrink-0 ml-3 text-gray-400 hover:text-gray-500"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};
