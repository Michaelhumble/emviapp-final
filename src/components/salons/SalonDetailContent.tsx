
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { sanitizeHtml } from '@/utils/security/sanitizeHtml';
import { Badge } from '@/components/ui/badge';
import { MapPin, Building, Calendar, DollarSign, Phone, Mail, LockIcon, Star } from 'lucide-react';
import { Job } from '@/types/job';
import { useAuth } from '@/context/auth';
import AuthAction from '@/components/common/AuthAction';
import LocalBusinessJSONLD from '@/seo/jsonld/LocalBusinessJSONLD';
import ReviewJSONLD from '@/seo/jsonld/ReviewJSONLD';
import { Helmet } from 'react-helmet-async';

interface SalonDetailContentProps {
  salon: Job | null;
}

const SalonDetailContent: React.FC<SalonDetailContentProps> = ({ salon }) => {
  const { isSignedIn } = useAuth();

  if (!salon) {
    return (
      <div className="container mx-auto py-12">
        <p className="text-center text-gray-500">Salon not found</p>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatPrice = (price: string | undefined) => {
    if (!price) return 'Contact for Price';
    if (price.includes('$')) return price;
    return `$${price}`;
  };

  // Extract location parts for structured data
  const getLocationParts = (location: string | undefined) => {
    if (!location) return {};
    
    // Simple parsing - could be enhanced based on actual data format
    const parts = location.split(',').map(part => part.trim());
    if (parts.length >= 2) {
      return {
        addressLocality: parts[0],
        addressRegion: parts[1]
      };
    }
    return { addressLocality: location };
  };

  // Generate local business data for JSON-LD
  const salonUrl = `https://www.emvi.app/salons/${salon.id}`;
  const locationParts = getLocationParts(salon.location);
  
  const localBusinessData = {
    name: salon.title || salon.company || 'Beauty Salon',
    url: salonUrl,
    telephone: salon.contact_info?.phone,
    ...locationParts,
    addressCountry: 'US',
    priceRange: salon.price ? '$$' : undefined,
    image: salon.image_urls?.length ? salon.image_urls : (salon.image ? [salon.image] : undefined),
    sameAs: salon.contact_info?.email ? [`mailto:${salon.contact_info.email}`] : undefined
  };

  // Enhanced SEO metadata
  const pageTitle = `${salon.title || salon.company}${salon.location ? ` - ${salon.location}` : ''} | Beauty Salon | EmviApp`;
  const pageDescription = salon.description 
    ? `${salon.description.substring(0, 130)}...${salon.location ? ` Located in ${salon.location}.` : ''} View details on EmviApp.`
    : `${salon.title || salon.company} - Professional beauty salon${salon.location ? ` in ${salon.location}` : ''} offering premium services. View contact details and booking information on EmviApp.`;
  const canonicalUrl = salonUrl;

  return (
    <>
      {/* SEO Meta Tags */}
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content={`beauty salon, nail salon, hair salon, ${salon.location}, beauty services, salon booking`} />
        <link rel="canonical" href={canonicalUrl} />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={salonUrl} />
        <meta property="og:type" content="business.business" />
        {salon.image && <meta property="og:image" content={salon.image} />}
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        {salon.image && <meta name="twitter:image" content={salon.image} />}
      </Helmet>

      {/* JSON-LD Structured Data */}
      <LocalBusinessJSONLD {...localBusinessData} />
      
      <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 mb-4">
            {salon.is_featured && (
              <Badge className="bg-green-500 hover:bg-green-600">
                Featured Salon
              </Badge>
            )}
            {salon.type === 'salon' && (
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-300">
                For Sale
              </Badge>
            )}
          </div>
          
          <h1 className="text-3xl font-bold mb-4">{salon.title || salon.company}</h1>
          
          <div className="flex flex-wrap gap-4 text-gray-600 mb-4">
            <div className="flex items-center">
              <MapPin className="h-5 w-5 mr-2" />
              <span>{salon.location}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              <span>Listed {formatDate(salon.created_at)}</span>
            </div>
          </div>

          {salon.price && (
            <div className="flex items-center text-green-600 font-semibold text-xl">
              <DollarSign className="h-6 w-6 mr-2" />
              <span>{formatPrice(salon.price)}</span>
            </div>
          )}
        </div>

        {/* Salon Image */}
        {salon.image && (
          <div className="mb-8">
            <img 
              src={salon.image} 
              alt={salon.title || salon.company}
              className="w-full h-64 object-cover rounded-lg shadow-md"
            />
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-6">
            {/* Salon Description */}
            <Card>
              <CardHeader>
                <CardTitle>About This Salon</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none">
                  {salon.description ? (
                    <div dangerouslySetInnerHTML={{ 
                      __html: sanitizeHtml(salon.description)
                    }} />
                  ) : (
                    <p className="text-gray-600">No description available.</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Salon Features */}
            {salon.salon_features && salon.salon_features.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Salon Features</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    {salon.salon_features.map((feature, index) => (
                      <div key={index} className="flex items-center">
                        <Star className="h-4 w-4 mr-2 text-green-500" />
                        <span className="text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Information - Gated */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent>
                {isSignedIn ? (
                  <div className="space-y-3">
                    {salon.contact_info?.owner_name && (
                      <div>
                        <p className="font-medium text-gray-900">Owner</p>
                        <p className="text-gray-600">{salon.contact_info.owner_name}</p>
                      </div>
                    )}
                    
                    {salon.contact_info?.phone && (
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 mr-2 text-gray-500" />
                        <span className="text-gray-600">{salon.contact_info.phone}</span>
                      </div>
                    )}
                    
                    {salon.contact_info?.email && (
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 mr-2 text-gray-500" />
                        <span className="text-gray-600">{salon.contact_info.email}</span>
                      </div>
                    )}
                    
                    {!salon.contact_info?.phone && !salon.contact_info?.email && !salon.contact_info?.owner_name && (
                      <p className="text-gray-500 italic">Contact information not available</p>
                    )}
                  </div>
                ) : (
                  <AuthAction
                    customTitle="Sign in to see contact details"
                    onAction={() => true}
                    fallbackContent={
                      <div className="text-center py-4">
                        <LockIcon className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                        <p className="text-gray-500 mb-3">Sign in to view contact information</p>
                        <div className="text-sm text-gray-400">
                          Phone, email, and owner details are available to registered users
                        </div>
                      </div>
                    }
                  />
                )}
              </CardContent>
            </Card>

            {/* Salon Details */}
            <Card>
              <CardHeader>
                <CardTitle>Salon Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {salon.price && (
                  <div>
                    <p className="font-medium text-gray-900">Asking Price</p>
                    <p className="text-gray-600">{formatPrice(salon.price)}</p>
                  </div>
                )}
                
                <div>
                  <p className="font-medium text-gray-900">Listed</p>
                  <p className="text-gray-600">{formatDate(salon.created_at)}</p>
                </div>
                
                <div>
                  <p className="font-medium text-gray-900">Location</p>
                  <p className="text-gray-600">{salon.location}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default SalonDetailContent;
