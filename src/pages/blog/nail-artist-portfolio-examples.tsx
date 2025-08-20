import React from 'react';
import Layout from '@/components/layout/Layout';
import BaseSEO from '@/components/seo/BaseSEO';
import { buildBreadcrumbJsonLd } from '@/components/seo/jsonld';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const NailArtistPortfolioExamples: React.FC = () => {
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: 'Home', url: 'https://www.emvi.app' },
    { name: 'Blog', url: 'https://www.emvi.app/blog' },
    { name: 'Nail Artist Portfolio Examples', url: 'https://www.emvi.app/blog/nail-artist-portfolio-examples' }
  ]);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Nail Artist Portfolio Examples: Showcase Your Best Work",
    "description": "Professional nail artist portfolio examples and tips. Learn how to photograph, organize, and present your nail art to attract clients and employers.",
    "author": {
      "@type": "Organization",
      "name": "EmviApp"
    },
    "publisher": {
      "@type": "Organization",
      "name": "EmviApp",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.emvi.app/logo.png"
      }
    },
    "datePublished": "2025-01-01",
    "dateModified": "2025-01-01",
    "image": "https://www.emvi.app/og-nail-portfolio.jpg",
    "url": "https://www.emvi.app/blog/nail-artist-portfolio-examples"
  };

  return (
    <Layout>
      <BaseSEO
        title="Nail Artist Portfolio Examples: Showcase Your Best Work | EmviApp"
        description="Professional nail artist portfolio examples and tips. Learn how to photograph, organize, and present your nail art to attract clients and employers."
        canonical="https://www.emvi.app/blog/nail-artist-portfolio-examples"
        ogImage="https://www.emvi.app/og-nail-portfolio.jpg"
        jsonLd={[breadcrumbJsonLd, articleJsonLd]}
        type="article"
      />

      <main className="w-full">
        <article>
          {/* Hero Section */}
          <section className="py-12 bg-gradient-to-br from-primary/5 to-secondary/5">
            <Container>
              <div className="max-w-4xl mx-auto">
                <Link to="/guides/nail-jobs-in-the-us" className="text-primary hover:underline text-sm mb-4 block">
                  ← Back to Complete Guide
                </Link>
                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                  Nail Artist Portfolio Examples: Showcase Your Best Work
                </h1>
                <p className="text-lg text-muted-foreground mb-6">
                  Professional portfolio examples and expert tips to help you create a stunning showcase 
                  that attracts clients and employers.
                </p>
                <div className="flex gap-4">
                  <Link to="/jobs?category=nails">
                    <Button>Find Nail Tech Jobs</Button>
                  </Link>
                  <Link to="/guides/nail-jobs-in-the-us">
                    <Button variant="outline">Complete Career Guide</Button>
                  </Link>
                </div>
              </div>
            </Container>
          </section>

          {/* Portfolio Essentials */}
          <section className="py-12 bg-white">
            <Container>
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-bold mb-6">Portfolio Essentials</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-4">Must-Have Portfolio Elements</h3>
                    <ul className="space-y-2">
                      <li>• <strong>Variety of Styles:</strong> Classic, French, nail art, extensions</li>
                      <li>• <strong>Different Nail Shapes:</strong> Square, oval, almond, coffin</li>
                      <li>• <strong>Seasonal Designs:</strong> Holiday and trend-based art</li>
                      <li>• <strong>Before/After Photos:</strong> Show transformation skills</li>
                      <li>• <strong>Process Shots:</strong> Step-by-step techniques</li>
                      <li>• <strong>Client Testimonials:</strong> Social proof and reviews</li>
                    </ul>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-4">Photography Best Practices</h3>
                    <ul className="space-y-2">
                      <li>• <strong>Natural Lighting:</strong> Best for true color representation</li>
                      <li>• <strong>Clean Backgrounds:</strong> White or neutral backgrounds</li>
                      <li>• <strong>Multiple Angles:</strong> Top view, side profile, close-ups</li>
                      <li>• <strong>High Resolution:</strong> Minimum 1080p for social media</li>
                      <li>• <strong>Consistent Editing:</strong> Same filter/style throughout</li>
                      <li>• <strong>Detail Shots:</strong> Show intricate work clearly</li>
                    </ul>
                  </div>
                </div>
              </div>
            </Container>
          </section>

          {/* Portfolio Examples */}
          <section className="py-12 bg-gray-50">
            <Container>
              <div className="max-w-6xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
                  Professional Portfolio Examples
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
                  {/* Example 1 - Classic French */}
                  <div className="bg-white rounded-lg overflow-hidden shadow-sm">
                    <div className="h-48 bg-gradient-to-br from-pink-100 to-pink-200 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-white rounded-full mx-auto mb-2 flex items-center justify-center">
                          ✨
                        </div>
                        <p className="text-sm text-gray-600">Classic French Manicure</p>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold mb-2">Classic French Collection</h3>
                      <p className="text-sm text-gray-600 mb-3">
                        Timeless French manicures with perfect white tips and natural pink base. 
                        Shows precision and attention to detail.
                      </p>
                      <div className="flex flex-wrap gap-1">
                        <span className="px-2 py-1 bg-gray-100 text-xs rounded">French Tips</span>
                        <span className="px-2 py-1 bg-gray-100 text-xs rounded">Classic</span>
                        <span className="px-2 py-1 bg-gray-100 text-xs rounded">Precision</span>
                      </div>
                    </div>
                  </div>

                  {/* Example 2 - Nail Art */}
                  <div className="bg-white rounded-lg overflow-hidden shadow-sm">
                    <div className="h-48 bg-gradient-to-br from-purple-100 to-blue-200 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-white rounded-full mx-auto mb-2 flex items-center justify-center">
                          🎨
                        </div>
                        <p className="text-sm text-gray-600">Creative Nail Art</p>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold mb-2">Artistic Designs</h3>
                      <p className="text-sm text-gray-600 mb-3">
                        Hand-painted nail art showcasing creativity and artistic skills. 
                        Perfect for demonstrating versatility.
                      </p>
                      <div className="flex flex-wrap gap-1">
                        <span className="px-2 py-1 bg-gray-100 text-xs rounded">Hand-painted</span>
                        <span className="px-2 py-1 bg-gray-100 text-xs rounded">Creative</span>
                        <span className="px-2 py-1 bg-gray-100 text-xs rounded">Artistic</span>
                      </div>
                    </div>
                  </div>

                  {/* Example 3 - Gel Extensions */}
                  <div className="bg-white rounded-lg overflow-hidden shadow-sm">
                    <div className="h-48 bg-gradient-to-br from-orange-100 to-red-200 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-white rounded-full mx-auto mb-2 flex items-center justify-center">
                          💅
                        </div>
                        <p className="text-sm text-gray-600">Gel Extensions</p>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold mb-2">Gel Extensions & Shapes</h3>
                      <p className="text-sm text-gray-600 mb-3">
                        Various nail shapes and lengths using gel extensions. 
                        Demonstrates technical skill and shaping expertise.
                      </p>
                      <div className="flex flex-wrap gap-1">
                        <span className="px-2 py-1 bg-gray-100 text-xs rounded">Gel Extensions</span>
                        <span className="px-2 py-1 bg-gray-100 text-xs rounded">Shaping</span>
                        <span className="px-2 py-1 bg-gray-100 text-xs rounded">Technical</span>
                      </div>
                    </div>
                  </div>

                  {/* Example 4 - Seasonal */}
                  <div className="bg-white rounded-lg overflow-hidden shadow-sm">
                    <div className="h-48 bg-gradient-to-br from-green-100 to-emerald-200 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-white rounded-full mx-auto mb-2 flex items-center justify-center">
                          🎄
                        </div>
                        <p className="text-sm text-gray-600">Holiday Designs</p>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold mb-2">Seasonal Collections</h3>
                      <p className="text-sm text-gray-600 mb-3">
                        Holiday and seasonal nail designs that show trend awareness 
                        and ability to create themed artwork.
                      </p>
                      <div className="flex flex-wrap gap-1">
                        <span className="px-2 py-1 bg-gray-100 text-xs rounded">Seasonal</span>
                        <span className="px-2 py-1 bg-gray-100 text-xs rounded">Trending</span>
                        <span className="px-2 py-1 bg-gray-100 text-xs rounded">Themed</span>
                      </div>
                    </div>
                  </div>

                  {/* Example 5 - Before/After */}
                  <div className="bg-white rounded-lg overflow-hidden shadow-sm">
                    <div className="h-48 bg-gradient-to-br from-yellow-100 to-amber-200 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-white rounded-full mx-auto mb-2 flex items-center justify-center">
                          ⚡
                        </div>
                        <p className="text-sm text-gray-600">Transformation</p>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold mb-2">Before & After</h3>
                      <p className="text-sm text-gray-600 mb-3">
                        Dramatic nail transformations showing your ability to 
                        repair damage and create beautiful results.
                      </p>
                      <div className="flex flex-wrap gap-1">
                        <span className="px-2 py-1 bg-gray-100 text-xs rounded">Transformation</span>
                        <span className="px-2 py-1 bg-gray-100 text-xs rounded">Repair</span>
                        <span className="px-2 py-1 bg-gray-100 text-xs rounded">Results</span>
                      </div>
                    </div>
                  </div>

                  {/* Example 6 - Luxury */}
                  <div className="bg-white rounded-lg overflow-hidden shadow-sm">
                    <div className="h-48 bg-gradient-to-br from-indigo-100 to-purple-200 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-white rounded-full mx-auto mb-2 flex items-center justify-center">
                          💎
                        </div>
                        <p className="text-sm text-gray-600">Luxury Designs</p>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold mb-2">Luxury & Special Events</h3>
                      <p className="text-sm text-gray-600 mb-3">
                        High-end designs for special occasions using premium 
                        products and embellishments.
                      </p>
                      <div className="flex flex-wrap gap-1">
                        <span className="px-2 py-1 bg-gray-100 text-xs rounded">Luxury</span>
                        <span className="px-2 py-1 bg-gray-100 text-xs rounded">Events</span>
                        <span className="px-2 py-1 bg-gray-100 text-xs rounded">Premium</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Container>
          </section>

          {/* Organization Tips */}
          <section className="py-12 bg-white">
            <Container>
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-bold mb-6">Portfolio Organization Tips</h2>
                
                <div className="space-y-8">
                  <div className="border-l-4 border-primary pl-6">
                    <h3 className="text-lg font-semibold mb-3">Digital Portfolio Structure</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium mb-2">Folder Organization:</h4>
                        <ul className="text-sm space-y-1 text-gray-600">
                          <li>• Classic Manicures</li>
                          <li>• Nail Art & Designs</li>
                          <li>• Extensions & Shapes</li>
                          <li>• Seasonal/Holiday</li>
                          <li>• Before & After</li>
                          <li>• Special Techniques</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">File Naming:</h4>
                        <ul className="text-sm space-y-1 text-gray-600">
                          <li>• Use descriptive names</li>
                          <li>• Include date: 2025-01-15</li>
                          <li>• Add technique: GelExtension</li>
                          <li>• Client initials: JD</li>
                          <li>• Example: 2025-01-15_GelExt_JD_Almond</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="border-l-4 border-primary pl-6">
                    <h3 className="text-lg font-semibold mb-3">Social Media Strategy</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <h4 className="font-medium mb-2">Instagram:</h4>
                        <ul className="text-sm space-y-1 text-gray-600">
                          <li>• Square format (1080x1080)</li>
                          <li>• Use trending hashtags</li>
                          <li>• Post consistently</li>
                          <li>• Stories for process</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">TikTok:</h4>
                        <ul className="text-sm space-y-1 text-gray-600">
                          <li>• Vertical format (9:16)</li>
                          <li>• Time-lapse videos</li>
                          <li>• Trending sounds</li>
                          <li>• Tutorial content</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Facebook:</h4>
                        <ul className="text-sm space-y-1 text-gray-600">
                          <li>• Professional page</li>
                          <li>• Client reviews</li>
                          <li>• Contact information</li>
                          <li>• Business hours</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="border-l-4 border-primary pl-6">
                    <h3 className="text-lg font-semibold mb-3">Physical Portfolio</h3>
                    <p className="text-gray-600 mb-4">
                      For in-person interviews and consultations, maintain a physical portfolio:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium mb-2">Print Quality:</h4>
                        <ul className="text-sm space-y-1 text-gray-600">
                          <li>• High-resolution prints</li>
                          <li>• Professional photo paper</li>
                          <li>• Consistent sizing</li>
                          <li>• Protective sleeves</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Organization:</h4>
                        <ul className="text-sm space-y-1 text-gray-600">
                          <li>• Professional binder</li>
                          <li>• Category dividers</li>
                          <li>• Easy to navigate</li>
                          <li>• Business cards included</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Container>
          </section>

          {/* Common Mistakes */}
          <section className="py-12 bg-red-50">
            <Container>
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold mb-6 text-red-800">Common Portfolio Mistakes to Avoid</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-lg p-6">
                    <h3 className="font-semibold text-red-700 mb-3">❌ Poor Photography</h3>
                    <ul className="text-sm space-y-1">
                      <li>• Blurry or out-of-focus images</li>
                      <li>• Bad lighting that changes colors</li>
                      <li>• Cluttered backgrounds</li>
                      <li>• Inconsistent photo styles</li>
                    </ul>
                  </div>

                  <div className="bg-white rounded-lg p-6">
                    <h3 className="font-semibold text-red-700 mb-3">❌ Lack of Variety</h3>
                    <ul className="text-sm space-y-1">
                      <li>• Only showing one style</li>
                      <li>• Same nail shape repeatedly</li>
                      <li>• Missing seasonal trends</li>
                      <li>• No technical diversity</li>
                    </ul>
                  </div>

                  <div className="bg-white rounded-lg p-6">
                    <h3 className="font-semibold text-red-700 mb-3">❌ Outdated Content</h3>
                    <ul className="text-sm space-y-1">
                      <li>• Old trends and styles</li>
                      <li>• Faded or yellowed photos</li>
                      <li>• Outdated techniques</li>
                      <li>• No recent work shown</li>
                    </ul>
                  </div>

                  <div className="bg-white rounded-lg p-6">
                    <h3 className="font-semibold text-red-700 mb-3">❌ Poor Organization</h3>
                    <ul className="text-sm space-y-1">
                      <li>• Random order of images</li>
                      <li>• No clear categories</li>
                      <li>• Difficult to navigate</li>
                      <li>• Missing contact information</li>
                    </ul>
                  </div>
                </div>
              </div>
            </Container>
          </section>

          {/* Action Steps */}
          <section className="py-12 bg-primary text-white">
            <Container>
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-2xl md:text-3xl font-bold mb-6">Ready to Build Your Portfolio?</h2>
                <p className="text-lg mb-8 opacity-90">
                  Start showcasing your best work and land your dream nail tech position.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/jobs?category=nails">
                    <Button size="lg" variant="secondary">
                      Browse Nail Tech Jobs
                    </Button>
                  </Link>
                  <Link to="/guides/nail-jobs-in-the-us">
                    <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-primary">
                      Complete Career Guide
                    </Button>
                  </Link>
                </div>
              </div>
            </Container>
          </section>
        </article>
      </main>
    </Layout>
  );
};

export default NailArtistPortfolioExamples;