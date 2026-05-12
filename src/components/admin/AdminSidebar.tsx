import { NavLink } from "react-router-dom";
import { LayoutDashboard, FileText, FolderOpen, Image, Settings, ChevronLeft, ChevronRight, BarChart3, Home, MapPin, Search, Sparkles, Mail, Users, Kanban } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { to: "/admin", icon: LayoutDashboard, label: "Dashboard", end: true },
  { to: "/admin/home-editor", icon: Home, label: "Editor da Home" },
  { to: "/admin/services", icon: Sparkles, label: "Serviços" },
  { to: "/admin/service-areas", icon: MapPin, label: "Áreas Atendidas" },
  { to: "/admin/crm", icon: Kanban, label: "CRM / Leads" },
  { to: "/admin/seo", icon: Search, label: "SEO" },
  { to: "/admin/posts", icon: FileText, label: "Posts" },
  { to: "/admin/categories", icon: FolderOpen, label: "Categorias" },
  { to: "/admin/media", icon: Image, label: "Mídia" },
  { to: "/admin/marketing", icon: BarChart3, label: "Marketing" },
  { to: "/admin/email", icon: Mail, label: "Email (SMTP)" },
  { to: "/admin/settings", icon: Settings, label: "Configurações" },
];


interface Props {
  open: boolean;
  onToggle: () => void;
}

export default function AdminSidebar({ open, onToggle }: Props) {
  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div className="fixed inset-0 bg-black/40 z-40 md:hidden" onClick={onToggle} />
      )}

      <aside
        className={cn(
          "fixed top-0 left-0 h-full z-50 bg-card border-r border-border flex flex-col transition-all duration-300",
          open ? "w-64" : "w-0 md:w-16",
          !open && "overflow-hidden md:overflow-visible"
        )}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-border shrink-0">
        {open ? (
            <img src="/logo.png" alt="All Shine Up" className="h-9" />
          ) : (
            <img src="/logo.png" alt="All Shine Up" className="h-7 mx-auto" />
          )}
          <button onClick={onToggle} className="p-1.5 rounded-lg hover:bg-muted transition-colors hidden md:flex">
            {open ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 space-y-1 px-2">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )
              }
              onClick={() => {
                if (window.innerWidth < 768) onToggle();
              }}
            >
              <link.icon className="w-5 h-5 shrink-0" />
              {open && <span>{link.label}</span>}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}
