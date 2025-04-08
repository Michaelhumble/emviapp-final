
import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ClientType } from '@/hooks/useBookingFilters';

interface ClientTypeFilterProps {
  clientType: ClientType;
  onChange: (value: ClientType) => void;
  options: { value: string; label: string }[];
}

const ClientTypeFilter: React.FC<ClientTypeFilterProps> = ({
  clientType,
  onChange,
  options
}) => {
  const handleClientTypeChange = (value: string) => {
    onChange(value as ClientType);
  };

  return (
    <Select value={clientType} onValueChange={handleClientTypeChange}>
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

export default ClientTypeFilter;
