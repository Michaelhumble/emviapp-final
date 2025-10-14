import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { Heart, Users, Globe, Star, TrendingUp, ArrowRight, Award, Handshake } from 'lucide-react';

const EmviAppCongDongNguoiVietTrongNganhLamDep = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "EmviApp: Cộng Đồng Người Việt Trong Ngành Làm Đẹp",
    "description": "Khám phá EmviApp - nền tảng kết nối cộng đồng người Việt trong ngành làm đẹp tại Mỹ. Hơn 15,000 thành viên đang xây dựng sự nghiệp thành công.",
    "image": "https://emvi.app/og-vietnamese-beauty-community.jpg",
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
        "url": "https://www.emvi.app/icons/emvi-master-512.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://www.emvi.app/blog/emviapp-cong-dong-nguoi-viet-trong-nganh-lam-dep"
    }
  };

  return (
    <>
      <Helmet>
        <title>EmviApp: Cộng Đồng Người Việt Trong Ngành Làm Đẹp | EmviApp Blog</title>
        <meta name="description" content="Khám phá EmviApp - nền tảng kết nối cộng đồng người Việt trong ngành làm đẹp tại Mỹ. Hơn 15,000 thành viên đang xây dựng sự nghiệp thành công." />
        <link rel="canonical" href="https://emvi.app/blog/emviapp-cong-dong-nguoi-viet-trong-nganh-lam-dep" />
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
              <span>Cộng Đồng</span>
            </div>

            {/* Article Header */}
            <div className="mb-12">
              <div className="flex items-center gap-4 mb-6">
                <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                  CỘNG ĐỒNG
                </span>
                <span className="text-gray-500">16 phút đọc</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-playfair font-bold mb-6 leading-tight">
                EmviApp: Cộng Đồng Người Việt Trong Ngành Làm Đẹp
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Khám phá EmviApp - nền tảng kết nối cộng đồng người Việt trong ngành làm đẹp tại Mỹ. Hơn 15,000 thành viên đang xây dựng sự nghiệp thành công.
              </p>
              
              <div className="flex items-center gap-6 text-sm text-gray-500">
                <span>Bởi EmviApp Team</span>
                <span>21 Tháng 1, 2025</span>
              </div>
            </div>

            {/* Article Content */}
            <div className="prose prose-lg max-w-none">
              <div className="bg-purple-50 border-l-4 border-purple-500 p-6 mb-8">
                <p className="text-purple-800 font-semibold mb-2">🌟 Điều Đặc Biệt</p>
                <p className="text-purple-700">EmviApp không chỉ là nền tảng tuyển dụng - đây là "ngôi nhà chung" của cộng đồng người Việt trong ngành làm đẹp tại Mỹ!</p>
              </div>

              <h2 className="text-3xl font-bold mt-12 mb-6">Câu Chuyện Ra Đời EmviApp</h2>
              
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-xl mb-8">
                <p className="text-lg leading-relaxed mb-6">
                  Năm 2024, khi nhìn thấy hàng nghìn nail techs và beauty professionals người Việt đang gặp khó khăn trong việc tìm kiếm cơ hội việc làm tốt, team EmviApp đã quyết tâm tạo ra một nền tảng <strong>được thiết kế riêng cho cộng đồng người Việt</strong>.
                </p>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-white p-4 rounded-lg text-center">
                    <Heart className="h-12 w-12 text-red-500 mx-auto mb-3" />
                    <h4 className="font-semibold mb-2">Tình Cảm</h4>
                    <p className="text-sm text-gray-600">Hiểu văn hóa và cách sống của người Việt</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg text-center">
                    <Handshake className="h-12 w-12 text-blue-500 mx-auto mb-3" />
                    <h4 className="font-semibold mb-2">Kết Nối</h4>
                    <p className="text-sm text-gray-600">Xây dựng network mạnh mẽ trong cộng đồng</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg text-center">
                    <TrendingUp className="h-12 w-12 text-green-500 mx-auto mb-3" />
                    <h4 className="font-semibold mb-2">Thành Công</h4>
                    <p className="text-sm text-gray-600">Giúp mọi người phát triển sự nghiệp</p>
                  </div>
                </div>
              </div>

              <h2 className="text-3xl font-bold mt-12 mb-6">Cộng Đồng EmviApp Trong Số Liệu</h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl shadow-lg text-center border-2 border-purple-100">
                  <div className="text-3xl font-bold text-purple-600 mb-2">15,000+</div>
                  <div className="text-sm text-gray-600">Nail Techs & Beauty Pros</div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-lg text-center border-2 border-blue-100">
                  <div className="text-3xl font-bold text-blue-600 mb-2">2,800+</div>
                  <div className="text-sm text-gray-600">Salon Owners</div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-lg text-center border-2 border-green-100">
                  <div className="text-3xl font-bold text-green-600 mb-2">50</div>
                  <div className="text-sm text-gray-600">States Có Mặt</div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-lg text-center border-2 border-orange-100">
                  <div className="text-3xl font-bold text-orange-600 mb-2">89%</div>
                  <div className="text-sm text-gray-600">Success Rate</div>
                </div>
              </div>

              <h2 className="text-3xl font-bold mt-12 mb-6">Những Điều Làm Nên Sự Khác Biệt</h2>
              
              <div className="space-y-6 mb-8">
                <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-red-500">
                  <h4 className="font-bold text-lg mb-3 text-red-800">Vietnamese-First Approach</h4>
                  <p className="text-gray-700 mb-3">EmviApp được xây dựng với mindset "người Việt hiểu người Việt". Từ giao diện, ngôn ngữ đến cách thức hoạt động - tất cả đều phù hợp với văn hóa và thói quen của cộng đồng.</p>
                  <ul className="text-sm space-y-1 text-gray-600">
                    <li>• Hỗ trợ tiếng Việt 24/7</li>
                    <li>• Hiểu rõ work culture của nail salons người Việt</li>
                    <li>• Payment terms và negotiations theo kiểu Việt Nam</li>
                  </ul>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-blue-500">
                  <h4 className="font-bold text-lg mb-3 text-blue-800">🤝 Community-Driven Features</h4>
                  <p className="text-gray-700 mb-3">Không chỉ là platform tuyển dụng, EmviApp tạo ra không gian để cộng đồng tương tác, chia sẻ kinh nghiệm và hỗ trợ lẫn nhau.</p>
                  <ul className="text-sm space-y-1 text-gray-600">
                    <li>• Reviews và ratings từ chính cộng đồng</li>
                    <li>• Tips & tricks được chia sẻ bởi experts</li>
                    <li>• Success stories để inspire nhau</li>
                  </ul>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-green-500">
                  <h4 className="font-bold text-lg mb-3 text-green-800">🎯 Specialized for Beauty Industry</h4>
                  <p className="text-gray-700 mb-3">Khác với các platform tổng quát, EmviApp focus 100% vào beauty industry với deep understanding về skill sets, requirements và market dynamics.</p>
                  <ul className="text-sm space-y-1 text-gray-600">
                    <li>• AI matching dựa trên beauty skills cụ thể</li>
                    <li>• Salary benchmarks cho từng specialty</li>
                    <li>• Industry trends và market insights</li>
                  </ul>
                </div>
              </div>

              <h2 className="text-3xl font-bold mt-12 mb-6">Success Stories Từ Cộng Đồng</h2>
              
              <div className="space-y-6 mb-8">
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200">
                  <div className="flex items-start gap-4">
                    <div className="bg-purple-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold">HT</div>
                    <div className="flex-1">
                      <h4 className="font-bold text-lg mb-2">Chị Hương Trần - Nail Tech, California</h4>
                      <p className="text-gray-700 italic mb-3">
                        "Tôi đã tìm việc mài mỏi 3 tháng trên Indeed mà không có kết quả. Chỉ sau 2 ngày đăng ký EmviApp, tôi đã có 5 offers và chọn được salon mơ ước với lương $1,600/tuần!"
                      </p>
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <strong>Trước EmviApp:</strong> Unemployed 3 tháng
                        </div>
                        <div>
                          <strong>Sau EmviApp:</strong> $1,600/tuần + benefits
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-xl border border-blue-200">
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold">ML</div>
                    <div className="flex-1">
                      <h4 className="font-bold text-lg mb-2">Chị Mai Lê - Salon Owner, Texas</h4>
                      <p className="text-gray-700 italic mb-3">
                        "Salon tôi thiếu nhân viên suốt 6 tháng. Đăng tin trên EmviApp được 1 tuần đã tuyển được 3 thợ giỏi. Giờ salon full booking và revenue tăng 40%!"
                      </p>
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <strong>Vấn đề:</strong> Thiếu nhân viên 6 tháng
                        </div>
                        <div>
                          <strong>Kết quả:</strong> +3 techs, revenue +40%
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
                  <div className="flex items-start gap-4">
                    <div className="bg-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold">PN</div>
                    <div className="flex-1">
                      <h4 className="font-bold text-lg mb-2">Anh Phúc Nguyễn - Hair Stylist, New York</h4>
                      <p className="text-gray-700 italic mb-3">
                        "Từ một thợ cắt tóc bình thường, qua network trong EmviApp, tôi đã học được nhiều skills mới và giờ đã mở salon riêng với 8 nhân viên!"
                      </p>
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <strong>Bắt đầu:</strong> Hair stylist làm thuê
                        </div>
                        <div>
                          <strong>Hiện tại:</strong> Salon owner, 8 employees
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <h2 className="text-3xl font-bold mt-12 mb-6">Các Hoạt Động Cộng Đồng</h2>
              
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl shadow-lg">
                  <Award className="h-10 w-10 text-yellow-500 mb-4" />
                  <h4 className="font-bold text-lg mb-3">Monthly Awards</h4>
                  <p className="text-gray-700 text-sm mb-4">Vinh danh những thành viên xuất sắc nhất mỗi tháng trong các hạng mục:</p>
                  <ul className="text-sm space-y-1 text-gray-600">
                    <li>• Top Performer Nail Tech</li>
                    <li>• Best New Salon</li>
                    <li>• Community Helper of the Month</li>
                    <li>• Innovation Award</li>
                  </ul>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-lg">
                  <Users className="h-10 w-10 text-purple-500 mb-4" />
                  <h4 className="font-bold text-lg mb-3">Networking Events</h4>
                  <p className="text-gray-700 text-sm mb-4">Tổ chức events offline để cộng đồng gặp mặt trực tiếp:</p>
                  <ul className="text-sm space-y-1 text-gray-600">
                    <li>• Quarterly meetups tại các thành phố lớn</li>
                    <li>• Beauty workshops & training sessions</li>
                    <li>• Job fairs và recruitment events</li>
                    <li>• Celebration parties</li>
                  </ul>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-lg">
                  <Globe className="h-10 w-10 text-blue-500 mb-4" />
                  <h4 className="font-bold text-lg mb-3">Knowledge Sharing</h4>
                  <p className="text-gray-700 text-sm mb-4">Platform học hỏi và chia sẻ kiến thức trong cộng đồng:</p>
                  <ul className="text-sm space-y-1 text-gray-600">
                    <li>• Tutorial videos từ master techs</li>
                    <li>• Business tips cho salon owners</li>
                    <li>• Market trends và industry updates</li>
                    <li>• Q&A sessions với experts</li>
                  </ul>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-lg">
                  <Star className="h-10 w-10 text-orange-500 mb-4" />
                  <h4 className="font-bold text-lg mb-3">Mentorship Program</h4>
                  <p className="text-gray-700 text-sm mb-4">Kết nối newbies với experienced professionals:</p>
                  <ul className="text-sm space-y-1 text-gray-600">
                    <li>• 1-on-1 mentoring cho beginners</li>
                    <li>• Career guidance và planning</li>
                    <li>• Business development support</li>
                    <li>• Personal branding assistance</li>
                  </ul>
                </div>
              </div>

              <h2 className="text-3xl font-bold mt-12 mb-6">Tương Lai Của EmviApp Community</h2>
              
              <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-8 rounded-xl mb-8">
                <h3 className="font-bold text-xl mb-4 text-purple-800">🚀 Roadmap 2025-2026:</h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3 text-purple-700">Q1 2025:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Mobile app launch</li>
                      <li>• AI-powered career counseling</li>
                      <li>• Certification programs</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3 text-purple-700">Q2-Q4 2025:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Franchise opportunities</li>
                      <li>• International expansion</li>
                      <li>• Beauty supply marketplace</li>
                    </ul>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-white rounded-lg">
                  <p className="text-sm text-gray-700">
                    <strong>Mục tiêu:</strong> Trở thành "LinkedIn của ngành làm đẹp" cho cộng đồng người Việt toàn cầu với 50,000+ thành viên vào cuối 2025.
                  </p>
                </div>
              </div>

              <h2 className="text-3xl font-bold mt-12 mb-6">Tham Gia Cộng Đồng EmviApp</h2>
              
              <div className="bg-white p-8 rounded-xl shadow-lg mb-8 border border-gray-200">
                <h3 className="font-bold text-xl mb-6 text-center">🌟 Bạn Có Thể Tham Gia Với Vai Trò:</h3>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="h-8 w-8 text-purple-600" />
                    </div>
                    <h4 className="font-semibold mb-2">Nail Tech / Artist</h4>
                    <p className="text-sm text-gray-600">Tìm việc, networking, career development</p>
                    <Link to="/jobs" className="text-purple-600 text-xs hover:underline">Tìm việc ngay →</Link>
                  </div>
                  
                  <div className="text-center">
                    <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Award className="h-8 w-8 text-blue-600" />
                    </div>
                    <h4 className="font-semibold mb-2">Salon Owner</h4>
                    <p className="text-sm text-gray-600">Tuyển dụng, quản lý, business growth</p>
                    <Link to="/salons" className="text-purple-600 text-xs hover:underline">Đăng tin tuyển dụng →</Link>
                  </div>
                  
                  <div className="text-center">
                    <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Handshake className="h-8 w-8 text-green-600" />
                    </div>
                    <h4 className="font-semibold mb-2">Community Helper</h4>
                    <p className="text-sm text-gray-600">Mentor, share knowledge, support others</p>
                    <Link to="/artists" className="text-purple-600 text-xs hover:underline">Kết nối cộng đồng →</Link>
                  </div>
                </div>
              </div>

              <p>Để trở thành một phần của cộng đồng EmviApp, hãy khám phá <Link to="/jobs" className="text-purple-600 hover:underline">cơ hội việc làm</Link>, <Link to="/salons" className="text-purple-600 hover:underline">các salon đối tác</Link>, và <Link to="/artists" className="text-purple-600 hover:underline">kết nối với các chuyên gia</Link> khác.</p>
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-8 text-center text-white mt-12">
              <Heart className="h-16 w-16 mx-auto mb-4 opacity-90" />
              <h3 className="text-2xl font-bold mb-4">Tham Gia Cộng Đồng EmviApp Ngay Hôm Nay!</h3>
              <p className="text-lg mb-6 opacity-90">
                Kết nối với 15,000+ người Việt trong ngành làm đẹp và xây dựng sự nghiệp thành công cùng nhau
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" variant="secondary">
                  <Link to="/register">
                    Đăng Ký Miễn Phí
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600">
                  <Link to="/jobs">
                    Khám Phá Cơ Hội
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

export default EmviAppCongDongNguoiVietTrongNganhLamDep;