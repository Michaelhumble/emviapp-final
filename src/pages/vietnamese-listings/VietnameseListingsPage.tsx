
import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { SearchIcon, MapPinIcon, FilterIcon } from "lucide-react";
import { Job } from "@/types/job";
import { Salon } from "@/types/salon";
import ListingsGrid from "@/components/listings/ListingsGrid";
import { Helmet } from "react-helmet";
import { useTranslation } from "@/hooks/useTranslation";

// Define Vietnamese listings data with real job ads
const vietnameseListings: (Job | Salon)[] = [
  {
    id: "job-1",
    title: "Thợ Bột và Dip Full Time",
    company: "Tiệm Nail",
    location: "Kansas City North",
    created_at: new Date().toISOString(),
    description: "Tiệm mình ở Kansas City North đang cần tìm thợ Bột và Dip full time. Luôn đảm bảo income nên cần tìm thợ làm lâu dài, chuyên nghiệp, tận tâm với công việc, xin phép không tuyển thợ ngắn hạn. Tiệm có số lượng khách ổn định, khách lịch sự, dễ thương, dễ build khách. Môi trường làm việc vui vẻ, trẻ trung, luôn hỗ trợ nhau trong công việc và giúp đỡ nhau trong cuộc sống. Anh Chị xin liên lạc 816-255-4935 nếu không kịp bắt máy, phiền anh chị để lại tin nhắn! Cảm ơn mọi người đã đọc tin và chia sẻ thông tin này ạ! TIỆM THÍCH HỢP CHO CÁC ANH CHỊ MUỐN ỔN ĐỊNH! Em sẻ hổ trợ mọi thứ nếu cần ạ!",
    imageUrl: "/lovable-uploads/bb5c8292-c127-4fd2-9663-c65d596b135d.png",
    type: 'job',
    is_vietnamese_listing: true,
    vietnamese_description: "Tiệm mình ở Kansas City North đang cần tìm thợ Bột và Dip full time. Luôn đảm bảo income nên cần tìm thợ làm lâu dài, chuyên nghiệp, tận tâm với công việc, xin phép không tuyển thợ ngắn hạn. Tiệm có số lượng khách ổn định, khách lịch sự, dễ thương, dễ build khách. Môi trường làm việc vui vẻ, trẻ trung, luôn hỗ trợ nhau trong công việc và giúp đỡ nhau trong cuộc sống. Anh Chị xin liên lạc 816-255-4935 nếu không kịp bắt máy, phiền anh chị để lại tin nhắn! Cảm ơn mọi người đã đọc tin và chia sẻ thông tin này ạ! TIỆM THÍCH HỢP CHO CÁC ANH CHỊ MUỐN ỔN ĐỊNH! Em sẻ hổ trợ mọi thứ nếu cần ạ!",
    salon_type: "nail",
    contact_info: {
      phone: "816-255-4935"
    }
  },
  {
    id: "job-2",
    title: "Tiệm Nails Cần Bán Gấp",
    company: "Nails",
    location: "South Houston, TX",
    created_at: new Date().toISOString(),
    description: "☘️☘️cần bán tiệm Nails gấp ☘️☘️ Xin chào mọi người ☘️tiệm của mình nằm trên đường 45 south Houston khu đông dân cư. Tiệm rộng 1500 sqf có 7 ghế 6 bàn 3 phòng wax và facial rent 2700\\month. Máy giặt may sấy.1phong ăn. Tiệm hoạt động 15 năm nên có lượng khách ổn định. Vì muốn về hưu nên muốn sang tiệm 🎉 40\\$ giá có thể thương lượng. Mọi người có thể liên hệ hằng (713 )944-6100",
    imageUrl: "/lovable-uploads/d1da4b24-248e-4e84-9289-06237e7d4458.png",
    type: 'job',
    is_vietnamese_listing: true,
    for_sale: true,
    vietnamese_description: "☘️☘️cần bán tiệm Nails gấp ☘️☘️ Xin chào mọi người ☘️tiệm của mình nằm trên đường 45 south Houston khu đông dân cư. Tiệm rộng 1500 sqf có 7 ghế 6 bàn 3 phòng wax và facial rent 2700\\month. Máy giặt may sấy.1phong ăn. Tiệm hoạt động 15 năm nên có lượng khách ổn định. Vì muốn về hưu nên muốn sang tiệm 🎉 40\\$ giá có thể thương lượng. Mọi người có thể liên hệ hằng (713 )944-6100",
    salon_type: "nail",
    contact_info: {
      phone: "(713) 944-6100"
    }
  },
  {
    id: "job-3",
    title: "Thợ Chân Tay Nước",
    company: "Cosmo Nails",
    location: "Overland Park",
    created_at: new Date().toISOString(),
    description: "Tiệm Cosmo Nails ở Overland Park cần tìm thợ chân tay nước biết làm dip càng tốt. Chủ trẻ dễ nói chuyện, thợ dễ thương hoà đồng thân thiện. Tiệm khu sang, tip cao, gần nhiều shopping center. Ai muốn về cùng team để cùng phát triển thì vui lòng liên hệ Ava: 913-972-0670",
    imageUrl: "/lovable-uploads/fa1b4f95-ebc9-452c-a18b-9d4e78db84bb.png",
    type: 'job',
    is_vietnamese_listing: true,
    vietnamese_description: "Tiệm Cosmo Nails ở Overland Park cần tìm thợ chân tay nước biết làm dip càng tốt. Chủ trẻ dễ nói chuyện, thợ dễ thương hoà đồng thân thiện. Tiệm khu sang, tip cao, gần nhiều shopping center. Ai muốn về cùng team để cùng phát triển thì vui lòng liên hệ Ava: 913-972-0670",
    salon_type: "nail",
    contact_info: {
      owner_name: "Ava",
      phone: "913-972-0670"
    }
  },
  {
    id: "job-4",
    title: "Sang Tiệm Nail",
    company: "Tiệm Nail Orlando",
    location: "Orlando, FL",
    created_at: new Date().toISOString(),
    description: "🔥 Sang Tiệm Nail 1,400 sqft ở Orlando FL – Vị Trí Đẹp, Khách Sẵn! 📍Diện tích 1,400 sqft, gồm 10 bàn, 8 ghế , có phòng facial, wax, phòng ăn, máy giặt, máy sấy đầy đủ. 📍Khu trung tâm đông dân, gần trường học, ngân hàng,nhà bank.. – tiện mở rộng kinh doanh. 📍Sẵn 4 thợ giỏi làm fulltime, lượng khách quen ổn định, chủ yếu là khách M.y tr.ang, típ cao, giá dịch vụ cao. 📞 Liên lạc ngay 678-981-7416 để biết thêm thông tin và xem tiệm.",
    imageUrl: "/lovable-uploads/4e47f970-963a-483f-8356-eb64235bc2db.png",
    type: 'job',
    is_vietnamese_listing: true,
    vietnamese_description: "🔥 Sang Tiệm Nail 1,400 sqft ở Orlando FL – Vị Trí Đẹp, Khách Sẵn! 📍Diện tích 1,400 sqft, gồm 10 bàn, 8 ghế , có phòng facial, wax, phòng ăn, máy giặt, máy sấy đầy đủ. 📍Khu trung tâm đông dân, gần trường học, ngân hàng,nhà bank.. – tiện mở rộng kinh doanh. 📍Sẵn 4 thợ giỏi làm fulltime, lượng khách quen ổn định, chủ yếu là khách M.y tr.ang, típ cao, giá dịch vụ cao. 📞 Liên lạc ngay 678-981-7416 để biết thêm thông tin và xem tiệm.",
    for_sale: true,
    salon_type: "nail",
    contact_info: {
      phone: "678-981-7416"
    },
    salon_features: ["10 bàn", "8 ghế", "Phòng facial", "Phòng wax"]
  },
  {
    id: "job-5",
    title: "Cần Nhiều Thợ Nail",
    company: "Bellagio Nail & Day Spa",
    location: "Pensacola, FL",
    created_at: new Date().toISOString(),
    description: "‼️ Cần Nhiều Thợ Nail Cho Tiệm ở Pensacola FL 💅 Tiệm đang cần thợ làm everything hoặc chân tay nước, biết vẽ càng tốt. ✨ Income cao, bao lương or ăn chia tuùy theo tay nghề. 👉🏻Gọi đi làm liền, nơi làm việc vui vẻ, thoải mái. Xin liên lạc: 📲 (850) 346-7273 📲 (850) 485-2070 📲 (850) 485-0219 Thank you! 📌Bellagio Nail & Day Spa at 5010 Bayou Blvd Pensacola FL 32503",
    imageUrl: "/lovable-uploads/5a1ba245-85f7-4036-95f9-0e08ada34602.png",
    type: 'job',
    is_vietnamese_listing: true,
    vietnamese_description: "‼️ Cần Nhiều Thợ Nail Cho Tiệm ở Pensacola FL 💅 Tiệm đang cần thợ làm everything hoặc chân tay nước, biết vẽ càng tốt. ✨ Income cao, bao lương or ăn chia tuùy theo tay nghề. 👉🏻Gọi đi làm liền, nơi làm việc vui vẻ, thoải mái. Xin liên lạc: 📲 (850) 346-7273 📲 (850) 485-2070 📲 (850) 485-0219 Thank you! 📌Bellagio Nail & Day Spa at 5010 Bayou Blvd Pensacola FL 32503",
    salon_type: "nail",
    contact_info: {
      owner_name: "Bellagio Nail & Day Spa",
      phone: "(850) 346-7273"
    }
  }
];

const VietnameseListingsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredListings, setFilteredListings] = useState<(Job | Salon)[]>(vietnameseListings);
  const [activeTab, setActiveTab] = useState("all");
  const [loading, setLoading] = useState(false);
  const { isVietnamese, toggleLanguage } = useTranslation();

  useEffect(() => {
    document.title = isVietnamese ? "Tìm Việc Làm Nail | EmviApp" : "Vietnamese Beauty Jobs & Salons | EmviApp";
  }, [isVietnamese]);

  useEffect(() => {
    setLoading(true);
    // Simulate API request
    const timer = setTimeout(() => {
      filterListings();
      setLoading(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [searchTerm, activeTab]);

  const filterListings = () => {
    let results = [...vietnameseListings];

    // Filter by search term
    if (searchTerm.trim()) {
      const searchTermLower = searchTerm.toLowerCase();
      results = results.filter(listing => {
        const title = 'title' in listing ? listing.title?.toLowerCase() || '' : '';
        const company = 'company' in listing ? listing.company?.toLowerCase() || '' : '';
        const name = 'name' in listing ? listing.name?.toLowerCase() || '' : '';
        const location = listing.location?.toLowerCase() || '';
        const description = listing.description?.toLowerCase() || '';
        
        return (
          title.includes(searchTermLower) ||
          company.includes(searchTermLower) ||
          name.includes(searchTermLower) ||
          location.includes(searchTermLower) ||
          description.includes(searchTermLower)
        );
      });
    }

    // Filter by category
    if (activeTab !== "all") {
      if (activeTab === "jobs") {
        results = results.filter(listing => 'type' in listing && listing.type === 'job' && !('for_sale' in listing && listing.for_sale));
      } else if (activeTab === "for-sale") {
        results = results.filter(listing => 'for_sale' in listing && listing.for_sale);
      } else if (activeTab === "nail") {
        results = results.filter(listing => 
          ('salon_type' in listing && listing.salon_type === 'nail') ||
          ('title' in listing && listing.title?.toLowerCase().includes('nail'))
        );
      }
    }

    setFilteredListings(results);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    filterListings();
  };

  return (
    <Layout>
      <Helmet>
        <title>{isVietnamese ? "Tìm Việc Làm Nail | EmviApp" : "Vietnamese Beauty Jobs & Salons | EmviApp"}</title>
        <meta name="description" content="Find authentic Vietnamese beauty industry jobs and salons for sale. Connect with nail salons, spas, and beauty businesses in the Vietnamese community." />
      </Helmet>

      <Container className="py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl md:text-4xl font-bold">
            {isVietnamese ? "Việc Làm & Tiệm Nail" : "Vietnamese Beauty Jobs & Salons"}
          </h1>
          <Button variant="outline" onClick={toggleLanguage}>
            {isVietnamese ? "English" : "Tiếng Việt"}
          </Button>
        </div>

        <p className="text-gray-600 mb-8">
          {isVietnamese 
            ? "Tìm việc làm trong ngành làm đẹp hoặc tiệm nail đang bán" 
            : "Find jobs in the Vietnamese beauty industry or browse salons for sale"}
        </p>
        
        {/* Search and filters */}
        <div className="mb-8">
          <form onSubmit={handleSearch} className="flex gap-2 mb-6">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input 
                placeholder={isVietnamese 
                  ? "Tìm kiếm theo vị trí, tiêu đề, hoặc mô tả..." 
                  : "Search by location, title, or description..."}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button type="submit">
              {isVietnamese ? "Tìm Kiếm" : "Search"}
            </Button>
          </form>
          
          {/* Category tabs */}
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full overflow-x-auto flex flex-nowrap justify-start mb-6">
              <TabsTrigger value="all">
                {isVietnamese ? "Tất Cả" : "All Listings"}
              </TabsTrigger>
              <TabsTrigger value="jobs">
                {isVietnamese ? "Việc Làm" : "Job Openings"}
              </TabsTrigger>
              <TabsTrigger value="for-sale">
                {isVietnamese ? "Tiệm Bán" : "Salons For Sale"}
              </TabsTrigger>
              <TabsTrigger value="nail">
                {isVietnamese ? "Ngành Nail" : "Nail Industry"}
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        {/* Quick filter buttons */}
        <div className="flex flex-wrap gap-2 mb-8">
          <Button variant="outline" size="sm">
            <MapPinIcon className="mr-2 h-4 w-4" /> 
            {isVietnamese ? "Gần Đây" : "Near Me"}
          </Button>
          <Button variant="outline" size="sm">
            <FilterIcon className="mr-2 h-4 w-4" /> 
            {isVietnamese ? "Lọc Thêm" : "More Filters"}
          </Button>
        </div>
        
        {/* Results */}
        {loading ? (
          <div className="py-20 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
            <p className="mt-4 text-gray-600">
              {isVietnamese ? "Đang tìm kiếm..." : "Searching..."}
            </p>
          </div>
        ) : (
          <>
            <div className="mb-4">
              <h2 className="text-lg font-medium">
                {filteredListings.length} {isVietnamese ? "Kết Quả" : "Results"}
              </h2>
            </div>
            
            <ListingsGrid 
              listings={filteredListings} 
              emptyMessage={isVietnamese 
                ? "Không tìm thấy kết quả. Vui lòng thử lại với từ khóa khác." 
                : "No listings match your search criteria. Try adjusting your filters or search terms."}
            />
          </>
        )}
      </Container>
    </Layout>
  );
};

export default VietnameseListingsPage;
