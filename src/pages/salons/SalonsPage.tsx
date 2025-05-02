
import React, { useState, useEffect } from 'react';
import { Container } from '@/components/ui/container';
import { SalonFilter } from '@/components/marketplace/SalonFilter';
import { Salon } from '@/types/salon';
import { SalonCard } from '@/components/marketplace/SalonCard';
import { SalonDetailsDialog } from '@/components/marketplace/SalonDetailsDialog';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SlidersHorizontal } from "lucide-react"; // Correct import

// Sample data for demonstration
const sampleSalons = [
  {
    id: 1,
    name: "Luxe Nail & Spa",
    location: "Houston, TX",
    price: 120000,
    monthlyRent: 2500,
    staff: 6,
    revenue: 22000,
    willTrain: true,
    featured: true,
    image: "/lovable-uploads/f7ba1d82-2928-4e73-a61b-112e5aaf5b7e.png",
    description: {
      en: "Established nail salon with loyal clientele in upscale shopping center. Owner retiring after 10 successful years in business.",
      vi: "Tiệm nail đã hoạt động với khách hàng thân thiết trong trung tâm mua sắm cao cấp. Chủ nghỉ hưu sau 10 năm kinh doanh thành công."
    }
  },
  {
    id: 2,
    name: "Forever Beauty Salon",
    location: "Miami, FL",
    price: 85000,
    monthlyRent: 1800,
    staff: 4,
    revenue: 15000,
    willTrain: true,
    featured: false,
    image: "/lovable-uploads/4c4050d4-4a79-4610-8d47-bf6cc92bf8a3.png",
    description: {
      en: "Turnkey operation in busy strip mall with all equipment included. Great opportunity for first-time owners.",
      vi: "Hoạt động chìa khóa trao tay trong trung tâm mua sắm nhộn nhịp với đầy đủ thiết bị. Cơ hội tuyệt vời cho chủ sở hữu lần đầu."
    }
  },
  {
    id: 3,
    name: "Diamond Nails",
    location: "Las Vegas, NV",
    price: 175000,
    monthlyRent: 3200,
    staff: 8,
    revenue: 28000,
    willTrain: false,
    featured: true,
    image: "/lovable-uploads/1f97f5e0-6b52-4ac6-925b-396bc0a1e585.png",
    description: {
      en: "Premium nail salon in high-traffic tourist area. Fully staffed with experienced technicians and high profit margins.",
      vi: "Tiệm nail cao cấp trong khu vực du lịch đông đúc. Đầy đủ nhân viên với thợ có kinh nghiệm và tỷ suất lợi nhuận cao."
    }
  },
  {
    id: 4,
    name: "Elegance Hair Studio",
    location: "Atlanta, GA",
    price: 95000,
    monthlyRent: 2100,
    staff: 5,
    revenue: 18000,
    willTrain: true,
    featured: false,
    image: "/lovable-uploads/8df4a272-7afd-41a2-bbf7-994276084ec4.png",
    description: {
      en: "Well-established hair salon with modern equipment and decor. Owner relocating out of state.",
      vi: "Tiệm tóc được thiết lập tốt với thiết bị và trang trí hiện đại. Chủ chuyển đến tiểu bang khác."
    }
  },
  {
    id: 5,
    name: "Blissful Day Spa",
    location: "San Diego, CA",
    price: 230000,
    monthlyRent: 4000,
    staff: 10,
    revenue: 35000,
    willTrain: false,
    featured: true,
    image: "/lovable-uploads/3d3a731b-4560-4317-8dc7-93d933b82b10.png",
    description: {
      en: "Luxury day spa with full range of services including massage, facials, and body treatments. Excellent reputation and high-end clientele.",
      vi: "Spa cao cấp với đầy đủ các dịch vụ bao gồm massage, chăm sóc da mặt và điều trị cơ thể. Uy tín tuyệt vời và khách hàng cao cấp."
    }
  },
  {
    id: 6,
    name: "Classic Cuts Barbershop",
    location: "Chicago, IL",
    price: 75000,
    monthlyRent: 1600,
    staff: 4,
    revenue: 14000,
    willTrain: true,
    featured: false,
    image: "/lovable-uploads/4e42c014-9ec4-4834-ade3-2b11c8e47361.png",
    description: {
      en: "Traditional barbershop with modern twist in downtown location. Loyal customer base and all equipment included.",
      vi: "Tiệm cắt tóc nam truyền thống với phong cách hiện đại ở trung tâm thành phố. Cơ sở khách hàng trung thành và bao gồm tất cả thiết bị."
    }
  }
];

