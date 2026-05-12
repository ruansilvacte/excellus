import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Mail, Phone, MapPin, Calendar, Ruler, StickyNote, Clock, ArrowRight,
  MessageSquare, PhoneCall, Send, Users, FileText, Trash2, Plus, Sparkles,
} from "lucide-react";
import { format } from "date-fns";
import type { Lead, Stage, LeadNote, StageHistory, Pipeline, ServiceOption } from "./types";

const noteIcons: Record<string, React.ElementType> = {
  note: StickyNote, call: PhoneCall, email: Send, meeting: Users, status_change: ArrowRight,
};
const noteColors: Record<string, string> = {
  note: "text-blue-500 bg-blue-50", call: "text-green-500 bg-green-50",
  email: "text-purple-500 bg-purple-50", meeting: "text-amber-500 bg-amber-50",
  status_change: "text-slate-500 bg-slate-50",
};
const noteLabels: Record<string, string> = {
  note: "Note", call: "Call", email: "Email", meeting: "Meeting", status_change: "Status",
};

interface Props {
  lead: Lead | null;
  open: boolean;
  onClose: () => void;
  stages: Stage[];
  pipelines: Pipeline[];
  services: ServiceOption[];
  onMoveToPipeline?: (leadId: string, pipelineId: string) => void;
}

