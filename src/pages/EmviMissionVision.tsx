import React, { useMemo, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import bookingCalendarImg from '@/assets/emvi/booking-calendar-mockup.jpg';
import sunshineChatImg from '@/assets/emvi/little-sunshine-chat.jpg';
import salonOffersImg from '@/assets/emvi/salon-offers.jpg';
import seoLocalSearchImg from '@/assets/emvi/seo-local-search.jpg';
import happyCustomersImg from '@/assets/emvi/happy-customers-pros.jpg';
import { useLocation, useNavigate } from 'react-router-dom';

// Bilingual Article Page: EmviApp Mission & Vision
// English is default; Vietnamese shown via local toggle (does not affect global language)

const CANONICAL_URL = 'https://emvi.app/emviapp-mission-vision';

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

type ViewMode = 'en' | 'vi' | 'both';

const EmviMissionVision: React.FC = () => {
  const query = useQuery();
  const navigate = useNavigate();
  const initialFromQuery = (query.get('lang') as ViewMode) || 'en';
  const [view, setView] = useState<ViewMode>(['en', 'vi', 'both'].includes(initialFromQuery) ? initialFromQuery : 'en');

  useEffect(() => {
    // keep URL in sync for hreflang and shareability
    const params = new URLSearchParams(window.location.search);
    params.set('lang', view);
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState(null, '', newUrl);
  }, [view]);

  const meta = getMeta(view);
  const jsonLd = getJsonLd();

  const renderImages = () => (
    <section aria-labelledby="visuals" className="mx-auto max-w-6xl w-full">
      <h2 id="visuals" className="text-xl md:text-2xl font-semibold tracking-tight mb-4">{view === 'vi' ? 'Hình ảnh minh hoạ' : 'Visual Previews'}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <figure className="overflow-hidden rounded-xl"><img src={bookingCalendarImg} loading="lazy" alt={view === 'vi' ? 'Mô phỏng giao diện lịch đặt chỗ của EmviApp' : 'EmviApp booking calendar UI mockup'} className="w-full h-auto" /></figure>
        <figure className="overflow-hidden rounded-xl"><img src={sunshineChatImg} loading="lazy" alt={view === 'vi' ? 'Xem trước hội thoại chatbot Little Sunshine' : 'Little Sunshine chatbot conversation preview'} className="w-full h-auto" /></figure>
        <figure className="overflow-hidden rounded-xl"><img src={salonOffersImg} loading="lazy" alt={view === 'vi' ? 'Mô phỏng ưu đãi và khuyến mãi của salon' : 'Salon offers and promotions mockup'} className="w-full h-auto" /></figure>
        <figure className="overflow-hidden rounded-xl"><img src={seoLocalSearchImg} loading="lazy" alt={view === 'vi' ? 'Đồ hoạ SEO: bản đồ với ghim vị trí và kết quả tìm kiếm' : 'SEO local search graphic with map pin and results'} className="w-full h-auto" /></figure>
        <figure className="overflow-hidden rounded-xl md:col-span-2"><img src={happyCustomersImg} loading="lazy" alt={view === 'vi' ? 'Khách hàng và chuyên gia làm đẹp hạnh phúc tại salon' : 'Happy customers and beauty professionals in action'} className="w-full h-auto" /></figure>
      </div>
    </section>
  );

  return (
    <article className="w-full">
      <Helmet>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <meta name="keywords" content={meta.keywords} />
        <link rel="canonical" href={CANONICAL_URL} />
        {/* hreflang alternates */}
        <link rel="alternate" hrefLang="en" href={`${CANONICAL_URL}`} />
        <link rel="alternate" hrefLang="vi" href={`${CANONICAL_URL}?lang=vi`} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:url" content={CANONICAL_URL} />
        <meta property="og:site_name" content="EmviApp" />
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        {/* Structured data for both languages */}
        <script type="application/ld+json">{JSON.stringify(jsonLd.en)}</script>
        <script type="application/ld+json">{JSON.stringify(jsonLd.vi)}</script>
      </Helmet>

      <header className="mx-auto max-w-6xl w-full px-4 md:px-6 py-8 md:py-12">
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
          {view === 'vi' ? 'EmviApp – Sứ mệnh & Tầm nhìn' : 'EmviApp — Mission & Vision'}
        </h1>
        <p className="mt-3 text-base md:text-lg opacity-80">
          {view === 'vi'
            ? 'Hành trình từ một gia đình làm đẹp đến nền tảng tự động hoá cho toàn ngành.'
            : 'From a family salon story to an automation platform for the beauty industry.'}
        </p>

        {/* Local language view controls */}
        <div className="mt-6 flex items-center gap-2">
          <button aria-label="View English" onClick={() => setView('en')} className={`px-3 py-1 rounded-full text-sm border ${view==='en'?'':'opacity-70'}`}>
            English
          </button>
          <button aria-label="Xem Tiếng Việt" onClick={() => setView('vi')} className={`px-3 py-1 rounded-full text-sm border ${view==='vi'?'':'opacity-70'}`}>
            Tiếng Việt
          </button>
          <button aria-label="View both languages" onClick={() => setView('both')} className={`hidden md:inline-block px-3 py-1 rounded-full text-sm border ${view==='both'?'':'opacity-70'}`}>
            {view === 'vi' ? 'Xem song song' : 'View side‑by‑side'}
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl w-full px-4 md:px-6 pb-16">
        {view === 'both' ? (
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <LangSection lang="en">
              <EnglishArticle />
            </LangSection>
            <LangSection lang="vi">
              <VietnameseArticle />
            </LangSection>
            <div className="md:col-span-2 mt-6">{renderImages()}</div>
          </div>
        ) : (
          <div className="space-y-10">
            <LangSection lang={view}>
              {view === 'en' ? <EnglishArticle /> : <VietnameseArticle />}
            </LangSection>
            {renderImages()}
          </div>
        )}
      </main>
    </article>
  );
};

function LangSection({ lang, children }: { lang: ViewMode; children: React.ReactNode }) {
  return (
    <section lang={lang === 'vi' ? 'vi' : 'en'} className="prose max-w-none">
      {children}
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
      <table>
        <thead>
          <tr>
            <th>Other Apps</th>
            <th>EmviApp</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Commissions and hidden fees</td>
            <td>No commissions, transparent pricing</td>
          </tr>
          <tr>
            <td>Optimized to sell ads</td>
            <td>Optimized to bring clients to salons</td>
          </tr>
          <tr>
            <td>Don’t understand beauty industry</td>
            <td>Built by someone raised in the industry</td>
          </tr>
          <tr>
            <td>No automatic SEO</td>
            <td>Automatic SEO by ZIP code and service</td>
          </tr>
          <tr>
            <td>High technical burden</td>
            <td>Just sign up — everything works</td>
          </tr>
        </tbody>
      </table>

      <h3>SEO — the secret to limitless clients</h3>
      <p>SEO helps your salon appear on Google when people search. With EmviApp, every time you publish a salon or job post, the system auto‑creates an SEO‑optimized page by location, service, and keyword. Google indexes it and shows your salon for “nail salon near me” or “haircut in [City].” No agency, no ads — it just works. Every salon becomes a mini‑website that can attract new clients daily.</p>

      <h3>Little Sunshine — the assistant who never sleeps</h3>
      <p>Little Sunshine isn’t “just a chatbot.” She’s your 24/7 receptionist, your sales specialist who introduces services and upsells care packages, and your personal assistant helping manage schedules, clients, and promotions.</p>
      <p><strong>The future:</strong> Every client, artist, and salon will have their own chatbot. They’ll talk to each other to book and confirm appointments.</p>
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
    <div className="whitespace-pre-wrap">
EmviApp – Từ Một Gia Đình Làm Đẹp Đến Nền Tảng Giúp Ngành Làm Đẹp Tự Động Hóa
Câu chuyện bắt đầu từ quầy tiếp tân
Tôi sinh ra và lớn lên trong một gia đình làm đẹp. Nhà tôi làm đủ mọi thứ: nails, tóc, nối mi, spa, massage… Tôi lớn lên giữa mùi nước sơn, tiếng máy sấy tóc, và tiếng trò chuyện rộn ràng của khách hàng.

Tôi thấy ba mẹ và anh chị vừa phục vụ khách, vừa ghi chép tay, vừa phải nhớ lịch hẹn, vừa tính toán tip và lương cho nhân viên.

Tôi luôn nghĩ:

“Nếu có một hệ thống để tất cả mọi thứ này tự động hóa, để gia đình chỉ tập trung vào khách hàng, thì tốt biết mấy…”

Từ web app gia đình đến EmviApp
Ban đầu, tôi chỉ định xây một web app cho gia đình.
Tại sao không phải app di động? Vì tôi biết một sự thật mà ít chủ salon để ý:

Nếu phát hành qua App Store, Apple sẽ thu 30% phí trên mỗi giao dịch trong ứng dụng.

Nghĩa là, cứ $100 khách thanh toán qua app, Apple lấy $30 — số tiền đáng lẽ ra nên dùng để tái đầu tư vào dịch vụ và khách hàng.

Khi web app của gia đình tôi vận hành trơn tru, mẹ tôi nói:

“App này tốt quá, sao con không làm để mọi người dùng luôn?”

Vậy là từ một ý định nhỏ, tôi tạo ra EmviApp – nền tảng để mọi salon có ứng dụng riêng ngay lập tức, mà không phải tốn hàng chục ngàn đô để phát triển và vận hành.

Sự thật về việc tự xây app
Nhiều chủ salon nghĩ: “Mình có thể tự làm app để giữ khách hàng.” Nhưng đây là thực tế:

1. Chi phí phát triển ban đầu

App cơ bản: $10.000 – $50.000

App tùy chỉnh: $50.000 – $200.000+

2. Hosting & duy trì

$100 – $500/tháng cho máy chủ ổn định

Thêm phí bảo mật, sao lưu dữ liệu, chứng chỉ SSL

3. Cập nhật & bảo trì

Mỗi lần iOS/Android cập nhật, cần thuê lập trình viên để nâng cấp mã nguồn: $500 – $5.000/lần

4. Marketing & quảng cáo

Không ai biết app của bạn nếu không chạy quảng cáo Google/Facebook: $1.000 – $5.000/tháng

5. SEO

Muốn app xuất hiện khi khách tìm “nail salon gần tôi” cần chiến lược SEO chuyên nghiệp: $500 – $2.000/tháng

6. Hoa hồng App Store

30% trên mỗi giao dịch in-app — tiền ra đi trước khi bạn kịp chạm vào.

Kết quả? Sau khi trả mọi chi phí, nhiều app vẫn không đem lại khách mới. Và trong khi đó, khách hàng quay lại giảm dần vì không có chiến lược giữ chân hiệu quả.

Các ứng dụng khác vs EmviApp
Các ứng dụng khác	EmviApp
Thu phí hoa hồng và phí ẩn	Không hoa hồng, giá minh bạch
Tập trung vào bán quảng cáo	Tập trung đưa khách hàng đến salon
Không hiểu ngành làm đẹp	Xây dựng bởi người sinh ra và lớn lên trong ngành
Không có SEO tự động	SEO tự động theo ZIP code & dịch vụ
Cần kỹ năng công nghệ cao	Chỉ cần đăng ký, mọi thứ đã sẵn sàng

SEO – Bí mật để có khách hàng không giới hạn
SEO (Search Engine Optimization) là cách giúp salon xuất hiện trên Google khi khách tìm kiếm dịch vụ.

Với EmviApp:

Mỗi khi bạn đăng salon hoặc tin tuyển dụng, hệ thống tự tạo một trang web tối ưu SEO theo vị trí, dịch vụ, và từ khóa.

Google lập chỉ mục và hiển thị salon của bạn khi khách tìm “tiệm nail gần tôi” hoặc “cắt tóc ở [Tên Thành Phố]”.

Không cần thuê agency, không cần chạy quảng cáo — mọi thứ diễn ra tự động.

Điều này biến mỗi salon trên EmviApp thành một “mini-website” có khả năng thu hút khách hàng mới hàng ngày.

Little Sunshine – Trợ lý không bao giờ ngủ
Little Sunshine không chỉ là một chatbot.
Cô ấy là:

Lễ tân 24/7: Luôn sẵn sàng tiếp nhận và trả lời khách.

Nhân viên bán hàng: Giới thiệu dịch vụ, upsell các gói chăm sóc.

Trợ lý cá nhân: Hỗ trợ salon quản lý lịch, khách hàng, và ưu đãi.

📌 Tương lai:

Mỗi khách hàng, nghệ nhân, và salon sẽ có chatbot riêng.

Chatbot sẽ nói chuyện trực tiếp với nhau để đặt và xác nhận lịch hẹn.

Ví dụ:

Chị Hoa mở EmviApp, thấy ưu đãi uốn tóc + dưỡng phục hồi từ salon gần nhà.

Chị nhắn chatbot: “Đặt cho chị sáng thứ Bảy, khoảng 10 giờ.”

Chatbot của chị Hoa tự động tìm salon phù hợp, kiểm tra lịch rảnh, và liên hệ chatbot của salon.

Hai chatbot thống nhất thời gian, gửi thông báo xác nhận cho cả hai bên.

Salon chỉ cần xác nhận — lịch đã được đặt.

Hệ thống mang khách hàng đến liên tục
Không chỉ giữ khách cũ, EmviApp được thiết kế để mang khách mới đến mỗi ngày thông qua:

SEO tự động.

Đề xuất dịch vụ và ưu đãi cho khách gần khu vực.

Hệ thống đặt lịch nhanh chỉ với vài thao tác.

Chatbot chủ động gợi ý và nhắc lịch cho khách.

Lời mời của EmviApp
Bạn không cần tự mình xây dựng, trả phí hosting, thuê đội ngũ kỹ thuật, chạy SEO, hoặc lo quảng cáo.
Chúng tôi đã làm tất cả.
Bạn chỉ cần bắt đầu, và để EmviApp làm phần còn lại.
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
