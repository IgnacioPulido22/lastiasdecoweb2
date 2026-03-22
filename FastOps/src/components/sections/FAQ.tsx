import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "¿Qué resultados puedo esperar con Meta Ads?",
      answer: "Depende del producto, el presupuesto y el mercado, pero trabajamos para que cada peso invertido en publicidad genere el mayor retorno posible. Nuestros clientes suelen ver mejoras en su ROAS (retorno sobre inversión publicitaria) desde el primer mes de optimización. Somos transparentes con las métricas: te mostramos exactamente qué está funcionando y qué no.",
    },
    {
      question: "¿Cuánto presupuesto necesito para empezar con publicidad?",
      answer: "No hay un mínimo universal, pero recomendamos destinar al menos $100.000–$200.000 ARS mensuales en inversión publicitaria para tener datos suficientes para optimizar. Con presupuestos más bajos igual se puede trabajar, pero los resultados tardan más en verse. En la llamada inicial te asesoramos según tu situación específica.",
    },
    {
      question: "¿Cómo manejan las finanzas de mi negocio?",
      answer: "Organizamos tu información financiera para que tengas claridad real sobre tu negocio: flujo de caja, rentabilidad por producto, punto de equilibrio y métricas clave. No somos contadores tradicionales — somos un equipo orientado a que tomes decisiones de negocio con datos, no a ciegas. Te entregamos reportes claros y periódicos.",
    },
    {
      question: "¿Qué tipo de tareas se pueden automatizar?",
      answer: "Casi cualquier proceso repetitivo: responder consultas frecuentes por WhatsApp o email, guardar datos de formularios en Google Sheets, enviar emails o mensajes de seguimiento a leads, generar reportes automáticos, clasificar clientes, programar publicaciones y mucho más. Si lo hacés más de una vez a la semana, probablemente se puede automatizar.",
    },
    {
      question: "¿Necesito saber de tecnología o de marketing para trabajar con ustedes?",
      answer: "No, para nada. Nos encargamos de toda la parte técnica y estratégica. Vos nos contás tu negocio, tus objetivos y tu presupuesto — nosotros diseñamos e implementamos las soluciones. Recibís reportes claros y te explicamos cada decisión en lenguaje simple.",
    },
    {
      question: "¿Trabajan con cualquier tipo de negocio?",
      answer: "Nos especializamos en ecommerce y negocios de productos físicos o digitales que quieren crecer online. Si tenés un producto y querés venderlo más, o ya estás vendiendo y querés escalar, somos el equipo indicado.",
    },
    {
      question: "¿Las automatizaciones funcionan mientras duermo?",
      answer: "Exactamente para eso están. Tu negocio puede responder consultas, capturar leads, hacer seguimientos y enviar presupuestos aunque vos estés durmiendo o atendiendo otras cosas. Es como tener un equipo que trabaja 24/7 sin sueldo fijo.",
    },
    {
      question: "¿Puedo contratar solo uno de los servicios?",
      answer: "Sí. Podés empezar solo con Meta Ads, o solo con automatizaciones, o enfocarte en ordenar las finanzas. Aunque trabajar las tres áreas en conjunto es donde se ven los mejores resultados, entendemos que cada negocio tiene su momento y su presupuesto.",
    },
  ];

  return (
    <section id="faq" className="py-28 bg-background relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border/80 to-transparent" />

      <div className="container mx-auto px-4">
        <div className="mb-16">
          <p className="font-code text-[10px] text-primary/70 tracking-[0.2em] uppercase mb-4">
            // preguntas frecuentes
          </p>
          <h2 className="font-display font-black uppercase text-5xl md:text-6xl text-foreground leading-tight">
            ¿Tenés dudas?{" "}
            <span className="text-gradient">Te las aclaramos</span>
          </h2>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-0 border border-border/60 divide-y divide-border/60">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-gradient-card px-7 data-[state=open]:bg-card data-[state=open]:border-l-2 data-[state=open]:border-l-primary transition-all"
              >
                <AccordionTrigger className="text-left font-display font-bold uppercase text-lg text-foreground hover:text-primary hover:no-underline py-5 tracking-wide">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-6 leading-relaxed text-sm">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border/80 to-transparent" />
    </section>
  );
};

export default FAQ;
