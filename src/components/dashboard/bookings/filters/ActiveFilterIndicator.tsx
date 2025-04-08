
import React from 'react';
import { Filter } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

interface ActiveFilterIndicatorProps {
  activeFilterCount: number;
}

const ActiveFilterIndicator: React.FC<ActiveFilterIndicatorProps> = ({
  activeFilterCount
}) => {
  const { t } = useTranslation();
  
  if (activeFilterCount === 0) {
    return null;
  }
  
  return (
    <div className="flex items-center text-sm text-gray-500">
      <Filter className="mr-1 h-4 w-4" />
      {t(
        {
          english: `${activeFilterCount} active ${activeFilterCount === 1 ? 'filter' : 'filters'}`,
          vietnamese: `${activeFilterCount} bộ lọc đang hoạt động`
        }
      )}
    </div>
  );
};

export default ActiveFilterIndicator;
