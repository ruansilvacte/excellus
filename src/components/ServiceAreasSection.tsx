import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { useServiceAreas } from "@/hooks/useServiceAreas";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.2 } },
};

const item = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

export default function ServiceAreasSection() {
  const { data: areas, isLoading } = useServiceAreas(true);

  if (isLoading || !areas?.length) return null;

  const regions = areas.reduce<Record<string, typeof areas>>((acc, a) => {
    const r = a.region || "Other";
    if (!acc[r]) acc[r] = [];
    acc[r].push(a);
    return acc;
  }, {});

  return (
    <section className="w-full py-16 md:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <motion.span
            className="text-xs font-bold uppercase tracking-[0.25em] text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Coverage
          </motion.span>
          <motion.h2
            className="text-3xl md:text-5xl font-bold mt-3 leading-tight"
            style={{ fontFamily: "var(--font-heading)", color: "hsl(30 15% 30%)" }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          >
            Tampa to Venice — we're there.
          </motion.h2>
          <motion.p
            className="mt-4 text-muted-foreground text-sm md:text-base max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            100+ ZIP codes across Florida's Gulf Coast, from Hillsborough to Sarasota County.
          </motion.p>
        </div>

        <div className="space-y-8">
          {Object.entries(regions).map(([regionName, regionAreas]) => (
            <motion.div
              key={regionName}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-4 h-4 text-accent" />
                <h3
                  className="text-lg font-bold text-foreground"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {regionName}
                </h3>
              </div>
              <motion.div
                className="flex flex-wrap gap-2"
                variants={container}
                initial="hidden"
                animate="visible"
              >
                {regionAreas.map((area) => (
                  <motion.span
                    key={area.id}
                    variants={item}
                    className="px-4 py-2 rounded-full text-sm font-medium bg-card border border-border text-foreground shadow-sm"
                  >
                    {area.name}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
