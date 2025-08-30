/*
  # Fix RLS policy for consultation requests

  1. Security Updates
    - Drop existing INSERT policy that may be too restrictive
    - Create new policy allowing anonymous users to submit consultation requests
    - Maintain read restrictions for authenticated users only

  2. Changes
    - Allow anonymous (public) users to insert consultation requests
    - Keep SELECT policy restricted to authenticated users
*/

-- Drop the existing INSERT policy if it exists
DROP POLICY IF EXISTS "Allow anonymous consultation submissions" ON consultation_requests;

-- Create a new policy that explicitly allows anonymous users to insert
CREATE POLICY "Allow public consultation submissions"
  ON consultation_requests
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Ensure the SELECT policy exists and is properly configured
DROP POLICY IF EXISTS "Only authenticated users can read consultation requests" ON consultation_requests;

CREATE POLICY "Authenticated users can read consultation requests"
  ON consultation_requests
  FOR SELECT
  TO authenticated
  USING (true);