
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Search, Plus } from 'lucide-react';

interface SearchEmptyStateProps {
  searchQuery: string;
}

const SearchEmptyState = ({ searchQuery }: SearchEmptyStateProps) => {
  return (
    <Card className="border-dashed border-2 border-gray-200">
      <CardContent className="text-center py-12">
        <div className="flex justify-center mb-4">
          <div className="bg-gray-100 rounded-full p-4">
            <Search className="h-8 w-8 text-gray-400" />
          </div>
        </div>
        
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          No results found for "{searchQuery}"
        </h3>
        
        <p className="text-gray-600 mb-6 max-w-md mx-auto">
          We couldn't find what you're looking for. Try adjusting your search terms or browse by category.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button variant="outline">
            Browse All Categories
          </Button>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Post What You Need
          </Button>
        </div>

        <div className="mt-8 text-sm text-gray-500">
          <p>💡 Tip: Try searching for "nail art", "hair salon", or "massage"</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SearchEmptyState;
