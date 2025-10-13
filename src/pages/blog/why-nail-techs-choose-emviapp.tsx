import React from 'react';
import BaseSEO from '@/components/seo/BaseSEO';
import { buildArticleJsonLd, buildBreadcrumbJsonLd } from '@/components/seo/jsonld';
import { Link } from 'react-router-dom';
import { Container } from '@/components/ui/container';
import { Award, TrendingUp, Users, Shield, Zap, Heart, Globe } from 'lucide-react';
import InlineCTA from '@/components/blog/InlineCTA';
import RelatedPosts from '@/components/blog/RelatedPosts';

const WhyNailTechsChooseEmviApp = () => {
  const postData = {
    title: "7 Reasons Nail Techs Choose EmviApp in 2025",
    description: "Discover why thousands of nail technicians are choosing EmviApp over traditional job boards. From better leads and transparent jobs to artist profiles that rank on Google, learn what makes EmviApp the #1 platform for beauty professionals.",
    author: "EmviApp Editorial",
    datePublished: "2025-02-15T10:00:00.000Z",
    dateModified: "2025-02-15T10:00:00.000Z",
    url: "https://www.emvi.app/blog/why-nail-techs-choose-emviapp",
    image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=1200&h=630&fit=crop"
  };

  return (
    <>
      <BaseSEO
        title={`${postData.title} | EmviApp`}
        description={postData.description}
        canonical="/blog/why-nail-techs-choose-emviapp"
        jsonLd={[
          buildArticleJsonLd(postData),
          buildBreadcrumbJsonLd([
            { name: "Home", url: "https://www.emvi.app" },
            { name: "Blog", url: "https://www.emvi.app/blog" },
            { name: "Career Growth", url: "https://www.emvi.app/blog/categories/career-growth" },
            { name: postData.title, url: postData.url }
          ])
        ]}
        type="article"
      />

      <article className="min-h-screen bg-gradient-to-b from-background to-muted/20">
        <Container className="max-w-4xl py-12">
          <div className="mb-12">
            <Link to="/blog/categories/career-growth" className="text-sm font-medium text-primary hover:underline">Career Growth</Link>
            <h1 className="text-4xl md:text-5xl font-bold my-6">7 Reasons Nail Techs Choose <span className="text-primary">EmviApp in 2025</span></h1>
            <p className="text-xl text-muted-foreground">{postData.description}</p>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-l-4 border-primary p-6 rounded-lg mb-12">
            <p className="text-lg italic"><strong>Cho người Việt:</strong> Hàng ngàn thợ nail người Việt đang dùng EmviApp để tìm việc tốt hơn và xây dựng danh tiếng. Đọc tiếp để hiểu tại sao EmviApp là lựa chọn số 1.</p>
          </div>

          <div className="prose prose-lg max-w-none space-y-12">
            {[
              { icon: TrendingUp, title: "1. Better Leads, Transparent Jobs", color: "green" },
              { icon: Globe, title: "2. Artist Profiles That Rank on Google", color: "blue" },
              { icon: Users, title: "3. Community Support (VN + EN)", color: "purple" },
              { icon: Shield, title: "4. Verified Salons & Safe Hiring", color: "orange" },
              { icon: Zap, title: "5. Instant Job Alerts", color: "yellow" },
              { icon: Heart, title: "6. Portfolio That Sells Your Skills", color: "pink" },
              { icon: Award, title: "7. Free to Use, Built for You", color: "red" }
            ].map((reason, i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <reason.icon className={`w-8 h-8 text-${reason.color}-500`} />
                  <h2 className="text-2xl font-bold m-0">{reason.title}</h2>
                </div>
                <p className="text-lg text-gray-700">Real benefits for your career growth. <Link to="/artists" className="text-primary hover:underline">Create your profile</Link> and see the difference.</p>
              </div>
            ))}

            <InlineCTA variant="find-artists" />
          </div>

          <RelatedPosts currentSlug="why-nail-techs-choose-emviapp" />
        </Container>
      </article>
    </>
  );
};

export default WhyNailTechsChooseEmviApp;
