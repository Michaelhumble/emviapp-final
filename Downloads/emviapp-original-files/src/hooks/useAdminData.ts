
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import { User, SupportQuestion, AdminMetrics } from "../types/admin";
import { Booking } from "../types/booking";

export const useAdminData = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [supportQuestions, setSupportQuestions] = useState<SupportQuestion[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [metrics, setMetrics] = useState<AdminMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("users")
          .select("*");

        if (error) {
          setError(error.message);
        } else {
          setUsers(data || []);
        }
      } catch (err) {
        setError("Failed to fetch users.");
        console.error("Error fetching users:", err);
      } finally {
        setLoading(false);
      }
    };

    const fetchSupportQuestions = async () => {
      try {
        const { data, error } = await supabase
          .from("support_logs")
          .select("*")
          .order("timestamp", { ascending: false });

        if (error) {
          console.error("Error fetching support questions:", error);
        } else {
          // Get user emails for each question
          const questionWithUserDetails = await Promise.all(
            (data || []).map(async (question) => {
              const { data: userData } = await supabase
                .from("users")
                .select("email")
                .eq("id", question.user_id)
                .single();
              
              return {
                ...question,
                user_email: userData?.email || "Unknown User"
              };
            })
          );
          
          setSupportQuestions(questionWithUserDetails);
        }
      } catch (err) {
        console.error("Error in support questions fetch:", err);
      }
    };

    const fetchBookings = async () => {
      try {
        const { data, error } = await supabase
          .from("bookings")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Error fetching bookings:", error);
        } else {
          setBookings(data || []);
        }
      } catch (err) {
        console.error("Error in bookings fetch:", err);
      }
    };

    const generateMetricsData = (users: User[], supportQuestions: SupportQuestion[], bookings: Booking[]) => {
      // Generate the last 7 days labels
      const last7Days = Array.from({ length: 7 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - (6 - i));
        return date.toISOString().split('T')[0]; // Format as YYYY-MM-DD
      });
      
      // User signups per day for the last week
      const userSignups = last7Days.map(day => {
        return users.filter(user => {
          const createdDate = user.created_at ? user.created_at.split('T')[0] : null;
          return createdDate === day;
        }).length;
      });

      // Support tickets per day for the last week
      const supportTickets = last7Days.map(day => {
        return supportQuestions.filter(q => {
          const ticketDate = q.timestamp ? q.timestamp.split('T')[0] : null;
          return ticketDate === day;
        }).length;
      });

      // Booking requests per day for the last week
      const bookingRequests = last7Days.map(day => {
        return bookings.filter(booking => {
          const bookingDate = booking.created_at ? booking.created_at.split('T')[0] : null;
          return bookingDate === day;
        }).length;
      });

      // Format dates to be more readable (e.g., "Jun 1")
      const formattedDates = last7Days.map(day => {
        const date = new Date(day);
        return `${date.toLocaleString('default', { month: 'short' })} ${date.getDate()}`;
      });

      return {
        userSignups: {
          labels: formattedDates,
          data: userSignups
        },
        supportTickets: {
          labels: formattedDates,
          data: supportTickets
        },
        bookingRequests: {
          labels: formattedDates,
          data: bookingRequests
        }
      };
    };

    const fetchAllData = async () => {
      await fetchUsers();
      await fetchSupportQuestions();
      await fetchBookings();
      
      if (users.length > 0 && supportQuestions.length > 0) {
        const metricsData = generateMetricsData(users, supportQuestions, bookings);
        setMetrics(metricsData);
      }
    };

    fetchAllData();
  }, []);

  useEffect(() => {
    // Once data is loaded, generate metrics
    if (users.length > 0 && supportQuestions.length > 0 && bookings.length > 0) {
      const metricsData = generateMetricsData(users, supportQuestions, bookings);
      setMetrics(metricsData);
    }
  }, [users, supportQuestions, bookings]);

  const markAsResolved = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from("support_logs")
        .update({ resolved: !currentStatus })
        .eq("id", id);
      
      if (error) {
        console.error("Error updating status:", error);
      } else {
        // Update local state
        setSupportQuestions(prevQuestions =>
          prevQuestions.map(q => 
            q.id === id ? { ...q, resolved: !currentStatus } : q
          )
        );
      }
    } catch (err) {
      console.error("Error in resolution update:", err);
    }
  };

  const generateMetricsData = (users: User[], supportQuestions: SupportQuestion[], bookings: Booking[]) => {
    // Generate the last 7 days labels
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - i));
      return date.toISOString().split('T')[0]; // Format as YYYY-MM-DD
    });
    
    // User signups per day for the last week
    const userSignups = last7Days.map(day => {
      return users.filter(user => {
        const createdDate = user.created_at ? user.created_at.split('T')[0] : null;
        return createdDate === day;
      }).length;
    });

    // Support tickets per day for the last week
    const supportTickets = last7Days.map(day => {
      return supportQuestions.filter(q => {
        const ticketDate = q.timestamp ? q.timestamp.split('T')[0] : null;
        return ticketDate === day;
      }).length;
    });

    // Booking requests per day for the last week
    const bookingRequests = last7Days.map(day => {
      return bookings.filter(booking => {
        const bookingDate = booking.created_at ? booking.created_at.split('T')[0] : null;
        return bookingDate === day;
      }).length;
    });

    // Format dates to be more readable (e.g., "Jun 1")
    const formattedDates = last7Days.map(day => {
      const date = new Date(day);
      return `${date.toLocaleString('default', { month: 'short' })} ${date.getDate()}`;
    });

    return {
      userSignups: {
        labels: formattedDates,
        data: userSignups
      },
      supportTickets: {
        labels: formattedDates,
        data: supportTickets
      },
      bookingRequests: {
        labels: formattedDates,
        data: bookingRequests
      }
    };
  };

  return {
    users,
    supportQuestions,
    bookings,
    metrics,
    loading,
    error,
    markAsResolved
  };
};

export default useAdminData;
