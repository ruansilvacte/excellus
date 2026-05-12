import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingSocial from "@/components/FloatingSocial";
import SeoHead from "@/components/SeoHead";
import { MapPin, Phone } from "lucide-react";
import { useServiceAreas } from "@/hooks/useServiceAreas";
import northPortImg from "@/assets/north-port.png";

// City-specific images for Florida Gulf Coast regions
const cityImages: Record<string, { src: string; label: string }[]> = {
  "Primary Service Areas": [
    { src: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&q=80", label: "Bradenton" },
    { src: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80", label: "Lakewood Ranch" },
    { src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80", label: "Parrish" },
    { src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80", label: "Sarasota" },
  ],
  "Airbnb & Coastal Areas": [
    { src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80", label: "Anna Maria Island" },
    { src: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=600&q=80", label: "Bradenton Beach" },
    { src: "https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?w=600&q=80", label: "Holmes Beach" },
    { src: "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=600&q=80", label: "Longboat Key" },
    { src: "https://images.unsplash.com/photo-1504681869696-d977211a5f4c?w=600&q=80", label: "Siesta Key" },
  ],
  "Tampa Bay Area": [
    { src: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=600&q=80", label: "Tampa" },
    { src: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=600&q=80", label: "Brandon" },
    { src: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80", label: "Clearwater" },
    { src: "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=600&q=80", label: "St. Petersburg" },
    { src: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=600&q=80", label: "Riverview" },
  ],
  "South Region": [
    { src: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=600&q=80", label: "Venice" },
    { src: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&q=80", label: "Port Charlotte" },
    { src: "https://images.unsplash.com/photo-1605146769289-440113cc3d00?w=600&q=80", label: "Punta Gorda" },
  ],
  "Extended Coverage": [
    { src: "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=600&q=80", label: "Palmetto" },
    { src: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&q=80", label: "Ellenton" },
    { src: northPortImg, label: "North Port" },
    { src: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&q=80", label: "Osprey" },
  ],
};

const defaultCityImages: { src: string; label: string }[] = [
  { src: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=600&q=80", label: "Florida" },
  { src: "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=600&q=80", label: "Gulf Coast" },
  { src: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=600&q=80", label: "Sunshine State" },
];

function RegionCarousel({ regionName }: { regionName: string }) {
  const images = cityImages[regionName] || defaultCityImages;
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent((p) => (p + 1) % images.length), 3500);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="relative w-full h-44 rounded-xl overflow-hidden mb-5">
      {images.map((img, i) => (
        <img
          key={i}
          src={img.src}
          alt={img.label}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
          style={{ opacity: i === current ? 1 : 0 }}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      <div className="absolute bottom-3 left-4">
        <span
          className="text-white/60 text-[10px] uppercase tracking-[0.15em] font-medium"
        >
          {regionName}
        </span>
        <p
          className="text-white text-sm font-semibold mt-0.5"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {images[current].label}
        </p>
      </div>
      <div className="absolute bottom-3 right-4 flex gap-1.5">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className="w-1.5 h-1.5 rounded-full transition-all duration-300"
            style={{ background: i === current ? "hsl(43 58% 61%)" : "rgba(255,255,255,0.4)" }}
          />
        ))}
      </div>
    </div>
  );
}
// No emojis — clean region titles

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, filter: "blur(6px)" },
  visible: {
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

export default function ServiceAreas() {
  const { data: dbAreas = [], isLoading } = useServiceAreas(true);

  const groupedAreas = dbAreas.reduce<Record<string, typeof dbAreas>>((acc, area) => {
    const region = area.region || "Other";
    if (!acc[region]) acc[region] = [];
    acc[region].push(area);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-background">
      <SeoHead slug="/service-areas" fallbackTitle="Service Areas — All Shine Up" />
      <Header />

      {/* Hero */}
      <section className="w-full pt-36 pb-10 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.span
            className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Service Areas
          </motion.span>
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.05] mt-4 max-w-4xl"
            style={{ fontFamily: "var(--font-heading)", color: "hsl(var(--brand-brown))" }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          >
            Proudly serving Florida's Gulf Coast.
          </motion.h1>
          <motion.p
            className="text-muted-foreground text-base md:text-lg mt-6 max-w-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            From Tampa to Venice — covering 100+ ZIP codes across Bradenton, Sarasota, and beyond.
          </motion.p>
          <motion.div
            className="w-20 h-1 rounded-full mt-8"
            style={{ background: "linear-gradient(90deg, hsl(43 74% 50%), hsl(43 60% 60%))" }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          />
        </div>
      </section>

      {/* Regions Grid */}
      <section className="w-full py-6 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {isLoading
              ? Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="rounded-2xl border border-border bg-card p-8">
                    <div className="mb-6 h-10 w-40 rounded-lg bg-muted animate-pulse" />
                    <div className="flex flex-wrap gap-2">
                      {Array.from({ length: 6 }).map((__, pillIndex) => (
                        <div key={pillIndex} className="h-8 w-24 rounded-full bg-muted animate-pulse" />
                      ))}
                    </div>
                  </div>
                ))
              : Object.entries(groupedAreas).map(([regionName, regionAreas], i) => (
                <motion.div
                  key={i}
                  variants={cardVariants}
                  className="rounded-2xl border border-border bg-card p-6 transition-all duration-500 hover:shadow-xl"
                >
                  <RegionCarousel regionName={regionName} />
                  <div className="flex flex-wrap gap-2">
                    {regionAreas.map((area) => (
                      <span
                        key={area.id}
                        className="px-3 py-1.5 rounded-full text-xs font-medium bg-muted text-foreground"
                      >
                        {area.name}
                      </span>
                    ))}
                  </div>
                </motion.div>
                ))}
          </motion.div>

          {/* Stats bar */}
          <motion.div
            className="mt-16 rounded-2xl px-8 py-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-white"
            style={{ background: "#D4A017" }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div>
              <span className="text-3xl md:text-4xl font-bold" style={{ fontFamily: "var(--font-heading)" }}>100+</span>
              <p className="text-white/70 text-sm mt-1">ZIP Codes Covered</p>
            </div>
            <div>
              <span className="text-3xl md:text-4xl font-bold" style={{ fontFamily: "var(--font-heading)" }}>5</span>
              <p className="text-white/70 text-sm mt-1">Major Regions</p>
            </div>
            <div>
              <span className="text-3xl md:text-4xl font-bold" style={{ fontFamily: "var(--font-heading)" }}>400+</span>
              <p className="text-white/70 text-sm mt-1">Monthly Services</p>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            className="mt-12 rounded-3xl overflow-hidden text-center"
            style={{ background: "#D4A017" }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="p-8 md:p-16 flex flex-col items-center gap-5">
              <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-white/50">
                Not Sure If We Serve Your Area?
              </span>
              <h3
                className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white leading-tight max-w-lg"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Let's make your property shine.
              </h3>
              <p className="text-white/70 text-sm md:text-base max-w-md leading-relaxed">
                Contact us and we'll let you know. Free, no-obligation quotes available.
              </p>
              <motion.a
                href="/quote"
                className="mt-2 inline-flex items-center gap-2 px-8 py-3 rounded-full text-[13px] font-bold uppercase tracking-wider transition-all duration-300 hover:scale-105"
                style={{ background: "white", color: "hsl(30 10% 12%)" }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Phone className="w-4 h-4" />
                Check Availability
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
      <FloatingSocial />
    </div>
  );
}
