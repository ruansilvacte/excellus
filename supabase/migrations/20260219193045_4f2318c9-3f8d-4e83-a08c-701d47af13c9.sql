
-- Create services table
CREATE TABLE public.services (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug text NOT NULL UNIQUE,
  title text NOT NULL DEFAULT '',
  duration text NOT NULL DEFAULT '',
  description text NOT NULL DEFAULT '',
  image text NOT NULL DEFAULT '',
  includes text[] NOT NULL DEFAULT '{}',
  intro text NOT NULL DEFAULT '',
  sections jsonb NOT NULL DEFAULT '[]',
  not_included text[] NOT NULL DEFAULT '{}',
  extras text[] NOT NULL DEFAULT '{}',
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

-- Public can read services
CREATE POLICY "Anyone can read services"
ON public.services FOR SELECT
USING (true);

-- Admins can insert
CREATE POLICY "Admins can insert services"
ON public.services FOR INSERT
WITH CHECK (is_admin(auth.uid()));

-- Admins can update
CREATE POLICY "Admins can update services"
ON public.services FOR UPDATE
USING (is_admin(auth.uid()));

-- Admins can delete
CREATE POLICY "Admins can delete services"
ON public.services FOR DELETE
USING (is_admin(auth.uid()));

-- Trigger to update updated_at
CREATE TRIGGER update_services_updated_at
BEFORE UPDATE ON public.services
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
