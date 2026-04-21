import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PLANS } from "@/data/plans";
import { CASES } from "@/data/cases";
import { TESTIMONIALS, BRANDS } from "@/data/testimonials";
import { getCupos, onStoreChange } from "@/lib/store";
import heroImg from "@/assets/frutiiiii.png";
import donBome from "@/assets/frutiii.png";
import { Sparkles, TrendingDown, SkipForward, EyeOff, Check, Star, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FrutyStory — Convierte tu marca en protagonista de una serie viral" },
      { name: "description", content: "+50M reproducciones por episodio. Integra tu marca de forma orgánica en la serie viral más vista de Colombia." },
      { property: "og:title", content: "FrutyStory — Tu marca, protagonista de la serie" },
      { property: "og:description", content: "Publicidad que la audiencia no se salta. Integración orgánica en una serie con +50M views." },
    ],
  }),
  component: Index,
});

function Index() {
  const [cupos, setCuposState] = useState(3);
  useEffect(() => {
    const r = () => setCuposState(getCupos());
    r();
    return onStoreChange(r);
  }, []);

  return (
    <SiteLayout>
      {/* HERO */}
      <section className="bg-blobs relative overflow-hidden text-deep-foreground">
        <div className="container mx-auto grid gap-10 px-4 py-16 md:grid-cols-2 md:py-24 lg:py-28">
          <div className="flex flex-col justify-center">
            <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-gold">
              <Sparkles className="h-3.5 w-3.5" /> Serie viral · Cupos limitados
            </div>
            <h1 className="font-display text-4xl font-black leading-[1.05] sm:text-5xl lg:text-6xl">
              Convierte tu marca en{" "}
              <span className="text-gradient-gold">protagonista</span> de una serie viral
            </h1>
            <p className="mt-5 max-w-xl text-base text-deep-foreground/80 sm:text-lg">
              +50M reproducciones por episodio · 300K seguidores · audiencia global con engagement real.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/planes">
                <Button size="lg" className="bg-gold text-gold-foreground shadow-[0_10px_40px_-10px_var(--gold)] hover:bg-gold/90">
                  Reservar espacio publicitario <ArrowRight />
                </Button>
              </Link>
              <Link to="/casos">
                <Button size="lg" variant="outline" className="border-deep-foreground/30 bg-transparent text-deep-foreground hover:bg-white/10 hover:text-deep-foreground">
                  Ver casos reales
                </Button>
              </Link>
            </div>
            <div className="mt-8 inline-flex w-fit items-center gap-2 rounded-lg bg-coral/15 px-4 py-2 text-sm font-semibold text-coral">
              🔥 {cupos} {cupos === 1 ? "espacio disponible" : "espacios disponibles"} este mes
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-6 rounded-3xl bg-gradient-to-tr from-gold/30 via-transparent to-coral/30 blur-2xl" />
            <img
              src={heroImg}
              alt="Personajes de FrutyStory"
              className="relative w-full rounded-3xl object-cover shadow-2xl"
            />
          </div>
        </div>

        {/* Brands strip */}
        <div className="border-t border-white/10 bg-black/20">
          <div className="container mx-auto flex flex-wrap items-center justify-center gap-x-10 gap-y-3 px-4 py-5 text-deep-foreground/60">
            <span className="text-xs uppercase tracking-widest text-gold">Marcas que confían</span>
            {BRANDS.map((b) => (
              <span key={b} className="font-display text-lg font-bold tracking-tight">{b}</span>
            ))}
          </div>
        </div>
      </section>

      {/* PROBLEMA → SOLUCIÓN */}
      <section className="container mx-auto px-4 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-coral">El problema</p>
          <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl">
            La publicidad de siempre ya no funciona
          </h2>
        </div>
        <div className="mx-auto mt-12 grid max-w-5xl gap-5 md:grid-cols-3">
          {[
            { icon: TrendingDown, t: "Publicidad tradicional", d: "Inversiones altas con retornos cada vez más bajos." },
            { icon: SkipForward, t: "Anuncios skippeados", d: "El usuario salta tu anuncio en menos de 5 segundos." },
            { icon: EyeOff, t: "Bajo engagement", d: "Las redes sociales ya no convierten como antes." },
          ].map((b, i) => (
            <Card key={i} className="border-border/60 p-6">
              <b.icon className="h-7 w-7 text-coral" />
              <h3 className="mt-3 text-lg font-bold line-through decoration-coral/60">{b.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{b.d}</p>
            </Card>
          ))}
        </div>
        <div className="mx-auto mt-10 max-w-3xl rounded-2xl bg-primary p-8 text-center text-primary-foreground shadow-[var(--shadow-deep)]">
          <Check className="mx-auto h-8 w-8 text-gold" />
          <p className="mt-3 font-display text-2xl font-bold sm:text-3xl">
            FrutyStory integra tu marca <span className="text-gradient-gold">dentro de la historia</span>
          </p>
          <p className="mt-3 text-primary-foreground/80">
            Tu producto no interrumpe — es parte de la trama que millones esperan cada semana.
          </p>
        </div>
      </section>

      {/* QUÉ ES */}
      <section className="bg-cream-blobs py-20">
        <div className="container mx-auto grid gap-12 px-4 md:grid-cols-2 md:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-coral">¿Qué es FrutyStory?</p>
            <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl">
              Una serie tipo novela con personajes que la audiencia ama
            </h2>
            <p className="mt-4 text-muted-foreground">
              Combinamos drama, humor y storytelling viral. Tu marca se integra de forma natural y memorable en cada capítulo.
            </p>
            <div className="mt-8 grid grid-cols-3 gap-4">
              {[
                { n: "300K", l: "Seguidores" },
                { n: "50M+", l: "Views totales" },
                { n: "🌎", l: "Audiencia global" },
              ].map((s) => (
                <div key={s.l} className="rounded-xl border border-border bg-card p-4 text-center">
                  <div className="font-display text-2xl font-black text-primary">{s.n}</div>
                  <div className="mt-1 text-xs text-muted-foreground">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <img src={donBome} alt="Don Bomé, personaje de FrutyStory" className="rounded-3xl shadow-[var(--shadow-deep)]" />
          </div>
        </div>
      </section>

      {/* CASOS preview */}
      <section className="container mx-auto px-4 py-20">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-coral">Casos de uso</p>
            <h2 className="mt-2 font-display text-3xl font-black sm:text-4xl">Cómo se ve tu marca dentro</h2>
          </div>
          <Link to="/casos" className="hidden text-sm font-semibold text-primary hover:underline sm:inline-flex">
            Ver todos →
          </Link>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CASES.slice(0, 6).map((c) => (
            <Card key={c.industry} className="group overflow-hidden border-border/60 p-6 transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-gold)]">
              <div className="text-4xl">{c.icon}</div>
              <h3 className="mt-3 font-display text-xl font-bold">{c.industry}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{c.scene}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* TESTIMONIOS */}
      <section className="bg-blobs py-20 text-deep-foreground">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-gold">Resultados reales</p>
            <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl">Lo que dicen las marcas</h2>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <div key={t.brand} className="rounded-2xl bg-white/5 p-6 backdrop-blur ring-1 ring-white/10">
                <div className="flex items-center gap-1 text-gold">
                  {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
                </div>
                <p className="mt-4 text-deep-foreground/90">"{t.quote}"</p>
                <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
                  <div>
                    <div className="font-bold">{t.brand}</div>
                    <div className="text-xs text-deep-foreground/60">{t.person}</div>
                  </div>
                  <div className="rounded-full bg-gold px-3 py-1 text-xs font-bold text-gold-foreground">{t.metric}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PLANES preview + CTA final */}
      <section className="container mx-auto px-4 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-coral">Planes</p>
          <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl">Elige cómo quieres aparecer</h2>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {PLANS.map((p) => (
            <Card key={p.id} className={`p-6 ${p.highlight ? "ring-2 ring-gold shadow-[var(--shadow-gold)]" : ""}`}>
              {p.highlight && <div className="mb-3 inline-block rounded-full bg-gold px-3 py-0.5 text-xs font-bold text-gold-foreground">⭐ Más popular</div>}
              <h3 className="font-display text-2xl font-black">{p.name}</h3>
              <p className="text-sm text-muted-foreground">{p.tagline}</p>
              <div className="mt-4 font-display text-3xl font-black text-primary">{p.priceLabel}</div>
              <div className="text-xs text-muted-foreground">{p.episodes}</div>
              <Link to="/planes" className="mt-5 block">
                <Button className="w-full" variant={p.highlight ? "default" : "outline"}>Ver detalles</Button>
              </Link>
            </Card>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
