import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CASES } from "@/data/cases";

export const Route = createFileRoute("/casos")({
  head: () => ({
    meta: [
      { title: "Casos de uso — FrutyStory" },
      { name: "description", content: "Cómo distintas industrias integran su marca en FrutyStory: restaurantes, autos, moda, música y más." },
      { property: "og:title", content: "Casos de uso por industria — FrutyStory" },
      { property: "og:description", content: "Storytelling de marca dentro de la serie viral más vista." },
    ],
  }),
  component: CasosPage,
});

function CasosPage() {
  return (
    <SiteLayout>
      <section className="bg-blobs py-16 text-deep-foreground">
        <div className="container mx-auto px-4 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-gold">Casos de uso</p>
          <h1 className="mt-3 font-display text-4xl font-black sm:text-5xl">
            Tu industria, <span className="text-gradient-gold">dentro de la historia</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-deep-foreground/80">
            Estas son formas reales en que marcas de distintos sectores se vuelven parte de la trama.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CASES.map((c) => (
            <Card key={c.industry} className="overflow-hidden p-7 transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-gold)]">
              <div className="text-5xl">{c.icon}</div>
              <h3 className="mt-4 font-display text-2xl font-black">{c.industry}</h3>
              <p className="mt-3 text-muted-foreground">{c.scene}</p>
            </Card>
          ))}
        </div>

        <div className="mt-14 text-center">
          <Link to="/planes">
            <Button size="lg" className="bg-gold text-gold-foreground hover:bg-gold/90">Ver planes y reservar</Button>
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}
