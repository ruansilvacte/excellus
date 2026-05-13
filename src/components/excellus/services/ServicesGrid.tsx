import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { servicesData } from "./ServicesData";

export default function ServicesGrid() {
  return (
    <section id="servicos-grid" className="py-16 md:py-20 bg-background">
      <div className="container mx-auto px-6 max-w-7xl">

        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="eyebrow">Our Portfolio</span>
          <h2 className="mt-5 text-4xl md:text-5xl font-light text-foreground leading-[1.05]">
            Solutions to <span className="text-gold-gradient">Transform</span> Your Space
          </h2>
          <div className="mt-6 flex justify-center"><span className="gold-divider" /></div>
          <p className="mt-6 text-base text-muted-foreground font-light leading-relaxed">
            Select a specialty below to discover more about our process and execution details.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {servicesData.map((service) => (
            <Link
              key={service.id}
              to={`/servicos/${service.id}`}
              className="luxe-card group flex flex-col overflow-hidden transition-all duration-500 hover:-translate-y-2"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={service.img}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-4 left-5 right-5">
                  <span className="text-[0.60rem] tracking-[0.2em] uppercase text-amber-400 font-bold mb-1 block drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
                    {service.tag}
                  </span>
                  <h3 className="font-[var(--font-heading)] text-2xl font-light text-white">
                    {service.title}
                  </h3>
                </div>
              </div>
              <div className="flex-1 p-6 flex flex-col">
                <p className="text-sm text-muted-foreground leading-relaxed font-light mb-6 flex-1 line-clamp-3">
                  {service.desc}
                </p>
                <div className="mt-auto flex items-center gap-2 text-xs text-primary font-medium tracking-wider uppercase group/link">
                  View Details
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}