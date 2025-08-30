import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Create Supabase client if environment variables are available
export const supabase = (() => {
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase environment variables not found. Please check your .env file.');
    return null;
  }
  
  try {
    return createClient(supabaseUrl, supabaseAnonKey);
  } catch (error) {
    console.error('Failed to initialize Supabase client:', error);
    return null;
  }
})();

// Types for our consultation request
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

// Function to submit consultation request
export async function submitConsultationRequest(
  data: Omit<ConsultationRequest, 'id' | 'created_at' | 'updated_at'>,
  supabaseClient = supabase
) {
  if (!supabaseClient) {
    throw new Error('Supabase client not available');
  }

  const { data: result, error } = await supabaseClient
    .from('consultation_requests')
    .insert([data])
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to submit consultation request: ${error.message}`);
  }

  return result;
}