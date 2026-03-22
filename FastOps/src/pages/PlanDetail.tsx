import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Check, Play, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { BOOKING_EVENT } from "@/components/BookingModal";

const plansData = {
  "ecommerce-launch": {
    name: "🚀 ECOMMERCE LAUNCH SYSTEM",
    subtitle: "Ecommerce Launch System",
    description: "Para gente que recién arranca. Lanzamos tu tienda lista para vender en 15-30 días.",
    longDescription: "El sistema completo para quienes quieren entrar al mundo del ecommerce con el pie derecho. Desde la tienda optimizada hasta la primera campaña de ads corriendo, todo en un solo paquete. Sin vueltas, sin excusas: en 15 a 30 días tu negocio está vendiendo.",
    setupPrice: "$250k – $600k",
    setupLabel: "Setup único",
    features: [
      "Tienda optimizada para conversión",
      "Creativos iniciales de alta calidad",
      "1 campaña de ads (Meta o Google)",
      "Automatización básica de respuestas",
      "Captación y gestión de leads",
      "Soporte durante el lanzamiento",
    ],
    examples: [
      {
        title: "Tienda lista en tiempo récord",
        description: "Armamos y optimizamos tu tienda online con todo lo necesario para convertir visitantes en compradores desde el día uno.",
      },
      {
        title: "Primera campaña de ads",
        description: "Creamos y lanzamos tu primera campaña publicitaria con creativos profesionales para que empieces a generar ventas.",
      },
      {
        title: "Automatización de respuestas",
        description: "Configuramos respuestas automáticas para leads y consultas frecuentes para que no pierdas ninguna oportunidad.",
      },
    ],
    idealFor: [
      "Emprendedores que quieren lanzar su ecommerce",
      "Negocios físicos que quieren ir al online",
      "Marcas que arrancaron pero no ven resultados",
    ],
  },
  "sales-growth": {
    name: "📈 SALES GROWTH SYSTEM",
    subtitle: "Sales Growth System",
    description: "Tu producto principal. Hacemos crecer tus ventas sin que tengas que estar encima.",
    longDescription: "El sistema pensado para ecommerce que ya venden pero quieren más. Nos encargamos de todo: Meta Ads, creativos, optimización semanal y automatizaciones con n8n. Vos te enfocás en tu negocio, nosotros en hacer que venda más.",
    setupPrice: "$300k – $500k",
    setupLabel: "Por mes",
    features: [
      "Meta Ads con gestión completa",
      "Creativos constantes y frescos",
      "Optimización semanal de campañas",
      "Mejora continua de la conversión",
      "Automatizaciones con n8n",
      "Reportes y análisis de resultados",
    ],
    examples: [
      {
        title: "Gestión completa de Meta Ads",
        description: "Nos encargamos de toda la operación publicitaria: estrategia, creativos, segmentación, optimización y reporting.",
      },
      {
        title: "Creativos que convierten",
        description: "Producimos creativos constantemente para testear y escalar lo que mejor funciona para tu audiencia.",
      },
      {
        title: "Automatizaciones con n8n",
        description: "Flujos automatizados para leads, seguimientos, notificaciones y todo lo que te quita tiempo.",
      },
    ],
    idealFor: [
      "Ecommerce con ventas pero que quieren escalar",
      "Dueños que no tienen tiempo para gestionar ads",
      "Marcas que quieren sistematizar su crecimiento",
    ],
  },
  "scale-machine": {
    name: "🔥 SCALE MACHINE",
    subtitle: "Scale Machine",
    description: "Para clientes serios. Convertimos tu ecommerce en una máquina de ventas.",
    longDescription: "El sistema más completo para ecommerce que quieren escalar sin límites. Escalado agresivo de ads, testing constante, embudos completos, automatización avanzada y análisis financiero detallado. Para los que van en serio.",
    setupPrice: "$600k – $1M+",
    setupLabel: "Por mes",
    features: [
      "Escalado agresivo de ads",
      "Testing constante de creativos y audiencias",
      "Embudos de venta completos",
      "Automatización avanzada end-to-end",
      "Análisis financiero detallado",
      "Estrategia de crecimiento personalizada",
    ],
    examples: [
      {
        title: "Escalado agresivo",
        description: "Aumentamos el presupuesto y el alcance de forma estratégica para maximizar el retorno sin perder rentabilidad.",
      },
      {
        title: "Embudos completos",
        description: "Diseñamos y optimizamos todo el embudo: desde el primer contacto hasta la recompra y fidelización.",
      },
      {
        title: "Automatización avanzada",
        description: "Sistemas complejos de automatización que conectan todo tu stack: CRM, ads, email, WhatsApp y más.",
      },
    ],
    idealFor: [
      "Ecommerce con alto volumen de ventas",
      "Marcas que quieren ser líderes en su categoría",
      "Negocios listos para escalar sin techo",
    ],
  },
};

