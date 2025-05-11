
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface HelperTipProps {
  icon?: string | React.ReactNode;
  children: React.ReactNode;
}

const HelperTip: React.FC<HelperTipProps> = ({ icon, children }) => {
  return (
    <div className="bg-purple-50 border border-purple-100 rounded-md p-3 my-2 text-sm flex items-start">
      {icon && (
        <span className="mr-2 text-purple-500 flex-shrink-0">
          {typeof icon === 'string' ? icon : icon}
        </span>
      )}
      <span className="text-purple-800">{children}</span>
    </div>
  );
};

export default HelperTip;
