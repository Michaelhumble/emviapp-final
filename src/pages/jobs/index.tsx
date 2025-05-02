import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { Container } from "@/components/ui/container";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SearchIcon, FilterIcon, MapPinIcon } from "lucide-react";
import { Job } from "@/types/job";
import ListingsGrid from "@/components/listings/ListingsGrid";

// Real Vietnamese job listings data
const jobsData: Job[] = [
  {
    id: "job-1",
    title: "Thợ Bột và Dip Full Time",
    company: "Tiệm Nail",
    location: "Kansas City North",
    created_at: new Date().toISOString(),
    description: "Tiệm mình ở Kansas City North đang cần tìm thợ Bột và Dip full time. Luôn đảm bảo income nên cần tìm thợ làm lâu dài, chuyên nghiệp, tận tâm với công việc, xin phép không tuyển thợ ngắn hạn. Tiệm có số lượng khách ổn định, khách lịch sự, dễ thương, dễ build khách. Môi trường làm việc vui vẻ, trẻ trung, luôn hỗ trợ nhau trong công việc và giúp đỡ nhau trong cuộc sống.",
    imageUrl: "/lovable-uploads/bb5c8292-c127-4fd2-9663-c65d596b135d.png",
    type: 'job',
    is_vietnamese_listing: true,
    vietnamese_description: "Tiệm mình ở Kansas City North đang cần tìm thợ Bột và Dip full time. Luôn đảm bảo income nên cần tìm thợ làm lâu dài, chuyên nghiệp, tận tâm với công việc, xin phép không tuyển thợ ngắn hạn. Tiệm có số lượng khách ổn định, khách lịch sự, dễ thương, dễ build khách. Môi trường làm việc vui vẻ, trẻ trung, luôn hỗ trợ nhau trong công việc và giúp đỡ nhau trong cuộc sống."
  },
  {
    id: "job-2",
    title: "Tiệm Nails Cần Bán Gấp",
    company: "Nails",
    location: "South Houston, TX",
    created_at: new Date().toISOString(),
    description: "☘️☘️cần bán tiệm Nails gấp ☘️☘️ Xin chào mọi người ☘️tiệm của mình nằm trên đường 45 south Houston khu đông dân cư. Tiệm rộng 1500 sqf có 7 ghế 6 bàn 3 phòng wax và facial rent 2700\\month. Máy giặt may sấy.1phong ăn. Tiệm hoạt động 15 năm nên có lượng khách ổn định. Vì muốn về hưu nên muốn sang tiệm.",
    imageUrl: "/lovable-uploads/d1da4b24-248e-4e84-9289-06237e7d4458.png",
    type: 'job',
    is_vietnamese_listing: true,
    for_sale: true,
    vietnamese_description: "☘️☘️cần bán tiệm Nails gấp ☘️☘️ Xin chào mọi người ☘️tiệm của mình nằm trên đường 45 south Houston khu đông dân cư. Tiệm rộng 1500 sqf có 7 ghế 6 bàn 3 phòng wax và facial rent 2700\\month. Máy giặt may sấy.1phong ăn. Tiệm hoạt động 15 năm nên có lượng khách ổn định. Vì muốn về hưu nên muốn sang tiệm."
  },
  {
    id: "job-3",
    title: "Thợ Chân Tay Nước",
    company: "Cosmo Nails",
    location: "Overland Park",
    created_at: new Date().toISOString(),
    description: "Tiệm Cosmo Nails ở Overland Park cần tìm thợ chân tay nước biết làm dip càng tốt. Chủ trẻ dễ nói chuyện, thợ dễ thương hoà đồng thân thiện. Tiệm khu sang, tip cao, gần nhiều shopping center. Ai muốn về cùng team để cùng phát triển thì vui lòng liên hệ.",
    imageUrl: "/lovable-uploads/fa1b4f95-ebc9-452c-a18b-9d4e78db84bb.png",
    type: 'job',
    is_vietnamese_listing: true,
    vietnamese_description: "Tiệm Cosmo Nails ở Overland Park cần tìm thợ chân tay nước biết làm dip càng tốt. Chủ trẻ dễ nói chuyện, thợ dễ thương hoà đồng thân thiện. Tiệm khu sang, tip cao, gần nhiều shopping center. Ai muốn về cùng team để cùng phát triển thì vui lòng liên hệ."
  },
  {
    id: "job-4",
    title: "Sang Tiệm Nail",
    company: "Tiệm Nail Orlando",
    location: "Orlando, FL",
    created_at: new Date().toISOString(),
    description: "🔥 Sang Tiệm Nail 1,400 sqft ở Orlando FL – Vị Trí Đẹp, Khách Sẵn! 📍Diện tích 1,400 sqft, gồm 10 bàn, 8 ghế , có phòng facial, wax, phòng ăn, máy giặt, máy sấy đầy đủ. 📍Khu trung tâm đông dân, gần trường học, ngân hàng,nhà bank.. – tiện mở rộng kinh doanh. 📍Sẵn 4 thợ giỏi làm fulltime, lượng khách quen ổn định.",
    imageUrl: "/lovable-uploads/4e47f970-963a-483f-8356-eb64235bc2db.png",
    type: 'job',
    is_vietnamese_listing: true,
    vietnamese_description: "🔥 Sang Tiệm Nail 1,400 sqft ở Orlando FL – Vị Trí Đẹp, Khách Sẵn! 📍Diện tích 1,400 sqft, gồm 10 bàn, 8 ghế , có phòng facial, wax, phòng ăn, máy giặt, máy sấy đầy đủ. 📍Khu trung tâm đông dân, gần trường học, ngân hàng,nhà bank.. – tiện mở rộng kinh doanh. 📍Sẵn 4 thợ giỏi làm fulltime, lượng khách quen ổn định.",
    for_sale: true,
    salon_features: ["10 bàn", "8 ghế", "Phòng facial", "Phòng wax"]
  },
  {
    id: "job-5",
    title: "Cần Thợ Nail",
    company: "Bellagio Nail & Day Spa",
    location: "Pensacola, FL",
    created_at: new Date().toISOString(),
    description: "‼️ Cần Nhiều Thợ Nail Cho Tiệm ở Pensacola FL 💅 Tiệm đang cần thợ làm everything hoặc chân tay nước, biết vẽ càng tốt. ✨ Income cao, bao lương or ăn chia tuùy theo tay nghề. 👉🏻Gọi đi làm liền, nơi làm việc vui vẻ, thoải mái.",
    imageUrl: "/lovable-uploads/5a1ba245-85f7-4036-95f9-0e08ada34602.png",
    type: 'job',
    is_vietnamese_listing: true,
    vietnamese_description: "‼️ Cần Nhiều Thợ Nail Cho Tiệm ở Pensacola FL 💅 Tiệm đang cần thợ làm everything hoặc chân tay nước, biết vẽ càng tốt. ✨ Income cao, bao lương or ăn chia tuùy theo tay nghề. 👉🏻Gọi đi làm liền, nơi làm việc vui vẻ, thoải mái.",
    contact_info: {
      owner_name: "Bellagio Nail & Day Spa",
      phone: "(850) 346-7273"
    }
  },
];

const JobsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredJobs, setFilteredJobs] = useState<Job[]>(jobsData);
  const [activeTab, setActiveTab] = useState("all");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "Beauty Industry Jobs | EmviApp";
  }, []);

  useEffect(() => {
    setLoading(true);
    // Simulating API request delay
    const timer = setTimeout(() => {
      filterJobs();
      setLoading(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [searchTerm, activeTab]);

  const filterJobs = () => {
    let results = [...jobsData];

    // Filter by search term if provided
    if (searchTerm.trim()) {
      const searchTermLower = searchTerm.toLowerCase();
      results = results.filter(job => 
        job.title.toLowerCase().includes(searchTermLower) || 
        job.company.toLowerCase().includes(searchTermLower) ||
        (job.location && job.location.toLowerCase().includes(searchTermLower))
      );
    }

    // Filter by job category if not "all"
    if (activeTab !== "all") {
      results = results.filter(job => {
        // This is a simplification - you may want to map job types to categories
        const jobType = job.title.toLowerCase();
        return jobType.includes(activeTab);
      });
    }

    setFilteredJobs(results);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    filterJobs();
  };

  const jobCategories = [
    { id: "all", label: "All Jobs" },
    { id: "nail", label: "Nail Tech" },
    { id: "hair", label: "Hair Stylist" },
    { id: "barber", label: "Barber" },
    { id: "spa", label: "Spa Therapist" },
    { id: "management", label: "Management" },
  ];

  return (
    <Layout>
      <Container className="py-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Beauty Industry Jobs</h1>
        <p className="text-gray-600 mb-8">
          Find your dream job in the beauty and wellness industry
        </p>
        
        {/* Search and filters */}
        <div className="mb-8">
          <form onSubmit={handleSearch} className="flex gap-2 mb-6">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input 
                placeholder="Search by title, company, or location..."
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
              {jobCategories.map((category) => (
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
            <FilterIcon className="mr-2 h-4 w-4" /> More Filters
          </Button>
        </div>
        
        {/* Results */}
        {loading ? (
          <div className="py-20 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
            <p className="mt-4 text-gray-600">Searching for jobs...</p>
          </div>
        ) : (
          <>
            <div className="mb-4">
              <h2 className="text-lg font-medium">
                {filteredJobs.length} Jobs Found
              </h2>
            </div>
            
            <ListingsGrid 
              listings={filteredJobs} 
              emptyMessage="No jobs match your search criteria. Try adjusting your filters or search terms."
            />
          </>
        )}
      </Container>
    </Layout>
  );
};

export default JobsPage;
