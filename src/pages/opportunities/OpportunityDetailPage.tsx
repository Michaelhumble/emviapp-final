
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Building, Calendar, Phone, Mail, Info, DollarSign, HomeIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Layout from '@/components/layout/Layout';
import { Job } from '@/types/job';
import { salonListings } from '@/components/home/SalonJobListingsShowcase';
import { useAuth } from '@/context/auth';
import AuthAction from '@/components/common/AuthAction';

const OpportunityDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [listing, setListing] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isSignedIn } = useAuth();
  
  useEffect(() => {
    const fetchListing = () => {
      try {
        // Find the listing with the matching ID from our salon listings
        const foundListing = salonListings.find(item => item.id === id);
        
        if (foundListing) {
          setListing(foundListing);
        } else {
          setError("Opportunity not found. It may have been removed or is no longer available.");
        }
      } catch (err) {
        setError("Error loading opportunity details. Please try again later.");
        console.error("Error fetching listing:", err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchListing();
  }, [id]);
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };
  
  const handleContact = async (): Promise<boolean> => {
    // This function would handle contacting the listing owner
    console.log("Contact initiated for listing:", listing?.id);
    return true;
  };
  
  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <div className="flex justify-center items-center min-h-[300px]">
            <div className="animate-pulse flex flex-col w-full max-w-3xl">
              <div className="h-8 bg-gray-200 rounded w-3/4 mb-6"></div>
              <div className="h-6 bg-gray-200 rounded w-1/2 mb-8"></div>
              <div className="h-32 bg-gray-200 rounded mb-6"></div>
              <div className="h-24 bg-gray-200 rounded mb-6"></div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
  
  if (error || !listing) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col items-center justify-center text-center py-12">
            <Info className="h-16 w-16 text-gray-400 mb-4" />
            <h2 className="text-2xl font-bold mb-2">Opportunity Not Found</h2>
            <p className="text-gray-600 mb-6">{error || "This opportunity could not be found."}</p>
            <Link to="/jobs">
              <Button>Browse All Opportunities</Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <Link to="/" className="flex items-center text-gray-600 hover:text-gray-900 mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to opportunities
        </Link>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            {/* Main content */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{listing.title || listing.company}</h1>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <div className="flex items-center text-gray-600">
                      <Building className="h-4 w-4 mr-1" />
                      <span>{listing.company}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{listing.location}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>Posted {formatDate(listing.created_at)}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {listing.for_sale && (
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        For Sale
                      </Badge>
                    )}
                    {listing.weekly_pay && (
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        Weekly Pay
                      </Badge>
                    )}
                    {listing.has_housing && (
                      <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                        Housing Available
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-3">Description</h2>
                <p className="text-gray-700 whitespace-pre-wrap">
                  {listing.vietnamese_description || listing.description}
                </p>
              </div>
              
              {listing.specialties && listing.specialties.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-3">Specialties</h2>
                  <div className="flex flex-wrap gap-2">
                    {listing.specialties.map((specialty, index) => (
                      <Badge key={index} variant="secondary">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div>
            {/* Sidebar */}
            <Card className="mb-6">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
                
                {isSignedIn ? (
                  <>
                    {listing.contact_info && (
                      <div className="space-y-4">
                        {listing.contact_info.owner_name && (
                          <div className="flex items-start">
                            <span className="bg-gray-100 p-2 rounded mr-3">
                              <Info className="h-4 w-4 text-gray-600" />
                            </span>
                            <div>
                              <p className="text-sm text-gray-500">Contact Person</p>
                              <p className="font-medium">{listing.contact_info.owner_name}</p>
                            </div>
                          </div>
                        )}
                        
                        {listing.contact_info.phone && (
                          <div className="flex items-start">
                            <span className="bg-gray-100 p-2 rounded mr-3">
                              <Phone className="h-4 w-4 text-gray-600" />
                            </span>
                            <div>
                              <p className="text-sm text-gray-500">Phone</p>
                              <p className="font-medium">{listing.contact_info.phone}</p>
                            </div>
                          </div>
                        )}
                        
                        {listing.contact_info.email && (
                          <div className="flex items-start">
                            <span className="bg-gray-100 p-2 rounded mr-3">
                              <Mail className="h-4 w-4 text-gray-600" />
                            </span>
                            <div>
                              <p className="text-sm text-gray-500">Email</p>
                              <p className="font-medium">{listing.contact_info.email}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                    
                    <Button className="w-full mt-6">
                      Contact Now
                    </Button>
                  </>
                ) : (
                  <div className="space-y-4">
                    <div className="text-gray-600 text-center">
                      <p className="mb-4">Sign in to view contact details and apply for this opportunity</p>
                      
                      <AuthAction 
                        onAction={handleContact}
                        customTitle="Sign in to contact"
                      >
                        <Button className="w-full">
                          Sign In to View Contact Info
                        </Button>
                      </AuthAction>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
            
            {listing.for_sale && listing.asking_price && (
              <Card className="mb-6">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <DollarSign className="h-5 w-5 text-primary mr-2" />
                    <h2 className="text-xl font-semibold">Asking Price</h2>
                  </div>
                  <p className="text-2xl font-bold text-primary">{listing.asking_price}</p>
                </CardContent>
              </Card>
            )}
            
            {/* Additional details card for business info */}
            {listing.for_sale && (
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Business Details</h2>
                  <div className="space-y-2">
                    {listing.number_of_stations && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Stations:</span>
                        <span className="font-medium">{listing.number_of_stations}</span>
                      </div>
                    )}
                    {listing.square_feet && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Size:</span>
                        <span className="font-medium">{listing.square_feet} sq ft</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
            
            {/* Additional details card for job info */}
            {!listing.for_sale && (
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Job Details</h2>
                  <div className="space-y-2">
                    {listing.salary_range && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Salary Range:</span>
                        <span className="font-medium">{listing.salary_range}</span>
                      </div>
                    )}
                    {listing.employment_type && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Employment Type:</span>
                        <span className="font-medium">{listing.employment_type}</span>
                      </div>
                    )}
                    {listing.has_housing && (
                      <div className="flex items-center">
                        <HomeIcon className="h-4 w-4 mr-2 text-green-500" />
                        <span>Housing available</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OpportunityDetailPage;
