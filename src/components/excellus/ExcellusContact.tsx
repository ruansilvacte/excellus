import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CheckCircle2, ArrowRight, Sparkles, FileText, Clock } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import marble from "@/assets/excellus-marble.jpg";

const schema = z.object({
  name: z.string().trim().min(2, "Informe seu nome").max(100),
  email: z.string().trim().email("E-mail inválido").max(255),
  phone: z.string().trim().min(7, "Telefone inválido").max(30),
  project: z.string().trim().min(5, "Conte-nos um pouco mais").max(1000),
});

const TARGET_EMAIL = "remodeling@excellusgroup.com";

const features = [
  { icon: Sparkles, title: "Atendimento", text: "Personalizado" },
  { icon: FileText, title: "Orçamento", text: "Sem Compromisso" },
  { icon: Clock, title: "Resposta", text: "Rápida" },
];

export default function ExcellusContact() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});
    const fd = new FormData(e.currentTarget);
    const data = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      project: String(fd.get("project") ?? ""),
    };

    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      parsed.error.issues.forEach((i) => {
        if (i.path[0]) fieldErrors[String(i.path[0])] = i.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setLoading(true);
    try {
      const subject = encodeURIComponent("Novo Lead — Excellus Remodeling");
      const body = encodeURIComponent(
        `Nome: ${parsed.data.name}\nE-mail: ${parsed.data.email}\nTelefone: ${parsed.data.phone}\n\nProjeto:\n${parsed.data.project}`,
      );
      window.location.href = `mailto:${TARGET_EMAIL}?subject=${subject}&body=${body}`;
      setSubmitted(true);
    } catch {
      toast({ title: "Erro ao enviar", description: "Tente novamente.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="contato" className="relative py-10 md:py-16 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${marble})` }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-background/85" aria-hidden="true" />

      <div className="relative container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
          <div className="text-center md:text-left">
            <span className="eyebrow">Orçamento Premium</span>
            <h2 className="mt-5 text-2xl md:text-5xl lg:text-6xl font-light text-foreground leading-[1.1]">
              Pronto para <span className="text-gold-gradient">Transformar</span> Seu Imóvel?
            </h2>
            <div className="mt-6 gold-divider w-12 md:w-14 mx-auto md:mx-0" />
            <p className="mt-6 text-sm md:text-lg text-muted-foreground leading-relaxed font-light max-w-md mx-auto md:mx-0">
              Preencha o formulário e nossa equipe entrará em contato para
              criar um orçamento personalizado para você.
            </p>
 
            <div className="mt-8 grid grid-cols-3 gap-4 md:gap-6 max-w-md mx-auto md:mx-0">
              {features.map(({ icon: Icon, title, text }) => (
                <div key={title} className="text-center">
                  <div className="inline-flex h-10 w-10 md:h-11 md:w-11 rounded-full bg-primary/10 text-primary items-center justify-center mb-2 md:mb-3">
                    <Icon className="h-4 w-4 md:h-5 md:w-5" strokeWidth={1.4} />
                  </div>
                  <div className="text-[0.65rem] md:text-sm text-foreground font-medium">{title}</div>
                  <div className="text-[0.55rem] md:text-xs text-muted-foreground font-light mt-0.5">{text}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl bg-card/80 backdrop-blur-xl border border-border/60 p-6 md:p-10 shadow-[var(--shadow-luxe)]">
            {submitted ? (
              <div className="text-center py-12">
                <CheckCircle2 className="h-14 w-14 text-primary mx-auto mb-6" strokeWidth={1.3} />
                <h3 className="font-[var(--font-heading)] text-2xl font-medium text-foreground">Obrigado!</h3>
                <p className="mt-3 text-muted-foreground font-light">
                  Sua solicitação foi recebida. Entraremos em contato em breve.
                </p>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate className="space-y-5">
                <div>
                  <Label htmlFor="name" className="text-xs tracking-[0.18em] uppercase text-muted-foreground font-light">Nome Completo *</Label>
                  <Input id="name" name="name" required maxLength={100}
                    className="mt-2 h-12 bg-background/70 border-border focus-visible:ring-primary focus-visible:ring-2 focus-visible:ring-offset-0 focus-visible:shadow-[0_0_0_4px_hsl(38_45%_52%/0.12)]" />
                  {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <Label htmlFor="email" className="text-xs tracking-[0.18em] uppercase text-muted-foreground font-light">E-mail *</Label>
                    <Input id="email" name="email" type="email" required maxLength={255}
                      className="mt-2 h-12 bg-background/70 border-border focus-visible:ring-primary focus-visible:ring-2 focus-visible:ring-offset-0 focus-visible:shadow-[0_0_0_4px_hsl(38_45%_52%/0.12)]" />
                    {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-xs tracking-[0.18em] uppercase text-muted-foreground font-light">Telefone *</Label>
                    <Input id="phone" name="phone" type="tel" required maxLength={30}
                      className="mt-2 h-12 bg-background/70 border-border focus-visible:ring-primary focus-visible:ring-2 focus-visible:ring-offset-0 focus-visible:shadow-[0_0_0_4px_hsl(38_45%_52%/0.12)]" />
                    {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone}</p>}
                  </div>
                </div>

                <div>
                  <Label htmlFor="project" className="text-xs tracking-[0.18em] uppercase text-muted-foreground font-light">Conte-nos sobre seu projeto *</Label>
                  <Textarea id="project" name="project" rows={5} required maxLength={1000}
                    className="mt-2 bg-background/70 border-border focus-visible:ring-primary focus-visible:ring-2 focus-visible:ring-offset-0 focus-visible:shadow-[0_0_0_4px_hsl(38_45%_52%/0.12)]" />
                  {errors.project && <p className="text-xs text-destructive mt-1">{errors.project}</p>}
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-14 bg-primary text-primary-foreground hover:bg-primary/90 rounded-full text-[0.6rem] md:text-xs tracking-[0.2em] uppercase font-light shadow-[0_20px_50px_-12px_hsl(38_45%_52%/0.55)] hover:brightness-110 transition-all"
                >
                  {loading ? "Enviando..." : (
                    <span className="flex items-center justify-center gap-4">
                      Solicitar Orçamento Premium <ArrowRight className="h-4 w-4" />
                    </span>
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
