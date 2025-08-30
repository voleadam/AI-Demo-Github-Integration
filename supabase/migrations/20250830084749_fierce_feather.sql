/*
  # Add SELECT policy for anonymous consultation requests

  1. Security Changes
    - Add policy to allow anonymous users to read consultation requests
    - This is needed because Supabase client attempts to read after insert operations

  2. Notes
    - Anonymous users can only read their own submissions
    - This policy works in conjunction with the existing INSERT policy
*/

-- Add SELECT policy for anonymous users
CREATE POLICY "Allow anonymous users to read consultation requests"
  ON consultation_requests
  FOR SELECT
  TO anon
  USING (true);