import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { SiteLayout } from "@/components/SiteLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/contacto")({
  head: () => ({
    meta: [
      { title: "Contacto — FrutyStory" },
      { name: "description", content: "Cuéntanos sobre tu marca y te armamos una propuesta de integración." },
    ],
  }),
  component: ContactoPage,
});

const schema = z.object({
  empresa: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(255),
  presupuesto: z.string().min(1),
  tipoIntegracion: z.string().min(1),
  objetivo: z.string().min(1),
  mensaje: z.string().trim().max(1000).optional().or(z.literal("")),
});

function ContactoPage() {
  const [form, setForm] = useState({ empresa: "", email: "", presupuesto: "", tipoIntegracion: "", objetivo: "", mensaje: "" });
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const r = schema.safeParse(form);
    if (!r.success) { toast.error("Completa los campos requeridos"); return; }
    setSent(true);
    toast.success("Mensaje enviado. Te contactamos pronto.");
  };

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm({ ...form, [k]: e.target.value });

  return (
    <SiteLayout>
      <section className="bg-blobs py-14 text-deep-foreground">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display text-4xl font-black sm:text-5xl">Hablemos de tu <span className="text-gradient-gold">marca</span></h1>
          <p className="mx-auto mt-3 max-w-2xl text-deep-foreground/80">Te armamos una propuesta a la medida en menos de 48h.</p>
        </div>
      </section>

      <section className="container mx-auto max-w-2xl px-4 py-12">
        {sent ? (
          <Card className="p-10 text-center">
            <h2 className="font-display text-2xl font-black">¡Gracias! 🎬</h2>
            <p className="mt-2 text-muted-foreground">Recibimos tu mensaje. Te escribimos a {form.email} muy pronto.</p>
          </Card>
        ) : (
          <Card className="p-7">
            <form onSubmit={submit} className="grid gap-4">
              <div>
                <Label className="mb-1.5 block">Nombre de la empresa</Label>
                <Input value={form.empresa} onChange={set("empresa")} required />
              </div>
              <div>
                <Label className="mb-1.5 block">Email</Label>
                <Input type="email" value={form.email} onChange={set("email")} required />
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <Label className="mb-1.5 block">Presupuesto</Label>
                  <select value={form.presupuesto} onChange={set("presupuesto")} className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm" required>
                    <option value="">—</option>
                    <option>{"< $1M COP"}</option>
                    <option>$1M - $3M COP</option>
                    <option>$3M - $10M COP</option>
                    <option>+$10M COP</option>
                  </select>
                </div>
                <div>
                  <Label className="mb-1.5 block">Integración</Label>
                  <select value={form.tipoIntegracion} onChange={set("tipoIntegracion")} className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm" required>
                    <option value="">—</option>
                    <option>Producto</option><option>Historia</option><option>Personaje</option>
                  </select>
                </div>
                <div>
                  <Label className="mb-1.5 block">Objetivo</Label>
                  <select value={form.objetivo} onChange={set("objetivo")} className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm" required>
                    <option value="">—</option>
                    <option>Branding</option><option>Ventas</option><option>Awareness</option>
                  </select>
                </div>
              </div>
              <div>
                <Label className="mb-1.5 block">Cuéntanos más (opcional)</Label>
                <Textarea value={form.mensaje} onChange={set("mensaje")} maxLength={1000} rows={4} />
              </div>
              <Button type="submit" size="lg" className="bg-gold text-gold-foreground hover:bg-gold/90">Enviar mensaje</Button>
            </form>
          </Card>
        )}
      </section>
    </SiteLayout>
  );
}
