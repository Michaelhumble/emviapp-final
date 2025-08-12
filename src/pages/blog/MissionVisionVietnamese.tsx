import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Heart, Users, Globe, Calendar as CalendarIcon, Clock as ClockIcon } from 'lucide-react';
import OptimizedBlogImage from '@/components/blog/OptimizedBlogImage';
import heroImage from '@/assets/viral-article-community.jpg';
import seoLocalSearchImg from '@/assets/emvi/seo-local-search-premium.jpg';
import salonOffersImg from '@/assets/emvi/salon-offers-premium.jpg';


const CANONICAL = 'https://emvi.app/blog/emviapp-vision/mission-vision-vi';

const MissionVisionVietnamese: React.FC = () => {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'EmviApp – Từ Một Gia Đình Làm Đẹp Đến Nền Tảng Giúp Ngành Làm Đẹp Tự Động Hóa',
    inLanguage: 'vi',
    author: { '@type': 'Organization', name: 'EmviApp Editorial' },
    publisher: { '@type': 'Organization', name: 'EmviApp' },
    mainEntityOfPage: CANONICAL,
  };

  return (
    <article className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50/30">
      <Helmet>
        <title>EmviApp – Từ Một Gia Đình Làm Đẹp Đến Nền Tảng Giúp Ngành Làm Đẹp Tự Động Hóa</title>
        <meta name="description" content="Câu chuyện thật từ gia đình làm đẹp đến nền tảng tự động hóa: đặt lịch, SEO, Little Sunshine và hệ thống mang khách đến mỗi ngày." />
        <link rel="canonical" href={CANONICAL} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="EmviApp – Từ Một Gia Đình Làm Đẹp Đến Nền Tảng Giúp Ngành Làm Đẹp Tự Động Hóa" />
        <meta property="og:description" content="Đặt lịch, SEO, Little Sunshine — tất cả trong một, tự động mang khách hàng đến mỗi ngày." />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <header className="container mx-auto px-4 py-12 max-w-4xl text-center">
        <span className="inline-block bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-4">Bài viết nổi bật</span>
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent mb-6 leading-tight">EmviApp – Từ Một Gia Đình Làm Đẹp Đến Nền Tảng Giúp Ngành Làm Đẹp Tự Động Hóa</h1>
        <h2 className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">Câu chuyện thật về hành trình từ quầy tiếp tân đến nền tảng tự động hoá cho ngành làm đẹp: đặt lịch, SEO, và trợ lý Little Sunshine.</h2>
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
          <h3>Câu chuyện bắt đầu từ quầy tiếp tân</h3>
          <p>Tôi sinh ra và lớn lên trong một gia đình làm đẹp. Nhà tôi làm đủ mọi thứ: nails, tóc, nối mi, spa, massage… Tôi lớn lên giữa mùi nước sơn, tiếng máy sấy tóc, và tiếng trò chuyện rộn ràng của khách hàng.</p>
          <p>Tôi thấy ba mẹ và anh chị vừa phục vụ khách, vừa ghi chép tay, vừa phải nhớ lịch hẹn, vừa tính toán tip và lương cho nhân viên.</p>
          <p>Tôi luôn nghĩ:</p>
          <blockquote>“Nếu có một hệ thống để tất cả mọi thứ này tự động hóa, để gia đình chỉ tập trung vào khách hàng, thì tốt biết mấy…”</blockquote>

          <h3>Từ web app gia đình đến EmviApp</h3>
          <p>Ban đầu, tôi chỉ định xây một web app cho gia đình. Tại sao không phải app di động? Vì tôi biết một sự thật mà ít chủ salon để ý: nếu phát hành qua App Store, Apple sẽ thu 30% phí trên mỗi giao dịch trong ứng dụng.</p>
          <p>Nghĩa là, cứ $100 khách thanh toán qua app, Apple lấy $30 — số tiền đáng lẽ ra nên dùng để tái đầu tư vào dịch vụ và khách hàng.</p>
          <p>Khi web app của gia đình tôi vận hành trơn tru, mẹ tôi nói:</p>
          <blockquote>“App này tốt quá, sao con không làm để mọi người dùng luôn?”</blockquote>
          <p>Vậy là từ một ý định nhỏ, tôi tạo ra EmviApp – nền tảng để mọi salon có ứng dụng riêng ngay lập tức, mà không phải tốn hàng chục ngàn đô để phát triển và vận hành.</p>

          <figure className="overflow-hidden rounded-2xl border bg-background shadow-md my-8">
            <OptimizedBlogImage src="/lovable-uploads/bdef2029-146a-4a98-aaef-39e85aa6add3.png" alt="Xác nhận lịch hẹn EmviApp — thiết kế cao cấp, tin cậy" aspectRatio="16/9" sizes="(min-width: 1024px) 1100px, 100vw" className="w-full h-full object-cover" />
            <figcaption className="px-4 py-2 text-sm text-muted-foreground">Đặt lịch nhanh, trực quan</figcaption>
          </figure>

          <h3>Sự thật về việc tự xây app</h3>
          <p>Nhiều chủ salon nghĩ: “Mình có thể tự làm app để giữ khách hàng.” Nhưng đây là thực tế:</p>
          <ol>
            <li><strong>Chi phí phát triển ban đầu</strong><br />App cơ bản: $10.000 – $50.000 · App tùy chỉnh: $50.000 – $200.000+</li>
            <li><strong>Hosting & duy trì</strong><br />$100 – $500/tháng cho máy chủ ổn định · Thêm phí bảo mật, sao lưu dữ liệu, chứng chỉ SSL</li>
            <li><strong>Cập nhật & bảo trì</strong><br />Mỗi lần iOS/Android cập nhật cần nâng cấp mã nguồn: $500 – $5.000/lần</li>
            <li><strong>Marketing & quảng cáo</strong><br />Không ai biết app nếu không chạy quảng cáo Google/Facebook: $1.000 – $5.000/tháng</li>
            <li><strong>SEO</strong><br />Muốn hiện khi khách tìm “nail salon gần tôi” cần chiến lược SEO chuyên nghiệp: $500 – $2.000/tháng</li>
            <li><strong>Hoa hồng App Store</strong><br />30% trên mỗi giao dịch in‑app — tiền đi trước khi bạn kịp chạm vào.</li>
          </ol>
          <p>Kết quả? Sau khi trả mọi chi phí, nhiều app vẫn không đem lại khách mới. Và trong khi đó, khách hàng quay lại giảm dần vì không có chiến lược giữ chân hiệu quả.</p>

          <h3>Các ứng dụng khác vs EmviApp</h3>
          <table className="w-full border-separate border-spacing-y-2">
            <thead>
              <tr>
                <th className="text-left px-4 py-2">Các ứng dụng khác</th>
                <th className="text-left px-4 py-2">EmviApp</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-muted/50">
                <td className="px-4 py-3 rounded-l-xl">Thu phí hoa hồng và phí ẩn</td>
                <td className="px-4 py-3 rounded-r-xl">Không hoa hồng, giá minh bạch</td>
              </tr>
              <tr className="bg-muted/40">
                <td className="px-4 py-3 rounded-l-xl">Tập trung vào bán quảng cáo</td>
                <td className="px-4 py-3 rounded-r-xl">Tập trung đưa khách hàng đến salon</td>
              </tr>
              <tr className="bg-muted/50">
                <td className="px-4 py-3 rounded-l-xl">Không hiểu ngành làm đẹp</td>
                <td className="px-4 py-3 rounded-r-xl">Xây dựng bởi người sinh ra và lớn lên trong ngành</td>
              </tr>
              <tr className="bg-muted/40">
                <td className="px-4 py-3 rounded-l-xl">Không có SEO tự động</td>
                <td className="px-4 py-3 rounded-r-xl">SEO tự động theo ZIP code & dịch vụ</td>
              </tr>
              <tr className="bg-muted/50">
                <td className="px-4 py-3 rounded-l-xl">Cần kỹ năng công nghệ cao</td>
                <td className="px-4 py-3 rounded-r-xl">Chỉ cần đăng ký, mọi thứ đã sẵn sàng</td>
              </tr>
            </tbody>
          </table>

          <h3>SEO – Bí mật để có khách hàng không giới hạn</h3>
          <p>SEO (Search Engine Optimization) là cách giúp salon xuất hiện trên Google khi khách tìm kiếm dịch vụ.</p>
          <p>Với EmviApp: mỗi khi bạn đăng salon hoặc tin tuyển dụng, hệ thống tự tạo một trang web tối ưu SEO theo vị trí, dịch vụ và từ khóa.</p>
          <p>Google lập chỉ mục và hiển thị salon của bạn khi khách tìm “tiệm nail gần tôi” hoặc “cắt tóc ở [Tên Thành Phố]”.</p>
          <p>Không cần thuê agency, không cần chạy quảng cáo — mọi thứ diễn ra tự động.</p>
          <p>Điều này biến mỗi salon trên EmviApp thành một “mini‑website” có khả năng thu hút khách hàng mới hàng ngày.</p>

          <h3>Little Sunshine – Trợ lý không bao giờ ngủ</h3>
          <p>Little Sunshine không chỉ là một chatbot. Cô ấy là:</p>
          <ul>
            <li><strong>Lễ tân 24/7:</strong> Luôn sẵn sàng tiếp nhận và trả lời khách.</li>
            <li><strong>Nhân viên bán hàng:</strong> Giới thiệu dịch vụ, upsell các gói chăm sóc.</li>
            <li><strong>Trợ lý cá nhân:</strong> Hỗ trợ salon quản lý lịch, khách hàng, và ưu đãi.</li>
          </ul>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <figure className="overflow-hidden rounded-2xl border bg-background shadow-md">
              <OptimizedBlogImage src="/lovable-uploads/9821b730-8ec5-410d-9102-a5ebb74be6c5.png" alt="Giao diện Little Sunshine — Tiếng Việt" aspectRatio="9/16" sizes="(min-width: 1024px) 520px, 100vw" className="w-full h-full object-contain" />
              <figcaption className="px-4 py-2 text-xs md:text-sm text-muted-foreground">Little Sunshine — Tiếng Việt</figcaption>
            </figure>
            <figure className="overflow-hidden rounded-2xl border bg-background shadow-md">
              <OptimizedBlogImage src="/lovable-uploads/49d61ee7-a56d-4594-9874-7202526bdca7.png" alt="Little Sunshine — English interface" aspectRatio="9/16" sizes="(min-width: 1024px) 520px, 100vw" className="w-full h-full object-contain" />
              <figcaption className="px-4 py-2 text-xs md:text-sm text-muted-foreground">Little Sunshine — English</figcaption>
            </figure>
          </div>

          <h3>📌 Tương lai</h3>
          <p>Mỗi khách hàng, nghệ nhân, và salon sẽ có chatbot riêng. Chatbot sẽ nói chuyện trực tiếp với nhau để đặt và xác nhận lịch hẹn.</p>
          <p><em>Ví dụ:</em> Chị Hoa mở EmviApp, thấy ưu đãi uốn tóc + dưỡng phục hồi từ salon gần nhà. Chị nhắn chatbot: “Đặt cho chị sáng thứ Bảy, khoảng 10 giờ.” Chatbot của chị Hoa tự động tìm salon phù hợp, kiểm tra lịch rảnh, và liên hệ chatbot của salon. Hai chatbot thống nhất thời gian, gửi thông báo xác nhận cho cả hai bên. Salon chỉ cần xác nhận — lịch đã được đặt.</p>

          <h3>Hệ thống mang khách hàng đến liên tục</h3>
          <ul>
            <li>SEO tự động.</li>
            <li>Đề xuất dịch vụ và ưu đãi cho khách gần khu vực.</li>
            <li>Hệ thống đặt lịch nhanh chỉ với vài thao tác.</li>
            <li>Chatbot chủ động gợi ý và nhắc lịch cho khách.</li>
          </ul>

          <h3>Lời mời của EmviApp</h3>
          <p>Bạn không cần tự mình xây dựng, trả phí hosting, thuê đội ngũ kỹ thuật, chạy SEO, hoặc lo quảng cáo. Chúng tôi đã làm tất cả. Bạn chỉ cần bắt đầu — và để EmviApp làm phần còn lại.</p>
        </section>
      </div>
    </article>
  );
};

export default MissionVisionVietnamese;
