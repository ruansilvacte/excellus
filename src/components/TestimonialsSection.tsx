import { motion } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { useHomeContent } from "@/hooks/useHomeContent";

const defaultTestimonials = [
  {
    text: "All Shine Up transformed our Airbnb. Every guest comments on how spotless it is. Our reviews went from 4.2 to 4.9 stars since hiring them!",
    name: "Marcus T.",
    date: "21 February 2025",
    initial: "M",
    gradient: "from-orange-400 to-amber-500",
  },
  {
    text: "Kassandra and her team are incredible. They clean our vacation rental between every guest and never miss a detail. Truly guest-ready every time.",
    name: "Sarah L.",
    date: "20 February 2025",
    initial: "S",
    gradient: "from-blue-400 to-indigo-500",
  },
  {
    text: "We manage 12 short-term rentals and All Shine Up handles all of them. The consistency across properties is remarkable. No other company comes close.",
    name: "Jennifer K.",
    date: "20 February 2025",
    initial: "J",
    gradient: "from-emerald-400 to-teal-500",
  },
  {
    text: "The 24-hour guarantee sealed the deal for me. One time I had a concern, they came back same day and fixed it. That's real accountability.",
    name: "David R.",
    date: "18 February 2025",
    initial: "D",
    gradient: "from-rose-400 to-pink-500",
  },
  {
    text: "Their structured process is what sets them apart. You can tell they have checklists — nothing gets missed. My home has never been this clean.",
    name: "Michael C.",
    date: "15 February 2025",
    initial: "M",
    gradient: "from-violet-400 to-purple-500",
  },
  {
    text: "After our renovation, All Shine Up did the post-construction cleanup. They removed every speck of dust and debris. Move-in ready in one day!",
    name: "Amanda W.",
    date: "12 February 2025",
    initial: "A",
    gradient: "from-cyan-400 to-blue-500",
  },
];

const gradients = [
  "from-orange-400 to-amber-500",
  "from-blue-400 to-indigo-500",
  "from-emerald-400 to-teal-500",
  "from-rose-400 to-pink-500",
  "from-violet-400 to-purple-500",
  "from-cyan-400 to-blue-500",
];

function GoogleIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}

function AnimatedStars({ delay = 0 }: { delay?: number }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: delay + i * 0.08, duration: 0.3, type: "spring", stiffness: 300 }}
        >
          <Star className="w-5 h-5 fill-yellow-400 text-yellow-400 drop-shadow-[0_0_3px_rgba(250,204,21,0.4)]" />
        </motion.div>
      ))}
    </div>
  );
}

