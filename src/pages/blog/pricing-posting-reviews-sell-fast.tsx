import React from 'react';
import BaseSEO from '@/components/seo/BaseSEO';
import { buildArticleJsonLd, buildBreadcrumbJsonLd } from '@/components/seo/jsonld';
import { Link } from 'react-router-dom';
import { Container } from '@/components/ui/container';
import { DollarSign, FileText, Star } from 'lucide-react';
import InlineCTA from '@/components/blog/InlineCTA';
import RelatedPosts from '@/components/blog/RelatedPosts';

const PricingPostingReviewsSellFast = () => {
  const postData = {
    title: "Pricing, Posting & Reviews: The Trio That Sells Your Salon Faster",
    description: "Master the three pillars of selling your nail salon: strategic pricing frameworks, compelling listing anatomy, and a powerful review engine. Learn the exact tactics successful salon owners use to sell 40% faster at premium valuations.",
    author: "EmviApp Editorial",
    datePublished: "2025-02-15T11:00:00.000Z",
    dateModified: "2025-02-15T11:00:00.000Z",
    url: "https://www.emvi.app/blog/pricing-posting-reviews-sell-fast",
    image: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=1200&h=630&fit=crop"
  };

  return (
    <>
      <BaseSEO
        title={`${postData.title} | EmviApp`}
        description={postData.description}
        canonical="/blog/pricing-posting-reviews-sell-fast"
        jsonLd={[
          buildArticleJsonLd(postData),
          buildBreadcrumbJsonLd([
            { name: "Home", url: "https://www.emvi.app" },
            { name: "Blog", url: "https://www.emvi.app/blog" },
            { name: "Business Guide", url: "https://www.emvi.app/blog/categories/business-guide" },
            { name: postData.title, url: postData.url }
          ])
        ]}
        type="article"
      />

      <article className="min-h-screen bg-gradient-to-b from-background to-muted/20">
        <Container className="max-w-4xl py-12">
          <div className="mb-12">
            <Link to="/blog/categories/business-guide" className="text-sm font-medium text-primary hover:underline">Business Guide</Link>
            <h1 className="text-4xl md:text-5xl font-bold my-6">Pricing, Posting & Reviews: <span className="text-primary">The Trio That Sells Your Salon Faster</span></h1>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 p-6 rounded-lg mb-12">
            <p className="text-lg italic"><strong>Vietnamese salon owners:</strong> Bán tiệm nhanh và được giá cao bằng 3 yếu tố: định giá thông minh, quảng cáo đúng cách, và đánh giá 5 sao. Tất cả được giải thích chi tiết bên dưới.</p>
          </div>

          <div className="prose prose-lg max-w-none">
            <div className="bg-white p-8 rounded-xl shadow-lg mb-8">
              <h2 className="flex items-center gap-3"><DollarSign className="w-8 h-8 text-green-500" />Pricing Frameworks + Common Mistakes</h2>
              <p>Strategic pricing can increase your sale value by 30-50%. Use <Link to="/salon-worth" className="text-green-600 hover:underline font-bold">EmviApp's valuation calculator</Link> for data-driven pricing.</p>
            </div>

            <InlineCTA variant="check-salon-worth" />

            <div className="bg-white p-8 rounded-xl shadow-lg mb-8 mt-12">
              <h2 className="flex items-center gap-3"><FileText className="w-8 h-8 text-blue-500" />Listing Anatomy: Title, Copy, Photos</h2>
              <p>Your listing is your sales pitch. Professional photos, compelling copy, and transparent details convert 3x more buyers.</p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg mb-8">
              <h2 className="flex items-center gap-3"><Star className="w-8 h-8 text-yellow-500" />Review Engine: Consistent Asks + Reply Scripts</h2>
              <p>Salons with 100+ 5-star reviews sell 40% faster. Build your review engine systematically on <Link to="/salons" className="text-yellow-600 hover:underline font-bold">EmviApp</Link>.</p>
            </div>
          </div>

          <RelatedPosts currentSlug="pricing-posting-reviews-sell-fast" />
        </Container>
      </article>
    </>
  );
};

export default PricingPostingReviewsSellFast;
