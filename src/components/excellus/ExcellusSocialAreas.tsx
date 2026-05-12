import React from "react";
import { Mail } from "lucide-react";

const areas = [
  "Orlando", "Winter Garden", "Winter Park", "Horizon West",
  "Lake Nona", "Lake Mary", "Z World", "A Popca",
  "Winter Winter Mirror", "Gotha", "Ocala", "Deltona", "Daytona"
];

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="url(#ig-gradient)">
      <defs>
        <radialGradient id="ig-gradient" cx="30%" cy="107%" r="150%">
          <stop offset="0%" stopColor="#fdf497" />
          <stop offset="5%" stopColor="#fdf497" />
          <stop offset="45%" stopColor="#fd5949" />
          <stop offset="60%" stopColor="#d6249f" />
          <stop offset="90%" stopColor="#285AEB" />
        </radialGradient>
      </defs>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="#25D366">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function ExcellusSocialAreas() {
  return (
    <section className="bg-white border-y border-border/50 py-6 md:py-10">
      <div className="container mx-auto px-4 md:px-6 max-w-5xl space-y-8">
 
        {/* Areas */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <span className="text-[0.65rem] tracking-[0.3em] uppercase font-medium text-foreground shrink-0">Service Areas</span>
          <div className="hidden sm:block h-px w-6 bg-border" />
          <p className="text-xs md:text-sm text-muted-foreground font-light leading-relaxed">
            {areas.join(" · ")}
          </p>
        </div>
 
        <div className="h-px bg-border/50" />
 
        {/* Social links */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <span className="text-[0.65rem] tracking-[0.3em] uppercase font-medium text-foreground shrink-0">Connect With Us</span>
          <div className="hidden sm:block h-px w-6 bg-border" />
          <div className="flex flex-wrap gap-3">
 
            {/* Instagram */}
            <a
              href="https://instagram.com/excellusremodeling"
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-2 md:gap-3 px-4 md:px-5 py-2.5 md:py-3 rounded-full border border-border bg-white shadow-sm hover:shadow-lg hover:border-primary/30 transition-all duration-300"
              style={{ "--hover-bg": "rgba(225,48,108,0.06)" } as React.CSSProperties}
            >
              <InstagramIcon className="h-5 w-5 md:h-6 md:w-6 flex-shrink-0" />
              <span className="text-sm md:text-base font-light text-foreground/90 group-hover:text-[#d6249f] transition-colors">@excellusremodeling</span>
            </a>
 
            {/* WhatsApp */}
            <a
              href="https://wa.me/16893063140"
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-2 md:gap-3 px-4 md:px-5 py-2.5 md:py-3 rounded-full border border-border bg-white shadow-sm hover:shadow-lg hover:border-[#25D366]/30 transition-all duration-300"
            >
              <WhatsAppIcon className="h-5 w-5 md:h-6 md:w-6 flex-shrink-0" />
              <span className="text-sm md:text-base font-light text-foreground/90 group-hover:text-[#25D366] transition-colors">(689) 306-3140</span>
            </a>
 
            {/* Email */}
            <a
              href="mailto:remodeling@excellusgroup.com"
              className="group flex items-center gap-2 md:gap-3 px-4 md:px-5 py-2.5 md:py-3 rounded-full border border-border bg-white shadow-sm hover:shadow-lg hover:border-primary/30 transition-all duration-300"
            >
              <span className="h-5 w-5 md:h-6 md:w-6 rounded-md bg-primary flex items-center justify-center flex-shrink-0 shadow-sm group-hover:scale-110 transition-transform">
                <Mail className="h-3 w-3 md:h-3.5 md:w-3.5 text-white" strokeWidth={2.5} />
              </span>
              <span className="text-sm md:text-base font-light text-foreground/90 group-hover:text-primary transition-colors break-all">remodeling@excellusgroup.com</span>
            </a>

          </div>
        </div>

      </div>
    </section>
  );
}