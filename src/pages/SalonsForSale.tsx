import React from 'react';
import { Helmet } from 'react-helmet-async';
import { MapPin, DollarSign, Users, TrendingUp, Building, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const SalonsForSale = () => {
  const salons = [
    {
      id: '1',
      name: 'Elite Beauty Salon',
      location: 'Beverly Hills, CA',
      price: '$450,000',
      revenue: '$85K/month',
      chairs: 8,
      sqft: 2500,
      established: 2015,
      rating: 4.9,
      description: 'Established full-service salon in prime Beverly Hills location with loyal clientele...',
      highlights: ['Prime location', 'Loyal clientele', 'Modern equipment', 'Growth potential']
    },
    {
      id: '2',
      name: 'Downtown Hair Studio',
      location: 'Austin, TX',
      price: '$275,000',
      revenue: '$45K/month',
      chairs: 6,
      sqft: 1800,
      established: 2018,
      rating: 4.7,
      description: 'Trendy hair studio in Austin\'s vibrant downtown district...',
      highlights: ['High foot traffic', 'Young demographic', 'Social media presence', 'Expansion ready']
    },
    {
      id: '3',
      name: 'Luxury Spa & Salon',
      location: 'Miami, FL',
      price: '$650,000',
      revenue: '$120K/month',
      chairs: 12,
      sqft: 4000,
      established: 2012,
      rating: 4.8,
      description: 'Full-service luxury spa and salon with established VIP clientele...',
      highlights: ['Luxury market', 'Full spa services', 'VIP clientele', 'Premium location']
    }
  ];

  const benefits = [
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Proven Business Model",
      description: "Acquire established salons with proven revenue streams and loyal customer bases."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Existing Staff",
      description: "Take over with trained staff already in place, ensuring smooth operations from day one."
    },
    {
      icon: <Building className="w-6 h-6" />,
      title: "Prime Locations",
      description: "Secure valuable commercial real estate in high-traffic areas with established foot traffic."
    },
    {
      icon: <DollarSign className="w-6 h-6" />,
      title: "Immediate Revenue",
      description: "Start generating income immediately with existing client relationships and booking schedules."
    }
  ];

  return (
    <>
      <Helmet>
        <title>Salons for Sale - EmviApp | Buy Established Beauty Salons</title>
        <meta name="description" content="Discover profitable salons for sale across the US. Browse established beauty businesses with proven revenue streams, loyal clientele, and growth potential." />
        <meta name="keywords" content="salons for sale, buy salon, beauty business for sale, salon acquisition, beauty salon investment" />
      </Helmet>

      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">
                Salons for Sale
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Discover profitable beauty salon opportunities across the country. 
                From established full-service salons to boutique studios, find your next investment.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/sell-salon">
                  <Button size="lg" className="px-8 py-3">
                    List Your Salon
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="outline" size="lg" className="px-8 py-3">
                    Get Expert Help
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Salon Listings */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="mb-12">
                <h2 className="text-3xl font-serif font-bold text-center mb-4">Featured Salon Opportunities</h2>
                <p className="text-gray-600 text-center max-w-2xl mx-auto">
                  Hand-selected salons with strong financials, prime locations, and growth potential
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {salons.map((salon) => (
                  <div key={salon.id} className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-lg transition-shadow overflow-hidden">
                    <div className="h-48 bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                      <Building className="w-16 h-16 text-purple-400" />
                    </div>
                    
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-semibold">{salon.name}</h3>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500" />
                          <span className="text-sm text-gray-600">{salon.rating}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-1 text-gray-600 mb-3">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">{salon.location}</span>
                      </div>

                      <div className="text-2xl font-bold text-primary mb-3">{salon.price}</div>
                      
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <div className="text-sm text-gray-500">Monthly Revenue</div>
                          <div className="font-semibold">{salon.revenue}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">Chairs</div>
                          <div className="font-semibold">{salon.chairs}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">Square Feet</div>
                          <div className="font-semibold">{salon.sqft}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">Established</div>
                          <div className="font-semibold">{salon.established}</div>
                        </div>
                      </div>

                      <p className="text-gray-600 text-sm mb-4">{salon.description}</p>

                      <div className="mb-4">
                        <div className="text-sm font-medium text-gray-800 mb-2">Key Highlights:</div>
                        <div className="flex flex-wrap gap-1">
                          {salon.highlights.map((highlight, index) => (
                            <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                              {highlight}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button className="flex-1">
                          View Details
                        </Button>
                        <Button variant="outline" className="flex-1">
                          Contact Seller
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center mt-12">
                <Button variant="outline" size="lg">
                  View All Listings
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-serif font-bold mb-4">
                  Why Buy an Established Salon?
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Purchasing an existing salon offers numerous advantages over starting from scratch
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {benefits.map((benefit, index) => (
                  <div key={index} className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full text-primary mb-4">
                      {benefit.icon}
                    </div>
                    <h3 className="text-lg font-semibold mb-3">{benefit.title}</h3>
                    <p className="text-gray-600 text-sm">{benefit.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-serif font-bold mb-4">
                  How It Works
                </h2>
                <p className="text-lg text-gray-600">
                  Our streamlined process makes salon acquisition simple and secure
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                    1
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Browse & Discover</h3>
                  <p className="text-gray-600">
                    Explore verified salon listings with detailed financials and comprehensive information
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                    2
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Due Diligence</h3>
                  <p className="text-gray-600">
                    Review financials, conduct site visits, and receive expert guidance throughout the process
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                    3
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Complete Purchase</h3>
                  <p className="text-gray-600">
                    Finalize the transaction with legal support and begin operating your new salon
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
                Ready to Own Your Dream Salon?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Browse our curated selection of profitable salon opportunities 
                or list your salon for sale with our expert team.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact">
                  <Button size="lg" variant="secondary" className="px-8 py-3">
                    Schedule Consultation
                  </Button>
                </Link>
                <Link to="/sell-salon">
                  <Button size="lg" variant="outline" className="px-8 py-3 border-white text-white hover:bg-white hover:text-primary">
                    Sell Your Salon
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default SalonsForSale;