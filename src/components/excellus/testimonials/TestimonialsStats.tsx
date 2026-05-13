import { useEffect, useRef, useState } from "react";
import { Award, Users, ThumbsUp, BadgeCheck } from "lucide-react";

const stats = [
  { icon: Award, value: 120, suffix: "+", label: "Projects Delivered" },
  { icon: ThumbsUp, value: 98, suffix: "%", label: "Client Satisfaction" },
  { icon: Users, value: 5, suffix: "", label: "Years of Experience" },
  { icon: BadgeCheck, value: 100, suffix: "%", label: "Premium Commitment" },
];

function useCountUp(target: number, active: boolean, duration = 2000) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [active, target, duration]);
  return count;
}

function StatCard({ icon: Icon, value, suffix, label }: typeof stats[0]) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const count = useCountUp(value, active);

  useEffect(() => {
    // Observer for counting animation when the component is in view
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setActive(true); }, { threshold: 0.4 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="luxe-card p-8 text-center group hover:scale-[1.03] transition-transform duration-500">
      <div className="h-14 w-14 rounded-2xl bg-primary/8 border border-primary/20 flex items-center justify-center mx-auto mb-5 transition-all group-hover:bg-primary/14 group-hover:border-primary/35">
        <Icon className="h-6 w-6 text-primary" strokeWidth={1.3} />
      </div>
      <div className="font-[var(--font-heading)] text-5xl font-light text-foreground">
        {count}{suffix}
      </div>
      <div className="mt-2 text-[0.62rem] tracking-[0.22em] uppercase text-muted-foreground font-light">{label}</div>
    </div>
  );
}

export default function TestimonialsStats() {
  return (
    <section id="stats" className="py-12 md:py-16 bg-secondary/25 texture-noise">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-xl mx-auto mb-14">
          <span className="eyebrow">Numbers That Speak</span>
          <h2 className="mt-4 text-4xl md:text-5xl font-light text-foreground leading-tight">
            Our <span className="text-gold-gradient">Journey</span> in Numbers
          </h2>
          <div className="mt-5 flex justify-center"><span className="gold-divider" /></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {stats.map((s) => <StatCard key={s.label} {...s} />)}
        </div>
      </div>
    </section>
  );
}