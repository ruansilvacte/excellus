import { useState, useEffect } from "react";
import {
  DndContext, DragOverlay, PointerSensor, TouchSensor, useSensor, useSensors, rectIntersection,
  type DragStartEvent, type DragEndEvent, type DragOverEvent,
} from "@dnd-kit/core";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useToast } from "@/hooks/use-toast";
import {
  Plus, Trash2, GripVertical, Mail, Phone, MapPin, Calendar,
  Edit2, Check, X, StickyNote, Eye, Sparkles, Settings2, UserPlus, Search,
} from "lucide-react";
import { format } from "date-fns";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/contexts/AuthContext";
import type { Pipeline, Stage, Lead, ServiceOption } from "@/components/admin/crm/types";
import LeadDetailModal from "@/components/admin/crm/LeadDetailModal";
import CreateLeadModal from "@/components/admin/crm/CreateLeadModal";
import PipelineManager from "@/components/admin/crm/PipelineManager";

// ─── Lead Card ────────────────────────────────────────────────────────────────
function LeadCard({ lead, isDragging = false, compact = false, onView, onDelete, services }: {
  lead: Lead; isDragging?: boolean; compact?: boolean; onView?: (lead: Lead) => void; onDelete?: (id: string) => void; services?: ServiceOption[];
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging: isSortableDragging } = useSortable({ id: lead.id });
  const style = { transform: CSS.Transform.toString(transform), transition, opacity: isSortableDragging ? 0.3 : 1 };
  const serviceName = services?.find((s) => s.id === lead.service_id)?.title;

  if (compact) {
    return (
      <div ref={setNodeRef} style={style} {...attributes} {...listeners}
        className={`bg-white rounded-lg border border-slate-200 px-2.5 py-2 select-none cursor-grab active:cursor-grabbing touch-none ${isDragging ? "shadow-md ring-2 ring-primary/30" : ""}`}>
        <div className="flex items-center justify-between gap-1.5">
          <div className="flex items-center gap-1.5 min-w-0">
            <GripVertical className="w-3 h-3 text-slate-300 shrink-0" />
            <span className="font-semibold text-slate-800 text-[14px] leading-tight break-words">{lead.name}</span>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            {onView && <button onClick={(e) => { e.stopPropagation(); onView(lead); }} onPointerDown={(e) => e.stopPropagation()} className="p-1 text-slate-400 hover:text-primary rounded"><Eye className="w-3 h-3" /></button>}
            {onDelete && <button onClick={(e) => { e.stopPropagation(); onDelete(lead.id); }} onPointerDown={(e) => e.stopPropagation()} className="p-1 text-slate-400 hover:text-destructive rounded"><Trash2 className="w-3 h-3" /></button>}
          </div>
        </div>
        <div className="flex items-center gap-3 mt-1 text-[12px] text-slate-400">
          <div className="flex items-center gap-1 min-w-0"><Mail className="w-3 h-3 shrink-0" /><span className="truncate">{lead.email}</span></div>
          <div className="flex items-center gap-1 shrink-0"><MapPin className="w-3 h-3" /><span>{lead.zip_code}</span></div>
        </div>
        {serviceName && <div className="flex items-center gap-1 mt-1 text-[11px] text-primary"><Sparkles className="w-3 h-3" /><span>{serviceName}</span></div>}
      </div>
    );
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}
      className={`bg-white rounded-2xl border border-slate-200 p-4 shadow-sm hover:shadow-md transition-all duration-200 select-none cursor-grab active:cursor-grabbing touch-none ${isDragging ? "shadow-xl ring-2 ring-primary/30 rotate-1" : ""} ${isSortableDragging ? "opacity-30" : ""}`}>
      <div className="flex items-start gap-2">
        <div className="mt-1 text-slate-300 shrink-0"><GripVertical className="w-4 h-4" /></div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <p className="font-semibold text-slate-800 text-sm break-words">{lead.name}</p>
            <div className="flex items-center gap-1 shrink-0">
              {onView && <button onClick={(e) => { e.stopPropagation(); onView(lead); }} onPointerDown={(e) => e.stopPropagation()} className="p-1 text-slate-400 hover:text-primary hover:bg-primary/10 rounded transition-colors"><Eye className="w-3.5 h-3.5" /></button>}
              {onDelete && <button onClick={(e) => { e.stopPropagation(); onDelete(lead.id); }} onPointerDown={(e) => e.stopPropagation()} className="p-1 text-slate-400 hover:text-destructive hover:bg-destructive/10 rounded transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>}
            </div>
          </div>
          <div className="mt-2 space-y-1.5">
            <div className="flex items-center gap-1.5 text-slate-500"><Mail className="w-3.5 h-3.5 shrink-0" /><span className="text-xs truncate">{lead.email}</span></div>
            <div className="flex items-center gap-1.5 text-slate-500"><Phone className="w-3.5 h-3.5 shrink-0" /><span className="text-xs">{lead.phone}</span></div>
            <div className="flex items-center gap-1.5 text-slate-500"><MapPin className="w-3.5 h-3.5 shrink-0" /><span className="text-xs">{lead.zip_code}</span></div>
          </div>
          {serviceName && <div className="mt-2 flex items-center gap-1.5 text-primary"><Sparkles className="w-3.5 h-3.5" /><span className="text-xs font-medium">{serviceName}</span></div>}
          {lead.notes && <p className="mt-2 text-xs text-slate-400 italic line-clamp-2"><StickyNote className="w-3 h-3 inline mr-1 -mt-0.5" />{lead.notes}</p>}
          <div className="mt-3 flex items-center gap-1 text-slate-400">
            <Calendar className="w-3 h-3" />
            <span className="text-[11px]">{format(new Date(lead.created_at), "dd/MM/yyyy HH:mm")}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Droppable Column ─────────────────────────────────────────────────────────
function DroppableColumn({ stageId, children, isOver, isMobile = false }: { stageId: string; children: React.ReactNode; isOver: boolean; isMobile?: boolean }) {
  const { setNodeRef } = useDroppable({ id: stageId });
  return (
    <div ref={setNodeRef}
      className={`flex-1 overflow-y-auto space-y-1.5 rounded-xl transition-colors duration-150 ${isMobile ? "p-1.5 min-h-[120px]" : "p-3 max-h-[calc(100vh-220px)]"} ${isOver ? "bg-primary/5 ring-2 ring-primary/20" : ""}`}>
      {children}
    </div>
  );
}

// ─── Stage Column ─────────────────────────────────────────────────────────────
function StageColumn({ stage, leads, onRename, onDelete, stageCount, isOver, onViewLead, onDeleteLead, services, isMobile = false }: {
  stage: Stage; leads: Lead[]; onRename: (id: string, name: string) => void; onDelete: (id: string) => void;
  stageCount: number; isOver: boolean; onViewLead: (lead: Lead) => void; onDeleteLead: (id: string) => void;
  services: ServiceOption[]; isMobile?: boolean;
}) {
  const [editing, setEditing] = useState(false);
  const [draftName, setDraftName] = useState(stage.name);
  const handleSave = () => { if (draftName.trim()) onRename(stage.id, draftName.trim()); setEditing(false); };

  const colStyle = isMobile ? { width: "85vw", maxWidth: "340px" } : {};
  const colClass = isMobile
    ? `flex flex-col shrink-0 rounded-xl border overflow-hidden snap-center ${isOver ? "border-primary/40 bg-primary/5" : "border-slate-200 bg-slate-50"}`
    : `flex flex-col shrink-0 w-72 rounded-2xl border overflow-hidden transition-colors duration-150 ${isOver ? "border-primary/40 bg-primary/5" : "border-slate-200 bg-slate-50"}`;

  return (
    <div className={colClass} style={colStyle}>
      <div className={`${isMobile ? "px-3 py-2" : "px-4 py-3"} border-b border-slate-200 bg-white`}>
        <div className="flex items-center gap-2">
          <div className={`${isMobile ? "w-2 h-2" : "w-2.5 h-2.5"} rounded-full shrink-0`} style={{ backgroundColor: stage.color }} />
          {editing ? (
            <div className="flex items-center gap-1 flex-1">
              <Input value={draftName} onChange={(e) => setDraftName(e.target.value)} className="h-7 text-sm px-2 py-1 flex-1" autoFocus
                onKeyDown={(e) => { if (e.key === "Enter") handleSave(); if (e.key === "Escape") { setDraftName(stage.name); setEditing(false); } }} />
              <button onClick={handleSave} className="p-1 text-green-600"><Check className="w-3.5 h-3.5" /></button>
              <button onClick={() => { setDraftName(stage.name); setEditing(false); }} className="p-1 text-red-500"><X className="w-3.5 h-3.5" /></button>
            </div>
          ) : (
            <>
              <span className={`font-semibold text-slate-700 ${isMobile ? "text-[13px]" : "text-sm"} flex-1 truncate`}>{stage.name}</span>
              <span className={`text-xs text-slate-400 bg-slate-100 rounded-full ${isMobile ? "px-1.5 py-0.5 text-[11px]" : "px-2 py-0.5"} shrink-0`}>{leads.length}</span>
              {!isMobile && (
                <div className="flex items-center gap-1 shrink-0">
                  <button onClick={() => setEditing(true)} className="p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded transition-colors"><Edit2 className="w-3.5 h-3.5" /></button>
                  {stageCount > 1 && <button onClick={() => onDelete(stage.id)} className="p-1 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>}
                </div>
              )}
              {isMobile && (
                <>
                  <button onClick={() => setEditing(true)} className="p-1 text-slate-400"><Edit2 className="w-3 h-3" /></button>
                  {stageCount > 1 && <button onClick={() => onDelete(stage.id)} className="p-1 text-slate-400"><Trash2 className="w-3 h-3" /></button>}
                </>
              )}
            </>
          )}
        </div>
      </div>
      <DroppableColumn stageId={stage.id} isOver={isOver} isMobile={isMobile}>
        <SortableContext items={leads.map((l) => l.id)} strategy={verticalListSortingStrategy}>
          {leads.map((lead) => <LeadCard key={lead.id} lead={lead} onView={onViewLead} onDelete={onDeleteLead} compact={isMobile} services={services} />)}
        </SortableContext>
        {leads.length === 0 && !isOver && (
          <div className={`flex flex-col items-center justify-center ${isMobile ? "min-h-[120px]" : "py-8"} text-slate-300 pointer-events-none`}>
            {!isMobile && <div className="w-10 h-10 rounded-full border-2 border-dashed border-slate-200 flex items-center justify-center mb-2"><Plus className="w-4 h-4" /></div>}
            <p className="text-xs">Drop here</p>
          </div>
        )}
      </DroppableColumn>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function CrmKanban() {
  const { user } = useAuth();
  const qc = useQueryClient();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [activeLeadId, setActiveLeadId] = useState<string | null>(null);
  const [overStageId, setOverStageId] = useState<string | null>(null);
  const [viewingLead, setViewingLead] = useState<Lead | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [showPipelines, setShowPipelines] = useState(false);
  const [activePipelineId, setActivePipelineId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 200, tolerance: 8 } })
  );

  const { data: pipelines = [] } = useQuery({
    queryKey: ["pipelines"],
    queryFn: async () => {
      const { data, error } = await supabase.from("pipelines").select("*").order("sort_order");
      if (error) throw error;
      return data as Pipeline[];
    },
  });

  // Auto-select first pipeline
  useEffect(() => {
    if (pipelines.length > 0 && !activePipelineId) setActivePipelineId(pipelines[0].id);
    if (activePipelineId && !pipelines.find((p) => p.id === activePipelineId)) setActivePipelineId(pipelines[0]?.id ?? null);
  }, [pipelines, activePipelineId]);

  const { data: allStages = [] } = useQuery({
    queryKey: ["kanban_stages"],
    queryFn: async () => {
      const { data, error } = await supabase.from("kanban_stages").select("*").order("sort_order");
      if (error) throw error;
      return data as Stage[];
    },
  });

  const { data: allLeads = [] } = useQuery({
    queryKey: ["leads_kanban"],
    queryFn: async () => {
      const { data, error } = await supabase.from("leads").select("*").order("sort_order");
      if (error) throw error;
      return data as Lead[];
    },
  });

  const { data: services = [] } = useQuery({
    queryKey: ["services_list"],
    queryFn: async () => {
      const { data, error } = await supabase.from("services").select("id, title, slug").order("sort_order");
      if (error) throw error;
      return data as ServiceOption[];
    },
  });

  const stages = allStages.filter((s) => s.pipeline_id === activePipelineId);
  const pipelineLeads = allLeads.filter((l) => l.pipeline_id === activePipelineId);
  const leads = searchQuery.trim()
    ? pipelineLeads.filter((l) => {
        const q = searchQuery.toLowerCase();
        return l.name.toLowerCase().includes(q) || l.email.toLowerCase().includes(q) || l.phone.toLowerCase().includes(q);
      })
    : pipelineLeads;

  // Auto-assign unassigned leads to first stage
  useEffect(() => {
    if (stages.length === 0 || leads.length === 0) return;
    const unassigned = leads.filter((l) => !l.stage_id);
    if (unassigned.length === 0) return;
    const firstStage = stages[0];
    Promise.all(unassigned.map((l) => supabase.from("leads").update({ stage_id: firstStage.id }).eq("id", l.id)))
      .then(() => qc.invalidateQueries({ queryKey: ["leads_kanban"] }));
  }, [stages, leads]);

  const moveLead = useMutation({
    mutationFn: async ({ leadId, stageId, sortOrder, fromStageId }: { leadId: string; stageId: string; sortOrder: number; fromStageId: string | null }) => {
      const { error } = await supabase.from("leads").update({ stage_id: stageId, sort_order: sortOrder }).eq("id", leadId);
      if (error) throw error;
      if (fromStageId !== stageId) {
        await supabase.from("lead_stage_history").insert({ lead_id: leadId, from_stage_id: fromStageId, to_stage_id: stageId, changed_by: user?.id ?? null });
      }
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["leads_kanban"] }); qc.invalidateQueries({ queryKey: ["lead_stage_history"] }); },
  });

  const deleteLead = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("leads").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["leads_kanban"] }); toast({ title: "Lead deleted" }); },
  });

  const moveLeadToPipeline = useMutation({
    mutationFn: async ({ leadId, pipelineId }: { leadId: string; pipelineId: string }) => {
      const pipelineStages = allStages.filter((s) => s.pipeline_id === pipelineId);
      const firstStageId = pipelineStages[0]?.id ?? null;
      const { error } = await supabase.from("leads").update({ pipeline_id: pipelineId, stage_id: firstStageId }).eq("id", leadId);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["leads_kanban"] });
      setViewingLead(null);
      toast({ title: "Lead moved to new pipeline" });
    },
  });

  const addStage = useMutation({
    mutationFn: async () => {
      const maxOrder = stages.reduce((m, s) => Math.max(m, s.sort_order), -1);
      const colors = ["#6366f1", "#3b82f6", "#f59e0b", "#8b5cf6", "#10b981", "#ef4444", "#ec4899"];
      const color = colors[stages.length % colors.length];
      const { error } = await supabase.from("kanban_stages").insert({ name: "New Stage", sort_order: maxOrder + 1, color, pipeline_id: activePipelineId });
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["kanban_stages"] }),
  });

  const renameStage = useMutation({
    mutationFn: async ({ id, name }: { id: string; name: string }) => {
      const { error } = await supabase.from("kanban_stages").update({ name }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["kanban_stages"] }),
  });

  const deleteStage = useMutation({
    mutationFn: async (id: string) => {
      const firstStage = stages.find((s) => s.id !== id);
      if (firstStage) await supabase.from("leads").update({ stage_id: firstStage.id }).eq("stage_id", id);
      const { error } = await supabase.from("kanban_stages").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["kanban_stages"] }); qc.invalidateQueries({ queryKey: ["leads_kanban"] }); toast({ title: "Stage deleted" }); },
  });

  const activeLead = activeLeadId ? leads.find((l) => l.id === activeLeadId) : null;

  const resolveStageId = (id: string): string | null => {
    if (stages.find((s) => s.id === id)) return id;
    const lead = leads.find((l) => l.id === id);
    return lead?.stage_id ?? null;
  };

  const handleDragStart = (event: DragStartEvent) => setActiveLeadId(event.active.id as string);
  const handleDragOver = (event: DragOverEvent) => {
    const overId = event.over?.id as string | null;
    setOverStageId(overId ? resolveStageId(overId) : null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveLeadId(null);
    setOverStageId(null);
    if (!over) return;
    const activeId = active.id as string;
    const overId = over.id as string;
    const targetStageId = resolveStageId(overId);
    if (!targetStageId) return;
    const draggedLead = leads.find((l) => l.id === activeId);
    if (!draggedLead) return;
    if (draggedLead.stage_id === targetStageId && overId === activeId) return;
    const fromStageId = draggedLead.stage_id;
    const stageLeads = leads.filter((l) => l.stage_id === targetStageId && l.id !== activeId);
    const newSortOrder = stageLeads.length;
    qc.setQueryData(["leads_kanban"], (old: Lead[] | undefined) => {
      if (!old) return old;
      return old.map((l) => l.id === activeId ? { ...l, stage_id: targetStageId, sort_order: newSortOrder } : l);
    });
    moveLead.mutate({ leadId: activeId, stageId: targetStageId, sortOrder: newSortOrder, fromStageId });
  };

  

  return (
    <div className="h-full flex flex-col">
      <LeadDetailModal
        lead={viewingLead} open={!!viewingLead} onClose={() => setViewingLead(null)}
        stages={allStages} pipelines={pipelines} services={services}
        onMoveToPipeline={(leadId, pipelineId) => moveLeadToPipeline.mutate({ leadId, pipelineId })}
      />
      {activePipelineId && (
        <CreateLeadModal open={showCreate} onClose={() => setShowCreate(false)} pipelineId={activePipelineId} stages={stages} services={services} />
      )}
      <PipelineManager open={showPipelines} onClose={() => setShowPipelines(false)} pipelines={pipelines} />

      {/* Header */}
      <div className={`shrink-0 mb-3 md:mb-4 ${isMobile ? "px-1" : ""}`}>
        <div className={`${isMobile ? "text-center" : "flex items-center justify-between gap-2"}`}>
          <div className="min-w-0">
            <h1 className="text-lg md:text-2xl font-bold text-slate-800" style={{ fontFamily: "var(--font-heading)" }}>CRM — Kanban</h1>
            <p className="text-[11px] md:text-sm text-slate-500 mt-0.5">{leads.length} leads · {stages.length} stages</p>
          </div>
          <div className={`flex items-center gap-2 ${isMobile ? "justify-center mt-2 flex-wrap" : ""}`}>
            <Button onClick={() => setShowCreate(true)} size={isMobile ? "sm" : "default"} className="gap-1 rounded-xl">
              <UserPlus className="w-4 h-4" />{!isMobile && "New Lead"}
            </Button>
            <Button onClick={() => addStage.mutate()} disabled={addStage.isPending} size={isMobile ? "sm" : "default"} variant="outline" className="gap-1 rounded-xl">
              <Plus className="w-4 h-4" />{!isMobile && "Add Stage"}
            </Button>
            <Button onClick={() => setShowPipelines(true)} size={isMobile ? "sm" : "default"} variant="outline" className="gap-1 rounded-xl">
              <Settings2 className="w-4 h-4" />{!isMobile && "Pipelines"}
            </Button>
          </div>
        </div>

        {/* Search */}
        <div className="relative mt-3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search leads by name, email, or phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 h-9 text-sm rounded-xl"
          />
        </div>

        {/* Pipeline tabs */}
        {pipelines.length > 1 && (
          <div className="flex items-center gap-2 mt-3 overflow-x-auto pb-1">
            {pipelines.map((p) => (
              <button
                key={p.id}
                onClick={() => setActivePipelineId(p.id)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  activePipelineId === p.id ? "bg-primary text-primary-foreground shadow-sm" : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                <span className="inline-block w-2 h-2 rounded-full mr-1.5" style={{ backgroundColor: p.color }} />
                {p.name}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Kanban Board */}
      <div className={`flex-1 ${isMobile ? "overflow-x-auto overflow-y-hidden pb-3 -mx-3" : "overflow-x-auto pb-6"}`}>
        <DndContext sensors={sensors} collisionDetection={rectIntersection} onDragStart={handleDragStart} onDragOver={handleDragOver} onDragEnd={handleDragEnd}>
          <div className={`flex gap-${isMobile ? "3" : "4"} items-start h-full ${isMobile ? "snap-x snap-mandatory scroll-smooth" : "min-w-max"}`}
            style={isMobile ? { paddingLeft: 12, paddingRight: 12 } : {}}>
            {stages.map((stage) => (
              <StageColumn
                key={stage.id} stage={stage} isMobile={isMobile}
                leads={leads.filter((l) => l.stage_id === stage.id).sort((a, b) => a.sort_order - b.sort_order)}
                onRename={(id, name) => renameStage.mutate({ id, name })}
                onDelete={(id) => deleteStage.mutate(id)}
                stageCount={stages.length} isOver={overStageId === stage.id}
                onViewLead={setViewingLead}
                onDeleteLead={(id) => deleteLead.mutate(id)}
                services={services}
              />
            ))}
          </div>
          <DragOverlay dropAnimation={{ duration: 150, easing: "ease" }}>
            {activeLead ? <LeadCard lead={activeLead} isDragging compact={isMobile} services={services} /> : null}
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  );
}
