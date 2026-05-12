export interface Pipeline {
  id: string;
  name: string;
  color: string;
  sort_order: number;
  created_at: string;
}

export interface Stage {
  id: string;
  name: string;
  sort_order: number;
  color: string;
  pipeline_id: string | null;
  created_at: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  zip_code: string;
  square_footage: string | null;
  notes: string | null;
  created_at: string;
  stage_id: string | null;
  sort_order: number;
  scheduled_date: string | null;
  scheduled_time: string | null;
  pipeline_id: string | null;
  service_id: string | null;
  calendly_event_uri: string | null;
}

export interface LeadNote {
  id: string;
  lead_id: string;
  content: string;
  note_type: string;
  created_at: string;
  created_by: string | null;
}

export interface StageHistory {
  id: string;
  lead_id: string;
  from_stage_id: string | null;
  to_stage_id: string;
  changed_at: string;
  changed_by: string | null;
}

export interface ServiceOption {
  id: string;
  title: string;
  slug: string;
}

export const noteTypeConfig: Record<string, { label: string; icon: string; color: string }> = {
  note: { label: "Note", icon: "StickyNote", color: "text-blue-500 bg-blue-50" },
  call: { label: "Call", icon: "PhoneCall", color: "text-green-500 bg-green-50" },
  email: { label: "Email", icon: "Send", color: "text-purple-500 bg-purple-50" },
  meeting: { label: "Meeting", icon: "Users", color: "text-amber-500 bg-amber-50" },
  status_change: { label: "Status", icon: "ArrowRight", color: "text-slate-500 bg-slate-50" },
};
