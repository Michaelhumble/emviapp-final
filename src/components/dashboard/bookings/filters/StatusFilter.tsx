
import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { BookingStatus } from '@/hooks/useBookingFilters';
import { useTranslation } from '@/hooks/useTranslation';

interface StatusFilterProps {
  status: BookingStatus;
  onChange: (value: BookingStatus) => void;
  options: { value: string; label: string }[];
}

const StatusFilter: React.FC<StatusFilterProps> = ({ 
  status, 
  onChange, 
  options 
}) => {
  const handleStatusChange = (value: string) => {
    onChange(value as BookingStatus);
  };

  return (
    <Select value={status} onValueChange={handleStatusChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={options[0].label} />
      </SelectTrigger>
      <SelectContent>
        {options.map(option => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default StatusFilter;
