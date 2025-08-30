/*
  # Fix RLS Policy for Anonymous Consultation Submissions

  1. Security Changes
    - Drop existing policies that may be blocking anonymous access
    - Create new policy to explicitly allow anonymous consultation submissions
    - Ensure authenticated users can still read consultation requests

  2. Notes
    - This fixes the "new row violates row-level security policy" error
    - Allows both anonymous and authenticated users to submit consultation requests
    - Maintains security by only allowing inserts, not updates or deletes
*/

-- Drop existing policies to start fresh
DROP POLICY IF EXISTS "Allow anonymous consultation submissions" ON consultation_requests;
DROP POLICY IF EXISTS "Authenticated users can read consultation requests" ON consultation_requests;

-- Create new policy that explicitly allows anonymous inserts
CREATE POLICY "Enable anonymous consultation submissions"
  ON consultation_requests
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Create policy for reading consultation requests (authenticated users only)
CREATE POLICY "Enable authenticated read access"
  ON consultation_requests
  FOR SELECT
  TO authenticated
  USING (true);