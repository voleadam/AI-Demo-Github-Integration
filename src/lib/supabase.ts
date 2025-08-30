import { createClient } from '@supabase/supabase-js';

// Real Supabase configuration from .env file
const SUPABASE_URL = 'https://spqklrapovugrnsdired.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNwcWtscmFwb3Z1Z3Juc2RpcmVkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY1NTEyMzcsImV4cCI6MjA3MjEyNzIzN30.xO0_mr3-edoMA7jKCLJvkoa4w8EEQ-66ilATA9xv8j4';

// Try to get from environment variables first, fallback to hardcoded values
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || SUPABASE_ANON_KEY;

console.log('Supabase Environment check:', {
  hasUrl: !!supabaseUrl,
  hasKey: !!supabaseAnonKey,
  url: supabaseUrl ? `${supabaseUrl.substring(0, 30)}...` : 'missing',
  key: supabaseAnonKey ? `${supabaseAnonKey.substring(0, 20)}...` : 'missing',
  mode: import.meta.env.MODE,
  source: import.meta.env.VITE_SUPABASE_URL ? 'env_vars' : 'hardcoded'
});

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey);

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