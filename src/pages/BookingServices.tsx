import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  MapPin, 
  Calendar, 
  Clock, 
  Star, 
  Sparkles, 
  Scissors, 
  Palette, 
  Eye, 
  Heart, 
  Flame, 
  Loader2, 
  User,
  Crown,
  Award,
  Shield,
  Diamond,
  Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { useBookingServices, BookingService } from '@/hooks/useBookingServices';
import { useBookingSubmission, BookingFormData } from '@/hooks/useBookingSubmission';
import { toast } from 'sonner';

// Default fallback images for categories
const defaultImages: { [key: string]: string } = {
  nails: 'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/nails//_A%20long,%20luxurious%20nail%20salon-10.png',
  hair: 'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/hair//generated%20(1).png',
  barber: 'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/barber//generated%20(1).png',
  'brows-lashes': 'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/brow-lashes//generated-11.png',
  makeup: 'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/makeup//generated-45.png',
  massage: 'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/massage//generated%20(1).png',
  skincare: 'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/facial-skincare//generated%20(1).png',
  tattoo: 'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/tattoo//generated%20(1).png',
};

const categories = [
  { 
    key: 'nails', 
    label: 'Nails', 
    icon: Sparkles, 
    color: 'from-purple-500 to-pink-500'
  },
  { 
    key: 'hair', 
    label: 'Hair', 
    icon: Scissors, 
    color: 'from-blue-500 to-indigo-500'
  },
  { 
    key: 'barber', 
    label: 'Barber', 
    icon: Scissors, 
    color: 'from-gray-600 to-gray-800'
  },
  { 
    key: 'brows-lashes', 
    label: 'Brows & Lashes', 
    icon: Eye, 
    color: 'from-green-500 to-teal-500'
  },
  { 
    key: 'makeup', 
    label: 'Makeup', 
    icon: Palette, 
    color: 'from-orange-500 to-red-500'
  },
  { 
    key: 'massage', 
    label: 'Massage', 
    icon: Heart, 
    color: 'from-purple-500 to-pink-500'
  },
  { 
    key: 'skincare', 
    label: 'Facial & Skincare', 
    icon: Sparkles, 
    color: 'from-cyan-500 to-blue-500'
  },
  { 
    key: 'tattoo', 
    label: 'Tattoo', 
    icon: Flame, 
    color: 'from-red-600 to-orange-600'
  }
];

