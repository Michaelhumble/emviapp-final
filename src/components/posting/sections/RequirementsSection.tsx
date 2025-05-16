
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus, X } from 'lucide-react';

const RequirementsSection = () => {
  const { control, watch, setValue } = useFormContext();
  const requirements = watch('requirements') || [];
  const [newRequirement, setNewRequirement] = React.useState('');

  const addRequirement = () => {
    if (newRequirement.trim() !== '') {
      setValue('requirements', [...requirements, newRequirement]);
      setNewRequirement('');
    }
  };

  const removeRequirement = (index: number) => {
    setValue(
      'requirements',
      requirements.filter((_, i) => i !== index)
    );
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addRequirement();
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-xl font-semibold">Requirements & Qualifications</h2>
      
      <div className="space-y-4">
        <FormField
          control={control}
          name="requirements"
          render={() => (
            <FormItem>
              <FormLabel>Requirements</FormLabel>
              <div className="flex space-x-2">
                <Input
                  placeholder="e.g. 2+ years experience"
                  value={newRequirement}
                  onChange={(e) => setNewRequirement(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
                <Button 
                  type="button" 
                  onClick={addRequirement} 
                  variant="outline"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {requirements.length > 0 && (
          <div className="mt-4 space-y-2">
            <p className="text-sm font-medium">Added Requirements:</p>
            <ul className="space-y-2">
              {requirements.map((req, index) => (
                <li 
                  key={index}
                  className="flex items-center justify-between p-2 bg-gray-50 rounded-md border"
                >
                  <span className="text-sm">{req}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeRequirement(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default RequirementsSection;