const PlanDetail = () => {
  const { planId } = useParams<{ planId: string }>();
  const plan = plansData[planId as keyof typeof plansData];

  if (!plan) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-2xl font-bold mb-4">Plan no encontrado</h1>
          <Button asChild>
            <Link to="/">Volver al inicio</Link>
          </Button>
        </div>
      </div>
    );
  }

  const whatsappNumber = "5491127834950";
  const whatsappMessage = encodeURIComponent(`Hola! Me interesa el ${plan.subtitle}`);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <Link
            to="/#servicios"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver a servicios
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div>
              <span className="inline-block text-primary text-sm font-semibold mb-2 tracking-wider">
                {plan.name}
              </span>
              <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 text-foreground">
                {plan.subtitle}
              </h1>
              <p className="text-xl text-muted-foreground mb-6">
                {plan.description}
              </p>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                {plan.longDescription}
              </p>

              <div className="bg-gradient-card border border-border rounded-2xl p-6 mb-8 shadow-card">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{plan.setupLabel}</p>
                  <p className="font-display text-3xl font-bold text-primary">{plan.setupPrice}</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="hero" size="lg" className="flex-1" asChild>
                  <a
                    href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Consultar por este servicio
                  </a>
                </Button>
                <Button
                  variant="heroOutline"
                  size="lg"
                  onClick={() => window.dispatchEvent(new Event(BOOKING_EVENT))}
                >
                  Agendar llamada
                </Button>
              </div>
            </div>

            <div className="bg-gradient-card border border-border rounded-2xl p-2 aspect-video flex items-center justify-center shadow-card">
              <div className="text-center p-8">
                <div className="w-20 h-20 rounded-full bg-primary/15 flex items-center justify-center mx-auto mb-4">
                  <Play className="w-10 h-10 text-primary ml-1" />
                </div>
                <p className="text-muted-foreground">
                  Video demostrativo próximamente
                </p>
                <p className="text-sm text-muted-foreground/70 mt-2">
                  Acá podrás ver el servicio en acción
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            <div className="bg-gradient-card border border-border rounded-2xl p-8 shadow-card">
              <h2 className="font-display text-xl font-semibold mb-6 text-foreground">
                ¿Qué incluye?
              </h2>
              <ul className="space-y-4">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gradient-card border border-border rounded-2xl p-8 shadow-card">
              <h2 className="font-display text-xl font-semibold mb-6 text-foreground">
                Ejemplos prácticos
              </h2>
              <div className="space-y-6">
                {plan.examples.map((example, index) => (
                  <div key={index}>
                    <h3 className="font-medium text-foreground mb-2">{example.title}</h3>
                    <p className="text-sm text-muted-foreground">{example.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-card border border-border rounded-2xl p-8 shadow-card">
              <h2 className="font-display text-xl font-semibold mb-6 text-foreground">
                Ideal para
              </h2>
              <ul className="space-y-4">
                {plan.idealFor.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="text-center">
            <h2 className="font-display text-2xl font-bold mb-4 text-foreground">
              ¿Tenés dudas sobre este servicio?
            </h2>
            <p className="text-muted-foreground mb-6">
              Escribinos y te ayudamos a elegir la mejor opción para tu negocio.
            </p>
            <Button variant="whatsapp" size="lg" asChild>
              <a
                href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Chatear por WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default PlanDetail;
