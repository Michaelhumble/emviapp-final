import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Container } from '@/components/ui/container';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, User, Plane, Heart, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import heroImage from '@/assets/blog/emviapp-hero-vietnamese-nail-tech.jpg';

const ViecNailNguoiVietMoiSangMyBatDau = () => {
  return (
    <>
      <Helmet>
        <title>Việc Nail Cho Người Việt Mới Sang Mỹ: Làm Sao Để Bắt Đầu? | EmviApp</title>
        <meta name="description" content="Hướng dẫn chi tiết cho người Việt mới sang Mỹ tìm việc nail. Từ xin license, học tiếng Anh đến tìm việc đầu tiên. Kinh nghiệm thực tế từ cộng đồng." />
        <meta property="og:title" content="Việc Nail Cho Người Việt Mới Sang Mỹ: Làm Sao Để Bắt Đầu?" />
        <meta property="og:description" content="Hướng dẫn chi tiết cho người Việt mới sang Mỹ tìm việc nail. Từ xin license, học tiếng Anh đến tìm việc đầu tiên." />
        <meta property="og:image" content={heroImage} />
        <link rel="canonical" href="https://www.emvi.app/blog/viec-nail-nguoi-viet-moi-sang-my-bat-dau" />
      </Helmet>

      <article className="min-h-screen bg-white">
        {/* Header */}
        <div className="bg-gradient-to-br from-orange-50 to-red-100 py-16">
          <Container>
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                  <Plane className="w-4 h-4 mr-2" />
                  Người Mới Sang Mỹ
                </Badge>
                <div className="flex items-center text-gray-600 text-sm">
                  <Calendar className="w-4 h-4 mr-2" />
                  23 tháng 1, 2025
                </div>
                <div className="flex items-center text-gray-600 text-sm">
                  <Clock className="w-4 h-4 mr-2" />
                  20 phút đọc
                </div>
                <div className="flex items-center text-gray-600 text-sm">
                  <User className="w-4 h-4 mr-2" />
                  Chị Hoa Trần - Cố vấn cộng đồng
                </div>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Việc Nail Cho Người Việt Mới Sang Mỹ: Làm Sao Để Bắt Đầu?
              </h1>
              
              <p className="text-xl text-gray-700 leading-relaxed mb-8">
                Bắt đầu cuộc sống mới ở Mỹ không dễ dàng, nhưng nghề nail đã giúp hàng nghìn người Việt xây dựng thành công. Đây là roadmap chi tiết từ những ngày đầu đến khi có việc làm ổn định.
              </p>

              <div className="flex items-center gap-6 text-sm text-gray-600">
                <div className="flex items-center">
                  <Heart className="w-4 h-4 mr-2 text-red-600" />
                  <span>Từ trái tim cộng đồng</span>
                </div>
                <div className="flex items-center">
                  <BookOpen className="w-4 h-4 mr-2 text-blue-600" />
                  <span>Kinh nghiệm thực tế</span>
                </div>
              </div>
            </div>
          </Container>
        </div>

        {/* Featured Image */}
        <Container className="py-8">
          <div className="max-w-4xl mx-auto">
            <img 
              src={heroImage} 
              alt="Việc nail cho người Việt mới sang Mỹ"
              className="w-full h-96 object-cover rounded-2xl shadow-lg"
            />
          </div>
        </Container>

        {/* Content */}
        <Container className="pb-16">
          <div className="max-w-4xl mx-auto prose prose-lg max-w-none">
            
            <h2>Tại Sao Nghề Nail Phù Hợp Với Người Mới Sang?</h2>
            
            <p>Nghề nail không chỉ là công việc mà là con đường thoát nghèo nhanh nhất cho người Việt tại Mỹ. Với barrier to entry thấp, thu nhập cao và cộng đồng hỗ trợ mạnh mẽ, đây là lựa chọn thông minh cho những ai muốn nhanh chóng ổn định cuộc sống.</p>
            
            <div className="bg-gradient-to-r from-green-50 to-blue-50 p-8 rounded-2xl my-8 border border-green-200">
              <h3 className="text-2xl font-bold text-green-900 mb-6">🌟 Tại Sao Chọn Nghề Nail?</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">1</div>
                    <div>
                      <h4 className="font-bold text-green-800">Thu Nhập Cao</h4>
                      <p className="text-green-700 text-sm">$800-2000/tuần ngay từ năm đầu</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">2</div>
                    <div>
                      <h4 className="font-bold text-blue-800">Học Nhanh</h4>
                      <p className="text-blue-700 text-sm">3-6 tháng training là có thể làm việc</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">3</div>
                    <div>
                      <h4 className="font-bold text-purple-800">Cộng Đồng Mạnh</h4>
                      <p className="text-purple-700 text-sm">Người Việt chiếm 80% thị trường nail Mỹ</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">4</div>
                    <div>
                      <h4 className="font-bold text-orange-800">Flexible</h4>
                      <p className="text-orange-700 text-sm">Có thể làm part-time hoặc full-time</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">5</div>
                    <div>
                      <h4 className="font-bold text-red-800">Ít Rào Cản</h4>
                      <p className="text-red-700 text-sm">Không cần bằng cấp cao hay tiếng Anh thành thạo</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-teal-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">6</div>
                    <div>
                      <h4 className="font-bold text-teal-800">Tương Lai</h4>
                      <p className="text-teal-700 text-sm">Có thể mở salon riêng sau 2-3 năm</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <blockquote className="border-l-4 border-orange-500 pl-6 italic text-gray-700 my-8">
              "Tôi sang Mỹ năm 2019 không biết gì. Học nail 4 tháng, làm việc được luôn. Giờ kiếm $1400/tuần và đang chuẩn bị mở salon riêng. Nghề nail đã thay đổi cuộc đời tôi." - Chị Mai, Houston, TX
            </blockquote>

            <h2>Roadmap Chi Tiết Cho 12 Tháng Đầu</h2>
            
            <div className="bg-gray-50 p-8 rounded-2xl my-8">
              <h3 className="text-2xl font-bold mb-6">📅 Timeline Thành Công</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm">
                  <div className="bg-red-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold">
                    0-1
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-lg mb-2">Tháng 1: Ổn Định Cuộc Sống</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Tìm chỗ ở gần khu người Việt</li>
                      <li>• Xin Social Security Number</li>
                      <li>• Mở tài khoản ngân hàng</li>
                      <li>• Kết nối với cộng đồng địa phương</li>
                      <li>• Research về nail schools trong khu vực</li>
                    </ul>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm">
                  <div className="bg-orange-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold">
                    2-3
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-lg mb-2">Tháng 2-3: Học Nghề Chuyên Sâu</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Đăng ký nail school (400-1000 giờ tùy bang)</li>
                      <li>• Học basic English cho nail industry</li>
                      <li>• Practice các kỹ thuật cơ bản</li>
                      <li>• Tham gia Facebook groups người Việt</li>
                      <li>• Networking with experienced nail techs</li>
                    </ul>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm">
                  <div className="bg-yellow-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold">
                    4-6
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-lg mb-2">Tháng 4-6: Hoàn Thành Training</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Finish nail school program</li>
                      <li>• Chuẩn bị cho state board exam</li>
                      <li>• Practice làm nail cho bạn bè, gia đình</li>
                      <li>• Xây dựng basic portfolio</li>
                      <li>• Research salary ranges trong khu vực</li>
                    </ul>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm">
                  <div className="bg-green-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold">
                    7-9
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-lg mb-2">Tháng 7-9: Xin License & Tìm Việc</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Thi state board exam</li>
                      <li>• Xin nail technician license</li>
                      <li>• Tạo resume chuyên nghiệp</li>
                      <li>• Apply jobs trên <Link to="/jobs" className="text-blue-600 hover:underline">EmviApp</Link></li>
                      <li>• Interview practice với người có kinh nghiệm</li>
                    </ul>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm">
                  <div className="bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold">
                    10-12
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-lg mb-2">Tháng 10-12: Bắt Đầu Sự Nghiệp</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Bắt đầu việc làm đầu tiên</li>
                      <li>• Build client base</li>
                      <li>• Học advanced techniques</li>
                      <li>• Set financial goals cho năm tiếp theo</li>
                      <li>• Plan cho việc mở salon riêng (nếu muốn)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <h2>Chi Phí Cần Chuẩn Bị</h2>
            
            <div className="bg-blue-50 p-6 rounded-xl my-8">
              <h3 className="text-xl font-bold text-blue-800 mb-4">💰 Budget Chi Tiết</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-bold text-blue-900 mb-3">Chi Phí Training</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Nail School Tuition:</span>
                      <span className="font-bold">$3,000-8,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Books & Supplies:</span>
                      <span className="font-bold">$500-800</span>
                    </div>
                    <div className="flex justify-between">
                      <span>State Board Exam:</span>
                      <span className="font-bold">$100-200</span>
                    </div>
                    <div className="flex justify-between">
                      <span>License Fee:</span>
                      <span className="font-bold">$50-150</span>
                    </div>
                    <div className="border-t pt-2 mt-2">
                      <div className="flex justify-between font-bold text-blue-700">
                        <span>Total Training:</span>
                        <span>$3,650-9,150</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-bold text-green-900 mb-3">Chi Phí Sinh Hoạt (6 tháng)</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Rent (shared housing):</span>
                      <span className="font-bold">$3,000-6,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Food & Utilities:</span>
                      <span className="font-bold">$1,800-3,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Transportation:</span>
                      <span className="font-bold">$600-1,200</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Personal expenses:</span>
                      <span className="font-bold">$600-1,200</span>
                    </div>
                    <div className="border-t pt-2 mt-2">
                      <div className="flex justify-between font-bold text-green-700">
                        <span>Total Living:</span>
                        <span>$6,000-11,400</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-4 rounded-lg mt-4">
                <div className="text-center">
                  <h4 className="font-bold text-purple-900 mb-2">💳 Tổng Chi Phí Cần Chuẩn Bị</h4>
                  <div className="text-2xl font-bold text-purple-700">$10,000 - $20,000</div>
                  <p className="text-sm text-purple-600 mt-2">Cho 6-12 tháng đầu tiên (bao gồm emergency fund)</p>
                </div>
              </div>
            </div>

            <h2>Chọn Bang Nào Để Bắt Đầu?</h2>
            
            <p>Mỗi bang có requirements khác nhau cho nail license. Dưới đây là so sánh các bang phổ biến:</p>
            
            <div className="overflow-x-auto my-8">
              <table className="w-full border border-gray-300 bg-white rounded-lg overflow-hidden">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="border border-gray-300 p-3 text-left font-bold">Bang</th>
                    <th className="border border-gray-300 p-3 text-center font-bold">Giờ Học</th>
                    <th className="border border-gray-300 p-3 text-center font-bold">Chi Phí School</th>
                    <th className="border border-gray-300 p-3 text-center font-bold">Lương Trung Bình</th>
                    <th className="border border-gray-300 p-3 text-center font-bold">Cộng Đồng</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 p-3 font-medium">California</td>
                    <td className="border border-gray-300 p-3 text-center">400 giờ</td>
                    <td className="border border-gray-300 p-3 text-center">$4,000-7,000</td>
                    <td className="border border-gray-300 p-3 text-center text-green-600 font-bold">$1200-1800/tuần</td>
                    <td className="border border-gray-300 p-3 text-center">🌟🌟🌟🌟🌟</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 p-3 font-medium">Texas</td>
                    <td className="border border-gray-300 p-3 text-center">600 giờ</td>
                    <td className="border border-gray-300 p-3 text-center">$3,500-6,000</td>
                    <td className="border border-gray-300 p-3 text-center text-green-600 font-bold">$900-1400/tuần</td>
                    <td className="border border-gray-300 p-3 text-center">🌟🌟🌟🌟</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-3 font-medium">Florida</td>
                    <td className="border border-gray-300 p-3 text-center">240 giờ</td>
                    <td className="border border-gray-300 p-3 text-center">$2,500-5,000</td>
                    <td className="border border-gray-300 p-3 text-center text-green-600 font-bold">$800-1200/tuần</td>
                    <td className="border border-gray-300 p-3 text-center">🌟🌟🌟</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 p-3 font-medium">New York</td>
                    <td className="border border-gray-300 p-3 text-center">250 giờ</td>
                    <td className="border border-gray-300 p-3 text-center">$5,000-9,000</td>
                    <td className="border border-gray-300 p-3 text-center text-green-600 font-bold">$1000-1600/tuần</td>
                    <td className="border border-gray-300 p-3 text-center">🌟🌟🌟</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-3 font-medium">Washington</td>
                    <td className="border border-gray-300 p-3 text-center">600 giờ</td>
                    <td className="border border-gray-300 p-3 text-center">$4,000-8,000</td>
                    <td className="border border-gray-300 p-3 text-center text-green-600 font-bold">$1100-1600/tuần</td>
                    <td className="border border-gray-300 p-3 text-center">🌟🌟🌟🌟</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2>Những Sai Lầm Thường Gặp</h2>
            
            <div className="bg-red-50 border border-red-200 p-6 rounded-xl my-8">
              <h3 className="text-xl font-bold text-red-800 mb-4">⚠️ Tránh Những Sai Lầm Này</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-red-700 mb-3">❌ Về Training</h4>
                  <ul className="space-y-2 text-red-600 text-sm">
                    <li>• Chọn school rẻ nhất mà không research chất lượng</li>
                    <li>• Skip practice time ở nhà</li>
                    <li>• Không học tiếng Anh chuyên ngành</li>
                    <li>• Rush qua các bài học để finish nhanh</li>
                    <li>• Không networking với classmates</li>
                  </ul>
                  
                  <h4 className="font-bold text-red-700 mb-3 mt-6">❌ Về Tìm Việc</h4>
                  <ul className="space-y-2 text-red-600 text-sm">
                    <li>• Chấp nhận mức lương quá thấp</li>
                    <li>• Không hỏi về working conditions</li>
                    <li>• Làm việc không có proper license</li>
                    <li>• Không tìm hiểu về salon trước khi apply</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-bold text-red-700 mb-3">❌ Về Tài Chính</h4>
                  <ul className="space-y-2 text-red-600 text-sm">
                    <li>• Không có emergency fund</li>
                    <li>• Borrow quá nhiều tiền cho school</li>
                    <li>• Không track income/expenses</li>
                    <li>• Không save money cho future goals</li>
                    <li>• Spend tất cả ngay khi có thu nhập</li>
                  </ul>
                  
                  <h4 className="font-bold text-red-700 mb-3 mt-6">❌ Về Cộng Đồng</h4>
                  <ul className="space-y-2 text-red-600 text-sm">
                    <li>• Isolate khỏi Vietnamese community</li>
                    <li>• Không tham gia local events</li>
                    <li>• Cạnh tranh thay vì hợp tác</li>
                    <li>• Không share knowledge với người mới</li>
                  </ul>
                </div>
              </div>
            </div>

            <h2>Resources Hữu Ích</h2>
            
            <div className="grid md:grid-cols-2 gap-6 my-8">
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-xl border border-blue-200">
                <h4 className="font-bold text-blue-800 mb-4">📚 Learning Resources</h4>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500">•</span>
                    <span><strong>YouTube:</strong> "Nail Career Education" - Free tutorials</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500">•</span>
                    <span><strong>Apps:</strong> Duolingo for English, Nail terminology flashcards</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500">•</span>
                    <span><strong>Books:</strong> "Milady's Standard Nail Technology"</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500">•</span>
                    <span><strong>Podcasts:</strong> "Beauty Business Podcast"</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
                <h4 className="font-bold text-green-800 mb-4">🌐 Community Support</h4>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">•</span>
                    <span><strong>Facebook:</strong> "Người Việt Nail Tech USA"</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">•</span>
                    <span><strong>WhatsApp:</strong> Local Vietnamese nail tech groups</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">•</span>
                    <span><strong>EmviApp:</strong> <Link to="/jobs" className="text-green-600 hover:underline">Tìm việc nail</Link> chuyên nghiệp</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">•</span>
                    <span><strong>Local:</strong> Vietnamese Community Centers</span>
                  </li>
                </ul>
              </div>
            </div>

            <h2>Câu Chuyện Thành Công</h2>
            
            <div className="space-y-6 my-8">
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-xl border border-yellow-200">
                <div className="flex items-start gap-4">
                  <div className="bg-yellow-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold">LH</div>
                  <div>
                    <h4 className="font-bold text-yellow-900 mb-2">Linh Hoàng - Garden Grove, CA</h4>
                    <p className="text-yellow-800 mb-3">"Tôi sang Mỹ năm 2020, không biết tiếng Anh. Học nail school 6 tháng, thi đỗ license rồi tìm việc trên EmviApp. Việc đầu tiên $800/tuần, giờ đã lên $1600/tuần và chuẩn bị mở salon riêng."</p>
                    <div className="text-sm text-yellow-600">
                      <strong>Timeline:</strong> 18 tháng từ 0 đến $1600/tuần
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200">
                <div className="flex items-start gap-4">
                  <div className="bg-purple-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold">HT</div>
                  <div>
                    <h4 className="font-bold text-purple-900 mb-2">Hạnh Trần - Houston, TX</h4>
                    <p className="text-purple-800 mb-3">"Tôi 45 tuổi mới sang Mỹ, nghĩ đã quá muộn để học nghề mới. Nhưng cộng đồng nail rất support. Giờ tôi làm ở salon high-end, khách tip cao, kiếm $1200/tuần và rất happy."</p>
                    <div className="text-sm text-purple-600">
                      <strong>Lesson:</strong> Không bao giờ quá muộn để bắt đầu
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-green-50 to-teal-50 p-6 rounded-xl border border-green-200">
                <div className="flex items-start gap-4">
                  <div className="bg-green-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold">TP</div>
                  <div>
                    <h4 className="font-bold text-green-900 mb-2">Thủy Phạm - Orlando, FL</h4>
                    <p className="text-green-800 mb-3">"Family tôi 4 người, tôi là người đầu tiên học nail. Giờ cả chồng và 2 con đều làm trong ngành. Chúng tôi có 2 salon và planning mở thêm 1 nữa. Nail đã thay đổi cả gia đình."</p>
                    <div className="text-sm text-green-600">
                      <strong>Impact:</strong> Nail business có thể transform cả gia đình
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-orange-50 to-red-50 p-8 rounded-2xl my-12 border border-orange-200">
              <h2 className="text-2xl font-bold text-orange-900 mb-4">🚀 Bắt Đầu Hành Trình Của Bạn</h2>
              <p className="text-orange-800 text-lg mb-6">
                Mỗi người thành công trong ngành nail đều có một khởi đầu. Hôm nay có thể là ngày bắt đầu của bạn. Cộng đồng sẵn sàng hỗ trợ bạn từ những bước đầu tiên.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link to="/jobs">
                  <Button className="bg-orange-600 hover:bg-orange-700 text-white">
                    Tìm Việc Nail Ngay
                  </Button>
                </Link>
                <Link to="/about">
                  <Button variant="outline" className="border-orange-600 text-orange-700 hover:bg-orange-100">
                    Kết Nối Cộng Đồng
                  </Button>
                </Link>
              </div>
            </div>

            <p className="text-center text-lg font-medium text-gray-700 mt-12">
              <Link to="/jobs" className="text-orange-600 hover:underline">Đăng tin miễn phí trên EmviApp hôm nay để tìm việc hoặc sang tiệm nhanh chóng.</Link>
            </p>
          </div>
        </Container>
      </article>
    </>
  );
};

export default ViecNailNguoiVietMoiSangMyBatDau;