export default function LeadDetailModal({ lead, open, onClose, stages, pipelines, services, onMoveToPipeline }: Props) {
  const { user } = useAuth();
  const qc = useQueryClient();
  const { toast } = useToast();
  const [newNote, setNewNote] = useState("");
  const [noteType, setNoteType] = useState("note");

  const { data: notes = [] } = useQuery({
    queryKey: ["lead_notes", lead?.id],
    enabled: !!lead?.id && open,
    queryFn: async () => {
      const { data, error } = await supabase.from("lead_notes").select("*").eq("lead_id", lead!.id).order("created_at", { ascending: false });
      if (error) throw error;
      return data as LeadNote[];
    },
  });

  const { data: history = [] } = useQuery({
    queryKey: ["lead_stage_history", lead?.id],
    enabled: !!lead?.id && open,
    queryFn: async () => {
      const { data, error } = await supabase.from("lead_stage_history").select("*").eq("lead_id", lead!.id).order("changed_at", { ascending: true });
      if (error) throw error;
      return data as StageHistory[];
    },
  });

  const addNote = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from("lead_notes").insert({
        lead_id: lead!.id, content: newNote.trim(), note_type: noteType, created_by: user?.id ?? null,
      });
      if (error) throw error;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["lead_notes", lead?.id] }); setNewNote(""); toast({ title: "Note added" }); },
  });

  const deleteNote = useMutation({
    mutationFn: async (noteId: string) => {
      const { error } = await supabase.from("lead_notes").delete().eq("id", noteId);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["lead_notes", lead?.id] }),
  });

  if (!lead) return null;

  const currentStage = stages.find((s) => s.id === lead.stage_id);
  const currentPipeline = pipelines.find((p) => p.id === lead.pipeline_id);
  const selectedService = services.find((s) => s.id === lead.service_id);

  const fields = [
    { icon: Mail, label: "Email", value: lead.email },
    { icon: Phone, label: "Phone", value: lead.phone },
    { icon: MapPin, label: "Zip Code", value: lead.zip_code },
    { icon: Ruler, label: "Sq. Footage", value: lead.square_footage },
    { icon: Sparkles, label: "Service", value: selectedService?.title },
    { icon: Calendar, label: "Scheduled", value: lead.scheduled_date ? `${lead.scheduled_date}${lead.scheduled_time ? ` at ${lead.scheduled_time}` : ""}` : null },
    { icon: Clock, label: "Submitted", value: format(new Date(lead.created_at), "MMM dd, yyyy 'at' HH:mm") },
  ];

  const getStageName = (id: string | null) => stages.find((s) => s.id === id)?.name ?? "Unknown";
  const getStageColor = (id: string | null) => stages.find((s) => s.id === id)?.color ?? "#94a3b8";

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[85vh] overflow-hidden flex flex-col">
        <DialogHeader className="shrink-0">
          <div className="flex items-center gap-3 flex-wrap">
            <DialogTitle className="text-xl font-bold">{lead.name}</DialogTitle>
            {currentStage && (
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full text-white" style={{ backgroundColor: currentStage.color }}>
                {currentStage.name}
              </span>
            )}
            {currentPipeline && (
              <span className="text-xs font-medium px-2 py-0.5 rounded-full border border-border text-muted-foreground">
                {currentPipeline.name}
              </span>
            )}
          </div>
          {/* Move to pipeline */}
          {pipelines.length > 1 && onMoveToPipeline && (
            <div className="flex items-center gap-2 mt-2">
              <span className="text-xs text-muted-foreground">Move to pipeline:</span>
              <Select value={lead.pipeline_id ?? ""} onValueChange={(val) => onMoveToPipeline(lead.id, val)}>
                <SelectTrigger className="h-7 w-48 text-xs"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {pipelines.map((p) => <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          )}
        </DialogHeader>

        <Tabs defaultValue="details" className="flex-1 overflow-hidden flex flex-col">
          <TabsList className="w-full shrink-0">
            <TabsTrigger value="details" className="flex-1 gap-1.5"><FileText className="w-3.5 h-3.5" /> Details</TabsTrigger>
            <TabsTrigger value="notes" className="flex-1 gap-1.5"><MessageSquare className="w-3.5 h-3.5" /> Notes ({notes.length})</TabsTrigger>
            <TabsTrigger value="journey" className="flex-1 gap-1.5"><ArrowRight className="w-3.5 h-3.5" /> Journey</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="flex-1 overflow-y-auto mt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {fields.map((f) =>
                f.value ? (
                  <div key={f.label} className="flex items-start gap-3 p-3 rounded-xl bg-muted/50">
                    <f.icon className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                    <div className="min-w-0">
                      <p className="text-xs text-muted-foreground font-medium">{f.label}</p>
                      <p className="text-sm text-foreground break-words">{f.value}</p>
                    </div>
                  </div>
                ) : null
              )}
            </div>
            {lead.notes && (
              <div className="mt-4 p-3 rounded-xl bg-muted/50">
                <div className="flex items-start gap-3">
                  <StickyNote className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs text-muted-foreground font-medium">Original Notes</p>
                    <p className="text-sm text-foreground whitespace-pre-wrap">{lead.notes}</p>
                  </div>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="notes" className="flex-1 overflow-hidden flex flex-col mt-4">
            <div className="shrink-0 border rounded-xl p-3 space-y-2 bg-muted/30">
              <div className="flex items-center gap-2">
                <Select value={noteType} onValueChange={setNoteType}>
                  <SelectTrigger className="w-32 h-8 text-xs"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {["note", "call", "email", "meeting"].map((key) => {
                      const Icon = noteIcons[key];
                      return (
                        <SelectItem key={key} value={key}>
                          <span className="flex items-center gap-1.5"><Icon className="w-3 h-3" />{noteLabels[key]}</span>
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
                <Button size="sm" className="ml-auto gap-1 rounded-lg" disabled={!newNote.trim() || addNote.isPending} onClick={() => addNote.mutate()}>
                  <Plus className="w-3.5 h-3.5" /> Add
                </Button>
              </div>
              <Textarea placeholder="Write a note, call summary, meeting details..." value={newNote} onChange={(e) => setNewNote(e.target.value)} className="min-h-[70px] text-sm resize-none" />
            </div>
            <div className="flex-1 overflow-y-auto mt-3 space-y-2">
              {notes.length === 0 ? (
                <p className="text-center text-sm text-muted-foreground py-8">No notes yet.</p>
              ) : notes.map((note) => {
                const Icon = noteIcons[note.note_type] ?? StickyNote;
                const color = noteColors[note.note_type] ?? noteColors.note;
                return (
                  <div key={note.id} className="flex gap-3 p-3 rounded-xl border bg-card hover:shadow-sm transition-shadow group">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${color}`}><Icon className="w-4 h-4" /></div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-foreground">{noteLabels[note.note_type] ?? "Note"}</span>
                        <span className="text-[11px] text-muted-foreground">{format(new Date(note.created_at), "MMM dd, yyyy HH:mm")}</span>
                        <button onClick={() => deleteNote.mutate(note.id)} className="ml-auto p-1 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity">
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                      <p className="text-sm text-foreground/80 mt-0.5 whitespace-pre-wrap">{note.content}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="journey" className="flex-1 overflow-y-auto mt-4">
            {history.length === 0 ? (
              <div className="text-center py-8">
                <ArrowRight className="w-8 h-8 text-muted-foreground/30 mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">No stage transitions recorded yet.</p>
              </div>
            ) : (
              <div className="relative pl-6">
                <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-border" />
                <div className="space-y-4">
                  {history.map((h) => (
                    <div key={h.id} className="relative flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full border-2 border-background shrink-0 -ml-6 z-10" style={{ backgroundColor: getStageColor(h.to_stage_id) }} />
                      <div className="flex-1 pb-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          {h.from_stage_id && (
                            <>
                              <span className="text-xs font-medium px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: getStageColor(h.from_stage_id) }}>
                                {getStageName(h.from_stage_id)}
                              </span>
                              <ArrowRight className="w-3 h-3 text-muted-foreground" />
                            </>
                          )}
                          <span className="text-xs font-medium px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: getStageColor(h.to_stage_id) }}>
                            {getStageName(h.to_stage_id)}
                          </span>
                        </div>
                        <p className="text-[11px] text-muted-foreground mt-1">{format(new Date(h.changed_at), "MMM dd, yyyy 'at' HH:mm")}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
