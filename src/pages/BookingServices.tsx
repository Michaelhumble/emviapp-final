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
  Zap,
  Shield,
  Diamond,
  Award
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { useBookingServices, BookingService } from '@/hooks/useBookingServices';
import { useBookingSubmission, BookingFormData } from '@/hooks/useBookingSubmission';
import { toast } from 'sonner';

// Premium fallback images for categories
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
    color: 'from-luxury-400 via-luxury-500 to-luxury-600',
    premium: true 
  },
  { 
    key: 'hair', 
    label: 'Hair', 
    icon: Scissors, 
    color: 'from-blue-400 via-blue-500 to-indigo-600',
    premium: true 
  },
  { 
    key: 'barber', 
    label: 'Barber', 
    icon: Scissors, 
    color: 'from-platinum-600 via-platinum-700 to-platinum-800',
    premium: false 
  },
  { 
    key: 'brows-lashes', 
    label: 'Brows & Lashes', 
    icon: Eye, 
    color: 'from-emerald-400 via-emerald-500 to-teal-600',
    premium: true 
  },
  { 
    key: 'makeup', 
    label: 'Makeup', 
    icon: Palette, 
    color: 'from-rose-400 via-pink-500 to-red-600',
    premium: true 
  },
  { 
    key: 'massage', 
    label: 'Massage', 
    icon: Heart, 
    color: 'from-purple-400 via-purple-500 to-pink-600',
    premium: false 
  },
  { 
    key: 'skincare', 
    label: 'Facial & Skincare', 
    icon: Sparkles, 
    color: 'from-cyan-400 via-cyan-500 to-blue-600',
    premium: true 
  },
  { 
    key: 'tattoo', 
    label: 'Tattoo', 
    icon: Flame, 
    color: 'from-orange-500 via-red-500 to-red-700',
    premium: false 
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

  // Premium service badge component
  const ServiceBadge = ({ service }: { service: BookingService }) => {
    if (service.rating && service.rating >= 4.8) {
      return (
        <Badge className="absolute top-3 right-3 bg-gradient-to-r from-gold-400 to-gold-500 text-white border-0 animate-luxury-glow">
          <Crown className="h-3 w-3 mr-1" />
          VIP
        </Badge>
      );
    }
    if (service.rating && service.rating >= 4.5) {
      return (
        <Badge className="absolute top-3 right-3 bg-gradient-to-r from-luxury-500 to-luxury-600 text-white border-0">
          <Award className="h-3 w-3 mr-1" />
          Premium
        </Badge>
      );
    }
    return null;
  };

  return (
    <>
      <Helmet>
        <title>Luxury Beauty Booking - Premium Services | EmviApp</title>
        <meta 
          name="description" 
          content="Book premium beauty services from the finest professionals. Discover luxury nail art, elite hair styling, and exclusive treatments."
        />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-luxury-50 via-white to-platinum-50 pt-20">
        {/* Luxury Hero Section */}
        <div className="relative overflow-hidden">
          {/* Premium background with animated gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-luxury-600 via-luxury-700 to-luxury-800 animate-gradient-shift bg-[length:200%_200%]" />
          
          {/* Luxury overlay pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:40px_40px]" />
          </div>

          <div className="relative z-10 text-white py-24">
            <div className="max-w-7xl mx-auto px-4 text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mb-8"
              >
                <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 leading-tight">
                  <span className="bg-gradient-to-r from-white via-luxury-100 to-gold-300 bg-clip-text text-transparent">
                    Luxury Beauty
                  </span>
                  <br />
                  <span className="text-white font-luxury">Services</span>
                </h1>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="text-xl md:text-2xl mb-8 opacity-90 font-manrope font-medium"
                >
                  Experience world-class beauty treatments from elite professionals
                </motion.p>
                
                {/* Premium stats */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                  className="flex flex-wrap justify-center gap-8 text-sm opacity-90"
                >
                  <div className="flex items-center">
                    <Shield className="h-4 w-4 mr-2 text-gold-300" />
                    <span>Verified Professionals</span>
                  </div>
                  <div className="flex items-center">
                    <Diamond className="h-4 w-4 mr-2 text-gold-300" />
                    <span>Premium Quality</span>
                  </div>
                  <div className="flex items-center">
                    <Zap className="h-4 w-4 mr-2 text-gold-300" />
                    <span>Instant Booking</span>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Premium Category Tabs */}
        <div className="relative bg-white/80 backdrop-blur-md border-b border-luxury-200 sticky top-16 z-30">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex space-x-2 overflow-x-auto py-6 scrollbar-hide">
              {categories.map((category, index) => {
                const Icon = category.icon;
                return (
                  <motion.button
                    key={category.key}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    onClick={() => setActiveCategory(category.key)}
                    className={`relative flex items-center space-x-3 px-8 py-4 rounded-2xl whitespace-nowrap transition-all duration-300 transform ${
                      activeCategory === category.key
                        ? `bg-gradient-to-r ${category.color} text-white shadow-2xl scale-105 animate-luxury-glow`
                        : 'bg-white/60 text-platinum-700 hover:bg-white/80 hover:scale-102 shadow-lg'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-manrope font-semibold">{category.label}</span>
                    {category.premium && (
                      <Crown className="h-4 w-4 opacity-70" />
                    )}
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Luxury Services Grid */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          {loading ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center justify-center py-24"
            >
              <div className="text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-luxury-200 border-t-luxury-600 mx-auto mb-4" />
                <span className="text-luxury-600 font-manrope font-medium text-lg">Loading premium services...</span>
              </div>
            </motion.div>
          ) : error ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-24"
            >
              <div className="text-8xl mb-6">⚠️</div>
              <h3 className="text-3xl font-display font-bold text-platinum-800 mb-4">Service Unavailable</h3>
              <p className="text-platinum-600 font-manrope mb-6 text-lg">{error}</p>
              <Button 
                onClick={refreshServices} 
                className="bg-gradient-to-r from-luxury-600 to-luxury-700 hover:from-luxury-700 hover:to-luxury-800 text-white px-8 py-3 rounded-xl shadow-lg"
              >
                Try Again
              </Button>
            </motion.div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeCategory}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
              >
                {currentServices.length > 0 ? (
                  currentServices.map((service, index) => (
                    <motion.div
                      key={service.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.6 }}
                    >
                      <Card className="group relative overflow-hidden rounded-3xl border-0 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 bg-gradient-to-br from-white to-luxury-50/30 backdrop-blur-sm">
                        <div className="relative">
                          <div className="overflow-hidden rounded-t-3xl">
                            <img
                              src={service.image_url || defaultImages[service.category]}
                              alt={service.title}
                              className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
                              onError={(e) => {
                                e.currentTarget.src = defaultImages[service.category];
                              }}
                            />
                          </div>
                          
                          {/* Premium service badge */}
                          <ServiceBadge service={service} />
                          
                          {/* Rating badge */}
                          {service.rating && (
                            <Badge className="absolute top-3 left-3 bg-white/95 text-platinum-900 border-0 shadow-lg">
                              <Star className="h-3 w-3 mr-1 fill-gold-400 text-gold-400" />
                              {service.rating}
                            </Badge>
                          )}
                          
                          {/* Provider type badge */}
                          <Badge className="absolute bottom-3 left-3 bg-luxury-600/90 text-white border-0">
                            <User className="h-3 w-3 mr-1" />
                            {service.provider_type}
                          </Badge>

                          {/* Glass shine effect */}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                        </div>
                        
                        <CardContent className="p-6 space-y-4">
                          <div>
                            <h3 className="font-display font-bold text-xl mb-2 text-platinum-900">{service.title}</h3>
                            <p className="text-luxury-600 font-manrope font-medium">{service.provider_name}</p>
                          </div>
                          
                          {service.location && (
                            <div className="flex items-center text-platinum-600">
                              <MapPin className="h-4 w-4 mr-2 text-luxury-500" />
                              <span className="font-manrope">{service.location}</span>
                            </div>
                          )}
                          
                          <div className="flex items-center text-platinum-600">
                            <Clock className="h-4 w-4 mr-2 text-luxury-500" />
                            <span className="font-manrope">{service.duration_minutes} minutes</span>
                          </div>
                          
                          {service.description && (
                            <p className="text-platinum-600 font-manrope line-clamp-2">{service.description}</p>
                          )}
                          
                          <div className="flex items-center justify-between pt-4 border-t border-luxury-100">
                            <div>
                              <span className="text-3xl font-display font-bold bg-gradient-to-r from-luxury-600 to-luxury-800 bg-clip-text text-transparent">
                                ${service.price}
                              </span>
                            </div>
                            
                            <Dialog open={isBookingModalOpen && selectedService?.id === service.id} onOpenChange={setIsBookingModalOpen}>
                              <DialogTrigger asChild>
                                <Button 
                                  onClick={() => setSelectedService(service)}
                                  className="bg-gradient-to-r from-luxury-600 via-luxury-700 to-luxury-800 hover:from-luxury-700 hover:via-luxury-800 hover:to-luxury-900 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 font-manrope font-semibold"
                                >
                                  Book Now
                                </Button>
                              </DialogTrigger>
                              
                              <DialogContent className="max-w-md rounded-3xl border-0 bg-gradient-to-br from-white to-luxury-50/30 backdrop-blur-xl">
                                <DialogHeader className="text-center pb-6">
                                  <DialogTitle className="text-2xl font-display font-bold bg-gradient-to-r from-luxury-600 to-luxury-800 bg-clip-text text-transparent">
                                    Reserve {service.title}
                                  </DialogTitle>
                                </DialogHeader>
                                
                                <form onSubmit={handleBookingSubmit} className="space-y-6">
                                  {/* Service summary card */}
                                  <div className="bg-gradient-to-r from-luxury-50 to-luxury-100/50 p-6 rounded-2xl border border-luxury-200">
                                    <h4 className="font-display font-bold text-lg text-platinum-900">{service.provider_name}</h4>
                                    <p className="text-luxury-700 font-manrope">{service.title}</p>
                                    <div className="flex items-center justify-between mt-3">
                                      <span className="text-2xl font-display font-bold text-luxury-700">${service.price}</span>
                                      <span className="text-platinum-600 font-manrope">{service.duration_minutes} min</span>
                                    </div>
                                  </div>
                                  
                                  {/* Form fields */}
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <Label htmlFor="name" className="font-manrope font-medium text-platinum-700">Full Name</Label>
                                      <Input
                                        id="name"
                                        value={bookingForm.name}
                                        onChange={(e) => setBookingForm({...bookingForm, name: e.target.value})}
                                        className="mt-2 rounded-xl border-luxury-200 focus:border-luxury-500 font-manrope"
                                        required
                                      />
                                    </div>
                                    <div>
                                      <Label htmlFor="phone" className="font-manrope font-medium text-platinum-700">Phone</Label>
                                      <Input
                                        id="phone"
                                        type="tel"
                                        value={bookingForm.phone}
                                        onChange={(e) => setBookingForm({...bookingForm, phone: e.target.value})}
                                        className="mt-2 rounded-xl border-luxury-200 focus:border-luxury-500 font-manrope"
                                        required
                                      />
                                    </div>
                                  </div>
                                  
                                  <div>
                                    <Label htmlFor="email" className="font-manrope font-medium text-platinum-700">Email</Label>
                                    <Input
                                      id="email"
                                      type="email"
                                      value={bookingForm.email}
                                      onChange={(e) => setBookingForm({...bookingForm, email: e.target.value})}
                                      className="mt-2 rounded-xl border-luxury-200 focus:border-luxury-500 font-manrope"
                                      required
                                    />
                                  </div>
                                  
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <Label htmlFor="date" className="font-manrope font-medium text-platinum-700">Preferred Date</Label>
                                      <Input
                                        id="date"
                                        type="date"
                                        value={bookingForm.date}
                                        onChange={(e) => setBookingForm({...bookingForm, date: e.target.value})}
                                        className="mt-2 rounded-xl border-luxury-200 focus:border-luxury-500 font-manrope"
                                        required
                                      />
                                    </div>
                                    <div>
                                      <Label htmlFor="time" className="font-manrope font-medium text-platinum-700">Preferred Time</Label>
                                      <Input
                                        id="time"
                                        type="time"
                                        value={bookingForm.time}
                                        onChange={(e) => setBookingForm({...bookingForm, time: e.target.value})}
                                        className="mt-2 rounded-xl border-luxury-200 focus:border-luxury-500 font-manrope"
                                        required
                                      />
                                    </div>
                                  </div>
                                  
                                  <div>
                                    <Label htmlFor="notes" className="font-manrope font-medium text-platinum-700">Special Requests</Label>
                                    <Textarea
                                      id="notes"
                                      value={bookingForm.notes}
                                      onChange={(e) => setBookingForm({...bookingForm, notes: e.target.value})}
                                      placeholder="Any special requests or preferences..."
                                      className="mt-2 rounded-xl border-luxury-200 focus:border-luxury-500 font-manrope"
                                      rows={3}
                                    />
                                  </div>
                                  
                                  <Button 
                                    type="submit" 
                                    disabled={isSubmitting}
                                    className="w-full bg-gradient-to-r from-luxury-600 via-luxury-700 to-luxury-800 hover:from-luxury-700 hover:via-luxury-800 hover:to-luxury-900 text-white py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-manrope font-semibold text-lg"
                                  >
                                    {isSubmitting ? (
                                      <>
                                        <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                                        Confirming Reservation...
                                      </>
                                    ) : (
                                      'Confirm Luxury Booking'
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
                    className="col-span-full text-center py-24"
                  >
                    <div className="text-8xl mb-6">✨</div>
                    <h3 className="text-3xl font-display font-bold text-platinum-800 mb-4">No Premium Services Available</h3>
                    <p className="text-platinum-600 font-manrope text-lg">
                      Our exclusive {categories.find(c => c.key === activeCategory)?.label.toLowerCase()} services are coming soon. 
                      <br />Stay tuned for world-class treatments.
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