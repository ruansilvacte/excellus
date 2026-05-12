import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { useAllPageSeo, useUpsertPageSeo, type PageSeo } from "@/hooks/usePageSeo";
import { useSeoAudit, type PageAuditResult, type ContentIssue } from "@/hooks/useSeoAudit";
import {
  Loader2, Save, RefreshCw, Globe, CheckCircle2, XCircle, AlertTriangle, Info,
  ChevronDown, ChevronUp, Pencil, X,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

/* ── Score helpers ── */

function scoreColor(score: number) {
  if (score >= 80) return "text-green-600";
  if (score >= 50) return "text-yellow-600";
  return "text-red-600";
}

function scoreBg(score: number) {
  if (score >= 80) return "[&>div]:bg-green-500";
  if (score >= 50) return "[&>div]:bg-yellow-500";
  return "[&>div]:bg-red-500";
}

function issueIcon(type: string) {
  if (type === "error") return <XCircle className="w-4 h-4 text-red-500 shrink-0" />;
  if (type === "warning") return <AlertTriangle className="w-4 h-4 text-yellow-500 shrink-0" />;
  return <Info className="w-4 h-4 text-blue-400 shrink-0" />;
}

function summaryText(issues: { type: string; message: string }[]) {
  if (issues.length === 0) return "Tudo certo! Nenhum problema encontrado.";
  const parts = issues.map((i) => i.message.toLowerCase());
  return `SEO assim por conta de: ${parts.join(", ")}.`;
}

/* ── Page Card ── */

function PageCard({
  page,
  onEdit,
}: {
  page: PageAuditResult;
  onEdit: (slug: string) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Card className="rounded-2xl border-border/50 shadow-sm">
      <CardContent className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-accent" />
            <span className="font-semibold text-sm">{page.name || page.slug}</span>
          </div>
          <span className={cn("text-lg font-bold", scoreColor(page.score))}>{page.score}%</span>
        </div>

        <Progress value={page.score} className={cn("h-1.5", scoreBg(page.score))} />

        <p className="text-xs text-muted-foreground">{page.slug}</p>

        {/* Summary */}
        <p className="text-xs text-muted-foreground leading-relaxed">{summaryText(page.issues)}</p>

        {/* Expand issues */}
        {page.issues.length > 0 && (
          <>
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-1 text-xs font-medium text-accent hover:underline"
            >
              {open ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              {open ? "Esconder detalhes" : `Ver ${page.issues.length} problema(s)`}
            </button>

            {open && (
              <div className="space-y-1.5 pt-1">
                {page.issues.map((issue, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs">
                    {issueIcon(issue.type)}
                    <span>{issue.message}</span>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        <Button size="sm" variant="outline" className="w-full gap-1.5" onClick={() => onEdit(page.slug)}>
          <Pencil className="w-3 h-3" /> Editar Meta Tags
        </Button>
      </CardContent>
    </Card>
  );
}

/* ── Content Issues Panel ── */

function ContentIssuesPanel({ issues }: { issues: ContentIssue[] }) {
  if (issues.length === 0) return null;

  return (
    <Card className="rounded-2xl border-border/50 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-base flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-yellow-500" />
          Problemas de Conteúdo ({issues.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {issues.map((issue, i) => (
          <div key={i} className="flex items-start gap-2 text-sm">
            {issueIcon(issue.type)}
            <div>
              <span className="font-medium">{issue.context}:</span>{" "}
              <span className="text-muted-foreground">{issue.message}</span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

/* ── Edit Modal ── */

function EditPanel({
  slug,
  onClose,
}: {
  slug: string;
  onClose: () => void;
}) {
  const { data: pages } = useAllPageSeo();
  const upsert = useUpsertPageSeo();
  const selectedPage = pages?.find((p) => p.page_slug === slug);
  const [form, setForm] = useState<Partial<PageSeo>>({});

  useEffect(() => {
    if (selectedPage) setForm({ ...selectedPage });
  }, [selectedPage]);

  const handleSave = () => {
    if (!form.page_slug) return;
    upsert.mutate(
      { ...form, page_slug: form.page_slug } as PageSeo,
      {
        onSuccess: () => {
          toast.success("SEO salvo com sucesso!");
          onClose();
        },
        onError: () => toast.error("Erro ao salvar"),
      }
    );
  };

  return (
    <Card className="rounded-2xl border-accent/30 shadow-md">
      <CardHeader className="pb-3 flex flex-row items-center justify-between">
        <CardTitle className="text-base">Editar SEO — {form.page_name || slug}</CardTitle>
        <button onClick={onClose}><X className="w-5 h-5 text-muted-foreground hover:text-foreground" /></button>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-1 block">
            Meta Title <span className="text-xs text-muted-foreground">({form.meta_title?.length || 0}/60)</span>
          </label>
          <Input value={form.meta_title || ""} onChange={(e) => setForm((f) => ({ ...f, meta_title: e.target.value }))} maxLength={70} />
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">
            Meta Description <span className="text-xs text-muted-foreground">({form.meta_description?.length || 0}/160)</span>
          </label>
          <Textarea value={form.meta_description || ""} onChange={(e) => setForm((f) => ({ ...f, meta_description: e.target.value }))} rows={3} maxLength={200} />
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">OG Title</label>
          <Input value={form.og_title || ""} onChange={(e) => setForm((f) => ({ ...f, og_title: e.target.value }))} />
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">OG Description</label>
          <Textarea value={form.og_description || ""} onChange={(e) => setForm((f) => ({ ...f, og_description: e.target.value }))} rows={2} />
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">OG Image (URL)</label>
          <Input value={form.og_image || ""} onChange={(e) => setForm((f) => ({ ...f, og_image: e.target.value }))} placeholder="https://..." />
        </div>
        <div className="flex gap-2">
          <Button onClick={handleSave} disabled={upsert.isPending} className="gap-2">
            {upsert.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Salvar
          </Button>
          <Button variant="outline" onClick={onClose}>Cancelar</Button>
        </div>
      </CardContent>
    </Card>
  );
}

/* ── Main Page ── */

export default function SeoSettings() {
  const { data: audit, isLoading, error, runAudit } = useSeoAudit();
  const [editing, setEditing] = useState<string | null>(null);

  useEffect(() => {
    runAudit();
  }, [runAudit]);

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold" style={{ fontFamily: "var(--font-heading)", color: "hsl(30 10% 15%)" }}>
            SEO Automático
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Análise automática de SEO de todas as páginas e conteúdos
          </p>
        </div>
        <Button onClick={runAudit} disabled={isLoading} className="gap-2 shrink-0">
          {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
          Escanear Agora
        </Button>
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Loading */}
      {isLoading && !audit && (
        <div className="flex items-center gap-2 text-muted-foreground p-8">
          <Loader2 className="w-4 h-4 animate-spin" /> Escaneando páginas...
        </div>
      )}

      {/* Results */}
      {audit && (
        <>
          {/* Overall Score */}
          <Card className="rounded-2xl border-border/50 shadow-sm">
            <CardContent className="p-6 flex flex-col sm:flex-row items-center gap-6">
              <div className="text-center">
                <div className={cn("text-5xl font-bold", scoreColor(audit.overallScore))} style={{ fontFamily: "var(--font-heading)" }}>
                  {audit.overallScore}%
                </div>
                <p className="text-sm text-muted-foreground mt-1">SEO Geral do Site</p>
              </div>
              <div className="flex-1 w-full space-y-2">
                <Progress value={audit.overallScore} className={cn("h-3", scoreBg(audit.overallScore))} />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{audit.totalPages} página(s) analisada(s)</span>
                  <span>{audit.totalContentIssues} problema(s) de conteúdo</span>
                </div>
                {audit.scannedAt && (
                  <p className="text-xs text-muted-foreground">
                    Último scan: {new Date(audit.scannedAt).toLocaleString("pt-BR")}
                  </p>
                )}
              </div>
              <div className="hidden sm:flex items-center gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-green-500" /> ≥80% Bom</div>
                <div className="flex items-center gap-1"><AlertTriangle className="w-3 h-3 text-yellow-500" /> 50-79%</div>
                <div className="flex items-center gap-1"><XCircle className="w-3 h-3 text-red-500" /> &lt;50%</div>
              </div>
            </CardContent>
          </Card>

          {/* Content Issues */}
          <ContentIssuesPanel issues={audit.contentIssues} />

          {/* Edit Panel */}
          {editing && <EditPanel slug={editing} onClose={() => { setEditing(null); runAudit(); }} />}

          {/* Page Cards */}
          <div>
            <h2 className="text-lg font-semibold mb-3" style={{ fontFamily: "var(--font-heading)" }}>
              Páginas ({audit.pages.length})
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {audit.pages.map((page) => (
                <PageCard key={page.slug} page={page} onEdit={setEditing} />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
