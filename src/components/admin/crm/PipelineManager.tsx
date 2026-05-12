import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2, Edit2, Check, X } from "lucide-react";
import type { Pipeline } from "./types";

interface Props {
  open: boolean;
  onClose: () => void;
  pipelines: Pipeline[];
}

export default function PipelineManager({ open, onClose, pipelines }: Props) {
  const qc = useQueryClient();
  const { toast } = useToast();
  const [newName, setNewName] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");

  const colors = ["#3b82f6", "#8b5cf6", "#f59e0b", "#10b981", "#ef4444", "#ec4899", "#6366f1"];

  const addPipeline = useMutation({
    mutationFn: async () => {
      const maxOrder = pipelines.reduce((m, p) => Math.max(m, p.sort_order), -1);
      const color = colors[pipelines.length % colors.length];
      const { error } = await supabase.from("pipelines").insert({ name: newName.trim(), sort_order: maxOrder + 1, color });
      if (error) throw error;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["pipelines"] }); setNewName(""); toast({ title: "Pipeline created" }); },
  });

  const renamePipeline = useMutation({
    mutationFn: async ({ id, name }: { id: string; name: string }) => {
      const { error } = await supabase.from("pipelines").update({ name }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["pipelines"] }); setEditingId(null); },
  });

  const deletePipeline = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("pipelines").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["pipelines"] }); qc.invalidateQueries({ queryKey: ["leads_kanban"] }); toast({ title: "Pipeline deleted" }); },
  });

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader><DialogTitle>Manage Pipelines</DialogTitle></DialogHeader>
        <div className="space-y-3">
          <div className="flex gap-2">
            <Input placeholder="New pipeline name" value={newName} onChange={(e) => setNewName(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && newName.trim()) addPipeline.mutate(); }} />
            <Button onClick={() => addPipeline.mutate()} disabled={!newName.trim() || addPipeline.isPending} size="icon"><Plus className="w-4 h-4" /></Button>
          </div>
          <div className="space-y-2">
            {pipelines.map((p) => (
              <div key={p.id} className="flex items-center gap-2 p-2 rounded-lg border bg-card">
                <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: p.color }} />
                {editingId === p.id ? (
                  <div className="flex items-center gap-1 flex-1">
                    <Input value={editName} onChange={(e) => setEditName(e.target.value)} className="h-7 text-sm flex-1"
                      onKeyDown={(e) => { if (e.key === "Enter") renamePipeline.mutate({ id: p.id, name: editName.trim() }); }} autoFocus />
                    <button onClick={() => renamePipeline.mutate({ id: p.id, name: editName.trim() })} className="p-1 text-green-600"><Check className="w-3.5 h-3.5" /></button>
                    <button onClick={() => setEditingId(null)} className="p-1 text-red-500"><X className="w-3.5 h-3.5" /></button>
                  </div>
                ) : (
                  <>
                    <span className="flex-1 text-sm font-medium">{p.name}</span>
                    <button onClick={() => { setEditingId(p.id); setEditName(p.name); }} className="p-1 text-muted-foreground hover:text-foreground"><Edit2 className="w-3.5 h-3.5" /></button>
                    {pipelines.length > 1 && (
                      <button onClick={() => deletePipeline.mutate(p.id)} className="p-1 text-muted-foreground hover:text-destructive"><Trash2 className="w-3.5 h-3.5" /></button>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
