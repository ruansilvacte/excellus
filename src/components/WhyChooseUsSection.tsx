import { motion } from "framer-motion";
import { MapPin, ClipboardCheck, Sparkles, HeartHandshake } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const highlights = [
  {
    icon: MapPin,
    text: "100+ ZIP codes covered — from Tampa to Venice",
  },
  {
    icon: ClipboardCheck,
    text: "Standardized checklists ensuring consistent quality on every service",
  },
  {
    icon: Sparkles,
    text: "Premium guest-ready staging for Airbnb & short-term rentals",
  },
  {
    icon: HeartHandshake,
    text: "Founded by Kassandra — built on trust, efficiency & heart",
  },
];

export default function WhyChooseUsSection() {
  return (
    <section className="w-full py-16 md:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — Image */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease }}
          >
            <div className="relative rounded-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80"
                alt="Premium living space cleaned by All Shine Up"
                className="w-full h-[360px] md:h-[440px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <h3
                  className="text-xl md:text-2xl font-bold text-white leading-tight"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  Beyond Clean: We Stage for 5-Stars
                </h3>
                <p className="text-white/70 text-sm mt-1">
                  Hospitality-trained turnover specialists
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right — Text + Checklist */}
          <div className="flex flex-col">
            <motion.span
              className="text-xs font-bold uppercase tracking-[0.2em] mb-3"
              style={{ color: "hsl(15 70% 60%)" }}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              About Us
            </motion.span>

            <motion.h2
              className="text-3xl md:text-4xl lg:text-[2.8rem] font-bold leading-tight mb-5"
              style={{ fontFamily: "var(--font-heading)", color: "hsl(30 12% 35%)" }}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15, ease }}
            >
              Who We Are
            </motion.h2>

            <motion.p
              className="text-muted-foreground text-[15px] md:text-base leading-relaxed mb-10"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2, ease }}
            >
              All Shine Up is a professional cleaning company based in Parrish, Florida, recognized for operational excellence and commitment to elevated quality standards. Founded and led by Kassandra, our model is driven by efficiency, consistency, and rigorous attention to detail — delivering superior results every time.
            </motion.p>

            {/* Checklist items */}
            <div className="space-y-6">
              {highlights.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={i}
                    className="flex items-center gap-5"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.25 + i * 0.08, ease }}
                  >
                    <div
                      className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: "hsl(15 60% 95%)" }}
                    >
                      <Icon
                        className="w-5 h-5"
                        style={{ color: "hsl(15 70% 60%)" }}
                        strokeWidth={1.6}
                      />
                    </div>
                    <span
                      className="text-[15px] md:text-base font-medium"
                      style={{ color: "hsl(30 12% 35%)" }}
                    >
                      {item.text}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
