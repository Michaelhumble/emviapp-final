import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { 
  Calendar, Clock, MapPin, Star, CheckCircle, AlertCircle, 
  MessageSquare, CreditCard, Gift, Zap, ArrowRight, ArrowLeft,
  Phone, Mail, User, Heart, Shield, Trophy
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/auth';
import { toast } from 'sonner';

interface BookingStep {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  current: boolean;
}

interface Provider {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  reviewCount: number;
  specialties: string[];
  distance: string;
  nextAvailable: string;
  priceRange: string;
  isVerified: boolean;
  responseTime: string;
}

interface Service {
  id: string;
  name: string;
  duration: string;
  price: number;
  description: string;
  includes: string[];
}

interface TimeSlot {
  time: string;
  available: boolean;
  popular?: boolean;
  discount?: number;
}

const OptimizedBookingFlow: React.FC = () => {
  const { user, userProfile } = useAuth();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [customerDetails, setCustomerDetails] = useState({
    name: userProfile?.full_name || '',
    email: user?.email || '',
    phone: '',
    notes: ''
  });
  const [loading, setLoading] = useState(false);

  const steps: BookingStep[] = [
    { id: 'provider', title: 'Choose Provider', description: 'Select your preferred artist or salon', completed: false, current: true },
    { id: 'service', title: 'Select Service', description: 'Pick the service you want', completed: false, current: false },
    { id: 'datetime', title: 'Pick Time', description: 'Choose your preferred date and time', completed: false, current: false },
    { id: 'details', title: 'Your Details', description: 'Confirm your contact information', completed: false, current: false },
    { id: 'confirm', title: 'Confirm', description: 'Review and confirm your booking', completed: false, current: false }
  ];

  const [bookingSteps, setBookingSteps] = useState(steps);

  const mockProviders: Provider[] = [
    {
      id: '1',
      name: 'Emma\'s Beauty Studio',
      avatar: '',
      rating: 4.9,
      reviewCount: 127,
      specialties: ['Nail Art', 'Manicure', 'Pedicure'],
      distance: '2.1 km',
      nextAvailable: 'Today 2:00 PM',
      priceRange: '$30-80',
      isVerified: true,
      responseTime: '< 5 min'
    },
    {
      id: '2',
      name: 'Sofia\'s Glam Corner',
      avatar: '',
      rating: 4.8,
      reviewCount: 89,
      specialties: ['Hair Styling', 'Color', 'Treatments'],
      distance: '1.5 km',
      nextAvailable: 'Tomorrow 10:00 AM',
      priceRange: '$40-120',
      isVerified: true,
      responseTime: '< 3 min'
    }
  ];

  const mockServices: Service[] = [
    {
      id: '1',
      name: 'Classic Manicure',
      duration: '45 min',
      price: 35,
      description: 'Professional manicure with polish',
      includes: ['Nail shaping', 'Cuticle care', 'Polish application', 'Hand massage']
    },
    {
      id: '2',
      name: 'Deluxe Nail Art',
      duration: '60 min',
      price: 55,
      description: 'Custom nail art design with premium finish',
      includes: ['Everything in Classic', 'Custom design', 'Premium polish', 'Nail gems']
    }
  ];

  const mockTimeSlots: TimeSlot[] = [
    { time: '9:00 AM', available: true },
    { time: '10:00 AM', available: true, popular: true },
    { time: '11:00 AM', available: false },
    { time: '12:00 PM', available: true },
    { time: '1:00 PM', available: true, discount: 10 },
    { time: '2:00 PM', available: true },
    { time: '3:00 PM', available: true, popular: true },
    { time: '4:00 PM', available: false }
  ];

  const updateStepStatus = (stepIndex: number) => {
    setBookingSteps(prev => prev.map((step, index) => ({
      ...step,
      completed: index < stepIndex,
      current: index === stepIndex
    })));
  };

  const handleNext = () => {
    if (currentStep < bookingSteps.length - 1) {
      const newStep = currentStep + 1;
      setCurrentStep(newStep);
      updateStepStatus(newStep);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      const newStep = currentStep - 1;
      setCurrentStep(newStep);
      updateStepStatus(newStep);
    }
  };

  const handleBookingSubmit = async () => {
    setLoading(true);
    
    try {
      // Simulate booking submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success('🎉 Booking confirmed! You\'ll receive a confirmation email shortly.');
      
      // Reset flow or redirect
      setCurrentStep(0);
      updateStepStatus(0);
      
    } catch (error) {
      toast.error('Failed to complete booking. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0: return selectedProvider !== null;
      case 1: return selectedService !== null;
      case 2: return selectedDate && selectedTime;
      case 3: return customerDetails.name && customerDetails.email && customerDetails.phone;
      default: return true;
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white mb-4">Choose Your Provider</h3>
            {mockProviders.map(provider => (
              <motion.div
                key={provider.id}
                whileHover={{ scale: 1.02 }}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  selectedProvider?.id === provider.id
                    ? 'border-purple-400 bg-purple-500/20'
                    : 'border-white/20 bg-white/5 hover:bg-white/10'
                }`}
                onClick={() => setSelectedProvider(provider)}
              >
                <div className="flex items-center space-x-4">
                  <Avatar className="h-12 w-12 border-2 border-white/20">
                    <AvatarImage src={provider.avatar} alt={provider.name} />
                    <AvatarFallback className="bg-gradient-to-r from-purple-400 to-pink-500 text-white">
                      {provider.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-semibold text-white">{provider.name}</h4>
                      {provider.isVerified && (
                        <CheckCircle className="h-4 w-4 text-green-400" />
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm text-white/70 mt-1">
                      <div className="flex items-center">
                        <Star className="h-3 w-3 mr-1 text-yellow-400" />
                        <span>{provider.rating} ({provider.reviewCount})</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        <span>{provider.distance}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>{provider.responseTime}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex flex-wrap gap-1">
                        {provider.specialties.slice(0, 2).map(specialty => (
                          <Badge key={specialty} className="bg-white/10 text-white/80 text-xs">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                      <div className="text-sm text-green-300">
                        Next: {provider.nextAvailable}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        );

      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white mb-4">Select Service</h3>
            {mockServices.map(service => (
              <motion.div
                key={service.id}
                whileHover={{ scale: 1.02 }}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  selectedService?.id === service.id
                    ? 'border-purple-400 bg-purple-500/20'
                    : 'border-white/20 bg-white/5 hover:bg-white/10'
                }`}
                onClick={() => setSelectedService(service)}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-white">{service.name}</h4>
                  <div className="text-right">
                    <div className="text-lg font-bold text-green-300">${service.price}</div>
                    <div className="text-xs text-white/60">{service.duration}</div>
                  </div>
                </div>
                
                <p className="text-sm text-white/70 mb-3">{service.description}</p>
                
                <div className="space-y-1">
                  <p className="text-xs font-medium text-white/80">Includes:</p>
                  {service.includes.map((item, index) => (
                    <div key={index} className="flex items-center text-xs text-white/60">
                      <CheckCircle className="h-3 w-3 mr-2 text-green-400" />
                      {item}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white mb-4">Pick Date & Time</h3>
            
            {/* Date Selection */}
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">Select Date</label>
              <Input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="bg-white/10 border-white/30 text-white"
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            
            {/* Time Selection */}
            {selectedDate && (
              <div>
                <label className="block text-sm font-medium text-white/80 mb-3">Available Times</label>
                <div className="grid grid-cols-2 gap-2">
                  {mockTimeSlots.map(slot => (
                    <Button
                      key={slot.time}
                      variant={selectedTime === slot.time ? 'default' : 'outline'}
                      disabled={!slot.available}
                      onClick={() => setSelectedTime(slot.time)}
                      className={`relative ${
                        selectedTime === slot.time
                          ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                          : slot.available
                          ? 'bg-white/10 border-white/30 text-white hover:bg-white/20'
                          : 'bg-white/5 border-white/10 text-white/40'
                      }`}
                    >
                      {slot.time}
                      {slot.popular && (
                        <Badge className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs">
                          Popular
                        </Badge>
                      )}
                      {slot.discount && (
                        <Badge className="absolute -top-1 -right-1 bg-green-500 text-white text-xs">
                          {slot.discount}% off
                        </Badge>
                      )}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white mb-4">Confirm Your Details</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">Full Name</label>
                <Input
                  value={customerDetails.name}
                  onChange={(e) => setCustomerDetails(prev => ({ ...prev, name: e.target.value }))}
                  className="bg-white/10 border-white/30 text-white"
                  placeholder="Your full name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">Email</label>
                <Input
                  type="email"
                  value={customerDetails.email}
                  onChange={(e) => setCustomerDetails(prev => ({ ...prev, email: e.target.value }))}
                  className="bg-white/10 border-white/30 text-white"
                  placeholder="your.email@example.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">Phone</label>
                <Input
                  type="tel"
                  value={customerDetails.phone}
                  onChange={(e) => setCustomerDetails(prev => ({ ...prev, phone: e.target.value }))}
                  className="bg-white/10 border-white/30 text-white"
                  placeholder="(555) 123-4567"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">Special Requests (Optional)</label>
                <Textarea
                  value={customerDetails.notes}
                  onChange={(e) => setCustomerDetails(prev => ({ ...prev, notes: e.target.value }))}
                  className="bg-white/10 border-white/30 text-white"
                  placeholder="Any special requests or preferences..."
                  rows={3}
                />
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white mb-4">Confirm Your Booking</h3>
            
            {/* Booking Summary */}
            <div className="bg-white/10 rounded-lg p-4 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-white/70">Provider:</span>
                <span className="text-white font-medium">{selectedProvider?.name}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-white/70">Service:</span>
                <span className="text-white font-medium">{selectedService?.name}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-white/70">Date & Time:</span>
                <span className="text-white font-medium">
                  {new Date(selectedDate).toLocaleDateString()} at {selectedTime}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-white/70">Duration:</span>
                <span className="text-white font-medium">{selectedService?.duration}</span>
              </div>
              
              <div className="border-t border-white/20 pt-4">
                <div className="flex items-center justify-between text-lg">
                  <span className="text-white font-semibold">Total:</span>
                  <span className="text-green-300 font-bold">${selectedService?.price}</span>
                </div>
              </div>
            </div>
            
            {/* Contact Information */}
            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="font-medium text-white mb-2">Contact Information</h4>
              <div className="space-y-1 text-sm text-white/70">
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  {customerDetails.name}
                </div>
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  {customerDetails.email}
                </div>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2" />
                  {customerDetails.phone}
                </div>
              </div>
            </div>
            
            {/* Important Notes */}
            <div className="bg-blue-500/20 border border-blue-400/30 rounded-lg p-4">
              <div className="flex items-start space-x-2">
                <AlertCircle className="h-5 w-5 text-blue-400 mt-0.5" />
                <div className="text-sm text-blue-200">
                  <p className="font-medium mb-1">Booking Policy</p>
                  <ul className="space-y-1 text-xs">
                    <li>• Free cancellation up to 24 hours before appointment</li>
                    <li>• Please arrive 5 minutes early</li>
                    <li>• Payment is made directly to the provider</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Card className="bg-white/10 backdrop-blur-lg border-white/20 text-white">
      <CardHeader>
        <CardTitle className="flex items-center text-white">
          <Calendar className="h-5 w-5 mr-2" />
          Book Appointment
        </CardTitle>
        
        {/* Progress Steps */}
        <div className="flex items-center space-x-2 mt-4">
          {bookingSteps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                step.completed
                  ? 'bg-green-500 text-white'
                  : step.current
                  ? 'bg-purple-500 text-white'
                  : 'bg-white/20 text-white/60'
              }`}>
                {step.completed ? <CheckCircle className="h-4 w-4" /> : index + 1}
              </div>
              {index < bookingSteps.length - 1 && (
                <div className={`w-8 h-0.5 ${
                  step.completed ? 'bg-green-500' : 'bg-white/20'
                }`} />
              )}
            </div>
          ))}
        </div>
        
        <div className="text-sm text-white/70 mt-2">
          Step {currentStep + 1} of {bookingSteps.length}: {bookingSteps[currentStep].description}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderStepContent()}
          </motion.div>
        </AnimatePresence>
        
        {/* Navigation Buttons */}
        <div className="flex justify-between pt-6 border-t border-white/20">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 0}
            className="bg-white/10 border-white/30 text-white hover:bg-white/20"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          
          {currentStep === bookingSteps.length - 1 ? (
            <Button
              onClick={handleBookingSubmit}
              disabled={!canProceed() || loading}
              className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
            >
              {loading ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full"
                  />
                  Confirming...
                </>
              ) : (
                <>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Confirm Booking
                </>
              )}
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              disabled={!canProceed()}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
            >
              Next
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default OptimizedBookingFlow;