export default function SalonsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('all');
  const [priceFilter, setPriceFilter] = useState('all');
  const [selectedSalon, setSelectedSalon] = useState<Salon | null>(null);
  const [salons, setSalons] = useState<Salon[]>(sampleSalons);
  const [priceRange, setPriceRange] = useState([0, 250000]);
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false);

  // Filter salons based on search, location, and price
  useEffect(() => {
    let filtered = sampleSalons;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(salon => 
        salon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        salon.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (salon.description?.en?.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Location filter
    if (locationFilter !== 'all') {
      filtered = filtered.filter(salon => 
        salon.location.toLowerCase().includes(locationFilter.toLowerCase())
      );
    }

    // Price filter
    if (priceFilter !== 'all') {
      switch (priceFilter) {
        case 'under100k':
          filtered = filtered.filter(salon => salon.price < 100000);
          break;
        case '100k-200k':
          filtered = filtered.filter(salon => salon.price >= 100000 && salon.price <= 200000);
          break;
        case 'over200k':
          filtered = filtered.filter(salon => salon.price > 200000);
          break;
      }
    }

    // Price range slider filter
    filtered = filtered.filter(
      salon => salon.price >= priceRange[0] && salon.price <= priceRange[1]
    );

    setSalons(filtered);
  }, [searchTerm, locationFilter, priceFilter, priceRange]);

  const viewSalonDetails = (salon: Salon) => {
    setSelectedSalon(salon);
  };

  const closeSalonDetails = () => {
    setSelectedSalon(null);
  };

  const handlePriceRangeChange = (value: number[]) => {
    setPriceRange(value);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <Container>
        <div className="text-center mb-12">
          <h1 className="font-playfair text-4xl md:text-5xl font-bold mb-4">Salon Marketplace</h1>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Browse beauty salons for sale across the country. Find the perfect business opportunity in the beauty industry.
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 mb-8 items-center">
          <div className="w-full md:flex-1">
            <SalonFilter 
              searchTerm={searchTerm}
              locationFilter={locationFilter}
              priceFilter={priceFilter}
              setSearchTerm={setSearchTerm}
              setLocationFilter={setLocationFilter}
              setPriceFilter={setPriceFilter}
            />
          </div>
          
          <div className="md:hidden w-full">
            <Sheet open={isFilterSheetOpen} onOpenChange={setIsFilterSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" className="w-full">
                  <SlidersHorizontal className="mr-2 h-4 w-4" /> More Filters
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Price Range Filter</SheetTitle>
                  <SheetDescription>
                    Adjust the slider to filter by price range
                  </SheetDescription>
                </SheetHeader>
                <div className="py-6 px-1">
                  <div className="mb-2">
                    <p className="text-sm text-gray-500 mb-1">Price Range:</p>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">
                        ${(priceRange[0] / 1000).toFixed(0)}k
                      </span>
                      <span className="text-sm font-medium">
                        ${(priceRange[1] / 1000).toFixed(0)}k
                      </span>
                    </div>
                  </div>
                  <Slider
                    defaultValue={[0, 250000]}
                    max={250000}
                    step={5000}
                    value={priceRange}
                    onValueChange={handlePriceRangeChange}
                  />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Desktop price range filter */}
        <div className="hidden md:block mb-8 bg-white p-4 rounded-md shadow-sm">
          <p className="text-sm font-medium mb-2">Price Range:</p>
          <div className="flex justify-between mb-2">
            <span className="text-sm text-gray-500">
              ${(priceRange[0] / 1000).toFixed(0)}k
            </span>
            <span className="text-sm text-gray-500">
              ${(priceRange[1] / 1000).toFixed(0)}k
            </span>
          </div>
          <Slider
            defaultValue={[0, 250000]}
            max={250000}
            step={5000}
            value={priceRange}
            onValueChange={handlePriceRangeChange}
            className="mt-2"
          />
        </div>

        {salons.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {salons.map(salon => (
              <SalonCard 
                key={salon.id} 
                salon={salon} 
                viewDetails={() => viewSalonDetails(salon)} 
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <h3 className="text-xl font-semibold mb-2">No salons found</h3>
            <p className="text-gray-600">
              Try adjusting your search filters to find more results.
            </p>
          </div>
        )}

        <div className="text-center">
          <p className="text-gray-600 mb-4">
            Don't see what you're looking for? Post your salon for sale today.
          </p>
          <Button size="lg">
            Post Your Salon For Sale
          </Button>
        </div>
      </Container>

      {selectedSalon && (
        <SalonDetailsDialog 
          isOpen={!!selectedSalon} 
          onClose={closeSalonDetails} 
          salon={selectedSalon} 
        />
      )}
    </div>
  );
}
