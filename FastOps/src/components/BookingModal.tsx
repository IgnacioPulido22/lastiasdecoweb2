import { useState, useEffect } from "react";
import { Calendar, Clock, User, Mail, Phone, MessageSquare, CheckCircle2, ArrowRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

/*
 * ⚙️  CONFIGURAR WEBHOOK
 * ─────────────────────────────────────────────────────────────────────────────
 * 1. Abrí Google Apps Script: https://script.google.com
 * 2. Creá un nuevo proyecto y pegá este código:
 *
 *   function doPost(e) {
 *     var data = JSON.parse(e.postData.contents);
 *
 *     // --- Google Sheets ---
 *     var ss = SpreadsheetApp.openById("TU_SPREADSHEET_ID");
 *     var sheet = ss.getSheetByName("Citas") || ss.insertSheet("Citas");
 *     if (sheet.getLastRow() === 0) {
 *       sheet.appendRow(["Timestamp","Nombre","Email","Teléfono","Fecha","Horario","Servicio","Mensaje"]);
 *     }
 *     sheet.appendRow([
 *       data.timestamp, data.nombre, data.email, data.telefono,
 *       data.fecha, data.horario, data.servicio, data.mensaje
 *     ]);
 *
 *     // --- Google Calendar ---
 *     var cal = CalendarApp.getDefaultCalendar();
 *     var startDate = new Date(data.fecha + "T" + data.horario + ":00");
 *     var endDate = new Date(startDate.getTime() + 60 * 60 * 1000); // 1 hora
 *     cal.createEvent(
 *       "Llamada con " + data.nombre + " — " + data.servicio,
 *       startDate, endDate,
 *       { description: "Email: " + data.email + "\nTeléfono: " + data.telefono + "\n\n" + data.mensaje }
 *     );
 *
 *     return ContentService.createTextOutput(JSON.stringify({ ok: true }))
 *                          .setMimeType(ContentService.MimeType.JSON);
 *   }
 *
 * 3. Publicá como Web App: Implementar → Nueva implementación → Web app
 *    - Ejecutar como: Tu cuenta
 *    - Quién tiene acceso: Cualquiera
 * 4. Copiá la URL y pegala en BOOKING_WEBHOOK_URL abajo.
 * ─────────────────────────────────────────────────────────────────────────────
 */
const BOOKING_WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbyi_aJjj5ZcSAn3_mGJXcewbr3_-GofgThhtlDVQljnfpLQ2K6OWsvVKF8Vgw9BNlXd/exec";

const TIME_SLOTS = [
  "09:00", "10:00", "11:00", "12:00",
  "14:00", "15:00", "16:00", "17:00", "18:00",
];

const SERVICES = [
  { value: "Meta Ads & Publicidad", label: "📣 Meta Ads & Publicidad" },
  { value: "Automatización con n8n + IA", label: "⚙️ Automatización con n8n + IA" },
  { value: "Finanzas del negocio", label: "📊 Finanzas del negocio" },
  { value: "Ecommerce Launch System", label: "🚀 Ecommerce Launch System" },
  { value: "Sales Growth System", label: "📈 Sales Growth System" },
  { value: "Scale Machine", label: "🔥 Scale Machine" },
  { value: "Consulta general", label: "Consulta general" },
];

const emptyForm = {
  nombre: "",
  email: "",
  telefono: "",
  fecha: "",
  horario: "",
  servicio: "",
  mensaje: "",
};

export const BOOKING_EVENT = "openBookingModal";

const FieldLabel = ({ children }: { children: React.ReactNode }) => (
  <label className="block font-code text-[10px] text-primary/70 tracking-[0.18em] uppercase mb-2">
    {children}
  </label>
);

const BookingModal = () => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener(BOOKING_EVENT, handler);
    return () => window.removeEventListener(BOOKING_EVENT, handler);
  }, []);

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      setSuccess(false);
      setForm(emptyForm);
    }, 300);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await fetch(BOOKING_WEBHOOK_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          timestamp: new Date().toLocaleString("es-AR", { timeZone: "America/Argentina/Buenos_Aires" }),
        }),
      });

      setSuccess(true);
    } catch {
      toast({
        title: "Error al agendar",
        description: "Por favor intentá de nuevo o escribinos por WhatsApp.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const set = (field: keyof typeof emptyForm) => (val: string) =>
    setForm((prev) => ({ ...prev, [field]: val }));

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];

  const inputClass = "rounded-none border-border/50 bg-background/60 focus:border-primary focus-visible:ring-0 focus-visible:ring-offset-0 text-sm";
  const selectTriggerClass = "rounded-none border-border/50 bg-background/60 focus:ring-0 focus:ring-offset-0 text-sm";

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-xl max-h-[95vh] overflow-y-auto bg-card border border-border rounded-none p-0 gap-0">
        {success ? (
          /* ── Success state ── */
          <div className="flex flex-col items-center justify-center py-20 text-center gap-7 px-10">
            <div className="relative">
              <div className="w-20 h-20 border-2 border-primary flex items-center justify-center">
                <CheckCircle2 className="w-9 h-9 text-primary" />
              </div>
              <div className="absolute -inset-3 border border-primary/20" />
            </div>

            <div>
              <p className="font-code text-[10px] text-primary/70 tracking-[0.2em] uppercase mb-3">
                // estado: confirmado
              </p>
              <h2 className="font-display font-black uppercase text-5xl text-foreground leading-tight">
                Cita<br />Agendada
              </h2>
            </div>

            <p className="font-code text-xs text-muted-foreground leading-relaxed">
              {form.fecha} &mdash; {form.horario} hs<br />
              <span className="text-foreground/50">Confirmación por email a la brevedad</span>
            </p>

            <Button
              variant="hero"
              onClick={handleClose}
              className="rounded-none font-display uppercase tracking-widest text-sm"
            >
              Cerrar
            </Button>
          </div>
        ) : (
          <>
            {/* ── Header ── */}
            <div className="relative border-b border-border px-8 pt-8 pb-7 orange-bar">
              <DialogHeader>
                <p className="font-code text-[10px] text-primary/70 tracking-[0.2em] uppercase mb-3">
                  // nuevo agendamiento
                </p>
                <DialogTitle className="font-display font-black uppercase text-4xl text-foreground leading-tight">
                  Agendar<br />
                  <span className="text-gradient">una llamada</span>
                </DialogTitle>
                <p className="text-muted-foreground text-sm mt-3 font-sans font-normal">
                  Completá el formulario y confirmamos la cita por email.
                </p>
              </DialogHeader>
            </div>

            {/* ── Form ── */}
            <form onSubmit={handleSubmit} className="px-8 py-7 space-y-5">
              {/* Nombre + Teléfono */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <FieldLabel>nombre *</FieldLabel>
                  <Input
                    placeholder="Tu nombre"
                    value={form.nombre}
                    onChange={(e) => set("nombre")(e.target.value)}
                    required
                    className={inputClass}
                  />
                </div>
                <div>
                  <FieldLabel>teléfono</FieldLabel>
                  <Input
                    type="tel"
                    placeholder="+54 9 11..."
                    value={form.telefono}
                    onChange={(e) => set("telefono")(e.target.value)}
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <FieldLabel>email *</FieldLabel>
                <Input
                  type="email"
                  placeholder="tu@email.com"
                  value={form.email}
                  onChange={(e) => set("email")(e.target.value)}
                  required
                  className={inputClass}
                />
              </div>

              {/* Fecha + Horario */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <FieldLabel>fecha *</FieldLabel>
                  <Input
                    type="date"
                    min={minDate}
                    value={form.fecha}
                    onChange={(e) => set("fecha")(e.target.value)}
                    required
                    className={inputClass}
                  />
                </div>
                <div>
                  <FieldLabel>horario *</FieldLabel>
                  <Select value={form.horario} onValueChange={set("horario")} required>
                    <SelectTrigger className={selectTriggerClass}>
                      <SelectValue placeholder="Elegí horario" />
                    </SelectTrigger>
                    <SelectContent className="rounded-none border-border bg-card">
                      {TIME_SLOTS.map((t) => (
                        <SelectItem key={t} value={t} className="font-code text-sm">
                          {t} hs
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Servicio */}
              <div>
                <FieldLabel>servicio</FieldLabel>
                <Select value={form.servicio} onValueChange={set("servicio")}>
                  <SelectTrigger className={selectTriggerClass}>
                    <SelectValue placeholder="¿Sobre qué querés hablar?" />
                  </SelectTrigger>
                  <SelectContent className="rounded-none border-border bg-card">
                    {SERVICES.map((s) => (
                      <SelectItem key={s.value} value={s.value} className="text-sm">
                        {s.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Mensaje */}
              <div>
                <FieldLabel>mensaje (opcional)</FieldLabel>
                <Textarea
                  placeholder="Contanos brevemente sobre tu negocio y qué querés lograr..."
                  value={form.mensaje}
                  onChange={(e) => set("mensaje")(e.target.value)}
                  rows={3}
                  className={`resize-none ${inputClass}`}
                />
              </div>

              <Button
                type="submit"
                variant="hero"
                size="lg"
                className="w-full rounded-none font-display font-bold uppercase tracking-widest text-sm group"
                disabled={isSubmitting || !form.horario || !form.fecha}
              >
                {isSubmitting ? (
                  <span className="font-code text-xs tracking-widest">procesando...</span>
                ) : (
                  <>
                    Confirmar cita
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;
