/*
  # Fix RLS policy for consultation requests

  1. Security Updates
    - Drop existing restrictive INSERT policy
    - Create new policy allowing anonymous users to submit consultation requests
    - Maintain existing SELECT policy for authenticated users only

  2. Changes
    - Allow both anonymous (anon) and authenticated users to INSERT
    - Keep SELECT restricted to authenticated users only
*/

-- Drop the existing INSERT policy that might be too restrictive
DROP POLICY IF EXISTS "Enable anonymous consultation submissions" ON consultation_requests;

-- Create a new policy that explicitly allows anonymous insertions
CREATE POLICY "Allow anonymous consultation submissions"
  ON consultation_requests
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Ensure the SELECT policy exists for authenticated users
DROP POLICY IF EXISTS "Only authenticated users can read consultation requests" ON consultation_requests;

CREATE POLICY "Authenticated users can read consultation requests"
  ON consultation_requests
  FOR SELECT
  TO authenticated
  USING (true);