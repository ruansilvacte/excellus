import marbleImg from "@/assets/excellus-marble.jpg";
import g1 from "@/assets/excellus-gallery-1.jpg";
import g2 from "@/assets/excellus-gallery-2.jpg";
import g3 from "@/assets/excellus-gallery-3.jpg";
import about from "@/assets/excellus-about.jpg";

const materials = [
  { label: "Mármore & Pedras Naturais", img: marbleImg, desc: "Italianos, brasileiros e importados de todo o mundo." },
  { label: "Porcelanato de Alta Resistência", img: g1, desc: "Marcas premium nacionais e importadas, em grandes formatos." },
  { label: "Madeiras Nobres", img: g2, desc: "Revestimentos, decks e pisos em espécies selecionadas." },
  { label: "Metais Sofisticados", img: g3, desc: "Torneiras, puxadores e acabamentos em ouro, preto fosco e inox premium." },
  { label: "Iluminação LED Premium", img: about, desc: "Fitas, perfis e luminárias de alta performance e design exclusivo." },
];

export default function ServicesMaterials() {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-6">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="eyebrow">Materiais Selecionados</span>
          <h2 className="mt-5 text-4xl md:text-5xl lg:text-6xl font-light text-foreground leading-[1.05]">
            Apenas o{" "}
            <span className="text-gold-gradient">Melhor</span>{" "}
            para Seu Projeto
          </h2>
          <div className="mt-6 flex justify-center">
            <span className="gold-divider" />
          </div>
          <p className="mt-6 text-base text-muted-foreground font-light leading-relaxed">
            Trabalhamos exclusivamente com materiais de alto padrão, selecionados
            rigorosamente para garantir beleza, durabilidade e sofisticação.
          </p>
        </div>

        {/* Materials showcase grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {materials.map((mat, i) => (
            <div
              key={mat.label}
              className={`group relative overflow-hidden rounded-2xl shadow-[var(--shadow-soft)] ${
                i === 0 ? "md:col-span-2 lg:col-span-1 lg:row-span-2" : ""
              }`}
              style={{ minHeight: i === 0 ? "28rem" : "18rem" }}
            >
              <img
                src={mat.img}
                alt={mat.label}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.4s] group-hover:scale-105"
                loading="lazy"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent transition-opacity duration-500" />
              {/* Gold overlay on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: "linear-gradient(to top, hsl(30 10% 5% / 0.85) 0%, transparent 60%)" }}
              />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-7">
                <div className="h-px w-8 bg-primary mb-4 group-hover:w-16 transition-all duration-500" />
                <h3 className="font-[var(--font-heading)] text-xl md:text-2xl font-medium text-white leading-tight">
                  {mat.label}
                </h3>
                <p className="mt-2 text-sm text-white/75 font-light leading-relaxed opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                  {mat.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
