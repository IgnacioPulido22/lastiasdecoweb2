import { useState, useRef, useEffect, useCallback } from "react";
import { Bot, Workflow, TrendingUp, BarChart3, Megaphone, DollarSign } from "lucide-react";

interface CardState {
  rotX: number;
  rotY: number;
  dragX: number;
  dragY: number;
  isDragging: boolean;
  isHovered: boolean;
  zIndex: number;
}

const services = [
  {
    number: "01",
    icon: Megaphone,
    title: "Meta Ads",
    description: "Gestionamos tus campañas en Facebook e Instagram para que cada peso invertido genere el máximo retorno. Creativos, segmentación y optimización constante.",
  },
  {
    number: "02",
    icon: TrendingUp,
    title: "Marketing digital",
    description: "Estrategia integral de publicidad y contenido: creativos, copy, gestión de redes y crecimiento de audiencias para posicionar tu marca y vender más.",
  },
  {
    number: "03",
    icon: Workflow,
    title: "Automatización con n8n",
    description: "Conectamos tus herramientas para que trabajen solas: respuestas automáticas, captación de leads, seguimientos y reportes — todo sin que muevas un dedo.",
  },
  {
    number: "04",
    icon: Bot,
    title: "Inteligencia artificial",
    description: "Usamos IA para clasificar leads, responder consultas, generar contenido y tomar decisiones automáticas que aceleran el crecimiento de tu negocio.",
  },
  {
    number: "05",
    icon: DollarSign,
    title: "Finanzas del negocio",
    description: "Ordenamos tus números: flujo de caja, rentabilidad por producto, métricas clave y reportes claros para que tomes decisiones basadas en datos reales.",
  },
  {
    number: "06",
    icon: BarChart3,
    title: "Análisis & reportes",
    description: "Dashboards en tiempo real con tus métricas más importantes: ROAS, CAC, LTV, margen neto y más. Sabés exactamente dónde está tu dinero y hacia dónde va.",
  },
];

const DEFAULT_STATE: CardState = {
  rotX: 0, rotY: 0, dragX: 0, dragY: 0,
  isDragging: false, isHovered: false, zIndex: 0,
};

