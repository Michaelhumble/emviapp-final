import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, User, Tag } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import BaseSEO from '@/components/seo/BaseSEO';
import { buildBreadcrumbJsonLd, buildArticleJsonLd } from '@/components/seo/jsonld';
import BlogArticleGrid from '@/components/blog/BlogArticleGrid';
import { getArticlesByCategory, getAllCategories } from '@/data/blogArticles';
import BlogImage from '@/components/blog/BlogImage';

const DynamicBlogCategory = () => {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  
  // Get articles for this category
  const articles = categorySlug ? getArticlesByCategory(categorySlug) : [];
  const allCategories = getAllCategories();
  const currentCategory = allCategories.find(cat => cat.slug === categorySlug);
  
  // If category doesn't exist or has no articles, redirect to blog
  if (!currentCategory || articles.length === 0) {
    return (
      <>
        <BaseSEO 
          title="Category Not Found | EmviApp Blog"
          description="The requested category could not be found. Explore our other blog categories and articles."
          canonical={`https://www.emvi.app/blog/categories/${categorySlug}`}
          type="website"
        />
        
        <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 flex items-center justify-center">
          <Container className="text-center">
            <h1 className="text-4xl font-bold mb-4">Category Not Found</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Sorry, we couldn't find the category you're looking for.
            </p>
            <Button asChild size="lg">
              <Link to="/blog">Back to Blog</Link>
            </Button>
          </Container>
        </div>
      </>
    );
  }

  // Generate category icon and color based on category name
  const getCategoryStyle = (categoryName: string) => {
    const styles = {
      'Hiring & Recruitment': { color: 'text-pink-600', bg: 'bg-pink-500/10', gradient: 'from-pink-600 via-purple-600 to-primary' },
      'Salon Management': { color: 'text-blue-600', bg: 'bg-blue-500/10', gradient: 'from-blue-600 via-cyan-600 to-primary' },
      'Career Growth': { color: 'text-yellow-600', bg: 'bg-yellow-500/10', gradient: 'from-yellow-600 via-orange-600 to-primary' },
      'Industry Insights': { color: 'text-green-600', bg: 'bg-green-500/10', gradient: 'from-green-600 via-emerald-600 to-primary' },
      'Technology': { color: 'text-purple-600', bg: 'bg-purple-500/10', gradient: 'from-purple-600 via-indigo-600 to-primary' },
      'Marketing': { color: 'text-red-600', bg: 'bg-red-500/10', gradient: 'from-red-600 via-pink-600 to-primary' }
    };
    
    return styles[categoryName as keyof typeof styles] || styles['Industry Insights'];
  };

  const categoryStyle = getCategoryStyle(currentCategory.name);

  // Generate FAQ schema based on category
  const generateFAQSchema = () => {
    const faqs = {
      'Hiring & Recruitment': [
        {
          question: "How do I find qualified beauty professionals?",
          answer: "Focus on platforms like EmviApp that specialize in beauty industry recruiting. Look for professionals with proper certifications, strong portfolios, and positive client reviews."
        },
        {
          question: "What should I ask in beauty professional interviews?",
          answer: "Ask about their experience, portfolio, client handling skills, knowledge of current trends, and their approach to sanitation and safety protocols."
        }
      ],
      'Salon Management': [
        {
          question: "How can I increase bookings at my salon?",
          answer: "Focus on online presence, implement booking software, offer promotions for new clients, encourage reviews, and maintain consistent social media marketing."
        },
        {
          question: "What are key metrics to track in salon management?",
          answer: "Track revenue per client, appointment booking rates, client retention rates, staff productivity, inventory turnover, and profit margins."
        }
      ],
      'Career Growth': [
        {
          question: "How can I advance my beauty career?",
          answer: "Continuously update your skills, build a strong portfolio, network with industry professionals, and stay current with beauty trends and techniques."
        },
        {
          question: "What certifications should beauty professionals get?",
          answer: "Focus on state licensing requirements first, then pursue specialized certifications in your area of expertise like advanced nail art, color theory, or specific techniques."
        }
      ],
      'Industry Insights': [
        {
          question: "What are the latest trends in the beauty industry?",
          answer: "Current trends include sustainable beauty practices, AI-powered personalization, mobile-first booking systems, and wellness-focused services."
        },
        {
          question: "How is technology changing the beauty industry?",
          answer: "Technology is revolutionizing beauty through virtual consultations, AI color matching, automated booking systems, and social media marketing tools."
        }
      ],
      'Technology': [
        {
          question: "What technology tools should salons use?",
          answer: "Essential tools include booking management software, POS systems, social media schedulers, inventory management, and client communication platforms."
        },
        {
          question: "How can AI help beauty businesses?",
          answer: "AI can assist with appointment scheduling, inventory prediction, personalized client recommendations, and automated marketing campaigns."
        }
      ],
      'Marketing': [
        {
          question: "How do I market my beauty business effectively?",
          answer: "Focus on social media marketing, client referral programs, local SEO, Google My Business optimization, and showcasing your work through before/after photos."
        },
        {
          question: "What social media platforms work best for beauty businesses?",
          answer: "Instagram and TikTok are most effective for visual content, Facebook for community building, and LinkedIn for B2B networking with other professionals."
        }
      ]
    };

    const categoryFAQs = faqs[currentCategory.name as keyof typeof faqs] || faqs['Industry Insights'];
    
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": categoryFAQs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    };
  };

  return (
    <>
      <BaseSEO 
        title={`${currentCategory.name} | Beauty Industry Blog - EmviApp`}
        description={`Explore ${currentCategory.name.toLowerCase()} articles and expert insights for beauty professionals. Get the latest tips, trends, and strategies from industry experts.`}
        canonical={`https://www.emvi.app/blog/categories/${categorySlug}`}
        type="website"
        jsonLd={[
          buildBreadcrumbJsonLd([
            { name: 'Home', url: 'https://www.emvi.app' },
            { name: 'Blog', url: 'https://www.emvi.app/blog' },
            { name: currentCategory.name, url: `https://www.emvi.app/blog/categories/${categorySlug}` }
          ]),
          generateFAQSchema(),
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": `${currentCategory.name} Articles`,
            "description": `Collection of ${currentCategory.name.toLowerCase()} articles for beauty professionals`,
            "url": `https://www.emvi.app/blog/categories/${categorySlug}`,
            "mainEntity": {
              "@type": "ItemList",
              "numberOfItems": articles.length,
              "itemListElement": articles.map((article, index) => ({
                "@type": "Article",
                "position": index + 1,
                "name": article.title,
                "description": article.description,
                "url": `https://www.emvi.app${article.url}`,
                "author": {
                  "@type": "Organization",
                  "name": article.author
                }
              }))
            }
          }
        ]}
      />

      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
        {/* Header Navigation */}
        <Container className="py-6">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/blog" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Link>
          </Button>
        </Container>

        {/* Category Header */}
        <Container className="py-8">
          <div className="text-center max-w-4xl mx-auto mb-12">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Tag className={`h-8 w-8 ${categoryStyle.color}`} />
              <h1 className={`text-4xl md:text-5xl font-bold bg-gradient-to-r ${categoryStyle.gradient} bg-clip-text text-transparent`}>
                {currentCategory.name}
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed mb-4">
              Discover expert insights, proven strategies, and the latest trends in {currentCategory.name.toLowerCase()}.
            </p>
            <div className={`inline-flex items-center gap-2 ${categoryStyle.bg} border border-opacity-20 rounded-full px-4 py-2`}>
              <span className={`${categoryStyle.color} font-medium`}>
                {articles.length} Article{articles.length !== 1 ? 's' : ''}
              </span>
            </div>
          </div>
        </Container>

        {/* Articles Grid */}
        <Container className="py-8">
          <div className="grid gap-8 max-w-4xl mx-auto">
            {articles.map((article, index) => (
              <Link
                key={article.id}
                to={article.url}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="aspect-[4/3] overflow-hidden">
                    <BlogImage 
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-8 flex flex-col justify-center">
                    <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                      <span className={`${categoryStyle.bg} ${categoryStyle.color} px-3 py-1 rounded-full font-medium`}>
                        {currentCategory.name}
                      </span>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(article.publishedAt).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {article.readTime}
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      {article.description}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <User className="h-4 w-4" />
                      <span>{article.author}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </div>
    </>
  );
};

export default DynamicBlogCategory;