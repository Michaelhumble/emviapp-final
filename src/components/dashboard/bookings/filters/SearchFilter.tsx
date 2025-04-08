
import React from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/hooks/useTranslation';

interface SearchFilterProps {
  search: string;
  onChange: (value: string) => void;
  onResetFilters: () => void;
  activeFilterCount: number;
}

const SearchFilter: React.FC<SearchFilterProps> = ({
  search,
  onChange,
  onResetFilters,
  activeFilterCount
}) => {
  const { t } = useTranslation();
  
  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="flex space-x-2">
      <div className="relative flex-grow">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
        <Input
          placeholder={t({
            english: "Search by name or notes...",
            vietnamese: "Tìm kiếm theo tên hoặc ghi chú..."
          })}
          className="pl-9"
          value={search}
          onChange={handleSearchChange}
        />
      </div>
      
      {/* Reset filters button */}
      {activeFilterCount > 0 && (
        <Button
          variant="outline"
          size="icon"
          onClick={onResetFilters}
          title={t({
            english: "Clear all filters",
            vietnamese: "Xóa tất cả bộ lọc"
          })}
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};

export default SearchFilter;
