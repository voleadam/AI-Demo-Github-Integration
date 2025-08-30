/*
  # Fix RLS policy for consultation requests

  1. Security Updates
    - Update RLS policy to properly allow anonymous users to insert consultation requests
    - Ensure the policy allows both anonymous and authenticated users to submit requests
    - Keep read access restricted to authenticated users only

  2. Changes
    - Drop existing INSERT policy that may be too restrictive
    - Create new INSERT policy that explicitly allows anonymous submissions
    - Verify SELECT policy remains secure for authenticated users only
*/

-- Drop the existing INSERT policy if it exists
DROP POLICY IF EXISTS "Anyone can submit consultation requests" ON consultation_requests;

-- Create a new INSERT policy that explicitly allows anonymous users
CREATE POLICY "Allow anonymous consultation submissions"
  ON consultation_requests
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Ensure the SELECT policy is still secure (only authenticated users can read)
DROP POLICY IF EXISTS "Authenticated users can read all consultation requests" ON consultation_requests;

CREATE POLICY "Only authenticated users can read consultation requests"
  ON consultation_requests
  FOR SELECT
  TO authenticated
  USING (true);