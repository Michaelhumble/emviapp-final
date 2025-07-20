import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, Calendar, Clock, Star, Sparkles, Scissors, Palette, Eye, Heart, Flame } from 'lucide-react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';

interface Service {
  id: string;
  businessName: string;
  title: string;
  price: string;
  city: string;
  images: string[];
  rating?: number;
  category: string;
  description?: string;
}

const mockServices: { [key: string]: Service[] } = {
  nails: [
    {
      id: '1',
      businessName: 'Luxe Nail Studio',
      title: 'Gel Manicure & Pedicure',
      price: '$45',
      city: 'Los Angeles, CA',
      images: ['https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/nails//_A%20long,%20luxurious%20nail%20salon-10.png'],
      rating: 4.8,
      category: 'nails',
      description: 'Professional gel manicure and pedicure with luxury care'
    },
    {
      id: '2',
      businessName: 'Crystal Nails',
      title: 'Acrylic Full Set',
      price: '$55',
      city: 'Miami, FL',
      images: ['https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/nails//_A%20long,%20luxurious%20nail%20salon-12.png'],
      rating: 4.9,
      category: 'nails',
      description: 'Beautiful acrylic nails with custom designs'
    },
    {
      id: '3',
      businessName: 'Elite Nail Bar',
      title: 'Dip Powder Manicure',
      price: '$40',
      city: 'New York, NY',
      images: ['https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/nails//_A%20long,%20luxurious%20nail%20salon-13.png'],
      rating: 4.7,
      category: 'nails',
      description: 'Long-lasting dip powder with trendy colors'
    },
    {
      id: '4',
      businessName: 'Glamour Nails',
      title: 'Nail Art Design',
      price: '$65',
      city: 'Chicago, IL',
      images: ['https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/nails//_A%20long,%20luxurious%20nail%20salon-6.png'],
      rating: 4.9,
      category: 'nails',
      description: 'Custom nail art with intricate designs'
    },
    {
      id: '5',
      businessName: 'Perfect Touch',
      title: 'Classic Pedicure',
      price: '$35',
      city: 'Dallas, TX',
      images: ['https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/nails//generated%20(003).png'],
      rating: 4.6,
      category: 'nails',
      description: 'Relaxing classic pedicure with foot massage'
    },
    {
      id: '6',
      businessName: 'Divine Nails',
      title: 'Luxury Spa Manicure',
      price: '$50',
      city: 'San Francisco, CA',
      images: ['https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/nails//generated%20(01).png'],
      rating: 4.8,
      category: 'nails',
      description: 'Premium spa experience with hand treatment'
    }
  ],
  hair: [
    {
      id: '7',
      businessName: 'Style Studio',
      title: 'Haircut & Blow Dry',
      price: '$65',
      city: 'Beverly Hills, CA',
      images: ['https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/hair//generated%20(1).png'],
      rating: 4.9,
      category: 'hair',
      description: 'Professional haircut with styling'
    },
    {
      id: '8',
      businessName: 'Elegant Hair',
      title: 'Color & Highlights',
      price: '$120',
      city: 'Atlanta, GA',
      images: ['https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/hair//generated%20(2).png'],
      rating: 4.8,
      category: 'hair',
      description: 'Expert hair coloring and highlighting'
    },
    {
      id: '9',
      businessName: 'Trendy Cuts',
      title: 'Keratin Treatment',
      price: '$180',
      city: 'Seattle, WA',
      images: ['https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/hair//generated%20(3).png'],
      rating: 4.7,
      category: 'hair',
      description: 'Smoothing keratin treatment for healthy hair'
    },
    {
      id: '10',
      businessName: 'Luxe Hair Lounge',
      title: 'Balayage Highlights',
      price: '$200',
      city: 'Portland, OR',
      images: ['https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/hair//generated%20(5).png'],
      rating: 4.9,
      category: 'hair',
      description: 'Natural-looking balayage highlights'
    }
  ],
  barber: [
    {
      id: '11',
      businessName: 'Classic Cuts',
      title: 'Traditional Haircut',
      price: '$25',
      city: 'Brooklyn, NY',
      images: ['https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/barber//generated%20(1).png'],
      rating: 4.8,
      category: 'barber',
      description: 'Classic men\'s haircut with precision'
    },
    {
      id: '12',
      businessName: 'Modern Barber',
      title: 'Beard Trim & Style',
      price: '$20',
      city: 'Austin, TX',
      images: ['https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/barber//generated%20(2).png'],
      rating: 4.7,
      category: 'barber',
      description: 'Professional beard trimming and styling'
    },
    {
      id: '13',
      businessName: 'Gentleman\'s Club',
      title: 'Hot Towel Shave',
      price: '$35',
      city: 'Nashville, TN',
      images: ['https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/barber//generated%20(3).png'],
      rating: 4.9,
      category: 'barber',
      description: 'Luxurious hot towel shave experience'
    },
    {
      id: '14',
      businessName: 'Sharp Cuts',
      title: 'Fade & Lineup',
      price: '$30',
      city: 'Phoenix, AZ',
      images: ['https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/barber//generated%20(4).png'],
      rating: 4.8,
      category: 'barber',
      description: 'Perfect fade cuts with clean lineups'
    }
  ],
  'brows-lashes': [
    {
      id: '15',
      businessName: 'Brow Bar',
      title: 'Eyebrow Threading',
      price: '$18',
      city: 'San Diego, CA',
      images: ['https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/brow-lashes//generated-11.png'],
      rating: 4.8,
      category: 'brows-lashes',
      description: 'Precise eyebrow threading for perfect shape'
    },
    {
      id: '16',
      businessName: 'Lash Studio',
      title: 'Eyelash Extensions',
      price: '$85',
      city: 'Las Vegas, NV',
      images: ['https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/brow-lashes//generated-12.png'],
      rating: 4.9,
      category: 'brows-lashes',
      description: 'Premium eyelash extensions for stunning lashes'
    },
    {
      id: '17',
      businessName: 'Perfect Brows',
      title: 'Brow Lamination',
      price: '$45',
      city: 'Denver, CO',
      images: ['https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/brow-lashes//generated-13.png'],
      rating: 4.7,
      category: 'brows-lashes',
      description: 'Long-lasting brow lamination treatment'
    },
    {
      id: '18',
      businessName: 'Lash Lounge',
      title: 'Lash Lift & Tint',
      price: '$55',
      city: 'Tampa, FL',
      images: ['https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/brow-lashes//generated-14.png'],
      rating: 4.8,
      category: 'brows-lashes',
      description: 'Natural lash enhancement with lift and tint'
    }
  ],
  makeup: [
    {
      id: '19',
      businessName: 'Glam Studio',
      title: 'Bridal Makeup',
      price: '$150',
      city: 'Orlando, FL',
      images: ['https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/makeup//generated-45.png'],
      rating: 4.9,
      category: 'makeup',
      description: 'Professional bridal makeup for your special day'
    },
    {
      id: '20',
      businessName: 'Beauty Bar',
      title: 'Evening Glam',
      price: '$75',
      city: 'Houston, TX',
      images: ['https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/makeup//generated-46.png'],
      rating: 4.8,
      category: 'makeup',
      description: 'Glamorous evening makeup for special events'
    },
    {
      id: '21',
      businessName: 'Pro Makeup',
      title: 'Natural Look',
      price: '$50',
      city: 'Boston, MA',
      images: ['https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/makeup//generated-47.png'],
      rating: 4.7,
      category: 'makeup',
      description: 'Natural, everyday makeup application'
    },
    {
      id: '22',
      businessName: 'Artistry Studio',
      title: 'Special Effects',
      price: '$100',
      city: 'Detroit, MI',
      images: ['https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/makeup//generated-48.png'],
      rating: 4.9,
      category: 'makeup',
      description: 'Creative special effects and artistic makeup'
    }
  ],
  massage: [
    {
      id: '23',
      businessName: 'Zen Spa',
      title: 'Deep Tissue Massage',
      price: '$90',
      city: 'San Jose, CA',
      images: ['https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/massage//generated%20(1).png'],
      rating: 4.8,
      category: 'massage',
      description: 'Therapeutic deep tissue massage for muscle relief'
    },
    {
      id: '24',
      businessName: 'Relaxation Studio',
      title: 'Swedish Massage',
      price: '$70',
      city: 'Minneapolis, MN',
      images: ['https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/massage//generated%20(2).png'],
      rating: 4.7,
      category: 'massage',
      description: 'Relaxing Swedish massage for stress relief'
    },
    {
      id: '25',
      businessName: 'Wellness Center',
      title: 'Hot Stone Massage',
      price: '$110',
      city: 'Salt Lake City, UT',
      images: ['https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/massage//generated%20(3).png'],
      rating: 4.9,
      category: 'massage',
      description: 'Luxurious hot stone massage therapy'
    },
    {
      id: '26',
      businessName: 'Therapeutic Touch',
      title: 'Prenatal Massage',
      price: '$85',
      city: 'Sacramento, CA',
      images: ['https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/massage//generated.png'],
      rating: 4.8,
      category: 'massage',
      description: 'Specialized prenatal massage for expecting mothers'
    }
  ],
  skincare: [
    {
      id: '27',
      businessName: 'Pure Skin',
      title: 'European Facial',
      price: '$80',
      city: 'Charlotte, NC',
      images: ['https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/facial-skincare//generated%20(1).png'],
      rating: 4.8,
      category: 'skincare',
      description: 'Deep cleansing European facial treatment'
    },
    {
      id: '28',
      businessName: 'Glow Studio',
      title: 'HydraFacial',
      price: '$120',
      city: 'Raleigh, NC',
      images: ['https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/facial-skincare//generated%20(2).png'],
      rating: 4.9,
      category: 'skincare',
      description: 'Advanced HydraFacial for glowing skin'
    },
    {
      id: '29',
      businessName: 'Skin Renewal',
      title: 'Chemical Peel',
      price: '$95',
      city: 'Jacksonville, FL',
      images: ['https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/facial-skincare//generated%20(3).png'],
      rating: 4.7,
      category: 'skincare',
      description: 'Professional chemical peel for skin renewal'
    },
    {
      id: '30',
      businessName: 'Radiant Skin',
      title: 'Anti-Aging Facial',
      price: '$105',
      city: 'Columbus, OH',
      images: ['https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/facial-skincare//generated%20(4).png'],
      rating: 4.8,
      category: 'skincare',
      description: 'Advanced anti-aging facial treatment'
    }
  ],
  tattoo: [
    {
      id: '31',
      businessName: 'Ink Masters',
      title: 'Small Tattoo Design',
      price: '$80',
      city: 'Portland, OR',
      images: ['https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/tattoo//generated%20(1).png'],
      rating: 4.9,
      category: 'tattoo',
      description: 'Custom small tattoo designs by skilled artists'
    },
    {
      id: '32',
      businessName: 'Art & Ink',
      title: 'Traditional Tattoo',
      price: '$150',
      city: 'San Antonio, TX',
      images: ['https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/tattoo//generated%20(2).png'],
      rating: 4.8,
      category: 'tattoo',
      description: 'Classic traditional style tattoos'
    },
    {
      id: '33',
      businessName: 'Modern Tattoo',
      title: 'Realistic Portrait',
      price: '$300',
      city: 'Memphis, TN',
      images: ['https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/tattoo//generated%20(3).png'],
      rating: 4.9,
      category: 'tattoo',
      description: 'Photorealistic portrait tattoos'
    },
    {
      id: '34',
      businessName: 'Custom Ink',
      title: 'Watercolor Design',
      price: '$200',
      city: 'Louisville, KY',
      images: ['https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/tattoo//generated%20(4).png'],
      rating: 4.8,
      category: 'tattoo',
      description: 'Artistic watercolor style tattoos'
    }
  ]
};

