export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      activity_log: {
        Row: {
          activity_type: string
          created_at: string
          description: string
          id: string
          metadata: Json | null
          user_id: string
        }
        Insert: {
          activity_type: string
          created_at?: string
          description: string
          id?: string
          metadata?: Json | null
          user_id: string
        }
        Update: {
          activity_type?: string
          created_at?: string
          description?: string
          id?: string
          metadata?: Json | null
          user_id?: string
        }
        Relationships: []
      }
      appointments: {
        Row: {
          artist_id: string
          created_at: string
          customer_email: string | null
          customer_id: string | null
          customer_name: string | null
          customer_phone: string | null
          end_time: string
          id: string
          notes: string | null
          service_id: string | null
          start_time: string
          status: string
          updated_at: string
        }
        Insert: {
          artist_id: string
          created_at?: string
          customer_email?: string | null
          customer_id?: string | null
          customer_name?: string | null
          customer_phone?: string | null
          end_time: string
          id?: string
          notes?: string | null
          service_id?: string | null
          start_time: string
          status?: string
          updated_at?: string
        }
        Update: {
          artist_id?: string
          created_at?: string
          customer_email?: string | null
          customer_id?: string | null
          customer_name?: string | null
          customer_phone?: string | null
          end_time?: string
          id?: string
          notes?: string | null
          service_id?: string | null
          start_time?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "appointments_artist_id_fkey"
            columns: ["artist_id"]
            isOneToOne: false
            referencedRelation: "profile_completion_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appointments_artist_id_fkey"
            columns: ["artist_id"]
            isOneToOne: false
            referencedRelation: "user_salon_access"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "appointments_artist_id_fkey"
            columns: ["artist_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appointments_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "profile_completion_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appointments_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "user_salon_access"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "appointments_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appointments_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
        ]
      }
      artist_availability: {
        Row: {
          artist_id: string
          created_at: string
          day_of_week: string
          end_time: string
          id: string
          is_available: boolean
          start_time: string
        }
        Insert: {
          artist_id: string
          created_at?: string
          day_of_week: string
          end_time: string
          id?: string
          is_available?: boolean
          start_time: string
        }
        Update: {
          artist_id?: string
          created_at?: string
          day_of_week?: string
          end_time?: string
          id?: string
          is_available?: boolean
          start_time?: string
        }
        Relationships: []
      }
      artist_clients: {
        Row: {
          artist_id: string
          created_at: string
          id: string
          name: string
          notes: string | null
          phone: string | null
        }
        Insert: {
          artist_id: string
          created_at?: string
          id?: string
          name: string
          notes?: string | null
          phone?: string | null
        }
        Update: {
          artist_id?: string
          created_at?: string
          id?: string
          name?: string
          notes?: string | null
          phone?: string | null
        }
        Relationships: []
      }
      artist_services: {
        Row: {
          created_at: string
          description: string | null
          duration: number | null
          id: string
          name: string
          price: number
          user_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          duration?: number | null
          id?: string
          name: string
          price: number
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          duration?: number | null
          id?: string
          name?: string
          price?: number
          user_id?: string
        }
        Relationships: []
      }
      artist_time_off: {
        Row: {
          artist_id: string
          created_at: string
          end_date: string
          id: string
          reason: string | null
          start_date: string
        }
        Insert: {
          artist_id: string
          created_at?: string
          end_date: string
          id?: string
          reason?: string | null
          start_date: string
        }
        Update: {
          artist_id?: string
          created_at?: string
          end_date?: string
          id?: string
          reason?: string | null
          start_date?: string
        }
        Relationships: []
      }
      availability: {
        Row: {
          artist_id: string
          day_of_week: string
          end_time: string
          id: string
          is_available: boolean | null
          start_time: string
        }
        Insert: {
          artist_id: string
          day_of_week: string
          end_time: string
          id?: string
          is_available?: boolean | null
          start_time: string
        }
        Update: {
          artist_id?: string
          day_of_week?: string
          end_time?: string
          id?: string
          is_available?: boolean | null
          start_time?: string
        }
        Relationships: [
          {
            foreignKeyName: "availability_artist_id_fkey"
            columns: ["artist_id"]
            isOneToOne: false
            referencedRelation: "profile_completion_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "availability_artist_id_fkey"
            columns: ["artist_id"]
            isOneToOne: false
            referencedRelation: "user_salon_access"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "availability_artist_id_fkey"
            columns: ["artist_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      blocked_times: {
        Row: {
          artist_id: string
          created_at: string
          end_time: string
          id: string
          reason: string | null
          start_time: string
        }
        Insert: {
          artist_id: string
          created_at?: string
          end_time: string
          id?: string
          reason?: string | null
          start_time: string
        }
        Update: {
          artist_id?: string
          created_at?: string
          end_time?: string
          id?: string
          reason?: string | null
          start_time?: string
        }
        Relationships: [
          {
            foreignKeyName: "blocked_times_artist_id_fkey"
            columns: ["artist_id"]
            isOneToOne: false
            referencedRelation: "profile_completion_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "blocked_times_artist_id_fkey"
            columns: ["artist_id"]
            isOneToOne: false
            referencedRelation: "user_salon_access"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "blocked_times_artist_id_fkey"
            columns: ["artist_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      bookings: {
        Row: {
          created_at: string | null
          date_requested: string | null
          id: string
          metadata: Json | null
          note: string | null
          recipient_id: string
          reminder_sent: boolean | null
          reminder_sent_at: string | null
          sender_id: string
          service_id: string | null
          status: string | null
          time_requested: string | null
        }
        Insert: {
          created_at?: string | null
          date_requested?: string | null
          id?: string
          metadata?: Json | null
          note?: string | null
          recipient_id: string
          reminder_sent?: boolean | null
          reminder_sent_at?: string | null
          sender_id: string
          service_id?: string | null
          status?: string | null
          time_requested?: string | null
        }
        Update: {
          created_at?: string | null
          date_requested?: string | null
          id?: string
          metadata?: Json | null
          note?: string | null
          recipient_id?: string
          reminder_sent?: boolean | null
          reminder_sent_at?: string | null
          sender_id?: string
          service_id?: string | null
          status?: string | null
          time_requested?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bookings_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
        ]
      }
      completed_bookings: {
        Row: {
          artist_id: string
          booking_id: string
          commission_earned: number
          commission_rate: number
          completed_at: string | null
          created_at: string | null
          id: string
          paid: boolean | null
          payment_date: string | null
          salon_id: string
          service_id: string | null
          service_price: number
        }
        Insert: {
          artist_id: string
          booking_id: string
          commission_earned: number
          commission_rate: number
          completed_at?: string | null
          created_at?: string | null
          id?: string
          paid?: boolean | null
          payment_date?: string | null
          salon_id: string
          service_id?: string | null
          service_price: number
        }
        Update: {
          artist_id?: string
          booking_id?: string
          commission_earned?: number
          commission_rate?: number
          completed_at?: string | null
          created_at?: string | null
          id?: string
          paid?: boolean | null
          payment_date?: string | null
          salon_id?: string
          service_id?: string | null
          service_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "completed_bookings_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
        ]
      }
      contact_messages: {
        Row: {
          created_at: string
          email: string
          id: string
          message: string
          name: string
          status: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          message: string
          name: string
          status?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          message?: string
          name?: string
          status?: string
          user_id?: string | null
        }
        Relationships: []
      }
      credit_earnings: {
        Row: {
          amount: number
          created_at: string
          id: string
          metadata: Json | null
          source_id: string | null
          status: string
          type: string
          user_id: string
          validated_at: string | null
        }
        Insert: {
          amount: number
          created_at?: string
          id?: string
          metadata?: Json | null
          source_id?: string | null
          status?: string
          type: string
          user_id: string
          validated_at?: string | null
        }
        Update: {
          amount?: number
          created_at?: string
          id?: string
          metadata?: Json | null
          source_id?: string | null
          status?: string
          type?: string
          user_id?: string
          validated_at?: string | null
        }
        Relationships: []
      }
      customer_credits: {
        Row: {
          action_type: string
          created_at: string | null
          description: string | null
          id: string
          user_id: string
          value: number
        }
        Insert: {
          action_type: string
          created_at?: string | null
          description?: string | null
          id?: string
          user_id: string
          value: number
        }
        Update: {
          action_type?: string
          created_at?: string | null
          description?: string | null
          id?: string
          user_id?: string
          value?: number
        }
        Relationships: []
      }
      followers: {
        Row: {
          artist_id: string
          followed_at: string | null
          id: string
          viewer_id: string
        }
        Insert: {
          artist_id: string
          followed_at?: string | null
          id?: string
          viewer_id: string
        }
        Update: {
          artist_id?: string
          followed_at?: string | null
          id?: string
          viewer_id?: string
        }
        Relationships: []
      }
      job_applications: {
        Row: {
          applicant_id: string | null
          cover_letter: string | null
          created_at: string | null
          id: string
          job_id: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          applicant_id?: string | null
          cover_letter?: string | null
          created_at?: string | null
          id?: string
          job_id?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          applicant_id?: string | null
          cover_letter?: string | null
          created_at?: string | null
          id?: string
          job_id?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "job_applications_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      jobs: {
        Row: {
          compensation_details: string | null
          compensation_type: string | null
          created_at: string | null
          description: string | null
          expires_at: string | null
          id: string
          requirements: string | null
          salon_id: string | null
          status: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          compensation_details?: string | null
          compensation_type?: string | null
          created_at?: string | null
          description?: string | null
          expires_at?: string | null
          id?: string
          requirements?: string | null
          salon_id?: string | null
          status?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          compensation_details?: string | null
          compensation_type?: string | null
          created_at?: string | null
          description?: string | null
          expires_at?: string | null
          id?: string
          requirements?: string | null
          salon_id?: string | null
          status?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "jobs_salon_id_fkey"
            columns: ["salon_id"]
            isOneToOne: false
            referencedRelation: "salons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "jobs_salon_id_fkey"
            columns: ["salon_id"]
            isOneToOne: false
            referencedRelation: "user_salon_access"
            referencedColumns: ["salon_id"]
          },
        ]
      }
      message_likes: {
        Row: {
          id: string
          liked_at: string | null
          message_id: string | null
          user_id: string
        }
        Insert: {
          id?: string
          liked_at?: string | null
          message_id?: string | null
          user_id?: string
        }
        Update: {
          id?: string
          liked_at?: string | null
          message_id?: string | null
          user_id?: string
        }
        Relationships: []
      }
      motivational_messages: {
        Row: {
          category: string | null
          end_date: string | null
          id: string
          language: string | null
          message_text: string
          priority: number | null
          start_date: string | null
        }
        Insert: {
          category?: string | null
          end_date?: string | null
          id?: string
          language?: string | null
          message_text: string
          priority?: number | null
          start_date?: string | null
        }
        Update: {
          category?: string | null
          end_date?: string | null
          id?: string
          language?: string | null
          message_text?: string
          priority?: number | null
          start_date?: string | null
        }
        Relationships: []
      }
      motivational_quotes: {
        Row: {
          created_at: string
          id: string
          quote_text: string
          role: string
        }
        Insert: {
          created_at?: string
          id?: string
          quote_text: string
          role: string
        }
        Update: {
          created_at?: string
          id?: string
          quote_text?: string
          role?: string
        }
        Relationships: []
      }
      notification_settings: {
        Row: {
          created_at: string | null
          email_reminders_enabled: boolean | null
          id: string
          reminder_hours_before: number | null
          sms_reminders_enabled: boolean | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          email_reminders_enabled?: boolean | null
          id?: string
          reminder_hours_before?: number | null
          sms_reminders_enabled?: boolean | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          email_reminders_enabled?: boolean | null
          id?: string
          reminder_hours_before?: number | null
          sms_reminders_enabled?: boolean | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notification_settings_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profile_completion_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notification_settings_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_salon_access"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "notification_settings_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          created_at: string
          id: string
          is_read: boolean
          link: string | null
          message: string
          metadata: Json | null
          type: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_read?: boolean
          link?: string | null
          message: string
          metadata?: Json | null
          type: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_read?: boolean
          link?: string | null
          message?: string
          metadata?: Json | null
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      offers_sent: {
        Row: {
          artist_id: string
          credits_used: number | null
          id: string
          message: string | null
          sender_id: string
          sent_at: string | null
          status: string | null
        }
        Insert: {
          artist_id: string
          credits_used?: number | null
          id?: string
          message?: string | null
          sender_id: string
          sent_at?: string | null
          status?: string | null
        }
        Update: {
          artist_id?: string
          credits_used?: number | null
          id?: string
          message?: string | null
          sender_id?: string
          sent_at?: string | null
          status?: string | null
        }
        Relationships: []
      }
      portfolio_items: {
        Row: {
          created_at: string
          description: string | null
          id: string
          image_url: string
          order: number
          title: string
          user_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          image_url: string
          order: number
          title: string
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string
          order?: number
          title?: string
          user_id?: string
        }
        Relationships: []
      }
      posts: {
        Row: {
          contact_info: Json | null
          content: string
          created_at: string
          expires_at: string
          id: string
          is_nationwide: boolean
          location: string
          metadata: Json | null
          post_type: string
          price: number | null
          status: string
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          contact_info?: Json | null
          content: string
          created_at?: string
          expires_at?: string
          id?: string
          is_nationwide?: boolean
          location: string
          metadata?: Json | null
          post_type: string
          price?: number | null
          status?: string
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          contact_info?: Json | null
          content?: string
          created_at?: string
          expires_at?: string
          id?: string
          is_nationwide?: boolean
          location?: string
          metadata?: Json | null
          post_type?: string
          price?: number | null
          status?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      profile_requirements: {
        Row: {
          min_completion_percentage: number | null
          optional_fields: string[] | null
          required_fields: string[]
          role: string
        }
        Insert: {
          min_completion_percentage?: number | null
          optional_fields?: string[] | null
          required_fields: string[]
          role: string
        }
        Update: {
          min_completion_percentage?: number | null
          optional_fields?: string[] | null
          required_fields?: string[]
          role?: string
        }
        Relationships: []
      }
      referrals: {
        Row: {
          created_at: string
          id: string
          milestone_reached: boolean | null
          milestone_type: string | null
          milestone_value: Json | null
          referred_id: string
          referrer_id: string
          status: string | null
          verified_at: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          milestone_reached?: boolean | null
          milestone_type?: string | null
          milestone_value?: Json | null
          referred_id: string
          referrer_id: string
          status?: string | null
          verified_at?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          milestone_reached?: boolean | null
          milestone_type?: string | null
          milestone_value?: Json | null
          referred_id?: string
          referrer_id?: string
          status?: string | null
          verified_at?: string | null
        }
        Relationships: []
      }
      reviews: {
        Row: {
          artist_id: string | null
          booking_id: string | null
          comment: string | null
          created_at: string | null
          customer_id: string | null
          id: string
          rating: number
          reported: boolean | null
          salon_id: string | null
          status: string | null
        }
        Insert: {
          artist_id?: string | null
          booking_id?: string | null
          comment?: string | null
          created_at?: string | null
          customer_id?: string | null
          id?: string
          rating: number
          reported?: boolean | null
          salon_id?: string | null
          status?: string | null
        }
        Update: {
          artist_id?: string | null
          booking_id?: string | null
          comment?: string | null
          created_at?: string | null
          customer_id?: string | null
          id?: string
          rating?: number
          reported?: boolean | null
          salon_id?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reviews_artist_id_fkey"
            columns: ["artist_id"]
            isOneToOne: false
            referencedRelation: "profile_completion_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_artist_id_fkey"
            columns: ["artist_id"]
            isOneToOne: false
            referencedRelation: "user_salon_access"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "reviews_artist_id_fkey"
            columns: ["artist_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: true
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "profile_completion_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "user_salon_access"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "reviews_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      salon_photos: {
        Row: {
          caption: string | null
          created_at: string | null
          id: string
          order_number: number | null
          photo_url: string
          salon_id: string | null
        }
        Insert: {
          caption?: string | null
          created_at?: string | null
          id?: string
          order_number?: number | null
          photo_url: string
          salon_id?: string | null
        }
        Update: {
          caption?: string | null
          created_at?: string | null
          id?: string
          order_number?: number | null
          photo_url?: string
          salon_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "salon_photos_salon_id_fkey"
            columns: ["salon_id"]
            isOneToOne: false
            referencedRelation: "salons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "salon_photos_salon_id_fkey"
            columns: ["salon_id"]
            isOneToOne: false
            referencedRelation: "user_salon_access"
            referencedColumns: ["salon_id"]
          },
        ]
      }
      salon_sale_photos: {
        Row: {
          created_at: string
          id: string
          order_number: number | null
          photo_url: string
          salon_sale_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          order_number?: number | null
          photo_url: string
          salon_sale_id: string
        }
        Update: {
          created_at?: string
          id?: string
          order_number?: number | null
          photo_url?: string
          salon_sale_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "salon_sale_photos_salon_sale_id_fkey"
            columns: ["salon_sale_id"]
            isOneToOne: false
            referencedRelation: "salon_sales"
            referencedColumns: ["id"]
          },
        ]
      }
      salon_sales: {
        Row: {
          asking_price: number
          business_type: string | null
          city: string
          created_at: string
          description: string
          id: string
          is_featured: boolean | null
          is_private: boolean | null
          is_urgent: boolean | null
          salon_name: string
          size: string | null
          state: string
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          asking_price: number
          business_type?: string | null
          city: string
          created_at?: string
          description: string
          id?: string
          is_featured?: boolean | null
          is_private?: boolean | null
          is_urgent?: boolean | null
          salon_name: string
          size?: string | null
          state: string
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          asking_price?: number
          business_type?: string | null
          city?: string
          created_at?: string
          description?: string
          id?: string
          is_featured?: boolean | null
          is_private?: boolean | null
          is_urgent?: boolean | null
          salon_name?: string
          size?: string | null
          state?: string
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      salon_services: {
        Row: {
          created_at: string
          description: string | null
          duration_min: number
          id: string
          image_url: string | null
          name: string
          price: number
          salon_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          duration_min: number
          id?: string
          image_url?: string | null
          name: string
          price: number
          salon_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          duration_min?: number
          id?: string
          image_url?: string | null
          name?: string
          price?: number
          salon_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "salon_services_salon_id_fkey"
            columns: ["salon_id"]
            isOneToOne: false
            referencedRelation: "salons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "salon_services_salon_id_fkey"
            columns: ["salon_id"]
            isOneToOne: false
            referencedRelation: "user_salon_access"
            referencedColumns: ["salon_id"]
          },
        ]
      }
      salon_staff: {
        Row: {
          avatar_url: string | null
          commission_rate: number | null
          created_at: string
          email: string
          full_name: string
          id: string
          role: string
          salon_id: string
          specialty: string | null
          status: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          commission_rate?: number | null
          created_at?: string
          email: string
          full_name: string
          id?: string
          role: string
          salon_id: string
          specialty?: string | null
          status?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          commission_rate?: number | null
          created_at?: string
          email?: string
          full_name?: string
          id?: string
          role?: string
          salon_id?: string
          specialty?: string | null
          status?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "salon_staff_salon_id_fkey"
            columns: ["salon_id"]
            isOneToOne: false
            referencedRelation: "profile_completion_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "salon_staff_salon_id_fkey"
            columns: ["salon_id"]
            isOneToOne: false
            referencedRelation: "user_salon_access"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "salon_staff_salon_id_fkey"
            columns: ["salon_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      salon_views: {
        Row: {
          id: string
          salon_id: string
          session_id: string | null
          source: string | null
          viewed_at: string | null
          viewer_id: string | null
        }
        Insert: {
          id?: string
          salon_id: string
          session_id?: string | null
          source?: string | null
          viewed_at?: string | null
          viewer_id?: string | null
        }
        Update: {
          id?: string
          salon_id?: string
          session_id?: string | null
          source?: string | null
          viewed_at?: string | null
          viewer_id?: string | null
        }
        Relationships: []
      }
      salons: {
        Row: {
          about: string | null
          created_at: string | null
          id: string
          instagram: string | null
          location: string | null
          logo_url: string | null
          owner_id: string | null
          phone: string | null
          salon_name: string | null
          updated_at: string | null
          website: string | null
        }
        Insert: {
          about?: string | null
          created_at?: string | null
          id: string
          instagram?: string | null
          location?: string | null
          logo_url?: string | null
          owner_id?: string | null
          phone?: string | null
          salon_name?: string | null
          updated_at?: string | null
          website?: string | null
        }
        Update: {
          about?: string | null
          created_at?: string | null
          id?: string
          instagram?: string | null
          location?: string | null
          logo_url?: string | null
          owner_id?: string | null
          phone?: string | null
          salon_name?: string | null
          updated_at?: string | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "salons_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "profile_completion_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "salons_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "user_salon_access"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "salons_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      saved_artists: {
        Row: {
          artist_id: string
          id: string
          saved_at: string | null
          viewer_id: string
        }
        Insert: {
          artist_id: string
          id?: string
          saved_at?: string | null
          viewer_id: string
        }
        Update: {
          artist_id?: string
          id?: string
          saved_at?: string | null
          viewer_id?: string
        }
        Relationships: []
      }
      services: {
        Row: {
          created_at: string | null
          description: string | null
          duration_minutes: number
          id: string
          image_url: string | null
          is_visible: boolean | null
          price: number
          title: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          duration_minutes: number
          id?: string
          image_url?: string | null
          is_visible?: boolean | null
          price: number
          title: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          duration_minutes?: number
          id?: string
          image_url?: string | null
          is_visible?: boolean | null
          price?: number
          title?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      staff_service_assignments: {
        Row: {
          created_at: string | null
          id: string
          service_id: string | null
          staff_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          service_id?: string | null
          staff_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          service_id?: string | null
          staff_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "staff_service_assignments_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "staff_service_assignments_staff_id_fkey"
            columns: ["staff_id"]
            isOneToOne: false
            referencedRelation: "salon_staff"
            referencedColumns: ["id"]
          },
        ]
      }
      support_logs: {
        Row: {
          admin_notes: string | null
          id: string
          question: string
          resolved: boolean | null
          response: string | null
          timestamp: string
          user_id: string
        }
        Insert: {
          admin_notes?: string | null
          id?: string
          question: string
          resolved?: boolean | null
          response?: string | null
          timestamp?: string
          user_id: string
        }
        Update: {
          admin_notes?: string | null
          id?: string
          question?: string
          resolved?: boolean | null
          response?: string | null
          timestamp?: string
          user_id?: string
        }
        Relationships: []
      }
      translation_strings: {
        Row: {
          context: string | null
          created_at: string
          english: string
          id: string
          key: string
          vietnamese: string
        }
        Insert: {
          context?: string | null
          created_at?: string
          english: string
          id?: string
          key: string
          vietnamese: string
        }
        Update: {
          context?: string | null
          created_at?: string
          english?: string
          id?: string
          key?: string
          vietnamese?: string
        }
        Relationships: []
      }
      users: {
        Row: {
          accepts_bookings: boolean | null
          avatar_url: string | null
          badges: Json | null
          bio: string | null
          booking_url: string | null
          boosted_until: string | null
          completed_profile_tasks: string[] | null
          contact_link: string | null
          created_at: string | null
          credits: number | null
          custom_role: string | null
          email: string
          full_name: string
          id: string
          instagram: string | null
          invited: boolean | null
          location: string | null
          manager_for_salon_id: string | null
          phone: string | null
          portfolio_urls: string[] | null
          preferences: string[] | null
          preferred_language: string | null
          profile_completion: number | null
          referral_code: string | null
          referred_by: string | null
          role: string | null
          specialty: string | null
          updated_at: string | null
          website: string | null
        }
        Insert: {
          accepts_bookings?: boolean | null
          avatar_url?: string | null
          badges?: Json | null
          bio?: string | null
          booking_url?: string | null
          boosted_until?: string | null
          completed_profile_tasks?: string[] | null
          contact_link?: string | null
          created_at?: string | null
          credits?: number | null
          custom_role?: string | null
          email: string
          full_name: string
          id?: string
          instagram?: string | null
          invited?: boolean | null
          location?: string | null
          manager_for_salon_id?: string | null
          phone?: string | null
          portfolio_urls?: string[] | null
          preferences?: string[] | null
          preferred_language?: string | null
          profile_completion?: number | null
          referral_code?: string | null
          referred_by?: string | null
          role?: string | null
          specialty?: string | null
          updated_at?: string | null
          website?: string | null
        }
        Update: {
          accepts_bookings?: boolean | null
          avatar_url?: string | null
          badges?: Json | null
          bio?: string | null
          booking_url?: string | null
          boosted_until?: string | null
          completed_profile_tasks?: string[] | null
          contact_link?: string | null
          created_at?: string | null
          credits?: number | null
          custom_role?: string | null
          email?: string
          full_name?: string
          id?: string
          instagram?: string | null
          invited?: boolean | null
          location?: string | null
          manager_for_salon_id?: string | null
          phone?: string | null
          portfolio_urls?: string[] | null
          preferences?: string[] | null
          preferred_language?: string | null
          profile_completion?: number | null
          referral_code?: string | null
          referred_by?: string | null
          role?: string | null
          specialty?: string | null
          updated_at?: string | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "users_manager_for_salon_id_fkey"
            columns: ["manager_for_salon_id"]
            isOneToOne: false
            referencedRelation: "salons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "users_manager_for_salon_id_fkey"
            columns: ["manager_for_salon_id"]
            isOneToOne: false
            referencedRelation: "user_salon_access"
            referencedColumns: ["salon_id"]
          },
        ]
      }
      waitlist_requests: {
        Row: {
          created_at: string
          email: string
          full_name: string
          id: string
          reason: string | null
          status: string | null
          updated_at: string
          user_type: string
        }
        Insert: {
          created_at?: string
          email: string
          full_name: string
          id?: string
          reason?: string | null
          status?: string | null
          updated_at?: string
          user_type: string
        }
        Update: {
          created_at?: string
          email?: string
          full_name?: string
          id?: string
          reason?: string | null
          status?: string | null
          updated_at?: string
          user_type?: string
        }
        Relationships: []
      }
    }
    Views: {
      artist_earnings_summary: {
        Row: {
          artist_id: string | null
          booking_count: number | null
          paid: boolean | null
          salon_id: string | null
          total_earnings: number | null
          total_revenue: number | null
          week_start: string | null
        }
        Relationships: []
      }
      post_status_view: {
        Row: {
          contact_info: Json | null
          content: string | null
          created_at: string | null
          expires_at: string | null
          id: string | null
          is_expired: boolean | null
          is_expiring_soon: boolean | null
          is_nationwide: boolean | null
          location: string | null
          metadata: Json | null
          post_type: string | null
          price: number | null
          status: string | null
          title: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          contact_info?: Json | null
          content?: string | null
          created_at?: string | null
          expires_at?: string | null
          id?: string | null
          is_expired?: never
          is_expiring_soon?: never
          is_nationwide?: boolean | null
          location?: string | null
          metadata?: Json | null
          post_type?: string | null
          price?: number | null
          status?: string | null
          title?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          contact_info?: Json | null
          content?: string | null
          created_at?: string | null
          expires_at?: string | null
          id?: string | null
          is_expired?: never
          is_expiring_soon?: never
          is_nationwide?: boolean | null
          location?: string | null
          metadata?: Json | null
          post_type?: string | null
          price?: number | null
          status?: string | null
          title?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      profile_completion_view: {
        Row: {
          calculated_completion: number | null
          id: string | null
          is_complete: boolean | null
          min_completion_percentage: number | null
          optional_fields: string[] | null
          profile_completion: number | null
          required_fields: string[] | null
          role: string | null
        }
        Relationships: []
      }
      user_salon_access: {
        Row: {
          access_type: string | null
          salon_id: string | null
          user_id: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      array_append_unique: {
        Args: { arr: string[]; item: string }
        Returns: string[]
      }
      award_credits: {
        Args: {
          p_user_id: string
          p_action_type: string
          p_value: number
          p_description?: string
        }
        Returns: boolean
      }
      award_tip_credits: {
        Args: { p_user_id: string; p_amount: number; p_transaction_id: string }
        Returns: boolean
      }
      calculate_profile_completion: {
        Args: { user_profile: Json; user_role: string }
        Returns: number
      }
      can_review_booking: {
        Args: { booking_id: string; user_id: string }
        Returns: boolean
      }
      create_notification: {
        Args: {
          p_user_id: string
          p_message: string
          p_type?: string
          p_link?: string
          p_metadata?: Json
        }
        Returns: string
      }
      get_artist_rating: {
        Args: { artist_id: string }
        Returns: {
          average_rating: number
          review_count: number
        }[]
      }
      get_user_referral_stats: {
        Args: { user_id: string }
        Returns: {
          referral_count: number
        }[]
      }
      is_artist_available: {
        Args: {
          p_artist_id: string
          p_date: string
          p_start_time: string
          p_end_time: string
        }
        Returns: boolean
      }
      is_post_expired: {
        Args: { expires_at: string }
        Returns: boolean
      }
      is_user_invited: {
        Args: { user_id: string }
        Returns: boolean
      }
      process_referral: {
        Args: { referral_code: string; new_user_id: string }
        Returns: boolean
      }
      process_referral_credits: {
        Args: { p_referrer_code: string; p_new_user_id: string }
        Returns: boolean
      }
      redeem_credits: {
        Args: {
          p_user_id: string
          p_amount: number
          p_redemption_type: string
          p_target_id?: string
        }
        Returns: boolean
      }
      submit_review_with_credits: {
        Args: {
          p_user_id: string
          p_artist_id: string
          p_booking_id: string
          p_rating: number
          p_review_text: string
        }
        Returns: boolean
      }
      track_salon_view: {
        Args: { p_salon_id: string; p_viewer_id?: string; p_source?: string }
        Returns: undefined
      }
      user_has_salon_access: {
        Args: {
          p_user_id: string
          p_salon_id: string
          p_access_types?: string[]
        }
        Returns: boolean
      }
    }
    Enums: {
      application_status: "pending" | "accepted" | "rejected"
      booking_status: "pending" | "confirmed" | "canceled" | "completed"
      job_status: "open" | "closed"
      payment_status: "pending" | "completed" | "failed"
      user_role: "customer" | "salon_owner" | "technician"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      application_status: ["pending", "accepted", "rejected"],
      booking_status: ["pending", "confirmed", "canceled", "completed"],
      job_status: ["open", "closed"],
      payment_status: ["pending", "completed", "failed"],
      user_role: ["customer", "salon_owner", "technician"],
    },
  },
} as const
