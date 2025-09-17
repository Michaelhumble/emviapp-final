import React, { useEffect } from 'react';
import { Star, Shield, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import testimonialsData from '@/data/testimonials.json';

interface TestimonialsProps {
  placement?: 'signup' | 'blog';
}

const Testimonials: React.FC<TestimonialsProps> = ({ placement = 'signup' }) => {
  useEffect(() => {
    // GA4 event when component becomes visible
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'testimonial_widget_view', {
        placement,
        timestamp: new Date().toISOString()
      });
    }

    // Custom event for any other analytics
    window.dispatchEvent(new CustomEvent('testimonial_widget_view', {
      detail: { placement, timestamp: Date.now() }
    }));
  }, [placement]);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  // JSON-LD structured data for testimonials
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "EmviApp",
    "url": "https://www.emvi.app",
    "review": testimonialsData.map(testimonial => ({
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": testimonial.name,
        "jobTitle": testimonial.role,
        "address": {
          "@type": "PostalAddress",
          "addressLocality": testimonial.city
        }
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": testimonial.rating,
        "bestRating": 5
      },
      "reviewBody": testimonial.quote,
      "publisher": {
        "@type": "Organization", 
        "name": "EmviApp"
      }
    }))
  };

  return (
    <>
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className={`bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100 ${placement === 'blog' ? 'mt-8' : 'mt-6'}`}>
        <div className="text-center mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Trusted by Beauty Professionals
          </h3>
          <p className="text-sm text-gray-600">
            Join thousands who've found their perfect match
          </p>
        </div>

        <div className="space-y-4">
          {testimonialsData.map((testimonial) => (
            <div key={testimonial.id} className="bg-white/80 rounded-lg p-4 border border-white/50">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="flex">{renderStars(testimonial.rating)}</div>
                    {testimonial.verified && (
                      <span className="text-xs text-green-600 font-medium">✓ Verified</span>
                    )}
                  </div>
                  
                  <blockquote className="text-sm text-gray-700 italic mb-2">
                    "{testimonial.quote}"
                  </blockquote>
                  
                  <div className="text-xs text-gray-600">
                    <span className="font-medium">{testimonial.name}</span>
                    <span className="mx-1">•</span>
                    <span>{testimonial.role}</span>
                    <span className="mx-1">•</span>
                    <span>{testimonial.city}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-purple-200/50 text-center space-y-2">
          <div className="flex items-center justify-center gap-4 text-xs text-gray-600">
            <Link 
              to="/trust/data-and-privacy" 
              className="flex items-center gap-1 hover:text-purple-600 transition-colors"
            >
              <Shield className="w-3 h-3" />
              How we protect your data
            </Link>
            <Link 
              to="/pricing/overview" 
              className="flex items-center gap-1 hover:text-purple-600 transition-colors"
            >
              <ExternalLink className="w-3 h-3" />
              See pricing overview
            </Link>
          </div>
          
          <Link 
            to="/community/testimonials/submit" 
            className="inline-block text-xs text-purple-600 hover:text-purple-700 hover:underline"
          >
            Share your EmviApp experience
          </Link>
        </div>
      </div>
    </>
  );
};

export default Testimonials;