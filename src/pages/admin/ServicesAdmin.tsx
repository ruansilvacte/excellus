import { useState } from "react";
import { useServices, useUpdateService, useCreateService, useDeleteService, Service, ServiceSection } from "@/hooks/useServices";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import ImageUploadField from "@/components/admin/ImageUploadField";
import { Plus, Trash2, Save, Loader2, ChevronUp, ChevronDown } from "lucide-react";

function TagListEditor({ label, items, onChange }: { label: string; items: string[]; onChange: (v: string[]) => void }) {
  const [input, setInput] = useState("");
  const add = () => { const val = input.trim(); if (!val) return; onChange([...items, val]); setInput(""); };
  const remove = (i: number) => onChange(items.filter((_, idx) => idx !== i));
  const update = (i: number, val: string) => { const next = [...items]; next[i] = val; onChange(next); };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground">{label}</label>
      <div className="space-y-1.5">
        {items.map((item, i) => (
          <div key={i} className="flex gap-2">
            <Input value={item} onChange={(e) => update(i, e.target.value)} className="text-sm h-8" />
            <Button type="button" variant="ghost" size="icon" className="h-8 w-8 shrink-0 text-destructive" onClick={() => remove(i)}>
              <Trash2 className="w-3.5 h-3.5" />
            </Button>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <Input placeholder="Adicionar item..." value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), add())} className="text-sm h-8" />
        <Button type="button" variant="outline" size="icon" className="h-8 w-8 shrink-0" onClick={add}>
          <Plus className="w-3.5 h-3.5" />
        </Button>
      </div>
    </div>
  );
}

function SectionsEditor({ sections, onChange }: { sections: ServiceSection[]; onChange: (v: ServiceSection[]) => void }) {
  const add = () => onChange([...sections, { heading: "", body: "" }]);
  const remove = (i: number) => onChange(sections.filter((_, idx) => idx !== i));
  const update = (i: number, field: keyof ServiceSection, val: string) => { const next = [...sections]; next[i] = { ...next[i], [field]: val }; onChange(next); };
  const move = (i: number, dir: -1 | 1) => { const next = [...sections]; const target = i + dir; if (target < 0 || target >= next.length) return; [next[i], next[target]] = [next[target], next[i]]; onChange(next); };

  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-foreground">Seções de conteúdo</label>
      {sections.map((sec, i) => (
        <div key={i} className="rounded-xl border border-border bg-muted/20 p-4 space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-muted-foreground flex-1">Seção {i + 1}</span>
            <Button type="button" variant="ghost" size="icon" className="h-7 w-7" onClick={() => move(i, -1)} disabled={i === 0}><ChevronUp className="w-3.5 h-3.5" /></Button>
            <Button type="button" variant="ghost" size="icon" className="h-7 w-7" onClick={() => move(i, 1)} disabled={i === sections.length - 1}><ChevronDown className="w-3.5 h-3.5" /></Button>
            <Button type="button" variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => remove(i)}><Trash2 className="w-3.5 h-3.5" /></Button>
          </div>
          <Input placeholder="Título da seção" value={sec.heading} onChange={(e) => update(i, "heading", e.target.value)} className="text-sm" />
          <Textarea placeholder="Texto da seção..." value={sec.body} onChange={(e) => update(i, "body", e.target.value)} rows={4} className="text-sm resize-none" />
        </div>
      ))}
      <Button type="button" variant="outline" size="sm" className="gap-1.5 w-full" onClick={add}>
        <Plus className="w-3.5 h-3.5" /> Adicionar seção
      </Button>
    </div>
  );
}

