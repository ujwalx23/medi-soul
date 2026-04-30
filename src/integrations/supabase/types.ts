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
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      appointments: {
        Row: {
          created_at: string | null
          id: string
          notes: string | null
          preferred_date: string | null
          severity: string
          specialist_type: string
          status: string | null
          symptoms: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          notes?: string | null
          preferred_date?: string | null
          severity: string
          specialist_type: string
          status?: string | null
          symptoms: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          notes?: string | null
          preferred_date?: string | null
          severity?: string
          specialist_type?: string
          status?: string | null
          symptoms?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "appointments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_history: {
        Row: {
          created_at: string | null
          id: string
          language: string
          message: string
          response: string
          severity_level: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          language: string
          message: string
          response: string
          severity_level?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          language?: string
          message?: string
          response?: string
          severity_level?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "chat_history_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      emergency_contacts: {
        Row: {
          created_at: string
          email: string | null
          id: string
          is_primary: boolean
          name: string
          phone: string
          relationship: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          id?: string
          is_primary?: boolean
          name: string
          phone: string
          relationship?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: string
          is_primary?: boolean
          name?: string
          phone?: string
          relationship?: string | null
          user_id?: string
        }
        Relationships: []
      }
      family_history: {
        Row: {
          analysis_result: Json | null
          created_at: string
          father: string | null
          grandparents: string | null
          id: string
          mother: string | null
          other_relatives: string | null
          overall_risk: string | null
          siblings: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          analysis_result?: Json | null
          created_at?: string
          father?: string | null
          grandparents?: string | null
          id?: string
          mother?: string | null
          other_relatives?: string | null
          overall_risk?: string | null
          siblings?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          analysis_result?: Json | null
          created_at?: string
          father?: string | null
          grandparents?: string | null
          id?: string
          mother?: string | null
          other_relatives?: string | null
          overall_risk?: string | null
          siblings?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      family_members: {
        Row: {
          age: number | null
          allergies: string | null
          blood_group: string | null
          conditions: string | null
          created_at: string
          full_name: string
          gender: string | null
          id: string
          medications: string | null
          notes: string | null
          relationship: string
          updated_at: string
          user_id: string
        }
        Insert: {
          age?: number | null
          allergies?: string | null
          blood_group?: string | null
          conditions?: string | null
          created_at?: string
          full_name: string
          gender?: string | null
          id?: string
          medications?: string | null
          notes?: string | null
          relationship: string
          updated_at?: string
          user_id: string
        }
        Update: {
          age?: number | null
          allergies?: string | null
          blood_group?: string | null
          conditions?: string | null
          created_at?: string
          full_name?: string
          gender?: string | null
          id?: string
          medications?: string | null
          notes?: string | null
          relationship?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      image_analysis_history: {
        Row: {
          analysis: string
          created_at: string
          id: string
          image_preview: string | null
          language: string | null
          mode: string
          user_id: string
        }
        Insert: {
          analysis: string
          created_at?: string
          id?: string
          image_preview?: string | null
          language?: string | null
          mode?: string
          user_id: string
        }
        Update: {
          analysis?: string
          created_at?: string
          id?: string
          image_preview?: string | null
          language?: string | null
          mode?: string
          user_id?: string
        }
        Relationships: []
      }
      medical_records: {
        Row: {
          created_at: string | null
          diagnosis: string
          id: string
          notes: string | null
          recommended_specialist: string | null
          severity: string
          symptoms: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          diagnosis: string
          id?: string
          notes?: string | null
          recommended_specialist?: string | null
          severity: string
          symptoms: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          diagnosis?: string
          id?: string
          notes?: string | null
          recommended_specialist?: string | null
          severity?: string
          symptoms?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "medical_records_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      medicine_records: {
        Row: {
          created_at: string
          date_taken: string
          dosage: string
          id: string
          image_url: string | null
          medicine_name: string
          notes: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          date_taken: string
          dosage: string
          id?: string
          image_url?: string | null
          medicine_name: string
          notes?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          date_taken?: string
          dosage?: string
          id?: string
          image_url?: string | null
          medicine_name?: string
          notes?: string | null
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          age: number | null
          allergies: string[] | null
          created_at: string | null
          full_name: string | null
          gender: string | null
          id: string
          updated_at: string | null
        }
        Insert: {
          age?: number | null
          allergies?: string[] | null
          created_at?: string | null
          full_name?: string | null
          gender?: string | null
          id: string
          updated_at?: string | null
        }
        Update: {
          age?: number | null
          allergies?: string[] | null
          created_at?: string | null
          full_name?: string | null
          gender?: string | null
          id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
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
    Enums: {},
  },
} as const
