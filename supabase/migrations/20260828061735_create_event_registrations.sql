/*
# Create event_registrations table (single-tenant, no auth)

1. New Tables
- `event_registrations`
  - `id` (uuid, primary key)
  - `name` (text, not null) — 신청자 이름
  - `phone` (text, not null) — 신청자 전화번호
  - `created_at` (timestamptz, default now) — 신청 시간

2. Security
- Enable RLS on `event_registrations`.
- Allow anon + authenticated CRUD — this is a public event sign-up form with no login.
*/

CREATE TABLE IF NOT EXISTS event_registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  phone text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE event_registrations ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_registrations" ON event_registrations;
CREATE POLICY "anon_select_registrations" ON event_registrations FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_registrations" ON event_registrations;
CREATE POLICY "anon_insert_registrations" ON event_registrations FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_registrations" ON event_registrations;
CREATE POLICY "anon_update_registrations" ON event_registrations FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_registrations" ON event_registrations;
CREATE POLICY "anon_delete_registrations" ON event_registrations FOR DELETE
  TO anon, authenticated USING (true);
