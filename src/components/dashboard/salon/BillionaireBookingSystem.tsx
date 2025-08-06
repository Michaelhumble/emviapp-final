import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Calendar, Clock, User, Sparkles, Crown, Star, CheckCircle2, Plus } from 'lucide-react';
import { toast } from 'sonner';
import confetti from 'canvas-confetti';

interface BookingFormData {
  clientName: string;
  serviceName: string;
  date: string;
  time: string;
  duration: number;
  notes: string;
  priority: 'standard' | 'vip' | 'elite';
}

const BillionaireBookingSystem = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [bookingForm, setBookingForm] = useState<BookingFormData>({
    clientName: '',
    serviceName: '',
    date: '',
    time: '',
    duration: 60,
    priority: 'standard',
    notes: ''
  });

  const serviceOptions = [
    { name: 'Signature Hair Styling', duration: 90, price: 250, tier: 'elite' },
    { name: 'Premium Color Treatment', duration: 180, price: 350, tier: 'vip' },
    { name: 'Executive Haircut', duration: 60, price: 150, tier: 'vip' },
    { name: 'Luxury Facial Treatment', duration: 120, price: 200, tier: 'standard' },
    { name: 'Bridal Package', duration: 240, price: 500, tier: 'elite' },
    { name: 'Express Styling', duration: 45, price: 100, tier: 'standard' }
  ];

  const priorityTiers = [
    { 
      id: 'standard', 
      name: 'Standard', 
      icon: User, 
      color: 'from-gray-500 to-gray-600', 
      multiplier: 1 
    },
    { 
      id: 'vip', 
      name: 'VIP', 
      icon: Star, 
      color: 'from-purple-500 to-purple-600', 
      multiplier: 1.5 
    },
    { 
      id: 'elite', 
      name: 'Elite', 
      icon: Crown, 
      color: 'from-yellow-500 to-orange-600', 
      multiplier: 2 
    }
  ];

  const handleServiceSelect = (service: typeof serviceOptions[0]) => {
    setBookingForm(prev => ({
      ...prev,
      serviceName: service.name,
      duration: service.duration,
      priority: service.tier as 'standard' | 'vip' | 'elite'
    }));
  };

  const handleSubmit = async () => {
    if (!bookingForm.clientName || !bookingForm.serviceName || !bookingForm.date || !bookingForm.time) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Simulate booking creation
    const success = true; // Replace with actual booking logic

    if (success) {
      // Trigger celebration
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#FFD700', '#FFA500', '#FF69B4', '#8A2BE2']
      });

      toast.success(`🎉 ${bookingForm.priority.toUpperCase()} booking created successfully!`);
      
      // Reset form
      setBookingForm({
        clientName: '',
        serviceName: '',
        date: '',
        time: '',
        duration: 60,
        priority: 'standard',
        notes: ''
      });
      
      setIsOpen(false);
    } else {
      toast.error('Failed to create booking. Please try again.');
    }
  };

  const selectedTier = priorityTiers.find(tier => tier.id === bookingForm.priority);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg">
          <Plus className="h-4 w-4 mr-2" />
          Create Elite Booking
          <Sparkles className="h-4 w-4 ml-2" />
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-slate-900 to-purple-900 border-0 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <Crown className="h-6 w-6 text-yellow-400" />
            Billionaire Club Booking System
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          {/* Service Selection */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Select Premium Service</h3>
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {serviceOptions.map((service, index) => (
                <motion.div
                  key={service.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handleServiceSelect(service)}
                  className={`p-4 rounded-lg cursor-pointer transition-all border-2 ${
                    bookingForm.serviceName === service.name 
                      ? 'border-yellow-400 bg-gradient-to-r from-purple-600/50 to-pink-600/50' 
                      : 'border-white/20 bg-white/10 hover:border-white/40'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold">{service.name}</h4>
                    <Badge className={`${
                      service.tier === 'elite' ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-black' :
                      service.tier === 'vip' ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white' :
                      'bg-gradient-to-r from-gray-500 to-gray-600 text-white'
                    }`}>
                      {service.tier.toUpperCase()}
                    </Badge>
                  </div>
                  <div className="flex justify-between text-sm text-white/80">
                    <span>{service.duration} minutes</span>
                    <span className="font-bold text-green-400">${service.price}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Booking Form */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Booking Details</h3>
            
            {/* Priority Tier Selection */}
            <div>
              <Label className="text-white mb-2 block">Priority Tier</Label>
              <div className="grid grid-cols-3 gap-2">
                {priorityTiers.map((tier) => (
                  <motion.button
                    key={tier.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setBookingForm(prev => ({ ...prev, priority: tier.id as any }))}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      bookingForm.priority === tier.id
                        ? 'border-yellow-400 bg-gradient-to-r ' + tier.color
                        : 'border-white/20 bg-white/10 hover:border-white/40'
                    }`}
                  >
                    <tier.icon className="h-5 w-5 mx-auto mb-1" />
                    <div className="text-xs font-semibold">{tier.name}</div>
                    <div className="text-xs text-white/70">{tier.multiplier}x</div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Client Information */}
            <div>
              <Label htmlFor="clientName" className="text-white">Client Name *</Label>
              <Input
                id="clientName"
                value={bookingForm.clientName}
                onChange={(e) => setBookingForm(prev => ({ ...prev, clientName: e.target.value }))}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                placeholder="Enter client name"
              />
            </div>

            {/* Date and Time */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="date" className="text-white">Date *</Label>
                <Input
                  id="date"
                  type="date"
                  value={bookingForm.date}
                  onChange={(e) => setBookingForm(prev => ({ ...prev, date: e.target.value }))}
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>
              <div>
                <Label htmlFor="time" className="text-white">Time *</Label>
                <Input
                  id="time"
                  type="time"
                  value={bookingForm.time}
                  onChange={(e) => setBookingForm(prev => ({ ...prev, time: e.target.value }))}
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>
            </div>

            {/* Duration */}
            <div>
              <Label htmlFor="duration" className="text-white">Duration (minutes)</Label>
              <Input
                id="duration"
                type="number"
                value={bookingForm.duration}
                onChange={(e) => setBookingForm(prev => ({ ...prev, duration: parseInt(e.target.value) || 60 }))}
                className="bg-white/10 border-white/20 text-white"
                min="15"
                step="15"
              />
            </div>

            {/* Notes */}
            <div>
              <Label htmlFor="notes" className="text-white">Special Notes</Label>
              <Textarea
                id="notes"
                value={bookingForm.notes}
                onChange={(e) => setBookingForm(prev => ({ ...prev, notes: e.target.value }))}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                placeholder="Any special requirements or preferences..."
                rows={3}
              />
            </div>

            {/* Booking Summary */}
            {bookingForm.serviceName && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-purple-600/30 to-pink-600/30 p-4 rounded-lg border border-white/20"
              >
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-400" />
                  Booking Summary
                </h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Service:</span>
                    <span className="font-semibold">{bookingForm.serviceName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Duration:</span>
                    <span>{bookingForm.duration} minutes</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Priority:</span>
                    <div className="flex items-center gap-1">
                      {selectedTier && <selectedTier.icon className="h-3 w-3" />}
                      <span className="font-semibold">{bookingForm.priority.toUpperCase()}</span>
                    </div>
                  </div>
                  {bookingForm.date && bookingForm.time && (
                    <div className="flex justify-between">
                      <span>Scheduled:</span>
                      <span>{bookingForm.date} at {bookingForm.time}</span>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button
                onClick={() => setIsOpen(false)}
                variant="outline"
                className="flex-1 border-white/20 text-white hover:bg-white/10"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                className={`flex-1 bg-gradient-to-r ${selectedTier?.color || 'from-purple-600 to-pink-600'} hover:opacity-90 text-white font-bold`}
              >
                <Crown className="h-4 w-4 mr-2" />
                Create {bookingForm.priority.toUpperCase()} Booking
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BillionaireBookingSystem;