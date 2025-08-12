import React from "react";
import BlogArticleLayout from "@/components/blog/BlogArticleLayout";
import heroImage from "@/assets/viral-article-community.jpg";

const MissionVisionVietnamese: React.FC = () => {
  const article = {
    title:
      "EmviApp – Từ Một Gia Đình Làm Đẹp Đến Nền Tảng Giúp Ngành Làm Đẹp Tự Động Hóa",
    description:
      "Câu chuyện thật từ quầy tiếp tân đến nền tảng tự động hoá cho ngành làm đẹp — đặt lịch, SEO và trợ lý Little Sunshine đưa khách hàng đến mỗi ngày.",
    author: "EmviApp Editorial",
    publishedAt: "Aug 2025",
    readTime: "12 phút đọc",
    category: "Vision",
    tags: [
      "EmviApp",
      "Little Sunshine",
      "SEO",
      "Đặt lịch",
      "Tự động hoá",
      "Câu chuyện gia đình",
    ],
    image: heroImage,
  };

  const articleUrl = "https://emvi.app/blog/emviapp-vision/mission-vision-vi";
  const articleSlug = "emviapp-vision-mission-vision-vi";

  return (
    <BlogArticleLayout
      article={article}
      articleSlug={articleSlug}
      articleUrl={articleUrl}
      backLink="/blog"
      backText="Back to Blog"
    >
      <section>
        <h2>Câu chuyện bắt đầu từ quầy tiếp tân</h2>
        <p>
          Tôi sinh ra và lớn lên trong một gia đình làm đẹp. Nhà tôi làm đủ mọi thứ:
          nails, tóc, nối mi, spa, massage… Tôi lớn lên giữa mùi nước sơn, tiếng
          máy sấy tóc, và tiếng trò chuyện rộn ràng của khách hàng.
        </p>
        <p>
          Tôi thấy ba mẹ và anh chị vừa phục vụ khách, vừa ghi chép tay, vừa phải
          nhớ lịch hẹn, vừa tính toán tip và lương cho nhân viên.
        </p>
        <p>Tôi luôn nghĩ:</p>
        <blockquote>
          “Nếu có một hệ thống để tất cả mọi thứ này tự động hóa, để gia đình chỉ
          tập trung vào khách hàng, thì tốt biết mấy…”
        </blockquote>

        <h2>Từ web app gia đình đến EmviApp</h2>
        <p>Ban đầu, tôi chỉ định xây một web app cho gia đình.</p>
        <p>
          Tại sao không phải app di động? Vì tôi biết một sự thật mà ít chủ salon
          để ý:
        </p>
        <p>
          Nếu phát hành qua App Store, Apple sẽ thu 30% phí trên mỗi giao dịch
          trong ứng dụng.
        </p>
        <p>
          Nghĩa là, cứ $100 khách thanh toán qua app, Apple lấy $30 — số tiền đáng
          lẽ ra nên dùng để tái đầu tư vào dịch vụ và khách hàng.
        </p>
        <p>Khi web app của gia đình tôi vận hành trơn tru, mẹ tôi nói:</p>
        <blockquote>
          “App này tốt quá, sao con không làm để mọi người dùng luôn?”
        </blockquote>
        <p>
          Vậy là từ một ý định nhỏ, tôi tạo ra EmviApp – nền tảng để mọi salon có
          ứng dụng riêng ngay lập tức, mà không phải tốn hàng chục ngàn đô để phát
          triển và vận hành.
        </p>

        {/* Booking confirmation visual */}
        <figure className="overflow-hidden rounded-2xl border bg-background shadow-md my-8">
          <img
            src="/lovable-uploads/bdef2029-146a-4a98-aaef-39e85aa6add3.png"
            alt="Xác nhận lịch hẹn EmviApp — thiết kế cao cấp, tin cậy"
            className="w-full h-auto object-cover"
            loading="lazy"
          />
          <figcaption className="px-4 py-2 text-sm text-muted-foreground">
            Đặt lịch nhanh, trực quan
          </figcaption>
        </figure>

        <h2>Sự thật về việc tự xây app</h2>
        <p>
          Nhiều chủ salon nghĩ: “Mình có thể tự làm app để giữ khách hàng.” Nhưng
          đây là thực tế:
        </p>
        <ol>
          <li>
            <strong>Chi phí phát triển ban đầu</strong>
            <br />
            App cơ bản: $10.000 – $50.000
            <br />
            App tùy chỉnh: $50.000 – $200.000+
          </li>
          <li>
            <strong>Hosting & duy trì</strong>
            <br />$100 – $500/tháng cho máy chủ ổn định
            <br />Thêm phí bảo mật, sao lưu dữ liệu, chứng chỉ SSL
          </li>
          <li>
            <strong>Cập nhật & bảo trì</strong>
            <br />Mỗi lần iOS/Android cập nhật, cần thuê lập trình viên để nâng cấp
            mã nguồn: $500 – $5.000/lần
          </li>
          <li>
            <strong>Marketing & quảng cáo</strong>
            <br />Không ai biết app của bạn nếu không chạy quảng cáo
            Google/Facebook: $1.000 – $5.000/tháng
          </li>
          <li>
            <strong>SEO</strong>
            <br />Muốn app xuất hiện khi khách tìm “nail salon gần tôi” cần chiến
            lược SEO chuyên nghiệp: $500 – $2.000/tháng
          </li>
          <li>
            <strong>Hoa hồng App Store</strong>
            <br />30% trên mỗi giao dịch in-app — tiền ra đi trước khi bạn kịp chạm
            vào.
          </li>
        </ol>
        <p>
          Kết quả? Sau khi trả mọi chi phí, nhiều app vẫn không đem lại khách mới.
          Và trong khi đó, khách hàng quay lại giảm dần vì không có chiến lược giữ
          chân hiệu quả.
        </p>

        <h2>Các ứng dụng khác vs EmviApp</h2>
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
              <td className="px-4 py-3 rounded-r-xl">
                Tập trung đưa khách hàng đến salon
              </td>
            </tr>
            <tr className="bg-muted/50">
              <td className="px-4 py-3 rounded-l-xl">Không hiểu ngành làm đẹp</td>
              <td className="px-4 py-3 rounded-r-xl">
                Xây dựng bởi người sinh ra và lớn lên trong ngành
              </td>
            </tr>
            <tr className="bg-muted/40">
              <td className="px-4 py-3 rounded-l-xl">Không có SEO tự động</td>
              <td className="px-4 py-3 rounded-r-xl">
                SEO tự động theo ZIP code & dịch vụ
              </td>
            </tr>
            <tr className="bg-muted/50">
              <td className="px-4 py-3 rounded-l-xl">Cần kỹ năng công nghệ cao</td>
              <td className="px-4 py-3 rounded-r-xl">
                Chỉ cần đăng ký, mọi thứ đã sẵn sàng
              </td>
            </tr>
          </tbody>
        </table>

        <h2>SEO – Bí mật để có khách hàng không giới hạn</h2>
        <p>
          SEO (Search Engine Optimization) là cách giúp salon xuất hiện trên
          Google khi khách tìm kiếm dịch vụ.
        </p>
        <p>
          Với EmviApp: Mỗi khi bạn đăng salon hoặc tin tuyển dụng, hệ thống tự tạo
          một trang web tối ưu SEO theo vị trí, dịch vụ, và từ khóa.
        </p>
        <p>
          Google lập chỉ mục và hiển thị salon của bạn khi khách tìm “tiệm nail
          gần tôi” hoặc “cắt tóc ở [Tên Thành Phố]”.
        </p>
        <p>
          Không cần thuê agency, không cần chạy quảng cáo — mọi thứ diễn ra tự
          động.
        </p>
        <p>
          Điều này biến mỗi salon trên EmviApp thành một “mini-website” có khả
          năng thu hút khách hàng mới hàng ngày.
        </p>

        <h2>Little Sunshine – Trợ lý không bao giờ ngủ</h2>
        <p>Little Sunshine không chỉ là một chatbot. Cô ấy là:</p>
        <ul>
          <li>
            <strong>Lễ tân 24/7:</strong> Luôn sẵn sàng tiếp nhận và trả lời khách.
          </li>
          <li>
            <strong>Nhân viên bán hàng:</strong> Giới thiệu dịch vụ, upsell các gói
            chăm sóc.
          </li>
          <li>
            <strong>Trợ lý cá nhân:</strong> Hỗ trợ salon quản lý lịch, khách hàng,
            và ưu đãi.
          </li>
        </ul>

        {/* Sunshine visuals */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <figure className="overflow-hidden rounded-2xl border bg-background shadow-md">
            <img
              src="/lovable-uploads/9821b730-8ec5-410d-9102-a5ebb74be6c5.png"
              alt="Giao diện Little Sunshine — Tiếng Việt"
              className="w-full h-auto object-contain"
              loading="lazy"
            />
            <figcaption className="px-4 py-2 text-xs md:text-sm text-muted-foreground">
              Little Sunshine — Tiếng Việt
            </figcaption>
          </figure>
          <figure className="overflow-hidden rounded-2xl border bg-background shadow-md">
            <img
              src="/lovable-uploads/49d61ee7-a56d-4594-9874-7202526bdca7.png"
              alt="Little Sunshine — English interface"
              className="w-full h-auto object-contain"
              loading="lazy"
            />
            <figcaption className="px-4 py-2 text-xs md:text-sm text-muted-foreground">
              Little Sunshine — English
            </figcaption>
          </figure>
        </div>

        <h2>📌 Tương lai</h2>
        <p>
          Mỗi khách hàng, nghệ nhân, và salon sẽ có chatbot riêng. Chatbot sẽ nói
          chuyện trực tiếp với nhau để đặt và xác nhận lịch hẹn.
        </p>
        <p>
          Ví dụ: Chị Hoa mở EmviApp, thấy ưu đãi uốn tóc + dưỡng phục hồi từ salon
          gần nhà. Chị nhắn chatbot: “Đặt cho chị sáng thứ Bảy, khoảng 10 giờ.”
          Chatbot của chị Hoa tự động tìm salon phù hợp, kiểm tra lịch rảnh, và
          liên hệ chatbot của salon. Hai chatbot thống nhất thời gian, gửi thông
          báo xác nhận cho cả hai bên. Salon chỉ cần xác nhận — lịch đã được đặt.
        </p>

        <h2>Hệ thống mang khách hàng đến liên tục</h2>
        <ul>
          <li>SEO tự động.</li>
          <li>Đề xuất dịch vụ và ưu đãi cho khách gần khu vực.</li>
          <li>Hệ thống đặt lịch nhanh chỉ với vài thao tác.</li>
          <li>Chatbot chủ động gợi ý và nhắc lịch cho khách.</li>
        </ul>

        <h2>Lời mời của EmviApp</h2>
        <p>
          Bạn không cần tự mình xây dựng, trả phí hosting, thuê đội ngũ kỹ thuật,
          chạy SEO, hoặc lo quảng cáo. Chúng tôi đã làm tất cả. Bạn chỉ cần bắt
          đầu, và để EmviApp làm phần còn lại.
        </p>
      </section>
    </BlogArticleLayout>
  );
};

export default MissionVisionVietnamese;
