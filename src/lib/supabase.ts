// Supabase integration removed
// Form submissions will now work in demo mode only

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

// Demo function to simulate form submission
export async function submitConsultationRequest(
  data: Omit<ConsultationRequest, 'id' | 'created_at' | 'updated_at'>
) {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Log the form data for demo purposes
  console.log('Demo form submission:', {
    ...data,
    id: `demo_${Date.now()}`,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  });
  
  // Simulate successful submission
  return {
    ...data,
    id: `demo_${Date.now()}`,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
}