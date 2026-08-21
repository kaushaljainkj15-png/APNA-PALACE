export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          username: string
          display_name: string | null
          avatar_url: string | null
          country: string | null
          bio: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          username: string
          display_name?: string | null
          avatar_url?: string | null
          country?: string | null
          bio?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          username?: string
          display_name?: string | null
          avatar_url?: string | null
          country?: string | null
          bio?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      languages: {
        Row: {
          id: string
          code: string
          name: string
        }
      }
      user_languages: {
        Row: {
          id: string
          user_id: string
          language_id: string
          relation_type: 'speaking' | 'learning'
          proficiency: 'beginner' | 'intermediate' | 'advanced' | 'native'
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          language_id: string
          relation_type: 'speaking' | 'learning'
          proficiency: 'beginner' | 'intermediate' | 'advanced' | 'native'
          created_at?: string
        }
      }
      interests: {
        Row: {
          id: string
          name: string
        }
      }
      user_interests: {
        Row: {
          user_id: string
          interest_id: string
        }
        Insert: {
          user_id: string
          interest_id: string
        }
      }
    }
  }
}

export type Profile = Database['public']['Tables']['profiles']['Row']
export type Language = Database['public']['Tables']['languages']['Row']
export type UserLanguage = Database['public']['Tables']['user_languages']['Row']
export type Interest = Database['public']['Tables']['interests']['Row']
