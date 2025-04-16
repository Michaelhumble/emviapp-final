
import { useState, useCallback } from 'react';

export const usePriceInput = (initialValue: number = 0) => {
  const [value, setValue] = useState(initialValue.toString());
  const [error, setError] = useState<string | null>(null);

  const formatPrice = useCallback((price: string): string => {
    // Remove any non-digit/decimal characters except first decimal point
    const cleaned = price.replace(/[^\d.]/g, '')
                       .replace(/(\..*)\./g, '$1');
    
    // Remove leading zeros
    const withoutLeadingZeros = cleaned.replace(/^0+(\d)/, '$1');
    
    return withoutLeadingZeros;
  }, []);

  const validatePrice = useCallback((price: string): boolean => {
    const numValue = parseFloat(price);
    if (isNaN(numValue)) {
      setError('Please enter a valid price');
      return false;
    }
    if (numValue < 0.01) {
      setError('Price must be at least $0.01');
      return false;
    }
    if (price.includes('.') && price.split('.')[1]?.length > 2) {
      setError('Price cannot have more than 2 decimal places');
      return false;
    }
    setError(null);
    return true;
  }, []);

  const handlePriceChange = useCallback((newValue: string) => {
    const formatted = formatPrice(newValue);
    setValue(formatted);
    validatePrice(formatted);
  }, [formatPrice, validatePrice]);

  const getNumericValue = useCallback((): number => {
    return parseFloat(value) || 0;
  }, [value]);

  const getFormattedValue = useCallback((): string => {
    const numValue = getNumericValue();
    return numValue ? numValue.toFixed(2) : '';
  }, [getNumericValue]);

  return {
    value,
    error,
    handlePriceChange,
    getNumericValue,
    getFormattedValue,
    isValid: !error && value !== ''
  };
};
