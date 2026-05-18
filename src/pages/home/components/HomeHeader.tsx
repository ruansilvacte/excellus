import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const LOGO = "https://dmrgxiwiskupraspopry.supabase.co/storage/v1/object/public/briefing-files/drafts/1778799995849_pz52wu_Untitled_design.png";

const NAV = [
  { label: "Início", href: "#inicio" },
  { label: "Sobre", href: "#sobre" },
  { label: "Serviços", href: "#servicos" },
  { label: "Projetos", href: "#projetos" },
  { label: "Contato", href: "#contato" },
];

export default function HomeHeader({ onQuote }: { onQuote: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-background/85 backdrop-blur-md border-b border-border shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
        <a href="#inicio" className="flex items-center gap-3">
          <img src={LOGO} alt="New Creation Home Solutions" className="h-12 w-auto" />
        </a>

        <nav className="hidden lg:flex items-center gap-9">
          {NAV.map((i) => (
            <a
              key={i.href}
              href={i.href}
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
            >
              {i.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button onClick={onQuote} className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-6">
            Solicite um Orçamento
          </Button>
        </div>

        <button
          onClick={() => setOpen((o) => !o)}
          className="lg:hidden p-2 text-foreground"
          aria-label="Menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-background border-t border-border">
          <nav className="flex flex-col px-6 py-4 gap-3">
            {NAV.map((i) => (
              <a
                key={i.href}
                href={i.href}
                onClick={() => setOpen(false)}
                className="py-2 text-foreground/90 font-medium"
              >
                {i.label}
              </a>
            ))}
            <Button onClick={() => { setOpen(false); onQuote(); }} className="bg-primary text-primary-foreground rounded-full">
              Solicite um Orçamento
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
