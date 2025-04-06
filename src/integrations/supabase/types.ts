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
      bookings: {
        Row: {
          created_at: string | null
          date_requested: string | null
          id: string
          note: string | null
          recipient_id: string
          sender_id: string
          status: string | null
          time_requested: string | null
        }
        Insert: {
          created_at?: string | null
          date_requested?: string | null
          id?: string
          note?: string | null
          recipient_id: string
          sender_id: string
          status?: string | null
          time_requested?: string | null
        }
        Update: {
          created_at?: string | null
          date_requested?: string | null
          id?: string
          note?: string | null
          recipient_id?: string
          sender_id?: string
          status?: string | null
          time_requested?: string | null
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
          referred_id: string
          referrer_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          referred_id: string
          referrer_id: string
        }
        Update: {
          created_at?: string
          id?: string
          referred_id?: string
          referrer_id?: string
        }
        Relationships: []
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
      users: {
        Row: {
          avatar_url: string | null
          badges: Json | null
          bio: string | null
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
          avatar_url?: string | null
          badges?: Json | null
          bio?: string | null
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
          avatar_url?: string | null
          badges?: Json | null
          bio?: string | null
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
      get_user_referral_stats: {
        Args: {
          user_id: string
        }
        Returns: {
          referral_count: number
        }[]
      }
      is_post_expired: {
        Args: {
          expires_at: string
        }
        Returns: boolean
      }
      process_referral: {
        Args: {
          referral_code: string
          new_user_id: string
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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
