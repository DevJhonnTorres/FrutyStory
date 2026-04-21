import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { SiteLayout } from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PLANS } from "@/data/plans";
import { addToCart } from "@/lib/store";
import { Check, Star } from "lucide-react";

export const Route = createFileRoute("/planes")({
  head: () => ({
    meta: [
      { title: "Planes — FrutyStory" },
      { name: "description", content: "Elige el plan ideal para integrar tu marca: Básico, Pro o Premium. Reserva tu espacio en la serie." },
      { property: "og:title", content: "Planes de integración — FrutyStory" },
      { property: "og:description", content: "Tres formas de aparecer en la serie: producto, historia o personaje." },
    ],
  }),
  component: PlanesPage,
});

function PlanesPage() {
  const nav = useNavigate();

  const reserve = (planId: typeof PLANS[number]["id"]) => {
    const plan = PLANS.find((p) => p.id === planId)!;
    addToCart({
      planId: plan.id,
      name: plan.name,
      price: plan.price,
      episode: "Próximo episodio disponible",
    });
    toast.success(`Plan ${plan.name} añadido al carrito`);
    nav({ to: "/carrito" });
  };

  return (
    <SiteLayout>
      <section className="bg-blobs py-16 text-deep-foreground">
        <div className="container mx-auto px-4 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-gold">Planes</p>
          <h1 className="mt-3 font-display text-4xl font-black sm:text-5xl">
            Elige tu forma de <span className="text-gradient-gold">aparecer</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-deep-foreground/80">
            Precios placeholder — fácilmente editables. Cada plan reserva un espacio exclusivo por episodio.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="grid gap-6 md:grid-cols-3">
          {PLANS.map((p) => (
            <Card
              key={p.id}
              className={`relative flex flex-col p-7 ${p.highlight ? "ring-2 ring-gold shadow-[var(--shadow-gold)] md:-translate-y-3" : ""}`}
            >
              {p.highlight && (
                <div className="absolute -top-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1 rounded-full bg-gold px-3 py-1 text-xs font-bold text-gold-foreground">
                  <Star className="h-3 w-3 fill-current" /> Más popular
                </div>
              )}
              <h2 className="font-display text-3xl font-black">{p.name}</h2>
              <p className="text-sm text-muted-foreground">{p.tagline}</p>
              <div className="mt-5 font-display text-4xl font-black text-primary">{p.priceLabel}</div>
              <div className="text-sm text-muted-foreground">{p.episodes}</div>

              <ul className="mt-6 flex-1 space-y-3">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" /> {f}
                  </li>
                ))}
              </ul>

              <Button
                onClick={() => reserve(p.id)}
                className={`mt-7 w-full ${p.highlight ? "bg-gold text-gold-foreground hover:bg-gold/90" : ""}`}
              >
                Reservar espacio
              </Button>
            </Card>
          ))}
        </div>

        <div className="mt-14 rounded-2xl bg-muted p-8 text-center">
          <h3 className="font-display text-2xl font-bold">¿Necesitas algo a la medida?</h3>
          <p className="mt-2 text-muted-foreground">Combinamos formatos para campañas grandes o múltiples marcas.</p>
          <Link to="/contacto">
            <Button variant="outline" className="mt-4">Hablemos</Button>
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}