const categories = [
  { key: 'nails', label: 'Nails', icon: Sparkles, color: 'from-pink-500 to-purple-500' },
  { key: 'hair', label: 'Hair', icon: Scissors, color: 'from-blue-500 to-indigo-500' },
  { key: 'barber', label: 'Barber', icon: Scissors, color: 'from-gray-600 to-gray-800' },
  { key: 'brows-lashes', label: 'Brows & Lashes', icon: Eye, color: 'from-green-500 to-teal-500' },
  { key: 'makeup', label: 'Makeup', icon: Palette, color: 'from-orange-500 to-red-500' },
  { key: 'massage', label: 'Massage', icon: Heart, color: 'from-purple-500 to-pink-500' },
  { key: 'skincare', label: 'Facial & Skincare', icon: Sparkles, color: 'from-cyan-500 to-blue-500' },
  { key: 'tattoo', label: 'Tattoo', icon: Flame, color: 'from-red-600 to-orange-600' }
];

const BookingServices = () => {
  const [activeCategory, setActiveCategory] = useState('nails');
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    notes: ''
  });

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Booking submitted:', { service: selectedService, form: bookingForm });
    // Here you would handle the actual booking submission
    setIsBookingModalOpen(false);
    setBookingForm({ name: '', email: '', phone: '', date: '', time: '', notes: '' });
  };

  const currentServices = mockServices[activeCategory] || [];

  return (
    <>
      <Helmet>
        <title>Booking Services - Discover & Book Beauty Services | EmviApp</title>
        <meta 
          name="description" 
          content="Discover and book beauty services from top professionals. Find nail technicians, hair stylists, barbers, makeup artists, and more in your area."
        />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 pt-20">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-bold mb-4"
            >
              Book Beauty Services
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl md:text-2xl mb-8 opacity-90"
            >
              Discover and book services from top beauty professionals
            </motion.p>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="bg-white border-b sticky top-16 z-30">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex space-x-1 overflow-x-auto py-4 scrollbar-hide">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.key}
                    onClick={() => setActiveCategory(category.key)}
                    className={`flex items-center space-x-2 px-6 py-3 rounded-full whitespace-nowrap transition-all duration-200 ${
                      activeCategory === category.key
                        ? `bg-gradient-to-r ${category.color} text-white shadow-lg transform scale-105`
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="font-medium">{category.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <motion.div 
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {currentServices.length > 0 ? (
              currentServices.map((service) => (
                <Card key={service.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <div className="relative">
                    <img
                      src={service.images[0]}
                      alt={service.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {service.rating && (
                      <Badge className="absolute top-2 right-2 bg-white/90 text-gray-900">
                        <Star className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" />
                        {service.rating}
                      </Badge>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-1">{service.title}</h3>
                    <p className="text-gray-600 text-sm mb-2">{service.businessName}</p>
                    <div className="flex items-center text-gray-500 text-sm mb-3">
                      <MapPin className="h-4 w-4 mr-1" />
                      {service.city}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-purple-600">{service.price}</span>
                      <Dialog open={isBookingModalOpen && selectedService?.id === service.id} onOpenChange={setIsBookingModalOpen}>
                        <DialogTrigger asChild>
                          <Button 
                            onClick={() => setSelectedService(service)}
                            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                          >
                            Book Now
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-md">
                          <DialogHeader>
                            <DialogTitle>Book {service.title}</DialogTitle>
                          </DialogHeader>
                          <form onSubmit={handleBookingSubmit} className="space-y-4">
                            <div className="bg-gray-50 p-4 rounded-lg">
                              <h4 className="font-semibold">{service.businessName}</h4>
                              <p className="text-sm text-gray-600">{service.title}</p>
                              <p className="text-lg font-bold text-purple-600">{service.price}</p>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label htmlFor="name">Full Name</Label>
                                <Input
                                  id="name"
                                  value={bookingForm.name}
                                  onChange={(e) => setBookingForm({...bookingForm, name: e.target.value})}
                                  required
                                />
                              </div>
                              <div>
                                <Label htmlFor="phone">Phone</Label>
                                <Input
                                  id="phone"
                                  type="tel"
                                  value={bookingForm.phone}
                                  onChange={(e) => setBookingForm({...bookingForm, phone: e.target.value})}
                                  required
                                />
                              </div>
                            </div>
                            
                            <div>
                              <Label htmlFor="email">Email</Label>
                              <Input
                                id="email"
                                type="email"
                                value={bookingForm.email}
                                onChange={(e) => setBookingForm({...bookingForm, email: e.target.value})}
                                required
                              />
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label htmlFor="date">Preferred Date</Label>
                                <Input
                                  id="date"
                                  type="date"
                                  value={bookingForm.date}
                                  onChange={(e) => setBookingForm({...bookingForm, date: e.target.value})}
                                  required
                                />
                              </div>
                              <div>
                                <Label htmlFor="time">Preferred Time</Label>
                                <Input
                                  id="time"
                                  type="time"
                                  value={bookingForm.time}
                                  onChange={(e) => setBookingForm({...bookingForm, time: e.target.value})}
                                  required
                                />
                              </div>
                            </div>
                            
                            <div>
                              <Label htmlFor="notes">Special Requests (Optional)</Label>
                              <Textarea
                                id="notes"
                                value={bookingForm.notes}
                                onChange={(e) => setBookingForm({...bookingForm, notes: e.target.value})}
                                placeholder="Any special requests or preferences..."
                                rows={3}
                              />
                            </div>
                            
                            <Button 
                              type="submit" 
                              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                            >
                              Send Booking Request
                            </Button>
                          </form>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-16">
                <div className="text-6xl mb-4">🚀</div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">Coming Soon!</h3>
                <p className="text-gray-600">We're working on bringing amazing {categories.find(c => c.key === activeCategory)?.label.toLowerCase()} services to you.</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default BookingServices;