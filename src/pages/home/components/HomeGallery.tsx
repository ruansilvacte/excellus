import { useState } from "react";
import { X } from "lucide-react";

const images = [
  "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
];

export default function HomeGallery() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <section id="projetos" className="py-24 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs tracking-[0.3em] uppercase text-primary/70 font-medium">
            Portfólio
          </span>
          <h2 className="font-heading text-4xl md:text-5xl text-primary mt-4 leading-tight">
            Projetos que <span className="italic text-primary/80">Falam por Si</span>
          </h2>
          <p className="text-muted-foreground mt-5">
            Veja a qualidade do nosso trabalho em projetos reais.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {images.map((src, i) => (
            <button
              key={src}
              onClick={() => setActive(src)}
              className={`group relative overflow-hidden rounded-xl bg-secondary aspect-square ${
                i === 0 ? "md:col-span-2 md:row-span-2 aspect-auto md:aspect-[2/2]" : ""
              }`}
            >
              <img
                src={src}
                alt={`Projeto ${i + 1}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/30 transition-colors duration-500" />
            </button>
          ))}
        </div>
      </div>

      {active && (
        <div
          className="fixed inset-0 z-[60] bg-primary/95 backdrop-blur-sm flex items-center justify-center p-6"
          onClick={() => setActive(null)}
        >
          <button
            className="absolute top-6 right-6 h-10 w-10 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20"
            onClick={() => setActive(null)}
            aria-label="Fechar"
          >
            <X className="h-5 w-5" />
          </button>
          <img src={active} alt="" className="max-h-[90vh] max-w-full rounded-xl shadow-2xl" />
        </div>
      )}
    </section>
  );
}
