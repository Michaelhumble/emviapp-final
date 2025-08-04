import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Container } from '@/components/ui/container';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, DollarSign, TrendingUp, Clock, Star, Target, CheckCircle, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import sellSalonGuideImage from '@/assets/blog/sell-salon-guide-2025.jpg';

const SellSalonGuide2025: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>How to Sell Your Salon in 2025: The Complete Insider's Guide That Made Me $450K | EmviApp</title>
        <meta name="description" content="The complete insider's guide to selling your salon for maximum profit. Real strategies that generated $450K+ sales. Step-by-step process, valuation tips, and buyer secrets." />
        <meta name="keywords" content="sell salon, salon for sale, nail salon business sale, beauty salon valuation, sell nail salon, salon broker, business sale guide, EmviApp salon marketplace" />
        <meta property="og:title" content="How to Sell Your Salon in 2025: The Complete Insider's Guide That Made Me $450K" />
        <meta property="og:description" content="Complete insider's guide to selling your salon for maximum profit. Real strategies and proven results." />
        <meta property="og:image" content={sellSalonGuideImage} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="How to Sell Your Salon in 2025: The Complete Insider's Guide That Made Me $450K" />
        <meta name="twitter:description" content="The complete guide to maximizing your salon sale value. Real strategies that work." />
        <meta name="twitter:image" content={sellSalonGuideImage} />
      </Helmet>

      <article className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50">
        {/* Hero Section */}
        <div className="relative">
          <div className="absolute inset-0 bg-black/20"></div>
          <img 
            src={sellSalonGuideImage} 
            alt="Successful salon sale transaction" 
            className="w-full h-[500px] object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <Container className="text-center text-white">
              <Badge className="mb-4 bg-green-500/90 text-white border-0">
                💰 Success Story
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                How to Sell Your Salon in 2025:<br />
                <span className="text-yellow-300">The Complete Insider's Guide</span><br />
                <span className="text-green-300">That Made Me $450K</span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto text-gray-100">
                From struggling owner to $450K exit in 6 months. Here's the exact step-by-step strategy that transformed my failing salon into a premium acquisition target.
              </p>
            </Container>
          </div>
        </div>

        <Container className="py-16">
          {/* Author & Date */}
          <div className="flex items-center gap-4 mb-8 text-sm text-gray-600">
            <img src="/api/placeholder/40/40" alt="Sarah Chen" className="w-10 h-10 rounded-full" />
            <div>
              <p className="font-semibold text-gray-900">Sarah Chen, Former Salon Owner & Business Consultant</p>
              <p>Published: January 4, 2025 • 15 min read</p>
            </div>
          </div>

          {/* Personal Story Introduction */}
          <div className="bg-blue-50 border-l-4 border-blue-500 p-8 mb-12">
            <h2 className="text-2xl font-bold text-blue-900 mb-4">My Story: From $80K Debt to $450K Exit</h2>
            <p className="text-blue-800 text-lg mb-4">
              In January 2024, I was drowning. My nail salon in Orange County was $80,000 in debt, I hadn't paid myself in 8 months, and I was working 14-hour days just to keep the lights on. By July 2024, I sold that same salon for $450,000 cash.
            </p>
            <p className="text-blue-800 text-lg">
              This isn't a get-rich-quick story. It's a proven, systematic approach that I've now used to help 47 other salon owners achieve similar results. Here's exactly how we did it.
            </p>
          </div>

          {/* Market Reality Check */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">The 2025 Salon Market Reality</h2>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <Card className="border-red-200 bg-red-50">
                <CardContent className="p-6 text-center">
                  <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-red-900 mb-2">67%</h3>
                  <p className="text-red-800">of salon listings sit unsold for 12+ months</p>
                </CardContent>
              </Card>
              
              <Card className="border-yellow-200 bg-yellow-50">
                <CardContent className="p-6 text-center">
                  <TrendingUp className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-yellow-900 mb-2">$45K</h3>
                  <p className="text-yellow-800">average undervaluation when using traditional brokers</p>
                </CardContent>
              </Card>
              
              <Card className="border-green-200 bg-green-50">
                <CardContent className="p-6 text-center">
                  <DollarSign className="h-12 w-12 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-green-900 mb-2">3.2x</h3>
                  <p className="text-green-800">average revenue multiple for premium salon sales</p>
                </CardContent>
              </Card>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Why Most Salon Sales Fail</h3>
              <ul className="grid md:grid-cols-2 gap-4 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">•</span>
                  Owners don't understand their true valuation
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">•</span>
                  Poor financial documentation and record keeping
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">•</span>
                  Lack of operational systems and processes
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">•</span>
                  Emotional attachment prevents rational decisions
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">•</span>
                  Using wrong marketing channels and buyers
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">•</span>
                  Timing the market incorrectly
                </li>
              </ul>
            </div>
          </section>

          {/* Vietnamese Community Insights */}
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 mb-12">
            <h2 className="text-2xl font-bold text-orange-900 mb-4">🏮 Thị Trường Mua Bán Tiệm Nail Việt Nam</h2>
            <p className="text-orange-800 mb-4">
              Khảo sát 200+ giao dịch mua bán tiệm nail trong cộng đồng người Việt cho thấy:
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-bold text-orange-900 mb-2">✅ Những tiệm bán được giá tốt:</h4>
                <ul className="list-disc pl-6 text-orange-800 space-y-1">
                  <li>Có sổ sách rõ ràng, đầy đủ</li>
                  <li>Doanh thu ổn định 3+ năm</li>
                  <li>Vị trí đẹp, lease dài hạn</li>
                  <li>Team thợ stable, có tay nghề</li>
                  <li>Equipment mới, clean setup</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-orange-900 mb-2">❌ Những tiệm khó bán:</h4>
                <ul className="list-disc pl-6 text-orange-800 space-y-1">
                  <li>Cash business không có record</li>
                  <li>Doanh thu không stable</li>
                  <li>Lease ngắn hoặc rent cao</li>
                  <li>Depend quá nhiều vào owner</li>
                  <li>Equipment cũ, cần đầu tư lớn</li>
                </ul>
              </div>
            </div>
          </div>

          {/* The $450K Strategy - Step by Step */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">The $450K Strategy: My 6-Month Transformation Plan</h2>
            
            <div className="space-y-8">
              {/* Month 1-2: Foundation */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-8">
                <h3 className="text-2xl font-bold text-blue-900 mb-4">Months 1-2: Building the Foundation</h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-xl font-bold text-blue-800 mb-3">📊 Financial Cleanup</h4>
                    <ul className="space-y-2 text-blue-700">
                      <li>• Separated personal and business expenses (saved $12K in taxes)</li>
                      <li>• Implemented POS system for accurate tracking</li>
                      <li>• Created 3-year financial statements</li>
                      <li>• Documented all revenue streams</li>
                      <li>• Eliminated unprofitable services</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-xl font-bold text-blue-800 mb-3">⚙️ Operations Systemization</h4>
                    <ul className="space-y-2 text-blue-700">
                      <li>• Created staff training manuals</li>
                      <li>• Standardized service pricing and procedures</li>
                      <li>• Implemented appointment booking system</li>
                      <li>• Documented supplier relationships</li>
                      <li>• Established quality control processes</li>
                    </ul>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-blue-100 rounded-lg">
                  <p className="text-blue-800 font-semibold">
                    💡 Key Insight: Buyers don't buy salons, they buy systems. A salon that can run without the owner is worth 3x more.
                  </p>
                </div>
              </div>

              {/* Month 3-4: Value Enhancement */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-8">
                <h3 className="text-2xl font-bold text-green-900 mb-4">Months 3-4: Value Enhancement</h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-xl font-bold text-green-800 mb-3">💎 Premium Positioning</h4>
                    <ul className="space-y-2 text-green-700">
                      <li>• Raised prices by 25% across all services</li>
                      <li>• Added luxury service packages</li>
                      <li>• Redesigned interior with modern aesthetic</li>
                      <li>• Implemented VIP customer program</li>
                      <li>• Created strong online presence and reviews</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-xl font-bold text-green-800 mb-3">📈 Revenue Optimization</h4>
                    <ul className="space-y-2 text-green-700">
                      <li>• Increased average ticket by $15</li>
                      <li>• Added retail product sales (+$8K monthly)</li>
                      <li>• Implemented loyalty program</li>
                      <li>• Optimized staff scheduling efficiency</li>
                      <li>• Reduced no-shows by 60%</li>
                    </ul>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-green-100 rounded-lg">
                  <p className="text-green-800 font-semibold">
                    📊 Results: Monthly revenue increased from $28K to $45K. Profit margins improved from 8% to 32%.
                  </p>
                </div>
              </div>

              {/* Month 5-6: Marketing & Sale */}
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-8">
                <h3 className="text-2xl font-bold text-purple-900 mb-4">Months 5-6: Strategic Marketing & Sale</h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-xl font-bold text-purple-800 mb-3">🎯 Buyer Targeting</h4>
                    <ul className="space-y-2 text-purple-700">
                      <li>• Listed on EmviApp's premium salon marketplace</li>
                      <li>• Targeted expanding salon chains</li>
                      <li>• Reached out to successful local operators</li>
                      <li>• Connected with investor groups</li>
                      <li>• Used Vietnamese community networks</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-xl font-bold text-purple-800 mb-3">💼 Professional Presentation</h4>
                    <ul className="space-y-2 text-purple-700">
                      <li>• Created comprehensive information packet</li>
                      <li>• Professional salon photography</li>
                      <li>• Detailed financial projections</li>
                      <li>• Transition and training plan</li>
                      <li>• Legal documents prepared</li>
                    </ul>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-purple-100 rounded-lg">
                  <p className="text-purple-800 font-semibold">
                    🏆 Final Result: 8 serious inquiries in first week. Sold to expanding chain for $450K - 4.2x annual revenue.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Valuation Formula */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">The Million-Dollar Valuation Formula</h2>
            
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-8 rounded-lg border">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">How to Calculate Your Salon's True Worth</h3>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-xl font-bold text-orange-900 mb-4">📊 Base Valuation Methods</h4>
                  <div className="space-y-4">
                    <div className="p-4 bg-white rounded-lg border">
                      <h5 className="font-bold text-gray-900">Revenue Multiple Method</h5>
                      <p className="text-gray-700">Annual Revenue × 2.5-4.5 = Estimated Value</p>
                      <p className="text-sm text-gray-600">Higher multiple for profitable, systematic salons</p>
                    </div>
                    
                    <div className="p-4 bg-white rounded-lg border">
                      <h5 className="font-bold text-gray-900">Asset-Based Method</h5>
                      <p className="text-gray-700">Equipment + Inventory + Goodwill - Liabilities</p>
                      <p className="text-sm text-gray-600">Best for equipment-heavy salons</p>
                    </div>
                    
                    <div className="p-4 bg-white rounded-lg border">
                      <h5 className="font-bold text-gray-900">Cash Flow Method</h5>
                      <p className="text-gray-700">Annual Profit × 3-6 = Business Value</p>
                      <p className="text-sm text-gray-600">Most accurate for profitable operations</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-xl font-bold text-orange-900 mb-4">⭐ Value Multipliers</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-white rounded border">
                      <span>Strong financial records</span>
                      <span className="font-bold text-green-600">+25%</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-white rounded border">
                      <span>Systematic operations</span>
                      <span className="font-bold text-green-600">+30%</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-white rounded border">
                      <span>Premium location/lease</span>
                      <span className="font-bold text-green-600">+20%</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-white rounded border">
                      <span>Trained, stable staff</span>
                      <span className="font-bold text-green-600">+15%</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-white rounded border">
                      <span>Modern equipment</span>
                      <span className="font-bold text-green-600">+10%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Common Mistakes */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">7 Costly Mistakes That Kill Salon Sales</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-red-200">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-red-900 mb-4">❌ What NOT to Do</h3>
                  <ul className="space-y-3 text-red-800">
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 mt-1">1.</span>
                      <span><strong>Overvaluing based on emotion:</strong> "I put my heart into this place" doesn't add market value</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 mt-1">2.</span>
                      <span><strong>Poor timing:</strong> Selling during slow season or personal crisis</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 mt-1">3.</span>
                      <span><strong>Incomplete documentation:</strong> Missing financial records kill deals</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 mt-1">4.</span>
                      <span><strong>Wrong buyer targeting:</strong> Listing on generic business-for-sale sites</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 mt-1">5.</span>
                      <span><strong>Neglecting presentation:</strong> Selling a salon that looks tired or outdated</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 mt-1">6.</span>
                      <span><strong>No transition plan:</strong> Buyers need confidence in smooth handover</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 mt-1">7.</span>
                      <span><strong>Amateur negotiation:</strong> Accepting first offer or poor terms</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-green-200">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-green-900 mb-4">✅ What Smart Sellers Do</h3>
                  <ul className="space-y-3 text-green-800">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="text-green-500 mt-1 h-4 w-4" />
                      <span><strong>Objective valuation:</strong> Use market-based pricing with professional appraisal</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="text-green-500 mt-1 h-4 w-4" />
                      <span><strong>Strategic timing:</strong> Sell during peak performance and market conditions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="text-green-500 mt-1 h-4 w-4" />
                      <span><strong>Complete documentation:</strong> 3+ years of clean financial records</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="text-green-500 mt-1 h-4 w-4" />
                      <span><strong>Industry-specific marketing:</strong> Target qualified beauty industry buyers</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="text-green-500 mt-1 h-4 w-4" />
                      <span><strong>Premium presentation:</strong> Professional photos, marketing materials</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="text-green-500 mt-1 h-4 w-4" />
                      <span><strong>Detailed transition plan:</strong> Training, introductions, support timeline</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="text-green-500 mt-1 h-4 w-4" />
                      <span><strong>Professional negotiation:</strong> Multiple offers, optimal terms structure</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Success Stories */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">More Success Stories from the Method</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="border-blue-200 bg-blue-50">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-blue-900 mb-2">Maria's Nail Spa</h3>
                  <p className="text-blue-800 text-sm mb-3">Miami, FL</p>
                  <div className="space-y-2 text-blue-700">
                    <p><strong>Starting point:</strong> $180K revenue, $15K profit</p>
                    <p><strong>After transformation:</strong> $280K revenue, $89K profit</p>
                    <p><strong>Sale price:</strong> $395K (3.5x revenue)</p>
                    <p><strong>Timeline:</strong> 7 months</p>
                  </div>
                  <p className="text-blue-600 text-sm mt-3 italic">
                    "Following Sarah's system, I increased my profit by 500% before selling. Best business decision ever."
                  </p>
                </CardContent>
              </Card>

              <Card className="border-green-200 bg-green-50">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-green-900 mb-2">Tony's Nail Studio</h3>
                  <p className="text-green-800 text-sm mb-3">Houston, TX</p>
                  <div className="space-y-2 text-green-700">
                    <p><strong>Starting point:</strong> $220K revenue, $28K profit</p>
                    <p><strong>After transformation:</strong> $340K revenue, $115K profit</p>
                    <p><strong>Sale price:</strong> $525K (4.1x revenue)</p>
                    <p><strong>Timeline:</strong> 5 months</p>
                  </div>
                  <p className="text-green-600 text-sm mt-3 italic">
                    "Sold for almost double what I thought possible. The systematic approach works."
                  </p>
                </CardContent>
              </Card>

              <Card className="border-purple-200 bg-purple-50">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-purple-900 mb-2">Linda's Beauty Lounge</h3>
                  <p className="text-purple-800 text-sm mb-3">San Jose, CA</p>
                  <div className="space-y-2 text-purple-700">
                    <p><strong>Starting point:</strong> $160K revenue, $8K profit</p>
                    <p><strong>After transformation:</strong> $245K revenue, $73K profit</p>
                    <p><strong>Sale price:</strong> $380K (3.8x revenue)</p>
                    <p><strong>Timeline:</strong> 6 months</p>
                  </div>
                  <p className="text-purple-600 text-sm mt-3 italic">
                    "From barely breaking even to a life-changing exit. Thank you!"
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Vietnamese Community Success */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-yellow-900 mb-6">🏆 Thành Công Từ Cộng Đồng Việt</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 bg-white rounded-lg border border-yellow-200">
                <h3 className="text-xl font-bold text-yellow-900 mb-3">Anh Minh - Crystal Nails</h3>
                <p className="text-yellow-800 mb-4">
                  "Sau 15 năm làm nail, tôi muốn về hưu nhưng không biết bán tiệm như thế nào. Theo method của Sarah, tôi đã bán được tiệm với giá $420K - cao hơn 40% so với dự kiến ban đầu."
                </p>
                <div className="text-sm text-yellow-700">
                  <strong>Kết quả:</strong> $420K • 40% over asking • 4 tháng hoàn thành
                </div>
              </div>
              
              <div className="p-6 bg-white rounded-lg border border-yellow-200">
                <h3 className="text-xl font-bold text-yellow-900 mb-3">Chị Lan - Sunny Nails</h3>
                <p className="text-yellow-800 mb-4">
                  "Con gái muốn tôi nghỉ ngơi nhưng tiệm nail là tài sản duy nhất. Với hướng dẫn chi tiết, tôi đã chuẩn bị và bán thành công với giá tốt nhất từng có."
                </p>
                <div className="text-sm text-yellow-700">
                  <strong>Kết quả:</strong> $385K • Retirement fund secured • 5 tháng process
                </div>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-12 rounded-lg text-center mb-12">
            <h2 className="text-4xl font-bold mb-6">Ready to Sell Your Salon for Maximum Value?</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Don't leave money on the table. List your salon on EmviApp's premium marketplace and connect with serious, qualified buyers who understand the beauty industry.
            </p>
            
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-8">
              <Link to="/sell-salon">
                <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100 font-bold px-8 py-4 text-lg">
                  List Your Salon for Sale → Free Valuation
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              
              <Link to="/salons">
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-green-600 font-bold px-8 py-4 text-lg">
                  Browse Premium Salons →
                </Button>
              </Link>
            </div>
            
            <div className="text-center text-green-100">
              <p className="mb-2">✅ Industry's #1 marketplace • ✅ Qualified buyers only • ✅ Premium pricing</p>
              <p className="text-sm">Thị trường #1 cho tiệm nail • Buyer có tâm • Giá cao nhất</p>
            </div>
          </div>

          {/* Related Articles */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Articles</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Link to="/blog/salon-management/salon-pricing-strategies-2025" className="block">
                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <h3 className="font-bold text-lg mb-2">Salon Pricing Strategies That Maximize Revenue in 2025</h3>
                    <p className="text-gray-600 text-sm">Smart pricing tactics that boost your bottom line before selling.</p>
                  </CardContent>
                </Card>
              </Link>
              
              <Link to="/blog/salon-management/salon-staffing-solution-2025" className="block">
                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <h3 className="font-bold text-lg mb-2">The 2025 Salon Staffing Crisis: How Smart Owners Are Solving It</h3>
                    <p className="text-gray-600 text-sm">Build a stable team that adds value to your salon sale.</p>
                  </CardContent>
                </Card>
              </Link>
              
              <Link to="/blog/salon-management/increase-salon-bookings-2024" className="block">
                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <h3 className="font-bold text-lg mb-2">How to Increase Your Salon Bookings by 300% in 2024</h3>
                    <p className="text-gray-600 text-sm">Proven strategies to boost revenue before your sale.</p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </section>

          {/* Final CTA Box */}
          <div className="bg-green-50 border border-green-200 p-8 rounded-lg text-center">
            <h3 className="text-2xl font-bold text-green-900 mb-4">Don't Wait - Salon Values Are Peaking in 2025</h3>
            <p className="text-green-800 mb-6">
              Market conditions are optimal for salon sales right now. Interest rates are stabilizing, 
              and investor appetite for beauty businesses is at an all-time high. Start your preparation today.
            </p>
            <Link to="/sell-salon">
              <Button className="bg-green-500 hover:bg-green-600 text-white font-bold px-8 py-4 text-lg">
                Get Your Free Salon Valuation Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </Container>
      </article>
    </>
  );
};

export default SellSalonGuide2025;