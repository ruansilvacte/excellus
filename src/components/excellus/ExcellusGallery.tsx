import { useRef, useState, useEffect } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import g1 from "@/assets/excellus-gallery-1.jpg";
import g2 from "@/assets/excellus-gallery-2.jpg";
import g3 from "@/assets/excellus-gallery-3.jpg";
import g4 from "@/assets/excellus-gallery-4.jpg";

const images = [
  { src: g1, alt: "Reforma de banheiro de luxo" },
  { src: g2, alt: "Fachada moderna premium" },
  { src: g3, alt: "Suite master sofisticada" },
  { src: g4, alt: "Cozinha com ilha em mármore" },
];

export default function ExcellusGallery() {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const max = el.scrollWidth - el.clientWidth;
      setProgress(max > 0 ? (el.scrollLeft / max) * 100 : 0);
    };
    onScroll();
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const scrollBy = (dir: number) => {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.6), behavior: "smooth" });
  };

  return (
    <section id="galeria" className="py-10 md:py-16 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-8 md:mb-10">
          <span className="eyebrow">Galeria</span>
          <h2 className="mt-4 text-2xl md:text-6xl font-light text-foreground leading-[1.05]">
            Projetos que <span className="text-gold-gradient">Inspiram</span>
          </h2>
        </div>
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-12 md:w-24 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-12 md:w-24 bg-gradient-to-l from-background to-transparent z-10" />

        <div
          ref={ref}
          className="flex gap-4 md:gap-7 overflow-x-auto snap-x snap-mandatory pb-2 px-4 md:px-12 scroll-smooth"
          style={{ scrollbarWidth: "none" }}
        >
          {images.map((img, i) => (
            <figure
              key={i}
              className="snap-start shrink-0 w-[85%] sm:w-[48%] md:w-[36%] lg:w-[26%] group"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-xl shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-luxe)] transition-shadow duration-700">
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </figure>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-6 mt-10">
        <div className="mx-auto h-px w-40 bg-border relative overflow-hidden">
          <span
            className="absolute inset-y-0 left-0 bg-primary transition-[width] duration-300"
            style={{ width: `${Math.max(progress, 8)}%` }}
          />
        </div>
      </div>
    </section>
  );
}
