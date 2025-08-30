/*
  # Fix RLS Policy for Consultation Requests

  1. Security Updates
    - Drop existing INSERT policy that may be misconfigured
    - Create new INSERT policy that properly allows anonymous form submissions
    - Ensure anonymous users can submit consultation requests without authentication

  This migration fixes the RLS policy violation error that prevents anonymous users
  from submitting consultation forms.
*/

-- Drop the existing INSERT policy if it exists
DROP POLICY IF EXISTS "Allow anonymous form submissions" ON consultation_requests;

-- Create a new INSERT policy that allows anonymous users to submit consultation requests
CREATE POLICY "Allow anonymous form submissions"
  ON consultation_requests
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Ensure the existing SELECT policy remains intact for authenticated users
-- (This should already exist based on the schema, but we'll recreate it to be safe)
DROP POLICY IF EXISTS "Authenticated users can read consultation requests" ON consultation_requests;

CREATE POLICY "Authenticated users can read consultation requests"
  ON consultation_requests
  FOR SELECT
  TO authenticated
  USING (true);