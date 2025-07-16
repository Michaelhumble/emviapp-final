export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
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
        Relationships: [
          {
            foreignKeyName: "activity_log_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "review_customers"
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
        Relationships: [
          {
            foreignKeyName: "admin_actions_admin_user_id_fkey"
            columns: ["admin_user_id"]
            isOneToOne: false
            referencedRelation: "review_customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "admin_actions_target_user_id_fkey"
            columns: ["target_user_id"]
            isOneToOne: false
            referencedRelation: "review_customers"
            referencedColumns: ["id"]
          },
        ]
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
        Relationships: [
          {
            foreignKeyName: "ai_usage_logs_reviewed_by_fkey"
            columns: ["reviewed_by"]
            isOneToOne: false
            referencedRelation: "review_customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_usage_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "review_customers"
            referencedColumns: ["id"]
          },
        ]
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
            referencedRelation: "review_customers"
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
        Relationships: [
          {
            foreignKeyName: "artist_availability_artist_id_fkey"
            columns: ["artist_id"]
            isOneToOne: false
            referencedRelation: "review_customers"
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
            referencedRelation: "review_customers"
            referencedColumns: ["id"]
          },
        ]
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
            referencedRelation: "review_customers"
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
            referencedRelation: "review_customers"
            referencedColumns: ["id"]
          },
        ]
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
          {
            foreignKeyName: "booking_audit_log_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "review_customers"
            referencedColumns: ["id"]
          },
        ]
      }
      bookings: {
        Row: {
          appointment_time: string | null
          client_name: string | null
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
          service_type: string | null
          status: string | null
          time_requested: string | null
        }
        Insert: {
          appointment_time?: string | null
          client_name?: string | null
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
          service_type?: string | null
          status?: string | null
          time_requested?: string | null
        }
        Update: {
          appointment_time?: string | null
          client_name?: string | null
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
          service_type?: string | null
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
          {
            foreignKeyName: "challenge_entries_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "review_customers"
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
          {
            foreignKeyName: "challenge_votes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "review_customers"
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
        Relationships: [
          {
            foreignKeyName: "challenges_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "review_customers"
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
          {
            foreignKeyName: "community_comments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "review_customers"
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
          {
            foreignKeyName: "community_event_participants_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "review_customers"
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
        Relationships: [
          {
            foreignKeyName: "community_events_host_user_id_fkey"
            columns: ["host_user_id"]
            isOneToOne: false
            referencedRelation: "review_customers"
            referencedColumns: ["id"]
          },
        ]
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
        Relationships: [
          {
            foreignKeyName: "community_leaderboard_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "review_customers"
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
          {
            foreignKeyName: "community_post_comments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "review_customers"
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
          {
            foreignKeyName: "community_post_likes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "review_customers"
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
          id: string
          image_urls: string[] | null
          is_featured: boolean | null
          is_trending: boolean | null
          likes_count: number | null
          post_type: string | null
          shares_count: number | null
          tags: string[] | null
          updated_at: string | null
          user_id: string
          video_url: string | null
        }
        Insert: {
          category?: string | null
          comments_count?: number | null
          content: string
          created_at?: string | null
          id?: string
          image_urls?: string[] | null
          is_featured?: boolean | null
          is_trending?: boolean | null
          likes_count?: number | null
          post_type?: string | null
          shares_count?: number | null
          tags?: string[] | null
          updated_at?: string | null
          user_id: string
          video_url?: string | null
        }
        Update: {
          category?: string | null
          comments_count?: number | null
          content?: string
          created_at?: string | null
          id?: string
          image_urls?: string[] | null
          is_featured?: boolean | null
          is_trending?: boolean | null
          likes_count?: number | null
          post_type?: string | null
          shares_count?: number | null
          tags?: string[] | null
          updated_at?: string | null
          user_id?: string
          video_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "community_posts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "review_customers"
            referencedColumns: ["id"]
          },
        ]
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
        Relationships: [
          {
            foreignKeyName: "community_questions_answered_by_fkey"
            columns: ["answered_by"]
            isOneToOne: false
            referencedRelation: "review_customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "community_questions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "review_customers"
            referencedColumns: ["id"]
          },
        ]
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
            foreignKeyName: "community_stories_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "review_customers"
            referencedColumns: ["id"]
          },
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
        Relationships: [
          {
            foreignKeyName: "contact_messages_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "review_customers"
            referencedColumns: ["id"]
          },
        ]
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
        Relationships: [
          {
            foreignKeyName: "content_reports_reporter_id_fkey"
            columns: ["reporter_id"]
            isOneToOne: false
            referencedRelation: "review_customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "content_reports_reviewed_by_fkey"
            columns: ["reviewed_by"]
            isOneToOne: false
            referencedRelation: "review_customers"
            referencedColumns: ["id"]
          },
        ]
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
          {
            foreignKeyName: "contest_entries_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "review_customers"
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
        Relationships: [
          {
            foreignKeyName: "credit_earnings_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "review_customers"
            referencedColumns: ["id"]
          },
        ]
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
        Relationships: [
          {
            foreignKeyName: "credit_transfers_recipient_id_fkey"
            columns: ["recipient_id"]
            isOneToOne: false
            referencedRelation: "review_customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "credit_transfers_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "review_customers"
            referencedColumns: ["id"]
          },
        ]
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
        Relationships: [
          {
            foreignKeyName: "credits_ledger_admin_user_id_fkey"
            columns: ["admin_user_id"]
            isOneToOne: false
            referencedRelation: "review_customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "credits_ledger_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "review_customers"
            referencedColumns: ["id"]
          },
        ]
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
          {
            foreignKeyName: "cta_interactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "review_customers"
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
        Relationships: [
          {
            foreignKeyName: "customer_credits_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "review_customers"
            referencedColumns: ["id"]
          },
        ]
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
        Relationships: [
          {
            foreignKeyName: "diamond_tier_waitlist_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "review_customers"
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
        Relationships: [
          {
            foreignKeyName: "followers_artist_id_fkey"
            columns: ["artist_id"]
            isOneToOne: false
            referencedRelation: "review_customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "followers_viewer_id_fkey"
            columns: ["viewer_id"]
            isOneToOne: false
            referencedRelation: "review_customers"
            referencedColumns: ["id"]
          },
        ]
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
            foreignKeyName: "job_applications_applicant_id_fkey"
            columns: ["applicant_id"]
            isOneToOne: false
            referencedRelation: "review_customers"
            referencedColumns: ["id"]
          },
        ]
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
            referencedRelation: "review_customers"
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
            foreignKeyName: "messages_salon_id_fkey"
            columns: ["salon_id"]
            isOneToOne: false
            referencedRelation: "user_salon_access"
            referencedColumns: ["salon_id"]
          },
          {
            foreignKeyName: "messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "review_customers"
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
        Relationships: [
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "review_customers"
            referencedColumns: ["id"]
          },
        ]
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
        Relationships: [
          {
            foreignKeyName: "offers_sent_artist_id_fkey"
            columns: ["artist_id"]
            isOneToOne: false
            referencedRelation: "review_customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "offers_sent_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "review_customers"
            referencedColumns: ["id"]
          },
        ]
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
        Relationships: [
          {
            foreignKeyName: "payment_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "review_customers"
            referencedColumns: ["id"]
          },
        ]
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
        Relationships: [
          {
            foreignKeyName: "payments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "review_customers"
            referencedColumns: ["id"]
          },
        ]
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
        Relationships: [
          {
            foreignKeyName: "portfolio_items_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "review_customers"
            referencedColumns: ["id"]
          },
        ]
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
        Relationships: [
          {
            foreignKeyName: "posts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "review_customers"
            referencedColumns: ["id"]
          },
        ]
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
          avatar_url: string | null
          badges: Json | null
          community_points: number | null
          created_at: string | null
          creator_status: string | null
          current_streak: number | null
          full_name: string | null
          id: string
          total_likes_received: number | null
          total_posts: number | null
          total_shares: number | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          badges?: Json | null
          community_points?: number | null
          created_at?: string | null
          creator_status?: string | null
          current_streak?: number | null
          full_name?: string | null
          id: string
          total_likes_received?: number | null
          total_posts?: number | null
          total_shares?: number | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          badges?: Json | null
          community_points?: number | null
          created_at?: string | null
          creator_status?: string | null
          current_streak?: number | null
          full_name?: string | null
          id?: string
          total_likes_received?: number | null
          total_posts?: number | null
          total_shares?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "review_customers"
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
            foreignKeyName: "fk_user"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profile_completion_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_user"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_salon_access"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "fk_user"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
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
        Relationships: [
          {
            foreignKeyName: "fk_referred"
            columns: ["referred_id"]
            isOneToOne: true
            referencedRelation: "profile_completion_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_referred"
            columns: ["referred_id"]
            isOneToOne: true
            referencedRelation: "user_salon_access"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "fk_referred"
            columns: ["referred_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_referrer"
            columns: ["referrer_id"]
            isOneToOne: false
            referencedRelation: "profile_completion_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_referrer"
            columns: ["referrer_id"]
            isOneToOne: false
            referencedRelation: "user_salon_access"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "fk_referrer"
            columns: ["referrer_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "referrals_referred_id_fkey"
            columns: ["referred_id"]
            isOneToOne: true
            referencedRelation: "review_customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "referrals_referrer_id_fkey"
            columns: ["referrer_id"]
            isOneToOne: false
            referencedRelation: "review_customers"
            referencedColumns: ["id"]
          },
        ]
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
        Relationships: [
          {
            foreignKeyName: "salon_bookings_artist_id_fkey"
            columns: ["artist_id"]
            isOneToOne: false
            referencedRelation: "review_customers"
            referencedColumns: ["id"]
          },
        ]
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
          {
            foreignKeyName: "salon_credits_salon_id_fkey"
            columns: ["salon_id"]
            isOneToOne: false
            referencedRelation: "user_salon_access"
            referencedColumns: ["salon_id"]
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
        Relationships: [
          {
            foreignKeyName: "salon_listings_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "review_customers"
            referencedColumns: ["id"]
          },
        ]
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
          {
            foreignKeyName: "salon_offers_salon_id_fkey"
            columns: ["salon_id"]
            isOneToOne: false
            referencedRelation: "user_salon_access"
            referencedColumns: ["salon_id"]
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
          {
            foreignKeyName: "salon_photos_salon_id_fkey"
            columns: ["salon_id"]
            isOneToOne: false
            referencedRelation: "user_salon_access"
            referencedColumns: ["salon_id"]
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
        Relationships: [
          {
            foreignKeyName: "salon_promotions_created_by_id_fkey"
            columns: ["created_by_id"]
            isOneToOne: false
            referencedRelation: "review_customers"
            referencedColumns: ["id"]
          },
        ]
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
          {
            foreignKeyName: "salon_reviews_salon_id_fkey"
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
        Relationships: [
          {
            foreignKeyName: "salon_sales_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "review_customers"
            referencedColumns: ["id"]
          },
        ]
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
        Relationships: [
          {
            foreignKeyName: "salon_staff_invited_by_fkey"
            columns: ["invited_by"]
            isOneToOne: false
            referencedRelation: "review_customers"
            referencedColumns: ["id"]
          },
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
          {
            foreignKeyName: "salon_staff_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "review_customers"
            referencedColumns: ["id"]
          },
        ]
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
        Relationships: [
          {
            foreignKeyName: "salon_team_members_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "review_customers"
            referencedColumns: ["id"]
          },
        ]
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
          {
            foreignKeyName: "salon_team_messages_salon_id_fkey"
            columns: ["salon_id"]
            isOneToOne: false
            referencedRelation: "user_salon_access"
            referencedColumns: ["salon_id"]
          },
          {
            foreignKeyName: "salon_team_messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "review_customers"
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
        Relationships: [
          {
            foreignKeyName: "salon_views_viewer_id_fkey"
            columns: ["viewer_id"]
            isOneToOne: false
            referencedRelation: "review_customers"
            referencedColumns: ["id"]
          },
        ]
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
        Relationships: [
          {
            foreignKeyName: "salons_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "review_customers"
            referencedColumns: ["id"]
          },
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
        Relationships: [
          {
            foreignKeyName: "saved_artists_artist_id_fkey"
            columns: ["artist_id"]
            isOneToOne: false
            referencedRelation: "review_customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "saved_artists_viewer_id_fkey"
            columns: ["viewer_id"]
            isOneToOne: false
            referencedRelation: "review_customers"
            referencedColumns: ["id"]
          },
        ]
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
        Relationships: [
          {
            foreignKeyName: "services_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "review_customers"
            referencedColumns: ["id"]
          },
        ]
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
        Relationships: [
          {
            foreignKeyName: "support_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "review_customers"
            referencedColumns: ["id"]
          },
        ]
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
            foreignKeyName: "team_invites_accepted_by_user_id_fkey"
            columns: ["accepted_by_user_id"]
            isOneToOne: false
            referencedRelation: "review_customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "team_invites_salon_id_fkey"
            columns: ["salon_id"]
            isOneToOne: false
            referencedRelation: "salons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "team_invites_salon_id_fkey"
            columns: ["salon_id"]
            isOneToOne: false
            referencedRelation: "user_salon_access"
            referencedColumns: ["salon_id"]
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
            foreignKeyName: "universal_team_invites_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "review_customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "universal_team_invites_salon_id_fkey"
            columns: ["salon_id"]
            isOneToOne: false
            referencedRelation: "salons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "universal_team_invites_salon_id_fkey"
            columns: ["salon_id"]
            isOneToOne: false
            referencedRelation: "user_salon_access"
            referencedColumns: ["salon_id"]
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
        Relationships: [
          {
            foreignKeyName: "user_achievements_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "review_customers"
            referencedColumns: ["id"]
          },
        ]
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
        Relationships: [
          {
            foreignKeyName: "user_tags_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "review_customers"
            referencedColumns: ["id"]
          },
        ]
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
        Relationships: [
          {
            foreignKeyName: "user_unlocks_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "review_customers"
            referencedColumns: ["id"]
          },
        ]
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
          referral_count: number | null
          referred_by: string | null
          role: string | null
          salon_name: string | null
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
          referral_count?: number | null
          referred_by?: string | null
          role?: string | null
          salon_name?: string | null
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
          referral_count?: number | null
          referred_by?: string | null
          role?: string | null
          salon_name?: string | null
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
        Relationships: [
          {
            foreignKeyName: "votes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "review_customers"
            referencedColumns: ["id"]
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
        Relationships: [
          {
            foreignKeyName: "waitlists_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "review_customers"
            referencedColumns: ["id"]
          },
        ]
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
      post_payments: {
        Row: {
          last_purchase_date: string | null
          payment_type: string | null
          purchase_count: number | null
          user_id: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "review_customers"
            referencedColumns: ["id"]
          },
        ]
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
        Relationships: [
          {
            foreignKeyName: "posts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "review_customers"
            referencedColumns: ["id"]
          },
        ]
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
      review_customers: {
        Row: {
          avatar_url: string | null
          email: string | null
          full_name: string | null
          id: string | null
        }
        Relationships: []
      }
      salon_earnings_view: {
        Row: {
          artist_earnings: number | null
          artist_id: string | null
          artist_name: string | null
          booking_count: number | null
          month: string | null
          salon_id: string | null
          total_revenue: number | null
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
      user_salon_access: {
        Row: {
          access_type: string | null
          salon_id: string | null
          user_id: string | null
        }
        Relationships: [
          {
            foreignKeyName: "salons_id_fkey"
            columns: ["salon_id"]
            isOneToOne: true
            referencedRelation: "review_customers"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      accept_team_invite: {
        Args: { p_invite_code: string; p_user_id: string }
        Returns: boolean
      }
      accept_universal_invite: {
        Args: {
          p_invite_code: string
          p_full_name: string
          p_phone_number: string
          p_email?: string
        }
        Returns: Json
      }
      array_append_unique: {
        Args: { arr: string[]; item: string }
        Returns: string[]
      }
      award_credits: {
        Args:
          | {
              p_user_id: string
              p_action_type: string
              p_value: number
              p_description?: string
            }
          | {
              p_user_id: string
              p_credits: number
              p_reason: string
              p_metadata?: Json
              p_ip_address?: string
              p_user_agent?: string
              p_referral_code?: string
            }
        Returns: boolean
      }
      award_referral_upgrade_bonus: {
        Args: { referred_user_id: string }
        Returns: boolean
      }
      award_salon_credits: {
        Args: {
          p_salon_id: string
          p_amount: number
          p_source: string
          p_description?: string
          p_metadata?: Json
        }
        Returns: boolean
      }
      award_team_badge: {
        Args: { p_member_id: string; p_badge_type: string; p_metadata?: Json }
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
        Args: { p_user_id: string; p_post_type: string }
        Returns: boolean
      }
      check_ai_rate_limit: {
        Args: { p_user_id: string }
        Returns: Json
      }
      create_diamond_tier_waitlist_if_not_exists: {
        Args: Record<PropertyKey, never>
        Returns: undefined
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
      create_team_invite: {
        Args: { p_salon_id: string; p_phone_number: string; p_role: string }
        Returns: {
          invite_code: string
          expires_at: string
        }[]
      }
      create_universal_team_invite: {
        Args: {
          p_salon_id: string
          p_max_uses: number
          p_default_role?: string
        }
        Returns: {
          invite_code: string
          expires_at: string
        }[]
      }
      decrement_post_likes: {
        Args: { post_id: string }
        Returns: undefined
      }
      detect_prompt_abuse: {
        Args: { p_user_id: string; p_prompt: string; p_prompt_hash: string }
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
      get_artist_rating: {
        Args: { artist_id: string }
        Returns: {
          average_rating: number
          review_count: number
        }[]
      }
      get_community_leaderboard: {
        Args: { period_start: string; limit_count?: number }
        Returns: {
          id: string
          full_name: string
          avatar_url: string
          total_likes: number
          total_posts: number
          ai_posts: number
          points: number
          level: string
          first_ai_user: boolean
        }[]
      }
      get_customer_info: {
        Args: { customer_id: string }
        Returns: {
          id: string
          full_name: string
          email: string
          avatar_url: string
        }[]
      }
      get_next_referral_milestone: {
        Args: { current_count: number }
        Returns: number
      }
      get_salon_credits: {
        Args: { p_salon_id: string }
        Returns: number
      }
      get_salon_earnings: {
        Args: { p_salon_id: string }
        Returns: {
          artist_id: string
          artist_name: string
          month: string
          booking_count: number
          total_revenue: number
          artist_earnings: number
        }[]
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
        Args: { target_user_id: string; period_start: string }
        Returns: {
          rank: number
          points: number
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
        Args: { referral_code: string; new_user_id: string }
        Returns: boolean
      }
      process_referral_credits: {
        Args: { p_referrer_code: string; p_new_user_id: string }
        Returns: boolean
      }
      process_team_referral: {
        Args: {
          p_referrer_id: string
          p_referred_id: string
          p_is_artist: boolean
        }
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
      send_team_invite: {
        Args: {
          p_salon_id: string
          p_email: string
          p_role: string
          p_full_name: string
        }
        Returns: string
      }
      setup_salon_owner: {
        Args: { p_salon_id: string; p_owner_id: string }
        Returns: boolean
      }
      spend_credits: {
        Args: {
          p_user_id: string
          p_credits: number
          p_reason: string
          p_metadata?: Json
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
      tag_inactive_users: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      tag_top_referrers: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      tag_user: {
        Args: { p_user_id: string; p_tag: string }
        Returns: boolean
      }
      track_salon_view: {
        Args: { p_salon_id: string; p_viewer_id?: string; p_source?: string }
        Returns: undefined
      }
      unlock_level: {
        Args: {
          p_user_id: string
          p_level: number
          p_credits_required: number
          p_ip_address?: string
          p_user_agent?: string
        }
        Returns: boolean
      }
      user_has_salon_access: {
        Args: {
          p_user_id: string
          p_salon_id: string
          p_access_types?: string[]
        }
        Returns: boolean
      }
      validate_team_invite: {
        Args: { p_invite_code: string; p_phone_number: string }
        Returns: Json
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
      job_status: ["open", "closed"],
      payment_status: ["pending", "completed", "failed"],
      user_role: ["customer", "salon_owner", "technician"],
    },
  },
} as const
