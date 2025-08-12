import React from 'react';
import bookingCalendarImg from '@/assets/emvi/booking-calendar-premium.jpg';
// using uploaded Sunshine chat screenshots (runtime URLs)
import salonOffersImg from '@/assets/emvi/salon-offers-premium.jpg';
import seoLocalSearchImg from '@/assets/emvi/seo-local-search-premium.jpg';
import happyCustomersImg from '@/assets/emvi/happy-customers-pros-premium.jpg';
import OptimizedBlogImage from '@/components/blog/OptimizedBlogImage';
import BlogArticleLayout from '@/components/blog/BlogArticleLayout';

// Bilingual Article Page: EmviApp Mission & Vision
// English is default; Vietnamese shown via local toggle (does not affect global language)

const CANONICAL_URL = 'https://www.emvi.app/emviapp-mission-vision';
// Uploaded Sunshine chat screenshots (kept as runtime URLs)
const sunshineChatVi1 = '/lovable-uploads/fb1b7b1f-0426-41e1-b648-f5f066cd0848.png';
const sunshineChatVi2 = '/lovable-uploads/98bd303a-e851-44af-9e8f-c775d178a7b6.png';
const sunshineChatEn1 = '/lovable-uploads/1be5b4b6-b375-4c54-86a1-34531fe3e73f.png';
const sunshineChatEn2 = '/lovable-uploads/cf7603a5-1b7f-4ec3-b0f9-74fb787c1180.png';
const bookingConfirmCard = '/lovable-uploads/9e4bf897-c709-446d-a057-e8d9fbb18622.png';


type ViewMode = 'en' | 'vi' | 'both';

const EmviMissionVision: React.FC = () => {
  const article = {
    title: 'EmviApp – Từ Một Gia Đình Làm Đẹp Đến Nền Tảng Giúp Ngành Làm Đẹp Tự Động Hóa',
    description:
      'Tôi sinh ra và lớn lên trong một gia đình làm đẹp. Nhà tôi làm đủ mọi thứ: nails, tóc, nối mi, spa, massage… Tôi lớn lên giữa mùi nước sơn, tiếng máy sấy tóc, và tiếng trò chuyện rộn ràng của khách hàng.',
    author: 'EmviApp',
    publishedAt: 'Aug 2025',
    readTime: '12 phút đọc',
    category: 'Sứ mệnh & Tầm nhìn',
    tags: ['EmviApp', 'Sứ mệnh', 'Tầm nhìn', 'Tự động hóa', 'Làm đẹp'],
    image: happyCustomersImg,
  };

  const articleUrl = CANONICAL_URL;

  return (
    <BlogArticleLayout
      article={article}
      articleSlug="emviapp-mission-vision"
      articleUrl={articleUrl}
      backLink="/blog"
    >
      <VietnameseArticle />
    </BlogArticleLayout>
  );
};

function LangSection({ lang, children }: { lang: ViewMode; children: React.ReactNode }) {
  const isVi = lang === 'vi';
  return (
    <section
      lang={isVi ? 'vi' : 'en'}
      className="mx-auto max-w-4xl w-full px-4 md:px-6"
    >
      <div className="prose prose-lg max-w-none text-foreground/90">
        {children}
      </div>
    </section>
  );
}

