export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      qr_metadata: {
        Row: {
          id: number;
          original_url: string;
          normalized_url: string;
          qr_key: string;
          created_at: string;
          last_accessed_at: string | null;
        };
        Insert: {
          id?: number;
          original_url: string;
          normalized_url: string;
          qr_key: string;
          created_at?: string;
          last_accessed_at?: string | null;
        };
        Update: {
          id?: number;
          original_url?: string;
          normalized_url?: string;
          qr_key?: string;
          created_at?: string;
          last_accessed_at?: string | null;
        };
      };
    };
  };
}