const BookingServices = () => {
  const [activeCategory, setActiveCategory] = useState('nails');
  const [selectedService, setSelectedService] = useState<BookingService | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingForm, setBookingForm] = useState<BookingFormData>({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    notes: ''
  });

  // Fetch real services from database
  const { services, loading, error, refreshServices } = useBookingServices();
  const { submitBooking, isSubmitting } = useBookingSubmission();

  // Filter services by category
  const currentServices = useMemo(() => {
    return services.filter(service => service.category === activeCategory);
  }, [services, activeCategory]);

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedService) {
      toast.error('No service selected');
      return;
    }

    const success = await submitBooking(selectedService.id, selectedService.provider_id, bookingForm);
    
    if (success) {
      setIsBookingModalOpen(false);
      setBookingForm({ name: '', email: '', phone: '', date: '', time: '', notes: '' });
      setSelectedService(null);
    }
  };

  return (
    <>
      <Helmet>
        <title>Premium Beauty Booking - Elite Services | EmviApp</title>
        <meta 
          name="description" 
          content="Book premium beauty services from top professionals. Find nail technicians, hair stylists, barbers, makeup artists, and more."
        />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 pt-20">
        {/* Enhanced Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-purple-700 to-pink-600 text-white py-20">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:40px_40px]" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-6 font-serif">
                Premium Beauty Services
              </h1>
              <p className="text-xl md:text-2xl mb-8 opacity-90 font-medium">
                Experience world-class treatments from verified professionals
              </p>
              
              {/* Trust indicators */}
              <div className="flex flex-wrap justify-center gap-8 text-sm opacity-90">
                <div className="flex items-center">
                  <Shield className="h-4 w-4 mr-2" />
                  <span>Verified Professionals</span>
                </div>
                <div className="flex items-center">
                  <Diamond className="h-4 w-4 mr-2" />
                  <span>Premium Quality</span>
                </div>
                <div className="flex items-center">
                  <Zap className="h-4 w-4 mr-2" />
                  <span>Instant Booking</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Category Tabs - Simplified */}
        <div className="bg-white/90 backdrop-blur-sm border-b border-gray-200 sticky top-16 z-30">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex space-x-2 overflow-x-auto py-6 scrollbar-hide">
              {categories.map((category, index) => {
                const Icon = category.icon;
                return (
                  <motion.button
                    key={category.key}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.4 }}
                    onClick={() => setActiveCategory(category.key)}
                    className={`flex items-center space-x-3 px-6 py-3 rounded-full whitespace-nowrap transition-all duration-200 ${
                      activeCategory === category.key
                        ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="font-medium">{category.label}</span>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Services Grid - Simplified */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          {loading ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center justify-center py-16"
            >
              <Loader2 className="h-8 w-8 animate-spin text-purple-600 mr-3" />
              <span className="text-gray-600 font-medium">Loading premium services...</span>
            </motion.div>
          ) : error ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <div className="text-6xl mb-4">⚠️</div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">Service Unavailable</h3>
              <p className="text-gray-600 mb-4">{error}</p>
              <Button onClick={refreshServices} variant="outline">
                Try Again
              </Button>
            </motion.div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeCategory}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                {currentServices.length > 0 ? (
                  currentServices.map((service, index) => (
                    <motion.div
                      key={service.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05, duration: 0.4 }}
                    >
                      <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-0 bg-white">
                        <div className="relative">
                          <img
                            src={service.image_url || defaultImages[service.category]}
                            alt={service.title}
                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                            onError={(e) => {
                              e.currentTarget.src = defaultImages[service.category];
                            }}
                          />
                          
                          {/* Premium badges */}
                          {service.rating && service.rating >= 4.8 && (
                            <Badge className="absolute top-3 right-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white border-0">
                              <Crown className="h-3 w-3 mr-1" />
                              VIP
                            </Badge>
                          )}
                          
                          {service.rating && service.rating >= 4.5 && service.rating < 4.8 && (
                            <Badge className="absolute top-3 right-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white border-0">
                              <Award className="h-3 w-3 mr-1" />
                              Premium
                            </Badge>
                          )}
                          
                          {service.rating && (
                            <Badge className="absolute top-3 left-3 bg-white/95 text-gray-900 border-0">
                              <Star className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" />
                              {service.rating}
                            </Badge>
                          )}
                          
                          <Badge className="absolute bottom-3 left-3 bg-purple-600/90 text-white border-0">
                            <User className="h-3 w-3 mr-1" />
                            {service.provider_type}
                          </Badge>
                        </div>
                        
                        <CardContent className="p-6">
                          <h3 className="font-semibold text-xl mb-2 text-gray-900">{service.title}</h3>
                          <p className="text-purple-600 font-medium mb-3">{service.provider_name}</p>
                          
                          {service.location && (
                            <div className="flex items-center text-gray-500 mb-2">
                              <MapPin className="h-4 w-4 mr-2" />
                              <span>{service.location}</span>
                            </div>
                          )}
                          
                          <div className="flex items-center text-gray-500 mb-3">
                            <Clock className="h-4 w-4 mr-2" />
                            <span>{service.duration_minutes} minutes</span>
                          </div>
                          
                          {service.description && (
                            <p className="text-gray-600 line-clamp-2 mb-4">{service.description}</p>
                          )}
                          
                          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                            <span className="text-2xl font-bold text-purple-600">${service.price}</span>
                            
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
                                  <DialogTitle className="text-xl font-semibold">Book {service.title}</DialogTitle>
                                </DialogHeader>
                                
                                <form onSubmit={handleBookingSubmit} className="space-y-4">
                                  <div className="bg-gray-50 p-4 rounded-lg">
                                    <h4 className="font-semibold text-lg">{service.provider_name}</h4>
                                    <p className="text-gray-600">{service.title}</p>
                                    <div className="flex items-center justify-between mt-2">
                                      <span className="text-2xl font-bold text-purple-600">${service.price}</span>
                                      <span className="text-gray-500">{service.duration_minutes} min</span>
                                    </div>
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
                                    <Label htmlFor="notes">Special Requests</Label>
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
                                    disabled={isSubmitting}
                                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                                  >
                                    {isSubmitting ? (
                                      <>
                                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                        Sending Request...
                                      </>
                                    ) : (
                                      'Confirm Booking'
                                    )}
                                  </Button>
                                </form>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))
                ) : (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="col-span-full text-center py-16"
                  >
                    <div className="text-6xl mb-4">🔍</div>
                    <h3 className="text-2xl font-semibold text-gray-800 mb-2">No Services Found</h3>
                    <p className="text-gray-600">
                      No {categories.find(c => c.key === activeCategory)?.label.toLowerCase()} services available yet. Check back soon!
                    </p>
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </div>
    </>
  );
};

export default BookingServices;