import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Heart, Users, Globe, Calendar as CalendarIcon, Clock as ClockIcon } from 'lucide-react';
import OptimizedBlogImage from '@/components/blog/OptimizedBlogImage';
import heroImage from '@/assets/viral-article-community.jpg';
import seoLocalSearchImg from '@/assets/emvi/seo-local-search-premium.jpg';
import salonOffersImg from '@/assets/emvi/salon-offers-premium.jpg';
import bookingCalendarImg from '@/assets/emvi/booking-calendar-premium.jpg';

const CANONICAL = 'https://emvi.app/blog/emviapp-vision/mission-vision-vi';

const MissionVisionVietnamese: React.FC = () => {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'EmviApp — Sứ mệnh & Tầm nhìn',
    inLanguage: 'vi',
    author: { '@type': 'Organization', name: 'EmviApp Editorial' },
    publisher: { '@type': 'Organization', name: 'EmviApp' },
    mainEntityOfPage: CANONICAL,
  };

  return (
    <article className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50/30">
      <Helmet>
        <title>EmviApp — Sứ mệnh & Tầm nhìn</title>
        <meta name="description" content="Nền tảng cao cấp, đặt con người lên hàng đầu — tự động hóa tăng trưởng cho salon và nâng tầm nghệ nhân Việt khắp thế giới." />
        <link rel="canonical" href={CANONICAL} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="EmviApp — Sứ mệnh & Tầm nhìn" />
        <meta property="og:description" content="Đặt lịch, SEO, cộng đồng — tất cả trong một, hướng tới tương lai của ngành làm đẹp." />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <header className="container mx-auto px-4 py-12 max-w-4xl text-center">
        <span className="inline-block bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-4">Bài viết nổi bật</span>
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent mb-6 leading-tight">EmviApp — Sứ mệnh & Tầm nhìn</h1>
        <h2 className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">Từ câu chuyện gia đình làm đẹp đến nền tảng tự động hoá cho cả ngành — đặt lịch, SEO, và tăng trưởng cộng đồng.</h2>
        <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
          <span className="flex items-center"><CalendarIcon className="w-4 h-4 mr-1" /> Aug 2025</span>
          <span className="flex items-center"><ClockIcon className="w-4 h-4 mr-1" /> 12 phút đọc</span>
          <span className="flex items-center"><Globe className="w-4 h-4 mr-1" /> Tiếng Việt</span>
        </div>
      </header>

      <div className="container mx-auto px-4 pb-16 max-w-4xl">
        {/* Ảnh Hero */}
        <div className="relative mb-12 rounded-2xl overflow-hidden shadow-xl">
          <OptimizedBlogImage src={heroImage} alt="Cộng đồng làm đẹp Việt và quốc tế — công nghệ nhân văn" aspectRatio="16/9" sizes="(min-width: 1024px) 1100px, 100vw" className="w-full h-full object-cover" />
        </div>

        <section className="prose prose-lg max-w-none text-foreground/90">
          <p className="text-xl leading-relaxed">EmviApp sinh ra từ lời hứa với gia đình: bỏ đi phần phức tạp để chúng ta tập trung vào con người. Hôm nay, lời hứa ấy trở thành sứ mệnh: trao quyền cho mọi salon và nghệ nhân bằng tự động hoá tinh tế, tăng trưởng bền vững, và trải nghiệm cao cấp.</p>

          <h3>Vì sao chúng tôi tồn tại</h3>
          <p>Salon thành công không dựng trên phần mềm — mà trên sự chăm sóc, niềm tin, và tay nghề. Phần mềm tốt phải bảo vệ điều đó. EmviApp xử lý “công việc vô hình” — SEO, lịch hẹn, giữ chân khách — để chủ salon và nghệ nhân làm điều nhìn thấy: tạo nên vẻ đẹp và kết nối.</p>

          <h3>4 trụ cột sản phẩm</h3>
          <ul>
            <li><strong>Đặt lịch mượt mà:</strong> Nhanh, rõ ràng, ưu tiên di động.</li>
            <li><strong>SEO địa phương tự động:</strong> Mỗi salon và tin tuyển dụng là một trang chuyển đổi cao theo vị trí.</li>
            <li><strong>Vòng tròn cộng đồng:</strong> Nghệ nhân — salon — khách hàng cùng phát triển dựa trên niềm tin và hiển thị.</li>
            <li><strong>Little Sunshine:</strong> Trợ lý song ngữ 24/7 — đặt lịch, tư vấn, nuôi dưỡng mối quan hệ.</li>
          </ul>

          <figure className="overflow-hidden rounded-2xl border bg-background shadow-md my-8">
            <OptimizedBlogImage src={bookingCalendarImg} alt="Lịch đặt EmviApp — cao cấp và tinh gọn" aspectRatio="16/9" sizes="(min-width: 1024px) 1100px, 100vw" className="w-full h-full object-cover" />
            <figcaption className="px-4 py-2 text-sm text-muted-foreground">Quản lý lịch khoa học cho salon bận rộn</figcaption>
          </figure>

          <h3>Sự thật kinh tế</h3>
          <p>Phí hoa hồng, lệ thuộc quảng cáo, công cụ rời rạc — tất cả bào mòn biên lợi nhuận. EmviApp loại bỏ trung gian và tích luỹ hiển thị theo thời gian: mỗi lần đăng, mỗi đánh giá, mỗi ưu đãi đều đẩy SEO và chuyển đổi lên cao.</p>

          <div className="grid md:grid-cols-2 gap-6 my-8">
            <figure className="overflow-hidden rounded-2xl border bg-background shadow-md">
              <OptimizedBlogImage src={salonOffersImg} alt="Ưu đãi cá nhân hoá cho khách gần bạn" aspectRatio="16/9" sizes="(min-width: 1024px) 540px, 100vw" className="w-full h-full object-cover" />
              <figcaption className="px-4 py-2 text-xs md:text-sm text-muted-foreground">Ưu đãi đúng người, đúng thời điểm</figcaption>
            </figure>
            <figure className="overflow-hidden rounded-2xl border bg-background shadow-md">
              <OptimizedBlogImage src={seoLocalSearchImg} alt="Kết quả SEO địa phương trên bản đồ" aspectRatio="16/9" sizes="(min-width: 1024px) 540px, 100vw" className="w-full h-full object-cover" />
              <figcaption className="px-4 py-2 text-xs md:text-sm text-muted-foreground">SEO địa phương tự động cho mọi nội dung</figcaption>
            </figure>
          </div>

          <h3>Little Sunshine — trợ lý không ngủ</h3>
          <p>Không chỉ là chatbot — cô ấy như concierge: gợi ý dịch vụ, xác nhận lịch, hướng dẫn khách bằng Tiếng Việt và Tiếng Anh. Sắp tới, các trợ lý sẽ phối hợp trực tiếp — khách và salon thống nhất thời gian chỉ trong vài giây.</p>

          <h3>Tầm nhìn</h3>
          <p>Chúng tôi tin mỗi khu phố xứng đáng có những cửa tiệm làm đẹp thịnh vượng. EmviApp dệt nên mạng lưới cơ hội nơi nghệ nhân được tìm thấy vì tay nghề, salon kín lịch đúng giá, và khách hàng cảm thấy thân thuộc.</p>

          <h3>Điều không thay đổi</h3>
          <ul>
            <li>Trải nghiệm cao cấp: thiết kế tinh tế, tốc độ nhanh, bảo mật tin cậy.</li>
            <li>Lấy con người làm trung tâm: xây cho người dùng thật, không cho chỉ số.</li>
            <li>Giá trị cộng dồn: mỗi hành động khiến hành động tiếp theo dễ hơn và đáng giá hơn.</li>
          </ul>

          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 my-10">
            <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
              <span className="flex items-center"><Heart className="w-4 h-4 mr-2 text-red-400" />Xây trên niềm tin</span>
              <span className="flex items-center"><Users className="w-4 h-4 mr-2 text-blue-400" />Cộng đồng dẫn dắt</span>
              <span className="flex items-center"><Globe className="w-4 h-4 mr-2 text-green-400" />Song ngữ mặc định</span>
            </div>
          </div>

          <h3>Lời mời</h3>
          <p>Dù bạn đang mở tiệm đầu tiên hay mở rộng chi nhánh, EmviApp mang đến lợi thế: tự động hoá đúng chỗ, kể chuyện đúng lúc, và một cộng đồng tôn vinh tay nghề. Chào mừng đến tương lai của ngành làm đẹp. Chào mừng đến EmviApp.</p>
        </section>
      </div>
    </article>
  );
};

export default MissionVisionVietnamese;
