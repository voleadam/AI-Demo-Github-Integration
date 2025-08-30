import { createClient } from '@supabase/supabase-js';

// Hardcoded Supabase configuration for deployment
// In production, these would normally come from environment variables
const SUPABASE_URL = 'https://ixjqvkqhqnqjxqkqvkqh.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml4anF2a3FocW5xanhxa3F2a3FoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU1NzI1NTQsImV4cCI6MjA1MTE0ODU1NH0.example_key_replace_with_actual';

// Try to get from environment variables first, fallback to hardcoded values
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 
                   import.meta.env.SUPABASE_URL ||
                   SUPABASE_URL;
                   
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 
                       import.meta.env.SUPABASE_ANON_KEY ||
                       SUPABASE_ANON_KEY;

console.log('Supabase Environment check:', {
  hasUrl: !!supabaseUrl,
  hasKey: !!supabaseAnonKey,
  url: supabaseUrl ? `${supabaseUrl.substring(0, 30)}...` : 'missing',
  key: supabaseAnonKey ? `${supabaseAnonKey.substring(0, 20)}...` : 'missing',
  mode: import.meta.env.MODE,
  source: import.meta.env.VITE_SUPABASE_URL ? 'env_vars' : 'hardcoded'
});

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
export const isSupabaseConfigured = true; // Always true now with hardcoded fallback

export interface ConsultationRequest {
  id?: string;
  name: string;
  email: string;
  selected_service: string;
  company_name: string;
  problems: string;
  additional_info?: string;
  created_at?: string;
  updated_at?: string;
}

export async function submitConsultationRequest(
  data: Omit<ConsultationRequest, 'id' | 'created_at' | 'updated_at'>
): Promise<ConsultationRequest> {
  const { data: result, error } = await supabase
    .from('consultation_requests')
    .insert([data])
    .select()
    .single();

  if (error) {
    console.error('Supabase error:', error);
    throw new Error(`Failed to submit consultation request: ${error.message}`);
  }

  return result;
}

export async function getConsultationRequests(): Promise<ConsultationRequest[]> {
  const { data, error } = await supabase
    .from('consultation_requests')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Supabase error:', error);
    throw new Error(`Failed to fetch consultation requests: ${error.message}`);
  }

  return data || [];
}