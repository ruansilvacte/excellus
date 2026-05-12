import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useHomeContent } from "@/hooks/useHomeContent";

import serviceAirbnb from "@/assets/service-airbnb.jpg";
import serviceResidential from "@/assets/service-residential.jpg";
import serviceCommercial from "@/assets/service-commercial.jpg";
import serviceDeepCleaning from "@/assets/service-deep-cleaning.jpg";
import servicePostConstruction from "@/assets/service-post-construction.jpg";
import servicePlatform from "@/assets/service-platform.jpg";

const services = [
  {
    title: "Airbnb / Short-Term Rental Cleaning",
    key: "airbnb",
    href: "/services/airbnb-short-term-rental",
    defaultPitch: "Guest-ready turnovers that protect your 5-star rating and Superhost status.",
    defaultCta: "Learn more",
    badge: "MOST BOOKED",
    image: serviceAirbnb,
    items: [
      "Guest-ready turnovers, every checkout",
      "Detail-obsessed staging for 5-star reviews",
      "Fresh linens, restocked essentials, perfect presentation",
      "Same crew, same checklist, same standard",
      "Built to protect your rating and Superhost status",
    ],
    note: "Trusted by hosts and property managers",
  },
  {
    title: "Residential Cleaning",
    key: "residential",
    href: "/services/residential-cleaning",
    defaultPitch: "A pristine home you'll genuinely love coming back to — every single time.",
    defaultCta: "Learn more",
    image: serviceResidential,
    items: [
      "Full-home clean across every room you actually use",
      "Weekly, bi-weekly, monthly — or one-time when you need it",
      "Surfaces sanitized, floors detailed, dust removed for real",
      "Calm, organized spaces that feel genuinely fresh",
      "Same trusted team — no rotating strangers",
    ],
    note: "Made for busy families and professionals",
  },
  {
    title: "Commercial Cleaning",
    key: "commercial",
    href: "/services/commercial-cleaning",
    defaultPitch: "Spotless offices and storefronts that quietly elevate your brand.",
    defaultCta: "Learn more",
    image: serviceCommercial,
    items: [
      "Offices, clinics and storefronts kept presentation-ready",
      "After-hours scheduling so your day never stops",
      "Sanitized high-touch points, restrooms and break areas",
      "Clean spaces that quietly reinforce your brand",
      "Reliable recurring service — no chasing, no surprises",
    ],
    note: "Built for businesses that care about first impressions",
  },
  {
    title: "Deep Cleaning",
    key: "deep",
    href: "/services/deep-cleaning",
    defaultPitch: "Top-to-bottom reset that genuinely changes how your space feels.",
    defaultCta: "Learn more",
    image: serviceDeepCleaning,
    items: [
      "Top-to-bottom reset that reaches every overlooked corner",
      "Baseboards, vents, grout, behind appliances — all in",
      "Deep sanitization that genuinely changes how your home feels",
      "The perfect first clean before going on a recurring plan",
      "Restores a true 'just moved in' standard",
    ],
    note: "When 'a quick clean' just won't cut it",
  },
  {
    title: "Post-Construction Cleaning",
    key: "post_construction",
    href: "/services/post-construction-cleaning",
    defaultPitch: "Move-in ready handover after every renovation — final-walkthrough quality.",
    defaultCta: "Learn more",
    image: servicePostConstruction,
    items: [
      "Construction dust and debris fully removed — not just wiped",
      "Detailed post-reno cleaning across every surface",
      "Polished finishes, spotless windows, ready-to-show feel",
      "Move-in ready handover for owners or buyers",
      "Final-walkthrough quality, every single time",
    ],
    note: "Loved by builders, investors and homeowners",
  },
  {
    title: "Platform Integrations",
    key: "platform",
    href: "/quote",
    defaultPitch: "One trusted partner connected across Turno, Nextdoor and your hosting tools.",
    defaultCta: "Get a quote",
    image: servicePlatform,
    items: [
      "Connected with Turno for automated turnover scheduling",
      "Verified presence on Nextdoor and local directories",
      "Smooth handoffs across hosting and management platforms",
      "Smart workflows that keep your calendar protected",
      "One trusted partner across all your tools",
    ],
    note: "Plug into the platforms you already use",
  },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const cardAnim = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

export default function ServiceChecklistCards() {
  const { data: content } = useHomeContent();
  const eyebrow = content?.home_services_eyebrow || "✦ What We Offer";
  const titleA = content?.home_services_title_part1 || "Professional services for";
  const titleB = content?.home_services_title_part2 || "every need";

  return (
    <section className="w-full pt-10 pb-10 md:pt-16 md:pb-14 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 md:mb-14">
          <motion.p
            className="text-xs md:text-sm font-bold tracking-[0.25em] uppercase mb-4"
            style={{ color: "hsl(43 74% 50%)" }}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {eyebrow}
          </motion.p>
          <motion.h2
            className="text-3xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight"
            style={{ fontFamily: "var(--font-heading)", color: "hsl(30 15% 22%)" }}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            {titleA}{" "}
            <em className="not-italic" style={{ color: "hsl(43 74% 50%)" }}>{titleB}</em>
          </motion.h2>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          {services.map((service, i) => {
            const pitch = content?.[`home_card_pitch_${service.key}`] || service.defaultPitch;
            const ctaLabel = content?.[`home_card_cta_${service.key}`] || service.defaultCta;
            return (
            <motion.div
              key={i}
              variants={cardAnim}
              className="group relative bg-card rounded-2xl border border-border shadow-sm hover:shadow-xl hover:border-accent/40 transition-all duration-500 flex flex-col overflow-hidden"
            >
              {/* Image */}
              <div className="relative w-full h-44 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  loading="lazy"
                  width={512}
                  height={512}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {service.badge && (
                  <span
                    className="absolute top-3 right-3 text-[0.6rem] font-bold tracking-widest px-2.5 py-1 rounded-full text-white"
                    style={{ background: "linear-gradient(135deg, hsl(43 74% 52%), hsl(40 60% 45%))" }}
                  >
                    {service.badge}
                  </span>
                )}

                {/* Mini-pitch hover overlay */}
                <div
                  className="absolute inset-0 flex flex-col items-center justify-center text-center p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: "linear-gradient(135deg, hsl(30 15% 18% / 0.92), hsl(30 15% 12% / 0.92))" }}
                >
                  <p className="text-white text-sm font-medium leading-snug mb-4">
                    {pitch}
                  </p>
                  <Link
                    to={service.href}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold text-foreground bg-white hover:bg-accent hover:text-white transition-colors duration-300"
                  >
                    {ctaLabel} <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              <div className="p-6 flex flex-col flex-1">
                {/* Title */}
                <h3
                  className="text-lg font-bold mb-4 text-foreground"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {service.title}
                </h3>

                {/* Checklist */}
                <div className="w-full text-left space-y-2.5 mb-5">
                  {service.items.map((item, j) => (
                    <div key={j} className="flex items-start gap-2.5">
                      <CheckCircle2
                        className="w-4 h-4 mt-0.5 flex-shrink-0"
                        style={{ color: "hsl(43 74% 50%)" }}
                      />
                      <span className="text-sm text-muted-foreground leading-snug">{item}</span>
                    </div>
                  ))}
                </div>

                {/* Note */}
                <p
                  className="text-xs font-semibold mt-auto pt-3 border-t border-border w-full"
                  style={{ color: "hsl(43 74% 45%)" }}
                >
                  💡 {service.note}
                </p>
              </div>
            </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
