import { Instagram, MessageCircle, Mail, MapPin } from "lucide-react";

const LOGO = "https://dmrgxiwiskupraspopry.supabase.co/storage/v1/object/public/briefing-files/drafts/1778799995849_pz52wu_Untitled_design.png";

export default function HomeFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-primary text-white/80 pt-20 pb-8 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <img src={LOGO} alt="New Creation Home Solutions" className="h-14 w-auto mb-5 brightness-0 invert" />
          <p className="text-sm leading-relaxed text-white/70 max-w-xs">
            Soluções completas em instalação e acabamento de pisos com 14 anos de experiência em
            New Jersey, Nova York e Pensilvânia.
          </p>
          <div className="flex gap-3 mt-6">
            <a
              href="https://wa.me/17323206267"
              target="_blank"
              rel="noreferrer"
              className="h-10 w-10 rounded-full bg-white/10 hover:bg-accent hover:text-primary flex items-center justify-center transition-colors"
              aria-label="WhatsApp"
            >
              <MessageCircle className="h-4 w-4" />
            </a>
            <a
              href="#"
              className="h-10 w-10 rounded-full bg-white/10 hover:bg-accent hover:text-primary flex items-center justify-center transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-heading text-lg text-white mb-5">Navegação</h4>
          <ul className="space-y-3 text-sm">
            {[
              ["Início", "#inicio"],
              ["Sobre", "#sobre"],
              ["Serviços", "#servicos"],
              ["Projetos", "#projetos"],
              ["Contato", "#contato"],
              ["FAQ", "#"],
            ].map(([l, h]) => (
              <li key={l}>
                <a href={h} className="hover:text-accent transition-colors">{l}</a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-heading text-lg text-white mb-5">Contato</h4>
          <ul className="space-y-4 text-sm">
            <li className="flex items-start gap-3">
              <MessageCircle className="h-4 w-4 mt-0.5 text-accent" />
              <a href="https://wa.me/17323206267" className="hover:text-accent transition-colors">
                WhatsApp: +1 732 320 6267
              </a>
            </li>
            <li className="flex items-start gap-3">
              <Mail className="h-4 w-4 mt-0.5 text-accent" />
              <a href="mailto:bean@newcreationhomesolutions.com" className="hover:text-accent transition-colors break-all">
                bean@newcreationhomesolutions.com
              </a>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="h-4 w-4 mt-0.5 text-accent" />
              <span>Área de Atuação: NJ, NY &amp; PA</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 mt-16 pt-6 border-t border-white/10 text-xs text-white/50 text-center">
        © {year} New Creation Home Solutions. Todos os direitos reservados. | [Placeholder para Razão Social]
      </div>
    </footer>
  );
}
