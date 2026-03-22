import { useState } from "react";
import { Send, Mail, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.functions.invoke('send-contact-email', {
        body: {
          name: formData.name,
          email: formData.email,
          message: formData.message,
        },
      });

      if (error) {
        throw error;
      }

      toast({
        title: "¡Mensaje enviado!",
        description: "Te contactaremos pronto.",
      });

      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Error al enviar",
        description: "Por favor intentá de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsappNumber = "5491127834950";
  const whatsappMessage = encodeURIComponent("Hola! Me interesa saber más sobre los servicios de FastOps Studio (marketing, automatización y finanzas).");

  return (
    <section id="contacto" className="py-24 bg-card/30 relative">
      <div className="absolute inset-0 bg-gradient-hero opacity-20" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <p className="font-code text-[10px] text-primary/70 tracking-[0.2em] uppercase mb-4">
            // contacto
          </p>
          <h2 className="font-display font-black uppercase text-5xl md:text-6xl text-foreground leading-tight">
            ¿Listo para{" "}
            <span className="text-gradient">crecer?</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mt-4">
            Escribinos y te ayudamos a encontrar la combinación ideal de marketing, automatización y finanzas para tu negocio.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    Nombre
                  </label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Tu nombre"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="bg-card border-border/50 focus:border-primary"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="tu@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="bg-card border-border/50 focus:border-primary"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    Mensaje
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Contanos sobre tu negocio: ¿qué vendés, qué querés mejorar (ventas, procesos, finanzas)?"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={5}
                    className="bg-card border-border/50 focus:border-primary resize-none"
                  />
                </div>
                <Button type="submit" variant="hero" size="lg" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Enviando..." : "Enviar mensaje"}
                  <Send className="w-4 h-4 ml-2" />
                </Button>
              </form>
            </div>

            <div className="flex flex-col justify-center">
              <div className="bg-gradient-card border border-border/50 rounded-2xl p-8">
                <h3 className="font-display text-xl font-semibold mb-4 text-foreground">
                  ¿Preferís hablar directo?
                </h3>
                <p className="text-muted-foreground mb-6">
                  Escribinos por WhatsApp y te respondemos en minutos. Sin compromiso.
                </p>
                <Button variant="whatsapp" size="lg" className="w-full" asChild>
                  <a
                    href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Chatear por WhatsApp
                  </a>
                </Button>

                <div className="mt-8 pt-6 border-t border-border/50">
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Mail className="w-5 h-5 text-primary" />
                    <span className="text-sm">contacto@fastopsstudio.com</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
