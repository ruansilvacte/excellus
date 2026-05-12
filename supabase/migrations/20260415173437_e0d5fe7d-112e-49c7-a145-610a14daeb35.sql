
-- Create pipelines table
CREATE TABLE public.pipelines (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  color text NOT NULL DEFAULT '#3b82f6',
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.pipelines ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read pipelines" ON public.pipelines FOR SELECT TO public USING (true);
CREATE POLICY "Admins can insert pipelines" ON public.pipelines FOR INSERT TO authenticated WITH CHECK (public.is_admin(auth.uid()));
CREATE POLICY "Admins can update pipelines" ON public.pipelines FOR UPDATE TO authenticated USING (public.is_admin(auth.uid()));
CREATE POLICY "Admins can delete pipelines" ON public.pipelines FOR DELETE TO authenticated USING (public.is_admin(auth.uid()));

-- Add pipeline_id to kanban_stages
ALTER TABLE public.kanban_stages ADD COLUMN pipeline_id uuid REFERENCES public.pipelines(id) ON DELETE CASCADE;

-- Add pipeline_id and service_id to leads
ALTER TABLE public.leads ADD COLUMN pipeline_id uuid REFERENCES public.pipelines(id) ON DELETE SET NULL;
ALTER TABLE public.leads ADD COLUMN service_id uuid REFERENCES public.services(id) ON DELETE SET NULL;
ALTER TABLE public.leads ADD COLUMN calendly_event_uri text;

-- Insert default pipeline
INSERT INTO public.pipelines (id, name, color, sort_order)
VALUES ('00000000-0000-0000-0000-000000000001', 'Main Pipeline', '#3b82f6', 0);

-- Assign existing stages to default pipeline
UPDATE public.kanban_stages SET pipeline_id = '00000000-0000-0000-0000-000000000001';

-- Assign existing leads to default pipeline
UPDATE public.leads SET pipeline_id = '00000000-0000-0000-0000-000000000001';

-- Insert default stages if none exist
INSERT INTO public.kanban_stages (name, sort_order, color, pipeline_id)
SELECT name, sort_order, color, '00000000-0000-0000-0000-000000000001'
FROM (VALUES
  ('New Lead', 0, '#3b82f6'),
  ('Contacted', 1, '#8b5cf6'),
  ('Quoted', 2, '#f59e0b'),
  ('Scheduled', 3, '#10b981'),
  ('Completed', 4, '#22c55e')
) AS defaults(name, sort_order, color)
WHERE NOT EXISTS (SELECT 1 FROM public.kanban_stages LIMIT 1);

-- Add calendly API key setting
INSERT INTO public.site_settings (key, value)
VALUES ('calendly_api_key', '')
ON CONFLICT (key) DO NOTHING;
