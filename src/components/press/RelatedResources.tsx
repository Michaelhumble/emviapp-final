import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, BookOpen, MapPin, Users } from 'lucide-react';

interface RelatedResourcesProps {
  outletTier?: string;
  outletCity?: string;
}

const RelatedResources: React.FC<RelatedResourcesProps> = ({ 
  outletTier = 'national',
  outletCity = 'Los Angeles'
}) => {
  
  // Smart internal linking based on outlet context
  const getRelevantBlogPosts = (tier: string) => {
    const blogLinks = {
      finance: [
        {
          title: 'Why Weekly Pay Attracts Better Artists',
          href: '/blog/why-weekly-pay-attracts-better-artists',
          description: 'Learn how weekly payment schedules can transform your hiring success'
        },
        {
          title: 'Salon Staffing Solutions Guide',
          href: '/blog/salon-staffing-solution-2025', 
          description: 'Complete guide to hiring and retaining top beauty talent'
        }
      ],
      local_tv: [
        {
          title: 'Top Salon Staffing Mistakes to Avoid',
          href: '/blog/top-salon-staffing-mistakes-to-avoid',
          description: 'Avoid these common hiring mistakes that cost salons millions'
        },
        {
          title: 'How to Find the Best Beauty Professionals', 
          href: '/blog/how-to-find-the-best-beauty-professionals',
          description: 'Professional guide to identifying and recruiting top talent'
        }
      ],
      national: [
        {
          title: 'Global Beauty Community Revolution',
          href: '/blog/global-beauty-community-revolution', 
          description: 'How AI is transforming professional beauty networks worldwide'
        },
        {
          title: 'AI Beauty Revolution 2025',
          href: '/blog/ai-beauty-revolution-2025',
          description: 'The future of beauty technology and professional growth'
        }
      ]
    };
    
    return blogLinks[tier as keyof typeof blogLinks] || blogLinks.national;
  };

  const getCityLinks = (city: string) => {
    const citySlug = city.toLowerCase().replace(/\s+/g, '-').replace(',', '');
    
    return [
      {
        title: `Top Nail Artists in ${city}`,
        href: `/artists/nails/${citySlug}`,
        icon: <Users className="w-4 h-4" />,
        description: `Discover skilled nail technicians and artists in ${city}`
      },
      {
        title: `Hair Salon Jobs in ${city}`,  
        href: `/jobs/hair/${citySlug}`,
        icon: <MapPin className="w-4 h-4" />,
        description: `Find premium hair stylist opportunities in ${city}`
      }
    ];
  };

  const blogPosts = getRelevantBlogPosts(outletTier);
  const cityLinks = getCityLinks(outletCity);

  return (
    <div className="border-t border-gray-200 pt-8 mt-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
        <BookOpen className="w-5 h-5 text-primary" />
        Related Resources
      </h3>
      
      <div className="grid md:grid-cols-2 gap-6">
        {/* Blog Posts */}
        <div>
          <h4 className="font-medium text-gray-800 mb-3">Industry Insights</h4>
          <div className="space-y-3">
            {blogPosts.map((post, index) => (
              <Link
                key={index}
                to={post.href}
                className="block p-3 rounded-lg border border-gray-200 hover:border-primary/20 hover:bg-primary/5 transition-colors group"
              >
                <h5 className="font-medium text-primary group-hover:text-primary-dark text-sm">
                  {post.title}
                </h5>
                <p className="text-gray-600 text-xs mt-1 line-clamp-2">
                  {post.description}
                </p>
              </Link>
            ))}
          </div>
        </div>

        {/* Local Resources */}
        <div>
          <h4 className="font-medium text-gray-800 mb-3">Local Opportunities</h4>
          <div className="space-y-3">
            {cityLinks.map((link, index) => (
              <Link
                key={index}
                to={link.href}
                className="block p-3 rounded-lg border border-gray-200 hover:border-primary/20 hover:bg-primary/5 transition-colors group"
              >
                <div className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">{link.icon}</span>
                  <div>
                    <h5 className="font-medium text-primary group-hover:text-primary-dark text-sm">
                      {link.title}
                    </h5>
                    <p className="text-gray-600 text-xs mt-1">
                      {link.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Call-to-Action */}
      <div className="mt-6 p-4 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg border border-primary/20">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium text-gray-900 text-sm">
              Ready to grow your beauty career?
            </h4>
            <p className="text-gray-600 text-xs mt-1">
              Join thousands of professionals already using EmviApp to find better opportunities
            </p>
          </div>
          <Link
            to="/jobs"
            className="inline-flex items-center gap-1 bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-dark transition-colors"
          >
            Explore Jobs
            <ExternalLink className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RelatedResources;