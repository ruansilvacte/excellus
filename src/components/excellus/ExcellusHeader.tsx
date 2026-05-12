import { useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import logo from "@/assets/excellus-logo.png";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/sobre" },
  { label: "Services", href: "/servicos" },
  { label: "Testimonials", href: "/depoimentos" },
  { label: "Contact", href: "/contato" },
];

export default function ExcellusHeader() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="fixed top-0 inset-x-0 z-50 transition-all duration-500 bg-white border-b border-border/60">
      <div className="container mx-auto flex items-center justify-between h-16 md:h-24 px-4 md:px-6">
        <Link to="/" aria-label="Excellus Remodeling" className="flex items-center">
          <img src={logo} alt="Excellus Remodeling" className="h-10 md:h-20 w-auto object-center" />
        </Link>

        <nav aria-label="Main" className="hidden md:flex items-center gap-10">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                className={`relative text-xs tracking-[0.2em] uppercase font-medium transition-all duration-300 ${
                  isActive ? "text-primary" : "text-foreground/80 hover:text-primary"
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-primary rounded-full animate-in fade-in slide-in-from-bottom-1 duration-500" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:block">
          <Button
            asChild
            className="rounded-full px-5 h-10 text-xs tracking-[0.2em] uppercase font-light text-white shadow-[0_8px_24px_-8px_rgba(184,134,11,0.5)] border-0 hover:brightness-110 transition-all"
            style={{ background: "linear-gradient(135deg, #b8860b 0%, #8b6508 100%)", backgroundColor: "#b8860b" }}
          >
            <a href="https://wa.me/16893063140" target="_blank" rel="noreferrer" className="flex items-center gap-2">
              Request a Quote <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </Button>
        </div>

        <button
          className="md:hidden text-foreground"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-background/95 backdrop-blur-xl border-t border-border/40">
          <nav className="container mx-auto px-6 py-8 flex flex-col gap-5">
            {navItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`text-sm tracking-[0.2em] uppercase transition-all duration-300 ${
                    isActive ? "text-primary font-medium" : "text-foreground/80 hover:text-primary font-light"
                  }`}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              );
            })}
            <Button
              asChild
              className="rounded-full mt-3 h-12 text-xs tracking-[0.2em] uppercase font-light text-white border-0 shadow-[0_8px_24px_-8px_rgba(184,134,11,0.5)]"
              style={{ background: "linear-gradient(135deg, #b8860b 0%, #8b6508 100%)", backgroundColor: "#b8860b" }}
            >
              <a href="https://wa.me/16893063140" target="_blank" rel="noreferrer" onClick={() => setOpen(false)}>
                Request a Quote
              </a>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}