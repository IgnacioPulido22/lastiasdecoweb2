import { ArrowRight, Zap, Clock, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BOOKING_EVENT } from "@/components/BookingModal";
import HeroScene from "@/components/three/HeroScene";

const Hero = () => {
  const openBooking = () => window.dispatchEvent(new Event(BOOKING_EVENT));

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-gradient-hero">
      {/* Network particle scene */}
      <HeroScene />

      {/* Background glow orbs (kept for depth) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/6 w-[600px] h-[600px] bg-primary/6 rounded-full blur-[140px] animate-float" />
        <div
          className="absolute bottom-1/4 right-1/5 w-[400px] h-[400px] bg-primary/4 rounded-full blur-[120px] animate-float"
          style={{ animationDelay: "4s" }}
        />
        {/* Vertical accent lines */}
        <div
          className="absolute top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/20 to-transparent"
          style={{ left: "18%" }}
        />
        <div
          className="absolute top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-border/60 to-transparent"
          style={{ right: "22%" }}
        />
        {/* Horizontal line below nav */}
        <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/25 to-transparent top-20" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Status badge */}
          <div className="flex items-center gap-4 mb-10 animate-fade-up">
            <div className="flex items-center gap-2 border border-primary/40 bg-primary/8 px-3 py-1.5 rounded-sm">
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span className="font-code text-[11px] text-primary tracking-[0.15em] uppercase">
                sistema activo
              </span>
            </div>
            <span className="font-code text-[11px] text-muted-foreground tracking-wider hidden sm:block">
              // marketing · automatización · finanzas
            </span>
          </div>

          {/* Main headline */}
          <h1
            className="font-display font-black uppercase leading-[0.88] mb-8 animate-fade-up"
            style={{ animationDelay: "0.08s", fontSize: "clamp(3.5rem, 10vw, 7.5rem)" }}
          >
            <span className="block text-foreground/90">Vendé más,</span>
            <span className="block text-gradient">trabajá menos</span>
            <span className="block text-foreground/90">y escalá fuerte</span>
          </h1>

          {/* Subtext with orange bar */}
          <div
            className="flex items-stretch gap-5 mb-12 max-w-2xl animate-fade-up orange-bar pl-5"
            style={{ animationDelay: "0.16s" }}
          >
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              Gestionamos tu publicidad en Meta Ads, automatizamos tus procesos
              con IA y ordenamos las finanzas de tu negocio — todo en un solo equipo.
            </p>
          </div>

          {/* CTAs */}
          <div
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-20 animate-fade-up"
            style={{ animationDelay: "0.24s" }}
          >
            <Button
              variant="hero"
              size="xl"
              asChild
              className="rounded-none font-display font-bold uppercase tracking-widest text-base group"
            >
              <a href="#servicios">
                Ver planes
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
            <Button
              variant="heroOutline"
              size="xl"
              onClick={openBooking}
              className="rounded-none font-display font-bold uppercase tracking-widest text-base"
            >
              Agendar llamada
            </Button>
          </div>

          {/* Stats bar */}
          <div
            className="border border-border/60 divide-x divide-border/60 grid grid-cols-3 animate-fade-up"
            style={{ animationDelay: "0.32s" }}
          >
            {[
              { value: "Meta Ads", label: "gestión completa de publicidad", icon: TrendingUp },
              { value: "n8n + IA", label: "automatización inteligente", icon: Zap },
              { value: "Finanzas", label: "control y análisis del negocio", icon: Clock },
            ].map((stat, i) => (
              <div key={i} className="flex items-center gap-4 px-5 py-5 md:px-8 group hover:bg-primary/5 transition-colors">
                <stat.icon className="w-5 h-5 text-primary flex-shrink-0 opacity-70 group-hover:opacity-100 transition-opacity" />
                <div>
                  <p className="font-display font-black text-3xl md:text-4xl text-primary leading-none">
                    {stat.value}
                  </p>
                  <p className="font-code text-[10px] text-muted-foreground mt-1 uppercase tracking-wider">
                    {stat.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default Hero;
