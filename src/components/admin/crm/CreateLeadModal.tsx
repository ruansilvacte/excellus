import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Plus } from "lucide-react";
import type { Stage, ServiceOption } from "./types";

interface Props {
  open: boolean;
  onClose: () => void;
  pipelineId: string;
  stages: Stage[];
  services: ServiceOption[];
}

export default function CreateLeadModal({ open, onClose, pipelineId, stages, services }: Props) {
  const qc = useQueryClient();
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", phone: "", zip_code: "", square_footage: "", notes: "", service_id: "", stage_id: "" });

  const set = (key: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const create = useMutation({
    mutationFn: async () => {
      const stageId = form.stage_id || stages[0]?.id || null;
      const { error } = await supabase.from("leads").insert({
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        zip_code: form.zip_code.trim(),
        square_footage: form.square_footage.trim() || null,
        notes: form.notes.trim() || null,
        service_id: form.service_id || null,
        pipeline_id: pipelineId,
        stage_id: stageId,
        sort_order: 0,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["leads_kanban"] });
      toast({ title: "Lead created" });
      setForm({ name: "", email: "", phone: "", zip_code: "", square_footage: "", notes: "", service_id: "", stage_id: "" });
      onClose();
    },
    onError: () => toast({ title: "Error creating lead", variant: "destructive" }),
  });

  const valid = form.name.trim() && form.email.trim() && form.phone.trim() && form.zip_code.trim();

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create Lead</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <Input placeholder="Name *" value={form.name} onChange={set("name")} />
          <Input placeholder="Email *" type="email" value={form.email} onChange={set("email")} />
          <div className="grid grid-cols-2 gap-3">
            <Input placeholder="Phone *" value={form.phone} onChange={set("phone")} />
            <Input placeholder="Zip Code *" value={form.zip_code} onChange={set("zip_code")} />
          </div>
          <Input placeholder="Square Footage" value={form.square_footage} onChange={set("square_footage")} />
          {services.length > 0 && (
            <Select value={form.service_id} onValueChange={(v) => setForm((f) => ({ ...f, service_id: v }))}>
              <SelectTrigger><SelectValue placeholder="Select Service (optional)" /></SelectTrigger>
              <SelectContent>
                {services.map((s) => <SelectItem key={s.id} value={s.id}>{s.title}</SelectItem>)}
              </SelectContent>
            </Select>
          )}
          {stages.length > 0 && (
            <Select value={form.stage_id} onValueChange={(v) => setForm((f) => ({ ...f, stage_id: v }))}>
              <SelectTrigger><SelectValue placeholder="Initial Stage (first by default)" /></SelectTrigger>
              <SelectContent>
                {stages.map((s) => <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>)}
              </SelectContent>
            </Select>
          )}
          <Textarea placeholder="Notes (optional)" value={form.notes} onChange={set("notes")} rows={3} />
          <Button onClick={() => create.mutate()} disabled={!valid || create.isPending} className="w-full gap-2">
            {create.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
            Create Lead
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
