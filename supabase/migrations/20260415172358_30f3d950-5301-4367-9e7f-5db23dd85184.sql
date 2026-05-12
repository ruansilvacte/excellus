-- Table for lead notes / history
CREATE TABLE public.lead_notes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id uuid NOT NULL REFERENCES public.leads(id) ON DELETE CASCADE,
  content text NOT NULL DEFAULT '',
  note_type text NOT NULL DEFAULT 'note',
  created_at timestamptz NOT NULL DEFAULT now(),
  created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL
);

ALTER TABLE public.lead_notes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can read lead notes" ON public.lead_notes FOR SELECT TO authenticated USING (public.is_admin(auth.uid()));
CREATE POLICY "Admins can insert lead notes" ON public.lead_notes FOR INSERT TO authenticated WITH CHECK (public.is_admin(auth.uid()));
CREATE POLICY "Admins can update lead notes" ON public.lead_notes FOR UPDATE TO authenticated USING (public.is_admin(auth.uid()));
CREATE POLICY "Admins can delete lead notes" ON public.lead_notes FOR DELETE TO authenticated USING (public.is_admin(auth.uid()));

CREATE TABLE public.lead_stage_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id uuid NOT NULL REFERENCES public.leads(id) ON DELETE CASCADE,
  from_stage_id uuid REFERENCES public.kanban_stages(id) ON DELETE SET NULL,
  to_stage_id uuid NOT NULL REFERENCES public.kanban_stages(id) ON DELETE CASCADE,
  changed_at timestamptz NOT NULL DEFAULT now(),
  changed_by uuid REFERENCES auth.users(id) ON DELETE SET NULL
);

ALTER TABLE public.lead_stage_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can read stage history" ON public.lead_stage_history FOR SELECT TO authenticated USING (public.is_admin(auth.uid()));
CREATE POLICY "Admins can insert stage history" ON public.lead_stage_history FOR INSERT TO authenticated WITH CHECK (public.is_admin(auth.uid()));