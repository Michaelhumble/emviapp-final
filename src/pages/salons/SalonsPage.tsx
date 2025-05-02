
import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { Container } from "@/components/ui/container";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SearchIcon, MapPinIcon, SlidersIcon } from "lucide-react";
import { Salon } from "@/types/salon";
import ListingsGrid from "@/components/listings/ListingsGrid";

// Import real salon listings data
const salonData: Salon[] = [
  {
    id: "salon-1",
    name: "Tiệm Nail ở Kansas City North",
    location: "Kansas City North",
    price: 0,
    imageUrl: "/lovable-uploads/bb5c8292-c127-4fd2-9663-c65d596b135d.png",
    description: "Tiệm mình ở Kansas City North đang cần tìm thợ Bột và Dip full time. Luôn đảm bảo income nên cần tìm thợ làm lâu dài, chuyên nghiệp, tận tâm với công việc, xin phép không tuyển thợ ngắn hạn.",
    features: ["Môi trường làm việc vui vẻ", "Trẻ trung", "Khách lịch sự"],
    salon_type: "nail",
    is_vietnamese_listing: true
  },
  {
    id: "salon-2",
    name: "Tiệm Nails trên đường 45 south Houston",
    location: "Houston, TX",
    price: 40000,
    imageUrl: "/lovable-uploads/d1da4b24-248e-4e84-9289-06237e7d4458.png",
    description: "Tiệm rộng 1500 sqf có 7 ghế 6 bàn 3 phòng wax và facial rent 2700\\month. Máy giặt may sấy.1phong ăn. Tiệm hoạt động 15 năm nên có lượng khách ổn định.",
    features: ["7 ghế", "6 bàn", "3 phòng wax", "Máy giặt sấy"],
    square_feet: 1500,
    monthly_rent: 2700,
    salon_type: "nail",
    is_vietnamese_listing: true
  },
  {
    id: "salon-3",
    name: "Cosmo Nails",
    location: "Overland Park",
    price: 0,
    imageUrl: "/lovable-uploads/fa1b4f95-ebc9-452c-a18b-9d4e78db84bb.png",
    description: "Tiệm Cosmo Nails ở Overland Park cần tìm thợ chân tay nước biết làm dip càng tốt. Chủ trẻ dễ nói chuyện, thợ dễ thương hoà đồng thân thiện. Tiệm khu sang, tip cao, gần nhiều shopping center.",
    features: ["Tip cao", "Khu sang", "Gần shopping center"],
    salon_type: "nail",
    is_vietnamese_listing: true
  },
  {
    id: "salon-4",
    name: "Tiệm Nail ở Orlando FL",
    location: "Orlando, FL",
    price: 0,
    imageUrl: "/lovable-uploads/4e47f970-963a-483f-8356-eb64235bc2db.png",
    description: "Diện tích 1,400 sqft, gồm 10 bàn, 8 ghế , có phòng facial, wax, phòng ăn, máy giặt, máy sấy đầy đủ. Khu trung tâm đông dân, gần trường học, ngân hàng,nhà bank.. – tiện mở rộng kinh doanh.",
    features: ["10 bàn", "8 ghế", "Phòng facial", "Máy giặt sấy"],
    square_feet: 1400,
    salon_type: "nail",
    is_vietnamese_listing: true
  },
  {
    id: "salon-5",
    name: "Bellagio Nail & Day Spa",
    location: "Pensacola, FL",
    price: 0,
    imageUrl: "/lovable-uploads/5a1ba245-85f7-4036-95f9-0e08ada34602.png",
    description: "Tiệm đang cần thợ làm everything hoặc chân tay nước, biết vẽ càng tốt. Income cao, bao lương or ăn chia tuỳ theo tay nghề.",
    features: ["Income cao", "Môi trường vui vẻ"],
    salon_type: "nail",
    is_vietnamese_listing: true,
    contact_info: {
      phone: "(850) 346-7273"
    }
  },
];

const SalonsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSalons, setFilteredSalons] = useState<Salon[]>(salonData);
  const [activeTab, setActiveTab] = useState("all");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "Find Beauty Salons Near You | EmviApp";
  }, []);

  useEffect(() => {
    setLoading(true);
    // Simulating API request delay
    const timer = setTimeout(() => {
      filterSalons();
      setLoading(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [searchTerm, activeTab]);

  const filterSalons = () => {
    let results = [...salonData];

    // Filter by search term if provided
    if (searchTerm.trim()) {
      const searchTermLower = searchTerm.toLowerCase();
      results = results.filter(salon => {
        const name = typeof salon.name === 'string' ? salon.name.toLowerCase() : '';
        const location = typeof salon.location === 'string' ? salon.location.toLowerCase() : '';
        const description = typeof salon.description === 'string' ? salon.description.toLowerCase() : '';
        
        return (
          name.includes(searchTermLower) ||
          location.includes(searchTermLower) ||
          description.includes(searchTermLower)
        );
      });
    }

    // Filter by salon type if not "all"
    if (activeTab !== "all") {
      results = results.filter(salon => {
        const salonType = typeof salon.salon_type === 'string' ? 
          salon.salon_type.toLowerCase() : '';
        return salonType === activeTab;
      });
    }

    setFilteredSalons(results);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    filterSalons();
  };

  const salonCategories = [
    { id: "all", label: "All Salons" },
    { id: "nail", label: "Nail Salons" },
    { id: "hair", label: "Hair Salons" },
    { id: "barber", label: "Barbershops" },
    { id: "spa", label: "Spas" },
    { id: "eyelash", label: "Eyelash" },
  ];

  return (
    <Layout>
      <Container className="py-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Find Your Perfect Salon</h1>
        <p className="text-gray-600 mb-8">
          Browse top-rated beauty salons and spas in your area
        </p>
        
        {/* Search and filters */}
        <div className="mb-8">
          <form onSubmit={handleSearch} className="flex gap-2 mb-6">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input 
                placeholder="Search by name, location, or services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button type="submit">
              Search
            </Button>
          </form>
          
          {/* Category tabs */}
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full overflow-x-auto flex flex-nowrap justify-start mb-6">
              {salonCategories.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="px-4 py-2 text-sm"
                >
                  {category.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
        
        {/* Quick filter buttons */}
        <div className="flex flex-wrap gap-2 mb-8">
          <Button variant="outline" size="sm">
            <MapPinIcon className="mr-2 h-4 w-4" /> Near Me
          </Button>
          <Button variant="outline" size="sm">
            <SliderIcon className="mr-2 h-4 w-4" /> Filter
          </Button>
        </div>
        
        {/* Results */}
        {loading ? (
          <div className="py-20 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
            <p className="mt-4 text-gray-600">Searching for salons...</p>
          </div>
        ) : (
          <>
            <div className="mb-4">
              <h2 className="text-lg font-medium">
                {filteredSalons.length} Salons Found
              </h2>
            </div>
            
            <ListingsGrid 
              listings={filteredSalons}
              emptyMessage="No salons match your search criteria. Try adjusting your filters or search terms."
            />
          </>
        )}
      </Container>
    </Layout>
  );
};

export default SalonsPage;
