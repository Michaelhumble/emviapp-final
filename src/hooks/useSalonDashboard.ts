import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/auth';
import { toast } from 'sonner';

interface SalonStats {
  totalBookings: number;
  todayBookings: number;
  averageRating: number;
  totalReviews: number;
  totalCredits: number;
  monthlyRevenue: number;
  staffCount: number;
  activeOffers: number;
}

interface SalonReview {
  id: string;
  customer_id: string;
  rating: number;
  review_text: string;
  response_text?: string;
  responded_at?: string;
  flagged: boolean;
  created_at: string;
  customer?: {
    full_name: string;
    avatar_url?: string;
  };
}

interface SalonOffer {
  id: string;
  title: string;
  description: string;
  discount_percent?: number;
  discount_amount?: number;
  start_date: string;
  end_date: string;
  is_active: boolean;
  views_count: number;
  shares_count: number;
  current_redemptions: number;
  max_redemptions?: number;
}

interface BookingData {
  id: string;
  client_name?: string;
  service_type?: string;
  appointment_time?: string;
  status: string;
  sender_id: string;
  recipient_id: string;
  customer?: {
    full_name: string;
    avatar_url?: string;
  };
  artist?: {
    full_name: string;
  };
}

export const useSalonDashboard = (salonId?: string) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<SalonStats>({
    totalBookings: 0,
    todayBookings: 0,
    averageRating: 0,
    totalReviews: 0,
    totalCredits: 0,
    monthlyRevenue: 0,
    staffCount: 0,
    activeOffers: 0,
  });
  const [reviews, setReviews] = useState<SalonReview[]>([]);
  const [offers, setOffers] = useState<SalonOffer[]>([]);
  const [todayBookings, setTodayBookings] = useState<BookingData[]>([]);

  const fetchDashboardData = async () => {
    if (!user?.id || !salonId) return;

    setLoading(true);
    try {
      // Fetch salon stats
      await Promise.all([
        fetchBookingsData(),
        fetchReviewsData(),
        fetchOffersData(),
        fetchCreditsData(),
        fetchStaffData(),
      ]);
    } catch (error) {
      console.error('Error fetching salon dashboard data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const fetchBookingsData = async () => {
    if (!salonId) return;

    try {
      // Get today's date
      const today = new Date();
      const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
      const todayEnd = new Date(todayStart);
      todayEnd.setDate(todayEnd.getDate() + 1);

      // Fetch all bookings for salon staff
      const { data: staffData } = await supabase
        .from('salon_staff')
        .select('email')
        .eq('salon_id', salonId)
        .eq('status', 'active');

      if (!staffData) return;

      const staffEmails = staffData.map(s => s.email);

      // Get all bookings for salon staff
      const { data: bookingsData } = await supabase
        .from('bookings')
        .select(`
          *,
          sender:users!sender_id(full_name, avatar_url),
          recipient:users!recipient_id(full_name)
        `)
        .in('recipient_id', staffEmails.map(() => user.id)) // This needs to be adjusted for proper staff lookup
        .order('created_at', { ascending: false });

      if (bookingsData) {
        const total = bookingsData.length;
        const todayCount = bookingsData.filter(b => {
          const bookingDate = new Date(b.created_at);
          return bookingDate >= todayStart && bookingDate < todayEnd;
        }).length;

        // Get today's bookings with proper formatting
        const todaysBookings = bookingsData
          .filter(b => {
            const bookingDate = new Date(b.created_at);
            return bookingDate >= todayStart && bookingDate < todayEnd;
          })
          .map(booking => ({
            ...booking,
            customer: Array.isArray(booking.sender) ? booking.sender[0] : booking.sender,
            artist: Array.isArray(booking.recipient) ? booking.recipient[0] : booking.recipient,
          }));

        setStats(prev => ({
          ...prev,
          totalBookings: total,
          todayBookings: todayCount,
        }));
        setTodayBookings(todaysBookings);
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  const fetchReviewsData = async () => {
    if (!salonId) return;

    try {
      const { data: reviewsData } = await supabase
        .from('salon_reviews')
        .select(`
          *,
          customer:users!customer_id(full_name, avatar_url)
        `)
        .eq('salon_id', salonId)
        .eq('status', 'active')
        .order('created_at', { ascending: false })
        .limit(10);

      if (reviewsData) {
        const avgRating = reviewsData.length > 0 
          ? reviewsData.reduce((sum, r) => sum + r.rating, 0) / reviewsData.length 
          : 0;

        const formattedReviews = reviewsData.map(review => ({
          ...review,
          customer: Array.isArray(review.customer) ? review.customer[0] : review.customer,
        }));

        setReviews(formattedReviews);
        setStats(prev => ({
          ...prev,
          averageRating: Number(avgRating.toFixed(1)),
          totalReviews: reviewsData.length,
        }));
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const fetchOffersData = async () => {
    if (!salonId) return;

    try {
      const { data: offersData } = await supabase
        .from('salon_offers')
        .select('*')
        .eq('salon_id', salonId)
        .eq('is_active', true)
        .gte('end_date', new Date().toISOString())
        .order('created_at', { ascending: false });

      if (offersData) {
        setOffers(offersData);
        setStats(prev => ({
          ...prev,
          activeOffers: offersData.length,
        }));
      }
    } catch (error) {
      console.error('Error fetching offers:', error);
    }
  };

  const fetchCreditsData = async () => {
    if (!salonId) return;

    try {
      const { data: creditsData } = await supabase.rpc('get_salon_credits', {
        p_salon_id: salonId
      });

      if (creditsData !== null) {
        setStats(prev => ({
          ...prev,
          totalCredits: creditsData,
        }));
      }
    } catch (error) {
      console.error('Error fetching credits:', error);
    }
  };

  const fetchStaffData = async () => {
    if (!salonId) return;

    try {
      const { data: staffData } = await supabase
        .from('salon_staff')
        .select('id')
        .eq('salon_id', salonId)
        .eq('status', 'active');

      if (staffData) {
        setStats(prev => ({
          ...prev,
          staffCount: staffData.length,
        }));
      }
    } catch (error) {
      console.error('Error fetching staff:', error);
    }
  };

  const respondToReview = async (reviewId: string, responseText: string) => {
    try {
      const { error } = await supabase
        .from('salon_reviews')
        .update({
          response_text: responseText,
          responded_at: new Date().toISOString(),
        })
        .eq('id', reviewId);

      if (error) throw error;

      // Update local state
      setReviews(prev =>
        prev.map(review =>
          review.id === reviewId
            ? { ...review, response_text: responseText, responded_at: new Date().toISOString() }
            : review
        )
      );

      toast.success('Response added successfully!');
      return true;
    } catch (error) {
      console.error('Error responding to review:', error);
      toast.error('Failed to add response');
      return false;
    }
  };

  const flagReview = async (reviewId: string, reason: string) => {
    try {
      const { error } = await supabase
        .from('salon_reviews')
        .update({
          flagged: true,
          flagged_reason: reason,
        })
        .eq('id', reviewId);

      if (error) throw error;

      setReviews(prev =>
        prev.map(review =>
          review.id === reviewId
            ? { ...review, flagged: true, flagged_reason: reason }
            : review
        )
      );

      toast.success('Review flagged for admin review');
      return true;
    } catch (error) {
      console.error('Error flagging review:', error);
      toast.error('Failed to flag review');
      return false;
    }
  };

  const createOffer = async (offerData: Omit<SalonOffer, 'id' | 'views_count' | 'shares_count' | 'current_redemptions'>) => {
    if (!salonId) return false;

    try {
      const { error } = await supabase
        .from('salon_offers')
        .insert({
          ...offerData,
          salon_id: salonId,
        });

      if (error) throw error;

      // Award credits for creating offer
      await supabase.rpc('award_salon_credits', {
        p_salon_id: salonId,
        p_amount: 5,
        p_source: 'offer_created',
        p_description: `Created offer: ${offerData.title}`,
      });

      await fetchOffersData();
      await fetchCreditsData();
      toast.success('Offer created successfully!');
      return true;
    } catch (error) {
      console.error('Error creating offer:', error);
      toast.error('Failed to create offer');
      return false;
    }
  };

  useEffect(() => {
    if (user?.id && salonId) {
      fetchDashboardData();
    }
  }, [user?.id, salonId]);

  return {
    loading,
    stats,
    reviews,
    offers,
    todayBookings,
    respondToReview,
    flagReview,
    createOffer,
    refetch: fetchDashboardData,
  };
};