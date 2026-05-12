
-- Add square_footage to leads
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS square_footage text DEFAULT NULL;

-- Add scheduled_at to posts for scheduled publishing
ALTER TABLE public.posts ADD COLUMN IF NOT EXISTS scheduled_at timestamp with time zone DEFAULT NULL;
