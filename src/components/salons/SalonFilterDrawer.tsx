
import React from 'react';
import { 
  Drawer, 
  DrawerClose, 
  DrawerContent, 
  DrawerFooter, 
  DrawerHeader, 
  DrawerTitle 
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface SalonFilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const SalonFilterDrawer = ({ isOpen, onClose }: SalonFilterDrawerProps) => {
  // Simple placeholder filter state
  const [priceRange, setPriceRange] = React.useState([0, 500000]);
  const [location, setLocation] = React.useState('');

  const handleApplyFilters = () => {
    // Placeholder for filter application
    console.log('Applying filters:', { priceRange, location });
    onClose();
  };

  const handleResetFilters = () => {
    setPriceRange([0, 500000]);
    setLocation('');
  };

  return (
    <Drawer open={isOpen} onClose={onClose}>
      <DrawerContent className="max-h-[90vh]">
        <DrawerHeader className="flex items-center justify-between">
          <DrawerTitle>Filter Salons</DrawerTitle>
          <DrawerClose asChild>
            <Button variant="ghost" size="icon">
              <X className="h-4 w-4" />
            </Button>
          </DrawerClose>
        </DrawerHeader>
        
        <div className="px-4 pb-4">
          <div className="space-y-6">
            <div>
              <label className="text-sm font-medium">Location</label>
              <input
                type="text"
                placeholder="Enter city, state, or zip"
                className="w-full mt-1 p-2 border rounded"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            
            <div>
              <label className="text-sm font-medium">Price Range</label>
              <div className="flex items-center gap-2 mt-1">
                <input 
                  type="number" 
                  className="w-full p-2 border rounded"
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                  placeholder="Min"
                />
                <span>to</span>
                <input 
                  type="number" 
                  className="w-full p-2 border rounded"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  placeholder="Max"
                />
              </div>
            </div>
            
            {/* Additional filter options would be added here */}
          </div>
        </div>
        
        <DrawerFooter className="flex flex-row gap-2">
          <Button variant="outline" onClick={handleResetFilters} className="flex-1">
            Reset
          </Button>
          <Button onClick={handleApplyFilters} className="flex-1">
            Apply Filters
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default SalonFilterDrawer;
