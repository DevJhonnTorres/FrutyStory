import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tv, Package, Users, Music } from "lucide-react";

export const Route = createFileRoute("/servicios")({
  head: () => ({
    meta: [
      { title: "Servicios — FrutyStory" },
      { name: "description", content: "Cuatro formatos para tu marca: comerciales, product placement, embajadores e integración musical." },
      { property: "og:title", content: "Servicios — FrutyStory" },
      { property: "og:description", content: "Cuatro formatos publicitarios dentro de la serie." },
    ],
  }),
  component: ServiciosPage,
});

const SERVICES = [
  { icon: Tv, t: "Comerciales", d: "Spots producidos con los personajes de la serie, listos para tus canales." },
  { icon: Package, t: "Product placement", d: "Tu producto aparece naturalmente dentro de las escenas." },
  { icon: Users, t: "Embajadores", d: "Los personajes representan tu marca dentro y fuera de la serie." },
  { icon: Music, t: "Integración musical", d: "Tu música se vuelve parte del soundtrack de un capítulo viral." },
];

function ServiciosPage() {
  return (
    <SiteLayout>
      <section className="bg-blobs py-16 text-deep-foreground">
        <div className="container mx-auto px-4 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-gold">Servicios</p>
          <h1 className="mt-3 font-display text-4xl font-black sm:text-5xl">
            Cuatro formatos. <span className="text-gradient-gold">Cero interrupciones.</span>
          </h1>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="grid gap-6 sm:grid-cols-2">
          {SERVICES.map((s) => (
            <Card key={s.t} className="p-8 transition-all hover:shadow-[var(--shadow-gold)]">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gold/15 text-gold">
                <s.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-display text-2xl font-black">{s.t}</h3>
              <p className="mt-2 text-muted-foreground">{s.d}</p>
            </Card>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link to="/planes"><Button size="lg">Ver planes</Button></Link>
        </div>
      </section>
    </SiteLayout>
  );
}
