import { Instagram, Mail, MapPin, Phone } from "lucide-react";
import logo from "@/assets/excellus-logo.png";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#sobre" },
  { label: "Services", href: "#servicos" },
  { label: "Projects", href: "#galeria" },
  { label: "Testimonials", href: "#depoimentos" },
  { label: "Contact", href: "#contato" },
];

const areas = [
  "Orlando", "Winter Garden", "Winter Park", "Horizon West",
  "Lake Nona", "Lake Mary", "Z World", "Apopka",
  "Windermere", "Gotha", "Ocala", "Deltona", "Daytona"
];

export default function ExcellusFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#fff5e6] border-t border-border/60">
      <div className="container mx-auto px-4 md:px-6 py-8 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-12">
          <div>
            <div className="flex items-center mb-4 md:mb-5">
              <img src={logo} alt="Excellus" className="h-12 md:h-20 w-auto object-contain" />
            </div>
            <p className="text-xs md:text-sm text-muted-foreground leading-relaxed font-light max-w-xs">
              Luxury home remodeling in Orlando and surrounding areas, delivering excellence, sophistication, and a commitment to every detail.
            </p>
          </div>

          <div>
            <h3 className="text-[0.65rem] md:text-[0.7rem] tracking-[0.3em] uppercase text-muted-foreground font-light mb-4 md:mb-5">Navigation</h3>
            <ul className="space-y-2 md:space-y-3">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-sm text-foreground/80 hover:text-primary transition-colors font-light">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[0.65rem] md:text-[0.7rem] tracking-[0.3em] uppercase text-muted-foreground font-light mb-4 md:mb-5">Contact</h3>
            <ul className="space-y-2 md:space-y-3 text-sm font-light">
              <li>
                <a href="https://wa.me/16893063140" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-foreground/80 hover:text-primary transition-colors">
                  <Phone className="h-4 w-4 text-primary" strokeWidth={1.4} /> (689) 306-3140
                </a>
              </li>
              <li>
                <a href="mailto:remodeling@excellusgroup.com" className="flex items-center gap-3 text-foreground/80 hover:text-primary transition-colors break-all">
                  <Mail className="h-4 w-4 text-primary" strokeWidth={1.4} /> remodeling@excellusgroup.com
                </a>
              </li>
              <li className="flex items-center gap-3 text-foreground/80">
                <MapPin className="h-4 w-4 text-primary" strokeWidth={1.4} /> Orlando & Surrounding Areas, FL
              </li>
              <li>
                <a href="https://instagram.com/excellusremodeling" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-foreground/80 hover:text-primary transition-colors">
                  <Instagram className="h-4 w-4 text-primary" strokeWidth={1.4} /> @excellusremodeling
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-[0.65rem] md:text-[0.7rem] tracking-[0.3em] uppercase text-muted-foreground font-light mb-4 md:mb-5">Service Areas</h3>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-1.5 md:gap-y-2">
              {areas.map((a) => (
                <li key={a} className="text-xs text-foreground/80 font-light">{a}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 md:mt-16 pt-6 md:pt-8 border-t border-border/60 flex flex-col md:flex-row items-center justify-between gap-3 text-[0.65rem] md:text-xs text-muted-foreground font-light text-center md:text-left">
          <p>© {year} Excellus Remodeling. All rights reserved.</p>
          <div className="flex items-center gap-4 md:gap-6">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Use</a>
          </div>
        </div>
        <p className="mt-3 text-center md:text-left text-[0.65rem] md:text-[0.7rem] text-muted-foreground/70 font-light">
          Legal Name: [To be defined]
        </p>
      </div>
    </footer>
  );
}