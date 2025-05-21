
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
  // Enhanced debug logging
  console.log('SalonNameInput RENDERING with value:', value, 'and id:', id);
  
  // Add effect to log when component mounts
  useEffect(() => {
    console.log('SalonNameInput MOUNTED with id:', id);
    return () => console.log('SalonNameInput UNMOUNTED with id:', id);
  }, [id]);

  return (
    <div className="mb-4">
      <Label htmlFor={id} className="text-base font-medium text-gray-900 block mb-2">
        Salon Name <span className="text-red-500">*</span>
      </Label>
      <div className="mt-1">
        <Input
          id={id}
          type="text"
          value={value}
          onChange={(e) => {
            console.log('SalonNameInput CHANGE:', e.target.value);
            onChange(e.target.value);
          }}
          placeholder="Enter your salon name"
          className="w-full rounded-xl h-12 border-gray-300 bg-white hover:border-gray-400 focus:border-gray-500 focus:ring-1 focus:ring-gray-500 transition-all duration-200"
        />
      </div>
      <p className="mt-1 text-sm text-gray-500">
        The name of your salon or business
      </p>
    </div>
  );
};

export default SalonNameInput;
