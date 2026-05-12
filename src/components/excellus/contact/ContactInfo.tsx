import { Phone, Mail, MapPin, Clock, Instagram } from "lucide-react";

const infoCards = [
  { icon: Phone, label: "WhatsApp", value: "(689) 306-3140", href: "https://wa.me/16893063140" },
  { icon: Mail, label: "Email", value: "remodeling@excellusgroup.com", href: "mailto:remodeling@excellusgroup.com" },
  { icon: MapPin, label: "Location", value: "Orlando & Surrounding Areas, FL", href: null },
  { icon: Clock, label: "Hours", value: "Mon–Fri: 8am–6pm · Sat: 9am–2pm", href: null },
  { icon: Instagram, label: "Instagram", value: "@excellusremodeling", href: "https://instagram.com/excellusremodeling" },
];

export default function ContactInfo() {
  return (
    <section className="py-12 md:py-16 bg-secondary/25 texture-noise">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="eyebrow">Get In Touch</span>
          <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-light text-foreground leading-tight">
            Always Within <span className="text-gold-gradient">Reach</span>
          </h2>
          <div className="mt-5 flex justify-center"><span className="gold-divider" /></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 max-w-5xl mx-auto">
          {infoCards.map(({ icon: Icon, label, value, href }) => {
            const Tag = href ? "a" : "div";
            const extra = href ? { href, target: "_blank", rel: "noreferrer" } : {};
            return (
              <Tag key={label} {...(extra as any)} className="luxe-card p-6 text-center group flex flex-col items-center">
                <div className="h-12 w-12 rounded-xl bg-primary/8 border border-primary/20 flex items-center justify-center mb-4 transition-all group-hover:bg-primary/14 group-hover:border-primary/35 group-hover:scale-105">
                  <Icon className="h-5 w-5 text-primary" strokeWidth={1.3} />
                </div>
                <div className="text-[0.62rem] tracking-[0.2em] uppercase text-muted-foreground font-medium mb-1.5">{label}</div>
                <div className="text-sm text-foreground font-light leading-snug break-all">{value}</div>
              </Tag>
            );
          })}
        </div>

      </div>
    </section>
  );
}