const WhatWeDo = () => {
  const [states, setStates] = useState<CardState[]>(() =>
    services.map((_, i) => ({ ...DEFAULT_STATE, zIndex: i }))
  );

  // Use refs for drag tracking to avoid stale closures in event listeners
  const dragRef = useRef<{ index: number; startX: number; startY: number } | null>(null);
  const statesRef = useRef(states);
  statesRef.current = states;

  const updateCard = useCallback((i: number, patch: Partial<CardState>) => {
    setStates(prev => prev.map((s, idx) => idx === i ? { ...s, ...patch } : s));
  }, []);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      const d = dragRef.current;
      if (!d) return;
      updateCard(d.index, {
        dragX: e.clientX - d.startX,
        dragY: e.clientY - d.startY,
      });
    };

    const onMouseUp = () => {
      const d = dragRef.current;
      if (!d) return;
      dragRef.current = null;
      updateCard(d.index, { isDragging: false, dragX: 0, dragY: 0, rotX: 0, rotY: 0 });
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [updateCard]);

  const handleMouseDown = (i: number, e: React.MouseEvent) => {
    e.preventDefault();
    dragRef.current = { index: i, startX: e.clientX, startY: e.clientY };
    const maxZ = Math.max(...statesRef.current.map(s => s.zIndex));
    updateCard(i, { isDragging: true, zIndex: maxZ + 1 });
  };

  const handleMouseMove = (i: number, e: React.MouseEvent) => {
    if (dragRef.current) return; // skip tilt while any card is dragging
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    updateCard(i, {
      rotX: ((e.clientY - cy) / (rect.height / 2)) * -10,
      rotY: ((e.clientX - cx) / (rect.width / 2)) * 10,
    });
  };

  const handleMouseEnter = (i: number) => updateCard(i, { isHovered: true });

  const handleMouseLeave = (i: number) => {
    if (dragRef.current?.index === i) return;
    updateCard(i, { rotX: 0, rotY: 0, isHovered: false });
  };

  const getTransform = (s: CardState) => {
    if (s.isDragging) {
      return `translate3d(${s.dragX}px, ${s.dragY}px, 40px) scale(1.04)`;
    }
    if (s.isHovered) {
      return `perspective(900px) rotateX(${s.rotX}deg) rotateY(${s.rotY}deg) translateZ(16px)`;
    }
    return "perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0px)";
  };

  const getBoxShadow = (s: CardState) => {
    if (s.isDragging)
      return "0 30px 80px rgba(255,107,0,0.35), 0 0 0 1px rgba(255,107,0,0.3), -8px 0 30px rgba(255,107,0,0.2), 8px 0 30px rgba(255,107,0,0.2)";
    if (s.isHovered)
      return "0 12px_40px rgba(255,107,0,0.2), 0 0 0 1px rgba(255,107,0,0.15), -6px 0 20px rgba(255,107,0,0.12), 6px 0 20px rgba(255,107,0,0.12)";
    return "none";
  };

  return (
    <section id="que-hacemos" className="py-28 bg-background relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border/80 to-transparent" />

      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <p className="font-code text-[10px] text-primary/70 tracking-[0.2em] uppercase mb-4">
              // qué hacemos
            </p>
            <h2 className="font-display font-black uppercase text-5xl md:text-6xl text-foreground leading-tight">
              Todo lo que<br />
              tu negocio{" "}
              <span className="text-gradient">necesita</span>
            </h2>
          </div>
          <p className="text-muted-foreground max-w-sm text-sm leading-relaxed md:text-right">
            Marketing, publicidad, automatización y finanzas — un solo equipo que entiende tu negocio de punta a punta.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border border-border/60">
          {services.map((service, i) => {
            const s = states[i];
            const active = s.isHovered || s.isDragging;
            return (
              <div
                key={i}
                onMouseDown={(e) => handleMouseDown(i, e)}
                onMouseMove={(e) => handleMouseMove(i, e)}
                onMouseEnter={() => handleMouseEnter(i)}
                onMouseLeave={() => handleMouseLeave(i)}
                className={`relative p-7 bg-gradient-card select-none
                  ${[0,1,3,4].includes(i) ? "border-r border-border/60" : ""}
                  ${i < 3 ? "border-b border-border/60" : ""}
                `}
                style={{
                  cursor: s.isDragging ? "grabbing" : "grab",
                  zIndex: s.isDragging ? 50 : s.zIndex,
                  transform: getTransform(s),
                  transition: s.isDragging
                    ? "box-shadow 0.15s ease"
                    : "transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease",
                  boxShadow: s.isDragging
                    ? "0 30px 80px rgba(255,107,0,0.35), 0 0 0 1px rgba(255,107,0,0.3), -8px 0 30px rgba(255,107,0,0.2), 8px 0 30px rgba(255,107,0,0.2)"
                    : s.isHovered
                    ? "0 12px 40px rgba(255,107,0,0.2), 0 0 0 1px rgba(255,107,0,0.15), -6px 0 20px rgba(255,107,0,0.12), 6px 0 20px rgba(255,107,0,0.12)"
                    : "none",
                  willChange: "transform",
                }}
              >
                {/* Left glow */}
                <div
                  className="pointer-events-none absolute left-0 top-0 bottom-0 w-10 bg-gradient-to-r from-primary/25 to-transparent"
                  style={{ opacity: active ? 1 : 0, transition: "opacity 0.3s" }}
                />
                {/* Right glow */}
                <div
                  className="pointer-events-none absolute right-0 top-0 bottom-0 w-10 bg-gradient-to-l from-primary/25 to-transparent"
                  style={{ opacity: active ? 1 : 0, transition: "opacity 0.3s" }}
                />
                {/* Top edge */}
                <div
                  className="pointer-events-none absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/80 to-transparent"
                  style={{ opacity: active ? 1 : 0, transition: "opacity 0.3s" }}
                />

                {/* Number */}
                <span
                  className="font-display font-black text-7xl absolute top-4 right-4 leading-none select-none"
                  style={{
                    color: active ? "rgba(255,107,0,0.12)" : "rgba(255,255,255,0.04)",
                    transition: "color 0.3s",
                  }}
                >
                  {service.number}
                </span>

                {/* Icon */}
                <div
                  className="w-11 h-11 flex items-center justify-center mb-5 relative z-10"
                  style={{
                    border: active ? "1px solid rgba(255,107,0,0.7)" : "1px solid rgba(255,107,0,0.3)",
                    background: active ? "rgba(255,107,0,0.08)" : "transparent",
                    transition: "border 0.3s, background 0.3s",
                  }}
                >
                  <service.icon className="w-5 h-5 text-primary" />
                </div>

                <h3 className="font-display font-bold uppercase text-xl text-foreground mb-3 tracking-wide relative z-10">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed relative z-10">
                  {service.description}
                </p>

                {/* Bottom line */}
                <div
                  className="absolute bottom-0 left-0 h-0.5 bg-primary"
                  style={{
                    width: active ? "100%" : "0%",
                    transition: "width 0.5s ease",
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border/80 to-transparent" />
    </section>
  );
};

export default WhatWeDo;