function RatingCounter() {
  const [count, setCount] = useState(0);
  const target = 5.0;

  useEffect(() => {
    let frame: number;
    const duration = 1500;
    const start = performance.now();
    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(parseFloat((eased * target).toFixed(1)));
      if (progress < 1) frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <span className="text-5xl md:text-6xl font-black tabular-nums" style={{ color: "hsl(30 15% 30%)" }}>
      {count.toFixed(1)}
    </span>
  );
}

export default function TestimonialsSection() {
  const { data: content } = useHomeContent();
  const scale = parseFloat(content?.home_font_scale_testimonials || "1") || 1;
  const [startIndex, setStartIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Build testimonials from DB or fallback to defaults
  const testimonials = (() => {
    if (!content) return defaultTestimonials;

    const dbTestimonials = [];
    for (let i = 1; i <= 6; i++) {
      const name = content[`home_testimonial_name_${i}`];
      const text = content[`home_testimonial_text_${i}`];
      if (name && text) {
        dbTestimonials.push({
          text,
          name,
          date: content[`home_testimonial_location_${i}`] || "",
          initial: name.charAt(0).toUpperCase(),
          gradient: gradients[(i - 1) % gradients.length],
        });
      }
    }
    return dbTestimonials.length > 0 ? dbTestimonials : defaultTestimonials;
  })();

  const getVisibleCount = () => {
    if (typeof window === "undefined") return 3;
    if (window.innerWidth < 640) return 1;
    if (window.innerWidth < 1024) return 2;
    return 3;
  };

  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    const update = () => setVisibleCount(getVisibleCount());
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const maxStart = Math.max(0, testimonials.length - visibleCount);

  const prev = useCallback(() => {
    setIsAutoPlaying(false);
    setStartIndex((i) => Math.max(0, i - 1));
  }, []);

  const next = useCallback(() => {
    setIsAutoPlaying(false);
    setStartIndex((i) => Math.min(maxStart, i + 1));
  }, [maxStart]);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setStartIndex((i) => (i >= maxStart ? 0 : i + 1));
    }, 4000);
    return () => clearInterval(timer);
  }, [isAutoPlaying, maxStart]);

  const visible = testimonials.slice(startIndex, startIndex + visibleCount);

  return (
    <section className="relative w-full py-16 md:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-[hsl(210_20%_96%)] via-white to-[hsl(210_20%_96%)]">
      {/* Subtle background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[hsl(43_74%_55%/0.06)] rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.p
            className="text-xs md:text-sm font-bold tracking-[0.25em] uppercase mb-4"
            style={{ color: "hsl(30 70% 50%)" }}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            ✦ Customer Reviews
          </motion.p>

          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight mb-4"
            style={{
              fontFamily: "var(--font-heading)",
              color: "hsl(30 15% 30%)",
              fontSize: `clamp(${1.875 * scale}rem, ${4 * scale}vw, ${3 * scale}rem)`,
            }}
          >
            Trusted by Real Clients
          </h2>

          <p className="max-w-2xl mx-auto" style={{ color: "hsl(30 12% 50%)", fontSize: `${1.0625 * scale}rem` }}>
            See why our clients consistently rate us 5 stars on Google
          </p>
        </motion.div>

        {/* Trust Badge Row */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-6 md:gap-10 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Rating */}
          <div className="flex items-center gap-3">
            <RatingCounter />
            <div className="flex flex-col">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-xs font-medium mt-0.5" style={{ color: "hsl(30 10% 45%)" }}>
                out of 5.0
              </span>
            </div>
          </div>

          <div className="w-px h-10 bg-border hidden md:block" />

          {/* Google badge */}
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-border shadow-sm">
            <GoogleIcon className="w-5 h-5" />
            <span className="text-sm font-semibold" style={{ color: "hsl(30 10% 25%)" }}>Google Reviews</span>
            <span className="text-xs text-emerald-600 font-semibold flex items-center gap-0.5">
              ✓ Verified
            </span>
          </div>

          <a
            href="https://share.google/ylu8IY0nGt63rCcYy"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-border shadow-sm text-sm font-semibold hover:shadow-md transition-all"
            style={{ color: "hsl(30 10% 25%)" }}
          >
            <GoogleIcon className="w-4 h-4" />
            See all reviews
          </a>
        </motion.div>

        {/* Carousel */}
        <div className="relative flex items-center gap-3">
          {/* Prev */}
          <motion.button
            onClick={prev}
            disabled={startIndex === 0 && !isAutoPlaying}
            className="shrink-0 w-11 h-11 rounded-full bg-white border border-border shadow-md flex items-center justify-center hover:shadow-lg transition-all duration-300 disabled:opacity-30 z-10"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronLeft className="w-5 h-5" style={{ color: "hsl(30 10% 25%)" }} />
          </motion.button>

          {/* Cards */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {visible.map((t, i) => (
              <motion.div
                key={`${startIndex}-${i}`}
                className="group relative rounded-2xl border border-white/60 p-6 flex flex-col cursor-default"
                style={{
                  background: "linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,255,255,0.7))",
                  backdropFilter: "blur(12px)",
                  boxShadow: "0 4px 24px -4px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)",
                }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{
                  y: -4,
                  boxShadow: "0 12px 40px -8px rgba(0,0,0,0.12), 0 4px 12px rgba(0,0,0,0.06)",
                  transition: { duration: 0.3 },
                }}
              >
                {/* Quote watermark */}
                <Quote
                  className="absolute top-4 right-4 w-10 h-10 opacity-[0.04] group-hover:opacity-[0.08] transition-opacity duration-500"
                  style={{ color: "hsl(43 74% 55%)" }}
                />

                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-11 h-11 rounded-full bg-gradient-to-br ${t.gradient} flex items-center justify-center text-white font-bold text-sm shadow-md`}>
                      {t.initial}
                    </div>
                    <div>
                      <p className="text-sm font-bold" style={{ color: "hsl(30 15% 30%)" }}>{t.name}</p>
                      <p className="text-xs" style={{ color: "hsl(30 10% 55%)" }}>{t.date}</p>
                    </div>
                  </div>
                  <GoogleIcon className="w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity" />
                </div>

                {/* Stars */}
                <div className="mb-3">
                  <AnimatedStars delay={i * 0.15} />
                </div>

                {/* Text */}
                <p
                  className="text-sm leading-relaxed flex-1 line-clamp-4"
                  style={{ color: "hsl(30 10% 30%)", lineHeight: "1.7" }}
                >
                  {t.text}
                </p>

              </motion.div>
            ))}
          </div>

          {/* Next */}
          <motion.button
            onClick={next}
            disabled={startIndex >= maxStart && !isAutoPlaying}
            className="shrink-0 w-11 h-11 rounded-full bg-white border border-border shadow-md flex items-center justify-center hover:shadow-lg transition-all duration-300 disabled:opacity-30 z-10"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronRight className="w-5 h-5" style={{ color: "hsl(30 10% 25%)" }} />
          </motion.button>
        </div>

        {/* Dots indicator */}
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: maxStart + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => { setIsAutoPlaying(false); setStartIndex(i); }}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === startIndex
                  ? "w-6 bg-[hsl(43_74%_55%)]"
                  : "w-2 bg-[hsl(30_10%_80%)] hover:bg-[hsl(30_10%_60%)]"
              }`}
            />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-sm font-medium mb-4" style={{ color: "hsl(30 10% 45%)" }}>
            Join hundreds of satisfied customers
          </p>
          <motion.a
            href="/quote"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-bold text-white shadow-lg transition-all"
            style={{
              background: "linear-gradient(135deg, hsl(43 74% 55%), hsl(30 70% 50%))",
              boxShadow: "0 4px 20px -4px hsl(43 74% 55% / 0.4)",
            }}
            whileHover={{ scale: 1.05, boxShadow: "0 8px 30px -4px hsl(43 74% 55% / 0.5)" }}
            whileTap={{ scale: 0.98 }}
          >
            Get Your Free Quote
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
