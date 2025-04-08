
import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface ServiceTypeFilterProps {
  serviceType: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}

const ServiceTypeFilter: React.FC<ServiceTypeFilterProps> = ({
  serviceType,
  onChange,
  options
}) => {
  return (
    <Select value={serviceType} onValueChange={onChange}>
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

export default ServiceTypeFilter;
