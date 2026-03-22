import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BOOKING_EVENT } from "@/components/BookingModal";
import logo from "@/assets/logo.jpg";

const navItems = [
  { label: "Servicios",        href: "servicios" },
  { label: "Cómo trabajamos",  href: "como-trabajamos" },
  { label: "FAQ",              href: "faq" },
  { label: "Contacto",         href: "contacto" },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      const offset = 80;
      const y = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    setIsOpen(false);

    if (location.pathname === "/") {
      scrollToSection(sectionId);
    } else {
      navigate("/");
      setTimeout(() => scrollToSection(sectionId), 200);
    }
  };

  const openBooking = () => {
    setIsOpen(false);
    window.dispatchEvent(new Event(BOOKING_EVENT));
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/80">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <img
                src={logo}
                alt="FastOps Studio"
                className="h-9 md:h-10 w-auto rounded-full ring-1 ring-border group-hover:ring-primary/50 transition-all"
              />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-display font-black text-lg md:text-xl uppercase tracking-wide text-foreground">
                Fast<span className="text-gradient">Ops</span>
              </span>
              <span className="font-code text-[9px] text-muted-foreground tracking-[0.2em] uppercase">
                Studio
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={`#${item.href}`}
                onClick={(e) => handleNavClick(e, item.href)}
                className="text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm font-medium tracking-wide"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <Button
              variant="heroOutline"
              size="sm"
              className="rounded-none font-display uppercase tracking-widest text-xs"
              asChild
            >
              <a href="#servicios" onClick={(e) => handleNavClick(e, "servicios")}>
                Ver planes
              </a>
            </Button>
            <Button
              variant="hero"
              size="sm"
              onClick={openBooking}
              className="rounded-none font-display uppercase tracking-widest text-xs"
            >
              Agendar llamada
            </Button>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-foreground p-2 hover:text-primary transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden py-5 border-t border-border animate-fade-in">
            <nav className="flex flex-col gap-1">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={`#${item.href}`}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors px-3 py-3 text-sm font-medium"
                >
                  {item.label}
                </a>
              ))}
              <div className="flex flex-col gap-3 pt-5 mt-2 border-t border-border">
                <Button
                  variant="heroOutline"
                  className="rounded-none font-display uppercase tracking-widest text-xs"
                  asChild
                >
                  <a href="#servicios" onClick={(e) => handleNavClick(e, "servicios")}>
                    Ver planes
                  </a>
                </Button>
                <Button
                  variant="hero"
                  onClick={openBooking}
                  className="rounded-none font-display uppercase tracking-widest text-xs"
                >
                  Agendar llamada
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
