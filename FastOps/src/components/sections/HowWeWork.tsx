import { MessageCircle, Search, Settings, Rocket } from "lucide-react";

const HowWeWork = () => {
  const steps = [
    {
      number: "01",
      icon: MessageCircle,
      title: "Conversamos",
      description: "Nos contás tu negocio, tus objetivos y tus números. Entendemos dónde estás y adónde querés llegar.",
    },
    {
      number: "02",
      icon: Search,
      title: "Diagnosticamos",
      description: "Analizamos tu publicidad, tus procesos y tus finanzas para identificar qué frena tu crecimiento y qué se puede mejorar rápido.",
    },
    {
      number: "03",
      icon: Settings,
      title: "Implementamos",
      description: "Lanzamos las campañas, armamos las automatizaciones y ordenamos los números. Todo con foco en resultados medibles.",
    },
    {
      number: "04",
      icon: Rocket,
      title: "Escalamos",
      description: "Con datos reales, optimizamos lo que funciona y escalamos. Reportes claros, decisiones inteligentes, crecimiento sostenido.",
    },
  ];

  return (
    <section id="como-trabajamos" className="py-28 bg-background relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border/80 to-transparent" />

      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-20">
          <div>
            <p className="font-code text-[10px] text-primary/70 tracking-[0.2em] uppercase mb-4">
              // cómo trabajamos
            </p>
            <h2 className="font-display font-black uppercase text-5xl md:text-6xl text-foreground leading-tight">
              Un proceso{" "}
              <span className="text-gradient">simple</span>{" "}
              y claro
            </h2>
          </div>
          <p className="text-muted-foreground max-w-xs text-sm leading-relaxed">
            De la primera llamada a resultados reales en pocas semanas. Sin tecnicismos, sin vueltas.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line (desktop) */}
          <div className="hidden lg:block absolute top-8 left-0 right-0 h-px bg-border/40" style={{ top: "2rem" }} />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`relative flex flex-col gap-5 animate-fade-up lg:pr-8
                  ${index < steps.length - 1 ? "lg:border-r border-border/40" : ""}
                  ${index > 0 ? "lg:pl-8" : ""}
                `}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Number badge + connector dot */}
                <div className="flex items-center gap-4 relative">
                  {/* Dot on the horizontal line */}
                  <div className="hidden lg:flex absolute -top-8 left-0 items-center">
                    <div className="w-3 h-3 border-2 border-primary bg-background" />
                  </div>

                  <span className="font-display font-black text-6xl text-foreground/8 leading-none select-none">
                    {step.number}
                  </span>
                  <div className="w-10 h-10 border border-primary/40 flex items-center justify-center flex-shrink-0 group-hover:border-primary">
                    <step.icon className="w-5 h-5 text-primary" />
                  </div>
                </div>

                <div>
                  <h3 className="font-display font-bold uppercase text-2xl text-foreground mb-2 tracking-wide">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Mobile step connector */}
                {index < steps.length - 1 && (
                  <div className="lg:hidden w-px h-8 bg-border/60 ml-3" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border/80 to-transparent" />
    </section>
  );
};

export default HowWeWork;
