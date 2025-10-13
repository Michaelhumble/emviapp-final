export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      ab_test_assignments: {
        Row: {
          assigned_at: string | null
          id: string
          test_id: string
          user_id: string
          variant: string
        }
        Insert: {
          assigned_at?: string | null
          id?: string
          test_id: string
          user_id: string
          variant: string
        }
        Update: {
          assigned_at?: string | null
          id?: string
          test_id?: string
          user_id?: string
          variant?: string
        }
        Relationships: [
          {
            foreignKeyName: "ab_test_assignments_test_id_fkey"
            columns: ["test_id"]
            isOneToOne: false
            referencedRelation: "ab_tests"
            referencedColumns: ["id"]
          },
        ]
      }
      ab_test_events: {
        Row: {
          created_at: string | null
          event_data: Json | null
          event_type: string
          id: string
          test_id: string
          user_id: string
          variant: string
        }
        Insert: {
          created_at?: string | null
          event_data?: Json | null
          event_type: string
          id?: string
          test_id: string
          user_id: string
          variant: string
        }
        Update: {
          created_at?: string | null
          event_data?: Json | null
          event_type?: string
          id?: string
          test_id?: string
          user_id?: string
          variant?: string
        }
        Relationships: [
          {
            foreignKeyName: "ab_test_events_test_id_fkey"
            columns: ["test_id"]
            isOneToOne: false
            referencedRelation: "ab_tests"
            referencedColumns: ["id"]
          },
        ]
      }
      ab_tests: {
        Row: {
          confidence_level: number | null
          created_at: string | null
          created_by: string
          end_date: string | null
          id: string
          minimum_sample_size: number | null
          start_date: string | null
          status: string | null
          target_metric: string
          test_name: string
          test_type: string
          traffic_split: Json
          updated_at: string | null
          variants: Json
        }
        Insert: {
          confidence_level?: number | null
          created_at?: string | null
          created_by: string
          end_date?: string | null
          id?: string
          minimum_sample_size?: number | null
          start_date?: string | null
          status?: string | null
          target_metric: string
          test_name: string
          test_type: string
          traffic_split?: Json
          updated_at?: string | null
          variants: Json
        }
        Update: {
          confidence_level?: number | null
          created_at?: string | null
          created_by?: string
          end_date?: string | null
          id?: string
          minimum_sample_size?: number | null
          start_date?: string | null
          status?: string | null
          target_metric?: string
          test_name?: string
          test_type?: string
          traffic_split?: Json
          updated_at?: string | null
          variants?: Json
        }
        Relationships: []
      }
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
        Relationships: [
          {
            foreignKeyName: "activity_log_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      admin_actions: {
        Row: {
          action_type: string
          admin_user_id: string
          created_at: string | null
          details: Json
          id: string
          ip_address: string | null
          reason: string
          target_user_id: string | null
        }
        Insert: {
          action_type: string
          admin_user_id: string
          created_at?: string | null
          details: Json
          id?: string
          ip_address?: string | null
          reason: string
          target_user_id?: string | null
        }
        Update: {
          action_type?: string
          admin_user_id?: string
          created_at?: string | null
          details?: Json
          id?: string
          ip_address?: string | null
          reason?: string
          target_user_id?: string | null
        }
        Relationships: []
      }
      affiliate_clicks: {
        Row: {
          affiliate_id: string | null
          country_code: string | null
          created_at: string | null
          id: string
          ip_address: unknown | null
          link_id: string | null
          referrer: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          affiliate_id?: string | null
          country_code?: string | null
          created_at?: string | null
          id?: string
          ip_address?: unknown | null
          link_id?: string | null
          referrer?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          affiliate_id?: string | null
          country_code?: string | null
          created_at?: string | null
          id?: string
          ip_address?: unknown | null
          link_id?: string | null
          referrer?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "affiliate_clicks_affiliate_id_fkey"
            columns: ["affiliate_id"]
            isOneToOne: false
            referencedRelation: "affiliate_partners"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "affiliate_clicks_link_id_fkey"
            columns: ["link_id"]
            isOneToOne: false
            referencedRelation: "affiliate_links"
            referencedColumns: ["id"]
          },
        ]
      }
      affiliate_conversions: {
        Row: {
          affiliate_id: string | null
          attributed_click_id: string | null
          commission_amount: number | null
          created_at: string | null
          event_type: string
          id: string
          metadata: Json | null
          revenue_amount: number | null
          stripe_customer_id: string | null
          stripe_session_id: string | null
          user_id: string | null
        }
        Insert: {
          affiliate_id?: string | null
          attributed_click_id?: string | null
          commission_amount?: number | null
          created_at?: string | null
          event_type: string
          id?: string
          metadata?: Json | null
          revenue_amount?: number | null
          stripe_customer_id?: string | null
          stripe_session_id?: string | null
          user_id?: string | null
        }
        Update: {
          affiliate_id?: string | null
          attributed_click_id?: string | null
          commission_amount?: number | null
          created_at?: string | null
          event_type?: string
          id?: string
          metadata?: Json | null
          revenue_amount?: number | null
          stripe_customer_id?: string | null
          stripe_session_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "affiliate_conversions_affiliate_id_fkey"
            columns: ["affiliate_id"]
            isOneToOne: false
            referencedRelation: "affiliate_partners"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "affiliate_conversions_attributed_click_id_fkey"
            columns: ["attributed_click_id"]
            isOneToOne: false
            referencedRelation: "affiliate_clicks"
            referencedColumns: ["id"]
          },
        ]
      }
      affiliate_links: {
        Row: {
          affiliate_id: string | null
          clicks_count: number | null
          conversions_count: number | null
          created_at: string | null
          destination_url: string
          hmac_signature: string
          id: string
          slug: string
          title: string | null
          updated_at: string | null
        }
        Insert: {
          affiliate_id?: string | null
          clicks_count?: number | null
          conversions_count?: number | null
          created_at?: string | null
          destination_url: string
          hmac_signature: string
          id?: string
          slug: string
          title?: string | null
          updated_at?: string | null
        }
        Update: {
          affiliate_id?: string | null
          clicks_count?: number | null
          conversions_count?: number | null
          created_at?: string | null
          destination_url?: string
          hmac_signature?: string
          id?: string
          slug?: string
          title?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "affiliate_links_affiliate_id_fkey"
            columns: ["affiliate_id"]
            isOneToOne: false
            referencedRelation: "affiliate_partners"
            referencedColumns: ["id"]
          },
        ]
      }
      affiliate_partners: {
        Row: {
          approved_at: string | null
          commission_rate: number | null
          connect_status: string | null
          country: string | null
          created_at: string | null
          default_currency: string | null
          id: string
          last_connect_check: string | null
          slug: string
          status: string | null
          stripe_account_id: string | null
          stripe_connect_account_id: string | null
          total_clicks: number | null
          total_commissions: number | null
          total_conversions: number | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          approved_at?: string | null
          commission_rate?: number | null
          connect_status?: string | null
          country?: string | null
          created_at?: string | null
          default_currency?: string | null
          id?: string
          last_connect_check?: string | null
          slug: string
          status?: string | null
          stripe_account_id?: string | null
          stripe_connect_account_id?: string | null
          total_clicks?: number | null
          total_commissions?: number | null
          total_conversions?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          approved_at?: string | null
          commission_rate?: number | null
          connect_status?: string | null
          country?: string | null
          created_at?: string | null
          default_currency?: string | null
          id?: string
          last_connect_check?: string | null
          slug?: string
          status?: string | null
          stripe_account_id?: string | null
          stripe_connect_account_id?: string | null
          total_clicks?: number | null
          total_commissions?: number | null
          total_conversions?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      affiliate_payouts: {
        Row: {
          affiliate_id: string | null
          commission_amount: number
          created_at: string | null
          failure_reason: string | null
          id: string
          paid_at: string | null
          period_end: string
          period_start: string
          status: string | null
          stripe_payout_id: string | null
        }
        Insert: {
          affiliate_id?: string | null
          commission_amount: number
          created_at?: string | null
          failure_reason?: string | null
          id?: string
          paid_at?: string | null
          period_end: string
          period_start: string
          status?: string | null
          stripe_payout_id?: string | null
        }
        Update: {
          affiliate_id?: string | null
          commission_amount?: number
          created_at?: string | null
          failure_reason?: string | null
          id?: string
          paid_at?: string | null
          period_end?: string
          period_start?: string
          status?: string | null
          stripe_payout_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "affiliate_payouts_affiliate_id_fkey"
            columns: ["affiliate_id"]
            isOneToOne: false
            referencedRelation: "affiliate_partners"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_recommendations: {
        Row: {
          clicked: boolean | null
          created_at: string | null
          dismissed: boolean | null
          id: string
          metadata: Json | null
          reasons: string[] | null
          recommendation_type: string
          score: number | null
          shown_at: string | null
          target_id: string
          user_id: string
        }
        Insert: {
          clicked?: boolean | null
          created_at?: string | null
          dismissed?: boolean | null
          id?: string
          metadata?: Json | null
          reasons?: string[] | null
          recommendation_type: string
          score?: number | null
          shown_at?: string | null
          target_id: string
          user_id: string
        }
        Update: {
          clicked?: boolean | null
          created_at?: string | null
          dismissed?: boolean | null
          id?: string
          metadata?: Json | null
          reasons?: string[] | null
          recommendation_type?: string
          score?: number | null
          shown_at?: string | null
          target_id?: string
          user_id?: string
        }
        Relationships: []
      }
      ai_usage_logs: {
        Row: {
          admin_action: string | null
          admin_reviewed: boolean | null
          created_at: string
          flagged_reason: string | null
          id: string
          ip_address: string | null
          prompt: string
          prompt_hash: string
          response: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          admin_action?: string | null
          admin_reviewed?: boolean | null
          created_at?: string
          flagged_reason?: string | null
          id?: string
          ip_address?: string | null
          prompt: string
          prompt_hash: string
          response?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          admin_action?: string | null
          admin_reviewed?: boolean | null
          created_at?: string
          flagged_reason?: string | null
          id?: string
          ip_address?: string | null
          prompt?: string
          prompt_hash?: string
          response?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      api_rate_limits: {
        Row: {
          blocked_until: string | null
          created_at: string | null
          endpoint: string
          id: string
          identifier: string
          request_count: number | null
          window_start: string | null
        }
        Insert: {
          blocked_until?: string | null
          created_at?: string | null
          endpoint: string
          id?: string
          identifier: string
          request_count?: number | null
          window_start?: string | null
        }
        Update: {
          blocked_until?: string | null
          created_at?: string | null
          endpoint?: string
          id?: string
          identifier?: string
          request_count?: number | null
          window_start?: string | null
        }
        Relationships: []
      }
      applications: {
        Row: {
          application_data: Json | null
          application_type: string
          id: string
          status: string
          submitted_at: string
          target_id: string | null
          user_id: string | null
        }
        Insert: {
          application_data?: Json | null
          application_type: string
          id?: string
          status?: string
          submitted_at?: string
          target_id?: string | null
          user_id?: string | null
        }
        Update: {
          application_data?: Json | null
          application_type?: string
          id?: string
          status?: string
          submitted_at?: string
          target_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "applications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
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
          buffer_minutes: number | null
          created_at: string
          day_of_week: string
          end_time: string
          id: string
          is_available: boolean
          max_advance_days: number | null
          slot_duration_minutes: number | null
          start_time: string
          timezone: string | null
        }
        Insert: {
          artist_id: string
          buffer_minutes?: number | null
          created_at?: string
          day_of_week: string
          end_time: string
          id?: string
          is_available?: boolean
          max_advance_days?: number | null
          slot_duration_minutes?: number | null
          start_time: string
          timezone?: string | null
        }
        Update: {
          artist_id?: string
          buffer_minutes?: number | null
          created_at?: string
          day_of_week?: string
          end_time?: string
          id?: string
          is_available?: boolean
          max_advance_days?: number | null
          slot_duration_minutes?: number | null
          start_time?: string
          timezone?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "artist_availability_artist_id_fkey"
            columns: ["artist_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
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
        Relationships: [
          {
            foreignKeyName: "artist_clients_artist_id_fkey"
            columns: ["artist_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      artist_for_hire_profiles: {
        Row: {
          available_for_work: boolean | null
          avatar_url: string | null
          bio: string | null
          created_at: string | null
          headline: string | null
          hourly_rate: string | null
          id: string
          is_featured: boolean
          location: string | null
          seed_tag: string | null
          shifts_available: string | null
          specialties: string | null
          updated_at: string | null
          user_id: string
          years_experience: string | null
        }
        Insert: {
          available_for_work?: boolean | null
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          headline?: string | null
          hourly_rate?: string | null
          id?: string
          is_featured?: boolean
          location?: string | null
          seed_tag?: string | null
          shifts_available?: string | null
          specialties?: string | null
          updated_at?: string | null
          user_id: string
          years_experience?: string | null
        }
        Update: {
          available_for_work?: boolean | null
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          headline?: string | null
          hourly_rate?: string | null
          id?: string
          is_featured?: boolean
          location?: string | null
          seed_tag?: string | null
          shifts_available?: string | null
          specialties?: string | null
          updated_at?: string | null
          user_id?: string
          years_experience?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "artist_for_hire_profiles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      artist_job_applications: {
        Row: {
          applied_at: string | null
          cover_letter: string | null
          id: string
          job_id: string
          metadata: Json | null
          portfolio_urls: string[] | null
          reviewed_at: string | null
          status: string | null
          user_id: string
        }
        Insert: {
          applied_at?: string | null
          cover_letter?: string | null
          id?: string
          job_id: string
          metadata?: Json | null
          portfolio_urls?: string[] | null
          reviewed_at?: string | null
          status?: string | null
          user_id: string
        }
        Update: {
          applied_at?: string | null
          cover_letter?: string | null
          id?: string
          job_id?: string
          metadata?: Json | null
          portfolio_urls?: string[] | null
          reviewed_at?: string | null
          status?: string | null
          user_id?: string
        }
        Relationships: []
      }
      artist_offers: {
        Row: {
          artist_id: string
          created_at: string | null
          expires_at: string | null
          id: string
          message: string | null
          metadata: Json | null
          offer_type: string | null
          salon_id: string
          status: string | null
          updated_at: string | null
        }
        Insert: {
          artist_id: string
          created_at?: string | null
          expires_at?: string | null
          id?: string
          message?: string | null
          metadata?: Json | null
          offer_type?: string | null
          salon_id: string
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          artist_id?: string
          created_at?: string | null
          expires_at?: string | null
          id?: string
          message?: string | null
          metadata?: Json | null
          offer_type?: string | null
          salon_id?: string
          status?: string | null
          updated_at?: string | null
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
        Relationships: [
          {
            foreignKeyName: "artist_services_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
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
        Relationships: [
          {
            foreignKeyName: "artist_time_off_artist_id_fkey"
            columns: ["artist_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_logs: {
        Row: {
          action: string
          created_at: string | null
          id: string
          ip_address: unknown | null
          metadata: Json | null
          resource_id: string | null
          resource_type: string
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string | null
          id?: string
          ip_address?: unknown | null
          metadata?: Json | null
          resource_id?: string | null
          resource_type: string
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string | null
          id?: string
          ip_address?: unknown | null
          metadata?: Json | null
          resource_id?: string | null
          resource_type?: string
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      auth_state: {
        Row: {
          created_at: string | null
          expires_at: string | null
          id: string
          nonce: string
          state_data: Json
        }
        Insert: {
          created_at?: string | null
          expires_at?: string | null
          id?: string
          nonce: string
          state_data: Json
        }
        Update: {
          created_at?: string | null
          expires_at?: string | null
          id?: string
          nonce?: string
          state_data?: Json
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
        Relationships: []
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
        Relationships: []
      }
      booking_audit_log: {
        Row: {
          action_type: string
          booking_id: string
          created_at: string | null
          id: string
          ip_address: string | null
          metadata: Json | null
          new_state: Json | null
          previous_state: Json | null
          user_id: string | null
        }
        Insert: {
          action_type: string
          booking_id: string
          created_at?: string | null
          id?: string
          ip_address?: string | null
          metadata?: Json | null
          new_state?: Json | null
          previous_state?: Json | null
          user_id?: string | null
        }
        Update: {
          action_type?: string
          booking_id?: string
          created_at?: string | null
          id?: string
          ip_address?: string | null
          metadata?: Json | null
          new_state?: Json | null
          previous_state?: Json | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "booking_audit_log_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
        ]
      }
      bookings: {
        Row: {
          appointment_time: string | null
          calendar_event_id: string | null
          cancellation_reason: string | null
          client_email: string | null
          client_name: string | null
          client_phone: string | null
          confirmation_sent_at: string | null
          created_at: string | null
          date_requested: string | null
          ends_at: string | null
          ics_sequence: number | null
          id: string
          manage_token_expires_at: string | null
          manage_token_hash: string | null
          managed_by: string | null
          metadata: Json | null
          note: string | null
          recipient_id: string
          reminder_sent: boolean | null
          reminder_sent_at: string | null
          rescheduled_from_id: string | null
          sender_id: string
          service_id: string | null
          service_type: string | null
          source: string | null
          starts_at: string | null
          status: string | null
          time_requested: string | null
        }
        Insert: {
          appointment_time?: string | null
          calendar_event_id?: string | null
          cancellation_reason?: string | null
          client_email?: string | null
          client_name?: string | null
          client_phone?: string | null
          confirmation_sent_at?: string | null
          created_at?: string | null
          date_requested?: string | null
          ends_at?: string | null
          ics_sequence?: number | null
          id?: string
          manage_token_expires_at?: string | null
          manage_token_hash?: string | null
          managed_by?: string | null
          metadata?: Json | null
          note?: string | null
          recipient_id: string
          reminder_sent?: boolean | null
          reminder_sent_at?: string | null
          rescheduled_from_id?: string | null
          sender_id: string
          service_id?: string | null
          service_type?: string | null
          source?: string | null
          starts_at?: string | null
          status?: string | null
          time_requested?: string | null
        }
        Update: {
          appointment_time?: string | null
          calendar_event_id?: string | null
          cancellation_reason?: string | null
          client_email?: string | null
          client_name?: string | null
          client_phone?: string | null
          confirmation_sent_at?: string | null
          created_at?: string | null
          date_requested?: string | null
          ends_at?: string | null
          ics_sequence?: number | null
          id?: string
          manage_token_expires_at?: string | null
          manage_token_hash?: string | null
          managed_by?: string | null
          metadata?: Json | null
          note?: string | null
          recipient_id?: string
          reminder_sent?: boolean | null
          reminder_sent_at?: string | null
          rescheduled_from_id?: string | null
          sender_id?: string
          service_id?: string | null
          service_type?: string | null
          source?: string | null
          starts_at?: string | null
          status?: string | null
          time_requested?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bookings_recipient_id_fkey"
            columns: ["recipient_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_rescheduled_from_id_fkey"
            columns: ["rescheduled_from_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
        ]
      }
      challenge_entries: {
        Row: {
          challenge_id: string
          id: string
          is_winner: boolean | null
          post_id: string
          submitted_at: string
          user_id: string
          votes_count: number | null
        }
        Insert: {
          challenge_id: string
          id?: string
          is_winner?: boolean | null
          post_id: string
          submitted_at?: string
          user_id: string
          votes_count?: number | null
        }
        Update: {
          challenge_id?: string
          id?: string
          is_winner?: boolean | null
          post_id?: string
          submitted_at?: string
          user_id?: string
          votes_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "challenge_entries_challenge_id_fkey"
            columns: ["challenge_id"]
            isOneToOne: false
            referencedRelation: "challenges"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "challenge_entries_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "community_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      challenge_votes: {
        Row: {
          created_at: string
          entry_id: string
          id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          entry_id: string
          id?: string
          user_id: string
        }
        Update: {
          created_at?: string
          entry_id?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "challenge_votes_entry_id_fkey"
            columns: ["entry_id"]
            isOneToOne: false
            referencedRelation: "challenge_entries"
            referencedColumns: ["id"]
          },
        ]
      }
      challenges: {
        Row: {
          category: string
          created_at: string
          created_by: string | null
          description: string
          difficulty: string
          emoji: string | null
          end_date: string
          id: string
          participant_count: number | null
          prize: string | null
          start_date: string
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          category: string
          created_at?: string
          created_by?: string | null
          description: string
          difficulty?: string
          emoji?: string | null
          end_date: string
          id?: string
          participant_count?: number | null
          prize?: string | null
          start_date?: string
          status?: string
          title: string
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          created_by?: string | null
          description?: string
          difficulty?: string
          emoji?: string | null
          end_date?: string
          id?: string
          participant_count?: number | null
          prize?: string | null
          start_date?: string
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      chat_logs: {
        Row: {
          id: string
          language: string | null
          message: string
          response: string
          timestamp: string
          user_id: string | null
          user_name: string | null
        }
        Insert: {
          id?: string
          language?: string | null
          message: string
          response: string
          timestamp?: string
          user_id?: string | null
          user_name?: string | null
        }
        Update: {
          id?: string
          language?: string | null
          message?: string
          response?: string
          timestamp?: string
          user_id?: string | null
          user_name?: string | null
        }
        Relationships: []
      }
      community_comment_mentions: {
        Row: {
          comment_id: string | null
          created_at: string | null
          id: string
          mentioned_by_user_id: string
          mentioned_user_id: string
        }
        Insert: {
          comment_id?: string | null
          created_at?: string | null
          id?: string
          mentioned_by_user_id: string
          mentioned_user_id: string
        }
        Update: {
          comment_id?: string | null
          created_at?: string | null
          id?: string
          mentioned_by_user_id?: string
          mentioned_user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "community_comment_mentions_comment_id_fkey"
            columns: ["comment_id"]
            isOneToOne: false
            referencedRelation: "community_post_comments"
            referencedColumns: ["id"]
          },
        ]
      }
      community_comments: {
        Row: {
          content: string
          created_at: string
          id: string
          story_id: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          story_id: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          story_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "community_comments_story_id_fkey"
            columns: ["story_id"]
            isOneToOne: false
            referencedRelation: "community_stories"
            referencedColumns: ["id"]
          },
        ]
      }
      community_event_participants: {
        Row: {
          event_id: string
          id: string
          registered_at: string | null
          status: string | null
          user_id: string
        }
        Insert: {
          event_id: string
          id?: string
          registered_at?: string | null
          status?: string | null
          user_id: string
        }
        Update: {
          event_id?: string
          id?: string
          registered_at?: string | null
          status?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "community_event_participants_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "community_events"
            referencedColumns: ["id"]
          },
        ]
      }
      community_events: {
        Row: {
          created_at: string | null
          description: string
          end_time: string | null
          event_type: string | null
          host_user_id: string
          id: string
          image_url: string | null
          is_free: boolean | null
          max_participants: number | null
          price: number | null
          start_time: string
          status: string | null
          tags: string[] | null
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description: string
          end_time?: string | null
          event_type?: string | null
          host_user_id: string
          id?: string
          image_url?: string | null
          is_free?: boolean | null
          max_participants?: number | null
          price?: number | null
          start_time: string
          status?: string | null
          tags?: string[] | null
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string
          end_time?: string | null
          event_type?: string | null
          host_user_id?: string
          id?: string
          image_url?: string | null
          is_free?: boolean | null
          max_participants?: number | null
          price?: number | null
          start_time?: string
          status?: string | null
          tags?: string[] | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      community_leaderboard: {
        Row: {
          comments_given: number | null
          created_at: string | null
          id: string
          level_name: string | null
          likes_received: number | null
          month_start: string
          points: number | null
          posts_count: number | null
          referrals_count: number | null
          updated_at: string | null
          user_id: string
          week_start: string
        }
        Insert: {
          comments_given?: number | null
          created_at?: string | null
          id?: string
          level_name?: string | null
          likes_received?: number | null
          month_start: string
          points?: number | null
          posts_count?: number | null
          referrals_count?: number | null
          updated_at?: string | null
          user_id: string
          week_start: string
        }
        Update: {
          comments_given?: number | null
          created_at?: string | null
          id?: string
          level_name?: string | null
          likes_received?: number | null
          month_start?: string
          points?: number | null
          posts_count?: number | null
          referrals_count?: number | null
          updated_at?: string | null
          user_id?: string
          week_start?: string
        }
        Relationships: []
      }
      community_notifications: {
        Row: {
          comment_id: string | null
          created_at: string | null
          id: string
          message: string
          metadata: Json | null
          post_id: string | null
          read: boolean | null
          triggered_by_user_id: string
          type: string
          user_id: string
        }
        Insert: {
          comment_id?: string | null
          created_at?: string | null
          id?: string
          message: string
          metadata?: Json | null
          post_id?: string | null
          read?: boolean | null
          triggered_by_user_id: string
          type: string
          user_id: string
        }
        Update: {
          comment_id?: string | null
          created_at?: string | null
          id?: string
          message?: string
          metadata?: Json | null
          post_id?: string | null
          read?: boolean | null
          triggered_by_user_id?: string
          type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "community_notifications_comment_id_fkey"
            columns: ["comment_id"]
            isOneToOne: false
            referencedRelation: "community_post_comments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "community_notifications_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "community_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      community_post_comments: {
        Row: {
          content: string
          created_at: string | null
          id: string
          likes_count: number | null
          parent_comment_id: string | null
          post_id: string
          reply_to_user_id: string | null
          thread_level: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          likes_count?: number | null
          parent_comment_id?: string | null
          post_id: string
          reply_to_user_id?: string | null
          thread_level?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          likes_count?: number | null
          parent_comment_id?: string | null
          post_id?: string
          reply_to_user_id?: string | null
          thread_level?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "community_post_comments_parent_comment_id_fkey"
            columns: ["parent_comment_id"]
            isOneToOne: false
            referencedRelation: "community_post_comments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "community_post_comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "community_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      community_post_likes: {
        Row: {
          created_at: string | null
          id: string
          post_id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          post_id: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          post_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "community_post_likes_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "community_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      community_post_mentions: {
        Row: {
          created_at: string | null
          id: string
          mentioned_by_user_id: string
          mentioned_user_id: string
          post_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          mentioned_by_user_id: string
          mentioned_user_id: string
          post_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          mentioned_by_user_id?: string
          mentioned_user_id?: string
          post_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "community_post_mentions_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "community_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      community_post_reactions: {
        Row: {
          created_at: string
          emoji: string
          id: string
          post_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          emoji: string
          id?: string
          post_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          emoji?: string
          id?: string
          post_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "community_post_reactions_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "community_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      community_posts: {
        Row: {
          category: string | null
          comments_count: number | null
          content: string
          created_at: string | null
          hashtags: string[] | null
          id: string
          image_urls: string[] | null
          is_featured: boolean | null
          is_trending: boolean | null
          likes_count: number | null
          location: string | null
          mentions: string[] | null
          post_type: string | null
          shares_count: number | null
          tags: string[] | null
          updated_at: string | null
          user_id: string
          video_url: string | null
          views_count: number | null
        }
        Insert: {
          category?: string | null
          comments_count?: number | null
          content: string
          created_at?: string | null
          hashtags?: string[] | null
          id?: string
          image_urls?: string[] | null
          is_featured?: boolean | null
          is_trending?: boolean | null
          likes_count?: number | null
          location?: string | null
          mentions?: string[] | null
          post_type?: string | null
          shares_count?: number | null
          tags?: string[] | null
          updated_at?: string | null
          user_id: string
          video_url?: string | null
          views_count?: number | null
        }
        Update: {
          category?: string | null
          comments_count?: number | null
          content?: string
          created_at?: string | null
          hashtags?: string[] | null
          id?: string
          image_urls?: string[] | null
          is_featured?: boolean | null
          is_trending?: boolean | null
          likes_count?: number | null
          location?: string | null
          mentions?: string[] | null
          post_type?: string | null
          shares_count?: number | null
          tags?: string[] | null
          updated_at?: string | null
          user_id?: string
          video_url?: string | null
          views_count?: number | null
        }
        Relationships: []
      }
      community_questions: {
        Row: {
          answer: string | null
          answered_at: string | null
          answered_by: string | null
          category: string | null
          created_at: string
          id: string
          question: string
          status: string
          updated_at: string
          upvotes: number | null
          user_id: string | null
        }
        Insert: {
          answer?: string | null
          answered_at?: string | null
          answered_by?: string | null
          category?: string | null
          created_at?: string
          id?: string
          question: string
          status?: string
          updated_at?: string
          upvotes?: number | null
          user_id?: string | null
        }
        Update: {
          answer?: string | null
          answered_at?: string | null
          answered_by?: string | null
          category?: string | null
          created_at?: string
          id?: string
          question?: string
          status?: string
          updated_at?: string
          upvotes?: number | null
          user_id?: string | null
        }
        Relationships: []
      }
      community_stories: {
        Row: {
          content: string
          created_at: string
          id: string
          image_url: string | null
          likes: number
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          image_url?: string | null
          likes?: number
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          image_url?: string | null
          likes?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_community_stories_profile"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
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
      content_moderation: {
        Row: {
          content_hash: string | null
          content_id: string
          content_type: string
          created_at: string | null
          id: string
          moderated_at: string | null
          moderated_by: string | null
          moderation_reason: string | null
          status: string | null
          user_id: string | null
        }
        Insert: {
          content_hash?: string | null
          content_id: string
          content_type: string
          created_at?: string | null
          id?: string
          moderated_at?: string | null
          moderated_by?: string | null
          moderation_reason?: string | null
          status?: string | null
          user_id?: string | null
        }
        Update: {
          content_hash?: string | null
          content_id?: string
          content_type?: string
          created_at?: string | null
          id?: string
          moderated_at?: string | null
          moderated_by?: string | null
          moderation_reason?: string | null
          status?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      content_reports: {
        Row: {
          admin_notes: string | null
          created_at: string
          id: string
          report_details: string | null
          report_reason: string
          reported_content_id: string
          reported_content_type: string
          reporter_id: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          status: string
        }
        Insert: {
          admin_notes?: string | null
          created_at?: string
          id?: string
          report_details?: string | null
          report_reason: string
          reported_content_id: string
          reported_content_type: string
          reporter_id?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string
        }
        Update: {
          admin_notes?: string | null
          created_at?: string
          id?: string
          report_details?: string | null
          report_reason?: string
          reported_content_id?: string
          reported_content_type?: string
          reporter_id?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string
        }
        Relationships: []
      }
      contest_entries: {
        Row: {
          contest_id: string | null
          entry_data: Json | null
          id: string
          submitted_at: string
          user_id: string | null
        }
        Insert: {
          contest_id?: string | null
          entry_data?: Json | null
          id?: string
          submitted_at?: string
          user_id?: string | null
        }
        Update: {
          contest_id?: string | null
          entry_data?: Json | null
          id?: string
          submitted_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "contest_entries_contest_id_fkey"
            columns: ["contest_id"]
            isOneToOne: false
            referencedRelation: "contests"
            referencedColumns: ["id"]
          },
        ]
      }
      contests: {
        Row: {
          created_at: string
          description: string | null
          end_date: string
          id: string
          max_entries: number | null
          start_date: string
          status: string
          title: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          end_date: string
          id?: string
          max_entries?: number | null
          start_date?: string
          status?: string
          title: string
        }
        Update: {
          created_at?: string
          description?: string | null
          end_date?: string
          id?: string
          max_entries?: number | null
          start_date?: string
          status?: string
          title?: string
        }
        Relationships: []
      }
      conversion_events: {
        Row: {
          created_at: string
          event_type: string
          id: string
          language: string
          metadata: Json | null
          source: string
          timestamp: string
          user_id: string
          user_type: string
        }
        Insert: {
          created_at?: string
          event_type: string
          id?: string
          language: string
          metadata?: Json | null
          source: string
          timestamp?: string
          user_id: string
          user_type: string
        }
        Update: {
          created_at?: string
          event_type?: string
          id?: string
          language?: string
          metadata?: Json | null
          source?: string
          timestamp?: string
          user_id?: string
          user_type?: string
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
      credit_transfers: {
        Row: {
          amount: number
          created_at: string
          id: string
          message: string | null
          recipient_id: string
          salon_id: string
          sender_id: string
          status: string
        }
        Insert: {
          amount: number
          created_at?: string
          id?: string
          message?: string | null
          recipient_id: string
          salon_id: string
          sender_id: string
          status?: string
        }
        Update: {
          amount?: number
          created_at?: string
          id?: string
          message?: string | null
          recipient_id?: string
          salon_id?: string
          sender_id?: string
          status?: string
        }
        Relationships: []
      }
      credits_ledger: {
        Row: {
          action_type: string
          admin_reason: string | null
          admin_user_id: string | null
          created_at: string | null
          credits_amount: number
          id: string
          ip_address: string | null
          metadata: Json | null
          reason: string
          referral_code: string | null
          user_agent: string | null
          user_id: string
        }
        Insert: {
          action_type: string
          admin_reason?: string | null
          admin_user_id?: string | null
          created_at?: string | null
          credits_amount: number
          id?: string
          ip_address?: string | null
          metadata?: Json | null
          reason: string
          referral_code?: string | null
          user_agent?: string | null
          user_id: string
        }
        Update: {
          action_type?: string
          admin_reason?: string | null
          admin_user_id?: string | null
          created_at?: string | null
          credits_amount?: number
          id?: string
          ip_address?: string | null
          metadata?: Json | null
          reason?: string
          referral_code?: string | null
          user_agent?: string | null
          user_id?: string
        }
        Relationships: []
      }
      cta_interactions: {
        Row: {
          created_at: string
          cta_type: string
          id: string
          metadata: Json | null
          story_id: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          cta_type: string
          id?: string
          metadata?: Json | null
          story_id?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          cta_type?: string
          id?: string
          metadata?: Json | null
          story_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "cta_interactions_story_id_fkey"
            columns: ["story_id"]
            isOneToOne: false
            referencedRelation: "community_stories"
            referencedColumns: ["id"]
          },
        ]
      }
      customer_credits: {
        Row: {
          action_type: string
          created_at: string | null
          description: string | null
          id: string
          transaction_type: string | null
          user_id: string
          value: number
        }
        Insert: {
          action_type: string
          created_at?: string | null
          description?: string | null
          id?: string
          transaction_type?: string | null
          user_id: string
          value: number
        }
        Update: {
          action_type?: string
          created_at?: string | null
          description?: string | null
          id?: string
          transaction_type?: string | null
          user_id?: string
          value?: number
        }
        Relationships: []
      }
      customer_stories: {
        Row: {
          booking_id: string | null
          content: string
          created_at: string | null
          id: string
          is_featured: boolean | null
          is_viral: boolean | null
          likes_count: number | null
          location: string | null
          media_urls: string[] | null
          provider_id: string | null
          published_at: string | null
          shares_count: number | null
          story_type: string | null
          tags: string[] | null
          title: string
          trending_score: number | null
          updated_at: string | null
          user_id: string
          views_count: number | null
        }
        Insert: {
          booking_id?: string | null
          content: string
          created_at?: string | null
          id?: string
          is_featured?: boolean | null
          is_viral?: boolean | null
          likes_count?: number | null
          location?: string | null
          media_urls?: string[] | null
          provider_id?: string | null
          published_at?: string | null
          shares_count?: number | null
          story_type?: string | null
          tags?: string[] | null
          title: string
          trending_score?: number | null
          updated_at?: string | null
          user_id: string
          views_count?: number | null
        }
        Update: {
          booking_id?: string | null
          content?: string
          created_at?: string | null
          id?: string
          is_featured?: boolean | null
          is_viral?: boolean | null
          likes_count?: number | null
          location?: string | null
          media_urls?: string[] | null
          provider_id?: string | null
          published_at?: string | null
          shares_count?: number | null
          story_type?: string | null
          tags?: string[] | null
          title?: string
          trending_score?: number | null
          updated_at?: string | null
          user_id?: string
          views_count?: number | null
        }
        Relationships: []
      }
      default_artist_data: {
        Row: {
          content: Json
          created_at: string | null
          data_type: string
          id: string
        }
        Insert: {
          content: Json
          created_at?: string | null
          data_type: string
          id?: string
        }
        Update: {
          content?: Json
          created_at?: string | null
          data_type?: string
          id?: string
        }
        Relationships: []
      }
      diamond_tier_waitlist: {
        Row: {
          additional_info: Json | null
          id: string
          notes: string | null
          post_type: string
          processed_at: string | null
          processed_by: string | null
          requested_at: string
          status: string
          user_id: string | null
        }
        Insert: {
          additional_info?: Json | null
          id?: string
          notes?: string | null
          post_type: string
          processed_at?: string | null
          processed_by?: string | null
          requested_at?: string
          status?: string
          user_id?: string | null
        }
        Update: {
          additional_info?: Json | null
          id?: string
          notes?: string | null
          post_type?: string
          processed_at?: string | null
          processed_by?: string | null
          requested_at?: string
          status?: string
          user_id?: string | null
        }
        Relationships: []
      }
      error_logs: {
        Row: {
          created_at: string | null
          error_message: string | null
          error_type: string
          id: string
          ip_address: unknown | null
          metadata: Json | null
          route: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          error_message?: string | null
          error_type: string
          id?: string
          ip_address?: unknown | null
          metadata?: Json | null
          route?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          error_message?: string | null
          error_type?: string
          id?: string
          ip_address?: unknown | null
          metadata?: Json | null
          route?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "error_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
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
      hubspot_counters: {
        Row: {
          contacts_created: number | null
          created_at: string | null
          date: string
          deals_created: number | null
          updated_at: string | null
        }
        Insert: {
          contacts_created?: number | null
          created_at?: string | null
          date: string
          deals_created?: number | null
          updated_at?: string | null
        }
        Update: {
          contacts_created?: number | null
          created_at?: string | null
          date?: string
          deals_created?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      hubspot_events: {
        Row: {
          attempts: number | null
          contact_id: string | null
          created_at: string | null
          deal_id: string | null
          email_domain: string | null
          email_hash: string | null
          id: string
          idempotency_key: string
          message: string | null
          payload: Json | null
          status: string
          type: string
        }
        Insert: {
          attempts?: number | null
          contact_id?: string | null
          created_at?: string | null
          deal_id?: string | null
          email_domain?: string | null
          email_hash?: string | null
          id?: string
          idempotency_key: string
          message?: string | null
          payload?: Json | null
          status: string
          type: string
        }
        Update: {
          attempts?: number | null
          contact_id?: string | null
          created_at?: string | null
          deal_id?: string | null
          email_domain?: string | null
          email_hash?: string | null
          id?: string
          idempotency_key?: string
          message?: string | null
          payload?: Json | null
          status?: string
          type?: string
        }
        Relationships: []
      }
      indexing_logs: {
        Row: {
          action: string
          created_at: string
          error: string | null
          id: string
          response: Json | null
          success: boolean
          url: string | null
        }
        Insert: {
          action: string
          created_at?: string
          error?: string | null
          id?: string
          response?: Json | null
          success?: boolean
          url?: string | null
        }
        Update: {
          action?: string
          created_at?: string
          error?: string | null
          id?: string
          response?: Json | null
          success?: boolean
          url?: string | null
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
        Relationships: []
      }
      jobs: {
        Row: {
          category: string
          compensation_details: string | null
          compensation_type: string | null
          contact_info: Json | null
          created_at: string
          description: string | null
          expires_at: string | null
          id: string
          image_url: string | null
          image_urls: string[] | null
          location: string | null
          metadata: Json | null
          payment_status: string | null
          photos: string[] | null
          pricing_tier: string | null
          requirements: string | null
          seed_tag: string | null
          status: string
          title: string
          updated_at: string
          user_id: string
          vietnamese_description: string | null
          vietnamese_title: string | null
        }
        Insert: {
          category: string
          compensation_details?: string | null
          compensation_type?: string | null
          contact_info?: Json | null
          created_at?: string
          description?: string | null
          expires_at?: string | null
          id?: string
          image_url?: string | null
          image_urls?: string[] | null
          location?: string | null
          metadata?: Json | null
          payment_status?: string | null
          photos?: string[] | null
          pricing_tier?: string | null
          requirements?: string | null
          seed_tag?: string | null
          status?: string
          title: string
          updated_at?: string
          user_id: string
          vietnamese_description?: string | null
          vietnamese_title?: string | null
        }
        Update: {
          category?: string
          compensation_details?: string | null
          compensation_type?: string | null
          contact_info?: Json | null
          created_at?: string
          description?: string | null
          expires_at?: string | null
          id?: string
          image_url?: string | null
          image_urls?: string[] | null
          location?: string | null
          metadata?: Json | null
          payment_status?: string | null
          photos?: string[] | null
          pricing_tier?: string | null
          requirements?: string | null
          seed_tag?: string | null
          status?: string
          title?: string
          updated_at?: string
          user_id?: string
          vietnamese_description?: string | null
          vietnamese_title?: string | null
        }
        Relationships: []
      }
      listing_validation_logs: {
        Row: {
          created_at: string | null
          error_reason: string | null
          id: string
          ip_address: string | null
          listing_id: string
          listing_type: string
          referrer: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          error_reason?: string | null
          id?: string
          ip_address?: string | null
          listing_id: string
          listing_type: string
          referrer?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          error_reason?: string | null
          id?: string
          ip_address?: string | null
          listing_id?: string
          listing_type?: string
          referrer?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
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
      messages: {
        Row: {
          created_at: string
          id: string
          message_body: string
          message_type: string
          read: boolean | null
          recipient_id: string
          salon_id: string
          sender_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          message_body: string
          message_type: string
          read?: boolean | null
          recipient_id: string
          salon_id: string
          sender_id: string
        }
        Update: {
          created_at?: string
          id?: string
          message_body?: string
          message_type?: string
          read?: boolean | null
          recipient_id?: string
          salon_id?: string
          sender_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_recipient_id_fkey"
            columns: ["recipient_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_salon_id_fkey"
            columns: ["salon_id"]
            isOneToOne: false
            referencedRelation: "salons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
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
        Relationships: []
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
      payment_logs: {
        Row: {
          auto_renew_enabled: boolean | null
          created_at: string
          expires_at: string
          id: string
          listing_id: string | null
          payment_date: string
          payment_status: string
          plan_type: string
          pricing_tier: string | null
          stripe_payment_id: string | null
          user_id: string
        }
        Insert: {
          auto_renew_enabled?: boolean | null
          created_at?: string
          expires_at?: string
          id?: string
          listing_id?: string | null
          payment_date?: string
          payment_status?: string
          plan_type: string
          pricing_tier?: string | null
          stripe_payment_id?: string | null
          user_id: string
        }
        Update: {
          auto_renew_enabled?: boolean | null
          created_at?: string
          expires_at?: string
          id?: string
          listing_id?: string | null
          payment_date?: string
          payment_status?: string
          plan_type?: string
          pricing_tier?: string | null
          stripe_payment_id?: string | null
          user_id?: string
        }
        Relationships: []
      }
      payments: {
        Row: {
          amount: number
          created_at: string
          id: string
          metadata: Json | null
          payment_type: string
          status: string
          stripe_session_id: string | null
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          id?: string
          metadata?: Json | null
          payment_type: string
          status?: string
          stripe_session_id?: string | null
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          id?: string
          metadata?: Json | null
          payment_type?: string
          status?: string
          stripe_session_id?: string | null
          user_id?: string
        }
        Relationships: []
      }
      pending_salons: {
        Row: {
          address: string | null
          asking_price: number
          business_type: string | null
          city: string
          contact_email: string | null
          contact_facebook: string | null
          contact_name: string | null
          contact_notes: string | null
          contact_phone: string | null
          contact_zalo: string | null
          created_at: string | null
          description_combined: string
          english_description: string | null
          equipment_included: boolean | null
          established_year: string | null
          featured_addon: boolean | null
          has_dining_room: boolean | null
          has_housing: boolean | null
          has_laundry: boolean | null
          has_parking: boolean | null
          has_wax_room: boolean | null
          help_with_transition: boolean | null
          hide_exact_address: boolean | null
          id: string
          images: string[] | null
          lease_transferable: boolean | null
          monthly_profit: string | null
          monthly_rent: number | null
          monthly_revenue: string | null
          neighborhood: string | null
          number_of_chairs: string | null
          number_of_staff: string | null
          number_of_tables: string | null
          other_notes: string | null
          reason_for_selling: string | null
          salon_name: string
          selected_pricing_tier: string
          seller_financing: boolean | null
          square_feet: string | null
          state: string
          status: string | null
          stripe_session_id: string | null
          updated_at: string | null
          user_id: string
          vietnamese_description: string | null
          virtual_tour_url: string | null
          will_train: boolean | null
          zip_code: string | null
        }
        Insert: {
          address?: string | null
          asking_price: number
          business_type?: string | null
          city: string
          contact_email?: string | null
          contact_facebook?: string | null
          contact_name?: string | null
          contact_notes?: string | null
          contact_phone?: string | null
          contact_zalo?: string | null
          created_at?: string | null
          description_combined: string
          english_description?: string | null
          equipment_included?: boolean | null
          established_year?: string | null
          featured_addon?: boolean | null
          has_dining_room?: boolean | null
          has_housing?: boolean | null
          has_laundry?: boolean | null
          has_parking?: boolean | null
          has_wax_room?: boolean | null
          help_with_transition?: boolean | null
          hide_exact_address?: boolean | null
          id?: string
          images?: string[] | null
          lease_transferable?: boolean | null
          monthly_profit?: string | null
          monthly_rent?: number | null
          monthly_revenue?: string | null
          neighborhood?: string | null
          number_of_chairs?: string | null
          number_of_staff?: string | null
          number_of_tables?: string | null
          other_notes?: string | null
          reason_for_selling?: string | null
          salon_name: string
          selected_pricing_tier: string
          seller_financing?: boolean | null
          square_feet?: string | null
          state: string
          status?: string | null
          stripe_session_id?: string | null
          updated_at?: string | null
          user_id: string
          vietnamese_description?: string | null
          virtual_tour_url?: string | null
          will_train?: boolean | null
          zip_code?: string | null
        }
        Update: {
          address?: string | null
          asking_price?: number
          business_type?: string | null
          city?: string
          contact_email?: string | null
          contact_facebook?: string | null
          contact_name?: string | null
          contact_notes?: string | null
          contact_phone?: string | null
          contact_zalo?: string | null
          created_at?: string | null
          description_combined?: string
          english_description?: string | null
          equipment_included?: boolean | null
          established_year?: string | null
          featured_addon?: boolean | null
          has_dining_room?: boolean | null
          has_housing?: boolean | null
          has_laundry?: boolean | null
          has_parking?: boolean | null
          has_wax_room?: boolean | null
          help_with_transition?: boolean | null
          hide_exact_address?: boolean | null
          id?: string
          images?: string[] | null
          lease_transferable?: boolean | null
          monthly_profit?: string | null
          monthly_rent?: number | null
          monthly_revenue?: string | null
          neighborhood?: string | null
          number_of_chairs?: string | null
          number_of_staff?: string | null
          number_of_tables?: string | null
          other_notes?: string | null
          reason_for_selling?: string | null
          salon_name?: string
          selected_pricing_tier?: string
          seller_financing?: boolean | null
          square_feet?: string | null
          state?: string
          status?: string | null
          stripe_session_id?: string | null
          updated_at?: string | null
          user_id?: string
          vietnamese_description?: string | null
          virtual_tour_url?: string | null
          will_train?: boolean | null
          zip_code?: string | null
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
      profiles: {
        Row: {
          accepts_bookings: boolean | null
          address: string | null
          available_for_hire: boolean | null
          avatar_url: string | null
          badges: Json | null
          bio: string | null
          booking_url: string | null
          boosted_until: string | null
          community_points: number | null
          company_name: string | null
          completed_profile_tasks: string[] | null
          contact_link: string | null
          created_at: string | null
          creator_status: string | null
          credits: number | null
          current_streak: number | null
          custom_role: string | null
          email: string | null
          full_name: string
          gallery: string[] | null
          id: string
          instagram: string | null
          invited: boolean | null
          just_moved: boolean | null
          location: string | null
          looking_for_work: boolean | null
          manager_for_salon_id: string | null
          moved_date: string | null
          moved_to_city: string | null
          moved_to_state: string | null
          phone: string | null
          portfolio_urls: string[] | null
          preferences: string[] | null
          preferred_language: string | null
          professional_name: string | null
          profile_views: number | null
          referral_code: string | null
          role: string | null
          salon_name: string | null
          services: string[] | null
          specialty: string | null
          total_likes_received: number | null
          total_posts: number | null
          total_shares: number | null
          updated_at: string | null
          website: string | null
          years_experience: number | null
        }
        Insert: {
          accepts_bookings?: boolean | null
          address?: string | null
          available_for_hire?: boolean | null
          avatar_url?: string | null
          badges?: Json | null
          bio?: string | null
          booking_url?: string | null
          boosted_until?: string | null
          community_points?: number | null
          company_name?: string | null
          completed_profile_tasks?: string[] | null
          contact_link?: string | null
          created_at?: string | null
          creator_status?: string | null
          credits?: number | null
          current_streak?: number | null
          custom_role?: string | null
          email?: string | null
          full_name: string
          gallery?: string[] | null
          id: string
          instagram?: string | null
          invited?: boolean | null
          just_moved?: boolean | null
          location?: string | null
          looking_for_work?: boolean | null
          manager_for_salon_id?: string | null
          moved_date?: string | null
          moved_to_city?: string | null
          moved_to_state?: string | null
          phone?: string | null
          portfolio_urls?: string[] | null
          preferences?: string[] | null
          preferred_language?: string | null
          professional_name?: string | null
          profile_views?: number | null
          referral_code?: string | null
          role?: string | null
          salon_name?: string | null
          services?: string[] | null
          specialty?: string | null
          total_likes_received?: number | null
          total_posts?: number | null
          total_shares?: number | null
          updated_at?: string | null
          website?: string | null
          years_experience?: number | null
        }
        Update: {
          accepts_bookings?: boolean | null
          address?: string | null
          available_for_hire?: boolean | null
          avatar_url?: string | null
          badges?: Json | null
          bio?: string | null
          booking_url?: string | null
          boosted_until?: string | null
          community_points?: number | null
          company_name?: string | null
          completed_profile_tasks?: string[] | null
          contact_link?: string | null
          created_at?: string | null
          creator_status?: string | null
          credits?: number | null
          current_streak?: number | null
          custom_role?: string | null
          email?: string | null
          full_name?: string
          gallery?: string[] | null
          id?: string
          instagram?: string | null
          invited?: boolean | null
          just_moved?: boolean | null
          location?: string | null
          looking_for_work?: boolean | null
          manager_for_salon_id?: string | null
          moved_date?: string | null
          moved_to_city?: string | null
          moved_to_state?: string | null
          phone?: string | null
          portfolio_urls?: string[] | null
          preferences?: string[] | null
          preferred_language?: string | null
          professional_name?: string | null
          profile_views?: number | null
          referral_code?: string | null
          role?: string | null
          salon_name?: string | null
          services?: string[] | null
          specialty?: string | null
          total_likes_received?: number | null
          total_posts?: number | null
          total_shares?: number | null
          updated_at?: string | null
          website?: string | null
          years_experience?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_profiles_manager_for_salon"
            columns: ["manager_for_salon_id"]
            isOneToOne: false
            referencedRelation: "salons"
            referencedColumns: ["id"]
          },
        ]
      }
      promo_code_usages: {
        Row: {
          id: string
          promo_code_id: string
          used_at: string
          user_id: string
        }
        Insert: {
          id?: string
          promo_code_id: string
          used_at?: string
          user_id: string
        }
        Update: {
          id?: string
          promo_code_id?: string
          used_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "promo_code_usages_promo_code_id_fkey"
            columns: ["promo_code_id"]
            isOneToOne: false
            referencedRelation: "promo_codes"
            referencedColumns: ["id"]
          },
        ]
      }
      promo_codes: {
        Row: {
          code: string
          created_at: string
          expires_at: string | null
          id: string
          is_active: boolean
          max_uses: number
          used_count: number
          value: number
        }
        Insert: {
          code: string
          created_at?: string
          expires_at?: string | null
          id?: string
          is_active?: boolean
          max_uses?: number
          used_count?: number
          value?: number
        }
        Update: {
          code?: string
          created_at?: string
          expires_at?: string | null
          id?: string
          is_active?: boolean
          max_uses?: number
          used_count?: number
          value?: number
        }
        Relationships: []
      }
      provider_search_index: {
        Row: {
          availability_score: number | null
          id: string
          last_indexed: string | null
          location_data: Json | null
          popularity_score: number | null
          provider_id: string
          quality_score: number | null
          search_vector: unknown | null
          services: Json | null
          specialties: string[] | null
          trending_score: number | null
        }
        Insert: {
          availability_score?: number | null
          id?: string
          last_indexed?: string | null
          location_data?: Json | null
          popularity_score?: number | null
          provider_id: string
          quality_score?: number | null
          search_vector?: unknown | null
          services?: Json | null
          specialties?: string[] | null
          trending_score?: number | null
        }
        Update: {
          availability_score?: number | null
          id?: string
          last_indexed?: string | null
          location_data?: Json | null
          popularity_score?: number | null
          provider_id?: string
          quality_score?: number | null
          search_vector?: unknown | null
          services?: Json | null
          specialties?: string[] | null
          trending_score?: number | null
        }
        Relationships: []
      }
      provider_status: {
        Row: {
          available_until: string | null
          created_at: string | null
          current_location: Json | null
          id: string
          instant_book_available: boolean | null
          last_seen: string | null
          provider_id: string
          status: string
          updated_at: string | null
        }
        Insert: {
          available_until?: string | null
          created_at?: string | null
          current_location?: Json | null
          id?: string
          instant_book_available?: boolean | null
          last_seen?: string | null
          provider_id: string
          status?: string
          updated_at?: string | null
        }
        Update: {
          available_until?: string | null
          created_at?: string | null
          current_location?: Json | null
          id?: string
          instant_book_available?: boolean | null
          last_seen?: string | null
          provider_id?: string
          status?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      rate_limits: {
        Row: {
          created_at: string | null
          endpoint: string
          id: string
          ip_address: unknown | null
          requests_count: number | null
          updated_at: string | null
          user_id: string | null
          window_start: string | null
        }
        Insert: {
          created_at?: string | null
          endpoint: string
          id?: string
          ip_address?: unknown | null
          requests_count?: number | null
          updated_at?: string | null
          user_id?: string | null
          window_start?: string | null
        }
        Update: {
          created_at?: string | null
          endpoint?: string
          id?: string
          ip_address?: unknown | null
          requests_count?: number | null
          updated_at?: string | null
          user_id?: string | null
          window_start?: string | null
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
            foreignKeyName: "reviews_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: true
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
        ]
      }
      salon_bookings: {
        Row: {
          artist_id: string | null
          booking_date: string
          booking_time: string
          client_email: string | null
          client_name: string
          client_phone: string | null
          created_at: string | null
          duration_minutes: number | null
          id: string
          notes: string | null
          salon_id: string
          service_name: string
          status: string | null
          updated_at: string | null
        }
        Insert: {
          artist_id?: string | null
          booking_date: string
          booking_time: string
          client_email?: string | null
          client_name: string
          client_phone?: string | null
          created_at?: string | null
          duration_minutes?: number | null
          id?: string
          notes?: string | null
          salon_id: string
          service_name: string
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          artist_id?: string | null
          booking_date?: string
          booking_time?: string
          client_email?: string | null
          client_name?: string
          client_phone?: string | null
          created_at?: string | null
          duration_minutes?: number | null
          id?: string
          notes?: string | null
          salon_id?: string
          service_name?: string
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      salon_credits: {
        Row: {
          amount: number
          created_at: string | null
          description: string | null
          id: string
          metadata: Json | null
          salon_id: string
          source: string
          transaction_type: string
        }
        Insert: {
          amount: number
          created_at?: string | null
          description?: string | null
          id?: string
          metadata?: Json | null
          salon_id: string
          source: string
          transaction_type: string
        }
        Update: {
          amount?: number
          created_at?: string | null
          description?: string | null
          id?: string
          metadata?: Json | null
          salon_id?: string
          source?: string
          transaction_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "salon_credits_salon_id_fkey"
            columns: ["salon_id"]
            isOneToOne: false
            referencedRelation: "salons"
            referencedColumns: ["id"]
          },
        ]
      }
      salon_listings: {
        Row: {
          address: string | null
          boost_level: number | null
          business_hours: Json | null
          contact_info: Json | null
          created_at: string | null
          description: string | null
          email: string | null
          expires_at: string | null
          featured_until: string | null
          id: string
          instagram: string | null
          is_featured: boolean | null
          location: string | null
          phone: string | null
          pricing_tier: string | null
          salon_name: string
          services: Json | null
          specialties: string[] | null
          status: string | null
          updated_at: string | null
          user_id: string
          website: string | null
        }
        Insert: {
          address?: string | null
          boost_level?: number | null
          business_hours?: Json | null
          contact_info?: Json | null
          created_at?: string | null
          description?: string | null
          email?: string | null
          expires_at?: string | null
          featured_until?: string | null
          id?: string
          instagram?: string | null
          is_featured?: boolean | null
          location?: string | null
          phone?: string | null
          pricing_tier?: string | null
          salon_name: string
          services?: Json | null
          specialties?: string[] | null
          status?: string | null
          updated_at?: string | null
          user_id: string
          website?: string | null
        }
        Update: {
          address?: string | null
          boost_level?: number | null
          business_hours?: Json | null
          contact_info?: Json | null
          created_at?: string | null
          description?: string | null
          email?: string | null
          expires_at?: string | null
          featured_until?: string | null
          id?: string
          instagram?: string | null
          is_featured?: boolean | null
          location?: string | null
          phone?: string | null
          pricing_tier?: string | null
          salon_name?: string
          services?: Json | null
          specialties?: string[] | null
          status?: string | null
          updated_at?: string | null
          user_id?: string
          website?: string | null
        }
        Relationships: []
      }
      salon_offers: {
        Row: {
          created_at: string | null
          current_redemptions: number | null
          description: string
          discount_amount: number | null
          discount_percent: number | null
          end_date: string
          id: string
          is_active: boolean | null
          max_redemptions: number | null
          salon_id: string
          shares_count: number | null
          start_date: string | null
          title: string
          updated_at: string | null
          views_count: number | null
        }
        Insert: {
          created_at?: string | null
          current_redemptions?: number | null
          description: string
          discount_amount?: number | null
          discount_percent?: number | null
          end_date: string
          id?: string
          is_active?: boolean | null
          max_redemptions?: number | null
          salon_id: string
          shares_count?: number | null
          start_date?: string | null
          title: string
          updated_at?: string | null
          views_count?: number | null
        }
        Update: {
          created_at?: string | null
          current_redemptions?: number | null
          description?: string
          discount_amount?: number | null
          discount_percent?: number | null
          end_date?: string
          id?: string
          is_active?: boolean | null
          max_redemptions?: number | null
          salon_id?: string
          shares_count?: number | null
          start_date?: string | null
          title?: string
          updated_at?: string | null
          views_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "salon_offers_salon_id_fkey"
            columns: ["salon_id"]
            isOneToOne: false
            referencedRelation: "salons"
            referencedColumns: ["id"]
          },
        ]
      }
      salon_photos: {
        Row: {
          caption: string | null
          created_at: string | null
          id: string
          is_primary: boolean | null
          order_number: number | null
          photo_url: string
          salon_id: string | null
          title: string | null
          updated_at: string | null
        }
        Insert: {
          caption?: string | null
          created_at?: string | null
          id?: string
          is_primary?: boolean | null
          order_number?: number | null
          photo_url: string
          salon_id?: string | null
          title?: string | null
          updated_at?: string | null
        }
        Update: {
          caption?: string | null
          created_at?: string | null
          id?: string
          is_primary?: boolean | null
          order_number?: number | null
          photo_url?: string
          salon_id?: string | null
          title?: string | null
          updated_at?: string | null
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
      salon_promotions: {
        Row: {
          created_at: string
          created_by_id: string
          credits_spent: number
          expires_at: string | null
          id: string
          message: string | null
          promotion_type: string
          salon_id: string
          status: string
          target_count: number | null
        }
        Insert: {
          created_at?: string
          created_by_id: string
          credits_spent: number
          expires_at?: string | null
          id?: string
          message?: string | null
          promotion_type: string
          salon_id: string
          status?: string
          target_count?: number | null
        }
        Update: {
          created_at?: string
          created_by_id?: string
          credits_spent?: number
          expires_at?: string | null
          id?: string
          message?: string | null
          promotion_type?: string
          salon_id?: string
          status?: string
          target_count?: number | null
        }
        Relationships: []
      }
      salon_reviews: {
        Row: {
          booking_id: string | null
          created_at: string | null
          customer_id: string
          flagged: boolean | null
          flagged_reason: string | null
          id: string
          rating: number
          responded_at: string | null
          response_text: string | null
          review_text: string | null
          salon_id: string
          status: string | null
        }
        Insert: {
          booking_id?: string | null
          created_at?: string | null
          customer_id: string
          flagged?: boolean | null
          flagged_reason?: string | null
          id?: string
          rating: number
          responded_at?: string | null
          response_text?: string | null
          review_text?: string | null
          salon_id: string
          status?: string | null
        }
        Update: {
          booking_id?: string | null
          created_at?: string | null
          customer_id?: string
          flagged?: boolean | null
          flagged_reason?: string | null
          id?: string
          rating?: number
          responded_at?: string | null
          response_text?: string | null
          review_text?: string | null
          salon_id?: string
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "salon_reviews_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "salon_reviews_salon_id_fkey"
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
          address: string | null
          asking_price: number
          business_type: string | null
          city: string
          contact_email: string | null
          contact_facebook: string | null
          contact_name: string | null
          contact_notes: string | null
          contact_phone: string | null
          contact_zalo: string | null
          created_at: string
          description_combined: string
          english_description: string | null
          equipment_included: boolean | null
          established_year: string | null
          expires_at: string | null
          featured_addon: boolean | null
          features: string[] | null
          gross_revenue: string | null
          has_dining_room: boolean | null
          has_housing: boolean | null
          has_laundry: boolean | null
          has_parking: boolean | null
          has_wax_room: boolean | null
          help_with_transition: boolean | null
          hide_exact_address: boolean | null
          id: string
          images: string[] | null
          is_featured: boolean | null
          is_private: boolean | null
          is_urgent: boolean | null
          lease_transferable: boolean | null
          logo_url: string | null
          monthly_profit: string | null
          monthly_rent: number | null
          monthly_revenue: string | null
          neighborhood: string | null
          net_profit: string | null
          number_of_chairs: string | null
          number_of_staff: string | null
          number_of_tables: string | null
          other_notes: string | null
          payment_status: string | null
          reason_for_selling: string | null
          salon_name: string
          seed_tag: string | null
          selected_pricing_tier: string | null
          seller_financing: boolean | null
          size: string | null
          square_feet: string | null
          state: string
          status: string
          updated_at: string
          user_id: string
          vietnamese_description: string | null
          virtual_tour_url: string | null
          will_train: boolean | null
          yearly_revenue: string | null
          zip_code: string | null
        }
        Insert: {
          address?: string | null
          asking_price: number
          business_type?: string | null
          city: string
          contact_email?: string | null
          contact_facebook?: string | null
          contact_name?: string | null
          contact_notes?: string | null
          contact_phone?: string | null
          contact_zalo?: string | null
          created_at?: string
          description_combined: string
          english_description?: string | null
          equipment_included?: boolean | null
          established_year?: string | null
          expires_at?: string | null
          featured_addon?: boolean | null
          features?: string[] | null
          gross_revenue?: string | null
          has_dining_room?: boolean | null
          has_housing?: boolean | null
          has_laundry?: boolean | null
          has_parking?: boolean | null
          has_wax_room?: boolean | null
          help_with_transition?: boolean | null
          hide_exact_address?: boolean | null
          id?: string
          images?: string[] | null
          is_featured?: boolean | null
          is_private?: boolean | null
          is_urgent?: boolean | null
          lease_transferable?: boolean | null
          logo_url?: string | null
          monthly_profit?: string | null
          monthly_rent?: number | null
          monthly_revenue?: string | null
          neighborhood?: string | null
          net_profit?: string | null
          number_of_chairs?: string | null
          number_of_staff?: string | null
          number_of_tables?: string | null
          other_notes?: string | null
          payment_status?: string | null
          reason_for_selling?: string | null
          salon_name: string
          seed_tag?: string | null
          selected_pricing_tier?: string | null
          seller_financing?: boolean | null
          size?: string | null
          square_feet?: string | null
          state: string
          status?: string
          updated_at?: string
          user_id: string
          vietnamese_description?: string | null
          virtual_tour_url?: string | null
          will_train?: boolean | null
          yearly_revenue?: string | null
          zip_code?: string | null
        }
        Update: {
          address?: string | null
          asking_price?: number
          business_type?: string | null
          city?: string
          contact_email?: string | null
          contact_facebook?: string | null
          contact_name?: string | null
          contact_notes?: string | null
          contact_phone?: string | null
          contact_zalo?: string | null
          created_at?: string
          description_combined?: string
          english_description?: string | null
          equipment_included?: boolean | null
          established_year?: string | null
          expires_at?: string | null
          featured_addon?: boolean | null
          features?: string[] | null
          gross_revenue?: string | null
          has_dining_room?: boolean | null
          has_housing?: boolean | null
          has_laundry?: boolean | null
          has_parking?: boolean | null
          has_wax_room?: boolean | null
          help_with_transition?: boolean | null
          hide_exact_address?: boolean | null
          id?: string
          images?: string[] | null
          is_featured?: boolean | null
          is_private?: boolean | null
          is_urgent?: boolean | null
          lease_transferable?: boolean | null
          logo_url?: string | null
          monthly_profit?: string | null
          monthly_rent?: number | null
          monthly_revenue?: string | null
          neighborhood?: string | null
          net_profit?: string | null
          number_of_chairs?: string | null
          number_of_staff?: string | null
          number_of_tables?: string | null
          other_notes?: string | null
          payment_status?: string | null
          reason_for_selling?: string | null
          salon_name?: string
          seed_tag?: string | null
          selected_pricing_tier?: string | null
          seller_financing?: boolean | null
          size?: string | null
          square_feet?: string | null
          state?: string
          status?: string
          updated_at?: string
          user_id?: string
          vietnamese_description?: string | null
          virtual_tour_url?: string | null
          will_train?: boolean | null
          yearly_revenue?: string | null
          zip_code?: string | null
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
        ]
      }
      salon_staff: {
        Row: {
          accepted_at: string | null
          avatar_url: string | null
          commission_rate: number | null
          created_at: string
          email: string
          full_name: string
          id: string
          invitation_email: string | null
          invitation_sent_at: string | null
          invitation_token: string | null
          invited_by: string | null
          job_title: string | null
          profile_photo_url: string | null
          role: string
          salon_id: string
          specialty: string | null
          status: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          accepted_at?: string | null
          avatar_url?: string | null
          commission_rate?: number | null
          created_at?: string
          email: string
          full_name: string
          id?: string
          invitation_email?: string | null
          invitation_sent_at?: string | null
          invitation_token?: string | null
          invited_by?: string | null
          job_title?: string | null
          profile_photo_url?: string | null
          role: string
          salon_id: string
          specialty?: string | null
          status?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          accepted_at?: string | null
          avatar_url?: string | null
          commission_rate?: number | null
          created_at?: string
          email?: string
          full_name?: string
          id?: string
          invitation_email?: string | null
          invitation_sent_at?: string | null
          invitation_token?: string | null
          invited_by?: string | null
          job_title?: string | null
          profile_photo_url?: string | null
          role?: string
          salon_id?: string
          specialty?: string | null
          status?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      salon_team_members: {
        Row: {
          created_at: string | null
          email: string
          id: string
          joined_date: string | null
          name: string
          role: string
          salon_id: string
          specialties: string[] | null
          status: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          joined_date?: string | null
          name: string
          role: string
          salon_id: string
          specialties?: string[] | null
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          joined_date?: string | null
          name?: string
          role?: string
          salon_id?: string
          specialties?: string[] | null
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      salon_team_messages: {
        Row: {
          content: string
          created_at: string
          id: string
          is_announcement: boolean
          salon_id: string
          sender_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          is_announcement?: boolean
          salon_id: string
          sender_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          is_announcement?: boolean
          salon_id?: string
          sender_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "salon_team_messages_salon_id_fkey"
            columns: ["salon_id"]
            isOneToOne: false
            referencedRelation: "salons"
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
          address: string | null
          created_at: string | null
          id: string
          instagram: string | null
          location: string | null
          logo_url: string | null
          owner_id: string | null
          phone: string | null
          salon_name: string | null
          services: Json | null
          updated_at: string | null
          website: string | null
        }
        Insert: {
          about?: string | null
          address?: string | null
          created_at?: string | null
          id: string
          instagram?: string | null
          location?: string | null
          logo_url?: string | null
          owner_id?: string | null
          phone?: string | null
          salon_name?: string | null
          services?: Json | null
          updated_at?: string | null
          website?: string | null
        }
        Update: {
          about?: string | null
          address?: string | null
          created_at?: string | null
          id?: string
          instagram?: string | null
          location?: string | null
          logo_url?: string | null
          owner_id?: string | null
          phone?: string | null
          salon_name?: string | null
          services?: Json | null
          updated_at?: string | null
          website?: string | null
        }
        Relationships: []
      }
      saved_articles: {
        Row: {
          article_slug: string
          article_title: string
          article_url: string
          created_at: string
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          article_slug: string
          article_title: string
          article_url: string
          created_at?: string
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          article_slug?: string
          article_title?: string
          article_url?: string
          created_at?: string
          id?: string
          updated_at?: string
          user_id?: string
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
      security_audit_log: {
        Row: {
          created_at: string | null
          id: number
          ip_address: string | null
          new_data: Json | null
          old_data: Json | null
          operation: string
          table_name: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          ip_address?: string | null
          new_data?: Json | null
          old_data?: Json | null
          operation: string
          table_name: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          ip_address?: string | null
          new_data?: Json | null
          old_data?: Json | null
          operation?: string
          table_name?: string
          user_id?: string | null
        }
        Relationships: []
      }
      seo_cities: {
        Row: {
          city_name: string
          created_at: string | null
          id: string
          indexing_status: string | null
          is_active: boolean | null
          last_indexed_at: string | null
          metadata: Json | null
          metro_area: string | null
          population: number | null
          priority: number | null
          slug: string
          state: string
          state_code: string
          updated_at: string | null
        }
        Insert: {
          city_name: string
          created_at?: string | null
          id?: string
          indexing_status?: string | null
          is_active?: boolean | null
          last_indexed_at?: string | null
          metadata?: Json | null
          metro_area?: string | null
          population?: number | null
          priority?: number | null
          slug: string
          state: string
          state_code: string
          updated_at?: string | null
        }
        Update: {
          city_name?: string
          created_at?: string | null
          id?: string
          indexing_status?: string | null
          is_active?: boolean | null
          last_indexed_at?: string | null
          metadata?: Json | null
          metro_area?: string | null
          population?: number | null
          priority?: number | null
          slug?: string
          state?: string
          state_code?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      seo_indexing_logs: {
        Row: {
          cities_failed: number | null
          cities_processed: number | null
          cities_succeeded: number | null
          completed_at: string | null
          errors: Json | null
          id: string
          run_date: string
          started_at: string | null
          status: string | null
        }
        Insert: {
          cities_failed?: number | null
          cities_processed?: number | null
          cities_succeeded?: number | null
          completed_at?: string | null
          errors?: Json | null
          id?: string
          run_date?: string
          started_at?: string | null
          status?: string | null
        }
        Update: {
          cities_failed?: number | null
          cities_processed?: number | null
          cities_succeeded?: number | null
          completed_at?: string | null
          errors?: Json | null
          id?: string
          run_date?: string
          started_at?: string | null
          status?: string | null
        }
        Relationships: []
      }
      seo_reindex_queue: {
        Row: {
          created_at: string
          hash: string | null
          lastmod: string
          status: string
          tries: number
          type: string
          updated_at: string
          url: string
        }
        Insert: {
          created_at?: string
          hash?: string | null
          lastmod?: string
          status?: string
          tries?: number
          type: string
          updated_at?: string
          url: string
        }
        Update: {
          created_at?: string
          hash?: string | null
          lastmod?: string
          status?: string
          tries?: number
          type?: string
          updated_at?: string
          url?: string
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
      shares_tracking: {
        Row: {
          created_at: string
          id: string
          platform: string | null
          points_awarded: number | null
          shared_content_id: string | null
          shared_content_type: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          platform?: string | null
          points_awarded?: number | null
          shared_content_id?: string | null
          shared_content_type: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          platform?: string | null
          points_awarded?: number | null
          shared_content_id?: string | null
          shared_content_type?: string
          user_id?: string
        }
        Relationships: []
      }
      smart_reminders: {
        Row: {
          ai_optimized: boolean | null
          clicked_at: string | null
          conversion_tracking: Json | null
          created_at: string | null
          delivery_method: string[] | null
          id: string
          message: string
          personalization_data: Json | null
          reminder_type: string
          scheduled_for: string
          sent_at: string | null
          status: string | null
          target_id: string | null
          title: string
          user_id: string
        }
        Insert: {
          ai_optimized?: boolean | null
          clicked_at?: string | null
          conversion_tracking?: Json | null
          created_at?: string | null
          delivery_method?: string[] | null
          id?: string
          message: string
          personalization_data?: Json | null
          reminder_type: string
          scheduled_for: string
          sent_at?: string | null
          status?: string | null
          target_id?: string | null
          title: string
          user_id: string
        }
        Update: {
          ai_optimized?: boolean | null
          clicked_at?: string | null
          conversion_tracking?: Json | null
          created_at?: string | null
          delivery_method?: string[] | null
          id?: string
          message?: string
          personalization_data?: Json | null
          reminder_type?: string
          scheduled_for?: string
          sent_at?: string | null
          status?: string | null
          target_id?: string | null
          title?: string
          user_id?: string
        }
        Relationships: []
      }
      social_shares: {
        Row: {
          content_id: string
          content_type: string
          created_at: string | null
          engagement_metrics: Json | null
          id: string
          platform: string
          share_type: string
          share_url: string | null
          user_id: string
          viral_score: number | null
        }
        Insert: {
          content_id: string
          content_type: string
          created_at?: string | null
          engagement_metrics?: Json | null
          id?: string
          platform: string
          share_type: string
          share_url?: string | null
          user_id: string
          viral_score?: number | null
        }
        Update: {
          content_id?: string
          content_type?: string
          created_at?: string | null
          engagement_metrics?: Json | null
          id?: string
          platform?: string
          share_type?: string
          share_url?: string | null
          user_id?: string
          viral_score?: number | null
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
      subscribers: {
        Row: {
          created_at: string
          email: string
          id: string
          stripe_customer_id: string | null
          subscribed: boolean
          subscription_end: string | null
          subscription_tier: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          stripe_customer_id?: string | null
          subscribed?: boolean
          subscription_end?: string | null
          subscription_tier?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          stripe_customer_id?: string | null
          subscribed?: boolean
          subscription_end?: string | null
          subscription_tier?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      subscription_intents: {
        Row: {
          amount: number
          created_at: string
          id: string
          interval: string
          plan_id: string
          plan_name: string
          status: string
          stripe_session_id: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          amount: number
          created_at?: string
          id?: string
          interval?: string
          plan_id: string
          plan_name: string
          status?: string
          stripe_session_id: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          amount?: number
          created_at?: string
          id?: string
          interval?: string
          plan_id?: string
          plan_name?: string
          status?: string
          stripe_session_id?: string
          updated_at?: string
          user_id?: string | null
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
      team_invites: {
        Row: {
          accepted_at: string | null
          accepted_by_user_id: string | null
          created_at: string | null
          expires_at: string | null
          id: string
          invite_code: string
          invite_type: string | null
          metadata: Json | null
          phone_number: string
          role: string
          salon_id: string
          status: string
          universal_invite_id: string | null
        }
        Insert: {
          accepted_at?: string | null
          accepted_by_user_id?: string | null
          created_at?: string | null
          expires_at?: string | null
          id?: string
          invite_code: string
          invite_type?: string | null
          metadata?: Json | null
          phone_number: string
          role: string
          salon_id: string
          status?: string
          universal_invite_id?: string | null
        }
        Update: {
          accepted_at?: string | null
          accepted_by_user_id?: string | null
          created_at?: string | null
          expires_at?: string | null
          id?: string
          invite_code?: string
          invite_type?: string | null
          metadata?: Json | null
          phone_number?: string
          role?: string
          salon_id?: string
          status?: string
          universal_invite_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "team_invites_salon_id_fkey"
            columns: ["salon_id"]
            isOneToOne: false
            referencedRelation: "salons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "team_invites_universal_invite_id_fkey"
            columns: ["universal_invite_id"]
            isOneToOne: false
            referencedRelation: "universal_team_invites"
            referencedColumns: ["id"]
          },
        ]
      }
      team_member_badges: {
        Row: {
          badge_type: string
          earned_at: string | null
          id: string
          member_id: string
          metadata: Json | null
        }
        Insert: {
          badge_type: string
          earned_at?: string | null
          id?: string
          member_id: string
          metadata?: Json | null
        }
        Update: {
          badge_type?: string
          earned_at?: string | null
          id?: string
          member_id?: string
          metadata?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "team_member_badges_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "salon_staff"
            referencedColumns: ["id"]
          },
        ]
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
      universal_team_invites: {
        Row: {
          created_at: string
          created_by: string
          current_uses: number
          default_role: string
          expires_at: string
          id: string
          invite_code: string
          max_uses: number
          metadata: Json | null
          salon_id: string
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by: string
          current_uses?: number
          default_role?: string
          expires_at?: string
          id?: string
          invite_code: string
          max_uses?: number
          metadata?: Json | null
          salon_id: string
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string
          current_uses?: number
          default_role?: string
          expires_at?: string
          id?: string
          invite_code?: string
          max_uses?: number
          metadata?: Json | null
          salon_id?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "universal_team_invites_salon_id_fkey"
            columns: ["salon_id"]
            isOneToOne: false
            referencedRelation: "salons"
            referencedColumns: ["id"]
          },
        ]
      }
      user_achievements: {
        Row: {
          achievement_name: string
          achievement_type: string
          description: string | null
          earned_at: string | null
          icon: string | null
          id: string
          metadata: Json | null
          user_id: string
        }
        Insert: {
          achievement_name: string
          achievement_type: string
          description?: string | null
          earned_at?: string | null
          icon?: string | null
          id?: string
          metadata?: Json | null
          user_id: string
        }
        Update: {
          achievement_name?: string
          achievement_type?: string
          description?: string | null
          earned_at?: string | null
          icon?: string | null
          id?: string
          metadata?: Json | null
          user_id?: string
        }
        Relationships: []
      }
      user_activity: {
        Row: {
          activity_data: Json
          activity_type: string
          created_at: string
          id: string
          is_featured: boolean | null
          user_id: string
        }
        Insert: {
          activity_data?: Json
          activity_type: string
          created_at?: string
          id?: string
          is_featured?: boolean | null
          user_id: string
        }
        Update: {
          activity_data?: Json
          activity_type?: string
          created_at?: string
          id?: string
          is_featured?: boolean | null
          user_id?: string
        }
        Relationships: []
      }
      user_sessions: {
        Row: {
          created_at: string | null
          id: string
          language: string | null
          last_question: string | null
          name: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          language?: string | null
          last_question?: string | null
          name?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          language?: string | null
          last_question?: string | null
          name?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      user_tags: {
        Row: {
          created_at: string
          id: string
          tag: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          tag: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          tag?: string
          user_id?: string
        }
        Relationships: []
      }
      user_unlocks: {
        Row: {
          credits_required: number
          id: string
          ip_address: string | null
          metadata: Json | null
          unlock_type: string
          unlock_value: string
          unlocked_at: string | null
          user_agent: string | null
          user_id: string
        }
        Insert: {
          credits_required: number
          id?: string
          ip_address?: string | null
          metadata?: Json | null
          unlock_type: string
          unlock_value: string
          unlocked_at?: string | null
          user_agent?: string | null
          user_id: string
        }
        Update: {
          credits_required?: number
          id?: string
          ip_address?: string | null
          metadata?: Json | null
          unlock_type?: string
          unlock_value?: string
          unlocked_at?: string | null
          user_agent?: string | null
          user_id?: string
        }
        Relationships: []
      }
      valuation_leads: {
        Row: {
          calculated_value_high: number
          calculated_value_low: number
          calculation_breakdown: Json | null
          created_at: string | null
          email: string
          google_rating: number | null
          google_review_count: number | null
          id: string
          lease_length: string
          monthly_revenue: number
          number_of_stations: number
          phone: string | null
          user_id: string | null
          zip_code: string
        }
        Insert: {
          calculated_value_high: number
          calculated_value_low: number
          calculation_breakdown?: Json | null
          created_at?: string | null
          email: string
          google_rating?: number | null
          google_review_count?: number | null
          id?: string
          lease_length: string
          monthly_revenue: number
          number_of_stations: number
          phone?: string | null
          user_id?: string | null
          zip_code: string
        }
        Update: {
          calculated_value_high?: number
          calculated_value_low?: number
          calculation_breakdown?: Json | null
          created_at?: string | null
          email?: string
          google_rating?: number | null
          google_review_count?: number | null
          id?: string
          lease_length?: string
          monthly_revenue?: number
          number_of_stations?: number
          phone?: string | null
          user_id?: string | null
          zip_code?: string
        }
        Relationships: []
      }
      viral_leaderboards: {
        Row: {
          created_at: string | null
          id: string
          is_public: boolean | null
          leaderboard_type: string
          metadata: Json | null
          period_start: string
          period_type: string
          rank: number | null
          score: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_public?: boolean | null
          leaderboard_type: string
          metadata?: Json | null
          period_start: string
          period_type?: string
          rank?: number | null
          score?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          is_public?: boolean | null
          leaderboard_type?: string
          metadata?: Json | null
          period_start?: string
          period_type?: string
          rank?: number | null
          score?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      votes: {
        Row: {
          created_at: string
          id: string
          target_id: string
          target_type: string
          user_id: string | null
          vote_type: string
        }
        Insert: {
          created_at?: string
          id?: string
          target_id: string
          target_type: string
          user_id?: string | null
          vote_type?: string
        }
        Update: {
          created_at?: string
          id?: string
          target_id?: string
          target_type?: string
          user_id?: string | null
          vote_type?: string
        }
        Relationships: []
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
      waitlists: {
        Row: {
          id: string
          joined_at: string
          metadata: Json | null
          status: string
          user_id: string | null
          waitlist_type: string
        }
        Insert: {
          id?: string
          joined_at?: string
          metadata?: Json | null
          status?: string
          user_id?: string | null
          waitlist_type: string
        }
        Update: {
          id?: string
          joined_at?: string
          metadata?: Json | null
          status?: string
          user_id?: string | null
          waitlist_type?: string
        }
        Relationships: []
      }
    }
    Views: {
      mv_jobs_recently_filled: {
        Row: {
          cover_img: string | null
          expires_at: string | null
          id: string | null
          location: string | null
          pricing_tier: string | null
          sort_key: string | null
          title: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      accept_team_invite: {
        Args: { p_invite_code: string; p_user_id: string }
        Returns: boolean
      }
      accept_universal_invite: {
        Args: {
          p_email?: string
          p_full_name: string
          p_invite_code: string
          p_phone_number: string
        }
        Returns: Json
      }
      array_append_unique: {
        Args: { arr: string[]; item: string }
        Returns: string[]
      }
      audit_user_action: {
        Args: {
          p_action: string
          p_metadata?: Json
          p_resource_id?: string
          p_resource_type: string
        }
        Returns: undefined
      }
      award_credits: {
        Args:
          | {
              p_action_type: string
              p_description?: string
              p_user_id: string
              p_value: number
            }
          | {
              p_credits: number
              p_ip_address?: string
              p_metadata?: Json
              p_reason: string
              p_referral_code?: string
              p_user_agent?: string
              p_user_id: string
            }
        Returns: boolean
      }
      award_referral_upgrade_bonus: {
        Args: { referred_user_id: string }
        Returns: boolean
      }
      award_salon_credits: {
        Args: {
          p_amount: number
          p_description?: string
          p_metadata?: Json
          p_salon_id: string
          p_source: string
        }
        Returns: boolean
      }
      award_team_badge: {
        Args: { p_badge_type: string; p_member_id: string; p_metadata?: Json }
        Returns: boolean
      }
      award_tip_credits: {
        Args: { p_amount: number; p_transaction_id: string; p_user_id: string }
        Returns: boolean
      }
      calculate_profile_completion: {
        Args: { user_profile: Json; user_role: string }
        Returns: number
      }
      calculate_salon_completion: {
        Args: { p_salon: Json }
        Returns: number
      }
      can_access_salon_earnings: {
        Args: { p_salon_id: string }
        Returns: boolean
      }
      can_review_booking: {
        Args: { booking_id: string; user_id: string }
        Returns: boolean
      }
      can_user_post: {
        Args: { p_post_type: string; p_user_id: string }
        Returns: boolean
      }
      check_ai_rate_limit: {
        Args: { p_user_id: string }
        Returns: Json
      }
      check_api_rate_limit: {
        Args: {
          p_endpoint: string
          p_identifier: string
          p_max_requests?: number
          p_window_minutes?: number
        }
        Returns: boolean
      }
      check_booking_conflicts: {
        Args: {
          p_artist_id: string
          p_ends_at: string
          p_exclude_booking_id?: string
          p_starts_at: string
        }
        Returns: boolean
      }
      check_rate_limit: {
        Args: {
          p_endpoint: string
          p_max_requests?: number
          p_window_minutes?: number
        }
        Returns: boolean
      }
      cleanup_expired_auth_states: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      cleanup_old_hubspot_events: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      create_community_notification: {
        Args: {
          p_comment_id?: string
          p_message: string
          p_metadata?: Json
          p_post_id?: string
          p_triggered_by?: string
          p_type: string
          p_user_id: string
        }
        Returns: string
      }
      create_diamond_tier_waitlist_if_not_exists: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      create_notification: {
        Args: {
          p_link?: string
          p_message: string
          p_metadata?: Json
          p_type?: string
          p_user_id: string
        }
        Returns: string
      }
      create_team_invite: {
        Args: { p_phone_number: string; p_role: string; p_salon_id: string }
        Returns: {
          expires_at: string
          invite_code: string
        }[]
      }
      create_universal_team_invite: {
        Args: {
          p_default_role?: string
          p_max_uses: number
          p_salon_id: string
        }
        Returns: {
          expires_at: string
          invite_code: string
        }[]
      }
      decrement_post_likes: {
        Args: { post_id: string }
        Returns: undefined
      }
      detect_prompt_abuse: {
        Args: { p_prompt: string; p_prompt_hash: string; p_user_id: string }
        Returns: string
      }
      generate_affiliate_slug: {
        Args: { base_name: string }
        Returns: string
      }
      generate_manage_token: {
        Args: { p_booking_id: string; p_email: string }
        Returns: string
      }
      generate_team_invite_code: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      generate_universal_invite_code: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      get_admin_dashboard_stats: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
      get_artist_earnings_for_user: {
        Args: { p_artist_id: string }
        Returns: {
          booking_count: number
          paid: boolean
          salon_id: string
          total_earnings: number
          total_revenue: number
          week_start: string
        }[]
      }
      get_artist_rating: {
        Args: { artist_id: string }
        Returns: {
          average_rating: number
          review_count: number
        }[]
      }
      get_cities_for_daily_indexing: {
        Args: { batch_size?: number }
        Returns: {
          city_name: string
          id: string
          priority: number
          slug: string
          state: string
          state_code: string
        }[]
      }
      get_community_leaderboard: {
        Args: { limit_count?: number; period_start: string }
        Returns: {
          ai_posts: number
          avatar_url: string
          first_ai_user: boolean
          full_name: string
          id: string
          level: string
          points: number
          total_likes: number
          total_posts: number
        }[]
      }
      get_customer_booking_info: {
        Args: { booking_id: string }
        Returns: {
          customer_avatar: string
          customer_email: string
          customer_name: string
          customer_phone: string
        }[]
      }
      get_customer_info: {
        Args: { customer_id: string }
        Returns: {
          avatar_url: string
          email: string
          full_name: string
          id: string
        }[]
      }
      get_next_referral_milestone: {
        Args: { current_count: number }
        Returns: number
      }
      get_post_status_for_user: {
        Args: { p_user_id: string }
        Returns: {
          payment_status: string
          post_id: string
          status: string
        }[]
      }
      get_public_artist_profiles: {
        Args: { p_limit?: number; p_offset?: number }
        Returns: {
          avatar_url: string
          full_name: string
          id: string
          is_verified: boolean
          location: string
          specialty: string
          years_experience: number
        }[]
      }
      get_salon_credits: {
        Args: { p_salon_id: string }
        Returns: number
      }
      get_salon_earnings: {
        Args: { p_salon_id: string }
        Returns: {
          artist_earnings: number
          artist_id: string
          artist_name: string
          booking_count: number
          month: string
          total_revenue: number
        }[]
      }
      get_user_count: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      get_user_credits: {
        Args: { p_user_id: string }
        Returns: number
      }
      get_user_free_job_count: {
        Args: { p_user_id: string }
        Returns: number
      }
      get_user_rank: {
        Args: { period_start: string; target_user_id: string }
        Returns: {
          points: number
          rank: number
        }[]
      }
      get_user_referral_stats: {
        Args: { user_id: string }
        Returns: {
          referral_count: number
        }[]
      }
      has_great_feedback: {
        Args: { p_artist_id: string }
        Returns: boolean
      }
      has_posted_free_job: {
        Args: { p_user_id: string }
        Returns: boolean
      }
      increment_post_likes: {
        Args: { post_id: string }
        Returns: undefined
      }
      is_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      is_artist_available: {
        Args: {
          p_artist_id: string
          p_date: string
          p_end_time: string
          p_start_time: string
        }
        Returns: boolean
      }
      is_post_expired: {
        Args: { expires_at: string }
        Returns: boolean
      }
      is_top_performer: {
        Args: { p_artist_id: string }
        Returns: boolean
      }
      is_user_invited: {
        Args: { user_id: string }
        Returns: boolean
      }
      link_staff_to_user: {
        Args: { p_invitation_token: string; p_user_id: string }
        Returns: boolean
      }
      process_referral: {
        Args: { new_user_id: string; referral_code: string }
        Returns: boolean
      }
      process_referral_credits: {
        Args: { p_new_user_id: string; p_referrer_code: string }
        Returns: boolean
      }
      process_team_referral: {
        Args: {
          p_is_artist: boolean
          p_referred_id: string
          p_referrer_id: string
        }
        Returns: boolean
      }
      redeem_credits: {
        Args: {
          p_amount: number
          p_redemption_type: string
          p_target_id?: string
          p_user_id: string
        }
        Returns: boolean
      }
      refresh_mv_jobs_recently_filled: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      sanitize_content: {
        Args: { p_content: string }
        Returns: string
      }
      search_salon_sales_optimized: {
        Args: {
          business_type_filter?: string
          location_filter?: string
          page_limit?: number
          page_offset?: number
          price_max?: number
          price_min?: number
          search_text?: string
        }
        Returns: {
          asking_price: number
          business_type: string
          city: string
          created_at: string
          description_combined: string
          id: string
          images: string[]
          is_featured: boolean
          is_urgent: boolean
          salon_name: string
          state: string
        }[]
      }
      send_team_invite: {
        Args: {
          p_email: string
          p_full_name: string
          p_role: string
          p_salon_id: string
        }
        Returns: string
      }
      setup_salon_owner: {
        Args: { p_owner_id: string; p_salon_id: string }
        Returns: boolean
      }
      spend_credits: {
        Args: {
          p_credits: number
          p_metadata?: Json
          p_reason: string
          p_user_id: string
        }
        Returns: boolean
      }
      submit_review_with_credits: {
        Args: {
          p_artist_id: string
          p_booking_id: string
          p_rating: number
          p_review_text: string
          p_user_id: string
        }
        Returns: boolean
      }
      tag_inactive_users: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      tag_top_referrers: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      tag_user: {
        Args: { p_tag: string; p_user_id: string }
        Returns: boolean
      }
      track_salon_view: {
        Args: { p_salon_id: string; p_source?: string; p_viewer_id?: string }
        Returns: undefined
      }
      unlock_level: {
        Args: {
          p_credits_required: number
          p_ip_address?: string
          p_level: number
          p_user_agent?: string
          p_user_id: string
        }
        Returns: boolean
      }
      user_has_salon_access: {
        Args: {
          p_access_types?: string[]
          p_salon_id: string
          p_user_id: string
        }
        Returns: boolean
      }
      validate_team_invite: {
        Args: { p_invite_code: string; p_phone_number: string }
        Returns: Json
      }
      verify_manage_token: {
        Args: { p_booking_id: string; p_token: string }
        Returns: boolean
      }
    }
    Enums: {
      application_status: "pending" | "accepted" | "rejected"
      booking_status: "pending" | "confirmed" | "canceled" | "completed"
      job_category:
        | "nails"
        | "hair"
        | "barber"
        | "brows-lashes"
        | "massage"
        | "makeup"
        | "tattoo"
        | "skincare"
        | "general"
      job_status: "open" | "closed"
      payment_status: "pending" | "completed" | "failed"
      user_role: "customer" | "salon_owner" | "technician"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      application_status: ["pending", "accepted", "rejected"],
      booking_status: ["pending", "confirmed", "canceled", "completed"],
      job_category: [
        "nails",
        "hair",
        "barber",
        "brows-lashes",
        "massage",
        "makeup",
        "tattoo",
        "skincare",
        "general",
      ],
      job_status: ["open", "closed"],
      payment_status: ["pending", "completed", "failed"],
      user_role: ["customer", "salon_owner", "technician"],
    },
  },
} as const
