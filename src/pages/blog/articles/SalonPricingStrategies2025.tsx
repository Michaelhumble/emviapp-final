import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, DollarSign, TrendingUp, Calculator, Target, Award, BarChart3, CheckCircle } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import DynamicSEO from '@/components/seo/DynamicSEO';
import BlogImage from '@/components/blog/BlogImage';
import BlogArticleActions from '@/components/blog/BlogArticleActions';
import AuthorAvatar from '@/components/blog/AuthorAvatar';

const SalonPricingStrategies2025 = () => {
  const registryArticle = getArticleBySlug('salon-pricing-strategies-2025');
  if (!registryArticle) return <div>Article not found</div>;

  const article = {
    title: "Salon Pricing Strategies That Maximize Profit in 2025",
    description: "Master profitable salon pricing with proven strategies that increase revenue by 30%+. Learn value-based pricing, premium positioning, and psychological pricing techniques.",
    author: "EmviApp Editorial Team",
    publishedAt: "July 1, 2025",
    readTime: "15 min read",
    category: "Business Strategy",
    tags: ["Pricing Strategy", "Profit Maximization", "Business Growth", "Revenue", "Value Pricing", "Salon Management"],
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
  };

  const faqData = [
    {
      question: "How often should salons review and adjust their pricing?",
      answer: "Review pricing quarterly and adjust annually. Monitor competitor pricing, track profit margins, and assess client feedback regularly. Major adjustments should be planned 6-8 weeks in advance with proper client communication."
    },
    {
      question: "What's the best way to communicate price increases to existing clients?",
      answer: "Give 4-6 weeks notice, explain the value improvements they'll receive, and offer grandfathered rates for their next appointment. Focus on enhanced experience and quality rather than just costs."
    },
    {
      question: "Should new salons start with lower prices to attract clients?",
      answer: "No. Starting too low creates a 'discount' brand perception that's hard to change. Instead, offer exceptional value at fair market rates and focus on building reputation through quality service."
    }
  ];

  return (
    <>
      <DynamicSEO
        title={article.title}
        description={article.description}
        url="https://emviapp.com/blog/business/salon-pricing-strategies-2025"
        type="article"
        image={article.image}
        author={article.author}
        publishedTime="2025-07-01T12:00:00Z"
        tags={article.tags}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": article.title,
          "description": article.description,
          "image": article.image,
          "author": {
            "@type": "Organization",
            "name": article.author
          },
          "publisher": {
            "@type": "Organization",
            "name": "EmviApp",
            "logo": {
              "@type": "ImageObject",
              "url": "https://emviapp.com/logo.png"
            }
          },
          "datePublished": "2025-07-01T12:00:00Z",
          "dateModified": "2025-07-01T12:00:00Z"
        }}
      />

      <article className="min-h-screen bg-gradient-to-b from-background to-muted/10">
        <Container className="py-6">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/blog" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Link>
          </Button>
        </Container>

        <Container className="py-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap items-center gap-4 mb-8 text-sm text-muted-foreground">
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full font-medium">
                {article.category}
              </span>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {article.publishedAt}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {article.readTime}
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent">
              {article.title}
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
              {article.description}
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-12">
            <div className="flex items-center gap-3">
                <AuthorAvatar 
                  name={article.author}
                  size="md"
                />
                <div>
                  <p className="font-semibold">{article.author}</p>
                  <p className="text-sm text-muted-foreground">Business Strategy Experts</p>
                </div>
              </div>
            </div>

            {/* Top Share/Save Actions */}
            <BlogArticleActions
              articleSlug="salon-pricing-strategies-2025"
              articleTitle={article.title}
              articleUrl={`${window.location.origin}/blog/salon-management/salon-pricing-strategies-2025`}
              articleDescription={article.description}
              articleImage={article.image}
              hashtags={article.tags}
              position="top"
              variant="full"
            />

            <div className="aspect-[2/1] rounded-2xl overflow-hidden mb-12 shadow-2xl">
              <BlogImage 
                src={article.image}
                alt="Elegant salon pricing strategy chart with profit calculations and value propositions"
                className="w-full h-full"
                priority={true}
              />
            </div>
          </div>
        </Container>

        <Container className="py-8">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none">
              
              <p className="text-xl leading-relaxed mb-8 text-muted-foreground">
                Pricing is the ultimate profit lever in your salon business. A 10% price increase can boost profits by 30-50%, yet most salon owners approach pricing with fear, uncertainty, and outdated strategies that leave money on the table.
              </p>

              <p className="text-xl leading-relaxed mb-12 text-muted-foreground">
                The top-performing salons in 2025 don't compete on price—they compete on value. They've mastered the psychology of pricing, understand their true worth, and have systems that allow them to charge premium rates while keeping clients happy. Here's exactly how they do it.
              </p>

              <h2 className="text-3xl font-bold mb-6 text-foreground">The Pricing Mindset Shift</h2>
              
              <p className="mb-6">
                Before we dive into specific strategies, we need to address the biggest obstacle to profitable pricing: your own mindset. Many salon owners undervalue their services because they focus on time and materials rather than transformation and expertise.
              </p>

              <blockquote className="border-l-4 border-primary pl-6 italic text-xl mb-8 text-muted-foreground">
                "I used to think $150 was expensive for a cut and color until I realized I was buying 20 years of training, an hour of personalized attention, and confidence that lasts months. That's not expensive—that's invaluable." - Client testimonial
              </blockquote>

              <h2 className="text-3xl font-bold mb-6 text-foreground">Value-Based Pricing: The Foundation of Profit</h2>

              <p className="mb-6">
                Value-based pricing means setting prices based on the transformation you deliver, not the time you spend or materials you use. It's the difference between selling haircuts and selling confidence.
              </p>

              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 mb-8 border border-green-100">
                <div className="flex items-center gap-3 mb-4">
                  <Target className="h-8 w-8 text-green-600" />
                  <h3 className="text-2xl font-bold">Value Drivers That Justify Premium Pricing</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-lg mb-2">Expertise & Skill:</h4>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Years of training and certification</li>
                      <li>• Specialized techniques and knowledge</li>
                      <li>• Artistic vision and creativity</li>
                      <li>• Problem-solving abilities</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2">Experience & Results:</h4>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Personalized consultation and planning</li>
                      <li>• Quality products and professional tools</li>
                      <li>• Luxury environment and ambiance</li>
                      <li>• Ongoing support and maintenance advice</li>
                    </ul>
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-semibold mb-4">The Transformation Formula</h3>
              <p className="mb-8">
                Instead of pricing based on "how long will this take," ask "what transformation am I delivering?" A complete color correction isn't just 4 hours of work—it's years of confidence restored.
              </p>

              <h2 className="text-3xl font-bold mb-6 text-foreground">Strategic Pricing Models That Work</h2>

              <h3 className="text-2xl font-semibold mb-4">1. Tiered Service Pricing</h3>
              <p className="mb-6">
                Create multiple price points for similar services based on stylist experience, time allocation, and added value. This captures different client segments while moving people up your value ladder.
              </p>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-blue-500">
                  <h4 className="text-xl font-semibold mb-3 text-blue-600">Essential Level</h4>
                  <ul className="space-y-2 text-muted-foreground text-sm">
                    <li>• Junior stylist service</li>
                    <li>• Standard consultation</li>
                    <li>• Basic styling finish</li>
                    <li>• Quality guarantee</li>
                  </ul>
                  <div className="mt-4 text-2xl font-bold">$65-85</div>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-purple-500">
                  <h4 className="text-xl font-semibold mb-3 text-purple-600">Premium Level</h4>
                  <ul className="space-y-2 text-muted-foreground text-sm">
                    <li>• Senior stylist service</li>
                    <li>• Extended consultation</li>
                    <li>• Luxury finish & styling</li>
                    <li>• Maintenance guidance</li>
                  </ul>
                  <div className="mt-4 text-2xl font-bold">$95-125</div>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-gold-500">
                  <h4 className="text-xl font-semibold mb-3 text-yellow-600">Signature Level</h4>
                  <ul className="space-y-2 text-muted-foreground text-sm">
                    <li>• Master stylist service</li>
                    <li>• VIP consultation experience</li>
                    <li>• Personalized styling session</li>
                    <li>• 6-month support plan</li>
                  </ul>
                  <div className="mt-4 text-2xl font-bold">$145-195</div>
                </div>
              </div>

              <h3 className="text-2xl font-semibold mb-4">2. Package Pricing for Higher Value</h3>
              <p className="mb-6">
                Bundle services into packages that deliver complete solutions. This increases average transaction value while providing better client outcomes.
              </p>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 mb-8 border border-purple-100">
                <h4 className="text-xl font-bold mb-4">High-Converting Package Examples:</h4>
                <div className="space-y-4">
                  <div>
                    <h5 className="font-semibold text-lg">"Complete Transformation Package" - $385</h5>
                    <p className="text-muted-foreground">Cut + Color + Deep Treatment + Styling + Home Care Kit (Save $45)</p>
                  </div>
                  <div>
                    <h5 className="font-semibold text-lg">"Bridal Beauty Package" - $295</h5>
                    <p className="text-muted-foreground">Trial Run + Wedding Day Service + Touch-up Kit (Save $35)</p>
                  </div>
                  <div>
                    <h5 className="font-semibold text-lg">"Quarterly Maintenance" - $240</h5>
                    <p className="text-muted-foreground">3 appointments pre-booked with priority scheduling (Save $30)</p>
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-semibold mb-4">3. Dynamic Pricing for Demand Management</h3>
              <p className="mb-8">
                Use pricing to manage demand and maximize revenue during peak and off-peak times. Premium time slots command premium prices.
              </p>

              <h2 className="text-3xl font-bold mb-6 text-foreground">Psychological Pricing Techniques</h2>

              <p className="mb-6">
                The way you present prices influences how clients perceive value. Small changes in pricing structure can significantly impact booking rates and perceived value.
              </p>

              <h3 className="text-2xl font-semibold mb-4">The Power of Price Anchoring</h3>
              <p className="mb-6">
                Always present your highest-value service first. This makes your standard services appear more reasonable and increases the likelihood of upselling.
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-red-50 rounded-xl p-6 border border-red-200">
                  <h4 className="text-lg font-semibold mb-3 text-red-600">❌ Poor Anchoring</h4>
                  <div className="space-y-2 text-sm">
                    <div>Basic Cut: $45</div>
                    <div>Style Cut: $65</div>
                    <div>Premium Cut: $85</div>
                    <div>Signature Cut: $125</div>
                  </div>
                </div>
                <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                  <h4 className="text-lg font-semibold mb-3 text-green-600">✅ Strong Anchoring</h4>
                  <div className="space-y-2 text-sm">
                    <div>Signature Experience: $125</div>
                    <div>Premium Style: $85</div>
                    <div>Professional Cut: $65</div>
                    <div>Essential Service: $45</div>
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-semibold mb-4">Menu Psychology</h3>
              <ul className="list-disc pl-6 mb-8 space-y-2">
                <li><strong>Remove dollar signs:</strong> Use "95" instead of "$95" to reduce payment pain</li>
                <li><strong>Avoid prices ending in 9:</strong> Use $85 instead of $89 for a premium feel</li>
                <li><strong>Use descriptive names:</strong> "Signature Color Experience" vs. "Hair Color"</li>
                <li><strong>Group by experience:</strong> Not by service type</li>
              </ul>

              <h2 className="text-3xl font-bold mb-6 text-foreground">Competitive Pricing Intelligence</h2>

              <p className="mb-6">
                Understanding your market doesn't mean matching competitors' prices. It means understanding where you fit in the value spectrum and positioning accordingly.
              </p>

              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 mb-8 border border-blue-100">
                <div className="flex items-center gap-3 mb-4">
                  <BarChart3 className="h-8 w-8 text-blue-600" />
                  <h3 className="text-2xl font-bold">Market Positioning Strategy</h3>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-semibold text-lg mb-2">Budget Segment (20-30% below average)</h4>
                    <p className="text-muted-foreground text-sm">High volume, basic service, minimal consultation</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2">Premium Segment (20-40% above average)</h4>
                    <p className="text-muted-foreground text-sm">Personalized service, luxury experience, expert consultation</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2">Luxury Segment (50%+ above average)</h4>
                    <p className="text-muted-foreground text-sm">Exclusive access, master-level artistry, concierge service</p>
                  </div>
                </div>
              </div>

              <h2 className="text-3xl font-bold mb-6 text-foreground">Implementing Price Changes Successfully</h2>

              <p className="mb-6">
                Even the best pricing strategy fails if you can't implement changes without losing clients. Here's how top salons handle price adjustments:
              </p>

              <h3 className="text-2xl font-semibold mb-4">The 6-Week Implementation Plan</h3>
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <span className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">1</span>
                  <div>
                    <h5 className="font-semibold">Week 1-2: Value Enhancement</h5>
                    <p className="text-muted-foreground">Add tangible improvements to justify new pricing</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">2</span>
                  <div>
                    <h5 className="font-semibold">Week 3: Client Communication</h5>
                    <p className="text-muted-foreground">Personal notification with grandfathered rates for next visit</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">3</span>
                  <div>
                    <h5 className="font-semibold">Week 4-5: Reinforcement</h5>
                    <p className="text-muted-foreground">Highlight new services and improvements in all communications</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">4</span>
                  <div>
                    <h5 className="font-semibold">Week 6: Implementation</h5>
                    <p className="text-muted-foreground">New pricing takes effect with enhanced service delivery</p>
                  </div>
                </div>
              </div>

              <h2 className="text-3xl font-bold mb-6 text-foreground">Technology and Pricing Optimization</h2>

              <p className="mb-6">
                Modern salons use technology to optimize pricing decisions, test different strategies, and measure results. The right tools can help you implement sophisticated pricing strategies without complex manual processes.
              </p>

              <p className="mb-8">
                Platforms like <Link to="/" className="text-primary font-semibold hover:underline">EmviApp</Link> provide analytics that help you understand which services are most profitable, which time slots command premium pricing, and how different client segments respond to various price points.
              </p>

              <h2 className="text-3xl font-bold mb-6 text-foreground">Measuring Pricing Success</h2>

              <p className="mb-6">
                Track these key metrics to ensure your pricing strategy is working:
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <h4 className="text-xl font-semibold mb-4">Revenue Metrics</h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Average ticket size</li>
                    <li>• Revenue per client visit</li>
                    <li>• Service mix and profitability</li>
                    <li>• Upselling success rates</li>
                  </ul>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <h4 className="text-xl font-semibold mb-4">Client Metrics</h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Client retention after price changes</li>
                    <li>• New client acquisition rates</li>
                    <li>• Booking frequency changes</li>
                    <li>• Client satisfaction scores</li>
                  </ul>
                </div>
              </div>

              <div className="bg-gradient-to-r from-primary/10 via-purple-500/10 to-pink-500/10 rounded-2xl p-8 mb-12 text-center">
                <h2 className="text-3xl font-bold mb-4">Ready to Maximize Your Salon's Profitability?</h2>
                <p className="text-lg mb-6 max-w-2xl mx-auto text-muted-foreground">
                  Stop leaving money on the table with outdated pricing. <Link to="/" className="text-primary font-semibold hover:underline">EmviApp</Link> provides the insights and tools you need to implement profitable pricing strategies that clients love.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                    <Link to="/auth/signup">
                      Start Optimizing Pricing Today
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link to="/features">
                      See Analytics Features →
                    </Link>
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                  Join salons increasing revenue by 30%+ with strategic pricing
                </p>
              </div>

              <h2 className="text-3xl font-bold mb-8 text-foreground">Frequently Asked Questions</h2>
              
              {faqData.map((faq, index) => (
                <div key={index} className="mb-8 p-6 bg-white rounded-xl shadow-sm border border-gray-100">
                  <h3 className="text-xl font-semibold mb-3 text-foreground">{faq.question}</h3>
                  <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                </div>
              ))}

              <h2 className="text-3xl font-bold mb-6 text-foreground">Your Pricing Transformation Starts Now</h2>

              <p className="mb-6">
                Profitable pricing isn't about charging the most—it's about charging what you're worth while delivering exceptional value. Start with one service, test the strategies, and measure the results.
              </p>

              <p className="mb-6">
                For more business growth insights, explore our guides on <Link to="/blog/business/client-retention-secrets-2025" className="text-primary font-semibold hover:underline">client retention</Link> and <Link to="/blog/salon-management/increase-salon-bookings-2025" className="text-primary font-semibold hover:underline">increasing bookings</Link>.
              </p>

              <div className="text-center py-8 border-t border-gray-200">
                <p className="text-lg mb-4">Ready to increase your revenue by 30%+ with strategic pricing?</p>
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                  <Link to="/auth/signup">
                    Start Your Pricing Revolution Free
                  </Link>
                </Button>
              </div>

              <div className="flex flex-wrap gap-2 pt-8 border-t border-gray-200">
                <span className="text-sm text-muted-foreground mr-2">Tags:</span>
                {article.tags.map((tag, index) => (
                  <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Share/Save Actions */}
            <BlogArticleActions
              articleSlug="salon-pricing-strategies-2025"
              articleTitle={article.title}
              articleUrl={`${window.location.origin}/blog/salon-management/salon-pricing-strategies-2025`}
              articleDescription={article.description}
              articleImage={article.image}
              hashtags={article.tags}
              position="bottom"
              variant="full"
            />
          </div>
        </Container>

        <ContinueReadingSection currentArticle={registryArticle} limit={3} />
      </article>
    </>
  );
};

export default SalonPricingStrategies2025;