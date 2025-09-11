import React from 'react';
import BlogSEO from '@/components/seo/BlogSEO';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { MapPin, DollarSign, Clock, Users, Briefcase, Star } from 'lucide-react';

const ViecLamThoNailLuongCaoTaiMy = () => {
  const blogPost = {
    title: 'Việc Làm Thợ Nail Lương Cao Tại Mỹ - Bí Quyết Tìm Việc Nhanh',
    slug: 'viec-lam-tho-nail-luong-cao-tai-my',
    description: 'Khám phá cách tìm việc làm thợ nail lương cao tại Mỹ. Bí quyết từ cộng đồng người Việt với mức lương $800-1500/tuần. Hướng dẫn chi tiết từ A-Z.',
    author: 'Chị Mai Nguyễn - 15 năm kinh nghiệm',
    publishedDate: '2025-01-22',
    modifiedDate: '2025-01-22',
    category: 'Việc Làm Nail',
    tags: ['việc làm thợ nail', 'nail tech jobs', 'lương cao', 'tìm việc nhanh', 'người việt tại mỹ'],
    readingTime: 8
  };

  return (
    <>
      <BlogSEO post={blogPost} />
      
      <article className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <header className="mb-8">
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="secondary" className="bg-purple-100 text-purple-800">
              <Briefcase className="w-3 h-3 mr-1" />
              Việc Làm Nail
            </Badge>
            <Badge variant="outline" className="text-green-700 border-green-200">
              <DollarSign className="w-3 h-3 mr-1" />
              Lương Cao
            </Badge>
            <Badge variant="outline" className="text-blue-700 border-blue-200">
              <Clock className="w-3 h-3 mr-1" />
              {blogPost.readingTime} phút đọc
            </Badge>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
            Việc Làm Thợ Nail Lương Cao Tại Mỹ - Bí Quyết Tìm Việc Nhanh
          </h1>
          
          <div className="flex items-center gap-4 text-sm text-gray-600 mb-6">
            <span>Bởi {blogPost.author}</span>
            <span>•</span>
            <span>{new Date(blogPost.publishedDate).toLocaleDateString('vi-VN')}</span>
          </div>
          
          <p className="text-xl text-gray-700 leading-relaxed">
            Câu chuyện này tôi kể từ trái tim của một người đã đi hết con đường từ thợ mới vào nghề đến việc sở hữu 3 tiệm nail ở California. 
            Nếu bạn đang tìm <strong>việc làm thợ nail lương cao</strong>, hãy nghe tôi chia sẻ những bí quyết thực tế nhất.
          </p>
        </header>

        {/* Main Content */}
        <div className="prose prose-lg max-w-none">
          {/* Introduction Story */}
          <Card className="mb-8 bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold text-purple-900 mb-4">Câu Chuyện Thật Từ Cộng Đồng</h2>
              <p className="text-gray-700 mb-4">
                Chị Linh, 34 tuổi, từ Houston bảo tôi: "Em ơi, 5 năm trước em mới qua Mỹ, không biết tiếng Anh, chỉ có $200 trong túi. 
                Giờ em làm thợ nail được $1,200/tuần, có nhà riêng ở Sugar Land. Bí quyết? Biết cách tìm việc đúng chỗ, đúng lúc."
              </p>
              <p className="text-purple-800 font-semibold">
                Đó chính là lý do tôi viết bài này - để chia sẻ những kinh nghiệm thực tế từ cộng đồng người Việt làm nail tại Mỹ.
              </p>
            </CardContent>
          </Card>

          {/* Salary Statistics */}
          <section className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Mức Lương Thợ Nail Thực Tế Tại Mỹ 2025</h2>
            
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <Card className="text-center">
                <CardContent className="p-6">
                  <DollarSign className="w-12 h-12 text-green-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Thợ Mới</h3>
                  <p className="text-2xl font-bold text-green-600 mb-2">$600-800</p>
                  <p className="text-sm text-gray-600">mỗi tuần</p>
                </CardContent>
              </Card>
              
              <Card className="text-center border-2 border-purple-300">
                <CardContent className="p-6">
                  <Star className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Thợ Giỏi</h3>
                  <p className="text-2xl font-bold text-purple-600 mb-2">$1,000-1,300</p>
                  <p className="text-sm text-gray-600">mỗi tuần</p>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardContent className="p-6">
                  <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Thợ Chủ</h3>
                  <p className="text-2xl font-bold text-blue-600 mb-2">$1,500+</p>
                  <p className="text-sm text-gray-600">mỗi tuần</p>
                </CardContent>
              </Card>
            </div>
            
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-6">
              <h4 className="font-bold text-lg mb-3 text-yellow-800">💡 Tip Từ Kinh Nghiệm Thực Tế</h4>
              <p className="text-gray-700">
                "Ở Texas, California, New York - những bang có nhiều người Việt - mức lương cao hơn 20-30% so với trung bình toàn quốc. 
                Lý do? Cộng đồng mạnh, khách hàng trung thành, và chúng ta hiểu nhau!" - Anh Tuấn, chủ 5 tiệm nail ở Dallas.
              </p>
            </div>
          </section>

          {/* Job Search Strategies */}
          <section className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">7 Bí Quyết Tìm Việc Làm Thợ Nail Lương Cao</h2>
            
            <div className="space-y-6">
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">1. Tận Dụng Mạng Lưới Cộng Đồng Người Việt</h3>
                  <p className="text-gray-700 mb-4">
                    Đây là "vũ khí bí mật" của chúng ta. Hơn 80% việc làm thợ nail lương cao không bao giờ được đăng công khai - 
                    chúng được truyền miệng trong cộng đồng người Việt.
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-gray-600">
                    <li>Tham gia các group Facebook của người Việt tại thành phố bạn ở</li>
                    <li>Đến chùa, hội đồng hương vào cuối tuần để networking</li>
                    <li>Kết bạn với các chị em đã lâu năm trong nghề</li>
                    <li>Sử dụng <Link to="/jobs" className="text-purple-600 hover:underline font-semibold">EmviApp để kết nối trực tiếp với chủ salon</Link></li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">2. Thời Điểm Vàng Để Tìm Việc</h3>
                  <p className="text-gray-700 mb-4">
                    Biết timing là biết tiền! Chị Hoa ở Garden Grove chia sẻ: "Mình luôn tìm việc vào tháng 2-3 và tháng 9-10. 
                    Đó là lúc các salon chuẩn bị cho mùa cao điểm."
                  </p>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">Thời điểm tốt nhất:</h4>
                    <ul className="text-green-700 space-y-1">
                      <li>• Tháng 2-3: Chuẩn bị mùa cưới và tốt nghiệp</li>
                      <li>• Tháng 9-10: Chuẩn bị mùa lễ hội cuối năm</li>
                      <li>• Thứ 2-3 hàng tuần: Chủ salon ít bận, dễ phỏng vấn</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">3. Kỹ Năng "Vàng" Giúp Bạn Đàm Phán Lương Cao</h3>
                  <p className="text-gray-700 mb-4">
                    "Em biết làm dip powder và gel-x thì em có thể đòi $50-80 commission cao hơn người khác" - Anh Long, manager 
                    tại một salon high-end ở Westminster.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-purple-800 mb-2">Kỹ năng HOT 2025:</h4>
                      <ul className="text-purple-700 text-sm space-y-1">
                        <li>• Dip Powder (+$20-30/tuần)</li>
                        <li>• Gel-X (+$30-50/tuần)</li>
                        <li>• Nail Art (+$40-60/tuần)</li>
                        <li>• Pedicure Spa (+$25-35/tuần)</li>
                      </ul>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-blue-800 mb-2">Soft Skills quan trọng:</h4>
                      <ul className="text-blue-700 text-sm space-y-1">
                        <li>• Tiếng Anh cơ bản</li>
                        <li>• Thái độ thân thiện</li>
                        <li>• Đúng giờ, có trách nhiệm</li>
                        <li>• Tư duy kinh doanh</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">4. Cách Negotiate Lương Thông Minh</h3>
                  <p className="text-gray-700 mb-4">
                    Đây là phần nhiều bạn ngại nhất, nhưng thực ra rất đơn giản nếu bạn biết cách.
                  </p>
                  <div className="space-y-4">
                    <div className="border-l-4 border-green-400 pl-4">
                      <h5 className="font-semibold text-gray-800">Bước 1: Research trước</h5>
                      <p className="text-gray-600 text-sm">Hỏi bạn bè về mức lương ở các salon tương tự. Biết giá thị trường là biết sức mạnh đàm phán.</p>
                    </div>
                    <div className="border-l-4 border-blue-400 pl-4">
                      <h5 className="font-semibold text-gray-800">Bước 2: Chứng minh giá trị</h5>
                      <p className="text-gray-600 text-sm">Mang theo portfolio, customer reviews, chứng chỉ. Chứng minh bạn sẽ mang lại khách hàng cho salon.</p>
                    </div>
                    <div className="border-l-4 border-purple-400 pl-4">
                      <h5 className="font-semibold text-gray-800">Bước 3: Đề xuất win-win</h5>
                      <p className="text-gray-600 text-sm">"Em muốn commission 55% thay vì 50%, đổi lại em sẽ làm thêm giờ và đảm nhận training thợ mới."</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Regional Opportunities */}
          <section className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Top 5 Thành Phố Có Việc Làm Thợ Nail Lương Cao Nhất</h2>
            
            <div className="space-y-4">
              {[
                { city: "San Jose, CA", salary: "$1,400-1,800/tuần", highlight: "Silicon Valley - khách hàng tech, tip cao" },
                { city: "Houston, TX", salary: "$1,200-1,500/tuần", highlight: "Cộng đồng người Việt lớn nhất" },
                { city: "Westminster, CA", salary: "$1,300-1,600/tuần", highlight: "Little Saigon - trung tâm nail của Mỹ" },
                { city: "Orlando, FL", salary: "$1,100-1,400/tuần", highlight: "Du lịch phát triển, không thuế thu nhập" },
                { city: "Dallas, TX", salary: "$1,200-1,500/tuần", highlight: "Chi phí sống thấp, lương cao" }
              ].map((location, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <MapPin className="w-5 h-5 text-purple-600" />
                        <div>
                          <h4 className="font-bold text-gray-900">{location.city}</h4>
                          <p className="text-sm text-gray-600">{location.highlight}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-green-600">{location.salary}</p>
                        <Link to="/jobs" className="text-xs text-purple-600 hover:underline">
                          Xem việc làm →
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Success Stories */}
          <section className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Câu Chuyện Thành Công Từ Cộng Đồng</h2>
            
            <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl border border-green-200">
              <h3 className="text-xl font-bold text-green-800 mb-4">Chị Thảo - Từ $0 đến $80,000/năm trong 18 tháng</h3>
              <p className="text-gray-700 mb-4">
                "Tôi qua Mỹ tháng 1/2023, không biết gì về nail. Nhờ EmviApp tìm được mentor là chị Mai ở Austin. 
                Chị dạy tôi từ A-Z, giới thiệu việc làm, và giờ tôi đã có khách riêng, làm $1,500/tuần."
              </p>
              <div className="flex items-center gap-4 text-sm text-green-700">
                <span>💰 Thu nhập: $1,500/tuần</span>
                <span>📍 Địa điểm: Austin, TX</span>
                <span>⏱️ Thời gian: 18 tháng</span>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="mb-8">
            <Card className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
              <CardContent className="p-8 text-center">
                <h2 className="text-3xl font-bold mb-4">Sẵn Sàng Tìm Việc Làm Thợ Nail Lương Cao?</h2>
                <p className="text-lg mb-6 text-purple-100">
                  Hơn 2,500 việc làm thợ nail đang chờ bạn trên EmviApp. Kết nối trực tiếp với chủ salon, 
                  không qua trung gian, không mất phí.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/jobs">
                    <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 font-semibold">
                      <Briefcase className="w-5 h-5 mr-2" />
                      Tìm Việc Ngay
                    </Button>
                  </Link>
                  <Link to="/about">
                    <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600">
                      Tìm Hiểu EmviApp
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>

        {/* Author Bio */}
        <footer className="mt-12 pt-8 border-t border-gray-200">
          <div className="bg-gray-50 p-6 rounded-xl">
            <h3 className="font-bold text-lg text-gray-900 mb-2">Về Tác Giả</h3>
            <p className="text-gray-700">
              <strong>Chị Mai Nguyễn</strong> có 15 năm kinh nghiệm trong ngành nail tại Mỹ. Từng là thợ nail, 
              manager, và hiện sở hữu 3 salon ở California. Chị tích cực chia sẻ kinh nghiệm giúp cộng đồng 
              người Việt phát triển trong ngành làm đẹp.
            </p>
          </div>
        </footer>
      </article>
    </>
  );
};

export default ViecLamThoNailLuongCaoTaiMy;