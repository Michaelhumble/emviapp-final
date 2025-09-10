import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { Star, Globe, Shield, Users, Zap, ArrowRight, Award } from 'lucide-react';

const Top5WebsiteUyTinChoNguoiVietDangTinTuyenDung = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Top 5 Website Uy Tín Cho Người Việt Đăng Tin Tuyển Dụng",
    "description": "Khám phá 5 website tuyển dụng uy tín nhất cho người Việt tại Mỹ. So sánh chi tiết phí, tính năng và hiệu quả tuyển dụng từng platform.",
    "image": "https://emvi.app/og-recruitment-websites.jpg", 
    "datePublished": "2025-01-21",
    "dateModified": "2025-01-21",
    "author": {
      "@type": "Person",
      "name": "EmviApp Team"
    },
    "publisher": {
      "@type": "Organization",
      "name": "EmviApp",
      "logo": {
        "@type": "ImageObject",
        "url": "https://emvi.app/icons/emvi-master-512.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://emvi.app/blog/top-5-website-uy-tin-cho-nguoi-viet-dang-tin-tuyen-dung"
    }
  };

  return (
    <>
      <Helmet>
        <title>Top 5 Website Uy Tín Cho Người Việt Đăng Tin Tuyển Dụng | EmviApp Blog</title>
        <meta name="description" content="Khám phá 5 website tuyển dụng uy tín nhất cho người Việt tại Mỹ. So sánh chi tiết phí, tính năng và hiệu quả tuyển dụng từng platform." />
        <link rel="canonical" href="https://emvi.app/blog/top-5-website-uy-tin-cho-nguoi-viet-dang-tin-tuyen-dung" />
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      </Helmet>
      
      <article className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50/30">
        <Container className="py-20">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-8">
              <Link to="/blog" className="hover:text-purple-600">Blog</Link>
              <span>/</span>
              <span>Tuyển Dụng</span>
            </div>

            {/* Article Header */}
            <div className="mb-12">
              <div className="flex items-center gap-4 mb-6">
                <span className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                  TOP RANKING
                </span>
                <span className="text-gray-500">18 phút đọc</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-playfair font-bold mb-6 leading-tight">
                Top 5 Website Uy Tín Cho Người Việt Đăng Tin Tuyển Dụng
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Khám phá 5 website tuyển dụng uy tín nhất cho người Việt tại Mỹ. So sánh chi tiết phí, tính năng và hiệu quả tuyển dụng từng platform.
              </p>
              
              <div className="flex items-center gap-6 text-sm text-gray-500">
                <span>Bởi EmviApp Team</span>
                <span>21 Tháng 1, 2025</span>
              </div>
            </div>

            {/* Article Content */}
            <div className="prose prose-lg max-w-none">
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 mb-8">
                <p className="text-yellow-800 font-semibold mb-2">🏆 Kết Quả Khảo Sát</p>
                <p className="text-yellow-700">Dựa trên phản hồi của 2,500+ chủ salon người Việt về hiệu quả tuyển dụng trong năm 2024-2025.</p>
              </div>

              <h2 className="text-3xl font-bold mt-12 mb-6">#1 EmviApp - Chuyên Ngành Beauty</h2>
              
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-8 rounded-xl mb-8 border-2 border-purple-200">
                <div className="flex items-start gap-6">
                  <div className="bg-purple-600 text-white rounded-full p-3">
                    <Award className="h-8 w-8" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-4 text-purple-800">⭐ Xếp hạng #1 cho Beauty Industry</h3>
                    
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <h4 className="font-semibold mb-2 text-purple-700">✅ Ưu Điểm:</h4>
                        <ul className="space-y-1 text-sm">
                          <li>• Miễn phí 100% đăng tin tuyển dụng</li>
                          <li>• 15,000+ nail techs người Việt active</li>
                          <li>• AI matching ứng viên phù hợp</li>
                          <li>• Hỗ trợ tiếng Việt 24/7</li>
                          <li>• Thời gian hire trung bình: 5 ngày</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2 text-purple-700">📊 Số Liệu:</h4>
                        <ul className="space-y-1 text-sm">
                          <li>• Success rate: <strong>89%</strong></li>
                          <li>• Quality score: <strong>9.2/10</strong></li>
                          <li>• Response time: <strong>2 giờ</strong></li>
                          <li>• Cost per hire: <strong>$0</strong></li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg">
                      <p className="text-sm italic text-gray-600">
                        "EmviApp giúp tôi tuyển được 3 nail techs giỏi trong 1 tuần. Miễn phí 100% mà chất lượng ứng viên rất cao." 
                        <span className="font-semibold">- Chị Mai, chủ salon ở Texas</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <h2 className="text-3xl font-bold mt-12 mb-6">#2 Indeed - Platform Lớn Nhất</h2>
              
              <div className="bg-white p-8 rounded-xl shadow-lg mb-8 border border-gray-200">
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3 text-blue-700">💰 Chi Phí:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Free posting: Limited visibility</li>
                      <li>• Sponsored: $3-8/click</li>
                      <li>• Premium: $300-500/tháng</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3 text-green-700">✅ Ưu Điểm:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Số lượng ứng viên lớn</li>
                      <li>• Brand awareness cao</li>
                      <li>• Công cụ filter tốt</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3 text-red-700">❌ Nhược Điểm:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Không chuyên beauty</li>
                      <li>• Cạnh tranh cao</li>
                      <li>• Nhiều ứng viên không phù hợp</li>
                    </ul>
                  </div>
                </div>
              </div>

              <h2 className="text-3xl font-bold mt-12 mb-6">#3 Facebook Jobs & Groups</h2>
              
              <div className="bg-white p-8 rounded-xl shadow-lg mb-8 border border-gray-200">
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3 text-blue-700">📱 Cách Thức:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Facebook Jobs (miễn phí)</li>
                      <li>• Groups người Việt</li>
                      <li>• Facebook Ads</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3 text-green-700">✅ Ưu Điểm:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Kết nối cộng đồng mạnh</li>
                      <li>• Nhiều groups người Việt</li>
                      <li>• Chi phí thấp</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3 text-red-700">❌ Nhược Điểm:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Khó quản lý ứng viên</li>
                      <li>• Spam nhiều</li>
                      <li>• Không professional</li>
                    </ul>
                  </div>
                </div>
              </div>

              <h2 className="text-3xl font-bold mt-12 mb-6">#4 Craigslist - Local Platform</h2>
              
              <div className="bg-white p-8 rounded-xl shadow-lg mb-8 border border-gray-200">
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3 text-blue-700">💵 Chi Phí:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• $5/post trong 30 ngày</li>
                      <li>• Renewal: $5/30 ngày</li>
                      <li>• Rất cost-effective</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3 text-green-700">✅ Ưu Điểm:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Rẻ nhất thị trường</li>
                      <li>• Local targeting tốt</li>
                      <li>• Setup nhanh chóng</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3 text-red-700">❌ Nhược Điểm:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Giao diện cũ kỹ</li>
                      <li>• Nhiều scam</li>
                      <li>• Không có screening tools</li>
                    </ul>
                  </div>
                </div>
              </div>

              <h2 className="text-3xl font-bold mt-12 mb-6">#5 LinkedIn - Professional Network</h2>
              
              <div className="bg-white p-8 rounded-xl shadow-lg mb-8 border border-gray-200">
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3 text-blue-700">💰 Pricing:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Job slots: $495/tháng</li>
                      <li>• Recruiter Lite: $140/tháng</li>
                      <li>• Premium: $800+/tháng</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3 text-green-700">✅ Ưu Điểm:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Ứng viên chất lượng cao</li>
                      <li>• Professional network</li>
                      <li>• Advanced filtering</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3 text-red-700">❌ Nhược Điểm:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Đắt nhất thị trường</li>
                      <li>• Ít nail techs</li>
                      <li>• Phức tạp setup</li>
                    </ul>
                  </div>
                </div>
              </div>

              <h2 className="text-3xl font-bold mt-12 mb-6">Bảng So Sánh Tổng Thể</h2>
              
              <div className="overflow-x-auto mb-8">
                <table className="w-full bg-white rounded-lg overflow-hidden shadow-lg text-sm">
                  <thead className="bg-purple-600 text-white">
                    <tr>
                      <th className="px-4 py-3 text-left">Platform</th>
                      <th className="px-4 py-3 text-center">Chi Phí</th>
                      <th className="px-4 py-3 text-center">Beauty Focus</th>
                      <th className="px-4 py-3 text-center">Người Việt</th>
                      <th className="px-4 py-3 text-center">Success Rate</th>
                      <th className="px-4 py-3 text-center">Rating</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b bg-green-50">
                      <td className="px-4 py-3 font-semibold">
                        <Link to="/jobs" className="text-purple-600 hover:underline">EmviApp</Link>
                      </td>
                      <td className="px-4 py-3 text-center text-green-600">FREE</td>
                      <td className="px-4 py-3 text-center">⭐⭐⭐⭐⭐</td>
                      <td className="px-4 py-3 text-center">⭐⭐⭐⭐⭐</td>
                      <td className="px-4 py-3 text-center">89%</td>
                      <td className="px-4 py-3 text-center font-bold text-green-600">9.2/10</td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-4 py-3">Indeed</td>
                      <td className="px-4 py-3 text-center">$3-8/click</td>
                      <td className="px-4 py-3 text-center">⭐⭐</td>
                      <td className="px-4 py-3 text-center">⭐⭐</td>
                      <td className="px-4 py-3 text-center">65%</td>
                      <td className="px-4 py-3 text-center">7.5/10</td>
                    </tr>
                    <tr className="border-b bg-gray-50">
                      <td className="px-4 py-3">Facebook</td>
                      <td className="px-4 py-3 text-center">$0-50</td>
                      <td className="px-4 py-3 text-center">⭐⭐⭐</td>
                      <td className="px-4 py-3 text-center">⭐⭐⭐⭐</td>
                      <td className="px-4 py-3 text-center">58%</td>
                      <td className="px-4 py-3 text-center">6.8/10</td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-4 py-3">Craigslist</td>
                      <td className="px-4 py-3 text-center">$5/30d</td>
                      <td className="px-4 py-3 text-center">⭐</td>
                      <td className="px-4 py-3 text-center">⭐⭐</td>
                      <td className="px-4 py-3 text-center">45%</td>
                      <td className="px-4 py-3 text-center">5.5/10</td>
                    </tr>
                    <tr className="border-b bg-gray-50">
                      <td className="px-4 py-3">LinkedIn</td>
                      <td className="px-4 py-3 text-center">$495+</td>
                      <td className="px-4 py-3 text-center">⭐</td>
                      <td className="px-4 py-3 text-center">⭐⭐</td>
                      <td className="px-4 py-3 text-center">72%</td>
                      <td className="px-4 py-3 text-center">7.8/10</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h2 className="text-3xl font-bold mt-12 mb-6">Khuyến Nghị Cho Từng Loại Salon</h2>
              
              <div className="space-y-6 mb-8">
                <div className="bg-blue-50 p-6 rounded-xl border-l-4 border-blue-500">
                  <h4 className="font-bold text-lg mb-3">🏢 Salon Lớn (10+ nhân viên):</h4>
                  <p className="mb-2">• <Link to="/jobs" className="text-purple-600 hover:underline">EmviApp</Link> + Indeed (sponsored posts)</p>
                  <p className="text-sm text-gray-600">Budget: $0-300/tháng | Expected hires: 3-5/tháng</p>
                </div>

                <div className="bg-green-50 p-6 rounded-xl border-l-4 border-green-500">
                  <h4 className="font-bold text-lg mb-3">🏪 Salon Trung Bình (5-10 nhân viên):</h4>
                  <p className="mb-2">• <Link to="/jobs" className="text-purple-600 hover:underline">EmviApp</Link> + Facebook Groups</p>
                  <p className="text-sm text-gray-600">Budget: $0-100/tháng | Expected hires: 2-3/tháng</p>
                </div>

                <div className="bg-yellow-50 p-6 rounded-xl border-l-4 border-yellow-500">
                  <h4 className="font-bold text-lg mb-3">🏠 Salon Nhỏ (2-4 nhân viên):</h4>
                  <p className="mb-2">• <Link to="/jobs" className="text-purple-600 hover:underline">EmviApp</Link> + Craigslist</p>
                  <p className="text-sm text-gray-600">Budget: $0-50/tháng | Expected hires: 1-2/tháng</p>
                </div>
              </div>

              <p>Để tối ưu hóa quy trình tuyển dụng, hãy tham khảo thêm <Link to="/salons" className="text-purple-600 hover:underline">danh sách salon đang tuyển dụng</Link> và <Link to="/artists" className="text-purple-600 hover:underline">network với các nail artists</Link>.</p>
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-8 text-center text-white mt-12">
              <Users className="h-16 w-16 mx-auto mb-4 opacity-90" />
              <h3 className="text-2xl font-bold mb-4">Bắt Đầu Tuyển Dụng Hiệu Quả Ngay Hôm Nay</h3>
              <p className="text-lg mb-6 opacity-90">
                Đăng tin tuyển dụng MIỄN PHÍ và kết nối với 15,000+ nail techs người Việt chất lượng
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" variant="secondary">
                  <Link to="/jobs">
                    Đăng Tin Tuyển Dụng Ngay
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600">
                  <Link to="/register">
                    Tạo Tài Khoản Miễn Phí
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </article>
    </>
  );
};

export default Top5WebsiteUyTinChoNguoiVietDangTinTuyenDung;