function ServiceForm({ form, setForm }: { form: Partial<Service>; setForm: (f: Partial<Service>) => void }) {
  const set = (field: keyof Service, val: any) => setForm({ ...form, [field]: val });

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-border bg-card p-5 space-y-4">
        <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">Informações do Card</h3>
        <ImageUploadField label="Imagem do card" value={form.image || ""} onChange={(v) => set("image", v)} folder="services" />
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-sm font-medium">Título</label>
            <Input value={form.title || ""} onChange={(e) => set("title", e.target.value)} />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium">Slug (URL)</label>
            <Input value={form.slug || ""} onChange={(e) => set("slug", e.target.value)} placeholder="ex: limpeza-regular" />
          </div>
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium">Duração</label>
          <Input value={form.duration || ""} onChange={(e) => set("duration", e.target.value)} placeholder="~2 hours" />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium">Legenda / Descrição curta</label>
          <Textarea value={form.description || ""} onChange={(e) => set("description", e.target.value)} rows={2} className="resize-none" />
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card p-5 space-y-5">
        <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">Conteúdo da Página</h3>
        <div className="space-y-1">
          <label className="text-sm font-medium">Introdução</label>
          <Textarea value={form.intro || ""} onChange={(e) => set("intro", e.target.value)} rows={4} className="resize-none" />
        </div>
        <SectionsEditor sections={form.sections || []} onChange={(v) => set("sections", v)} />
        <TagListEditor label="O que está incluído" items={form.includes || []} onChange={(v) => set("includes", v)} />
        <TagListEditor label="O que NÃO está incluído" items={form.not_included || []} onChange={(v) => set("not_included", v)} />
        <TagListEditor label="Extras disponíveis" items={form.extras || []} onChange={(v) => set("extras", v)} />
      </div>
    </div>
  );
}

function ServiceEditor({ service }: { service: Service }) {
  const [form, setForm] = useState<Service>({ ...service });
  const update = useUpdateService();
  const deleteService = useDeleteService();

  return (
    <div className="space-y-6 p-1">
      <ServiceForm form={form} setForm={(f) => setForm(f as Service)} />

      <div className="flex gap-3">
        <Button onClick={() => update.mutate(form)} disabled={update.isPending} className="flex-1 gap-2">
          {update.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          Salvar alterações
        </Button>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" size="icon" className="shrink-0">
              <Trash2 className="w-4 h-4" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Apagar serviço?</AlertDialogTitle>
              <AlertDialogDescription>
                O serviço <strong>{service.title}</strong> será removido permanentemente do site. Esta ação não pode ser desfeita.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                onClick={() => deleteService.mutate(service.id)}
                disabled={deleteService.isPending}
              >
                {deleteService.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Apagar"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}

const emptyService = (): Partial<Service> => ({
  title: "",
  slug: "",
  duration: "",
  description: "",
  image: "",
  intro: "",
  sections: [],
  includes: [],
  not_included: [],
  extras: [],
  sort_order: 99,
});

function NewServiceDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [form, setForm] = useState<Partial<Service>>(emptyService());
  const create = useCreateService();

  const handleSave = () => {
    if (!form.slug || !form.title) return;
    create.mutate(form as Omit<Service, "id" | "created_at" | "updated_at">, {
      onSuccess: () => { setForm(emptyService()); onClose(); },
    });
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Novo Serviço</DialogTitle>
        </DialogHeader>
        <ServiceForm form={form} setForm={setForm} />
        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={onClose}>Cancelar</Button>
          <Button onClick={handleSave} disabled={create.isPending || !form.slug || !form.title} className="gap-2">
            {create.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
            Criar serviço
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default function ServicesAdmin() {
  const { data: services, isLoading } = useServices();
  const [showNew, setShowNew] = useState(false);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold" style={{ fontFamily: "var(--font-heading)", color: "hsl(30 10% 15%)" }}>
            Serviços
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Gerencie os cards e páginas de cada serviço exibido no site.
          </p>
        </div>
        <Button onClick={() => setShowNew(true)} className="gap-2 shrink-0">
          <Plus className="w-4 h-4" /> Novo Serviço
        </Button>
      </div>

      <Accordion type="single" collapsible className="space-y-3">
        {(services || []).map((service) => (
          <AccordionItem
            key={service.id}
            value={service.id}
            className="rounded-2xl border border-border bg-card overflow-hidden"
          >
            <AccordionTrigger className="px-5 py-4 hover:no-underline">
              <div className="flex items-center gap-4 text-left">
                {service.image && (
                  <img src={service.image} alt={service.title} className="w-12 h-12 rounded-xl object-cover shrink-0" />
                )}
                <div>
                  <p className="font-semibold text-sm">{service.title}</p>
                  <p className="text-xs text-muted-foreground">{service.duration}</p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-5 pb-5">
              <ServiceEditor service={service} />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <NewServiceDialog open={showNew} onClose={() => setShowNew(false)} />
    </div>
  );
}
