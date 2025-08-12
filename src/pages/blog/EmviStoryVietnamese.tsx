import React from "react";
import BlogArticleLayout from "@/components/blog/BlogArticleLayout";
import heroImage from "@/assets/viral-article-hero.jpg";

const EmviStoryVietnamese: React.FC = () => {
  const article = {
    title: "EmviApp — Câu Chuyện Vượt Chuẩn, Tự Động Hóa Ngành Làm Đẹp",
    description:
      "Bài viết chuẩn cao cấp: từ câu chuyện gia đình đến nền tảng tự động hoá — đặt lịch, SEO địa phương và Little Sunshine mang khách đến mỗi ngày.",
    author: "EmviApp Editorial",
    publishedAt: "Aug 2025",
    readTime: "12 phút đọc",
    category: "Featured Story",
    tags: ["EmviApp", "Little Sunshine", "SEO", "Đặt lịch", "Tự động hoá"],
    image: heroImage,
  };

  const articleUrl = "https://emvi.app/blog/emviapp-vision/emviapp-story-vi";
  const articleSlug = "emviapp-story-vi";

  return (
    <BlogArticleLayout
      article={article}
      articleSlug={articleSlug}
      articleUrl={articleUrl}
      backLink="/blog"
      backText="Back to Blog"
    >
      <section>
        <h3>Tại sao EmviApp tồn tại</h3>
        <p>
          EmviApp sinh ra từ một điều rất đơn giản: phần mềm phải làm cho con người
          toả sáng, không phải che lấp họ. Chúng tôi xây một nền tảng chuẩn sang —
          nơi lịch hẹn mượt mà, SEO địa phương tự động, và một trợ lý song ngữ 24/7
          cùng nhau mang khách hàng đến cho salon mỗi ngày.
        </p>

        <h3>Đặt lịch mượt, nhanh, đáng tin</h3>
        <figure className="overflow-hidden rounded-2xl border bg-background shadow-md my-8">
          <img
            src="/lovable-uploads/bdef2029-146a-4a98-aaef-39e85aa6add3.png"
            alt="Xác nhận lịch hẹn EmviApp — thiết kế cao cấp"
            className="w-full h-auto object-cover"
            loading="lazy"
          />
          <figcaption className="px-4 py-2 text-sm text-muted-foreground">
            Đặt lịch nhanh, trực quan — trải nghiệm chuẩn vàng
          </figcaption>
        </figure>
        <p>
          Khách chọn dịch vụ trong vài chạm. Chủ salon nhận được thông tin rõ ràng,
          không bỏ lỡ bất kỳ cơ hội nào. Toàn bộ trải nghiệm được thiết kế để tạo
          cảm giác sang trọng và tin cậy.
        </p>

        <h3>SEO địa phương — khách tự tìm đến</h3>
        <p>
          Mỗi salon, mỗi tin tuyển dụng trở thành một trang chuyển đổi cao, tối ưu
          theo dịch vụ và vị trí. Google lập chỉ mục tự nhiên và hiển thị bạn khi
          khách tìm “tiệm nail gần tôi” hay “cắt tóc ở [Thành phố]”. Không cần
          agency, không cần quảng cáo — hiển thị tăng dần theo thời gian.
        </p>

        <h3>Little Sunshine — nhiều hơn một chatbot</h3>
        <p>
          Sunshine là lễ tân 24/7, là chuyên viên bán hàng tinh tế, và là trợ lý cá
          nhân song ngữ Việt–Anh. Cô ấy tư vấn, gợi ý, xác nhận lịch — luôn thân
          thiện, luôn đúng lúc.
        </p>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <figure className="overflow-hidden rounded-2xl border bg-background shadow-md">
            <img
              src="/lovable-uploads/9821b730-8ec5-410d-9102-a5ebb74be6c5.png"
              alt="Little Sunshine — Tiếng Việt"
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
              alt="Little Sunshine — English"
              className="w-full h-auto object-contain"
              loading="lazy"
            />
            <figcaption className="px-4 py-2 text-xs md:text-sm text-muted-foreground">
              Little Sunshine — English
            </figcaption>
          </figure>
        </div>

        <h3>Tầm nhìn</h3>
        <ul>
          <li>Trải nghiệm chuẩn cao cấp: thiết kế tinh tế, tốc độ nhanh, bảo mật tốt.</li>
          <li>Song ngữ mặc định: chạm tới cộng đồng Việt và quốc tế.</li>
          <li>Giá trị cộng dồn: mỗi hành động đều làm hành động tiếp theo hiệu quả hơn.</li>
        </ul>

        <h3>Lời mời</h3>
        <p>
          Bạn tập trung vào tay nghề và khách hàng. Phần còn lại — hiển thị, lịch
          hẹn, giữ chân — để EmviApp lo. Chào mừng đến chuẩn vàng của ngành làm
          đẹp.
        </p>
      </section>
    </BlogArticleLayout>
  );
};

export default EmviStoryVietnamese;
