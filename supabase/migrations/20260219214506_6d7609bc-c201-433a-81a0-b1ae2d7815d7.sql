
-- Create kanban_stages table
CREATE TABLE public.kanban_stages (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  sort_order integer NOT NULL DEFAULT 0,
  color text NOT NULL DEFAULT '#3b82f6',
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS on kanban_stages
ALTER TABLE public.kanban_stages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read kanban stages"
  ON public.kanban_stages FOR SELECT USING (true);

CREATE POLICY "Admins can insert kanban stages"
  ON public.kanban_stages FOR INSERT
  WITH CHECK (is_admin(auth.uid()));

CREATE POLICY "Admins can update kanban stages"
  ON public.kanban_stages FOR UPDATE
  USING (is_admin(auth.uid()));

CREATE POLICY "Admins can delete kanban stages"
  ON public.kanban_stages FOR DELETE
  USING (is_admin(auth.uid()));

-- Insert default stages
INSERT INTO public.kanban_stages (name, sort_order, color) VALUES
  ('New Leads', 0, '#6366f1'),
  ('Contacted', 1, '#3b82f6'),
  ('Qualified', 2, '#f59e0b'),
  ('Proposal Sent', 3, '#8b5cf6'),
  ('Closed', 4, '#10b981');

-- Add stage_id to leads table
ALTER TABLE public.leads ADD COLUMN stage_id uuid REFERENCES public.kanban_stages(id) ON DELETE SET NULL;

-- Add sort_order to leads for card ordering
ALTER TABLE public.leads ADD COLUMN sort_order integer NOT NULL DEFAULT 0;

-- Allow admins to update leads (for moving between stages)
CREATE POLICY "Admins can update leads"
  ON public.leads FOR UPDATE
  USING (is_admin(auth.uid()));
