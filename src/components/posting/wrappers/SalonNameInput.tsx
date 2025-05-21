
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
    <div className="mb-6 border-4 border-red-500 p-6 bg-yellow-50 rounded-md shadow-lg">
      <h3 className="text-xl font-bold mb-4 text-red-800">🔴 SALON INFORMATION 🔴</h3>
      <Label htmlFor={id} className="text-lg font-bold block mb-2 text-black">
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
          className="w-full rounded-md border-2 border-gray-400 px-4 py-3 text-lg font-medium"
        />
      </div>
      <p className="mt-3 text-sm font-medium text-gray-700">
        The name of your salon or business
      </p>
    </div>
  );
};

export default SalonNameInput;
