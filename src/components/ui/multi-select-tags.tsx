
import React, { useState } from 'react';
import { Badge } from './badge';
import { Button } from './button';
import { X, Plus } from 'lucide-react';
import { Input } from './input';

interface Option {
  value: string;
  label: string;
}

interface MultiSelectTagsProps {
  options: Option[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
  maxTags?: number;
}

const MultiSelectTags: React.FC<MultiSelectTagsProps> = ({
  options,
  selectedValues = [],
  onChange,
  placeholder = 'Add tags...',
  maxTags = 10
}) => {
  const [inputValue, setInputValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const filteredOptions = options.filter(
    (option) => 
      !selectedValues.includes(option.value) && 
      option.label.toLowerCase().includes(inputValue.toLowerCase())
  );

  const handleAddTag = (value: string) => {
    if (selectedValues.length >= maxTags) return;
    
    if (!selectedValues.includes(value)) {
      onChange([...selectedValues, value]);
    }
    setInputValue('');
    setShowSuggestions(false);
  };

  const handleRemoveTag = (valueToRemove: string) => {
    onChange(selectedValues.filter(value => value !== valueToRemove));
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue) {
      e.preventDefault();
      
      // See if there's a matching option first
      const matchingOption = options.find(
        opt => opt.label.toLowerCase() === inputValue.toLowerCase()
      );
      
      if (matchingOption) {
        handleAddTag(matchingOption.value);
      } else {
        // Add the custom value
        handleAddTag(inputValue);
      }
    } else if (e.key === 'Backspace' && !inputValue && selectedValues.length > 0) {
      handleRemoveTag(selectedValues[selectedValues.length - 1]);
    }
  };

  return (
    <div className="w-full space-y-2">
      <div className="flex flex-wrap gap-2 mb-2">
        {selectedValues.map((value) => {
          const option = options.find(opt => opt.value === value);
          const label = option ? option.label : value;
          
          return (
            <Badge key={value} className="py-1.5 px-2 bg-primary/10 text-primary">
              {label}
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 ml-1 p-0 hover:bg-primary/20"
                onClick={() => handleRemoveTag(value)}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          );
        })}
      </div>

      <div className="relative">
        <Input
          type="text"
          placeholder={selectedValues.length === 0 ? placeholder : ''}
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            setShowSuggestions(true);
          }}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          onKeyDown={handleInputKeyDown}
          className="focus:border-primary focus:ring-2 focus:ring-primary/20"
        />

        {showSuggestions && filteredOptions.length > 0 && (
          <div className="absolute z-10 w-full mt-1 max-h-60 overflow-auto rounded-md bg-white shadow-lg border border-gray-200">
            <div className="py-1">
              {filteredOptions.map((option) => (
                <div
                  key={option.value}
                  onClick={() => handleAddTag(option.value)}
                  className="flex items-center px-3 py-2 text-sm cursor-pointer hover:bg-gray-100"
                >
                  <Plus className="h-3.5 w-3.5 mr-2 text-gray-500" />
                  {option.label}
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedValues.length >= maxTags && (
          <p className="text-xs text-amber-600 mt-1">
            Maximum of {maxTags} tags reached
          </p>
        )}
      </div>
    </div>
  );
};

export default MultiSelectTags;
