import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import ExcellusHeader from "@/components/excellus/ExcellusHeader";
import ExcellusFooter from "@/components/excellus/ExcellusFooter";
import { servicesData } from "@/components/excellus/services/ServicesData";
import { Button } from "@/components/ui/button";

export default function ServiceDetailPage() {
  const { id } = useParams<{ id: string }>();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const service = servicesData.find((s) => s.id === id);

  if (!service) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center">
        <ExcellusHeader />
        <h1 className="text-3xl font-light">Serviço não encontrado</h1>
        <Link to="/servicos" className="mt-5 text-primary hover:underline">Voltar para Serviços</Link>
        <ExcellusFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <ExcellusHeader />
      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden" style={{ minHeight: "50svh" }}>
          <img src={service.img} alt={service.title} className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="relative container mx-auto px-4 md:px-6">
            <Link to="/servicos" className="inline-flex items-center gap-2 text-white/70 hover:text-primary transition-colors text-[0.6rem] tracking-widest uppercase mb-6 md:mb-8">
              <ArrowLeft className="h-3.5 w-3.5" /> Voltar para Serviços
            </Link>
            <div className="max-w-2xl">
              <span className="inline-block px-3 py-1 rounded-full text-[0.55rem] md:text-[0.6rem] tracking-[0.25em] uppercase font-medium text-white border border-white/30 backdrop-blur-md bg-black/35 mb-4 md:mb-6">
                {service.tag}
              </span>
              <h1 className="font-[var(--font-heading)] text-2xl md:text-6xl lg:text-7xl font-light text-white leading-tight mb-4 md:mb-6">
                {service.title}
              </h1>
              <p className="text-sm md:text-lg text-white/80 font-light leading-relaxed">
                {service.desc}
              </p>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-12 md:py-28">
          <div className="container mx-auto px-4 md:px-6 max-w-5xl">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-20">
              
              <div className="lg:col-span-2 space-y-10 md:space-y-12">
                <div>
                  <h2 className="text-xl md:text-3xl font-light text-foreground mb-4 md:mb-6">Sobre o Serviço</h2>
                  <div className="w-12 h-px bg-primary mb-4 md:mb-6" />
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed font-light">
                    {service.longDesc || "Na Excellus Remodeling, elevamos o padrão de qualidade a cada projeto. Este serviço é executado com as melhores práticas do mercado, materiais de alto padrão e uma equipe dedicada a realizar sua visão com perfeição e pontualidade."}
                  </p>
                </div>

                <div>
                  <h3 className="text-lg md:text-2xl font-light text-foreground mb-4 md:mb-6">O Que Está Incluído</h3>
                  <ul className="space-y-3 md:space-y-4">
                    {(service.features || ["Consultoria Premium", "Materiais de Alto Padrão", "Mão de Obra Especializada", "Garantia de Qualidade"]).map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm md:text-base text-muted-foreground font-light">
                        <CheckCircle2 className="h-4 w-4 md:h-5 md:w-5 text-primary shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="lg:col-span-1">
                <div className="luxe-card p-6 md:p-8 sticky top-32">
                  <h3 className="font-[var(--font-heading)] text-lg md:text-2xl mb-4">Pronto para transformar seu espaço?</h3>
                  <p className="text-xs md:text-sm text-muted-foreground font-light mb-6 md:mb-8">
                    Fale diretamente com nossa equipe de especialistas e receba uma consultoria exclusiva.
                  </p>
                  <Button
                    asChild
                    className="w-full h-12 md:h-14 rounded-full text-[0.65rem] md:text-xs tracking-[0.2em] uppercase font-normal text-white shadow-[0_8px_24px_-8px_hsl(38_45%_52%/0.55)]"
                    style={{ background: "linear-gradient(135deg, #c9a227 0%, #8b6508 100%)" }}
                  >
                    <a href={`https://wa.me/16893063140?text=Olá! Gostaria de mais informações sobre o serviço de ${service.title}.`} target="_blank" rel="noreferrer">
                      Solicitar Orçamento
                    </a>
                  </Button>
                </div>
              </div>

            </div>
          </div>
        </section>
      </main>
      <ExcellusFooter />
    </div>
  );
}
