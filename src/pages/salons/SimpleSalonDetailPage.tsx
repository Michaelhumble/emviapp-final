
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, DollarSign, Clock, SquareFoot, Star, Calendar, Phone, Mail } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ImageWithFallback } from '@/components/ui/ImageWithFallback';
import { Salon } from '@/types/salon';
import { salonListings, vietnameseSalonListings } from '@/data/salonData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const SimpleSalonDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [salon, setSalon] = useState<Salon | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [inquiryFormOpen, setInquiryFormOpen] = useState<boolean>(false);

  useEffect(() => {
    // Simulate API fetch with a delay
    const timer = setTimeout(() => {
      // Find the salon in local data
      const foundSalon = 
        [...salonListings, ...vietnameseSalonListings]
          .find(s => s.id === id);
      
      if (foundSalon) {
        setSalon(foundSalon);
      }
      
      setLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [id]);

  // Function to handle inquiry form submission
  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    alert('Your inquiry has been sent to the seller.');
    setInquiryFormOpen(false);
  };
  
  // Get formatted price for display
  const getFormattedPrice = () => {
    if (!salon) return '';
    
    if (salon.price) {
      // Handle when price is a string that might already have $ sign
      if (typeof salon.price === 'string') {
        return salon.price.includes('$') ? salon.price : `$${salon.price}`;
      }
      // Handle when price is a number
      else {
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          maximumFractionDigits: 0
        }).format(Number(salon.price));
      }
    }
    
    return 'Contact for price';
  };

  // Show loading state
  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto py-8 px-4">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
            <div className="aspect-[3/2] bg-gray-200 rounded mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-4">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
              <div className="h-40 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // Show not found state
  if (!salon) {
    return (
      <Layout>
        <div className="container mx-auto py-12 px-4">
          <Alert variant="destructive" className="mb-6">
            <AlertDescription className="text-center">
              Sorry, we couldn't find the salon listing you're looking for.
            </AlertDescription>
          </Alert>
          <div className="flex justify-center">
            <Button onClick={() => navigate('/salons')}>Browse All Salons</Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{salon.name}</h1>
          <div className="flex items-center text-gray-600 mb-4">
            <MapPin className="h-4 w-4 mr-1.5" />
            <span>{salon.location}</span>
          </div>
          
          <div className="bg-gray-50 border rounded-lg overflow-hidden mb-6">
            <div className="aspect-[2/1] max-h-[500px] overflow-hidden">
              <ImageWithFallback 
                src={salon.imageUrl || salon.image || ''}
                alt={salon.name || 'Salon Image'}
                className="w-full h-full object-cover"
                businessName={salon.name || 'Salon'}
              />
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main content area */}
          <div className="md:col-span-2">
            <Tabs defaultValue="overview" onValueChange={setActiveTab}>
              <TabsList className="mb-6">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="features">Features</TabsTrigger>
                <TabsTrigger value="financial">Financial</TabsTrigger>
                <TabsTrigger value="location">Location</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>About This Salon</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="whitespace-pre-line">{salon.description}</p>
                    
                    {salon.vietnamese_description && (
                      <div className="mt-4 pt-4 border-t">
                        <h4 className="font-medium mb-2">Vietnamese Description</h4>
                        <p className="text-gray-700">{salon.vietnamese_description}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Facts</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      {salon.square_feet && (
                        <div className="flex items-center">
                          <SquareFoot className="h-5 w-5 mr-2 text-gray-500" />
                          <div>
                            <div className="text-sm text-gray-500">Square Footage</div>
                            <div className="font-medium">{Number(salon.square_feet).toLocaleString()} sq ft</div>
                          </div>
                        </div>
                      )}
                      
                      {salon.established && (
                        <div className="flex items-center">
                          <Calendar className="h-5 w-5 mr-2 text-gray-500" />
                          <div>
                            <div className="text-sm text-gray-500">Established</div>
                            <div className="font-medium">{salon.established}</div>
                          </div>
                        </div>
                      )}
                      
                      {salon.specialty && (
                        <div className="flex items-center">
                          <Star className="h-5 w-5 mr-2 text-gray-500" />
                          <div>
                            <div className="text-sm text-gray-500">Specialty</div>
                            <div className="font-medium">{salon.specialty}</div>
                          </div>
                        </div>
                      )}
                      
                      {salon.monthly_rent && (
                        <div className="flex items-center">
                          <Clock className="h-5 w-5 mr-2 text-gray-500" />
                          <div>
                            <div className="text-sm text-gray-500">Monthly Rent</div>
                            <div className="font-medium">${salon.monthly_rent}</div>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="features">
                <Card>
                  <CardHeader>
                    <CardTitle>Salon Features</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {salon.features && salon.features.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {salon.features.map((feature, index) => (
                          <Badge key={index} variant="outline" className="bg-gray-50 text-gray-800">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500">No features listed for this salon.</p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="financial">
                <Card>
                  <CardHeader>
                    <CardTitle>Financial Information</CardTitle>
                    <CardDescription>Business performance metrics</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {salon.monthly_revenue && (
                        <div>
                          <div className="text-sm text-gray-500">Monthly Revenue</div>
                          <div className="text-lg font-semibold">{salon.monthly_revenue}</div>
                        </div>
                      )}
                      
                      {salon.yearly_revenue && (
                        <div>
                          <div className="text-sm text-gray-500">Annual Revenue</div>
                          <div className="text-lg font-semibold">{salon.yearly_revenue}</div>
                        </div>
                      )}
                      
                      {salon.income_range && (
                        <div>
                          <div className="text-sm text-gray-500">Income Range</div>
                          <div className="text-lg font-semibold">{salon.income_range}</div>
                        </div>
                      )}
                      
                      <div className="border-t pt-4 mt-4">
                        <p className="text-sm text-gray-500">
                          Financial information is provided by the seller and has not been verified.
                          Potential buyers should conduct due diligence.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="location">
                <Card>
                  <CardHeader>
                    <CardTitle>Location</CardTitle>
                    <CardDescription>Area information and business neighborhood</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-video bg-gray-100 flex items-center justify-center mb-4">
                      <MapPin className="h-12 w-12 text-gray-400" />
                    </div>
                    
                    <div>
                      <p className="mb-2">{salon.location}</p>
                      {salon.neighborhood && (
                        <p><span className="font-medium">Neighborhood:</span> {salon.neighborhood}</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Listing Price</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary mb-4">
                  {getFormattedPrice()}
                </div>
                
                <Button className="w-full mb-2" size="lg" onClick={() => setInquiryFormOpen(true)}>
                  Contact Seller
                </Button>
                
                <Button variant="outline" className="w-full" size="lg">
                  Schedule Viewing
                </Button>
                
                {salon.contact_info && (
                  <div className="mt-6 pt-4 border-t">
                    <h4 className="font-medium mb-3">Contact Information</h4>
                    
                    {salon.contact_info.owner_name && (
                      <div className="flex items-center mb-2">
                        <div className="text-sm">{salon.contact_info.owner_name}</div>
                      </div>
                    )}
                    
                    {salon.contact_info.phone && (
                      <div className="flex items-center mb-2">
                        <Phone className="h-4 w-4 mr-1.5 text-gray-500" />
                        <a href={`tel:${salon.contact_info.phone}`} className="text-sm hover:underline">
                          {salon.contact_info.phone}
                        </a>
                      </div>
                    )}
                    
                    {salon.contact_info.email && (
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 mr-1.5 text-gray-500" />
                        <a href={`mailto:${salon.contact_info.email}`} className="text-sm hover:underline">
                          {salon.contact_info.email}
                        </a>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Listing Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">Listed</span>
                  <span>{salon.created_at ? new Date(salon.created_at).toLocaleDateString() : 'Recently'}</span>
                </div>
                
                {salon.salon_type && (
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">Salon Type</span>
                    <span>{salon.salon_type}</span>
                  </div>
                )}
                
                {salon.square_feet && (
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">Size</span>
                    <span>{Number(salon.square_feet).toLocaleString()} sq ft</span>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SimpleSalonDetailPage;
