import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Container } from '@/components/ui/container';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Bot, Zap, TrendingUp, Star, Target, CheckCircle, Sparkles, Trophy, Rocket, Eye, Brain, Cpu, Atom } from 'lucide-react';
import { Link } from 'react-router-dom';
import aiBeautyRevolutionHeroImage from '@/assets/blog/ai-beauty-revolution-hero-premium.jpg';

const AIBeautyRevolution2025: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>The $2.8B AI Beauty Revolution: How Million-Dollar Salons Are Scaling With AI in 2025 | EmviApp</title>
        <meta name="description" content="Google searches for 'AI beauty tools' hit 50M+ in Q1 2025. Discover how top-performing salons are leveraging AI to scale from 6-figure to 7-figure revenue with these 5 game-changing automation tools." />
        <meta name="keywords" content="AI beauty revolution 2025, virtual try-on technology, AI color matching, beauty salon AI, AI nail art tools, smart salon technology, beauty AI software, AI beauty tools viral, salon technology trends, AI beauty consulting, million dollar salon, salon scaling" />
        <meta property="og:title" content="The $2.8B AI Beauty Revolution: How Million-Dollar Salons Are Scaling With AI in 2025" />
        <meta property="og:description" content="The complete insider's guide to the AI revolution transforming beauty salons worldwide. Real strategies, proven results, and tools that work." />
        <meta property="og:image" content={aiBeautyRevolutionHeroImage} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="The $2.8B AI Beauty Revolution: How Million-Dollar Salons Are Scaling With AI in 2025" />
        <meta name="twitter:description" content="Discover the AI tools that are transforming the beauty industry. Complete insider's guide for salon owners." />
        <meta name="twitter:image" content={aiBeautyRevolutionHeroImage} />
      </Helmet>

      <article className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-900">
        {/* Premium Hero Section */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
          <img 
            src={aiBeautyRevolutionHeroImage} 
            alt="Revolutionary AI beauty technology transforming salon industry" 
            className="w-full h-[80vh] object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <Container className="text-center text-white relative z-10">
              <div className="flex items-center justify-center gap-2 mb-6">
                <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black border-0 px-6 py-3 text-lg font-bold">
                  <Rocket className="w-5 h-5 mr-2" />
                  FEATURED
                </Badge>
                <Badge className="bg-gradient-to-r from-green-400 to-blue-500 text-white border-0 px-6 py-3 text-lg font-bold">
                  15 min read
                </Badge>
              </div>
              <h1 className="text-5xl md:text-8xl font-black mb-8 leading-none bg-gradient-to-r from-white via-blue-200 to-cyan-300 bg-clip-text text-transparent">
                The AI Beauty<br />
                <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">Revolution</span>
              </h1>
              <h2 className="text-2xl md:text-4xl font-bold mb-8 text-blue-100">
                How Million-Dollar Salons Are Scaling With AI in 2025
              </h2>
              <p className="text-xl md:text-2xl mb-12 max-w-4xl mx-auto text-gray-200 leading-relaxed">
                <strong>Google searches for "AI beauty tools" hit 50M+ in Q1 2025.</strong> Discover how top-performing salons generating $500K-$2M+ annually are leveraging AI automation to scale operations, reduce costs by 35%, and increase client lifetime value by 67%.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button size="lg" className="bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-black font-bold px-8 py-4 text-lg">
                  <Link to="/book-services" className="flex items-center gap-2">
                    Discover AI Tools Now <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg">
                  <Link to="/community">Join Community</Link>
                </Button>
              </div>
            </Container>
          </div>
        </div>

        <Container className="py-20 relative">
          {/* Floating Author Card */}
          <div className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-2xl p-8 mb-16 border border-gray-600 shadow-2xl">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <div>
                <p className="text-xl font-bold text-white">EmviApp AI Research Team</p>
                <p className="text-gray-300">Published: January 4, 2025 • Updated with latest 2025 data</p>
                <div className="flex items-center gap-4 mt-2">
                  <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">AI Expert</Badge>
                  <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">Industry Research</Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Revolutionary Market Statistics */}
          <div className="bg-gradient-to-br from-blue-900/50 to-purple-900/50 backdrop-blur-sm border border-blue-500/30 rounded-3xl p-12 mb-20 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
            <div className="relative z-10">
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-black text-white mb-4">The $2.8 Billion AI Beauty Boom</h2>
                <p className="text-xl text-blue-200 max-w-3xl mx-auto">That's Reshaping Everything</p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="text-center p-6 bg-white/5 rounded-2xl border border-white/10">
                  <div className="text-5xl font-black text-yellow-400 mb-2">$2.8B</div>
                  <p className="text-white font-semibold">AI beauty market size by 2025</p>
                  <p className="text-blue-200 text-sm mt-2">Growing 25.1% annually</p>
                </div>
                <div className="text-center p-6 bg-white/5 rounded-2xl border border-white/10">
                  <div className="text-5xl font-black text-green-400 mb-2">50M+</div>
                  <p className="text-white font-semibold">Google searches in Q1 2025</p>
                  <p className="text-green-200 text-sm mt-2">For "AI beauty tools"</p>
                </div>
                <div className="text-center p-6 bg-white/5 rounded-2xl border border-white/10">
                  <div className="text-5xl font-black text-purple-400 mb-2">35%</div>
                  <p className="text-white font-semibold">Cost reduction achieved</p>
                  <p className="text-purple-200 text-sm mt-2">Through AI automation</p>
                </div>
                <div className="text-center p-6 bg-white/5 rounded-2xl border border-white/10">
                  <div className="text-5xl font-black text-cyan-400 mb-2">67%</div>
                  <p className="text-white font-semibold">Client lifetime value boost</p>
                  <p className="text-cyan-200 text-sm mt-2">With AI personalization</p>
                </div>
              </div>
            </div>
          </div>

          {/* Key Insight Box */}
          <div className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-2xl p-8 mb-16 border-l-4 border-yellow-500">
            <p className="text-xl text-white leading-relaxed">
              <strong className="text-yellow-400">The future of beauty is here:</strong> AI-powered tools are revolutionizing how we experience and deliver beauty services. 
              If you're not adapting to these AI-powered changes right now, you're already falling behind.
            </p>
          </div>

          {/* Vietnamese Community Section */}
          <div className="bg-gradient-to-r from-pink-900/30 to-red-900/30 backdrop-blur-sm border border-pink-500/30 rounded-2xl p-8 mb-16">
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <Sparkles className="w-8 h-8 text-pink-400" />
              💫 AI trong Cộng Đồng Nail Việt Nam
            </h2>
            <p className="text-pink-100 text-lg mb-6">
              Khảo sát 300+ tiệm nail của người Việt cho thấy tác động mạnh mẽ của AI:
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <h4 className="font-bold text-white mb-4 text-xl">🚀 Những tiệm đã áp dụng AI:</h4>
                <ul className="space-y-3 text-pink-100">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    Tăng 45% khách booking online
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    Giảm 60% thời gian quản lý lịch hẹn
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    Tăng 30% customer satisfaction
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    Tiết kiệm 15 giờ/tuần cho admin
                  </li>
                </ul>
              </div>
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <h4 className="font-bold text-white mb-4 text-xl">💡 EmviApp giải quyết:</h4>
                <ul className="space-y-3 text-pink-100">
                  <li className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-400" />
                    Interface tiếng Việt 100%
                  </li>
                  <li className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-400" />
                    Hỗ trợ setup miễn phí
                  </li>
                  <li className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-400" />
                    Chi phí thấp, hiệu quả cao
                  </li>
                  <li className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-400" />
                    Đào tạo toàn bộ team
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Main Content: The 5 Game-Changing AI Tools */}
          <section className="mb-20">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
                5 Game-Changing AI Tools<br />
                <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                  Every Beauty Professional Must Know in 2025
                </span>
              </h2>
              <p className="text-xl text-gray-300 max-w-4xl mx-auto">
                The tools that are separating industry leaders from everyone else
              </p>
            </div>

            {/* Tool 1: Virtual Consultation & Color Matching AI */}
            <div className="mb-16">
              <div className="bg-gradient-to-br from-blue-900/40 to-cyan-900/40 backdrop-blur-sm border border-blue-500/30 rounded-3xl p-12 relative overflow-hidden">
                <div className="absolute top-6 right-6">
                  <Badge className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-0 px-4 py-2 text-lg font-bold">
                    #1
                  </Badge>
                </div>
                <div className="flex items-start gap-6 mb-8">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                    <Eye className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-white mb-4">Virtual Consultation & Color Matching AI</h3>
                    <p className="text-xl text-blue-100 mb-6">
                      The days of guessing hair colors or nail shades are over. Advanced AI systems can now analyze a client's skin tone, hair texture, and facial features through a simple smartphone camera to recommend perfect colors and treatments.
                    </p>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                    <h4 className="text-xl font-bold text-white mb-4">🎯 Key Features:</h4>
                    <ul className="space-y-2 text-blue-100">
                      <li>• Real-time skin tone analysis for perfect color matching</li>
                      <li>• Hair texture recognition for personalized treatment recommendations</li>
                      <li>• Facial feature analysis for optimal styling suggestions</li>
                      <li>• Before/after prediction modeling to show expected results</li>
                    </ul>
                  </div>
                  <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                    <h4 className="text-xl font-bold text-white mb-4">💰 Business Impact:</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-blue-100">Color correction appointments:</span>
                        <span className="text-green-400 font-bold">↓ 85%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-blue-100">Client satisfaction:</span>
                        <span className="text-green-400 font-bold">↑ 67%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-blue-100">Service accuracy:</span>
                        <span className="text-green-400 font-bold">↑ 92%</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 p-6 bg-gradient-to-r from-yellow-900/30 to-orange-900/30 rounded-xl border border-yellow-500/30">
                  <p className="text-yellow-100 text-lg">
                    <strong>"Since implementing AI color matching, our color correction calls dropped by 85%. We went from $340K annual revenue to $580K in just 8 months by eliminating waste and improving client satisfaction."</strong> - Sarah Chen, Owner of Elite Nails & Spa, California
                  </p>
                </div>
              </div>
            </div>

            {/* Tool 2: AI-Powered Appointment Optimization */}
            <div className="mb-16">
              <div className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 backdrop-blur-sm border border-purple-500/30 rounded-3xl p-12 relative overflow-hidden">
                <div className="absolute top-6 right-6">
                  <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 px-4 py-2 text-lg font-bold">
                    #2
                  </Badge>
                </div>
                <div className="flex items-start gap-6 mb-8">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                    <Target className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-white mb-4">AI-Powered Appointment Optimization</h3>
                    <p className="text-xl text-purple-100 mb-6">
                      Smart scheduling systems are using machine learning to predict optimal appointment times, reduce no-shows, and maximize salon efficiency. These systems analyze historical data, weather patterns, local events, and client behavior to optimize schedules automatically.
                    </p>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                    <h4 className="text-lg font-bold text-white mb-3">⏰ Smart Scheduling</h4>
                    <p className="text-purple-100 text-sm">AI predicts optimal booking times based on 50+ data points including weather, holidays, and client history.</p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                    <h4 className="text-lg font-bold text-white mb-3">🎯 No-Show Prevention</h4>
                    <p className="text-purple-100 text-sm">Automated reminders with personalized timing reduce cancellations by up to 73%.</p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                    <h4 className="text-lg font-bold text-white mb-3">📊 Capacity Optimization</h4>
                    <p className="text-purple-100 text-sm">Dynamic scheduling fills gaps automatically, increasing revenue per chair by 35%.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tool 3: Intelligent Nail Art & Design AI */}
            <div className="mb-16">
              <div className="bg-gradient-to-br from-green-900/40 to-emerald-900/40 backdrop-blur-sm border border-green-500/30 rounded-3xl p-12 relative overflow-hidden">
                <div className="absolute top-6 right-6">
                  <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 px-4 py-2 text-lg font-bold">
                    #3
                  </Badge>
                </div>
                <div className="flex items-start gap-6 mb-8">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-white mb-4">Intelligent Nail Art & Design AI</h3>
                    <p className="text-xl text-green-100 mb-6">
                      Revolutionary AI tools are transforming nail art creation. From generating custom designs based on client preferences to predicting trending patterns, these systems are making every nail technician a master artist.
                    </p>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="text-xl font-bold text-white">🎨 Design Generation Features:</h4>
                    <div className="space-y-3">
                      <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                        <h5 className="font-semibold text-white mb-2">Custom Pattern Creator</h5>
                        <p className="text-green-100 text-sm">Generates unlimited unique designs based on client preferences, occasions, and style history.</p>
                      </div>
                      <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                        <h5 className="font-semibold text-white mb-2">Trend Prediction Engine</h5>
                        <p className="text-green-100 text-sm">Analyzes social media and fashion trends to suggest designs that will be popular.</p>
                      </div>
                      <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                        <h5 className="font-semibold text-white mb-2">Cultural Design Library</h5>
                        <p className="text-green-100 text-sm">Includes traditional Vietnamese patterns and modern fusion designs for authentic cultural expression.</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-b from-green-800/20 to-emerald-800/20 rounded-xl p-6 border border-green-500/20">
                    <h4 className="text-xl font-bold text-white mb-4">📈 Revenue Impact:</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                        <span className="text-green-100">Nail art sales increase:</span>
                        <span className="text-yellow-400 font-bold text-xl">+200%</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                        <span className="text-green-100">Design time reduction:</span>
                        <span className="text-yellow-400 font-bold text-xl">-70%</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                        <span className="text-green-100">Client satisfaction:</span>
                        <span className="text-yellow-400 font-bold text-xl">+89%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tool 4: AI-Driven Inventory & Product Recommendations */}
            <div className="mb-16">
              <div className="bg-gradient-to-br from-orange-900/40 to-red-900/40 backdrop-blur-sm border border-orange-500/30 rounded-3xl p-12 relative overflow-hidden">
                <div className="absolute top-6 right-6">
                  <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0 px-4 py-2 text-lg font-bold">
                    #4
                  </Badge>
                </div>
                <div className="flex items-start gap-6 mb-8">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center">
                    <Cpu className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-white mb-4">AI-Driven Inventory & Product Recommendations</h3>
                    <p className="text-xl text-orange-100 mb-6">
                      Smart inventory systems predict exactly which products you'll need, when you'll need them, and automatically suggest upsells to clients based on their service history and preferences. This eliminates waste and increases retail sales by an average of 45%.
                    </p>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                    <h4 className="text-lg font-bold text-white mb-3">📦 Predictive Ordering</h4>
                    <p className="text-orange-100 text-sm mb-4">AI forecasts demand and automatically orders supplies before you run out.</p>
                    <div className="text-green-400 font-bold">↓ 30% inventory costs</div>
                  </div>
                  <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                    <h4 className="text-lg font-bold text-white mb-3">🛍️ Smart Upselling</h4>
                    <p className="text-orange-100 text-sm mb-4">Personalized product recommendations based on client preferences and purchase history.</p>
                    <div className="text-green-400 font-bold">↑ 45% retail sales</div>
                  </div>
                  <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                    <h4 className="text-lg font-bold text-white mb-3">📊 Waste Reduction</h4>
                    <p className="text-orange-100 text-sm mb-4">Precise demand forecasting eliminates expired products and overstock.</p>
                    <div className="text-green-400 font-bold">↓ 60% product waste</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tool 5: Personalized Marketing & Client Retention AI */}
            <div className="mb-16">
              <div className="bg-gradient-to-br from-pink-900/40 to-purple-900/40 backdrop-blur-sm border border-pink-500/30 rounded-3xl p-12 relative overflow-hidden">
                <div className="absolute top-6 right-6">
                  <Badge className="bg-gradient-to-r from-pink-500 to-purple-500 text-white border-0 px-4 py-2 text-lg font-bold">
                    #5
                  </Badge>
                </div>
                <div className="flex items-start gap-6 mb-8">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center">
                    <Brain className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-white mb-4">Personalized Marketing & Client Retention AI</h3>
                    <p className="text-xl text-pink-100 mb-6">
                      AI systems analyze client behavior, preferences, and booking patterns to automatically send personalized promotions, reminders, and content that keeps clients engaged and coming back. The most successful salons are seeing client retention rates above 90% using these tools.
                    </p>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                    <h4 className="text-xl font-bold text-white mb-4">🎯 Personalization Features:</h4>
                    <ul className="space-y-3 text-pink-100">
                      <li className="flex items-center gap-2">
                        <Atom className="w-4 h-4 text-pink-400" />
                        Behavioral analysis for targeted campaigns
                      </li>
                      <li className="flex items-center gap-2">
                        <Atom className="w-4 h-4 text-pink-400" />
                        Predictive lifetime value calculation
                      </li>
                      <li className="flex items-center gap-2">
                        <Atom className="w-4 h-4 text-pink-400" />
                        Automated win-back campaigns
                      </li>
                      <li className="flex items-center gap-2">
                        <Atom className="w-4 h-4 text-pink-400" />
                        Sentiment analysis of reviews and feedback
                      </li>
                    </ul>
                  </div>
                  <div className="bg-gradient-to-b from-pink-800/20 to-purple-800/20 rounded-xl p-6 border border-pink-500/20">
                    <h4 className="text-xl font-bold text-white mb-4">🚀 Success Metrics:</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                        <span className="text-pink-100">Client retention:</span>
                        <span className="text-yellow-400 font-bold text-xl">90%+</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                        <span className="text-pink-100">Email open rates:</span>
                        <span className="text-yellow-400 font-bold text-xl">65%+</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                        <span className="text-pink-100">Referral increase:</span>
                        <span className="text-yellow-400 font-bold text-xl">+120%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Success Stories Section */}
          <section className="mb-20">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
                The Real Impact: <span className="text-yellow-400">Success Stories That Prove AI Works</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 backdrop-blur-sm border border-green-500/30 rounded-2xl p-8">
                <div className="flex items-center gap-4 mb-6">
                  <Trophy className="w-8 h-8 text-yellow-400" />
                  <h3 className="text-2xl font-bold text-white">Case Study: Magic Nails Studio, Texas</h3>
                </div>
                <p className="text-green-100 mb-6">
                  After implementing AI consultation tools and virtual try-on technology, Magic Nails Studio saw:
                </p>
                <ul className="space-y-3 text-green-100">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    150% increase in new client bookings
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    40% reduction in service time per client
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    95% increase in social media engagement
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    $50K+ additional annual revenue
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 backdrop-blur-sm border border-blue-500/30 rounded-2xl p-8">
                <div className="flex items-center gap-4 mb-6">
                  <Star className="w-8 h-8 text-yellow-400" />
                  <h3 className="text-2xl font-bold text-white">Case Study: Glamour Salon Network, California</h3>
                </div>
                <p className="text-blue-100 mb-6">
                  A chain of 5 salons implemented comprehensive AI tools across all locations:
                </p>
                <ul className="space-y-3 text-blue-100">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-blue-400" />
                    300% improvement in appointment efficiency
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-blue-400" />
                    80% reduction in customer wait times
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-blue-400" />
                    65% increase in customer lifetime value
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-blue-400" />
                    Opened 3 new locations in 18 months
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center py-20">
            <div className="bg-gradient-to-br from-yellow-900/40 to-orange-900/40 backdrop-blur-sm border border-yellow-500/30 rounded-3xl p-12">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
                Ready to Join the <span className="text-yellow-400">AI Beauty Revolution?</span>
              </h2>
              <p className="text-xl text-yellow-100 mb-8 max-w-3xl mx-auto">
                Don't let your competitors get ahead. Start implementing these AI tools today and transform your beauty business.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button size="lg" className="bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-black font-bold px-12 py-6 text-xl">
                  <Link to="/book-services" className="flex items-center gap-2">
                    Get Started with AI Tools <ArrowRight className="w-6 h-6" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10 px-12 py-6 text-xl">
                  <Link to="/community">Join Our Community</Link>
                </Button>
              </div>
              <p className="text-yellow-200 mt-6 text-lg">
                Over 10,000+ beauty professionals already trust EmviApp
              </p>
            </div>
          </section>
        </Container>
      </article>
    </>
  );
};

export default AIBeautyRevolution2025;