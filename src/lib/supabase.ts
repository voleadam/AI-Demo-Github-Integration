import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const anon = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase =
  url && anon ? createClient(url, anon) : null;

export function assertSupabase() {
  if (!supabase) {
    console.warn('Supabase env vars missing. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.');
  }
  return supabase;
}

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
export async function submitConsultationRequest(data: Omit<ConsultationRequest, 'id' | 'created_at' | 'updated_at'>) {
  const supabaseClient = assertSupabase();
  
  if (!supabaseClient) {
    throw new Error('Supabase is not configured. Please set up your environment variables.');
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