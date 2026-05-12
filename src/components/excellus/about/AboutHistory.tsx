import { Award, Users, ThumbsUp, BadgeCheck } from "lucide-react";
import aboutImg from "@/assets/excellus-about.jpg";
import galleryImg from "@/assets/excellus-gallery-1.jpg";

const stats = [
  { icon: Award, value: "+120", label: "Projects Completed" },
  { icon: Users, value: "5", label: "Years of Experience" },
  { icon: ThumbsUp, value: "98%", label: "Client Satisfaction" },
  { icon: BadgeCheck, value: "100%", label: "Commitment" },
];

const timeline = [
  { year: "2019", title: "The Beginning", desc: "We founded Excellus with a dream: to elevate the standard of remodeling in Orlando. We began with a small team but held grand ambitions." },
  { year: "2021", title: "Expansion", desc: "We expanded our services across the Orlando area, earning the trust of discerning clients and building our reputation." },
  { year: "2023", title: "Recognition", desc: "We reached the milestone of 100 completed projects with 98% satisfaction, solidifying our position as a leader in high-end remodeling in Florida." },
  { year: "2025", title: "Achieving Excellence", desc: "Today, Excellus is synonymous with sophistication, quality, and premium service. Our story continues to be written, one project at a time." },
];

export default function AboutHistory() {
  return (
    <section id="historia" className="py-10 md:py-16 bg-background">
      <div className="container mx-auto px-4 md:px-6">
 
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-20">
          <span className="eyebrow">Our Story</span>
          <h2 className="mt-5 text-2xl md:text-5xl lg:text-6xl font-light text-foreground leading-[1.1]">
            Over 5 Years of{" "}
            <span className="text-gold-gradient">Excellence</span>{" "}
            in Luxury Remodeling
          </h2>
          <div className="mt-6 flex justify-center">
            <span className="gold-divider w-12 md:w-14" />
          </div>
        </div>
 
        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center mb-16 md:mb-24">
          {/* Image column */}
          <div className="relative group">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-[var(--shadow-luxe)]">
              <img
                src={aboutImg}
                alt="Excellus Remodeling team on a luxury project"
                className="w-full h-full object-cover transition-transform duration-[1.4s] group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent" />
            </div>
            {/* Decorative floating image */}
            <div className="absolute -bottom-8 -right-8 hidden md:block w-48 h-48 rounded-2xl overflow-hidden border-4 border-white shadow-[var(--shadow-luxe)]">
              <img src={galleryImg} alt="Detail of a premium project" className="w-full h-full object-cover" loading="lazy" />
            </div>
            <div className="absolute -top-4 -left-4 h-20 w-20 rounded-2xl bg-primary/10 border border-primary/20 hidden md:block" aria-hidden="true" />
          </div>
 
          {/* Storytelling + stats */}
          <div className="lg:pl-6">
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed font-light mb-4">
              Excellus Remodeling was born from a passion for transforming ordinary environments into extraordinary spaces.
              Founded in Orlando, Florida, we specialize in high-end remodels that unite contemporary design,
              premium materials, and flawless execution.
            </p>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed font-light">
              Each project is approached with the same rigor as a world-class architectural studio.
              Our team of specialists manages every detail, from planning to final delivery,
              ensuring results that exceed expectations.
            </p>
 
            {/* Stats */}
            <div className="mt-8 md:mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map(({ icon: Icon, value, label }) => (
                <div key={label} className="text-center group">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-3 transition-all group-hover:bg-primary/15 group-hover:border-primary/35">
                    <Icon className="h-5 w-5 text-primary" strokeWidth={1.3} />
                  </div>
                  <div className="font-[var(--font-heading)] text-xl md:text-3xl font-medium text-foreground">{value}</div>
                  <div className="mt-1 text-[0.6rem] tracking-[0.18em] uppercase text-muted-foreground font-light leading-relaxed">
                    {label}
                  </div>
                </div>
              ))}
            </div>
 
            {/* Áreas */}
            <div className="mt-8 md:mt-10 bg-white/60 backdrop-blur p-5 md:p-6 rounded-2xl border border-primary/20 shadow-sm">
              <h4 className="text-[0.6rem] tracking-[0.3em] uppercase text-primary font-medium mb-3">Service Areas</h4>
              <p className="text-xs md:text-sm text-foreground/75 leading-relaxed font-light">
                We serve <strong>Orlando and surrounding areas:</strong> Winter Garden, Winter Park, Horizon West, Lake Nona,
                Lake Mary, Z World, Gotha, Ocala, Deltona, and Daytona.
              </p>
            </div>
          </div>
        </div>
 
        {/* Timeline */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <span className="eyebrow">Our Journey</span>
          </div>
          <div className="relative">
            {/* Vertical gold line */}
            <div className="absolute left-[28px] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/40 to-transparent hidden md:block" aria-hidden="true" />
 
            <div className="space-y-8 md:space-y-10">
              {timeline.map((item, i) => (
                <div key={item.year} className="flex gap-8 group">
                  {/* Year bubble */}
                  <div className="shrink-0 hidden md:flex flex-col items-center">
                    <div className="h-14 w-14 rounded-full border-2 border-primary/40 bg-background flex items-center justify-center text-xs font-medium text-primary tracking-wider group-hover:border-primary group-hover:bg-primary/5 transition-all">
                      {item.year}
                    </div>
                  </div>
                  {/* Content */}
                  <div className="luxe-card flex-1 p-5 md:p-7">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="md:hidden text-[0.6rem] tracking-[0.3em] uppercase text-primary font-medium">{item.year}</span>
                      <h3 className="font-[var(--font-heading)] text-lg md:text-xl font-medium text-foreground">{item.title}</h3>
                    </div>
                    <p className="text-xs md:text-sm text-muted-foreground leading-relaxed font-light">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}