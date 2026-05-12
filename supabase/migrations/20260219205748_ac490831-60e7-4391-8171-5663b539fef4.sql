
-- Create leads table
CREATE TABLE public.leads (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  zip_code text NOT NULL,
  notes text,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Admins can read all leads
CREATE POLICY "Admins can read leads"
ON public.leads FOR SELECT
USING (is_admin(auth.uid()));

-- Anyone can insert a lead (public form)
CREATE POLICY "Anyone can insert leads"
ON public.leads FOR INSERT
WITH CHECK (true);

-- Admins can delete leads
CREATE POLICY "Admins can delete leads"
ON public.leads FOR DELETE
USING (is_admin(auth.uid()));
