import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

const Top5WebsiteDangTinTuyenThoNail: React.FC = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Top 5 Website Uy Tín Cho Người Việt Đăng Tin Tuyển Dụng Nail",
    "description": "So sánh chi tiết 5 website tốt nhất để đăng tin tuyển dụng thợ nail. Hướng dẫn cách viết job post hiệu quả và thu hút ứng viên chất lượng.",
    "author": {
      "@type": "Person",
      "name": "EmviApp Team"
    },
    "publisher": {
      "@type": "Organization",
      "name": "EmviApp",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.emvi.app/logo.png"
      }
    },
    "datePublished": "2025-01-22T08:00:00Z",
    "dateModified": "2025-01-22T08:00:00Z",
    "url": "https://www.emvi.app/blog/top-5-website-dang-tin-tuyen-tho-nail",
    "image": "https://www.emvi.app/og-blog.jpg"
  };

  return (
    <>
      <Helmet>
        <title>Top 5 Website Uy Tín Cho Người Việt Đăng Tin Tuyển Dụng Nail | EmviApp</title>
        <meta name="description" content="So sánh chi tiết 5 website tốt nhất để đăng tin tuyển dụng thợ nail. Hướng dẫn cách viết job post hiệu quả và thu hút ứng viên chất lượng." />
        <link rel="canonical" href="https://www.emvi.app/blog/top-5-website-dang-tin-tuyen-tho-nail" />
        <meta property="og:title" content="Top 5 Website Uy Tín Cho Người Việt Đăng Tin Tuyển Dụng Nail" />
        <meta property="og:description" content="So sánh chi tiết 5 website tốt nhất để đăng tin tuyển dụng thợ nail. Hướng dẫn cách viết job post hiệu quả và thu hút ứng viên chất lượng." />
        <meta property="og:url" content="https://www.emvi.app/blog/top-5-website-dang-tin-tuyen-tho-nail" />
        <meta property="og:type" content="article" />
        <meta property="og:image" content="https://www.emvi.app/og-blog.jpg" />
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      </Helmet>

      <main className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <article className="prose prose-lg max-w-none">
            <header className="mb-8">
              <h1 className="text-4xl font-bold text-foreground mb-4">
                Top 5 Website Uy Tín Cho Người Việt Đăng Tin Tuyển Dụng Nail
              </h1>
              <div className="flex items-center text-muted-foreground text-sm mb-6">
                <span>Đăng bởi EmviApp Team</span>
                <span className="mx-2">•</span>
                <time dateTime="2025-01-22">22 tháng 1, 2025</time>
                <span className="mx-2">•</span>
                <span>8 phút đọc</span>
              </div>
            </header>

            <div className="space-y-6 text-foreground">
              <p className="text-xl leading-relaxed">
                Việc tuyển dụng thợ nail giỏi là thách thức lớn nhất mà các chủ tiệm nail người Việt đang đối mặt tại Mỹ. Với thị trường nhân lực ngày càng khan hiếm và cạnh tranh gay gắt, việc chọn đúng nền tảng đăng tin tuyển dụng có thể quyết định thành bại của tiệm bạn. Hãy cùng khám phá 5 website uy tín nhất hiện nay và cách tối ưu hóa tin đăng để thu hút nhân tài.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">Tại Sao Cần Website Chuyên Biệt Cho Tuyển Dụng Nail?</h2>
              
              <p>
                Ngành nail có những đặc thù riêng mà các website tuyển dụng tổng quát không thể đáp ứng:
              </p>

              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Ngôn ngữ:</strong> Cần hỗ trợ tiếng Việt cho cả nhà tuyển dụng và ứng viên</li>
                <li><strong>Kỹ năng chuyên môn:</strong> Phân loại theo từng loại dịch vụ (acrylic, gel, nail art...)</li>
                <li><strong>Văn hóa làm việc:</strong> Hiểu về tip sharing, commission, lương theo tuần</li>
                <li><strong>Vị trí địa lý:</strong> Tập trung vào các khu có đông người Việt</li>
                <li><strong>Thời gian:</strong> Nhiều tiệm cần tuyển gấp, cần platform phản hồi nhanh</li>
              </ul>

              <p>
                Theo khảo sát của Hiệp hội Nail Mỹ 2024, 78% chủ tiệm nail cho biết khó khăn nhất là tìm được thợ nail có kỹ năng và thái độ phù hợp. Việc sử dụng đúng nền tảng có thể giảm thời gian tuyển dụng từ 3-4 tháng xuống 2-4 tuần.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">Top 5 Website Tuyển Dụng Nail Tốt Nhất</h2>

              <h3 className="text-xl font-semibold mt-6 mb-3">1. EmviApp - Nền Tảng Số 1 Cho Cộng Đồng Nail Việt</h3>
              
              <p>
                <Link to="/jobs" className="text-primary hover:underline">EmviApp</Link> được thiết kế đặc biệt cho cộng đồng người Việt trong ngành làm đẹp, với sự hiểu biết sâu sắc về nhu cầu và văn hóa làm việc của ngành nail.
              </p>

              <div className="bg-primary/10 p-6 rounded-lg">
                <h4 className="font-semibold mb-3 text-primary">Ưu điểm nổi bật của EmviApp:</h4>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>100% miễn phí</strong> cho chủ tiệm đăng tin tuyển dụng</li>
                  <li><strong>Giao diện song ngữ</strong> Việt-Anh, dễ sử dụng</li>
                  <li><strong>Targeting chính xác</strong> theo khu vực và chuyên môn</li>
                  <li><strong>Hệ thống đánh giá</strong> ứng viên từ cộng đồng</li>
                  <li><strong>Chat trực tiếp</strong> với ứng viên ngay trên app</li>
                  <li><strong>Thông báo real-time</strong> khi có ứng viên mới</li>
                  <li><strong>Portfolio integration</strong> - xem ngay mẫu nail của ứng viên</li>
                </ul>
              </div>

              <p>
                <strong>Phù hợp với:</strong> Tất cả các loại tiệm nail, đặc biệt tốt cho các tiệm muốn tuyển thợ có kinh nghiệm hoặc thợ mới vào nghề.
              </p>

              <p>
                <strong>Giá cả:</strong> Hoàn toàn miễn phí. EmviApp kiếm tiền từ các dịch vụ premium khác, không từ job posting.
              </p>

              <h3 className="text-xl font-semibold mt-6 mb-3">2. Indeed - Nền Tảng Tuyển Dụng Lớn Nhất</h3>
              
              <p>
                Indeed là website tuyển dụng lớn nhất thế giới với hàng triệu người dùng mỗi ngày. Mặc dù không chuyên biệt cho ngành nail, nhưng độ phủ rộng giúp tiếp cận nhiều ứng viên.
              </p>

              <p><strong>Ưu điểm:</strong></p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Lưu lượng truy cập cực lớn</li>
                <li>SEO tốt, dễ tìm thấy trên Google</li>
                <li>Hỗ trợ đăng tin miễn phí (có hạn chế)</li>
                <li>Tích hợp với LinkedIn và social media</li>
              </ul>

              <p><strong>Nhược điểm:</strong></p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Cạnh tranh cao, tin đăng dễ bị chìm</li>
                <li>Không hỗ trợ tiếng Việt</li>
                <li>Ít ứng viên hiểu về văn hóa nail Việt</li>
                <li>Phí sponsored post cao ($150-500/tháng)</li>
                <li>Interface phức tạp cho người ít tech-savvy</li>
              </ul>

              <p><strong>Chi phí:</strong> Miễn phí cơ bản, $150-500/tháng cho sponsored posts</p>

              <h3 className="text-xl font-semibold mt-6 mb-3">3. Craigslist - Kinh Điển Nhưng Hiệu Quả</h3>
              
              <p>
                Craigslist vẫn là lựa chọn phổ biến của nhiều chủ tiệm nail, đặc biệt trong cộng đồng người Việt tại các thành phố lớn.
              </p>

              <p><strong>Ưu điểm:</strong></p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Rất rẻ ($5-45 tùy thành phố)</li>
                <li>Nhiều người Việt vẫn sử dụng</li>
                <li>Có thể post bằng tiếng Việt</li>
                <li>Interface đơn giản</li>
              </ul>

              <p><strong>Nhược điểm:</strong></p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Nhiều spam và tin giả</li>
                <li>Không có hệ thống lọc ứng viên</li>
                <li>UI lỗi thời, không professional</li>
                <li>Khó track hiệu quả tin đăng</li>
                <li>An ninh thông tin kém</li>
              </ul>

              <p><strong>Chi phí:</strong> $5-45 tùy theo thành phố</p>

              <h3 className="text-xl font-semibold mt-6 mb-3">4. Facebook Jobs & Groups - Mạng Lưới Cộng Đồng</h3>
              
              <p>
                Facebook vẫn là nền tảng mạnh cho cộng đồng người Việt, với nhiều groups chuyên về tuyển dụng nail.
              </p>

              <p><strong>Groups phổ biến:</strong></p>
              <ul className="list-disc pl-6 space-y-2">
                <li>"Vietnamese Nail Jobs USA" (45K+ members)</li>
                <li>"Nail Technician Jobs" (38K+ members)</li>
                <li>"California Nail Jobs" (25K+ members)</li>
                <li>"Texas Vietnamese Nail Community" (18K+ members)</li>
              </ul>

              <p><strong>Ưu điểm:</strong></p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Miễn phí hoàn toàn</li>
                <li>Cộng đồng người Việt lớn</li>
                <li>Có thể xem profile ứng viên</li>
                <li>Chat messenger trực tiếp</li>
              </ul>

              <p><strong>Nhược điểm:</strong></p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Không chuyên nghiệp</li>
                <li>Tin đăng nhanh bị chìm</li>
                <li>Khó quản lý ứng viên</li>
                <li>Nhiều spam và drama</li>
              </ul>

              <h3 className="text-xl font-semibold mt-6 mb-3">5. ZipRecruiter - AI-Powered Matching</h3>
              
              <p>
                ZipRecruiter sử dụng AI để match ứng viên với job posting, giúp tăng hiệu quả tuyển dụng.
              </p>

              <p><strong>Ưu điểm:</strong></p>
              <ul className="list-disc pl-6 space-y-2">
                <li>AI matching thông minh</li>
                <li>Phân phối tin đăng trên 100+ job boards</li>
                <li>Analytics chi tiết</li>
                <li>Mobile app tốt</li>
              </ul>

              <p><strong>Nhược điểm:</strong></p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Đắt ($249-999/tháng)</li>
                <li>Không hỗ trợ tiếng Việt</li>
                <li>Ít ứng viên nail chuyên nghiệp</li>
              </ul>

              <h2 className="text-2xl font-semibold mt-8 mb-4">So Sánh Chi Tiết Các Platform</h2>

              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse border border-border">
                  <thead>
                    <tr className="bg-muted">
                      <th className="border border-border px-4 py-2 text-left">Platform</th>
                      <th className="border border-border px-4 py-2 text-left">Chi phí</th>
                      <th className="border border-border px-4 py-2 text-left">Tiếng Việt</th>
                      <th className="border border-border px-4 py-2 text-left">Chất lượng UV</th>
                      <th className="border border-border px-4 py-2 text-left">Đánh giá</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-border px-4 py-2">EmviApp</td>
                      <td className="border border-border px-4 py-2">Miễn phí</td>
                      <td className="border border-border px-4 py-2">✅ Đầy đủ</td>
                      <td className="border border-border px-4 py-2">⭐⭐⭐⭐⭐</td>
                      <td className="border border-border px-4 py-2">9.5/10</td>
                    </tr>
                    <tr className="bg-muted/50">
                      <td className="border border-border px-4 py-2">Indeed</td>
                      <td className="border border-border px-4 py-2">$150-500/tháng</td>
                      <td className="border border-border px-4 py-2">❌ Không</td>
                      <td className="border border-border px-4 py-2">⭐⭐⭐</td>
                      <td className="border border-border px-4 py-2">7/10</td>
                    </tr>
                    <tr>
                      <td className="border border-border px-4 py-2">Craigslist</td>
                      <td className="border border-border px-4 py-2">$5-45</td>
                      <td className="border border-border px-4 py-2">⚠️ Tự post</td>
                      <td className="border border-border px-4 py-2">⭐⭐</td>
                      <td className="border border-border px-4 py-2">5/10</td>
                    </tr>
                    <tr className="bg-muted/50">
                      <td className="border border-border px-4 py-2">Facebook</td>
                      <td className="border border-border px-4 py-2">Miễn phí</td>
                      <td className="border border-border px-4 py-2">✅ Có</td>
                      <td className="border border-border px-4 py-2">⭐⭐⭐</td>
                      <td className="border border-border px-4 py-2">6/10</td>
                    </tr>
                    <tr>
                      <td className="border border-border px-4 py-2">ZipRecruiter</td>
                      <td className="border border-border px-4 py-2">$249-999/tháng</td>
                      <td className="border border-border px-4 py-2">❌ Không</td>
                      <td className="border border-border px-4 py-2">⭐⭐⭐⭐</td>
                      <td className="border border-border px-4 py-2">7.5/10</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h2 className="text-2xl font-semibold mt-8 mb-4">Cách Viết Job Post Hiệu Quả</h2>

              <h3 className="text-xl font-semibold mt-6 mb-3">Tiêu Đề Thu Hút</h3>
              
              <p><strong>❌ Tiêu đề kém:</strong></p>
              <ul className="list-disc pl-6 space-y-1">
                <li>"Cần thợ nail"</li>
                <li>"Hiring nail tech"</li>
                <li>"Tuyển người làm nail"</li>
              </ul>

              <p><strong>✅ Tiêu đề tốt:</strong></p>
              <ul className="list-disc pl-6 space-y-1">
                <li>"🔥 Urgent: Experienced Nail Tech - $1200+/week - Westminster, CA"</li>
                <li>"💎 Premium Salon Hiring - No Sunday - High Tips - Garden Grove"</li>
                <li>"⭐ Busy Salon - Full Training - $800-1000/week - Houston, TX"</li>
              </ul>

              <h3 className="text-xl font-semibold mt-6 mb-3">Nội Dung Chi Tiết</h3>
              
              <p><strong>Thông tin bắt buộc phải có:</strong></p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Vị trí cụ thể:</strong> Địa chỉ, gần landmarks nào</li>
                <li><strong>Mức lương:</strong> Base pay + commission + tips estimate</li>
                <li><strong>Schedule:</strong> Giờ làm việc, ngày nghỉ</li>
                <li><strong>Yêu cầu kỹ năng:</strong> Acrylic, gel, pedicure, nail art...</li>
                <li><strong>Benefits:</strong> Health insurance, vacation, training</li>
                <li><strong>Môi trường làm việc:</strong> Team size, clientele, atmosphere</li>
              </ul>

              <div className="bg-muted/50 p-6 rounded-lg">
                <h4 className="font-semibold mb-3">Mẫu Job Post Hoàn Chỉnh:</h4>
                <div className="text-sm space-y-2">
                  <p><strong>🌟 EXPERIENCED NAIL TECHNICIAN - GARDEN GROVE, CA</strong></p>
                  <p><strong>💰 LƯƠNG: $800-$1,200/tuần (tùy kinh nghiệm)</strong></p>
                  <p><strong>📍 ĐỊA ĐIỂM:</strong> Brookhurst & Westminster (gần 99 Ranch)</p>
                  
                  <p><strong>CHÚNG TÔI CUNG CÁP:</strong></p>
                  <ul className="list-disc pl-4">
                    <li>Lương $15/hour + 50% commission</li>
                    <li>Tips average $80-120/ngày</li>
                    <li>Paid vacation sau 1 năm</li>
                    <li>Health insurance (salon đóng 50%)</li>
                    <li>Supplies 100% salon cung cấp</li>
                  </ul>
                  
                  <p><strong>YÊU CẦU:</strong></p>
                  <ul className="list-disc pl-4">
                    <li>License CA hiệu lực</li>
                    <li>2+ năm kinh nghiệm acrylic & gel</li>
                    <li>Có thể làm pedicure</li>
                    <li>Thái độ friendly với khách</li>
                  </ul>
                  
                  <p><strong>📞 LIÊN HỆ:</strong> (714) 555-0123 - Chị Lan</p>
                </div>
              </div>

              <h3 className="text-xl font-semibold mt-6 mb-3">Tối Ưu Hóa Để Tìm Được Nhân Tài</h3>
              
              <p><strong>1. Sử dụng keywords phù hợp:</strong></p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Nail technician, nail tech, thợ nail</li>
                <li>Acrylic, gel, dip powder, nail art</li>
                <li>Pedicure, manicure</li>
                <li>Tên thành phố và khu vực</li>
              </ul>

              <p><strong>2. Đăng đúng thời điểm:</strong></p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Thứ 2-4:</strong> 9AM-11AM và 2PM-4PM</li>
                <li><strong>Tránh:</strong> Cuối tuần và sau 6PM</li>
                <li><strong>Refresh:</strong> Đăng lại sau 1-2 tuần nếu chưa tìm được</li>
              </ul>

              <p><strong>3. Sử dụng ảnh chất lượng:</strong></p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Ảnh workspace sạch sẽ, chuyên nghiệp</li>
                <li>Ảnh team hiện tại (có consent)</li>
                <li>Ảnh mẫu nail đẹp của salon</li>
                <li>Ảnh storefront để nhận diện</li>
              </ul>

              <h2 className="text-2xl font-semibold mt-8 mb-4">Chiến Lược Multi-Platform</h2>

              <p>
                Đừng chỉ dựa vào một platform. Chiến lược tốt nhất là sử dụng kết hợp:
              </p>

              <div className="space-y-4">
                <div className="border-l-4 border-primary pl-4">
                  <h4 className="font-semibold">Platform chính: EmviApp</h4>
                  <p className="text-sm">Đăng tin chi tiết, professional. Tương tác với ứng viên thường xuyên.</p>
                </div>
                
                <div className="border-l-4 border-primary pl-4">
                  <h4 className="font-semibold">Platform phụ: Facebook Groups</h4>
                  <p className="text-sm">Share quick post, leverage existing network.</p>
                </div>
                
                <div className="border-l-4 border-primary pl-4">
                  <h4 className="font-semibold">Backup: Craigslist</h4>
                  <p className="text-sm">Post đơn giản để cast wider net.</p>
                </div>
                
                <div className="border-l-4 border-primary pl-4">
                  <h4 className="font-semibold">Premium (nếu cần): Indeed</h4>
                  <p className="text-sm">Khi urgent và có budget marketing.</p>
                </div>
              </div>

              <h2 className="text-2xl font-semibold mt-8 mb-4">Metrics Để Theo Dõi</h2>

              <p>
                Để biết platform nào hiệu quả, hãy track các chỉ số sau:
              </p>

              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Views:</strong> Số lượt xem tin đăng</li>
                <li><strong>Applications:</strong> Số ứng viên apply</li>
                <li><strong>Quality applications:</strong> Số ứng viên qualified</li>
                <li><strong>Interview rate:</strong> Tỷ lệ ứng viên được mời interview</li>
                <li><strong>Hire rate:</strong> Tỷ lệ tuyển dụng thành công</li>
                <li><strong>Cost per hire:</strong> Chi phí trung bình cho 1 lần tuyển dụng</li>
                <li><strong>Time to fill:</strong> Thời gian từ post đến hire</li>
              </ul>

              <h2 className="text-2xl font-semibold mt-8 mb-4">Lời Khuyên Từ Chuyên Gia</h2>

              <div className="bg-primary/10 p-6 rounded-lg">
                <p className="font-semibold mb-2">🎯 Bí quyết từ chị Kim Lê - Chủ chuỗi 5 salon tại California:</p>
                <p className="italic">
                  "Sau 12 năm kinh doanh, tôi nhận ra rằng việc tuyển dụng giống như marketing - phải biết target audience. EmviApp giúp tôi tiếp cận đúng đối tượng thợ nail người Việt chất lượng. Từ khi sử dụng, thời gian tuyển dụng giảm từ 3 tháng xuống 3 tuần, và quality ứng viên cao hơn rất nhiều."
                </p>
              </div>

              <div className="bg-muted/50 p-6 rounded-lg mt-4">
                <p className="font-semibold mb-2">💡 Insight từ anh Minh Nguyễn - HR Manager, Golden Nails Corp:</p>
                <p className="italic">
                  "Chúng tôi test 8 platforms khác nhau trong 6 tháng. EmviApp có conversion rate cao nhất (23% vs 8% average), cost per hire thấp nhất ($47 vs $180 average), và quan trọng nhất là retention rate của nhân viên tuyển từ EmviApp cao gấp đôi so với platforms khác."
                </p>
              </div>

              <h2 className="text-2xl font-semibold mt-8 mb-4">Xu Hướng Tương Lai</h2>

              <p>
                Ngành tuyển dụng nail đang chuyển đổi số mạnh mẽ:
              </p>

              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Video interviews:</strong> Pre-screening qua video call trước khi gặp trực tiếp</li>
                <li><strong>Skill assessment online:</strong> Test kỹ năng qua platform</li>
                <li><strong>AI matching:</strong> Hệ thống tự động match ưng viên phù hợp</li>
                <li><strong>Mobile-first:</strong> Hầu hết interaction sẽ diễn ra trên mobile</li>
                <li><strong>Community-driven:</strong> Đánh giá và review từ cộng đồng</li>
              </ul>

              <p>
                <Link to="/artists" className="text-primary hover:underline">EmviApp</Link> đang dẫn đầu các xu hướng này với việc tích hợp AI matching và community reviews, giúp process tuyển dụng trở nên thông minh và hiệu quả hơn.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">Kết Luận</h2>

              <p>
                Việc chọn đúng platform đăng tin tuyển dụng có thể tiết kiệm hàng nghìn đô la và hàng tháng thời gian cho doanh nghiệp của bạn. Trong khi mỗi platform đều có ưu nhược điểm riêng, EmviApp nổi bật như là giải pháp tối ưu nhất cho cộng đồng nail Việt Nam với chi phí thấp, chất lượng cao và sự hiểu biết sâu sắc về ngành.
              </p>

              <p>
                Hãy nhớ rằng, tuyển dụng thành công không chỉ là về platform mà còn về cách bạn present cơ hội và build relationship với ứng viên. Đầu tư thời gian vào việc viết job post chi tiết và tương tác chân thành với ứng viên sẽ mang lại kết quả tốt nhất.
              </p>

              <div className="bg-primary/10 p-6 rounded-lg mt-8">
                <p className="text-lg font-semibold text-center text-primary mb-4">
                  👨‍💼 Sẵn sàng tuyển dụng nhân tài?
                </p>
                <p className="text-center">
                  👉 <strong>Đăng ký miễn phí ngay hôm nay trên EmviApp để tìm việc, tuyển thợ, hoặc đăng bán tiệm nail của bạn.</strong> Với cơ sở dữ liệu lớn nhất và hệ thống matching thông minh, chúng tôi sẽ giúp bạn tìm được nhân tài phù hợp chỉ trong vài tuần!
                </p>
                <div className="text-center mt-4">
                  <Link 
                    to="/jobs" 
                    className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                  >
                    Đăng Tin Tuyển Dụng
                  </Link>
                </div>
              </div>
            </div>
          </article>
        </div>
      </main>
    </>
  );
};

export default Top5WebsiteDangTinTuyenThoNail;