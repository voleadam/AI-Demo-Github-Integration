/*
  # Fix RLS policy for anonymous consultation submissions

  1. Security Changes
    - Drop existing restrictive INSERT policy
    - Create new policy allowing anonymous users to submit consultation requests
    - Keep SELECT policy restricted to authenticated users only

  2. Notes
    - This allows public form submissions while maintaining data privacy
    - Only authenticated users (admin) can read the submitted requests
*/

-- Drop the existing INSERT policy that might be too restrictive
DROP POLICY IF EXISTS "Allow public consultation submissions" ON consultation_requests;

-- Create a new policy that explicitly allows anonymous users to insert
CREATE POLICY "Enable anonymous consultation submissions"
  ON consultation_requests
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Ensure the SELECT policy is still restrictive (only authenticated users can read)
DROP POLICY IF EXISTS "Authenticated users can read consultation requests" ON consultation_requests;

CREATE POLICY "Only authenticated users can read consultation requests"
  ON consultation_requests
  FOR SELECT
  TO authenticated
  USING (true);