function EnglishArticle() {
  return (
    <div>
      <h2>EmviApp — From a Beauty Family to an Automation Platform</h2>
      <h3>The story begins at the front desk</h3>
      <p>I was born and raised in a beauty family — nails, hair, lash extensions, spa, massage. I grew up with the scent of polish, the hum of hair dryers, and the warm conversations of clients.</p>
      <p>I watched my parents and siblings serve clients while juggling handwritten notes, remembering appointments, and calculating tips and payroll by hand.</p>
      <p>I always thought: “If there were a system to automate all of this so our family could focus entirely on our clients, that would be incredible.”</p>

      <h3>From a family web app to EmviApp</h3>
      <p>I first set out to build a simple web app just for my family. Why not a mobile app? Because there’s a truth many salon owners overlook:</p>
      <p>If you publish through the App Store, Apple takes a 30% fee on every in‑app transaction. That means for every $100 a client pays, Apple takes $30 — money that should be reinvested into service and client experience.</p>
      <p>When our family web app ran smoothly, my mom said: “This is so good — why not make it available for everyone?”</p>
      <p>From that small intention, I created EmviApp — a platform that gives every salon its own app instantly, without spending tens of thousands of dollars to develop and maintain it.</p>

      <figure className="overflow-hidden rounded-3xl border bg-background shadow-lg animate-fade-in">
        <div className="aspect-[16/9] w-full">
          <OptimizedBlogImage
            src={bookingConfirmCard}
            alt="Fast, intuitive booking with EmviApp"
            aspectRatio="16/9"
            sizes="(min-width: 1024px) 1100px, 100vw"
            className="w-full h-full object-cover"
          />
        </div>
        <figcaption className="px-4 py-3 text-sm text-muted-foreground">Fast, intuitive booking</figcaption>
      </figure>

      <h3>The truth about building your own app</h3>
      <ol>
        <li>
          <strong>Upfront development cost</strong><br />
          Basic app: $10,000 – $50,000; Custom app: $50,000 – $200,000+
        </li>
        <li>
          <strong>Hosting & ongoing maintenance</strong><br />
          $100 – $500/month for stable servers, plus security, backups, SSL certificates
        </li>
        <li>
          <strong>Updates & upkeep</strong><br />
          Every iOS/Android update requires engineering work: $500 – $5,000 per update
        </li>
        <li>
          <strong>Marketing & advertising</strong><br />
          No one discovers your app without paid ads (Google/Facebook): $1,000 – $5,000/month
        </li>
        <li>
          <strong>SEO</strong><br />
          To show up for “nail salon near me,” you need a real SEO strategy: $500 – $2,000/month
        </li>
        <li>
          <strong>App Store commission</strong><br />
          30% off the top — gone before you ever see it
        </li>
      </ol>
      <p>After all those costs, many apps still don’t bring new clients. Meanwhile, return visits decline without a solid retention strategy.</p>

      <h3>Other apps vs. EmviApp</h3>
        <table className="w-full border-separate border-spacing-y-2">
          <thead>
            <tr>
              <th className="text-left px-4 py-2">Other Apps</th>
              <th className="text-left px-4 py-2">EmviApp</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-muted/50">
              <td className="px-4 py-3 rounded-l-xl">Commissions and hidden fees</td>
              <td className="px-4 py-3 rounded-r-xl">No commissions, transparent pricing</td>
            </tr>
            <tr className="bg-muted/40">
              <td className="px-4 py-3 rounded-l-xl">Optimized to sell ads</td>
              <td className="px-4 py-3 rounded-r-xl">Optimized to bring clients to salons</td>
            </tr>
            <tr className="bg-muted/50">
              <td className="px-4 py-3 rounded-l-xl">Don’t understand beauty industry</td>
              <td className="px-4 py-3 rounded-r-xl">Built by someone raised in the industry</td>
            </tr>
            <tr className="bg-muted/40">
              <td className="px-4 py-3 rounded-l-xl">No automatic SEO</td>
              <td className="px-4 py-3 rounded-r-xl">Automatic SEO by ZIP code and service</td>
            </tr>
            <tr className="bg-muted/50">
              <td className="px-4 py-3 rounded-l-xl">High technical burden</td>
              <td className="px-4 py-3 rounded-r-xl">Just sign up — everything works</td>
            </tr>
          </tbody>
        </table>

      <h3>SEO — the secret to limitless clients</h3>
      <p>SEO helps your salon appear on Google when people search. With EmviApp, every time you publish a salon or job post, the system auto‑creates an SEO‑optimized page by location, service, and keyword. Google indexes it and shows your salon for “nail salon near me” or “haircut in [City].” No agency, no ads — it just works. Every salon becomes a mini‑website that can attract new clients daily.</p>

      <h3>Little Sunshine — the assistant who never sleeps</h3>
      <p>Little Sunshine isn’t “just a chatbot.” She’s your 24/7 receptionist, your sales specialist who introduces services and upsells care packages, and your personal assistant helping manage schedules, clients, and promotions.</p>
      <p><strong>The future:</strong> Every client, artist, and salon will have their own chatbot. They’ll talk to each other to book and confirm appointments.</p>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <figure className="overflow-hidden rounded-2xl border bg-background shadow-md animate-fade-in hover-scale">
          <div className="aspect-[9/16] w-full">
            <OptimizedBlogImage
              src={sunshineChatEn1}
              alt="Little Sunshine chat interface — fast, intuitive booking"
              aspectRatio="9/16"
              sizes="(min-width: 1024px) 520px, 100vw"
              className="w-full h-full object-contain"
            />
          </div>
          <figcaption className="px-4 py-2 text-xs md:text-sm text-muted-foreground">Fast, intuitive booking</figcaption>
        </figure>
        <figure className="overflow-hidden rounded-2xl border bg-background shadow-md animate-fade-in hover-scale">
          <div className="aspect-[9/16] w-full">
            <OptimizedBlogImage
              src={sunshineChatEn2}
              alt="Little Sunshine assists 24/7 — smart booking conversations"
              aspectRatio="9/16"
              sizes="(min-width: 1024px) 520px, 100vw"
              className="w-full h-full object-contain"
            />
          </div>
          <figcaption className="px-4 py-2 text-xs md:text-sm text-muted-foreground">24/7 assistant</figcaption>
        </figure>
      </div>

      <p><em>Example:</em> Hoa opens EmviApp and sees a nearby offer: perm + restorative treatment. She messages, “Book Saturday morning around 10.” Hoa’s chatbot finds a suitable salon, checks open slots, and contacts the salon’s chatbot. The two chatbots agree on a time and send confirmations to both sides. The salon taps confirm — and the booking is done.</p>

      <h3>A system that brings clients continuously</h3>
      <ul>
        <li>Automatic SEO</li>
        <li>Service and offer recommendations for nearby clients</li>
        <li>Fast booking in just a few taps</li>
        <li>Proactive chatbot suggestions and reminders</li>
      </ul>

      <h3>EmviApp’s invitation</h3>
      <p>You don’t need to build infrastructure, pay hosting, hire engineers, run SEO, or worry about ads. We’ve done it. Just get started — and let EmviApp handle the rest.</p>
    </div>
  );
}

