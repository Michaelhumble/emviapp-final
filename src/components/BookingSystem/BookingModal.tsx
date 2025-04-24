
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { BookingFormData } from './types';
import { mockServices } from './mockData';
import { format } from 'date-fns';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (booking: BookingFormData) => void;
  defaultDate?: Date;
}

const BookingModal: React.FC<BookingModalProps> = ({ 
  isOpen, 
  onClose, 
  onSave, 
  defaultDate = new Date() 
}) => {
  const [formData, setFormData] = useState<BookingFormData>({
    clientName: '',
    serviceName: mockServices[0],
    date: defaultDate,
    time: '10:00',
    notes: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, date: new Date(e.target.value) }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-white rounded-xl border border-purple-100">
        <DialogHeader>
          <DialogTitle className="text-xl font-playfair text-gray-900">
            Schedule New Booking
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="space-y-2">
            <label htmlFor="clientName" className="text-sm font-medium text-gray-700">
              Client Name
            </label>
            <input
              id="clientName"
              name="clientName"
              required
              value={formData.clientName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-300 focus:border-transparent"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="serviceName" className="text-sm font-medium text-gray-700">
              Service
            </label>
            <select
              id="serviceName"
              name="serviceName"
              value={formData.serviceName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-300 focus:border-transparent"
            >
              {mockServices.map(service => (
                <option key={service} value={service}>
                  {service}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="date" className="text-sm font-medium text-gray-700">
                Date
              </label>
              <input
                id="date"
                name="date"
                type="date"
                required
                value={format(formData.date, 'yyyy-MM-dd')}
                onChange={handleDateChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-300 focus:border-transparent"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="time" className="text-sm font-medium text-gray-700">
                Time
              </label>
              <input
                id="time"
                name="time"
                type="time"
                required
                value={formData.time}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-300 focus:border-transparent"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="notes" className="text-sm font-medium text-gray-700">
              Notes (Optional)
            </label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes || ''}
              onChange={handleChange}
              rows={3}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-300 focus:border-transparent resize-none"
            />
          </div>

          <DialogFooter className="pt-2">
            <Button type="button" variant="outline" onClick={onClose} className="bg-white">
              Cancel
            </Button>
            <Button 
              type="submit"
              className="bg-gradient-to-r from-purple-600 to-pink-500 text-white border-0"
            >
              Save Booking
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;
