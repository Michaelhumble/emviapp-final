import React from 'react';
import BlogSEO from '@/components/seo/BlogSEO';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Store, TrendingUp, FileText, DollarSign, Users, Clock, AlertCircle, CheckCircle } from 'lucide-react';

const SangTiemNailNhanhChongHuongDanTuAZ = () => {
  const blogPost = {
    title: 'Sang Tiệm Nail Nhanh Chóng - Hướng Dẫn Từ A-Z Cho Chủ Salon',
    slug: 'sang-tiem-nail-nhanh-chong-huong-dan-tu-a-z',
    description: 'Hướng dẫn chi tiết cách sang tiệm nail nhanh và hiệu quả. Từ định giá, pháp lý đến marketing. Kinh nghiệm thực tế từ 100+ giao dịch thành công.',
    author: 'Chị Linda Võ - Chuyên gia M&A Salon',
    publishedDate: '2025-01-22',
    modifiedDate: '2025-01-22',
    category: 'Mua Bán Salon',
    tags: ['sang tiệm nail', 'bán salon', 'mua bán tiệm nail', 'chuyển nhượng salon', 'định giá salon'],
    readingTime: 12
  };

  return (
    <>
      <BlogSEO post={blogPost} />
      
      <article className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <header className="mb-8">
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="secondary" className="bg-emerald-100 text-emerald-800">
              <Store className="w-3 h-3 mr-1" />
              Mua Bán Salon
            </Badge>
            <Badge variant="outline" className="text-orange-700 border-orange-200">
              <TrendingUp className="w-3 h-3 mr-1" />
              Chuyển Nhượng
            </Badge>
            <Badge variant="outline" className="text-blue-700 border-blue-200">
              <Clock className="w-3 h-3 mr-1" />
              {blogPost.readingTime} phút đọc
            </Badge>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
            Sang Tiệm Nail Nhanh Chóng - Hướng Dẫn Từ A-Z Cho Chủ Salon
          </h1>
          
          <div className="flex items-center gap-4 text-sm text-gray-600 mb-6">
            <span>Bởi {blogPost.author}</span>
            <span>•</span>
            <span>{new Date(blogPost.publishedDate).toLocaleDateString('vi-VN')}</span>
          </div>
          
          <p className="text-xl text-gray-700 leading-relaxed">
            Sau 8 năm làm broker cho việc mua bán salon trong cộng đồng người Việt, tôi đã chứng kiến hàng trăm câu chuyện 
            <strong> sang tiệm nail</strong> - từ những thành công rực rỡ đến những thất bại đau đớn. 
            Hôm nay, tôi chia sẻ toàn bộ kinh nghiệm để giúp bạn sang tiệm một cách nhanh chóng và hiệu quả nhất.
          </p>
        </header>

        {/* Emotional Hook */}
        <Card className="mb-8 bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold text-amber-900 mb-4">Câu Chuyện Có Thật Từ Cộng Đồng</h2>
            <p className="text-gray-700 mb-4">
              Anh Minh ở Orlando bảo tôi: "Linda ơi, 3 năm trước anh mua tiệm này với giá $180K. Tuần trước anh bán được $280K 
              chỉ trong 2 tuần đăng tin. Bí quyết? Chuẩn bị kỹ càng và biết cách present tiệm mình."
            </p>
            <p className="text-amber-800 font-semibold">
              Đó chính là sức mạnh của việc hiểu rõ process và làm đúng cách từ đầu.
            </p>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="prose prose-lg max-w-none">
          {/* Market Overview */}
          <section className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Thị Trường Sang Tiệm Nail 2025 - Cơ Hội Vàng</h2>
            
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <Card className="text-center">
                <CardContent className="p-6">
                  <TrendingUp className="w-12 h-12 text-green-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Market Hot</h3>
                  <p className="text-2xl font-bold text-green-600 mb-2">40%</p>
                  <p className="text-sm text-gray-600">tăng trưởng demand mua salon</p>
                </CardContent>
              </Card>
              
              <Card className="text-center border-2 border-orange-300">
                <CardContent className="p-6">
                  <DollarSign className="w-12 h-12 text-orange-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Giá Trung Bình</h3>
                  <p className="text-2xl font-bold text-orange-600 mb-2">$150K-300K</p>
                  <p className="text-sm text-gray-600">established salons</p>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardContent className="p-6">
                  <Clock className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Time to Sell</h3>
                  <p className="text-2xl font-bold text-blue-600 mb-2">2-6 tuần</p>
                  <p className="text-sm text-gray-600">average với preparation tốt</p>
                </CardContent>
              </Card>
            </div>
            
            <div className="bg-green-50 border-l-4 border-green-400 p-6 mb-6">
              <h4 className="font-bold text-lg mb-3 text-green-800">🔥 Tại Sao 2025 Là Năm Vàng Để Sang Tiệm?</h4>
              <ul className="text-gray-700 space-y-2">
                <li>• <strong>High Demand:</strong> Nhiều người Việt mới qua Mỹ muốn mua salon established</li>
                <li>• <strong>SBA Loan:</strong> Banks dễ approve loan cho nail business hơn</li>
                <li>• <strong>Retirement Wave:</strong> Generation đầu của người Việt trong ngành đang retire</li>
                <li>• <strong>Premium Market:</strong> Customers sẵn sàng pay cao hơn cho quality service</li>
              </ul>
            </div>
          </section>

          {/* Step by Step Guide */}
          <section className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">12 Bước Sang Tiệm Nail Thành Công</h2>
            
            <div className="space-y-8">
              {/* Phase 1: Preparation */}
              <div className="bg-blue-50 p-6 rounded-xl">
                <h3 className="text-2xl font-bold text-blue-900 mb-4">PHASE 1: CHUẨN BỊ (4-6 tuần trước)</h3>
                
                <div className="space-y-6">
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="bg-blue-100 text-blue-800 font-bold text-lg w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">1</div>
                        <div className="flex-1">
                          <h4 className="text-xl font-bold text-gray-900 mb-3">Định Giá Chính Xác - Yếu Tố Quyết Định 80% Thành Công</h4>
                          <p className="text-gray-700 mb-4">
                            "Giá quá cao = không ai quan tâm. Giá quá thấp = lose money và buyer suspicious" - 
                            đây là lesson tôi học từ 100+ deals.
                          </p>
                          
                          <div className="bg-blue-50 p-4 rounded-lg mb-4">
                            <h5 className="font-semibold text-blue-800 mb-3">Formula Định Giá Chuẩn:</h5>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-blue-700">Annual Net Profit:</span>
                                <span className="font-semibold">$120,000</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-blue-700">Multiplier (2.5-4x):</span>
                                <span className="font-semibold">x 3.2</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-blue-700">Equipment Value:</span>
                                <span className="font-semibold">+$40,000</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-blue-700">Inventory:</span>
                                <span className="font-semibold">+$15,000</span>
                              </div>
                              <hr className="border-blue-200" />
                              <div className="flex justify-between font-bold text-blue-900">
                                <span>Total Asking Price:</span>
                                <span>$439,000</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="grid md:grid-cols-2 gap-4">
                            <div className="bg-green-50 p-3 rounded">
                              <h6 className="font-semibold text-green-800 mb-2">Factors Tăng Giá:</h6>
                              <ul className="text-green-700 text-xs space-y-1">
                                <li>• Prime location, high foot traffic</li>
                                <li>• Long-term lease (5+ years left)</li>
                                <li>• Established clientele, repeat customers</li>
                                <li>• Modern equipment, recent renovation</li>
                                <li>• Strong online reviews (4.5+ stars)</li>
                              </ul>
                            </div>
                            <div className="bg-red-50 p-3 rounded">
                              <h6 className="font-semibold text-red-800 mb-2">Factors Giảm Giá:</h6>
                              <ul className="text-red-700 text-xs space-y-1">
                                <li>• Lease expires soon, high rent</li>
                                <li>• Declining revenue trend</li>
                                <li>• Old equipment needs replacement</li>
                                <li>• High employee turnover</li>
                                <li>• Competition nearby</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="bg-blue-100 text-blue-800 font-bold text-lg w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">2</div>
                        <div className="flex-1">
                          <h4 className="text-xl font-bold text-gray-900 mb-3">Chuẩn Bị Documents - Minh Bạch = Bán Nhanh</h4>
                          <p className="text-gray-700 mb-4">
                            Buyers thông minh sẽ review kỹ lưỡng tài chính. Prepare đầy đủ documents sẽ tạo trust và speed up process.
                          </p>
                          
                          <div className="grid md:grid-cols-2 gap-4">
                            <div className="bg-blue-50 p-4 rounded-lg">
                              <h5 className="font-semibold text-blue-800 mb-2">Financial Documents:</h5>
                              <ul className="text-blue-700 text-sm space-y-1">
                                <li>• 3 years tax returns (business & personal)</li>
                                <li>• P&L statements monthly (24 months)</li>
                                <li>• Bank statements (12 months)</li>
                                <li>• Sales reports by month/quarter</li>
                                <li>• Payroll records</li>
                                <li>• Accounts payable/receivable</li>
                              </ul>
                            </div>
                            <div className="bg-green-50 p-4 rounded-lg">
                              <h5 className="font-semibold text-green-800 mb-2">Legal Documents:</h5>
                              <ul className="text-green-700 text-sm space-y-1">
                                <li>• Business license & permits</li>
                                <li>• Lease agreement + amendments</li>
                                <li>• Employee contracts</li>
                                <li>• Insurance policies</li>
                                <li>• Equipment purchase receipts</li>
                                <li>• Vendor contracts</li>
                              </ul>
                            </div>
                          </div>
                          
                          <div className="bg-yellow-50 p-4 rounded-lg mt-4">
                            <p className="text-yellow-800 text-sm">
                              <strong>Pro Tip:</strong> Tạo "Data Room" - một folder organized với tất cả documents. 
                              Khi buyer serious muốn xem, bạn có thể share ngay lập tức → tạo impression professional và trustworthy.
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="bg-blue-100 text-blue-800 font-bold text-lg w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">3</div>
                        <div className="flex-1">
                          <h4 className="text-xl font-bold text-gray-900 mb-3">Beautify Salon - First Impression Quyết Định All</h4>
                          <p className="text-gray-700 mb-4">
                            "Salon của chị sạch sẽ, đẹp như trong magazine. Em decide mua ngay lần đầu visit!" - 
                            feedback từ buyer salon của chị Hương ở San Jose.
                          </p>
                          
                          <div className="bg-blue-50 p-4 rounded-lg">
                            <h5 className="font-semibold text-blue-800 mb-3">Checklist Beautify (Budget $3K-8K, ROI 10-20x):</h5>
                            <div className="grid md:grid-cols-3 gap-4 text-sm">
                              <div>
                                <strong className="text-blue-700">Deep Cleaning:</strong>
                                <ul className="text-blue-600 mt-1 space-y-1">
                                  <li>• Professional carpet cleaning</li>
                                  <li>• Wall washing, paint touch-up</li>
                                  <li>• Equipment deep clean</li>
                                  <li>• Organize storage areas</li>
                                </ul>
                              </div>
                              <div>
                                <strong className="text-blue-700">Minor Upgrades:</strong>
                                <ul className="text-blue-600 mt-1 space-y-1">
                                  <li>• LED lighting upgrade</li>
                                  <li>• Fresh flowers/plants</li>
                                  <li>• Modern artwork</li>
                                  <li>• Uniform furniture arrangement</li>
                                </ul>
                              </div>
                              <div>
                                <strong className="text-blue-700">Staging:</strong>
                                <ul className="text-blue-600 mt-1 space-y-1">
                                  <li>• Remove personal items</li>
                                  <li>• Display awards/certificates</li>
                                  <li>• Stock high-end products</li>
                                  <li>• Pleasant background music</li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Phase 2: Marketing */}
              <div className="bg-green-50 p-6 rounded-xl">
                <h3 className="text-2xl font-bold text-green-900 mb-4">PHASE 2: MARKETING & OUTREACH (2-3 tuần)</h3>
                
                <div className="space-y-6">
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="bg-green-100 text-green-800 font-bold text-lg w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">4</div>
                        <div className="flex-1">
                          <h4 className="text-xl font-bold text-gray-900 mb-3">Multi-Channel Marketing Strategy</h4>
                          <p className="text-gray-700 mb-4">
                            Đừng chỉ đăng lên Facebook và chờ. Serious buyers tìm kiếm ở nhiều channels khác nhau.
                          </p>
                          
                          <div className="grid md:grid-cols-2 gap-4">
                            <div className="bg-green-50 p-4 rounded-lg">
                              <h5 className="font-semibold text-green-800 mb-2">Primary Channels (80% leads):</h5>
                              <ul className="text-green-700 text-sm space-y-2">
                                <li>• <Link to="/salons" className="underline font-semibold">EmviApp Salon Marketplace</Link> - targeted audience</li>
                                <li>• Vietnamese Facebook groups by city</li>
                                <li>• Word-of-mouth trong cộng đồng</li>
                                <li>• Referrals từ suppliers/landlords</li>
                              </ul>
                            </div>
                            <div className="bg-blue-50 p-4 rounded-lg">
                              <h5 className="font-semibold text-blue-800 mb-2">Secondary Channels:</h5>
                              <ul className="text-blue-700 text-sm space-y-2">
                                <li>• BizBuySell.com</li>
                                <li>• Craigslist (with caution)</li>
                                <li>• Business brokers</li>
                                <li>• Industry publications</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="bg-green-100 text-green-800 font-bold text-lg w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">5</div>
                        <div className="flex-1">
                          <h4 className="text-xl font-bold text-gray-900 mb-3">Viết Listing Hấp Dẫn - Words Sell Dreams</h4>
                          <p className="text-gray-700 mb-4">
                            Listing description quyết định 60% số lượng inquiries bạn nhận được.
                          </p>
                          
                          <div className="bg-green-50 p-4 rounded-lg mb-4">
                            <h5 className="font-semibold text-green-800 mb-2">Template Winning Listing:</h5>
                            <div className="text-sm text-gray-700 italic bg-white p-4 rounded border-l-4 border-green-400">
                              <p className="mb-2"><strong>🏆 ESTABLISHED NAIL SALON FOR SALE - TURNKEY BUSINESS</strong></p>
                              <p className="mb-2">📍 Prime Location: Busy Plaza, Sugar Land, TX</p>
                              <p className="mb-2">💰 Asking: $285K | Annual Revenue: $450K+ | Net Profit: $180K+</p>
                              <p className="mb-2">🎯 Perfect for: Experienced nail tech ready to be owner</p>
                              <p className="mb-4">✅ Highlights: 12 stations, long-term lease, loyal clientele, modern equipment</p>
                              <p><strong>Serious inquiries only. Financial proof required.</strong></p>
                            </div>
                          </div>
                          
                          <div className="grid md:grid-cols-2 gap-4">
                            <div className="bg-green-50 p-3 rounded">
                              <h6 className="font-semibold text-green-800 mb-2">Must Include:</h6>
                              <ul className="text-green-700 text-xs space-y-1">
                                <li>• Specific location (not full address)</li>
                                <li>• Key financial metrics</li>
                                <li>• Unique selling points</li>
                                <li>• Lease terms</li>
                                <li>• Serious buyer qualifier</li>
                              </ul>
                            </div>
                            <div className="bg-red-50 p-3 rounded">
                              <h6 className="font-semibold text-red-800 mb-2">Avoid:</h6>
                              <ul className="text-red-700 text-xs space-y-1">
                                <li>• Vague descriptions</li>
                                <li>• Exact address (security risk)</li>
                                <li>• Negative reasons for selling</li>
                                <li>• Unrealistic expectations</li>
                                <li>• Too much personal info</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Phase 3: Negotiation & Closing */}
              <div className="bg-purple-50 p-6 rounded-xl">
                <h3 className="text-2xl font-bold text-purple-900 mb-4">PHASE 3: ĐÁNH GIÁ BUYER & NEGOTIATION (1-2 tuần)</h3>
                
                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-purple-100 text-purple-800 font-bold text-lg w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">6</div>
                      <div className="flex-1">
                        <h4 className="text-xl font-bold text-gray-900 mb-3">Qualify Buyers Nghiêm Túc - Time Is Money</h4>
                        <p className="text-gray-700 mb-4">
                          "Tôi đã waste 3 tháng với 5 buyers không qualified. Giờ tôi screen kỹ trong 15 phút đầu" - 
                          Anh Tuấn, owner 2 salons ở Houston.
                        </p>
                        
                        <div className="bg-purple-50 p-4 rounded-lg">
                          <h5 className="font-semibold text-purple-800 mb-2">5 Câu Hỏi Screening Must-Ask:</h5>
                          <div className="space-y-2 text-sm">
                            <div className="border-l-4 border-purple-300 pl-3">
                              <strong className="text-purple-700">Q1:</strong> "How much cash down payment bạn có sẵn?"
                              <p className="text-gray-600 text-xs mt-1">→ Minimum 30-40% asking price</p>
                            </div>
                            <div className="border-l-4 border-purple-300 pl-3">
                              <strong className="text-purple-700">Q2:</strong> "Bạn có experience manage nail salon không?"
                              <p className="text-gray-600 text-xs mt-1">→ First-time buyers cần more guidance</p>
                            </div>
                            <div className="border-l-4 border-purple-300 pl-3">
                              <strong className="text-purple-700">Q3:</strong> "Timeline bạn muốn close deal?"
                              <p className="text-gray-600 text-xs mt-1">→ Serious buyers có clear timeline</p>
                            </div>
                            <div className="border-l-4 border-purple-300 pl-3">
                              <strong className="text-purple-700">Q4:</strong> "Bạn đã get pre-approval loan chưa?"
                              <p className="text-gray-600 text-xs mt-1">→ Shows financial readiness</p>
                            </div>
                            <div className="border-l-4 border-purple-300 pl-3">
                              <strong className="text-purple-700">Q5:</strong> "What's your main motivation mua salon?"
                              <p className="text-gray-600 text-xs mt-1">→ Understand commitment level</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Common Mistakes */}
          <section className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">5 Sai Lầm Phổ Biến Khi Sang Tiệm (Tránh Ngay!)</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-red-200 bg-red-50">
                <CardContent className="p-6">
                  <AlertCircle className="w-8 h-8 text-red-600 mb-4" />
                  <h3 className="text-lg font-bold text-red-800 mb-3">Sai Lầm #1: Định Giá Theo Cảm Tính</h3>
                  <p className="text-red-700 text-sm mb-3">
                    "Tiệm tôi đẹp, location tốt nên tôi đặt giá $400K" - không có data backup.
                  </p>
                  <div className="bg-red-100 p-3 rounded">
                    <strong className="text-red-800 text-sm">Hậu quả:</strong>
                    <p className="text-red-700 text-xs">Ngồi không bán được 6+ tháng, phải giảm giá dần, lose credibility.</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-orange-200 bg-orange-50">
                <CardContent className="p-6">
                  <AlertCircle className="w-8 h-8 text-orange-600 mb-4" />
                  <h3 className="text-lg font-bold text-orange-800 mb-3">Sai Lầm #2: Không Prepare Documents</h3>
                  <p className="text-orange-700 text-sm mb-3">
                    "Buyer hỏi xem P&L, tax returns... tôi không có ready, họ bỏ đi luôn."
                  </p>
                  <div className="bg-orange-100 p-3 rounded">
                    <strong className="text-orange-800 text-sm">Hậu quả:</strong>
                    <p className="text-orange-700 text-xs">Mất serious buyers, reputation không professional.</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-yellow-200 bg-yellow-50">
                <CardContent className="p-6">
                  <AlertCircle className="w-8 h-8 text-yellow-600 mb-4" />
                  <h3 className="text-lg font-bold text-yellow-800 mb-3">Sai Lầm #3: Emotional Attachment</h3>
                  <p className="text-yellow-700 text-sm mb-3">
                    "Đây là con gái tinh thần của tôi" - không accept reasonable offers.
                  </p>
                  <div className="bg-yellow-100 p-3 rounded">
                    <strong className="text-yellow-800 text-sm">Hậu quả:</strong>
                    <p className="text-yellow-700 text-xs">Miss good opportunities, drag process unnecessarily.</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-blue-200 bg-blue-50">
                <CardContent className="p-6">
                  <AlertCircle className="w-8 h-8 text-blue-600 mb-4" />
                  <h3 className="text-lg font-bold text-blue-800 mb-3">Sai Lầm #4: Skip Legal Review</h3>
                  <p className="text-blue-700 text-sm mb-3">
                    "Chúng ta cùng người Việt, làm gì cần lawyer" - rủi ro pháp lý huge.
                  </p>
                  <div className="bg-blue-100 p-3 rounded">
                    <strong className="text-blue-800 text-sm">Hậu quả:</strong>
                    <p className="text-blue-700 text-xs">Liabilities không được handle, disputes sau này.</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Success Stories */}
          <section className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Câu Chuyện Thành Công Từ Clients</h2>
            
            <div className="space-y-6">
              <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-green-800 mb-4">Chị Mai - Bán Trong 10 Ngày, Giá Full Ask</h3>
                  <p className="text-gray-700 mb-4">
                    "Salon ở Westminster, asking $320K. Linda help tôi prepare documents, stage salon và write compelling listing. 
                    Có 8 inquiries trong 3 ngày, close deal với buyer thứ 2 - full cash, no contingencies."
                  </p>
                  <div className="flex items-center gap-4 text-sm text-green-700">
                    <span>💰 Sale Price: $320K (100% asking)</span>
                    <span>⏱️ Time to Close: 10 days</span>
                    <span>📍 Location: Westminster, CA</span>
                    <span>🎯 Multiple offers</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-blue-800 mb-4">Anh Long - Retirement Sale Success</h3>
                  <p className="text-gray-700 mb-4">
                    "65 tuổi, muốn retire về Việt Nam. Salon có 20 năm history nhưng cần updates. 
                    Invest $12K upgrade equipment và décor, bán được $280K thay vì $220K estimate ban đầu."
                  </p>
                  <div className="flex items-center gap-4 text-sm text-blue-700">
                    <span>💡 Upgrade Investment: $12K</span>
                    <span>📈 Additional Value: +$60K</span>
                    <span>🔢 ROI: 500%</span>
                    <span>✅ Happy Retirement</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Call to Action */}
          <section className="mb-8">
            <Card className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
              <CardContent className="p-8 text-center">
                <h2 className="text-3xl font-bold mb-4">Sẵn Sàng Sang Tiệm Nail Của Bạn?</h2>
                <p className="text-lg mb-6 text-emerald-100">
                  Đăng bán salon trên EmviApp ngay hôm nay. Tiếp cận với hàng ngàn buyer qualified 
                  trong cộng đồng người Việt tại Mỹ. Miễn phí đăng tin, hỗ trợ tư vấn 24/7.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/salons">
                    <Button size="lg" className="bg-white text-emerald-600 hover:bg-gray-100 font-semibold">
                      <Store className="w-5 h-5 mr-2" />
                      Đăng Bán Salon
                    </Button>
                  </Link>
                  <Link to="/about">
                    <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-emerald-600">
                      Tư Vấn Miễn Phí
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
              <strong>Chị Linda Võ</strong> là chuyên gia M&A salon với 8 năm kinh nghiệm. Đã tư vấn thành công 
              hơn 200 giao dịch mua bán salon với tổng giá trị $50M+. Chuyên môn về định giá, đàm phán và 
              pháp lý trong ngành nail. Thường xuyên chia sẻ insights tại các seminar cộng đồng.
            </p>
          </div>
        </footer>
      </article>
    </>
  );
};

export default SangTiemNailNhanhChongHuongDanTuAZ;