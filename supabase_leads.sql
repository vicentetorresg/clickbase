-- Tabla de leads consultables
-- Ejecutar en: https://supabase.com/dashboard/project/miniimuzpqiuibeciofy/sql

CREATE TABLE IF NOT EXISTS leads (
  id           uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at   timestamptz DEFAULT now(),
  name         text,
  email        text,
  phone        text,
  company      text,
  rubro        text,
  budget       text,
  message      text,
  source       text,
  referrer     text,
  user_agent   text,
  device       text,
  utm_source   text,
  utm_medium   text,
  utm_campaign text,
  utm_content  text,
  channel      text        DEFAULT 'web_form'
);

CREATE INDEX IF NOT EXISTS leads_created_at_idx ON leads (created_at DESC);
CREATE INDEX IF NOT EXISTS leads_source_idx ON leads (source);
CREATE INDEX IF NOT EXISTS leads_phone_idx ON leads (phone);
CREATE INDEX IF NOT EXISTS leads_email_idx ON leads (email);

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'leads'
      AND policyname = 'insert_leads_anon'
  ) THEN
    CREATE POLICY "insert_leads_anon"
      ON leads FOR INSERT TO anon WITH CHECK (true);
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'leads'
      AND policyname = 'select_leads_anon'
  ) THEN
    CREATE POLICY "select_leads_anon"
      ON leads FOR SELECT TO anon USING (true);
  END IF;
END $$;
