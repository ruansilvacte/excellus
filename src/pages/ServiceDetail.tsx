import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  XCircle,
  PlusCircle,
  Phone,
  ArrowLeft,
  Star,
  Shield,
  Clock,
  Users,
  Sparkles,
  Zap,
  ClipboardCheck,
  Loader2,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingSocial from "@/components/FloatingSocial";
import SeoHead from "@/components/SeoHead";
import { useService } from "@/hooks/useServices";

/* ── animation helpers ── */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { data: service, isLoading, isError } = useService(slug || "");

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (isError || !service) {
    navigate("/services");
    return null;
  }

  const heroImage =
    service.slug === "airbnb-short-term-rental"
      ? "/images/service-airbnb-hero.jpg"
      : service.image;

  const experienceImage =
    service.slug === "airbnb-short-term-rental"
      ? "/images/service-airbnb-experience.jpg"
      : service.image;

  return (
    <div className="min-h-screen bg-background">
      <SeoHead
        slug={`/services/${service.slug}`}
        fallbackTitle={`${service.title} — All Shine Up`}
      />
      <Header />

      {/* ═══════════════════════════════════════════
          1. CINEMATIC HERO
      ═══════════════════════════════════════════ */}
      <section className="relative w-full h-[100vh] min-h-[600px] max-h-[900px] overflow-hidden">
        <motion.img
          src={heroImage}
          alt={service.title}
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.6, ease: "easeOut" }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, hsl(30 10% 8% / 0.65) 0%, hsl(30 10% 8% / 0.45) 50%, hsl(30 10% 8% / 0.75) 100%)",
          }}
        />

        {/* Back button */}
        <motion.button
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); navigate("/services"); }}
          className="absolute top-36 left-6 md:left-12 z-30 flex items-center gap-2 text-sm font-medium tracking-wide text-white/70 hover:text-white transition-colors cursor-pointer"
          style={{ pointerEvents: "auto" }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <ArrowLeft className="w-4 h-4" />
          All Services
        </motion.button>

        {/* Hero content */}
        <div className="relative z-10 h-full flex flex-col justify-end pb-20 md:pb-28 px-6 md:px-12 lg:px-20 max-w-6xl">
          <motion.p
            className="text-xs md:text-sm font-semibold uppercase tracking-[0.3em] text-white/50 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            All Shine Up · Premium Cleaning
          </motion.p>

          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] max-w-3xl"
            style={{ fontFamily: "var(--font-heading)" }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {service.title === "Airbnb / Short-Term Rental"
              ? "Airbnb Cleaning, Done Right."
              : service.title}
          </motion.h1>

          <motion.p
            className="mt-5 text-lg md:text-xl text-white/70 max-w-xl leading-relaxed"
            style={{ fontFamily: "var(--font-body)" }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.7 }}
          >
            {service.description}
          </motion.p>

          <motion.a
            href="/quote"
            className="mt-8 inline-flex items-center gap-3 w-fit px-8 py-4 rounded-full text-sm md:text-base font-bold uppercase tracking-wider bg-white text-foreground hover:bg-white/90 transition-all"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <Phone className="w-4 h-4" />
            Get My Quote
          </motion.a>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          2. TRUST BAR
      ═══════════════════════════════════════════ */}
      <section
        className="w-full py-5 border-b border-border"
        style={{ background: "hsl(var(--card))" }}
      >
        <div className="max-w-6xl mx-auto px-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-sm">
          {[
            { icon: Star, text: "Top-Rated Service" },
            { icon: Zap, text: "400+ Cleanings / Month" },
            { icon: Shield, text: "24-Hour Guarantee" },
          ].map(({ icon: Icon, text }) => (
            <motion.div
              key={text}
              className="flex items-center gap-2 text-muted-foreground"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Icon className="w-4 h-4 text-primary" />
              <span className="font-semibold">{text}</span>
            </motion.div>
          ))}
          <motion.span
            className="text-muted-foreground/60 text-xs hidden md:block"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Trusted by hosts across Tampa, Sarasota & Bradenton
          </motion.span>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          3. INTRO
      ═══════════════════════════════════════════ */}
      {service.intro && (
        <section className="w-full py-20 md:py-28 px-6">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
          >
            <p
              className="text-xl md:text-2xl lg:text-3xl leading-relaxed font-medium"
              style={{ fontFamily: "var(--font-body)", color: "hsl(30 12% 45%)" }}
            >
              {service.intro}
            </p>
          </motion.div>
        </section>
      )}

      {/* ═══════════════════════════════════════════
          4. WHY DIFFERENT
      ═══════════════════════════════════════════ */}
      <section className="w-full py-20 md:py-28 px-6" style={{ background: "hsl(var(--card))" }}>
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4"
            style={{ fontFamily: "var(--font-heading)", color: "hsl(30 15% 30%)" }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            Why This Service Is Different
          </motion.h2>
          <motion.p
            className="text-center mb-16 max-w-xl mx-auto" style={{ color: "hsl(30 12% 50%)" }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={1}
          >
            Built for performance. Designed for trust.
          </motion.p>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            {[
              {
                icon: ClipboardCheck,
                title: "Structured Systems",
                desc: "Every clean follows a detailed checklist — nothing is missed.",
              },
              {
                icon: Users,
                title: "Trained Team",
                desc: "Reliable professionals, background-checked and fully insured.",
              },
              {
                icon: Star,
                title: "Proven Quality",
                desc: "Consistent results that earn trust and repeat bookings.",
              },
              {
                icon: Zap,
                title: "Fast Turnaround",
                desc: "Quick, efficient cleans between bookings — never miss a checkout.",
              },
            ].map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                className="text-center md:text-left"
                variants={fadeUp}
                custom={i}
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-primary/10 mb-5">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <h3
                  className="text-lg font-bold mb-2"
                  style={{ fontFamily: "var(--font-heading)", color: "hsl(30 15% 30%)" }}
                >
                  {title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "hsl(30 12% 50%)" }}>{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          5. EXPERIENCE SECTION
      ═══════════════════════════════════════════ */}
      <section className="w-full py-20 md:py-28 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <p className="text-xs font-bold uppercase tracking-[0.3em] mb-6" style={{ color: "hsl(30 70% 50%)" }}>
              The Experience
            </p>
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6"
              style={{ fontFamily: "var(--font-heading)", color: "hsl(30 15% 30%)" }}
            >
              We don't just clean — we prepare your property for a flawless guest experience.
            </h2>
            <div className="space-y-5 mt-8">
              {[
                { label: "Better Reviews", desc: "Consistent presentation that impresses every guest." },
                { label: "Faster Turnovers", desc: "Optimized process for tight checkout windows." },
                { label: "Less Stress", desc: "Focus on hosting — we handle the details." },
              ].map(({ label, desc }, i) => (
                <motion.div
                  key={label}
                  className="flex items-start gap-4"
                  variants={fadeUp}
                  custom={i + 1}
                >
                  <div className="mt-1 w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                  <div>
                    <span className="font-bold" style={{ color: "hsl(30 15% 30%)" }}>{label}</span>
                    <span className="ml-1" style={{ color: "hsl(30 12% 50%)" }}>— {desc}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="relative rounded-3xl overflow-hidden aspect-[4/5]"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <img
              src={experienceImage}
              alt="Premium cleaning experience"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          6. CONTENT SECTIONS (from DB)
      ═══════════════════════════════════════════ */}
      {service.sections?.length > 0 && (
        <section className="w-full py-20 md:py-28 px-6" style={{ background: "hsl(var(--card))" }}>
          <div className="max-w-3xl mx-auto space-y-16">
            {service.sections.map((sec: { heading: string; body: string }, i: number) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                variants={fadeUp}
                custom={i}
              >
                <h2
                  className="text-2xl md:text-3xl font-bold mb-4"
                  style={{ fontFamily: "var(--font-heading)", color: "hsl(30 15% 30%)" }}
                >
                  {sec.heading}
                </h2>
                <p className="text-lg leading-relaxed" style={{ color: "hsl(30 12% 50%)" }}>{sec.body}</p>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════
          7. WHAT'S INCLUDED / NOT INCLUDED
      ═══════════════════════════════════════════ */}
      {(service.includes?.length > 0 || service.not_included?.length > 0) && (
        <section className="w-full py-20 md:py-28 px-6">
          <div className="max-w-5xl mx-auto">
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-center mb-16"
              style={{ fontFamily: "var(--font-heading)", color: "hsl(30 15% 30%)" }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              What's Included
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              {service.includes?.length > 0 && (
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={stagger}
                >
                  <p className="text-xs font-bold uppercase tracking-[0.25em] mb-8" style={{ color: "hsl(30 70% 50%)" }}>
                    Included
                  </p>
                  <ul className="space-y-5">
                    {service.includes.map((item: string, i: number) => (
                      <motion.li
                        key={i}
                        className="flex items-start gap-4"
                        variants={fadeUp}
                        custom={i}
                      >
                        <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0 text-primary" />
                        <span className="text-base leading-relaxed" style={{ color: "hsl(30 12% 35%)" }}>{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              )}

              {service.not_included?.length > 0 && (
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={stagger}
                >
                  <p className="text-xs font-bold uppercase tracking-[0.25em] text-muted-foreground mb-8">
                    Not Included
                  </p>
                  <ul className="space-y-5">
                    {service.not_included.map((item: string, i: number) => (
                      <motion.li
                        key={i}
                        className="flex items-start gap-4"
                        variants={fadeUp}
                        custom={i}
                      >
                        <XCircle className="w-5 h-5 mt-0.5 flex-shrink-0 text-muted-foreground/50" />
                        <span className="text-muted-foreground text-base leading-relaxed">
                          {item}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════
          8. EXTRAS (UPSELL)
      ═══════════════════════════════════════════ */}
      {service.extras?.length > 0 && (
        <section className="w-full py-16 md:py-20 px-6" style={{ background: "hsl(var(--card))" }}>
          <div className="max-w-4xl mx-auto text-center">
            <motion.p
              className="text-xs font-bold uppercase tracking-[0.3em] mb-4" style={{ color: "hsl(30 70% 50%)" }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              Available Extras
            </motion.p>
            <motion.p
              className="mb-10 text-sm" style={{ color: "hsl(30 12% 50%)" }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={1}
            >
              Enhance your service with these add-ons.
            </motion.p>
            <motion.div
              className="flex flex-wrap justify-center gap-3"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
            >
              {service.extras.map((item: string, i: number) => (
                <motion.span
                  key={i}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium border border-border bg-background text-foreground hover:border-primary/40 hover:bg-primary/5 transition-all cursor-default"
                  variants={fadeUp}
                  custom={i}
                  whileHover={{ scale: 1.04 }}
                >
                  <PlusCircle className="w-3.5 h-3.5 text-primary" />
                  {item}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════
          9. HOW IT WORKS
      ═══════════════════════════════════════════ */}
      <section className="w-full py-20 md:py-28 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-center mb-16"
            style={{ fontFamily: "var(--font-heading)", color: "hsl(30 15% 30%)" }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            How It Works
          </motion.h2>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            {[
              {
                step: "01",
                title: "Request a Quote",
                desc: "Tell us about your property and schedule.",
              },
              {
                step: "02",
                title: "Schedule Your Service",
                desc: "Pick a time that works — we're flexible.",
              },
              {
                step: "03",
                title: "Guest-Ready Property",
                desc: "We deliver a spotless, guest-ready experience.",
              },
            ].map(({ step, title, desc }, i) => (
              <motion.div key={step} className="text-center" variants={fadeUp} custom={i}>
                <span className="text-5xl md:text-6xl font-bold text-primary/15">{step}</span>
                <h3
                  className="text-lg font-bold mt-3 mb-2"
                  style={{ fontFamily: "var(--font-heading)", color: "hsl(30 15% 30%)" }}
                >
                  {title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "hsl(30 12% 50%)" }}>{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          10. FINAL CTA
      ═══════════════════════════════════════════ */}
      <section className="w-full py-24 md:py-32 px-6" style={{ background: "hsl(30 10% 8%)" }}>
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-5"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Ready to elevate your Airbnb?
          </h2>
          <p className="text-white/55 mb-10 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            Get a fast quote and experience premium cleaning with a 24-hour satisfaction guarantee.
          </p>
          <motion.a
            href="/quote"
            className="inline-flex items-center gap-3 px-10 py-4 rounded-full text-sm md:text-base font-bold uppercase tracking-wider bg-white text-foreground hover:bg-white/90 transition-all"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            <Phone className="w-4 h-4" />
            Get My Quote
          </motion.a>
        </motion.div>
      </section>

      <Footer />
      <FloatingSocial />
    </div>
  );
}
