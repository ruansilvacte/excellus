
-- Table for per-page SEO settings
CREATE TABLE public.page_seo (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  page_slug TEXT NOT NULL UNIQUE,
  page_name TEXT NOT NULL DEFAULT '',
  meta_title TEXT NOT NULL DEFAULT '',
  meta_description TEXT NOT NULL DEFAULT '',
  og_title TEXT NOT NULL DEFAULT '',
  og_description TEXT NOT NULL DEFAULT '',
  og_image TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.page_seo ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read page SEO" ON public.page_seo FOR SELECT USING (true);
CREATE POLICY "Admins can insert page SEO" ON public.page_seo FOR INSERT WITH CHECK (is_admin(auth.uid()));
CREATE POLICY "Admins can update page SEO" ON public.page_seo FOR UPDATE USING (is_admin(auth.uid()));
CREATE POLICY "Admins can delete page SEO" ON public.page_seo FOR DELETE USING (is_admin(auth.uid()));

-- Table for service areas
CREATE TABLE public.service_areas (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  city TEXT NOT NULL DEFAULT '',
  region TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.service_areas ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read active service areas" ON public.service_areas FOR SELECT USING (true);
CREATE POLICY "Admins can insert service areas" ON public.service_areas FOR INSERT WITH CHECK (is_admin(auth.uid()));
CREATE POLICY "Admins can update service areas" ON public.service_areas FOR UPDATE USING (is_admin(auth.uid()));
CREATE POLICY "Admins can delete service areas" ON public.service_areas FOR DELETE USING (is_admin(auth.uid()));

-- Seed default pages for SEO
INSERT INTO public.page_seo (page_slug, page_name, meta_title, meta_description) VALUES
  ('/', 'Home', 'Navy Cleaning Solutions — Professional Cleaning in Massachusetts', 'Family-owned cleaning company with 15 years of experience serving Massachusetts.'),
  ('/services', 'Services', 'Our Services — Navy Cleaning Solutions', 'Regular, deep, post-construction, and move in/out cleaning services.'),
  ('/about', 'About', 'About Us — Navy Cleaning Solutions', 'Learn about our family-owned cleaning company with 15+ years of experience.'),
  ('/blog', 'Blog', 'Blog — Navy Cleaning Solutions', 'Tips, guides and news about professional cleaning.');

-- Seed default service areas
INSERT INTO public.service_areas (name, city, region, sort_order) VALUES
  ('Westborough', 'Westborough', 'Central MA', 1),
  ('Northborough', 'Northborough', 'Central MA', 2),
  ('Southborough', 'Southborough', 'Central MA', 3),
  ('Shrewsbury', 'Shrewsbury', 'Central MA', 4),
  ('Worcester', 'Worcester', 'Central MA', 5),
  ('Framingham', 'Framingham', 'MetroWest', 6),
  ('Ashland', 'Ashland', 'MetroWest', 7),
  ('Natick', 'Natick', 'MetroWest', 8),
  ('Needham', 'Needham', 'MetroWest', 9),
  ('Holliston', 'Holliston', 'MetroWest', 10),
  ('Millis', 'Millis', 'MetroWest', 11);
