"use client"

import React from "react"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

import cardCommunication from "@/assets/card-communication.jpg"
import cardProcesses from "@/assets/card-processes.jpg"
import cardQuality from "@/assets/card-quality.jpg"
import cardGuarantee from "@/assets/card-guarantee.jpg"

interface FeatureCard {
  badgeText: string
  badgeColor: string
  title: string
  description: string
  ctaText: string
  ctaHref: string
  imageUrl: string
}

const defaultCards: FeatureCard[] = [
  {
    badgeText: "Efficient Communication",
    badgeColor: "hsl(43 74% 50%)",
    title: "Efficient Communication",
    description: "Clear and responsive communication at every stage. You're informed about schedules, team details, and progress before, during, and after each cleaning.",
    ctaText: "Book a service",
    ctaHref: "/quote",
    imageUrl: cardCommunication,
  },
  {
    badgeText: "Structured Processes",
    badgeColor: "hsl(43 65% 48%)",
    title: "Structured Processes",
    description: "Every service type follows a detailed, standardized checklist — ensuring consistent execution and reliable quality on every visit.",
    ctaText: "Learn more",
    ctaHref: "/about",
    imageUrl: cardProcesses,
  },
  {
    badgeText: "Consistent Quality",
    badgeColor: "hsl(38 55% 45%)",
    title: "Consistent Quality",
    description: "A team of 10–15 trained professionals focused on operational reliability and delivering an elevated standard every time.",
    ctaText: "View services",
    ctaHref: "/services",
    imageUrl: cardQuality,
  },
  {
    badgeText: "24h Guarantee",
    badgeColor: "hsl(38 55% 45%)",
    title: "24-Hour Guarantee",
    description: "Premium service with meticulous attention to detail. Our 24-hour guarantee reflects our commitment to your complete satisfaction.",
    ctaText: "Talk to a specialist",
    ctaHref: "/quote",
    imageUrl: cardGuarantee,
  },
]

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
}

const cardItem = {
  hidden: { opacity: 0, y: 60, scale: 0.9, filter: "blur(6px)" },
  visible: {
    opacity: 1, y: 0, scale: 1, filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
}

export default function FeaturesCards() {
  return (
    <section
      className="relative w-full pt-8 pb-24 overflow-hidden"
      style={{
        background: "linear-gradient(180deg, hsl(40 20% 96%) 0%, hsl(38 25% 91%) 50%, hsl(40 18% 94%) 100%)",
      }}
    >
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: "radial-gradient(circle at 20% 50%, hsl(43 74% 55% / 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, hsl(43 60% 50% / 0.08) 0%, transparent 40%)",
        }}
      />

      <div className="relative z-10 max-w-[95%] xl:max-w-[90%] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <motion.span
            className="text-xs font-bold uppercase tracking-[0.25em] text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Why We Stand Out
          </motion.span>
          <motion.h2
            className="text-3xl md:text-5xl font-bold mt-3 leading-tight"
            style={{ fontFamily: "var(--font-heading)", color: "hsl(30 15% 30%)" }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          >
            The standard others try to follow.
          </motion.h2>
          <motion.p
            className="mt-4 text-muted-foreground text-sm md:text-base max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Proven systems, dedicated professionals, and a 24-hour satisfaction promise — because your property deserves nothing less.
          </motion.p>
        </div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {defaultCards.map((card, index) => (
            <motion.div key={index} variants={cardItem}>
              <a
                href={card.ctaHref}
                className="group relative flex flex-col overflow-hidden rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300"
              >
                {/* Image */}
                <div className="relative w-full aspect-[3/4] overflow-hidden">
                  <img
                    src={card.imageUrl}
                    alt={card.title}
                    loading="lazy"
                    width={600}
                    height={800}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Text content below image */}
                <div
                  className="p-5 flex flex-col flex-1"
                  style={{ background: "linear-gradient(180deg, hsl(40 12% 97%) 0%, hsl(38 15% 94%) 100%)" }}
                >
                  <h3
                    className="text-lg font-bold mb-2 leading-snug"
                    style={{ color: "hsl(30 15% 30%)", fontFamily: "var(--font-heading)" }}
                  >
                    {card.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed mb-4 line-clamp-3"
                    style={{ color: "hsl(30 8% 40%)" }}
                  >
                    {card.description}
                  </p>
                  <div className="mt-auto flex items-center gap-1 text-sm font-medium" style={{ color: "hsl(30 15% 30%)" }}>
                    {card.ctaText}
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