function VietnameseArticle() {
  return (
    <div className="space-y-6">
      <h2 className="sr-only">EmviApp – Từ Một Gia Đình Làm Đẹp Đến Nền Tảng Giúp Ngành Làm Đẹp Tự Động Hóa</h2>

      <h2>Câu chuyện bắt đầu từ quầy tiếp tân</h2>
      <p>Tôi sinh ra và lớn lên trong một gia đình làm đẹp. Nhà tôi làm đủ mọi thứ: nails, tóc, nối mi, spa, massage… Tôi lớn lên giữa mùi nước sơn, tiếng máy sấy tóc, và tiếng trò chuyện rộn ràng của khách hàng.</p>
      <p>Tôi thấy ba mẹ và anh chị vừa phục vụ khách, vừa ghi chép tay, vừa phải nhớ lịch hẹn, vừa tính toán tip và lương cho nhân viên.</p>
      <p>Tôi luôn nghĩ:</p>
      <blockquote>“Nếu có một hệ thống để tất cả mọi thứ này tự động hóa, để gia đình chỉ tập trung vào khách hàng, thì tốt biết mấy…”</blockquote>

      <figure className="overflow-hidden rounded-2xl border bg-background shadow-md transition-transform hover:scale-[1.01] will-change-transform">
        <div className="aspect-[21/9] w-full">
          <OptimizedBlogImage
            src={happyCustomersImg}
            alt="Khoảnh khắc chân thực tại salon – khách hàng và nghệ nhân làm đẹp"
            aspectRatio="21/9"
            sizes="(min-width: 1024px) 1100px, 100vw"
            className="w-full h-full object-cover"
            priority
          />
        </div>
        <figcaption className="px-4 py-2 text-sm text-muted-foreground">Khoảnh khắc chân thực tại salon</figcaption>
      </figure>

      <h2>Từ web app gia đình đến EmviApp</h2>
      <p>Ban đầu, tôi chỉ định xây một web app cho gia đình.</p>
      <p>Tại sao không phải app di động? Vì tôi biết một sự thật mà ít chủ salon để ý:</p>
      <p>Nếu phát hành qua App Store, Apple sẽ thu 30% phí trên mỗi giao dịch trong ứng dụng.</p>
      <p>Nghĩa là, cứ $100 khách thanh toán qua app, Apple lấy $30 — số tiền đáng lẽ ra nên dùng để tái đầu tư vào dịch vụ và khách hàng.</p>
      <p>Khi web app của gia đình tôi vận hành trơn tru, mẹ tôi nói:</p>
      <blockquote>“App này tốt quá, sao con không làm để mọi người dùng luôn?”</blockquote>
      <p>Vậy là từ một ý định nhỏ, tôi tạo ra EmviApp – nền tảng để mọi salon có ứng dụng riêng ngay lập tức, mà không phải tốn hàng chục ngàn đô để phát triển và vận hành.</p>

      <figure className="overflow-hidden rounded-3xl border bg-background shadow-lg animate-fade-in">
        <div className="aspect-[16/9] w-full">
          <OptimizedBlogImage
            src={bookingConfirmCard}
            alt="Đặt lịch nhanh, trực quan của EmviApp"
            aspectRatio="16/9"
            sizes="(min-width: 1024px) 1100px, 100vw"
            className="w-full h-full object-cover"
          />
        </div>
        <figcaption className="px-4 py-3 text-sm text-muted-foreground">Đặt lịch nhanh, trực quan</figcaption>
      </figure>

      <h2>Sự thật về việc tự xây app</h2>
      <p>Nhiều chủ salon nghĩ: “Mình có thể tự làm app để giữ khách hàng.” Nhưng đây là thực tế:</p>
      <h3>1. Chi phí phát triển ban đầu</h3>
      <p>App cơ bản: $10.000 – $50.000</p>
      <p>App tùy chỉnh: $50.000 – $200.000+</p>
      <h3>2. Hosting & duy trì</h3>
      <p>$100 – $500/tháng cho máy chủ ổn định</p>
      <p>Thêm phí bảo mật, sao lưu dữ liệu, chứng chỉ SSL</p>
      <h3>3. Cập nhật & bảo trì</h3>
      <p>Mỗi lần iOS/Android cập nhật, cần thuê lập trình viên để nâng cấp mã nguồn: $500 – $5.000/lần</p>
      <h3>4. Marketing & quảng cáo</h3>
      <p>Không ai biết app của bạn nếu không chạy quảng cáo Google/Facebook: $1.000 – $5.000/tháng</p>
      <h3>5. SEO</h3>
      <p>Muốn app xuất hiện khi khách tìm “nail salon gần tôi” cần chiến lược SEO chuyên nghiệp: $500 – $2.000/tháng</p>
      <h3>6. Hoa hồng App Store</h3>
      <p>30% trên mỗi giao dịch in-app — tiền ra đi trước khi bạn kịp chạm vào.</p>
      <p>Kết quả? Sau khi trả mọi chi phí, nhiều app vẫn không đem lại khách mới. Và trong khi đó, khách hàng quay lại giảm dần vì không có chiến lược giữ chân hiệu quả.</p>

      <h2>Các ứng dụng khác vs EmviApp</h2>
      <table className="w-full border-separate border-spacing-y-2">
        <thead>
          <tr>
            <th className="text-left px-4 py-2">Các ứng dụng khác</th>
            <th className="text-left px-4 py-2">EmviApp</th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-muted/50"><td className="px-4 py-3 rounded-l-xl">Thu phí hoa hồng và phí ẩn</td><td className="px-4 py-3 rounded-r-xl">Không hoa hồng, giá minh bạch</td></tr>
          <tr className="bg-muted/40"><td className="px-4 py-3 rounded-l-xl">Tập trung vào bán quảng cáo</td><td className="px-4 py-3 rounded-r-xl">Tập trung đưa khách hàng đến salon</td></tr>
          <tr className="bg-muted/50"><td className="px-4 py-3 rounded-l-xl">Không hiểu ngành làm đẹp</td><td className="px-4 py-3 rounded-r-xl">Xây dựng bởi người sinh ra và lớn lên trong ngành</td></tr>
          <tr className="bg-muted/40"><td className="px-4 py-3 rounded-l-xl">Không có SEO tự động</td><td className="px-4 py-3 rounded-r-xl">SEO tự động theo ZIP code & dịch vụ</td></tr>
          <tr className="bg-muted/50"><td className="px-4 py-3 rounded-l-xl">Cần kỹ năng công nghệ cao</td><td className="px-4 py-3 rounded-r-xl">Chỉ cần đăng ký, mọi thứ đã sẵn sàng</td></tr>
        </tbody>
      </table>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <figure className="overflow-hidden rounded-2xl border bg-background shadow-md transition-transform hover:scale-[1.01] will-change-transform">
          <div className="aspect-[16/9] w-full">
            <OptimizedBlogImage
              src={salonOffersImg}
              alt="Ưu đãi và khuyến mãi của salon"
              aspectRatio="16/9"
              sizes="(min-width: 1024px) 540px, 100vw"
              className="w-full h-full object-cover"
            />
          </div>
          <figcaption className="px-4 py-2 text-xs md:text-sm text-muted-foreground">Ưu đãi được cá nhân hoá</figcaption>
        </figure>
        <figure className="overflow-hidden rounded-2xl border bg-background shadow-md transition-transform hover:scale-[1.01] will-change-transform">
          <div className="aspect-[16/9] w-full">
            <OptimizedBlogImage
              src={seoLocalSearchImg}
              alt="SEO địa phương tự động – bản đồ và kết quả tìm kiếm"
              aspectRatio="16/9"
              sizes="(min-width: 1024px) 540px, 100vw"
              className="w-full h-full object-cover"
            />
          </div>
          <figcaption className="px-4 py-2 text-xs md:text-sm text-muted-foreground">SEO địa phương tự động</figcaption>
        </figure>
      </div>

      <h2>SEO – Bí mật để có khách hàng không giới hạn</h2>
      <p>SEO (Search Engine Optimization) là cách giúp salon xuất hiện trên Google khi khách tìm kiếm dịch vụ.</p>
      <p>Với EmviApp:</p>
      <p>Mỗi khi bạn đăng salon hoặc tin tuyển dụng, hệ thống tự tạo một trang web tối ưu SEO theo vị trí, dịch vụ, và từ khóa.</p>
      <p>Google lập chỉ mục và hiển thị salon của bạn khi khách tìm “tiệm nail gần tôi” hoặc “cắt tóc ở [Tên Thành Phố]”.</p>
      <p>Không cần thuê agency, không cần chạy quảng cáo — mọi thứ diễn ra tự động.</p>
      <p>Điều này biến mỗi salon trên EmviApp thành một “mini-website” có khả năng thu hút khách hàng mới hàng ngày.</p>

      <h2>Little Sunshine – Trợ lý không bao giờ ngủ</h2>
      <p>Little Sunshine không chỉ là một chatbot.</p>
      <p>Cô ấy là:</p>
      <ul className="list-disc ml-5 space-y-1">
        <li>Lễ tân 24/7: Luôn sẵn sàng tiếp nhận và trả lời khách.</li>
        <li>Nhân viên bán hàng: Giới thiệu dịch vụ, upsell các gói chăm sóc.</li>
        <li>Trợ lý cá nhân: Hỗ trợ salon quản lý lịch, khách hàng, và ưu đãi.</li>
      </ul>

      <p>📌 Tương lai:</p>
      <ul className="list-disc ml-5 space-y-1">
        <li>Mỗi khách hàng, nghệ nhân, và salon sẽ có chatbot riêng.</li>
        <li>Chatbot sẽ nói chuyện trực tiếp với nhau để đặt và xác nhận lịch hẹn.</li>
      </ul>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <figure className="overflow-hidden rounded-2xl border bg-background shadow-md animate-fade-in hover-scale">
          <div className="aspect-[9/16] w-full">
            <OptimizedBlogImage
              src={sunshineChatVi1}
              alt="Giao diện hội thoại Little Sunshine – Đặt lịch nhanh, trực quan"
              aspectRatio="9/16"
              sizes="(min-width: 1024px) 520px, 100vw"
              className="w-full h-full object-contain"
            />
          </div>
          <figcaption className="px-4 py-2 text-xs md:text-sm text-muted-foreground">Đặt lịch nhanh, trực quan</figcaption>
        </figure>
        <figure className="overflow-hidden rounded-2xl border bg-background shadow-md animate-fade-in hover-scale">
          <div className="aspect-[9/16] w-full">
            <OptimizedBlogImage
              src={sunshineChatVi2}
              alt="Little Sunshine hỗ trợ 24/7 – trò chuyện đặt lịch thông minh"
              aspectRatio="9/16"
              sizes="(min-width: 1024px) 520px, 100vw"
              className="w-full h-full object-contain"
            />
          </div>
          <figcaption className="px-4 py-2 text-xs md:text-sm text-muted-foreground">Trợ lý 24/7</figcaption>
        </figure>
      </div>

      <p>Ví dụ:</p>
      <p>Chị Hoa mở EmviApp, thấy ưu đãi uốn tóc + dưỡng phục hồi từ salon gần nhà.</p>
      <p>Chị nhắn chatbot: “Đặt cho chị sáng thứ Bảy, khoảng 10 giờ.”</p>
      <p>Chatbot của chị Hoa tự động tìm salon phù hợp, kiểm tra lịch rảnh, và liên hệ chatbot của salon.</p>
      <p>Hai chatbot thống nhất thời gian, gửi thông báo xác nhận cho cả hai bên.</p>
      <p>Salon chỉ cần xác nhận — lịch đã được đặt.</p>

      <h2>Hệ thống mang khách hàng đến liên tục</h2>
      <p>Không chỉ giữ khách cũ, EmviApp được thiết kế để mang khách mới đến mỗi ngày thông qua:</p>
      <ul className="list-disc ml-5 space-y-1">
        <li>SEO tự động.</li>
        <li>Đề xuất dịch vụ và ưu đãi cho khách gần khu vực.</li>
        <li>Hệ thống đặt lịch nhanh chỉ với vài thao tác.</li>
        <li>Chatbot chủ động gợi ý và nhắc lịch cho khách.</li>
      </ul>

      <h2>Lời mời của EmviApp</h2>
      <p>Bạn không cần tự mình xây dựng, trả phí hosting, thuê đội ngũ kỹ thuật, chạy SEO, hoặc lo quảng cáo.</p>
      <p>Chúng tôi đã làm tất cả.</p>
      <p>Bạn chỉ cần bắt đầu, và để EmviApp làm phần còn lại.</p>
    </div>
  );
}

