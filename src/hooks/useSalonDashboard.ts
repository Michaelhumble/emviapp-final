import { useState, useEffect } from 'react';
import { supabaseBypass } from '@/types/supabase-bypass';
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

  // Get the actual salon ID from context or user profile
  const effectiveSalonId = salonId || user?.id;

  const fetchDashboardData = async () => {
    if (!user?.id || !effectiveSalonId) return;

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
    if (!effectiveSalonId) return;

    try {
      // Get today's date
      const today = new Date();
      const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
      const todayEnd = new Date(todayStart);
      todayEnd.setDate(todayEnd.getDate() + 1);

      // First, get staff emails for this salon and then find their user IDs
      const { data: staffData } = await supabaseBypass
        .from('salon_staff')
        .select('email')
        .eq('salon_id' as any, effectiveSalonId)
        .eq('status' as any, 'active');

      if (!staffData || staffData.length === 0) {
        console.log('No staff found for salon:', effectiveSalonId);
        return;
      }

      // Get user IDs from emails
      const staffEmails = (staffData as any)?.map((s: any) => s?.email) || [];
      const { data: usersData } = await supabaseBypass
        .from('profiles')
        .select('id')
        .in('email' as any, staffEmails);

      const staffUserIds = (usersData as any)?.map((u: any) => u?.id) || [];

      // Get all bookings for salon staff (where recipient_id is one of the staff members)
      const { data: bookingsData } = await supabaseBypass
        .from('bookings')
        .select(`
          *,
          sender:users!sender_id(full_name, avatar_url),
          recipient:users!recipient_id(full_name)
        `)
        .in('recipient_id' as any, staffUserIds)
        .order('created_at' as any, { ascending: false });

      if (bookingsData) {
        const total = (bookingsData as any).length;
        const todayCount = (bookingsData as any).filter((b: any) => {
          const bookingDate = new Date(b?.created_at);
          return bookingDate >= todayStart && bookingDate < todayEnd;
        }).length;

        // Get today's bookings with proper formatting
        const todaysBookings = (bookingsData as any)
          .filter((b: any) => {
            const bookingDate = new Date(b?.created_at);
            return bookingDate >= todayStart && bookingDate < todayEnd;
          })
          .map((booking: any) => ({
            ...booking,
            customer: Array.isArray(booking?.sender) ? booking?.sender[0] : booking?.sender,
            artist: Array.isArray(booking?.recipient) ? booking?.recipient[0] : booking?.recipient,
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
    if (!effectiveSalonId) return;

    try {
      const { data: reviewsData } = await supabaseBypass
        .from('salon_reviews')
        .select(`
          *,
          customer:review_customers!customer_id(full_name, avatar_url, email)
        `)
        .eq('salon_id' as any, effectiveSalonId)
        .eq('status' as any, 'active')
        .order('created_at' as any, { ascending: false })
        .limit(10);

      if (reviewsData) {
        const avgRating = (reviewsData as any).length > 0 
          ? (reviewsData as any).reduce((sum: number, r: any) => sum + r?.rating, 0) / (reviewsData as any).length 
          : 0;

        const formattedReviews = (reviewsData as any).map((review: any) => ({
          ...review,
          customer: Array.isArray(review?.customer) ? review?.customer[0] : review?.customer,
        }));

        setReviews(formattedReviews);
        setStats(prev => ({
          ...prev,
          averageRating: Number(avgRating.toFixed(1)),
          totalReviews: (reviewsData as any).length,
        }));
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
      // Fallback to basic review data if join fails
      try {
        const { data: basicData } = await supabaseBypass
          .from('salon_reviews')
          .select('*')
          .eq('salon_id' as any, effectiveSalonId)
          .eq('status' as any, 'active')
          .order('created_at' as any, { ascending: false })
          .limit(10);
        
        if (basicData) {
          setReviews(basicData as any);
          const avgRating = (basicData as any).length > 0 
            ? (basicData as any).reduce((sum: number, r: any) => sum + r?.rating, 0) / (basicData as any).length 
            : 0;
          setStats(prev => ({
            ...prev,
            averageRating: Number(avgRating.toFixed(1)),
            totalReviews: (basicData as any).length,
          }));
        }
      } catch (fallbackError) {
        console.error('Fallback review fetch also failed:', fallbackError);
      }
    }
  };

  const fetchOffersData = async () => {
    if (!effectiveSalonId) return;

    try {
      const { data: offersData } = await supabaseBypass
        .from('salon_offers')
        .select('*')
        .eq('salon_id' as any, effectiveSalonId)
        .eq('is_active' as any, true)
        .gte('end_date' as any, new Date().toISOString())
        .order('created_at' as any, { ascending: false });

      if (offersData) {
        setOffers(offersData as any);
        setStats(prev => ({
          ...prev,
          activeOffers: (offersData as any).length,
        }));
      }
    } catch (error) {
      console.error('Error fetching offers:', error);
    }
  };

  const fetchCreditsData = async () => {
    if (!effectiveSalonId) return;

    try {
      const { data: creditsData } = await (supabaseBypass as any).rpc('get_salon_credits', {
        p_salon_id: effectiveSalonId
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
    if (!effectiveSalonId) return;

    try {
      const { data: staffData } = await supabaseBypass
        .from('salon_staff')
        .select('id')
        .eq('salon_id' as any, effectiveSalonId)
        .eq('status' as any, 'active');

      if (staffData) {
        setStats(prev => ({
          ...prev,
          staffCount: (staffData as any).length,
        }));
      }
    } catch (error) {
      console.error('Error fetching staff:', error);
    }
  };

  const respondToReview = async (reviewId: string, responseText: string) => {
    try {
      const { error } = await supabaseBypass
        .from('salon_reviews')
        .update({
          response_text: responseText,
          responded_at: new Date().toISOString(),
        } as any)
        .eq('id' as any, reviewId);

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
      const { error } = await supabaseBypass
        .from('salon_reviews')
        .update({
          flagged: true,
          flagged_reason: reason,
        } as any)
        .eq('id' as any, reviewId);

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
    if (!effectiveSalonId) return false;

    try {
      const { error } = await supabaseBypass
        .from('salon_offers')
        .insert({
          ...offerData,
          salon_id: effectiveSalonId,
        } as any);

      if (error) throw error;

      // Award credits for creating offer
      await (supabaseBypass as any).rpc('award_salon_credits', {
        p_salon_id: effectiveSalonId,
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
    if (user?.id && effectiveSalonId) {
      fetchDashboardData();
    }
  }, [user?.id, effectiveSalonId]);

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