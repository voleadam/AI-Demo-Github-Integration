/*
  # Fix RLS policy for anonymous consultation form submissions

  1. Policy Updates
    - Drop existing INSERT policy that may be misconfigured
    - Create new INSERT policy that explicitly allows anonymous users
    - Ensure the policy allows all consultation form submissions

  2. Security
    - Maintains RLS protection while allowing public form submissions
    - Only affects INSERT operations for consultation_requests table
*/

-- Drop the existing INSERT policy if it exists
DROP POLICY IF EXISTS "Allow anonymous form submissions" ON consultation_requests;

-- Create a new INSERT policy that explicitly allows anonymous users
CREATE POLICY "Enable anonymous consultation submissions"
  ON consultation_requests
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Ensure RLS is enabled (should already be enabled)
ALTER TABLE consultation_requests ENABLE ROW LEVEL SECURITY;