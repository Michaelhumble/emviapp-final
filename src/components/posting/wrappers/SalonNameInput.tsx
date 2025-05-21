
import React, { useEffect } from 'react';
import { FormItem, FormLabel, FormControl } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface SalonNameInputProps {
  value: string;
  onChange: (value: string) => void;
  id?: string;
}

const SalonNameInput: React.FC<SalonNameInputProps> = ({ value, onChange, id = "salonName" }) => {
  // Adding console log to help debug rendering issues
  console.log('SalonNameInput rendering with value:', value);

  // Add effect to log when component mounts
  useEffect(() => {
    console.log('SalonNameInput mounted');
    return () => console.log('SalonNameInput unmounted');
  }, []);

  return (
    <div className="mb-6 border-b pb-6 border-gray-200">
      <Label htmlFor={id} className="text-sm font-medium">
        Salon Name
      </Label>
      <div className="mt-1">
        <Input
          id={id}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Enter your salon name"
          className="w-full rounded-md border border-input px-3 py-2 text-sm"
        />
      </div>
      <p className="mt-1 text-xs text-muted-foreground">
        The name of your salon or business
      </p>
    </div>
  );
};

export default SalonNameInput;
