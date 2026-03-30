import { Link } from "react-router-dom";
import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Plans = () => {
  const plans = [
    {
      id: "ecommerce-launch",
      tag: "Launch",
      name: "Ecommerce\nLaunch System",
      subtitle: "Para gente que recién arranca",
      description: "Lanzamos tu tienda lista para vender en 15-30 días.",
      setupPrice: "$250k – $600k",
      setupLabel: "Setup único",
      features: [
        "Tienda optimizada",
        "Creativos iniciales",
        "1 campaña de ads",
        "Automatización básica de respuestas",
        "Captación y gestión de leads",
      ],
      promise: "Lanzamos tu tienda lista para vender en 15-30 días",
      highlighted: false,
    },
    {
      id: "sales-growth",
      tag: "Recomendado",
      name: "Sales Growth\nSystem",
      subtitle: "Tu producto principal",
      description: "Hacemos crecer tus ventas sin que tengas que estar encima.",
      setupPrice: "$300k – $500k",
      setupLabel: "Por mes",
      features: [
        "Meta Ads (gestión completa)",
        "Creativos constantes",
        "Optimización semanal",
        "Mejora de conversión",
        "Automatizaciones con n8n",
      ],
      promise: "Hacemos crecer tus ventas sin que tengas que estar encima",
      highlighted: true,
    },
    {
      id: "scale-machine",
      tag: "Elite",
      name: "Scale\nMachine",
      subtitle: "Para clientes serios",
      description: "Convertimos tu ecommerce en una máquina de ventas.",
      setupPrice: "$600k – $1M+",
      setupLabel: "Por mes",
      features: [
        "Escalado agresivo de ads",
        "Testing constante",
        "Embudos completos",
        "Automatización avanzada",
        "Análisis financiero",
      ],
      promise: "Convertimos tu ecommerce en una máquina de ventas",
      highlighted: false,
    },
  ];

  return (
    <section id="servicios" className="py-28 bg-background relative">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-16">
          <p className="font-code text-[10px] text-primary/70 tracking-[0.2em] uppercase mb-4">
            // nuestros servicios
          </p>
          <h2 className="font-display font-black uppercase text-5xl md:text-6xl text-foreground leading-tight max-w-2xl">
            Elegí el plan que{" "}
            <span className="text-gradient">impulsa</span>{" "}
            tu negocio
          </h2>
        </div>

        {/* Plans grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 border border-border/60">
          {plans.map((plan, idx) => (
            <div
              key={plan.id}
              className={`relative flex flex-col p-8 transition-colors duration-300
                ${idx < plans.length - 1 ? "lg:border-r border-b lg:border-b-0 border-border/60" : ""}
                ${plan.highlighted
                  ? "bg-card shadow-glow-accent"
                  : "bg-gradient-card hover:bg-card/80"
                }
              `}
            >
              {/* Plan name */}
              <h3 className="font-display font-black uppercase text-3xl md:text-4xl text-foreground leading-tight mb-2 whitespace-pre-line">
                {plan.name}
              </h3>
              <p className="text-muted-foreground text-sm mb-8">
                {plan.description}
              </p>

              {/* Price */}
              <div className={`border-t border-b py-5 mb-8 ${plan.highlighted ? "border-primary/30" : "border-border/60"}`}>
                <p className="font-code text-[10px] text-muted-foreground tracking-widest uppercase mb-1">
                  {plan.setupLabel}
                </p>
                <p className="font-display font-black text-4xl text-primary leading-none">
                  {plan.setupPrice}
                </p>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Promise */}
              <div className={`p-4 mb-7 orange-bar pl-5 border ${plan.highlighted ? "border-primary/20 bg-primary/5" : "border-border/40 bg-secondary/30"}`}>
                <p className="font-code text-[9px] text-primary/60 tracking-widest uppercase mb-1">
                  promesa
                </p>
                <p className="text-sm text-foreground/80 italic">
                  "{plan.promise}"
                </p>
              </div>

              {/* CTA */}
              <Button
                variant={plan.highlighted ? "hero" : "heroOutline"}
                className="w-full rounded-none font-display uppercase tracking-widest text-sm group"
                asChild
              >
                <Link to={`/plan/${plan.id}`}>
                  Ver detalles
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Plans;
