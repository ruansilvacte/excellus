import { useState } from "react";
import { Clock, MessageSquare, FileText, Settings, ArrowRight, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

const benefits = [
  {
    icon: Clock,
    title: "Atendimento Rápido",
    desc: "Respondemos em até 2 horas durante o horário comercial, via WhatsApp ou e-mail.",
  },
  {
    icon: MessageSquare,
    title: "Consultoria Especializada",
    desc: "Nossa equipe avalia seu projeto com expertise técnica e sensibilidade estética.",
  },
  {
    icon: FileText,
    title: "Orçamento Transparente",
    desc: "Sem letras miúdas. Detalhamento completo de materiais, mão de obra e prazo.",
  },
  {
    icon: Settings,
    title: "Gestão Completa",
    desc: "Cuidamos de tudo, do planejamento à entrega, para que você não se preocupe com nada.",
  },
];

const projectTypes = [
  "Reforma de Banheiro",
  "Reforma de Cozinha",
  "Pisos & Revestimentos",
  "Drywall",
  "Pintura Premium",
  "Painéis Decorativos",
  "Ambientes Integrados",
  "Projeto Completo",
  "Outro",
];

export default function ContactMain() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Olá! Gostaria de um orçamento.\n\n*Nome:* ${form.name}\n*E-mail:* ${form.email}\n*Telefone:* ${form.phone}\n*Tipo de Projeto:* ${form.projectType}\n*Mensagem:* ${form.message}`;
    window.open(`https://wa.me/16893063140?text=${encodeURIComponent(msg)}`, "_blank");
    setSubmitted(true);
  };

  return (
    <section id="contato-main" className="py-10 md:py-16 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-start">
 
          {/* Left column — info & benefits */}
          <div>
            <span className="eyebrow">Por que Escolher a Excellus?</span>
            <h2 className="mt-5 text-2xl md:text-4xl lg:text-5xl font-light text-foreground leading-tight">
              Um atendimento{" "}
              <span className="text-gold-gradient">à sua altura</span>
            </h2>
            <div className="mt-5 h-px w-16 bg-gradient-to-r from-primary to-transparent" />
 
            <p className="mt-7 text-sm md:text-base text-muted-foreground leading-relaxed font-light">
              Entendemos que cada projeto é único e merece atenção individual.
              Desde o primeiro contato, você perceberá o diferencial de trabalhar
              com uma equipe verdadeiramente comprometida com a excelência.
            </p>
 
            {/* Benefits */}
            <div className="mt-10 space-y-5">
              {benefits.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex gap-4 md:gap-5 group">
                  <div className="shrink-0 h-10 w-10 md:h-12 md:w-12 rounded-xl bg-primary/8 border border-primary/20 flex items-center justify-center transition-all duration-400 group-hover:bg-primary/14 group-hover:border-primary/35">
                    <Icon className="h-4 w-4 md:h-5 md:w-5 text-primary" strokeWidth={1.3} />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground text-xs md:text-sm tracking-wide">{title}</h3>
                    <p className="mt-1 text-xs md:text-sm text-muted-foreground font-light leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
 
            {/* WhatsApp direct */}
            <div className="mt-10">
              <Button
                asChild
                size="lg"
                className="rounded-full px-6 md:px-7 h-11 md:h-13 text-[0.65rem] md:text-sm tracking-[0.2em] uppercase font-normal text-white border-0 transition-all hover:scale-[1.02]"
                style={{ background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)" }}
              >
                <a href="https://wa.me/16893063140" target="_blank" rel="noreferrer" className="flex items-center gap-3">
                  Chamar no WhatsApp <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
 
          {/* Right column — form */}
          <div>
            <div className="luxe-card p-6 md:p-10" style={{ background: "linear-gradient(160deg, hsl(0 0% 100% / 0.95), hsl(36 30% 97% / 0.85))" }}>
              <div className="mb-6 md:mb-8">
                <h3 className="font-[var(--font-heading)] text-xl md:text-2xl font-medium text-foreground">
                  Solicitar Orçamento
                </h3>
                <p className="mt-2 text-sm text-muted-foreground font-light">
                  Preencha o formulário e entraremos em contato em breve.
                </p>
              </div>

              {submitted ? (
                <div className="py-12 text-center">
                  <div className="h-16 w-16 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center mx-auto mb-5">
                    <Send className="h-7 w-7 text-primary" strokeWidth={1.3} />
                  </div>
                  <h4 className="font-[var(--font-heading)] text-xl font-medium text-foreground">Mensagem Enviada!</h4>
                  <p className="mt-2 text-sm text-muted-foreground font-light">Você será redirecionado ao WhatsApp. Nossa equipe retornará em breve.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name */}
                  <div>
                    <label htmlFor="contact-name" className="block text-[0.68rem] tracking-[0.2em] uppercase text-muted-foreground font-medium mb-2">Nome Completo *</label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Seu nome"
                      className="w-full h-12 px-4 rounded-xl border border-border/60 bg-white/70 backdrop-blur text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/10 transition-all font-light"
                    />
                  </div>

                  {/* Email + Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="contact-email" className="block text-[0.68rem] tracking-[0.2em] uppercase text-muted-foreground font-medium mb-2">E-mail *</label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        placeholder="seu@email.com"
                        className="w-full h-12 px-4 rounded-xl border border-border/60 bg-white/70 backdrop-blur text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/10 transition-all font-light"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-phone" className="block text-[0.68rem] tracking-[0.2em] uppercase text-muted-foreground font-medium mb-2">Telefone *</label>
                      <input
                        id="contact-phone"
                        name="phone"
                        type="tel"
                        required
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="(689) 000-0000"
                        className="w-full h-12 px-4 rounded-xl border border-border/60 bg-white/70 backdrop-blur text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/10 transition-all font-light"
                      />
                    </div>
                  </div>

                  {/* Project type */}
                  <div>
                    <label htmlFor="contact-project" className="block text-[0.68rem] tracking-[0.2em] uppercase text-muted-foreground font-medium mb-2">Tipo de Projeto</label>
                    <select
                      id="contact-project"
                      name="projectType"
                      value={form.projectType}
                      onChange={handleChange}
                      className="w-full h-12 px-4 rounded-xl border border-border/60 bg-white/70 backdrop-blur text-sm text-foreground focus:outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/10 transition-all font-light"
                    >
                      <option value="">Selecione o tipo de projeto</option>
                      {projectTypes.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="contact-message" className="block text-[0.68rem] tracking-[0.2em] uppercase text-muted-foreground font-medium mb-2">Mensagem</label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={4}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Descreva seu projeto, localização e qualquer detalhe relevante..."
                      className="w-full px-4 py-3 rounded-xl border border-border/60 bg-white/70 backdrop-blur text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/10 transition-all font-light resize-none"
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    className="w-full h-14 rounded-full text-[0.65rem] md:text-sm tracking-[0.2em] uppercase font-medium text-white transition-all hover:scale-[1.01] hover:brightness-110 flex items-center justify-center gap-3"
                    style={{
                      background: "linear-gradient(135deg, #c9a227 0%, #8b6508 100%)",
                      boxShadow: "0 8px 24px -8px hsl(38 60% 40% / 0.5)"
                    }}
                  >
                    Enviar Solicitação <ArrowRight className="h-4 w-4" />
                  </button>

                  <p className="text-center text-[0.68rem] text-muted-foreground font-light">
                    Você será redirecionado ao WhatsApp para finalizar o contato.
                  </p>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
