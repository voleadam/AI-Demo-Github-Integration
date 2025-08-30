import { createClient } from '@supabase/supabase-js';


// Netlify Supabase integration uses specific environment variable names
const supabaseUrl = process.env.SUPABASE_DATABASE_URL || 
                   import.meta.env.VITE_SUPABASE_URL;
                   
const supabaseAnonKey = process.env.PUBLIC_SUPABASE_ANON_KEY || 
                       import.meta.env.VITE_SUPABASE_ANON_KEY;

console.log('Supabase Environment check:', {
  hasUrl: !!supabaseUrl,
  hasKey: !!supabaseAnonKey,
  url: supabaseUrl ? `${supabaseUrl.substring(0, 30)}...` : 'missing',
  key: supabaseAnonKey ? `${supabaseAnonKey.substring(0, 20)}...` : 'missing',
  mode: import.meta.env.MODE,
  source: process.env.SUPABASE_DATABASE_URL ? 'netlify_env' : 'vite_env'
});

export const supabase = createClient(supabaseUrl!, supabaseAnonKey!);
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