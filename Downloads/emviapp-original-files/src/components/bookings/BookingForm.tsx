
import React, { useState } from "react";
import { BookingFormData } from "../../types/booking";
import FormField from "../profile/FormField";
import FormActions from "../profile/FormActions";
import { CalendarIcon, Clock } from 'lucide-react';

interface BookingFormProps {
  recipientId: string;
  recipientName: string;
  onSubmit: (data: BookingFormData) => Promise<void>;
  onCancel: () => void;
}

const BookingForm: React.FC<BookingFormProps> = ({
  recipientId,
  recipientName,
  onSubmit,
  onCancel
}) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState<BookingFormData>({
    recipientId: recipientId,
    date: "",
    time: "",
    note: ""
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await onSubmit(formData);
      setSuccess(true);
      setTimeout(() => {
        onCancel();
      }, 2000);
    } catch (error) {
      console.error("Error submitting booking:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-gray-800 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Request Booking with {recipientName}</h3>
      
      <div className="space-y-4 mb-6">
        <FormField
          id="date"
          name="date"
          label="Preferred Date"
          value={formData.date}
          onChange={handleChange}
          placeholder="YYYY-MM-DD"
          icon={<CalendarIcon size={18} />}
        />
        
        <FormField
          id="time"
          name="time"
          label="Preferred Time"
          value={formData.time}
          onChange={handleChange}
          placeholder="e.g., 2:00 PM - 4:00 PM"
          icon={<Clock size={18} />}
        />
        
        <FormField
          id="note"
          name="note"
          label="Additional Notes"
          value={formData.note}
          onChange={handleChange}
          placeholder="Please include any details about your request..."
          as="textarea"
          rows={4}
        />
      </div>
      
      <FormActions
        loading={loading}
        success={success}
        onCancel={onCancel}
      />
    </form>
  );
};

export default BookingForm;