function getMeta(view: ViewMode) {
  const en = {
    title: 'EmviApp — Mission & Vision | Beauty business app, salon booking system',
    description:
      'From a family salon to a platform that automates bookings, SEO, and growth. EmviApp helps beauty businesses attract clients and run effortlessly.',
    keywords:
      'EmviApp, beauty business app, salon booking system, salon SEO, beauty chatbot, Little Sunshine, automation, salon software',
  };
  const vi = {
    title: 'EmviApp – Sứ mệnh & Tầm nhìn | Ứng dụng quản lý salon, SEO cho salon',
    description:
      'Từ câu chuyện gia đình làm đẹp đến nền tảng tự động hoá ngành: đặt lịch, SEO, và tăng trưởng. EmviApp giúp salon vận hành nhẹ nhàng, hút khách liên tục.',
    keywords:
      'EmviApp, ứng dụng quản lý salon, SEO cho salon, beauty business app, salon booking system, chatbot làm đẹp, Little Sunshine',
  };
  const dict = view === 'vi' ? vi : en;
  return dict;
}

function getJsonLd() {
  const base = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    author: { '@type': 'Organization', name: 'EmviApp' },
    publisher: {
      '@type': 'Organization',
      name: 'EmviApp',
      logo: { '@type': 'ImageObject', url: 'https://emvi.app/logo.png' },
    },
    url: CANONICAL_URL,
    mainEntityOfPage: CANONICAL_URL,
  } as const;

  return {
    en: {
      ...base,
      headline: 'EmviApp — Mission & Vision',
      inLanguage: 'en',
      description:
        'From a family salon story to an automation platform for the beauty industry — bookings, SEO, and growth built in.',
    },
    vi: {
      ...base,
      headline: 'EmviApp – Sứ mệnh & Tầm nhìn',
      inLanguage: 'vi',
      description:
        'Từ câu chuyện gia đình làm đẹp đến nền tảng tự động hoá cho ngành: đặt lịch, SEO, tăng trưởng.',
    },
  };
}

export default EmviMissionVision;
