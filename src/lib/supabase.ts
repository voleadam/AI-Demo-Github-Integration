import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if Supabase is configured
export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey);

// Only create client if properly configured
export const supabase = isSupabaseConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;
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
  // If Supabase is not configured, simulate success for demo purposes
  if (!isSupabaseConfigured || !supabase) {
    console.log('Demo mode: Form submission would be saved to database:', data);
    return {
      id: 'demo-' + Date.now(),
      ...data,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
  }

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
  // If Supabase is not configured, return empty array
  if (!isSupabaseConfigured || !supabase) {
    console.log('Demo mode: No database connection available');
    return [];
  }

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