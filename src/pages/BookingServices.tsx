import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, Calendar, Clock, Star, Sparkles, Scissors, Palette, Eye, Heart, Flame, Loader2, User } from 'lucide-react';
import { motion } from 'framer-motion';
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
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
              <span className="ml-2 text-gray-600">Loading services...</span>
            </div>
          ) : error ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">⚠️</div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">Error Loading Services</h3>
              <p className="text-gray-600 mb-4">{error}</p>
              <Button onClick={refreshServices} variant="outline">
                Try Again
              </Button>
            </div>
          ) : (
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
                        src={service.image_url || defaultImages[service.category]}
                        alt={service.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          e.currentTarget.src = defaultImages[service.category];
                        }}
                      />
                      {service.rating && (
                        <Badge className="absolute top-2 right-2 bg-white/90 text-gray-900">
                          <Star className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" />
                          {service.rating}
                        </Badge>
                      )}
                      <Badge className="absolute top-2 left-2 bg-blue-500/90 text-white">
                        <User className="h-3 w-3 mr-1" />
                        {service.provider_type}
                      </Badge>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-lg mb-1">{service.title}</h3>
                      <p className="text-gray-600 text-sm mb-2">{service.provider_name}</p>
                      {service.location && (
                        <div className="flex items-center text-gray-500 text-sm mb-3">
                          <MapPin className="h-4 w-4 mr-1" />
                          {service.location}
                        </div>
                      )}
                      <div className="flex items-center text-gray-500 text-sm mb-3">
                        <Clock className="h-4 w-4 mr-1" />
                        {service.duration_minutes} minutes
                      </div>
                      {service.description && (
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{service.description}</p>
                      )}
                      <div className="flex items-center justify-between">
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
                              <DialogTitle>Book {service.title}</DialogTitle>
                            </DialogHeader>
                            <form onSubmit={handleBookingSubmit} className="space-y-4">
                              <div className="bg-gray-50 p-4 rounded-lg">
                                <h4 className="font-semibold">{service.provider_name}</h4>
                                <p className="text-sm text-gray-600">{service.title}</p>
                                <p className="text-lg font-bold text-purple-600">${service.price}</p>
                                <p className="text-sm text-gray-500">{service.duration_minutes} minutes</p>
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
                                disabled={isSubmitting}
                                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                              >
                                {isSubmitting ? (
                                  <>
                                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                    Sending Request...
                                  </>
                                ) : (
                                  'Send Booking Request'
                                )}
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
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-2xl font-semibold text-gray-800 mb-2">No Services Found</h3>
                  <p className="text-gray-600">No {categories.find(c => c.key === activeCategory)?.label.toLowerCase()} services available yet. Check back soon!</p>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
};

export default BookingServices;