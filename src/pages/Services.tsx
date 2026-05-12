import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingSocial from "@/components/FloatingSocial";
import CtaSection from "@/components/CtaSection";
import SeoHead from "@/components/SeoHead";
import { ArrowRight, Phone, CheckCircle2 } from "lucide-react";
import { useServices } from "@/hooks/useServices";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.95, filter: "blur(6px)" },
  visible: {
    opacity: 1, y: 0, scale: 1, filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

export default function Services() {
  const navigate = useNavigate();
  const { data: services = [], isLoading } = useServices();

  return (
    <div className="min-h-screen bg-background">
      <SeoHead slug="/services" fallbackTitle="Professional Cleaning Services — All Shine Up" />
      <Header />

      {/* Style 2: Minimalist left-aligned hero */}
      <section className="w-full pt-36 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.span
            className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Services
          </motion.span>
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.05] mt-4 max-w-4xl"
            style={{ fontFamily: "var(--font-heading)", color: "hsl(var(--brand-brown))" }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          >
            Cleaning that keeps your reviews high.
          </motion.h1>
          <motion.p
            className="text-muted-foreground text-base md:text-lg mt-6 max-w-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            From Airbnb turnovers to deep cleaning — 5-star execution across Tampa, Sarasota, and Bradenton.
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

      {/* Services Grid */}
      <section className="w-full py-6 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Style 7: No intro block — content speaks */}

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {isLoading
              ? Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="rounded-2xl bg-muted animate-pulse h-[420px]" />
                ))
              : services.map((service) => (
                  <motion.div
                    key={service.id}
                    className="group cursor-pointer"
                    variants={cardVariants}
                    onClick={() => navigate(`/services/${service.slug}`)}
                  >
                    <div className="relative rounded-2xl overflow-hidden h-full bg-card border border-border transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
                      {/* Image */}
                      <div className="relative w-full h-56 overflow-hidden">
                        <img
                          src={service.image}
                          alt={service.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div
                          className="absolute inset-0"
                          style={{ background: "linear-gradient(180deg, transparent 50%, hsl(30 10% 15% / 0.6) 100%)" }}
                        />
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <h3
                          className="text-xl font-bold mb-2 text-foreground"
                          style={{ fontFamily: "var(--font-heading)" }}
                        >
                          {service.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3">
                          {service.description}
                        </p>

                        {/* Quick includes preview */}
                        {service.includes?.slice(0, 3).map((item, i) => (
                          <div key={i} className="flex items-center gap-2 mb-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-accent flex-shrink-0" />
                            <span className="text-xs text-muted-foreground">{item}</span>
                          </div>
                        ))}

                        <div className="mt-4 flex items-center gap-1 text-sm font-semibold text-accent group-hover:gap-2 transition-all">
                          Learn more <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Banner */}
      <section
        className="w-full py-20 px-6"
        style={{
          background: "hsl(43 74% 50%)",
        }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h3
              className="text-3xl md:text-4xl font-bold text-white mb-4"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Let's make your property shine.
            </h3>
             <p className="text-white/75 text-base md:text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
              Request your personalized quote in minutes. Every service is tailored to your property
              — whether it's a vacation rental turnover or a complete deep clean.
            </p>
            <motion.a
              href="/quote"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl text-base font-semibold text-primary-foreground transition-all"
              style={{ background: "white", color: "hsl(30 10% 12%)" }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              <Phone className="w-4 h-4" />
              Get a Free Quote
            </motion.a>
          </motion.div>
        </div>
      </section>

      <CtaSection />
      <Footer />
      <FloatingSocial />
    </div>
  );
}
