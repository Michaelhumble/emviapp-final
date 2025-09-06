import React from 'react';
import BaseSEO from '@/components/seo/BaseSEO';
import { buildArticleJsonLd, buildBreadcrumbJsonLd } from '@/components/seo/jsonld';
import { Button } from '@/components/ui/button';
import { ArrowRight, Star, MessageCircle, Gift, Smartphone, Mail, Users, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const FiveStarReviews = () => {
  const postData = {
    title: "How to Get More 5-Star Reviews for Your Salon (2025 Guide)",
    description: "Proven strategies to generate authentic 5-star reviews for your nail salon: timing techniques, follow-up systems, review request scripts, and reputation management tips.",
    author: "EmviApp Editorial Team",
    datePublished: "2025-01-20T10:00:00.000Z",
    dateModified: "2025-01-20T10:00:00.000Z",
    url: "https://www.emvi.app/blog/5-star-reviews",
    image: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
  };

  const breadcrumbData = [
    { name: "Home", url: "https://www.emvi.app" },
    { name: "Blog", url: "https://www.emvi.app/blog" },
    { name: "Marketing", url: "https://www.emvi.app/blog/category/marketing" },
    { name: postData.title, url: postData.url }
  ];

  return (
    <>
      <BaseSEO
        title={`${postData.title} | EmviApp`}
        description={postData.description}
        canonical="/blog/5-star-reviews"
        jsonLd={[
          buildArticleJsonLd(postData),
          buildBreadcrumbJsonLd(breadcrumbData)
        ]}
        type="article"
      />

      <article className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="relative mb-12">
          <img 
            src="https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
            alt="Happy salon client showing off beautiful manicured nails with satisfied expression"
            className="w-full h-96 object-cover rounded-2xl shadow-2xl"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-2xl"></div>
          <div className="absolute bottom-8 left-8 text-white">
            <div className="flex items-center gap-2 mb-4">
              <Star className="w-6 h-6 text-yellow-400" />
              <span className="text-lg font-semibold">Review Excellence</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
              How to Get More<br />
              <span className="text-yellow-400">5-Star Reviews</span>
            </h1>
            <p className="text-xl md:text-2xl opacity-90 max-w-2xl">
              Turn Happy Customers Into Raving Fans
            </p>
          </div>
        </div>

        {/* Introduction */}
        <div className="prose prose-lg max-w-none mb-16">
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-8 rounded-2xl mb-12 border-l-4 border-yellow-500">
            <p className="text-lg leading-relaxed text-gray-800 mb-6">
              <strong>93% of customers read online reviews before choosing a salon</strong>, and businesses with 4+ star ratings receive 3x more bookings than those with lower ratings. Yet most salon owners struggle to consistently generate positive reviews from their satisfied customers.
            </p>
            <p className="text-lg leading-relaxed text-gray-800 mb-6">
              The truth? Getting 5-star reviews isn't about begging or bribing customers. It's about creating such an exceptional experience that customers naturally want to share it—and then making it incredibly easy for them to do so.
            </p>
            <div className="bg-yellow-100 p-4 rounded-lg">
              <p className="text-yellow-800 font-semibold">
                📈 This guide will show you the exact systems successful salons use to generate 10-15 new 5-star reviews per month consistently.
              </p>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
            <CheckCircle className="w-8 h-8 text-green-500" />
            1. The Foundation: Creating Review-Worthy Experiences
          </h2>

          <div className="bg-white p-8 rounded-xl shadow-lg mb-8">
            <p className="text-lg text-gray-700 mb-6">
              Before asking for reviews, ensure every client leaves feeling genuinely delighted. Here's the experience framework that naturally leads to 5-star reviews:
            </p>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-green-600 mb-4">🌟 Pre-Service Excellence</h3>
                <ul className="text-gray-700 space-y-2">
                  <li>• Warm greeting within 30 seconds of arrival</li>
                  <li>• Offer beverage and comfortable seating</li>
                  <li>• Detailed consultation about preferences</li>
                  <li>• Clean, organized, and pleasant environment</li>
                  <li>• Clear explanation of services and pricing</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold text-blue-600 mb-4">✨ During Service Magic</h3>
                <ul className="text-gray-700 space-y-2">
                  <li>• Attentive but respectful conversation</li>
                  <li>• Precise, careful work with attention to detail</li>
                  <li>• Regular check-ins on comfort and satisfaction</li>
                  <li>• Professional techniques and high-quality products</li>
                  <li>• Going above and beyond when possible</li>
                </ul>
              </div>
            </div>

            <div className="mt-8 bg-green-50 p-6 rounded-lg">
              <h4 className="font-bold text-green-800 mb-3">🎯 The "WOW" Moment Strategy</h4>
              <p className="text-green-700 mb-3">
                Every service should include at least one unexpected positive surprise. This could be:
              </p>
              <ul className="text-green-700 space-y-1">
                <li>• A complimentary nail art accent</li>
                <li>• Hand massage with premium lotion</li>
                <li>• Take-home nail care kit</li>
                <li>• Complimentary touch-up within one week</li>
              </ul>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
            <MessageCircle className="w-8 h-8 text-purple-500" />
            2. The Perfect Review Request Timing
          </h2>

          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-8 rounded-2xl mb-8">
            <h3 className="text-2xl font-bold text-purple-700 mb-6">⏰ The 3-Touch Review System</h3>
            
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg border-l-4 border-purple-400">
                <h4 className="font-bold text-purple-700 mb-3">Touch 1: Immediate In-Person (Right After Service)</h4>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-gray-700 mb-3"><strong>What to Say:</strong></p>
                    <blockquote className="italic text-gray-600 border-l-2 border-gray-300 pl-4">
                      "I'm so happy you love your nails! If you're pleased with your experience today, would you mind sharing a quick review online? It would mean the world to our team."
                    </blockquote>
                  </div>
                  <div>
                    <p className="text-gray-700 mb-3"><strong>Success Rate:</strong></p>
                    <div className="text-2xl font-bold text-purple-600">15-20%</div>
                    <p className="text-sm text-gray-600">But captures the most enthusiastic reviews</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg border-l-4 border-blue-400">
                <h4 className="font-bold text-blue-700 mb-3">Touch 2: Follow-up Text (2-4 hours later)</h4>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-gray-700 mb-3"><strong>Sample Message:</strong></p>
                    <blockquote className="italic text-gray-600 border-l-2 border-gray-300 pl-4">
                      "Hi [Name]! Thanks for visiting us today. We hope you're still loving your beautiful nails! 💅 If you have a moment, we'd be grateful for a quick review: [link]"
                    </blockquote>
                  </div>
                  <div>
                    <p className="text-gray-700 mb-3"><strong>Success Rate:</strong></p>
                    <div className="text-2xl font-bold text-blue-600">25-30%</div>
                    <p className="text-sm text-gray-600">Catches clients while experience is fresh</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg border-l-4 border-green-400">
                <h4 className="font-bold text-green-700 mb-3">Touch 3: Email Follow-up (24-48 hours later)</h4>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-gray-700 mb-3"><strong>Email Subject:</strong></p>
                    <p className="font-medium text-gray-800">"How are your beautiful nails holding up?"</p>
                    <p className="text-gray-700 mt-3 mb-3"><strong>Content:</strong></p>
                    <p className="text-gray-600 text-sm">Nail care tips + gentle review request</p>
                  </div>
                  <div>
                    <p className="text-gray-700 mb-3"><strong>Success Rate:</strong></p>
                    <div className="text-2xl font-bold text-green-600">10-15%</div>
                    <p className="text-sm text-gray-600">Lower rate but high-quality, detailed reviews</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 bg-purple-100 p-4 rounded-lg">
              <p className="text-purple-800 font-semibold">
                💡 Combined Success Rate: 50-65% of satisfied customers will leave a review using this system
              </p>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
            <Smartphone className="w-8 h-8 text-blue-500" />
            3. Making It Super Easy: The Technology Edge
          </h2>

          <div className="bg-white p-8 rounded-xl shadow-lg mb-8">
            <h3 className="text-2xl font-bold text-blue-600 mb-6">📱 Remove Every Friction Point</h3>
            
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h4 className="font-bold text-gray-800 mb-3">🔗 Direct Review Links</h4>
                <p className="text-gray-700 mb-4">Create shortened URLs that take customers directly to your review page:</p>
                <ul className="text-gray-700 space-y-2">
                  <li>• Google: bit.ly/YourSalon-Google</li>
                  <li>• Yelp: bit.ly/YourSalon-Yelp</li>
                  <li>• Facebook: bit.ly/YourSalon-FB</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-gray-800 mb-3">📱 QR Code Magic</h4>
                <p className="text-gray-700 mb-4">Place QR codes linking to reviews in strategic locations:</p>
                <ul className="text-gray-700 space-y-2">
                  <li>• At each nail station</li>
                  <li>• On business cards</li>
                  <li>• In the waiting area</li>
                  <li>• On receipt receipts</li>
                </ul>
              </div>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg mb-6">
              <h4 className="font-bold text-blue-800 mb-3">🚀 Pro Tech Tips</h4>
              <ul className="text-blue-700 space-y-2">
                <li>• Use tablet at checkout for immediate review requests</li>
                <li>• Set up automated SMS campaigns with review links</li>
                <li>• Create a "Review Wall" showcasing customer photos</li>
                <li>• Use review management software to track and respond</li>
              </ul>
            </div>

            <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-6 rounded-lg">
              <p className="text-blue-800 font-semibold mb-3">🎯 EmviApp Integration Advantage:</p>
              <p className="text-gray-700">
                Salons using <Link to="/salons" className="text-blue-600 hover:underline">EmviApp's platform</Link> can automatically send review requests to satisfied customers, track response rates, and manage their online reputation from one dashboard.
              </p>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
            <Gift className="w-8 h-8 text-pink-500" />
            4. Incentive Strategies That Work (Ethically)
          </h2>

          <div className="bg-gradient-to-r from-pink-50 to-red-50 p-8 rounded-2xl mb-8">
            <div className="bg-red-100 p-4 rounded-lg mb-6">
              <p className="text-red-800 font-semibold">
                ⚠️ Important: Never offer direct payment for reviews. Focus on reciprocal value that benefits the customer experience.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-pink-600 mb-4">✅ Ethical Incentive Ideas</h3>
                <ul className="text-gray-700 space-y-3">
                  <li><strong>Loyalty Program Points:</strong> "Earn 50 points for each review"</li>
                  <li><strong>Service Upgrades:</strong> "Complimentary nail art for reviewers"</li>
                  <li><strong>Entry into Contests:</strong> "Monthly giveaway for review submissions"</li>
                  <li><strong>Referral Rewards:</strong> "Discount for each friend you refer"</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold text-red-600 mb-4">❌ What to Avoid</h3>
                <ul className="text-gray-700 space-y-3">
                  <li><strong>Cash payments:</strong> Direct money for reviews</li>
                  <li><strong>Fake reviews:</strong> Writing reviews yourself</li>
                  <li><strong>Review swapping:</strong> Trading reviews with other businesses</li>
                  <li><strong>Pressure tactics:</strong> Making reviews mandatory</li>
                </ul>
              </div>
            </div>

            <div className="mt-8 bg-white p-6 rounded-lg">
              <h4 className="font-bold text-pink-800 mb-3">🎁 The "Thank You Experience" Approach</h4>
              <p className="text-gray-700 mb-4">
                Instead of paying for reviews, create a "reviewer appreciation" program:
              </p>
              <ul className="text-gray-700 space-y-2">
                <li>• Send hand-written thank you notes to reviewers</li>
                <li>• Feature customer photos on social media (with permission)</li>
                <li>• Create a "VIP reviewer" loyalty tier with special perks</li>
                <li>• Invite frequent reviewers to exclusive events</li>
              </ul>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
            <Mail className="w-8 h-8 text-orange-500" />
            5. Handling Negative Reviews Like a Pro
          </h2>

          <div className="bg-white p-8 rounded-xl shadow-lg mb-8">
            <h3 className="text-2xl font-bold text-orange-600 mb-6">🛡️ The HEAR Method for Negative Reviews</h3>
            
            <div className="space-y-6">
              <div className="border-l-4 border-orange-400 pl-6">
                <h4 className="font-bold text-orange-700 mb-2">H - Halt and Take a Breath</h4>
                <p className="text-gray-700">Don't respond immediately when emotions are high. Wait 24 hours to craft a thoughtful response.</p>
              </div>
              
              <div className="border-l-4 border-blue-400 pl-6">
                <h4 className="font-bold text-blue-700 mb-2">E - Empathize and Acknowledge</h4>
                <p className="text-gray-700">Show genuine understanding of their frustration, even if you disagree with their perspective.</p>
              </div>
              
              <div className="border-l-4 border-green-400 pl-6">
                <h4 className="font-bold text-green-700 mb-2">A - Apologize and Take Action</h4>
                <p className="text-gray-700">Offer a sincere apology for their experience and outline concrete steps to resolve the issue.</p>
              </div>
              
              <div className="border-l-4 border-purple-400 pl-6">
                <h4 className="font-bold text-purple-700 mb-2">R - Resolve Privately</h4>
                <p className="text-gray-700">Move the conversation offline to find a mutually satisfactory solution.</p>
              </div>
            </div>

            <div className="mt-8 bg-orange-50 p-6 rounded-lg">
              <h4 className="font-bold text-orange-800 mb-3">📝 Sample Negative Review Response</h4>
              <blockquote className="italic text-gray-700 border-l-2 border-orange-300 pl-4">
                "Thank you for taking the time to share your feedback, [Name]. I'm truly sorry your experience didn't meet our usual standards. This is not the level of service we strive for, and I'd love the opportunity to make this right. Please contact me directly at [phone/email] so we can discuss how to resolve this situation. - [Manager Name]"
              </blockquote>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
            <Users className="w-8 h-8 text-green-500" />
            6. Advanced Review Generation Strategies
          </h2>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-bold text-green-600 mb-4">🎯 Segment Your Approach</h3>
              <ul className="text-gray-700 space-y-3">
                <li><strong>First-time customers:</strong> Focus on service quality, ask for review after 2-3 visits</li>
                <li><strong>Regular customers:</strong> Emphasize relationship, ask for detailed reviews</li>
                <li><strong>VIP customers:</strong> Request reviews during special occasions or events</li>
                <li><strong>Influencers/Bloggers:</strong> Provide exceptional service, natural reviews will follow</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-bold text-blue-600 mb-4">📈 Track and Optimize</h3>
              <ul className="text-gray-700 space-y-3">
                <li><strong>Review velocity:</strong> Track reviews per month and identify trends</li>
                <li><strong>Platform performance:</strong> See which platforms generate most reviews</li>
                <li><strong>Staff performance:</strong> Identify which team members generate most reviews</li>
                <li><strong>Service correlation:</strong> Track which services lead to best reviews</li>
              </ul>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-8 rounded-2xl mb-8">
            <h3 className="text-2xl font-bold text-green-700 mb-6">📊 Monthly Review Goals (Realistic Targets)</h3>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">5-8</div>
                <div className="text-gray-700 font-medium">Small Salon</div>
                <div className="text-sm text-gray-600 mt-2">1-3 artists, 200-400 monthly clients</div>
              </div>
              <div className="bg-white p-6 rounded-lg text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">10-15</div>
                <div className="text-gray-700 font-medium">Medium Salon</div>
                <div className="text-sm text-gray-600 mt-2">4-6 artists, 500-800 monthly clients</div>
              </div>
              <div className="bg-white p-6 rounded-lg text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">20-30</div>
                <div className="text-gray-700 font-medium">Large Salon</div>
                <div className="text-sm text-gray-600 mt-2">7+ artists, 1000+ monthly clients</div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white p-8 rounded-2xl text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Ready to Build Your 5-Star Reputation?</h2>
            <p className="text-xl mb-8 opacity-90">
              Implement these strategies and watch your online reputation soar
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/salons" className="inline-flex items-center gap-2 bg-white text-orange-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors">
                <span className="font-semibold">List Your Salon</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/blog/nail-salon-growth-2025" className="inline-flex items-center gap-2 bg-orange-500 text-white px-8 py-4 rounded-lg hover:bg-orange-400 transition-colors border-2 border-white/20">
                <span className="font-semibold">Complete Growth Guide</span>
                <CheckCircle className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Back to main guide */}
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-8 rounded-2xl">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-orange-700 mb-4">Part of Our Complete Salon Growth Series</h3>
              <p className="text-lg text-gray-700 mb-6">
                This review strategy is one piece of building a thriving salon business. Get the complete blueprint:
              </p>
              <Link to="/blog/nail-salon-growth-2025" className="inline-flex items-center gap-2 bg-orange-600 text-white px-8 py-4 rounded-lg hover:bg-orange-700 transition-colors">
                <span className="font-semibold">Read the Complete Growth Guide</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Other articles in series */}
          <div className="mt-12 border-t pt-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Continue the Growth Series</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <Link to="/blog/hiring-nail-artists" className="block p-4 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all group">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-5 h-5 text-purple-600" />
                  <h4 className="font-bold text-gray-800 group-hover:text-purple-600 text-sm">Hiring Artists</h4>
                </div>
                <p className="text-gray-600 text-sm">Find and retain top talent</p>
              </Link>

              <Link to="/blog/salon-marketing-2025" className="block p-4 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all group">
                <div className="flex items-center gap-2 mb-2">
                  <Smartphone className="w-5 h-5 text-green-600" />
                  <h4 className="font-bold text-gray-800 group-hover:text-green-600 text-sm">Marketing 2025</h4>
                </div>
                <p className="text-gray-600 text-sm">Cut-through marketing tactics</p>
              </Link>

              <Link to="/blog/nail-artists-best-jobs" className="block p-4 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all group">
                <div className="flex items-center gap-2 mb-2">
                  <Star className="w-5 h-5 text-blue-600" />
                  <h4 className="font-bold text-gray-800 group-hover:text-blue-600 text-sm">Best Artist Jobs</h4>
                </div>
                <p className="text-gray-600 text-sm">Career growth opportunities</p>
              </Link>
            </div>
          </div>
        </div>
      </article>
    </>
  );
};

export default FiveStarReviews;
