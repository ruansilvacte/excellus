
-- Add scheduling columns to leads
ALTER TABLE public.leads
ADD COLUMN scheduled_date date,
ADD COLUMN scheduled_time text;

-- Prevent duplicate bookings on the same date+time
CREATE UNIQUE INDEX idx_leads_unique_schedule
ON public.leads (scheduled_date, scheduled_time)
WHERE scheduled_date IS NOT NULL AND scheduled_time IS NOT NULL;
