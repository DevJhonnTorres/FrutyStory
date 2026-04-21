import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { SiteLayout } from "@/components/SiteLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getCart, setCheckout, getCheckout } from "@/lib/store";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — FrutyStory" },
      { name: "description", content: "Completa los datos de tu empresa para reservar tu espacio publicitario." },
    ],
  }),
  component: CheckoutPage,
});

const schema = z.object({
  empresa: z.string().trim().min(2, "Nombre de empresa requerido").max(120),
  industria: z.string().min(1, "Selecciona una industria"),
  presupuesto: z.string().min(1, "Selecciona un rango"),
  tipoIntegracion: z.string().min(1, "Selecciona el tipo"),
  objetivo: z.string().min(1, "Selecciona un objetivo"),
  email: z.string().trim().email("Email inválido").max(255),
  whatsapp: z.string().trim().min(7, "WhatsApp inválido").max(25),
});

function CheckoutPage() {
  const nav = useNavigate();
  const [form, setForm] = useState({
    empresa: "", industria: "", presupuesto: "", tipoIntegracion: "", objetivo: "", email: "", whatsapp: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (getCart().length === 0) {
      toast.error("Tu carrito está vacío");
      nav({ to: "/carrito" });
    }
    const saved = getCheckout();
    if (saved) setForm(saved);
  }, [nav]);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm({ ...form, [k]: e.target.value });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const r = schema.safeParse(form);
    if (!r.success) {
      const errs: Record<string, string> = {};
      r.error.issues.forEach((i) => { errs[i.path[0] as string] = i.message; });
      setErrors(errs);
      toast.error("Revisa los campos del formulario");
      return;
    }
    setErrors({});
    setCheckout(r.data);
    nav({ to: "/checkout/pago" });
  };

  const Sel = (props: { name: keyof typeof form; label: string; options: string[] }) => (
    <div>
      <Label className="mb-1.5 block">{props.label}</Label>
      <select
        value={form[props.name]}
        onChange={set(props.name)}
        className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
      >
        <option value="">Selecciona...</option>
        {props.options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
      {errors[props.name] && <p className="mt-1 text-xs text-destructive">{errors[props.name]}</p>}
    </div>
  );

  return (
    <SiteLayout>
      <section className="container mx-auto max-w-3xl px-4 py-12">
        <h1 className="font-display text-4xl font-black">Datos de tu empresa</h1>
        <p className="mt-2 text-muted-foreground">Esto nos permite personalizar la integración. Solo toma 2 minutos.</p>

        <Card className="mt-8 p-7">
          <form onSubmit={submit} className="grid gap-5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <Label className="mb-1.5 block">Nombre de la empresa</Label>
              <Input value={form.empresa} onChange={set("empresa")} placeholder="Ej. Sabor Express" />
              {errors.empresa && <p className="mt-1 text-xs text-destructive">{errors.empresa}</p>}
            </div>

            <Sel name="industria" label="Industria" options={["Restaurantes", "Automotriz", "Moda", "Belleza", "Bebidas", "Música", "Tecnología", "Otra"]} />
            <Sel name="presupuesto" label="Presupuesto estimado" options={["< $1M COP", "$1M - $3M COP", "$3M - $10M COP", "+$10M COP"]} />
            <Sel name="tipoIntegracion" label="Tipo de integración" options={["Producto", "Historia", "Personaje"]} />
            <Sel name="objetivo" label="Objetivo principal" options={["Branding", "Ventas", "Awareness"]} />

            <div>
              <Label className="mb-1.5 block">Email</Label>
              <Input type="email" value={form.email} onChange={set("email")} placeholder="hola@empresa.com" />
              {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
            </div>
            <div>
              <Label className="mb-1.5 block">WhatsApp</Label>
              <Input value={form.whatsapp} onChange={set("whatsapp")} placeholder="+57 300 000 0000" />
              {errors.whatsapp && <p className="mt-1 text-xs text-destructive">{errors.whatsapp}</p>}
            </div>

            <div className="flex flex-col-reverse items-stretch justify-between gap-3 sm:col-span-2 sm:flex-row sm:items-center">
              <Link to="/carrito" className="text-sm text-muted-foreground hover:text-primary">← Volver al carrito</Link>
              <Button type="submit" size="lg" className="bg-gold text-gold-foreground hover:bg-gold/90">Continuar al pago →</Button>
            </div>
          </form>
        </Card>
      </section>
    </SiteLayout>
  );
}
