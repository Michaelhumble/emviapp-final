
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Building, ChevronLeft, Calendar, Phone, Mail, DollarSign, Users } from 'lucide-react';
import { Job } from '@/types/job';
import { useAuth } from '@/context/auth';
import Layout from '@/components/layout/Layout';
import AuthAction from '@/components/common/AuthAction';

const OpportunityDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [listing, setListing] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // In a real app, this would be a proper API call
    // For now, we'll just simulate fetching data from our mock listings
    const fetchListing = async () => {
      setLoading(true);
      try {
        // Import the full list of job listings 
        const { salonListings } = await import('@/components/home/SalonJobListingsShowcase');
        const found = salonListings.find(job => job.id === id);
        
        if (found) {
          setListing(found);
          document.title = `${found.title || found.company} | EmviApp`;
        }
      } catch (error) {
        console.error("Error fetching listing:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchListing();
    }
  }, [id]);

  const handleContactClick = async (): Promise<boolean> => {
    // This would typically open a contact form modal or similar
    console.log("Contact clicked for listing", listing?.id);
    return true;
  };

  const goBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto py-12 px-4">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="h-12 bg-gray-200 rounded w-2/3"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!listing) {
    return (
      <Layout>
        <div className="container mx-auto py-12 px-4 text-center">
          <h1 className="text-2xl font-bold mb-4">Listing Not Found</h1>
          <p className="mb-6">The opportunity you're looking for doesn't exist or has been removed.</p>
          <Button onClick={goBack}>Go Back</Button>
        </div>
      </Layout>
    );
  }

  const formatPostedDate = (dateString: string) => {
    const posted = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - posted.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  };

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <div className="mb-6">
          <button onClick={goBack} className="flex items-center text-primary hover:underline">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to listings
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 md:p-8">
            {/* Header section */}
            <div className="mb-6">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-2">
                <h1 className="text-2xl md:text-3xl font-bold">{listing.title || listing.company}</h1>
                {listing.for_sale ? (
                  <Badge className="bg-violet-100 text-violet-800 border-violet-200 text-sm">
                    For Sale
                  </Badge>
                ) : listing.weekly_pay ? (
                  <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200 text-sm">
                    Weekly Pay
                  </Badge>
                ) : null}
              </div>

              <div className="flex flex-wrap items-center text-gray-500 gap-4 mb-4">
                {listing.company && (
                  <div className="flex items-center">
                    <Building className="h-4 w-4 mr-1.5" />
                    <span className="text-sm md:text-base">{listing.company}</span>
                  </div>
                )}
                
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1.5" />
                  <span className="text-sm md:text-base">{listing.location}</span>
                </div>
                
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1.5" />
                  <span className="text-sm md:text-base">Posted {formatPostedDate(listing.created_at)}</span>
                </div>
              </div>

              {/* Tags/Categories */}
              <div className="flex flex-wrap gap-2 mb-6">
                {listing.specialties?.map((specialty, idx) => (
                  <Badge key={idx} variant="outline" className="bg-gray-50 text-xs">
                    {specialty}
                  </Badge>
                ))}
                
                {listing.has_housing && (
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 text-xs">
                    Housing Available
                  </Badge>
                )}
                
                {listing.owner_will_train && (
                  <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200 text-xs">
                    Will Train
                  </Badge>
                )}
              </div>
            </div>

            {/* Main content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Description column */}
              <div className="lg:col-span-2">
                <h2 className="text-xl font-semibold mb-4">Description</h2>
                <div className="prose max-w-none mb-8">
                  <p className="whitespace-pre-line text-gray-700">
                    {listing.vietnamese_description || listing.description || "No description provided."}
                  </p>
                </div>

                {/* Additional details for sales listings */}
                {listing.for_sale && (
                  <div className="border-t border-gray-100 pt-6 mt-6">
                    <h2 className="text-xl font-semibold mb-4">Business Details</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {listing.asking_price && (
                        <div>
                          <p className="text-gray-500 text-sm">Asking Price</p>
                          <p className="font-medium">{listing.asking_price}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Contact column */}
              <div>
                <div className="bg-gray-50 rounded-lg p-6 sticky top-6">
                  <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
                  
                  {isSignedIn ? (
                    <>
                      {listing.contact_info && (
                        <div className="space-y-4 mb-6">
                          {listing.contact_info.owner_name && (
                            <div>
                              <p className="text-gray-500 text-sm">Contact Person</p>
                              <p className="font-medium">{listing.contact_info.owner_name}</p>
                            </div>
                          )}
                          
                          {listing.contact_info.phone && (
                            <div className="flex items-center">
                              <Phone className="h-4 w-4 mr-2 text-gray-400" />
                              <a 
                                href={`tel:${listing.contact_info.phone}`} 
                                className="text-primary hover:underline"
                              >
                                {listing.contact_info.phone}
                              </a>
                            </div>
                          )}
                          
                          {listing.contact_info.email && (
                            <div className="flex items-center">
                              <Mail className="h-4 w-4 mr-2 text-gray-400" />
                              <a 
                                href={`mailto:${listing.contact_info.email}`} 
                                className="text-primary hover:underline"
                              >
                                {listing.contact_info.email}
                              </a>
                            </div>
                          )}
                        </div>
                      )}
                      
                      <Button className="w-full">
                        <Users className="mr-2 h-4 w-4" />
                        Contact Now
                      </Button>
                    </>
                  ) : (
                    <div>
                      <p className="text-gray-600 mb-4">
                        Sign in to see contact information and apply for this opportunity.
                      </p>
                      
                      <AuthAction 
                        onAction={handleContactClick}
                        redirectPath={`/opportunities/${id}`}
                        customTitle="Sign in to view contact details"
                      >
                        <Button className="w-full">
                          Sign In to Contact
                        </Button>
                      </AuthAction>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OpportunityDetailPage;
