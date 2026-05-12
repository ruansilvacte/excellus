import { motion } from "framer-motion";
import { Shield, Sparkles, Brain } from "lucide-react";
import { useHomeContent } from "@/hooks/useHomeContent";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const icons = [Shield, Sparkles, Brain];

const defaults = [
  {
    title: "Trust & Reliability",
    description:
      "Letting someone into your property requires trust — and we take that seriously. We operate with a high-trust team, clear communication, and proven systems that guarantee accountability. Every service follows a strict process, ensuring your property is handled with professionalism and care every single time. You always know what to expect — no surprises.",
    tagline: "Your property is in safe hands",
  },
  {
    title: "Quality & Consistency",
    description:
      "One of the biggest frustrations in cleaning services is inconsistency. That's why we've built our operation around repeatable systems and detailed checklists tailored for each type of service. Whether it's a residential cleaning or an Airbnb turnover, we deliver the same high standard — every time. And if anything doesn't meet expectations? We offer a 24-hour service guarantee, so you're always covered.",
    tagline: "Consistent results, every single time",
  },
  {
    title: "Peace of Mind",
    description:
      "Our goal is simple: remove the stress from your routine. With All Shine Up, you don't need to double-check, follow up, or worry about the outcome. We handle everything with precision — so you can focus on what matters most. Fewer problems, better outcomes, and a service you can actually rely on.",
    tagline: "Focus on what matters — we handle the rest",
  },
];

export default function WhyItMattersSection() {
  const { data: content } = useHomeContent();
  const scale = parseFloat(content?.home_font_scale_why || "1") || 1;

  const cards = defaults.map((d, i) => ({
    icon: icons[i],
    title: content?.[`home_why_title_${i + 1}`] || d.title,
    description: content?.[`home_why_description_${i + 1}`] || d.description,
    tagline: content?.[`home_why_tagline_${i + 1}`] || d.tagline,
  }));

  const sectionTitle = content?.home_why_section_title || "More Than a Cleaning Service";
  const sectionSubtitle = content?.home_why_section_subtitle || "You're investing in consistency, reliability, and peace of mind — not just a cleaning.";

  return (
    <section
      className="w-full py-8 md:py-12 px-4 sm:px-6 lg:px-8"
      style={{ background: "hsl(30 20% 97%)" }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <motion.span
            className="text-xs font-bold uppercase tracking-[0.25em] block mb-4"
            style={{ color: "hsl(43 65% 50%)" }}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            Why It Matters
          </motion.span>

          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4"
            style={{
              fontFamily: "var(--font-heading)",
              color: "hsl(30 15% 30%)",
              fontSize: `clamp(${1.875 * scale}rem, ${4 * scale}vw, ${3 * scale}rem)`,
            }}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15, ease }}
          >
            {sectionTitle}
          </motion.h2>

          <motion.p
            className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto"
            style={{ fontSize: `${1.0625 * scale}rem` }}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2, ease }}
          >
            {sectionSubtitle}
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {cards.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={i}
                className="rounded-2xl border border-border/60 bg-card p-7 md:p-8 flex flex-col"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.1, ease }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                  style={{ background: "hsl(43 40% 90%)" }}
                >
                  <Icon className="w-5 h-5" style={{ color: "hsl(43 65% 45%)" }} strokeWidth={1.6} />
                </div>
                <h3
                  className="text-lg md:text-xl font-bold mb-4"
                  style={{ fontFamily: "var(--font-heading)", color: "hsl(30 15% 30%)", fontSize: `${1.25 * scale}rem` }}
                >
                  {card.title}
                </h3>
                <p className="text-sm md:text-[15px] leading-relaxed flex-1" style={{ color: "hsl(30 5% 40%)", fontSize: `${0.9375 * scale}rem` }}>
                  {card.description}
                </p>
                <div className="w-full h-px my-6" style={{ background: "hsl(30 10% 88%)" }} />
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 flex-shrink-0" style={{ color: "hsl(43 65% 50%)" }} strokeWidth={1.8} />
                  <span className="text-sm font-medium italic" style={{ color: "hsl(43 65% 45%)", fontSize: `${0.875 * scale}rem` }}>
                    {card.tagline}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
