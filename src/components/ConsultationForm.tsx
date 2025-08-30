import React, { useState } from 'react';
import { ArrowLeft, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { submitConsultationRequest, ConsultationRequest } from '../lib/supabase';

interface ConsultationFormProps {
  onBack: () => void;
}

type FormData = Omit<ConsultationRequest, 'id' | 'created_at' | 'updated_at'>;

type SubmissionState = 'idle' | 'submitting' | 'success' | 'error';

const ConsultationForm: React.FC<ConsultationFormProps> = ({ onBack }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    selected_service: '',
    company_name: '',
    problems: '',
    additional_info: ''
  });

  const [submissionState, setSubmissionState] = useState<SubmissionState>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const serviceOptions = [
    { value: '', label: 'Select a service...', disabled: true },
    { value: 'AI Agent', label: 'AI Agent' },
    { value: 'AI Phone Agent', label: 'AI Phone Agent' },
    { value: 'Email Automation', label: 'Email Automation' },
    { value: 'Social Media Automation', label: 'Social Media Automation' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = (): boolean => {
    const requiredFields: (keyof FormData)[] = ['name', 'email', 'selected_service', 'company_name', 'problems'];
    
    for (const field of requiredFields) {
      if (!formData[field] || formData[field].trim() === '') {
        return false;
      }
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setErrorMessage('Please fill in all required fields with valid information.');
      return;
    }

    setSubmissionState('submitting');
    setErrorMessage('');

    try {
      const result = await submitConsultationRequest(formData);
      console.log('Consultation request submitted successfully:', result);
      setSubmissionState('success');
    } catch (error) {
      setSubmissionState('error');
      setErrorMessage(error instanceof Error ? error.message : 'Failed to submit consultation request. Please try again.');
      console.error('Submission error:', error);
    }
  };

  if (submissionState === 'success') {
    return (
      <div className="min-h-screen bg-black text-white font-mono flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center">
          <div className="mb-8">
            <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4 tracking-tight">
              {'>'}REQUEST_SUBMITTED
            </h2>
            <p className="text-gray-300 mb-6 font-medium">
              Your consultation request has been successfully processed. Our AI automation specialists will contact you within 24 hours to schedule your consultation.
            </p>
            <div className="text-sm text-gray-500 mb-8 font-medium">
              {'>'}Confirmation sent to: {formData.email}
            </div>
          </div>
          
          <button
            onClick={onBack}
            className="px-8 py-3 border border-gray-600 text-white hover:bg-white hover:text-black transition-all duration-300 font-bold tracking-wider"
          >
            [ RETURN_TO_MAIN ]
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white font-mono">
      {/* Header */}
      <header className="flex items-center justify-between p-6 lg:p-8 border-b border-gray-800">
        <button
          onClick={onBack}
          className="flex items-center text-gray-400 hover:text-white transition-colors font-medium tracking-wider"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          [ BACK ]
        </button>
        <div className="text-xl font-bold tracking-wider">
          <span className="text-white">PABLO.AI</span>
          <span className="text-gray-500 ml-2">[CONSULTATION]</span>
        </div>
      </header>

      {/* Form Content */}
      <div className="container mx-auto px-6 lg:px-8 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Introduction */}
          <div className="mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 tracking-tight">
              {'>'}CONSULTATION_REQUEST
            </h1>
            <p className="text-gray-300 text-lg mb-4 font-medium">
              Complete this form to schedule a personalized consultation with our AI automation specialists. We'll analyze your specific requirements and design a custom solution for your business.
            </p>
            <div className="text-sm text-gray-500 font-medium">
              {'>'}All fields marked with * are required for processing
            </div>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="mb-6 p-4 border border-red-500 bg-red-500/10 flex items-center">
              <AlertCircle className="w-5 h-5 text-red-400 mr-3 flex-shrink-0" />
              <span className="text-red-400 font-medium">{errorMessage}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Name Field */}
            <div>
              <label className="block text-sm font-bold text-gray-300 mb-3 tracking-wider">
                {'>'}FULL_NAME *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-4 bg-black border border-gray-600 text-white focus:border-white outline-none transition-all duration-300 font-mono text-lg"
                placeholder="Enter your full name"
              />
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm font-bold text-gray-300 mb-3 tracking-wider">
                {'>'}EMAIL_ADDRESS *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-4 bg-black border border-gray-600 text-white focus:border-white outline-none transition-all duration-300 font-mono text-lg"
                placeholder="Enter your email address"
              />
            </div>

            {/* Service Selection */}
            <div>
              <label className="block text-sm font-bold text-gray-300 mb-3 tracking-wider">
                {'>'}SERVICE_SELECTION *
              </label>
              <select
                name="selected_service"
                value={formData.selected_service}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-4 bg-black border border-gray-600 text-white focus:border-white outline-none transition-all duration-300 font-mono text-lg"
              >
                {serviceOptions.map((option) => (
                  <option 
                    key={option.value} 
                    value={option.value} 
                    disabled={option.disabled}
                    className="bg-black text-white"
                  >
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Company Name */}
            <div>
              <label className="block text-sm font-bold text-gray-300 mb-3 tracking-wider">
                {'>'}COMPANY_NAME *
              </label>
              <input
                type="text"
                name="company_name"
                value={formData.company_name}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-4 bg-black border border-gray-600 text-white focus:border-white outline-none transition-all duration-300 font-mono text-lg"
                placeholder="Enter your company name"
              />
            </div>

            {/* Problems Field */}
            <div>
              <label className="block text-sm font-bold text-gray-300 mb-3 tracking-wider">
                {'>'}PROBLEMS_TO_SOLVE *
              </label>
              <textarea
                name="problems"
                value={formData.problems}
                onChange={handleInputChange}
                required
                rows={4}
                className="w-full px-4 py-4 bg-black border border-gray-600 text-white focus:border-white outline-none transition-all duration-300 resize-none font-mono text-lg"
                placeholder="Describe the specific problems or challenges you're looking to solve with AI automation..."
              />
            </div>

            {/* Additional Information */}
            <div>
              <label className="block text-sm font-bold text-gray-300 mb-3 tracking-wider">
                {'>'}ADDITIONAL_INFORMATION
              </label>
              <textarea
                name="additional_info"
                value={formData.additional_info}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-4 py-4 bg-black border border-gray-600 text-white focus:border-white outline-none transition-all duration-300 resize-none font-mono text-lg"
                placeholder="Any additional details, timeline requirements, or specific questions..."
              />
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={submissionState === 'submitting'}
                className="w-full py-6 bg-white text-black font-bold text-lg tracking-wider hover:bg-gray-200 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {submissionState === 'submitting' ? (
                  <>
                    <div className="animate-spin w-5 h-5 border-2 border-black border-t-transparent rounded-full mr-3" />
                    [ PROCESSING_REQUEST ]
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-3" />
                    [ SUBMIT_CONSULTATION_REQUEST ]
                  </>
                )}
              </button>
            </div>

            {/* Form Footer */}
            <div className="text-xs text-gray-500 text-center pt-4 font-medium">
              {'>'}Secure form submission. Your information is protected and will only be used for consultation purposes.
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ConsultationForm;