/*
  # Create consultation requests table

  1. New Tables
    - `consultation_requests`
      - `id` (uuid, primary key)
      - `name` (text, required) - Full name of the person requesting consultation
      - `email` (text, required) - Email address for contact
      - `selected_service` (text, required) - Type of AI service they're interested in
      - `company_name` (text, required) - Name of their company
      - `problems` (text, required) - Description of problems they want to solve
      - `additional_info` (text, optional) - Any additional information or requirements
      - `created_at` (timestamp) - When the request was submitted
      - `updated_at` (timestamp) - When the request was last modified

  2. Security
    - Enable RLS on `consultation_requests` table
    - Add policy for public insert access (anyone can submit a consultation request)
    - Add policy for authenticated users to read all consultation requests (for admin access)

  3. Indexes
    - Add index on email for faster lookups
    - Add index on created_at for chronological sorting
*/

CREATE TABLE IF NOT EXISTS consultation_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  selected_service text NOT NULL,
  company_name text NOT NULL,
  problems text NOT NULL,
  additional_info text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE consultation_requests ENABLE ROW LEVEL SECURITY;

-- Policy to allow anyone to insert consultation requests (public form submission)
CREATE POLICY "Anyone can submit consultation requests"
  ON consultation_requests
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Policy to allow authenticated users to read all consultation requests (for admin access)
CREATE POLICY "Authenticated users can read all consultation requests"
  ON consultation_requests
  FOR SELECT
  TO authenticated
  USING (true);

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_consultation_requests_email ON consultation_requests(email);
CREATE INDEX IF NOT EXISTS idx_consultation_requests_created_at ON consultation_requests(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_consultation_requests_service ON consultation_requests(selected_service);

-- Function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically update updated_at on row updates
CREATE TRIGGER update_consultation_requests_updated_at
  BEFORE UPDATE ON consultation_requests
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();