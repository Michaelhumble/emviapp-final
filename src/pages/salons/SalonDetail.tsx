
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { ArrowLeft, MapPin, DollarSign, Grid, Star, Phone, Mail, Info, Home, Building, Calendar, Users, TrendingUp, Check } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { getSalonById } from '@/utils/featuredContent';
import { Job } from '@/types/job';
import { Helmet } from 'react-helmet';

const SalonDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [salon, setSalon] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (id) {
      setLoading(true);
      // Get salon data by ID from the utility function
      const salonData = getSalonById(id);
      if (salonData) {
        setSalon(salonData);
        // Update document title with salon name
        document.title = `${salonData.company} | EmviApp Salon Detail`;
      }
      setLoading(false);
    }
  }, [id]);
  
  // Format currency helper
  const formatCurrency = (value?: string) => {
    if (!value) return "Not specified";
    const numericValue = parseFloat(value.replace(/[^0-9.-]+/g, ""));
    return numericValue ? `$${numericValue.toLocaleString()}` : value;
  };
  
  return (
    <Layout>
      <Helmet>
        <title>{salon?.company || 'Salon Detail'} | EmviApp</title>
        <meta 
          name="description" 
          content={`View details for ${salon?.company} located in ${salon?.location}. ${salon?.for_sale ? 'This salon is for sale!' : ''}`} 
        />
      </Helmet>
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <Link to="/salons">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Salon Directory
            </Button>
          </Link>
          
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
            </div>
          ) : salon ? (
            <div className="bg-white rounded-lg border border-gray-100 overflow-hidden">
              <div className="relative">
                {salon.image ? (
                  <div 
                    className="w-full h-64 bg-cover bg-center"
                    style={{ backgroundImage: `url(${salon.image})` }}
                  ></div>
                ) : (
                  <div className="w-full h-64 bg-gradient-to-r from-blue-100 to-purple-100 flex items-center justify-center">
                    <h1 className="text-2xl font-bold text-gray-500">{salon.company}</h1>
                  </div>
                )}
                
                {salon.is_featured && (
                  <Badge className="absolute top-4 right-4 bg-yellow-400 text-yellow-900">
                    <Star className="mr-1 h-3 w-3" /> Featured
                  </Badge>
                )}
              </div>
              
              <div className="p-6">
                <div className="flex flex-col md:flex-row justify-between mb-6">
                  <div>
                    <h1 className="text-3xl font-serif font-bold mb-2">{salon.company}</h1>
                    <div className="flex items-center text-gray-600 mb-2">
                      <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                      <span>{salon.location}</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 md:mt-0">
                    <div className="inline-block bg-purple-50 p-4 rounded-lg border border-purple-100">
                      <div className="text-sm text-purple-700 mb-1">Asking Price</div>
                      <div className="text-2xl font-bold text-purple-800">
                        {formatCurrency(salon.asking_price)}
                      </div>
                    </div>
                  </div>
                </div>
                
                <Separator className="my-6" />
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                  <div className="col-span-2">
                    {salon.vietnamese_description && (
                      <div className="bg-amber-50 p-4 rounded-lg border border-amber-100 mb-6">
                        <h3 className="font-medium mb-2 text-amber-800">Thông Tin Tiệm</h3>
                        <p className="text-gray-800 font-medium mb-2">{salon.vietnamese_description}</p>
                        {salon.contact_info?.notes && (
                          <p className="text-sm text-amber-700 italic mt-2">
                            <Info className="inline h-3 w-3 mr-1 mb-1" />
                            {salon.contact_info.notes}
                          </p>
                        )}
                      </div>
                    )}
                    
                    <h2 className="text-xl font-semibold mb-4">About This Salon</h2>
                    <p className="text-gray-700 whitespace-pre-line mb-6">{salon.description}</p>
                    
                    {salon.reason_for_selling && (
                      <div className="mb-6">
                        <h3 className="font-medium mb-2">Reason For Selling</h3>
                        <p className="text-gray-600">{salon.reason_for_selling}</p>
                      </div>
                    )}
                    
                    {salon.salon_features && salon.salon_features.length > 0 && (
                      <div>
                        <h3 className="font-medium mb-2">Salon Features</h3>
                        <div className="flex flex-wrap gap-2">
                          {salon.salon_features.map((feature, index) => (
                            <Badge key={index} variant="outline" className="bg-gray-50">
                              {feature}
                            </Badge>
                          ))}
                          
                          {salon.has_housing && (
                            <Badge variant="outline" className="bg-green-50 text-green-800">
                              <Home className="w-3 h-3 mr-1" />
                              Housing Available
                            </Badge>
                          )}
                          
                          {salon.has_wax_room && (
                            <Badge variant="outline" className="bg-blue-50 text-blue-800">
                              <Check className="w-3 h-3 mr-1" />
                              Wax Room
                            </Badge>
                          )}
                          
                          {salon.has_dining_room && (
                            <Badge variant="outline" className="bg-amber-50 text-amber-800">
                              <Check className="w-3 h-3 mr-1" />
                              Dining Room
                            </Badge>
                          )}
                          
                          {salon.has_laundry && (
                            <Badge variant="outline" className="bg-indigo-50 text-indigo-800">
                              <Check className="w-3 h-3 mr-1" />
                              Washer/Dryer
                            </Badge>
                          )}
                          
                          {salon.owner_will_train && (
                            <Badge variant="outline" className="bg-cyan-50 text-cyan-800">
                              <Check className="w-3 h-3 mr-1" />
                              Owner Will Train
                            </Badge>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                      <h3 className="font-medium mb-4">Salon Details</h3>
                      
                      <div className="space-y-3">
                        {salon.square_feet && (
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">Size:</span>
                            <span className="font-medium">{salon.square_feet} sq ft</span>
                          </div>
                        )}
                        
                        {salon.number_of_stations && (
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">Stations:</span>
                            <span className="font-medium">{salon.number_of_stations}</span>
                          </div>
                        )}
                        
                        {salon.monthly_rent && (
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">Monthly Rent:</span>
                            <span className="font-medium">{formatCurrency(salon.monthly_rent)}</span>
                          </div>
                        )}
                        
                        {salon.revenue && (
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">Revenue:</span>
                            <span className="font-medium">{salon.revenue}</span>
                          </div>
                        )}
                        
                        {salon.specialties && salon.specialties.length > 0 && (
                          <div className="flex flex-col">
                            <span className="text-gray-600 mb-1">Specialties:</span>
                            <div className="flex flex-wrap gap-1">
                              {salon.specialties.map((specialty, index) => (
                                <Badge key={index} variant="outline" className="bg-purple-50 text-purple-800 text-xs">
                                  {specialty}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <Separator className="my-4" />
                      
                      <h3 className="font-medium mb-4">Contact Information</h3>
                      
                      {salon.contact_info ? (
                        <div className="space-y-3">
                          {salon.contact_info.owner_name && (
                            <div className="flex justify-between items-center">
                              <span className="text-gray-600">Owner:</span>
                              <span className="font-medium">{salon.contact_info.owner_name}</span>
                            </div>
                          )}
                          
                          {salon.contact_info.phone && (
                            <div className="flex items-center">
                              <Phone className="h-4 w-4 mr-2 text-gray-400" />
                              <span>{salon.contact_info.phone}</span>
                            </div>
                          )}
                          
                          {salon.contact_info.email && (
                            <div className="flex items-center">
                              <Mail className="h-4 w-4 mr-2 text-gray-400" />
                              <span className="break-all">{salon.contact_info.email}</span>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="text-gray-500 text-center p-2">
                          Sign in to view contact details
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <Link to="/salons">
                    <Button variant="outline">Back to Listings</Button>
                  </Link>
                  
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    Contact Seller
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center bg-gray-50 rounded-lg border border-gray-100">
              <h1 className="text-2xl font-bold mb-4">Salon Not Found</h1>
              <p className="text-gray-600 mb-4">
                The salon you're looking for doesn't exist or has been removed.
              </p>
              <Link to="/salons">
                <Button>Browse All Salons</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default SalonDetail;
