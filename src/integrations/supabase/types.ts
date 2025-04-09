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
      bookings: {
        Row: {
          created_at: string | null
          date_requested: string | null
          id: string
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
          title: string
          user_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          image_url: string
          title: string
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string
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
      salons: {
        Row: {
          about: string | null
          created_at: string | null
          id: string
          instagram: string | null
          location: string | null
          logo_url: string | null
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
          phone?: string | null
          salon_name?: string | null
          updated_at?: string | null
          website?: string | null
        }
        Relationships: []
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
          contact_link: string | null
          created_at: string | null
          credits: number | null
          custom_role: string | null
          email: string
          full_name: string
          id: string
          instagram: string | null
          location: string | null
          phone: string | null
          portfolio_urls: string[] | null
          preferences: string[] | null
          preferred_language: string | null
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
          contact_link?: string | null
          created_at?: string | null
          credits?: number | null
          custom_role?: string | null
          email: string
          full_name: string
          id?: string
          instagram?: string | null
          location?: string | null
          phone?: string | null
          portfolio_urls?: string[] | null
          preferences?: string[] | null
          preferred_language?: string | null
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
          contact_link?: string | null
          created_at?: string | null
          credits?: number | null
          custom_role?: string | null
          email?: string
          full_name?: string
          id?: string
          instagram?: string | null
          location?: string | null
          phone?: string | null
          portfolio_urls?: string[] | null
          preferences?: string[] | null
          preferred_language?: string | null
          referral_code?: string | null
          referred_by?: string | null
          role?: string | null
          specialty?: string | null
          updated_at?: string | null
          website?: string | null
        }
        Relationships: []
      }
    }
    Views: {
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
    }
    Functions: {
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
      is_post_expired: {
        Args: { expires_at: string }
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
