import { Link } from "react-router-dom";
import logo from "@/assets/logo.jpg";

const Footer = () => {
  return (
    <footer className="bg-card/50 border-t border-border/50 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="FastOps Studio" className="h-10 w-auto rounded-full" />
            <span className="font-display font-bold text-lg text-foreground">
              FastOps <span className="text-gradient">Studio</span>
            </span>
          </Link>

          <nav className="flex flex-wrap items-center justify-center gap-6">
            <a href="#que-hacemos" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Qué hacemos
            </a>
            <a href="#servicios" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Servicios
            </a>
            <a href="#como-trabajamos" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Cómo trabajamos
            </a>
            <a href="#faq" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              FAQ
            </a>
            <a href="#contacto" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Contacto
            </a>
          </nav>

          <p className="text-sm text-muted-foreground">
            © 2024 FastOps Studio. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
