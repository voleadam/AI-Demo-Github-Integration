import { createClient } from '@supabase/supabase-js';

// Get environment variables - check multiple possible sources
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 
                   import.meta.env.SUPABASE_URL ||
                   import.meta.env.REACT_APP_SUPABASE_URL;
                   
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 
                       import.meta.env.SUPABASE_ANON_KEY ||
                       import.meta.env.REACT_APP_SUPABASE_ANON_KEY;

console.log('Supabase Environment check:', {
  hasUrl: !!supabaseUrl,
  hasKey: !!supabaseAnonKey,
  url: supabaseUrl ? `${supabaseUrl.substring(0, 30)}...` : 'missing',
  key: supabaseAnonKey ? `${supabaseAnonKey.substring(0, 20)}...` : 'missing',
  mode: import.meta.env.MODE,
  allEnvVars: Object.keys(import.meta.env),
  viteVars: Object.keys(import.meta.env).filter(key => key.startsWith('VITE_')),
  supabaseVars: Object.keys(import.meta.env).filter(key => key.toLowerCase().includes('supabase'))
});

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('⚠️ Supabase environment variables not found. Running in demo mode.');
  console.log('💡 Make sure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set in your deployment environment.');
}

export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export const isSupabaseConfigured = !!supabase;

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
  if (!supabase) {
    throw new Error('Supabase is not configured. Running in demo mode.');
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
  if (!supabase) {
    throw new Error('Supabase is not configured. Running in demo mode.');
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