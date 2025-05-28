
import React from 'react';
import { cn } from '@/lib/utils';

interface FileUploadProps {
  className?: string;
  children?: React.ReactNode;
}

export const FileUpload: React.FC<FileUploadProps> = ({ className, children }) => {
  return (
    <div className={cn("border-2 border-dashed border-gray-300 rounded-lg p-4", className)}>
      {children}
    </div>
  );
};
