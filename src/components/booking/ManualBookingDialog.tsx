import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/auth';
import { analytics } from '@/lib/analytics';

interface ManualBookingDialogProps {
  open: boolean;
  onClose: () => void;
  selectedDate?: Date;
  selectedTime?: string;
  onBookingCreated?: () => void;
}

export const ManualBookingDialog: React.FC<ManualBookingDialogProps> = ({
  open,
  onClose,
  selectedDate,
  selectedTime,
  onBookingCreated
}) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    client_name: '',
    client_email: '',
    client_phone: '',
    service_name: '',
    date: selectedDate ? selectedDate.toISOString().split('T')[0] : '',
    time: selectedTime || '',
    price: '',
    notes: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('bookings')
        .insert({
          sender_id: user.id, // Artist creating manual booking
          recipient_id: user.id, // Same artist
          client_name: formData.client_name,
          date_requested: formData.date,
          time_requested: formData.time,
          status: 'accepted', // Manual bookings are pre-accepted
          note: formData.notes,
          metadata: {
            service_name: formData.service_name,
            price: formData.price ? parseFloat(formData.price) : null,
            client_email: formData.client_email,
            client_phone: formData.client_phone,
            is_manual_booking: true
          }
        })
        .select()
        .single();

      if (error) throw error;

      // Track analytics
      analytics.trackBookingCreated({
        bookingId: data.id,
        serviceType: formData.service_name,
        servicePrice: formData.price ? parseFloat(formData.price) : 0,
        artistId: user.id
      });

      toast.success('Manual booking created successfully!');
      onBookingCreated?.();
      onClose();
      
      // Reset form
      setFormData({
        client_name: '',
        client_email: '',
        client_phone: '',
        service_name: '',
        date: '',
        time: '',
        price: '',
        notes: ''
      });
    } catch (error) {
      console.error('Manual booking error:', error);
      toast.error('Failed to create booking. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create Manual Booking</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Client Information */}
          <div className="space-y-2">
            <h4 className="font-semibold text-sm">Client Information</h4>
            
            <div>
              <Label htmlFor="client_name">Client Name *</Label>
              <Input
                id="client_name"
                value={formData.client_name}
                onChange={(e) => handleChange('client_name', e.target.value)}
                required
                placeholder="Enter client name"
              />
            </div>

            <div>
              <Label htmlFor="client_email">Email</Label>
              <Input
                id="client_email"
                type="email"
                value={formData.client_email}
                onChange={(e) => handleChange('client_email', e.target.value)}
                placeholder="client@example.com"
              />
            </div>

            <div>
              <Label htmlFor="client_phone">Phone</Label>
              <Input
                id="client_phone"
                type="tel"
                value={formData.client_phone}
                onChange={(e) => handleChange('client_phone', e.target.value)}
                placeholder="(555) 123-4567"
              />
            </div>
          </div>

          {/* Service Information */}
          <div className="space-y-2">
            <h4 className="font-semibold text-sm">Service Information</h4>
            
            <div>
              <Label htmlFor="service_name">Service *</Label>
              <Select
                value={formData.service_name}
                onValueChange={(value) => handleChange('service_name', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select service" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Manicure">Manicure</SelectItem>
                  <SelectItem value="Pedicure">Pedicure</SelectItem>
                  <SelectItem value="Nail Art">Nail Art</SelectItem>
                  <SelectItem value="Gel Polish">Gel Polish</SelectItem>
                  <SelectItem value="Acrylic Nails">Acrylic Nails</SelectItem>
                  <SelectItem value="Nail Repair">Nail Repair</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="price">Price ($)</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                min="0"
                value={formData.price}
                onChange={(e) => handleChange('price', e.target.value)}
                placeholder="50.00"
              />
            </div>
          </div>

          {/* Appointment Details */}
          <div className="space-y-2">
            <h4 className="font-semibold text-sm">Appointment Details</h4>
            
            <div>
              <Label htmlFor="date">Date *</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => handleChange('date', e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="time">Time *</Label>
              <Input
                id="time"
                type="time"
                value={formData.time}
                onChange={(e) => handleChange('time', e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => handleChange('notes', e.target.value)}
                placeholder="Additional notes or special requests..."
                rows={3}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading || !formData.client_name || !formData.service_name || !formData.date || !formData.time}
              className="flex-1"
            >
              {loading ? 'Creating...' : 'Create Booking'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};