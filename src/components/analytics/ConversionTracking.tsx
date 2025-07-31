import { useEffect } from 'react';
import { analytics } from '@/lib/analytics';

// Track signup conversions
export const SignupConversionTracker = ({ 
  method, 
  userRole 
}: { 
  method: string; 
  userRole?: string; 
}) => {
  useEffect(() => {
    analytics.trackSignup(method, userRole);
  }, [method, userRole]);

  return null;
};

// Track booking conversions
export const BookingConversionTracker = ({ 
  bookingData 
}: { 
  bookingData: {
    bookingId: string;
    serviceType: string;
    servicePrice: number;
    artistId?: string;
    salonId?: string;
  }
}) => {
  useEffect(() => {
    analytics.trackBookingCreated(bookingData);
  }, [bookingData]);

  return null;
};

// Track payment conversions
export const PaymentConversionTracker = ({ 
  paymentData 
}: { 
  paymentData: {
    transactionId: string;
    amount: number;
    paymentMethod: string;
    itemType: 'job_post' | 'booking' | 'subscription';
    itemId?: string;
  }
}) => {
  useEffect(() => {
    analytics.trackPaymentCompleted(paymentData);
  }, [paymentData]);

  return null;
};

// Track contact form submissions
export const ContactConversionTracker = ({ 
  formType, 
  source 
}: { 
  formType: string; 
  source?: string; 
}) => {
  useEffect(() => {
    analytics.trackContactSubmission(formType, source);
  }, [formType, source]);

  return null;
};

// Track job applications
export const JobApplicationTracker = ({ 
  jobData 
}: { 
  jobData: {
    jobId: string;
    jobType: string;
    location?: string;
    salaryRange?: string;
  }
}) => {
  useEffect(() => {
    analytics.trackJobApplication(jobData);
  }, [jobData]);

  return null;
};