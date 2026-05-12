import { useState, useRef, useEffect } from "react";
import { Menu, X, ChevronDown, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useServices } from "@/hooks/useServices";
import logo from "@/assets/logo.png";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services", hasDropdown: true },
  { label: "Service Areas", href: "/service-areas" },
  { label: "FAQ", href: "/faq" },
  { label: "Blog", href: "/blog" },
];

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const { data: services = [] } = useServices();

  const isActive = (href: string) =>
    href === "/" ? location.pathname === "/" : location.pathname.startsWith(href);

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    setServicesOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setServicesOpen(false), 200);
  };

  useEffect(() => {
    setServicesOpen(false);
    setMobileOpen(false);
  }, [location.pathname]);

  // Split services into two columns (left 3, right 3, etc.)
  const half = Math.ceil(services.length / 2);
  const leftCol = services.slice(0, half);
  const rightCol = services.slice(half);

  return (
    <motion.header
      className="w-full fixed top-0 left-0 z-50"
      initial={{ y: -120 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <nav className="w-full bg-white shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-8 py-2 md:py-3">
          {/* Logo */}
          <Link to="/" className="flex items-center flex-shrink-0">
            <img src={logo} alt="All Shine Up" className="h-16 md:h-[5.5rem] w-auto" />
          </Link>

          {/* Desktop Nav Links - Centered */}
          <div className="hidden lg:flex items-center justify-center flex-1 gap-8 mx-auto">
            {navLinks.map((link) => (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={link.hasDropdown ? handleMouseEnter : undefined}
                onMouseLeave={link.hasDropdown ? handleMouseLeave : undefined}
                ref={link.hasDropdown ? dropdownRef : undefined}
              >
                <Link
                  to={link.href}
                  className={`text-[0.8rem] font-bold uppercase tracking-[0.18em] transition-colors duration-200 relative py-1 flex items-center gap-1 ${
                    isActive(link.href)
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {link.label}
                  {link.hasDropdown && (
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`} />
                  )}
                  {isActive(link.href) && (
                    <motion.span
                      className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full"
                      style={{ background: "hsl(43 58% 61%)" }}
                      layoutId="nav-underline"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>

                {/* Services Dropdown */}
                {link.hasDropdown && (
                  <AnimatePresence>
                    {servicesOpen && (
                       <motion.div
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-3 bg-white rounded-2xl shadow-2xl border border-border/50 p-7 min-w-[640px]"
                        initial={{ opacity: 0, y: 8, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.97 }}
                        transition={{ duration: 0.2 }}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                      >
                        <p
                          className="text-[0.65rem] font-bold uppercase tracking-[0.25em] text-muted-foreground mb-4"
                          style={{ fontFamily: "var(--font-heading)" }}
                        >
                          Our Services
                        </p>
                        <div className="grid grid-cols-2 gap-x-7 gap-y-2">
                          {/* Left column */}
                          <div className="space-y-2">
                            {leftCol.map((s) => (
                              <button
                                key={s.id}
                                onClick={() => navigate(`/services/${s.slug}`)}
                                className="w-full text-left px-3 py-3 rounded-xl hover:bg-muted/60 transition-colors group flex items-center gap-3.5"
                              >
                                <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 ring-1 ring-border/50">
                                  <img src={s.image} alt={s.title} className="w-full h-full object-cover" />
                                </div>
                                <div className="min-w-0">
                                  <span
                                    className="text-base font-semibold text-foreground group-hover:text-accent transition-colors block leading-tight"
                                    style={{ fontFamily: "var(--font-heading)" }}
                                  >
                                    {s.title}
                                  </span>
                                </div>
                              </button>
                            ))}
                          </div>
                          {/* Right column */}
                          <div className="space-y-2">
                            {rightCol.map((s) => (
                              <button
                                key={s.id}
                                onClick={() => navigate(`/services/${s.slug}`)}
                                className="w-full text-left px-3 py-3 rounded-xl hover:bg-muted/60 transition-colors group flex items-center gap-3.5"
                              >
                                <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 ring-1 ring-border/50">
                                  <img src={s.image} alt={s.title} className="w-full h-full object-cover" />
                                </div>
                                <div className="min-w-0">
                                  <span
                                    className="text-base font-semibold text-foreground group-hover:text-accent transition-colors block leading-tight"
                                    style={{ fontFamily: "var(--font-heading)" }}
                                  >
                                    {s.title}
                                  </span>
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                        <div className="mt-4 pt-4 border-t border-border/50">
                          <Link
                            to="/services"
                            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-bold uppercase tracking-wider transition-all hover:bg-muted/60"
                            style={{ fontFamily: "var(--font-heading)", color: "hsl(var(--brand-brown))" }}
                          >
                            All Services <ArrowRight className="w-4 h-4" />
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </div>

          {/* Right Side: Phone + CTA */}
          <div className="hidden md:flex items-center gap-4 flex-shrink-0">
            <Link
              to="/quote"
              className="px-7 py-2.5 rounded-lg text-[0.8rem] font-bold uppercase tracking-[0.15em] transition-all duration-300 hover:scale-105 hover:shadow-lg"
              style={{
                fontFamily: "var(--font-heading)",
                background: "linear-gradient(135deg, hsl(43 58% 61%), hsl(40 50% 50%))",
                color: "white",
              }}
            >
              Get Free Quote
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              className="lg:hidden border-t px-5 pb-5 bg-white"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              {navLinks.map((link) => (
                <div key={link.label}>
                  <Link
                    to={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`block w-full text-left py-3 text-lg font-bold uppercase tracking-wider ${
                      isActive(link.href) ? "text-foreground" : "text-muted-foreground"
                    }`}
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {link.label}
                  </Link>
                  {/* Mobile services sub-list */}
                  {link.hasDropdown && services.length > 0 && (
                    <div className="pl-4 pb-2 space-y-1">
                      {services.map((s) => (
                        <Link
                          key={s.id}
                          to={`/services/${s.slug}`}
                          onClick={() => setMobileOpen(false)}
                          className="block py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {s.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="flex flex-col gap-3 mt-3">
                <Link
                  to="/quote"
                  onClick={() => setMobileOpen(false)}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-base font-bold"
                  style={{
                    background: "hsl(43 58% 61%)",
                    color: "white",
                    fontFamily: "var(--font-heading)",
                  }}
                >
                  Get Free Quote
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}
